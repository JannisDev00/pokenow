;(function () {
    var ATTR_TABLE = 'x_2270446_pokenow_attributes'
    var TYPE_TABLE = 'x_2270446_pokenow_type'
    var STAT_TABLE = 'x_2270446_pokenow_stat'
    var MOVE_TABLE = 'x_2270446_pokenow_move'
    var POKE_TYPE_TABLE = 'x_2270446_pokenow_poke_type'
    var POKE_STAT_TABLE = 'x_2270446_pokenow_poke_stat'
    var EFFECT_TABLE = 'x_2270446_pokenow_type_effectiveness'
    var ITEM_TABLE = 'x_2270446_pokenow_item'
    var ITEM_CATEGORY_TABLE = 'x_2270446_pokenow_item_category'
    var BATTLE_LOG_TABLE = 'x_2270446_pokenow_battle_log'

    // Cap on how many of a Pokemon's known moves we'll fetch/check before
    // giving up on finding 4 usable ones - bounds worst-case REST calls per
    // setup call (each uncached move costs one live PokeAPI call).
    var MAX_MOVE_CANDIDATES = 15
    var LEVEL = 50

    // PokeAPI's item resource has no structured "heal amount" field, and its
    // own effect_entries/flavor_text_entries disagree with each other for
    // several of these (e.g. Hyper Potion: "restores 200 HP" per effect text
    // vs "120 HP" per flavor text - different game generations blended into
    // one resource). These 18 values are the canonical modern-game amounts.
    var ITEM_EFFECTS = {
        potion: { kind: 'heal', amount: 20 },
        'super-potion': { kind: 'heal', amount: 60 },
        'hyper-potion': { kind: 'heal', amount: 120 },
        'max-potion': { kind: 'heal', amount: 'full' },
        'full-restore': { kind: 'heal', amount: 'full' },
        'moomoo-milk': { kind: 'heal', amount: 100 },
        'soda-pop': { kind: 'heal', amount: 50 },
        lemonade: { kind: 'heal', amount: 70 },
        'fresh-water': { kind: 'heal', amount: 30 },
        'energy-powder': { kind: 'heal', amount: 60 },
        'energy-root': { kind: 'heal', amount: 120 },
        'berry-juice': { kind: 'heal', amount: 20 },
        'sweet-heart': { kind: 'heal', amount: 20 },
        revive: { kind: 'revive', amount: 'half' },
        'max-revive': { kind: 'revive', amount: 'full' },
        'revival-herb': { kind: 'revive', amount: 'full' },
        'max-honey': { kind: 'revive', amount: 'full' },
        'sacred-ash': { kind: 'revive', amount: 'full', all: true },
    }

    // Of PokeAPI's ~22 move ailments, only these 6 are implemented in
    // battle. Moves with any other ailment (infatuation, trap, disable,
    // leech-seed, etc.) still work as plain attacks - they just never
    // trigger their secondary effect.
    var SUPPORTED_AILMENTS = {
        poison: true,
        burn: true,
        paralysis: true,
        sleep: true,
        freeze: true,
        confusion: true,
    }

    function fetchJson(functionName, params) {
        var rm = new sn_ws.RESTMessageV2('PokeAPI', functionName)
        for (var key in params) {
            rm.setStringParameterNoEscape(key, params[key])
        }
        rm.setHttpTimeout(15000)
        var response = rm.execute()
        var status = response.getStatusCode()
        if (status < 200 || status >= 300) {
            gs.error('PokeNow battle: ' + functionName + ' failed with status ' + status)
            return null
        }
        return JSON.parse(response.getBody())
    }

    function loadIdNameMap(table) {
        var map = {}
        var gr = new GlideRecord(table)
        gr.setLimit(200)
        gr.query()
        while (gr.next()) {
            map[gr.getUniqueValue()] = gr.getValue('name')
        }
        return map
    }

    function loadTypeEffectivenessMap() {
        var map = {}
        var gr = new GlideRecord(EFFECT_TABLE)
        gr.setLimit(1000)
        gr.query()
        while (gr.next()) {
            var key = gr.getValue('attacking_type') + ':' + gr.getValue('defending_type')
            map[key] = parseFloat(gr.getValue('multiplier'))
        }
        return map
    }

    function effectivenessMultiplier(effMap, attackTypeId, defendTypeIds) {
        if (!attackTypeId) {
            return 1
        }
        var mult = 1
        for (var i = 0; i < defendTypeIds.length; i++) {
            var key = attackTypeId + ':' + defendTypeIds[i]
            var v = effMap[key]
            mult *= v === undefined ? 1 : v
        }
        return mult
    }

    function capitalize(str) {
        if (!str) {
            return str
        }
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    function mapTypeIds(types, typeIdByName) {
        var ids = []
        for (var i = 0; i < types.length; i++) {
            ids.push(typeIdByName[types[i]])
        }
        return ids
    }

    // Picks one random item from the healing/revival categories for a side
    // to carry into the battle. Only 18 items total exist across those two
    // categories, so this is a cheap in-memory pick, not a per-request query.
    function loadHealItemPool() {
        var catIds = []
        var cgr = new GlideRecord(ITEM_CATEGORY_TABLE)
        cgr.addQuery('name', 'IN', 'healing,revival')
        cgr.query()
        while (cgr.next()) {
            catIds.push(cgr.getUniqueValue())
        }
        if (!catIds.length) {
            return []
        }

        var pool = []
        var igr = new GlideRecord(ITEM_TABLE)
        igr.addQuery('category', 'IN', catIds.join(','))
        igr.setLimit(50)
        igr.query()
        while (igr.next()) {
            pool.push({
                name: igr.getValue('name'),
                sprite: igr.getValue('sprite'),
                effectText: igr.getValue('effect'),
            })
        }
        return pool
    }

    function pickRandomAssignedItem(pool) {
        if (!pool.length) {
            return null
        }
        var raw = pool[Math.floor(Math.random() * pool.length)]
        var effect = ITEM_EFFECTS[raw.name]
        return {
            name: capitalize(raw.name),
            rawName: raw.name,
            sprite: raw.sprite,
            effectText: raw.effectText,
            kind: effect ? effect.kind : 'heal',
        }
    }

    function loadPokemon(sysId, typeNameById, statMap) {
        var gr = new GlideRecord(ATTR_TABLE)
        if (!gr.get(sysId)) {
            return null
        }

        var sprite = ''
        try {
            var sprites = JSON.parse(gr.getValue('sprites') || '{}')
            sprite =
                (sprites.other && sprites.other['official-artwork'] && sprites.other['official-artwork'].front_default) ||
                sprites.front_default ||
                ''
        } catch (e) {
            sprite = ''
        }

        var types = []
        var tgr = new GlideRecord(POKE_TYPE_TABLE)
        tgr.addQuery('pokemon', sysId)
        tgr.orderBy('slot')
        tgr.setLimit(10)
        tgr.query()
        while (tgr.next()) {
            var tName = typeNameById[tgr.getValue('type')]
            if (tName) {
                types.push(tName)
            }
        }

        var stats = {}
        var statTotal = 0
        var sgr = new GlideRecord(POKE_STAT_TABLE)
        sgr.addQuery('pokemon', sysId)
        sgr.setLimit(10)
        sgr.query()
        while (sgr.next()) {
            var sName = statMap[sgr.getValue('stat')]
            var base = parseInt(sgr.getValue('base_stat'), 10) || 0
            if (sName) {
                stats[sName] = base
            }
            statTotal += base
        }

        var recentBattles = []
        try {
            recentBattles = JSON.parse(gr.getValue('recent_battles') || '[]')
        } catch (e) {
            recentBattles = []
        }

        return {
            sys_id: sysId,
            name: capitalize(gr.getValue('name')),
            sprite: sprite,
            types: types,
            stats: stats,
            statTotal: statTotal,
            movesRaw: gr.getValue('moves'),
            wins: parseInt(gr.getValue('wins'), 10) || 0,
            losses: parseInt(gr.getValue('losses'), 10) || 0,
            recentBattles: recentBattles,
        }
    }

    // Just the hp base stat for a list of Pokemon - used to know each bench
    // member's max HP when reviving them, without loading their full profile.
    function loadTeamMaxHps(teamIds, statMap) {
        var maxHps = []
        for (var i = 0; i < teamIds.length; i++) {
            var hp = 1
            var sgr = new GlideRecord(POKE_STAT_TABLE)
            sgr.addQuery('pokemon', teamIds[i])
            sgr.setLimit(10)
            sgr.query()
            while (sgr.next()) {
                if (statMap[sgr.getValue('stat')] === 'hp') {
                    hp = parseInt(sgr.getValue('base_stat'), 10) || 1
                }
            }
            maxHps.push(hp)
        }
        return maxHps
    }

    // Increments the win/loss counter for the given result and prepends a
    // battle summary to recent_battles, capped at the 5 most recent.
    function updatePokemonRecord(sysId, result, opponentName) {
        var gr = new GlideRecord(ATTR_TABLE)
        if (!gr.get(sysId)) {
            return null
        }

        var wins = parseInt(gr.getValue('wins'), 10) || 0
        var losses = parseInt(gr.getValue('losses'), 10) || 0
        if (result === 'win') {
            wins++
        } else if (result === 'loss') {
            losses++
        }

        var history = []
        try {
            history = JSON.parse(gr.getValue('recent_battles') || '[]')
        } catch (e) {
            history = []
        }
        history.unshift({
            opponent: opponentName,
            result: result,
            date: new GlideDateTime().getValue(),
        })
        if (history.length > 5) {
            history = history.slice(0, 5)
        }

        gr.setValue('wins', wins)
        gr.setValue('losses', losses)
        gr.setValue('recent_battles', JSON.stringify(history))
        gr.update()

        var logGr = new GlideRecord(BATTLE_LOG_TABLE)
        logGr.initialize()
        logGr.setValue('pokemon', sysId)
        logGr.setValue('opponent_name', opponentName)
        logGr.setValue('result', result)
        logGr.setValue('primary_type', gr.getValue('primary_type'))
        logGr.setValue('generation', gr.getValue('generation'))
        logGr.insert()

        return { wins: wins, losses: losses, recentBattles: history }
    }

    // Looks up a move's power/accuracy/type/damage class/ailment from the
    // local cache table, fetching + caching it from PokeAPI on a miss.
    // Moves are not bulk-imported (there are ~900 of them) - they're warmed
    // up lazily as battles reference them, so repeat battles get faster.
    function getOrFetchMove(name, typeIdByName, typeNameById) {
        var gr = new GlideRecord(MOVE_TABLE)
        gr.addQuery('name', name)
        gr.query()
        var found = gr.next()

        if (found && gr.getValue('damage_class')) {
            return {
                name: gr.getValue('name'),
                power: parseInt(gr.getValue('power'), 10) || 0,
                accuracy: parseInt(gr.getValue('accuracy'), 10) || 100,
                damageClass: gr.getValue('damage_class'),
                typeName: typeNameById[gr.getValue('type')] || '',
                ailment: gr.getValue('ailment') || 'none',
                ailmentChance: parseInt(gr.getValue('ailment_chance'), 10) || 0,
                minTurns: parseInt(gr.getValue('min_turns'), 10) || 0,
                maxTurns: parseInt(gr.getValue('max_turns'), 10) || 0,
            }
        }

        var detail = fetchJson('getMove', { name: name })
        if (!detail) {
            return null
        }

        var power = detail.power || 0
        var accuracy = detail.accuracy === null || detail.accuracy === undefined ? 100 : detail.accuracy
        var damageClass = (detail.damage_class && detail.damage_class.name) || 'status'
        var typeName = (detail.type && detail.type.name) || ''
        var typeId = typeIdByName[typeName]
        var meta = detail.meta || {}
        var ailment = (meta.ailment && meta.ailment.name) || 'none'
        var ailmentChance = meta.ailment_chance || 0
        var minTurns = meta.min_turns || 0
        var maxTurns = meta.max_turns || 0

        if (!found) {
            gr.initialize()
            gr.setValue('name', name)
        }
        gr.setValue('power', power)
        gr.setValue('accuracy', accuracy)
        gr.setValue('pp', detail.pp || 0)
        gr.setValue('damage_class', damageClass)
        gr.setValue('ailment', ailment)
        gr.setValue('ailment_chance', ailmentChance)
        gr.setValue('min_turns', minTurns)
        gr.setValue('max_turns', maxTurns)
        if (typeId) {
            gr.setValue('type', typeId)
        }
        if (gr.isNewRecord()) {
            gr.insert()
        } else {
            gr.update()
        }

        return {
            name: name,
            power: power,
            accuracy: accuracy,
            damageClass: damageClass,
            typeName: typeName,
            ailment: ailment,
            ailmentChance: ailmentChance,
            minTurns: minTurns,
            maxTurns: maxTurns,
        }
    }

    // Picks up to 4 usable moves from the Pokemon's known movepool, shuffled
    // for variety: damaging moves (physical/special, power > 0) plus pure
    // status moves whose ailment is one of the 6 we implement. Falls back to
    // a typeless Struggle if none of the moves checked qualify. The result
    // is fixed for the whole battle - the client sends the same 4 back on
    // every turn request rather than this being re-picked (which would
    // reshuffle).
    function pickMoves(rawMovesJson, typeIdByName, typeNameById) {
        var candidates = []
        try {
            var movesData = JSON.parse(rawMovesJson || '[]')
            for (var i = 0; i < movesData.length; i++) {
                if (movesData[i] && movesData[i].move && movesData[i].move.name) {
                    candidates.push(movesData[i].move.name)
                }
            }
        } catch (e) {
            candidates = []
        }

        for (var j = candidates.length - 1; j > 0; j--) {
            var k = Math.floor(Math.random() * (j + 1))
            var tmp = candidates[j]
            candidates[j] = candidates[k]
            candidates[k] = tmp
        }

        var qualifying = []
        var tried = 0
        for (var m = 0; m < candidates.length && qualifying.length < 4 && tried < MAX_MOVE_CANDIDATES; m++) {
            tried++
            var move = getOrFetchMove(candidates[m], typeIdByName, typeNameById)
            if (!move) {
                continue
            }
            var isDamaging = move.power > 0 && (move.damageClass === 'physical' || move.damageClass === 'special')
            var isSupportedStatus = move.damageClass === 'status' && SUPPORTED_AILMENTS[move.ailment]
            if (isDamaging || isSupportedStatus) {
                qualifying.push(move)
            }
        }

        if (!qualifying.length) {
            qualifying.push({
                name: 'Struggle',
                power: 50,
                accuracy: 100,
                damageClass: 'physical',
                typeName: '',
                ailment: 'none',
                ailmentChance: 0,
                minTurns: 0,
                maxTurns: 0,
            })
        }

        return qualifying
    }

    function clampHp(value, maxHp) {
        var n = parseInt(value, 10)
        if (isNaN(n)) {
            n = maxHp
        }
        return Math.max(0, Math.min(maxHp, n))
    }

    function clampSlotIndex(value) {
        var n = parseInt(value, 10)
        if (isNaN(n) || n < 0 || n > 3) {
            return 0
        }
        return n
    }

    function uniqueCount(arr) {
        var seen = {}
        var count = 0
        for (var i = 0; i < arr.length; i++) {
            if (!seen[arr[i]]) {
                seen[arr[i]] = true
                count++
            }
        }
        return count
    }

    function allFainted(hpArr) {
        for (var i = 0; i < hpArr.length; i++) {
            if (hpArr[i] > 0) {
                return false
            }
        }
        return true
    }

    // Next non-fainted slot after currentIndex, searching forward in team
    // order and wrapping around. Returns -1 if the whole team has fainted.
    function nextAliveIndex(hpArr, currentIndex) {
        for (var offset = 1; offset <= hpArr.length; offset++) {
            var idx = (currentIndex + offset) % hpArr.length
            if (hpArr[idx] > 0) {
                return idx
            }
        }
        return -1
    }

    // Credits a personal win to every team member still standing when the
    // match ends - members that already fainted got their loss recorded at
    // the moment they fainted, so they're skipped here to avoid double-counting.
    function creditTeamWin(teamIds, hpArr) {
        for (var i = 0; i < teamIds.length; i++) {
            if (hpArr[i] > 0) {
                updatePokemonRecord(teamIds[i], 'win', '4v4 Team Battle')
            }
        }
    }

    // Builds the client-facing summary for one team roster slot: identity,
    // stats, and a fixed 4-move pool (same picking logic as 1v1).
    function buildTeamMember(p, typeIdByName, typeNameById) {
        return {
            sys_id: p.sys_id,
            name: p.name,
            sprite: p.sprite,
            types: p.types,
            stats: p.stats,
            maxHp: p.stats.hp || 1,
            moves: pickMoves(p.movesRaw, typeIdByName, typeNameById),
            wins: p.wins,
            losses: p.losses,
        }
    }

    function freshStatus() {
        return { type: null, turnsRemaining: 0 }
    }

    function freshConfusion() {
        return { turnsRemaining: 0 }
    }

    function normalizeStatus(status) {
        return status && status.type ? status : freshStatus()
    }

    function normalizeConfusion(confusion) {
        return confusion && confusion.turnsRemaining > 0 ? confusion : freshConfusion()
    }

    // Checks whether a "major" status (sleep/freeze/paralysis - mutually
    // exclusive, only one at a time) prevents this side's move from
    // executing this turn.
    function resolveMajorStatusGate(status) {
        if (!status || !status.type) {
            return { canAct: true, status: freshStatus(), blocked: null }
        }

        if (status.type === 'sleep') {
            var remaining = status.turnsRemaining - 1
            if (remaining <= 0) {
                return { canAct: false, status: freshStatus(), blocked: 'sleep-wake' }
            }
            return { canAct: false, status: { type: 'sleep', turnsRemaining: remaining }, blocked: 'sleep' }
        }

        if (status.type === 'freeze') {
            if (Math.random() < 0.2) {
                return { canAct: true, status: freshStatus(), blocked: 'thaw' }
            }
            return { canAct: false, status: status, blocked: 'freeze' }
        }

        if (status.type === 'paralysis') {
            if (Math.random() < 0.25) {
                return { canAct: false, status: status, blocked: 'paralysis' }
            }
            return { canAct: true, status: status, blocked: null }
        }

        return { canAct: true, status: status, blocked: null }
    }

    // Confusion is a separate volatile status from the major ailments above
    // (a Pokemon can be e.g. both poisoned and confused at once). Ticks down
    // once per move attempt regardless of outcome.
    function resolveConfusionGate(confusion) {
        if (!confusion || confusion.turnsRemaining <= 0) {
            return { selfHit: false, confusion: freshConfusion() }
        }
        var remaining = confusion.turnsRemaining - 1
        var nextConfusion = { turnsRemaining: remaining }
        if (Math.random() < 1 / 3) {
            return { selfHit: true, confusion: nextConfusion }
        }
        return { selfHit: false, confusion: nextConfusion }
    }

    // Combines both gates in the order the real games use: major status
    // first (if it blocks the turn, confusion doesn't get to trigger this
    // round, though its own duration still ticks down), then confusion.
    function resolveActionGate(status, confusion) {
        var majorResult = resolveMajorStatusGate(status)
        var nextConfusion = confusion
        var selfHit = false

        if (majorResult.canAct) {
            var confusionResult = resolveConfusionGate(confusion)
            nextConfusion = confusionResult.confusion
            selfHit = confusionResult.selfHit
        } else if (confusion && confusion.turnsRemaining > 0) {
            nextConfusion = { turnsRemaining: confusion.turnsRemaining - 1 }
        }

        var blocked = majorResult.blocked
        if (majorResult.canAct && selfHit) {
            blocked = 'confusion'
        }

        return {
            canAct: majorResult.canAct && !selfHit,
            status: majorResult.status,
            confusion: nextConfusion,
            blocked: blocked,
        }
    }

    // Confusion self-hit: fixed power-40 typeless physical hit against
    // yourself, no STAB/type-effectiveness (matches the real games).
    function confusionSelfDamage(pokemon) {
        var atk = pokemon.stats.attack || 1
        var def = pokemon.stats.defense || 1
        var base = ((2 * LEVEL) / 5 + 2) * 40 * (atk / Math.max(1, def))
        base = base / 50 + 2
        var randomFactor = 0.85 + Math.random() * 0.15
        return Math.max(1, Math.round(base * randomFactor))
    }

    // Resolves a single attack, returning damage/effectiveness info. Does
    // not mutate HP - the caller applies entry.damage to the right side.
    // Status moves (power 0) never deal damage here - their ailment is
    // applied separately by the caller once it knows the move landed.
    function computeAttack(attackerSide, attacker, defender, move, attackerStatus, effMap, typeIdByName) {
        var hit = Math.random() * 100 < move.accuracy
        var entry = {
            attacker: attackerSide,
            attackerName: attacker.name,
            move: move.name,
            moveType: move.typeName,
            hit: hit,
            damage: 0,
            effectiveness: 'normal',
        }

        if (!hit || move.power <= 0) {
            return entry
        }

        var atkStat = move.damageClass === 'special' ? attacker.stats['special-attack'] : attacker.stats['attack']
        var defStat = move.damageClass === 'special' ? defender.stats['special-defense'] : defender.stats['defense']
        var stab = move.typeName && attacker.types.indexOf(move.typeName) !== -1 ? 1.5 : 1
        var attackTypeId = typeIdByName[move.typeName]
        var typeMult = move.typeName ? effectivenessMultiplier(effMap, attackTypeId, defender.typeIds) : 1
        var burnPenalty = move.damageClass === 'physical' && attackerStatus && attackerStatus.type === 'burn' ? 0.5 : 1

        var base = ((2 * LEVEL) / 5 + 2) * move.power * (atkStat / Math.max(1, defStat))
        base = base / 50 + 2
        var randomFactor = 0.85 + Math.random() * 0.15
        entry.damage = Math.max(1, Math.round(base * stab * typeMult * burnPenalty * randomFactor))

        if (typeMult === 0) {
            entry.effectiveness = 'immune'
        } else if (typeMult > 1) {
            entry.effectiveness = 'super'
        } else if (typeMult < 1) {
            entry.effectiveness = 'weak'
        }

        return entry
    }

    // Rolls whether a landed move inflicts its ailment (if any) on the
    // defender. Pure status moves' ailment is guaranteed once the move hits
    // (their accuracy roll IS the effect roll - PokeAPI's ailment_chance is
    // 0 for these, meaning "not a secondary chance"); damage+ailment moves
    // roll ailment_chance separately on top of already having hit. Major
    // ailments (not confusion) only apply if the defender doesn't already
    // have one - they're mutually exclusive.
    function maybeInflictAilment(move, defenderStatus, defenderConfusion) {
        if (!move.ailment || move.ailment === 'none' || !SUPPORTED_AILMENTS[move.ailment]) {
            return { status: defenderStatus, confusion: defenderConfusion, inflicted: null }
        }

        var chance = move.damageClass === 'status' ? 100 : move.ailmentChance || 0
        if (Math.random() * 100 >= chance) {
            return { status: defenderStatus, confusion: defenderConfusion, inflicted: null }
        }

        var turns =
            move.minTurns && move.maxTurns
                ? move.minTurns + Math.floor(Math.random() * (move.maxTurns - move.minTurns + 1))
                : 3

        if (move.ailment === 'confusion') {
            if (defenderConfusion && defenderConfusion.turnsRemaining > 0) {
                return { status: defenderStatus, confusion: defenderConfusion, inflicted: null }
            }
            return { status: defenderStatus, confusion: { turnsRemaining: turns }, inflicted: 'confusion' }
        }

        if (defenderStatus && defenderStatus.type) {
            return { status: defenderStatus, confusion: defenderConfusion, inflicted: null }
        }

        var newStatus = move.ailment === 'sleep' ? { type: 'sleep', turnsRemaining: turns } : { type: move.ailment, turnsRemaining: 0 }
        return { status: newStatus, confusion: defenderConfusion, inflicted: move.ailment }
    }

    // End-of-round poison/burn tick.
    function applyStatusDamage(hp, maxHp, status) {
        if (!status || !status.type || hp <= 0) {
            return { hp: hp, damage: 0 }
        }
        var fraction = 0
        if (status.type === 'poison') {
            fraction = 1 / 8
        } else if (status.type === 'burn') {
            fraction = 1 / 16
        }
        if (!fraction) {
            return { hp: hp, damage: 0 }
        }
        var dmg = Math.min(Math.max(1, Math.round(maxHp * fraction)), hp)
        return { hp: hp - dmg, damage: dmg }
    }

    // Applies a heal-kind item to whichever side used it. Revive-kind items
    // are handled separately (bench-only, see applyReviveItem) since
    // reviving only makes sense against a fainted teammate, and the
    // currently-active Pokemon is (by construction) never fainted when it's
    // time to act.
    function applyHealItem(side, itemEffect, hpA, hpB, maxHpA, maxHpB) {
        var healed
        if (side === 'a') {
            healed = itemEffect.amount === 'full' ? maxHpA - hpA : Math.min(itemEffect.amount, maxHpA - hpA)
            hpA = Math.min(maxHpA, hpA + healed)
        } else {
            healed = itemEffect.amount === 'full' ? maxHpB - hpB : Math.min(itemEffect.amount, maxHpB - hpB)
            hpB = Math.min(maxHpB, hpB + healed)
        }
        return { hpA: hpA, hpB: hpB, healed: healed }
    }

    // Revives fainted bench slots in team order. Non-"all" revive items only
    // revive the first fainted slot found; Sacred Ash-style items revive
    // every fainted slot. Returns the list of indexes that got revived.
    function applyReviveItem(hpArr, maxHps, effect) {
        var revived = []
        for (var i = 0; i < hpArr.length; i++) {
            if (hpArr[i] <= 0) {
                var amount = effect.amount === 'full' ? maxHps[i] : Math.round(maxHps[i] / 2)
                hpArr[i] = amount
                revived.push(i)
                if (!effect.all) {
                    break
                }
            }
        }
        return revived
    }

    // Resolves one round for the currently active pair. Each action is
    // { type: 'move', move } | { type: 'item', name, effect } | { type: 'skip' }.
    // Order: heal items first (order between two item users doesn't matter -
    // each only affects their own side), then status gating (sleep/freeze/
    // paralysis/confusion) for whichever side(s) chose a move, then attacks
    // (speed order if both act, direct if only one does), then end-of-round
    // poison/burn ticks. 'skip' (bench-revive items, which don't touch the
    // active pair at all) does nothing here beyond being immune to gating.
    function resolveActivePairRound(a, b, actionA, actionB, hpA, hpB, maxHpA, maxHpB, statusA, statusB, confusionA, confusionB, effMap, typeIdByName) {
        var log = []

        if (actionA.type === 'item') {
            var ra = applyHealItem('a', actionA.effect, hpA, hpB, maxHpA, maxHpB)
            hpA = ra.hpA
            hpB = ra.hpB
            log.push({ attacker: 'a', attackerName: a.name, itemUsed: true, itemName: actionA.name, healed: ra.healed, hit: true, hpA: hpA, hpB: hpB })
        }
        if (actionB.type === 'item') {
            var rb = applyHealItem('b', actionB.effect, hpA, hpB, maxHpA, maxHpB)
            hpA = rb.hpA
            hpB = rb.hpB
            log.push({ attacker: 'b', attackerName: b.name, itemUsed: true, itemName: actionB.name, healed: rb.healed, hit: true, hpA: hpA, hpB: hpB })
        }

        var passthroughGate = function (status, confusion) {
            return { canAct: true, status: status, confusion: confusion, blocked: null }
        }

        var gateA = actionA.type === 'move' ? resolveActionGate(statusA, confusionA) : passthroughGate(statusA, confusionA)
        var gateB = actionB.type === 'move' ? resolveActionGate(statusB, confusionB) : passthroughGate(statusB, confusionB)
        statusA = gateA.status
        statusB = gateB.status
        confusionA = gateA.confusion
        confusionB = gateB.confusion

        // 'confusion' is deliberately excluded here - the confusionSelfHit
        // entry pushed just below already narrates it (with damage), so a
        // separate "blocked by confusion" line would just be redundant.
        var blockedNeedsOwnEntry = function (reason) {
            return reason && reason !== 'thaw' && reason !== 'sleep-wake' && reason !== 'confusion'
        }
        if (actionA.type === 'move' && blockedNeedsOwnEntry(gateA.blocked)) {
            log.push({ attacker: 'a', attackerName: a.name, statusBlocked: gateA.blocked, hit: true, hpA: hpA, hpB: hpB })
        }
        if (actionB.type === 'move' && blockedNeedsOwnEntry(gateB.blocked)) {
            log.push({ attacker: 'b', attackerName: b.name, statusBlocked: gateB.blocked, hit: true, hpA: hpA, hpB: hpB })
        }

        // Confusion self-hit replaces the chosen move entirely for that side.
        if (actionA.type === 'move' && gateA.blocked === 'confusion') {
            var selfDmgA = confusionSelfDamage(a)
            hpA = Math.max(0, hpA - selfDmgA)
            log.push({ attacker: 'a', attackerName: a.name, confusionSelfHit: true, damage: selfDmgA, hit: true, hpA: hpA, hpB: hpB })
        }
        if (actionB.type === 'move' && gateB.blocked === 'confusion') {
            var selfDmgB = confusionSelfDamage(b)
            hpB = Math.max(0, hpB - selfDmgB)
            log.push({ attacker: 'b', attackerName: b.name, confusionSelfHit: true, damage: selfDmgB, hit: true, hpA: hpA, hpB: hpB })
        }

        var aAttacks = actionA.type === 'move' && gateA.canAct && hpA > 0
        var bAttacks = actionB.type === 'move' && gateB.canAct && hpB > 0

        function landHit(side, attacker, defender, move) {
            var attackerStatus = side === 'a' ? statusA : statusB
            var entry = computeAttack(side, attacker, defender, move, attackerStatus, effMap, typeIdByName)
            if (entry.hit && entry.damage > 0) {
                if (side === 'a') {
                    hpB = Math.max(0, hpB - entry.damage)
                } else {
                    hpA = Math.max(0, hpA - entry.damage)
                }
            }
            if (entry.hit) {
                var defenderStatus = side === 'a' ? statusB : statusA
                var defenderConfusion = side === 'a' ? confusionB : confusionA
                var ailmentResult = maybeInflictAilment(move, defenderStatus, defenderConfusion)
                entry.ailmentInflicted = ailmentResult.inflicted
                if (side === 'a') {
                    statusB = ailmentResult.status
                    confusionB = ailmentResult.confusion
                } else {
                    statusA = ailmentResult.status
                    confusionA = ailmentResult.confusion
                }
            }
            entry.fainted = side === 'a' ? hpB <= 0 : hpA <= 0
            entry.hpA = hpA
            entry.hpB = hpB
            log.push(entry)
        }

        if (aAttacks && bAttacks) {
            var aFirst = a.stats.speed === b.stats.speed ? Math.random() < 0.5 : a.stats.speed > b.stats.speed
            var order = aFirst ? ['a', 'b'] : ['b', 'a']
            for (var i = 0; i < order.length; i++) {
                if (hpA <= 0 || hpB <= 0) {
                    break
                }
                if (order[i] === 'a') {
                    landHit('a', a, b, actionA.move)
                } else {
                    landHit('b', b, a, actionB.move)
                }
            }
        } else if (aAttacks) {
            landHit('a', a, b, actionA.move)
        } else if (bAttacks) {
            landHit('b', b, a, actionB.move)
        }

        if (hpA > 0) {
            var dotA = applyStatusDamage(hpA, maxHpA, statusA)
            if (dotA.damage > 0) {
                hpA = dotA.hp
                log.push({ attacker: 'a', attackerName: a.name, statusDamage: statusA.type, damage: dotA.damage, hit: true, hpA: hpA, hpB: hpB })
            }
        }
        if (hpB > 0) {
            var dotB = applyStatusDamage(hpB, maxHpB, statusB)
            if (dotB.damage > 0) {
                hpB = dotB.hp
                log.push({ attacker: 'b', attackerName: b.name, statusDamage: statusB.type, damage: dotB.damage, hit: true, hpA: hpA, hpB: hpB })
            }
        }

        return { log: log, hpA: hpA, hpB: hpB, statusA: statusA, statusB: statusB, confusionA: confusionA, confusionB: confusionB }
    }

    data.pokemonList = []
    data.result = null
    data.error = ''

    if (input && input.action === 'setup') {
        if (!input.pokemonA || !input.pokemonB || input.pokemonA === input.pokemonB) {
            data.error = 'Please select two different Pokemon.'
            return
        }

        var typeNameById = loadIdNameMap(TYPE_TABLE)
        var typeIdByName = {}
        for (var tid in typeNameById) {
            typeIdByName[typeNameById[tid]] = tid
        }
        var statMap = loadIdNameMap(STAT_TABLE)

        var a = loadPokemon(input.pokemonA, typeNameById, statMap)
        var b = loadPokemon(input.pokemonB, typeNameById, statMap)
        if (!a || !b) {
            data.error = 'Could not load one or both Pokemon.'
            return
        }

        var aMoves = pickMoves(a.movesRaw, typeIdByName, typeNameById)
        var bMoves = pickMoves(b.movesRaw, typeIdByName, typeNameById)
        var healPool = loadHealItemPool()

        data.result = {
            a: {
                sys_id: a.sys_id,
                name: a.name,
                sprite: a.sprite,
                types: a.types,
                stats: a.stats,
                statTotal: a.statTotal,
                maxHp: a.stats.hp || 1,
                moves: aMoves,
                wins: a.wins,
                losses: a.losses,
                recentBattles: a.recentBattles,
            },
            b: {
                sys_id: b.sys_id,
                name: b.name,
                sprite: b.sprite,
                types: b.types,
                stats: b.stats,
                statTotal: b.statTotal,
                maxHp: b.stats.hp || 1,
                moves: bMoves,
                wins: b.wins,
                losses: b.losses,
                recentBattles: b.recentBattles,
            },
            itemA: pickRandomAssignedItem(healPool),
            itemB: pickRandomAssignedItem(healPool),
        }
        return
    }

    if (input && input.action === 'turn') {
        if (!input.pokemonA || !input.pokemonB || (!input.chosenMove && !input.useItem)) {
            data.error = 'Missing battle turn data.'
            return
        }

        var typeNameById2 = loadIdNameMap(TYPE_TABLE)
        var typeIdByName2 = {}
        for (var tid2 in typeNameById2) {
            typeIdByName2[typeNameById2[tid2]] = tid2
        }
        var statMap2 = loadIdNameMap(STAT_TABLE)
        var effMap = loadTypeEffectivenessMap()

        var a2 = loadPokemon(input.pokemonA, typeNameById2, statMap2)
        var b2 = loadPokemon(input.pokemonB, typeNameById2, statMap2)
        if (!a2 || !b2) {
            data.error = 'Could not load one or both Pokemon.'
            return
        }
        a2.typeIds = mapTypeIds(a2.types, typeIdByName2)
        b2.typeIds = mapTypeIds(b2.types, typeIdByName2)

        var maxHpA = a2.stats.hp || 1
        var maxHpB = b2.stats.hp || 1
        var hpA = clampHp(input.hpA, maxHpA)
        var hpB = clampHp(input.hpB, maxHpB)
        var statusA = normalizeStatus(input.statusA)
        var statusB = normalizeStatus(input.statusB)
        var confusionA = normalizeConfusion(input.confusionA)
        var confusionB = normalizeConfusion(input.confusionB)

        var itemAEffect = input.itemAName ? ITEM_EFFECTS[input.itemAName] : null
        var itemBEffect = input.itemBName ? ITEM_EFFECTS[input.itemBName] : null

        var actionA
        if (input.useItem && itemAEffect && itemAEffect.kind === 'heal') {
            actionA = { type: 'item', name: input.itemAName, effect: itemAEffect }
        } else {
            var moveA = getOrFetchMove(input.chosenMove, typeIdByName2, typeNameById2)
            if (!moveA) {
                data.error = 'Could not resolve the selected move.'
                return
            }
            actionA = { type: 'move', move: moveA }
        }

        // AI opponent: use its item once, when hurt, if it's a heal-kind
        // item (revive-kind items can't help the active Pokemon - it's
        // never fainted when it's its turn to act, only useful on a bench,
        // which 1v1 doesn't have).
        var actionB
        var bWantsItem = itemBEffect && itemBEffect.kind === 'heal' && !input.itemBUsed && hpB / maxHpB <= 0.3
        if (bWantsItem) {
            actionB = { type: 'item', name: input.itemBName, effect: itemBEffect }
        } else {
            var bMoveNames = input.bMoveNames || []
            var bMoveName = bMoveNames.length ? bMoveNames[Math.floor(Math.random() * bMoveNames.length)] : 'Struggle'
            var moveB = getOrFetchMove(bMoveName, typeIdByName2, typeNameById2)
            if (!moveB) {
                moveB = { name: 'Struggle', power: 50, accuracy: 100, damageClass: 'physical', typeName: '', ailment: 'none', ailmentChance: 0, minTurns: 0, maxTurns: 0 }
            }
            actionB = { type: 'move', move: moveB }
        }

        var round = resolveActivePairRound(a2, b2, actionA, actionB, hpA, hpB, maxHpA, maxHpB, statusA, statusB, confusionA, confusionB, effMap, typeIdByName2)

        var winner = null
        if (round.hpA <= 0 && round.hpB <= 0) {
            winner = 'Tie'
        } else if (round.hpA <= 0) {
            winner = b2.name
        } else if (round.hpB <= 0) {
            winner = a2.name
        }

        var aRecord = null
        var bRecord = null
        if (winner) {
            var resultA, resultB
            if (winner === 'Tie') {
                resultA = 'tie'
                resultB = 'tie'
            } else if (winner === a2.name) {
                resultA = 'win'
                resultB = 'loss'
            } else {
                resultA = 'loss'
                resultB = 'win'
            }
            aRecord = updatePokemonRecord(a2.sys_id, resultA, b2.name)
            bRecord = updatePokemonRecord(b2.sys_id, resultB, a2.name)
        }

        data.result = {
            log: round.log,
            hpA: round.hpA,
            hpB: round.hpB,
            statusA: round.statusA,
            statusB: round.statusB,
            confusionA: round.confusionA,
            confusionB: round.confusionB,
            winner: winner,
            aRecord: aRecord,
            bRecord: bRecord,
            itemAUsedNow: actionA.type === 'item',
            itemBUsedNow: actionB.type === 'item',
        }
        return
    }

    // 4v4: loads both 4-Pokemon rosters and picks each member's fixed move
    // pool up front. Which side is AI vs. player-controlled is a client-side
    // concern - this just returns both rosters plus the requested control mode.
    if (input && input.action === 'teamSetup') {
        var teamA0 = input.teamA || []
        var teamB0 = input.teamB || []
        if (teamA0.length !== 4 || teamB0.length !== 4) {
            data.error = 'Each team needs exactly 4 Pokemon.'
            return
        }
        if (uniqueCount(teamA0) !== 4 || uniqueCount(teamB0) !== 4) {
            data.error = 'Each team must have 4 different Pokemon.'
            return
        }

        var typeNameById3 = loadIdNameMap(TYPE_TABLE)
        var typeIdByName3 = {}
        for (var tid3 in typeNameById3) {
            typeIdByName3[typeNameById3[tid3]] = tid3
        }
        var statMap3 = loadIdNameMap(STAT_TABLE)

        var teamAInfo = []
        var teamBInfo = []
        var loadOk = true

        for (var ia = 0; ia < 4; ia++) {
            var pa = loadPokemon(teamA0[ia], typeNameById3, statMap3)
            if (!pa) {
                loadOk = false
                break
            }
            teamAInfo.push(buildTeamMember(pa, typeIdByName3, typeNameById3))
        }
        for (var ib = 0; loadOk && ib < 4; ib++) {
            var pb = loadPokemon(teamB0[ib], typeNameById3, statMap3)
            if (!pb) {
                loadOk = false
                break
            }
            teamBInfo.push(buildTeamMember(pb, typeIdByName3, typeNameById3))
        }

        if (!loadOk) {
            data.error = 'Could not load one or more Pokemon.'
            return
        }

        var teamHealPool = loadHealItemPool()

        data.result = {
            teamA: teamAInfo,
            teamB: teamBInfo,
            controlMode: input.controlMode === 'manual' ? 'manual' : 'ai',
            itemA: pickRandomAssignedItem(teamHealPool),
            itemB: pickRandomAssignedItem(teamHealPool),
        }
        return
    }

    // 4v4: resolves one round between whichever slot is currently active on
    // each team (same math as 1v1's 'turn'), then applies fainting/auto-switch
    // (next non-fainted slot in team order) and checks for a team wipe.
    // Status/confusion are scoped to whichever Pokemon is currently active
    // per side - a freshly switched-in (or revived) Pokemon always starts
    // status-free, since there's no manual switching to worry about carrying
    // status across.
    if (input && input.action === 'teamTurn') {
        var teamAIds = input.teamA || []
        var teamBIds = input.teamB || []
        if (teamAIds.length !== 4 || teamBIds.length !== 4) {
            data.error = 'Missing team battle turn data.'
            return
        }
        var teamControlMode = input.controlMode === 'manual' ? 'manual' : 'ai'

        var usingItemA = !!input.useItemA
        var usingItemB = teamControlMode === 'manual' ? !!input.useItemB : false

        if (!usingItemA && !input.chosenMoveA) {
            data.error = 'Missing move selection for Team A.'
            return
        }
        if (teamControlMode === 'manual' && !usingItemB && !input.chosenMoveB) {
            data.error = 'Missing move selection for Team B.'
            return
        }

        var activeA = clampSlotIndex(input.activeA)
        var activeB = clampSlotIndex(input.activeB)
        var activeASysId = teamAIds[activeA]
        var activeBSysId = teamBIds[activeB]

        var typeNameById4 = loadIdNameMap(TYPE_TABLE)
        var typeIdByName4 = {}
        for (var tid4 in typeNameById4) {
            typeIdByName4[typeNameById4[tid4]] = tid4
        }
        var statMap4 = loadIdNameMap(STAT_TABLE)
        var effMap2 = loadTypeEffectivenessMap()

        var activeAInfo = loadPokemon(activeASysId, typeNameById4, statMap4)
        var activeBInfo = loadPokemon(activeBSysId, typeNameById4, statMap4)
        if (!activeAInfo || !activeBInfo) {
            data.error = 'Could not load the active Pokemon.'
            return
        }
        activeAInfo.typeIds = mapTypeIds(activeAInfo.types, typeIdByName4)
        activeBInfo.typeIds = mapTypeIds(activeBInfo.types, typeIdByName4)

        var teamMaxHpA = activeAInfo.stats.hp || 1
        var teamMaxHpB = activeBInfo.stats.hp || 1

        var hpArrA = (input.hpA || []).slice(0, 4)
        var hpArrB = (input.hpB || []).slice(0, 4)
        while (hpArrA.length < 4) {
            hpArrA.push(teamMaxHpA)
        }
        while (hpArrB.length < 4) {
            hpArrB.push(teamMaxHpB)
        }

        var curHpA = clampHp(hpArrA[activeA], teamMaxHpA)
        var curHpB = clampHp(hpArrB[activeB], teamMaxHpB)
        var teamStatusA = normalizeStatus(input.statusA)
        var teamStatusB = normalizeStatus(input.statusB)
        var teamConfusionA = normalizeConfusion(input.confusionA)
        var teamConfusionB = normalizeConfusion(input.confusionB)

        var itemAEffect = input.itemAName ? ITEM_EFFECTS[input.itemAName] : null
        var itemBEffect = input.itemBName ? ITEM_EFFECTS[input.itemBName] : null

        var teamLog = []
        var itemAConsumed = false
        var itemBConsumed = false

        var actionA
        if (usingItemA && itemAEffect && itemAEffect.kind === 'revive') {
            var maxHpsA = loadTeamMaxHps(teamAIds, statMap4)
            var revivedA = applyReviveItem(hpArrA, maxHpsA, itemAEffect)
            teamLog.push({ attacker: 'a', attackerName: activeAInfo.name, itemUsed: true, itemName: input.itemAName, revivedIndexes: revivedA, hit: true, hpA: curHpA, hpB: curHpB })
            actionA = { type: 'skip' }
            itemAConsumed = true
        } else if (usingItemA && itemAEffect && itemAEffect.kind === 'heal') {
            actionA = { type: 'item', name: input.itemAName, effect: itemAEffect }
            itemAConsumed = true
        } else {
            var teamMoveA = getOrFetchMove(input.chosenMoveA, typeIdByName4, typeNameById4)
            if (!teamMoveA) {
                data.error = 'Could not resolve your selected move.'
                return
            }
            actionA = { type: 'move', move: teamMoveA }
        }

        var actionB
        if (teamControlMode === 'manual') {
            if (usingItemB && itemBEffect && itemBEffect.kind === 'revive') {
                var maxHpsB = loadTeamMaxHps(teamBIds, statMap4)
                var revivedB = applyReviveItem(hpArrB, maxHpsB, itemBEffect)
                teamLog.push({ attacker: 'b', attackerName: activeBInfo.name, itemUsed: true, itemName: input.itemBName, revivedIndexes: revivedB, hit: true, hpA: curHpA, hpB: curHpB })
                actionB = { type: 'skip' }
                itemBConsumed = true
            } else if (usingItemB && itemBEffect && itemBEffect.kind === 'heal') {
                actionB = { type: 'item', name: input.itemBName, effect: itemBEffect }
                itemBConsumed = true
            } else {
                var teamMoveB = getOrFetchMove(input.chosenMoveB, typeIdByName4, typeNameById4)
                if (!teamMoveB) {
                    data.error = 'Could not resolve the selected move for Team B.'
                    return
                }
                actionB = { type: 'move', move: teamMoveB }
            }
        } else {
            // AI: heal itself if hurt, revive a fainted bench member if it
            // has one and its item is still available, otherwise attack.
            var bHasFaintedBench = false
            for (var fb = 0; fb < hpArrB.length; fb++) {
                if (fb !== activeB && hpArrB[fb] <= 0) {
                    bHasFaintedBench = true
                    break
                }
            }
            if (!input.itemBUsed && itemBEffect && itemBEffect.kind === 'heal' && curHpB / teamMaxHpB <= 0.3) {
                actionB = { type: 'item', name: input.itemBName, effect: itemBEffect }
                itemBConsumed = true
            } else if (!input.itemBUsed && itemBEffect && itemBEffect.kind === 'revive' && bHasFaintedBench) {
                var maxHpsB2 = loadTeamMaxHps(teamBIds, statMap4)
                var revivedB2 = applyReviveItem(hpArrB, maxHpsB2, itemBEffect)
                teamLog.push({ attacker: 'b', attackerName: activeBInfo.name, itemUsed: true, itemName: input.itemBName, revivedIndexes: revivedB2, hit: true, hpA: curHpA, hpB: curHpB })
                actionB = { type: 'skip' }
                itemBConsumed = true
            } else {
                var activeBMoveNames = input.activeBMoveNames || []
                var teamBMoveName = activeBMoveNames.length ? activeBMoveNames[Math.floor(Math.random() * activeBMoveNames.length)] : 'Struggle'
                var teamMoveB2 = getOrFetchMove(teamBMoveName, typeIdByName4, typeNameById4)
                if (!teamMoveB2) {
                    teamMoveB2 = { name: 'Struggle', power: 50, accuracy: 100, damageClass: 'physical', typeName: '', ailment: 'none', ailmentChance: 0, minTurns: 0, maxTurns: 0 }
                }
                actionB = { type: 'move', move: teamMoveB2 }
            }
        }

        var teamRound = resolveActivePairRound(
            activeAInfo,
            activeBInfo,
            actionA,
            actionB,
            curHpA,
            curHpB,
            teamMaxHpA,
            teamMaxHpB,
            teamStatusA,
            teamStatusB,
            teamConfusionA,
            teamConfusionB,
            effMap2,
            typeIdByName4
        )
        teamLog = teamLog.concat(teamRound.log)
        hpArrA[activeA] = teamRound.hpA
        hpArrB[activeB] = teamRound.hpB
        if (actionA.type === 'item') {
            itemAConsumed = true
        }
        if (actionB.type === 'item') {
            itemBConsumed = true
        }

        var faintedA = teamRound.hpA <= 0
        var faintedB = teamRound.hpB <= 0

        if (faintedA) {
            updatePokemonRecord(activeAInfo.sys_id, 'loss', activeBInfo.name)
        }
        if (faintedB) {
            updatePokemonRecord(activeBInfo.sys_id, 'loss', activeAInfo.name)
        }

        var nextActiveA = faintedA ? nextAliveIndex(hpArrA, activeA) : activeA
        var nextActiveB = faintedB ? nextAliveIndex(hpArrB, activeB) : activeB

        var teamAWiped = allFainted(hpArrA)
        var teamBWiped = allFainted(hpArrB)

        var teamWinner = null
        if (teamAWiped && teamBWiped) {
            teamWinner = 'Tie'
        } else if (teamAWiped) {
            teamWinner = 'B'
        } else if (teamBWiped) {
            teamWinner = 'A'
        }

        if (teamWinner === 'A') {
            creditTeamWin(teamAIds, hpArrA)
        } else if (teamWinner === 'B') {
            creditTeamWin(teamBIds, hpArrB)
        }

        data.result = {
            log: teamLog,
            hpA: hpArrA,
            hpB: hpArrB,
            activeA: nextActiveA === -1 ? activeA : nextActiveA,
            activeB: nextActiveB === -1 ? activeB : nextActiveB,
            statusA: faintedA ? freshStatus() : teamRound.statusA,
            statusB: faintedB ? freshStatus() : teamRound.statusB,
            confusionA: faintedA ? freshConfusion() : teamRound.confusionA,
            confusionB: faintedB ? freshConfusion() : teamRound.confusionB,
            faintedA: faintedA,
            faintedB: faintedB,
            teamWinner: teamWinner,
            itemAUsedNow: itemAConsumed,
            itemBUsedNow: itemBConsumed,
        }
        return
    }

    var listGr = new GlideRecord(ATTR_TABLE)
    listGr.orderBy('name')
    listGr.setLimit(2000)
    listGr.query()
    while (listGr.next()) {
        data.pokemonList.push({
            sys_id: listGr.getUniqueValue(),
            name: capitalize(listGr.getValue('name')),
        })
    }
})()
