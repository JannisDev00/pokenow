api.controller = function ($timeout) {
    var c = this

    // ---- Mode selection ----
    c.mode = '' // '1v1' | '4v4'
    c.teamControlMode = '' // 'ai' | 'manual' (4v4 only)

    // ---- Pokemon search (1v1 pickers + 4v4 team slots) ----
    var MAX_SEARCH_RESULTS = 20

    function filterPokemonList(query) {
        if (!query) {
            return []
        }
        var q = query.toLowerCase()
        var matches = []
        for (var i = 0; i < c.data.pokemonList.length && matches.length < MAX_SEARCH_RESULTS; i++) {
            if (c.data.pokemonList[i].name.toLowerCase().indexOf(q) !== -1) {
                matches.push(c.data.pokemonList[i])
            }
        }
        return matches
    }

    function shuffledCopy(list) {
        var pool = list.slice()
        for (var i = pool.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1))
            var tmp = pool[i]
            pool[i] = pool[j]
            pool[j] = tmp
        }
        return pool
    }

    // ---- 1v1 state ----
    c.pokemonA = ''
    c.pokemonB = ''
    c.search = { a: '', b: '' }
    c.searchResults = { a: [], b: [] }
    c.searchFocus = { a: false, b: false }
    c.result = null
    c.hpA = 0
    c.hpB = 0
    c.maxHpA = 0
    c.maxHpB = 0
    c.winner = ''
    c.aRecord = { wins: 0, losses: 0, recentBattles: [] }
    c.bRecord = { wins: 0, losses: 0, recentBattles: [] }
    c.itemA = null
    c.itemB = null
    c.itemAUsed = false
    c.itemBUsed = false

    // Status/confusion always describe whichever Pokemon is currently
    // active on each side - there's no manual switching, so a freshly
    // active Pokemon (via auto-switch or a fresh battle) always starts
    // clean. Shared shape/names between 1v1 and 4v4 for this reason.
    c.statusA = { type: null, turnsRemaining: 0 }
    c.statusB = { type: null, turnsRemaining: 0 }
    c.confusionA = { turnsRemaining: 0 }
    c.confusionB = { turnsRemaining: 0 }

    // ---- 4v4 state ----
    c.teamA = ['', '', '', '']
    c.teamB = ['', '', '', '']
    c.teamSearch = { a: ['', '', '', ''], b: ['', '', '', ''] }
    c.teamSearchResults = { a: [[], [], [], []], b: [[], [], [], []] }
    c.teamSearchFocus = { a: [false, false, false, false], b: [false, false, false, false] }
    c.teamResult = null
    c.activeA = 0
    c.activeB = 0
    c.hpArrA = [0, 0, 0, 0]
    c.hpArrB = [0, 0, 0, 0]
    c.selectedMoveA = null
    c.selectedMoveB = null
    c.itemChosenA = false
    c.itemChosenB = false
    c.teamItemA = null
    c.teamItemB = null
    c.teamItemAUsed = false
    c.teamItemBUsed = false
    c.teamWinner = ''
    c.teamTurnBusy = false

    // ---- shared state ----
    c.loading = false
    c.started = false
    c.turnBusy = false
    c.errorMsg = ''
    c.battleLog = []
    c.currentRound = 1

    // ---- mode navigation ----
    c.selectMode = function (mode) {
        c.mode = mode
        c.errorMsg = ''
    }

    c.backToModeSelect = function () {
        c.mode = ''
        c.teamControlMode = ''
        c.started = false
        c.errorMsg = ''
    }

    c.selectTeamControlMode = function (mode) {
        c.teamControlMode = mode
        c.errorMsg = ''
    }

    c.backToControlModeSelect = function () {
        c.teamControlMode = ''
        c.errorMsg = ''
    }

    // ---- shared helpers ----
    c.hpPercent = function (hp, maxHp) {
        if (!maxHp) {
            return 0
        }
        return Math.max(0, Math.min(100, Math.round((hp / maxHp) * 100)))
    }

    c.hpBarClass = function (hp, maxHp) {
        var pct = c.hpPercent(hp, maxHp)
        if (pct > 50) {
            return 'progress-bar-success'
        }
        if (pct > 20) {
            return 'progress-bar-warning'
        }
        return 'progress-bar-danger'
    }

    var STATUS_LABELS = {
        poison: 'Poisoned',
        burn: 'Burned',
        paralysis: 'Paralyzed',
        sleep: 'Asleep',
        freeze: 'Frozen',
        confusion: 'Confused',
    }

    c.statusLabel = function (status) {
        if (!status || !status.type) {
            return ''
        }
        return STATUS_LABELS[status.type] || status.type
    }

    c.ailmentLabel = function (name) {
        return STATUS_LABELS[name] || name
    }

    // Plays a round's log entries out one at a time. onEntry (if given) is
    // called per entry so team mode can route hp into the right roster slot
    // instead of the flat c.hpA/c.hpB scalars 1v1 uses.
    function playRoundLog(log, index, onDone, onEntry) {
        if (index >= log.length) {
            onDone()
            return
        }
        var entry = log[index]
        entry.round = c.currentRound
        if (onEntry) {
            onEntry(entry)
        } else {
            c.hpA = entry.hpA
            c.hpB = entry.hpB
        }
        c.battleLog.unshift(entry)
        $timeout(function () {
            playRoundLog(log, index + 1, onDone, onEntry)
        }, 700)
    }

    // ==================== 1v1 ====================

    c.canStart = function () {
        return !!c.pokemonA && !!c.pokemonB && c.pokemonA !== c.pokemonB && !c.loading && !c.started
    }

    c.startBattle = function () {
        if (!c.canStart()) {
            return
        }
        c.loading = true
        c.errorMsg = ''
        c.result = null
        c.battleLog = []
        c.winner = ''

        c.server.get({ action: 'setup', pokemonA: c.pokemonA, pokemonB: c.pokemonB }).then(function (r) {
            c.loading = false
            if (r.data.error) {
                c.errorMsg = r.data.error
                return
            }
            c.result = r.data.result
            c.maxHpA = c.result.a.maxHp
            c.maxHpB = c.result.b.maxHp
            c.hpA = c.maxHpA
            c.hpB = c.maxHpB
            c.aRecord = { wins: c.result.a.wins, losses: c.result.a.losses, recentBattles: c.result.a.recentBattles }
            c.bRecord = { wins: c.result.b.wins, losses: c.result.b.losses, recentBattles: c.result.b.recentBattles }
            c.itemA = c.result.itemA
            c.itemB = c.result.itemB
            c.itemAUsed = false
            c.itemBUsed = false
            c.statusA = { type: null, turnsRemaining: 0 }
            c.statusB = { type: null, turnsRemaining: 0 }
            c.confusionA = { turnsRemaining: 0 }
            c.confusionB = { turnsRemaining: 0 }
            c.currentRound = 1
            c.started = true
        })
    }

    function handleTurnResponse(r) {
        if (r.data.error) {
            c.errorMsg = r.data.error
            c.turnBusy = false
            return
        }
        playRoundLog(r.data.result.log, 0, function () {
            c.turnBusy = false
            c.currentRound++
            c.statusA = r.data.result.statusA
            c.statusB = r.data.result.statusB
            c.confusionA = r.data.result.confusionA
            c.confusionB = r.data.result.confusionB
            if (r.data.result.itemAUsedNow) {
                c.itemAUsed = true
            }
            if (r.data.result.itemBUsedNow) {
                c.itemBUsed = true
            }
            if (r.data.result.winner) {
                c.winner = r.data.result.winner
                if (r.data.result.aRecord) {
                    c.aRecord = r.data.result.aRecord
                }
                if (r.data.result.bRecord) {
                    c.bRecord = r.data.result.bRecord
                }
            }
        })
    }

    c.chooseMove = function (move) {
        if (c.turnBusy || c.winner || !c.started) {
            return
        }
        c.turnBusy = true
        c.errorMsg = ''

        var bMoveNames = []
        for (var i = 0; i < c.result.b.moves.length; i++) {
            bMoveNames.push(c.result.b.moves[i].name)
        }

        c.server
            .get({
                action: 'turn',
                pokemonA: c.pokemonA,
                pokemonB: c.pokemonB,
                chosenMove: move.name,
                bMoveNames: bMoveNames,
                hpA: c.hpA,
                hpB: c.hpB,
                statusA: c.statusA,
                statusB: c.statusB,
                confusionA: c.confusionA,
                confusionB: c.confusionB,
                itemAName: c.itemA ? c.itemA.rawName : null,
                itemBName: c.itemB ? c.itemB.rawName : null,
                itemBUsed: c.itemBUsed,
            })
            .then(handleTurnResponse)
    }

    c.useItem = function () {
        if (c.turnBusy || c.winner || !c.started || c.itemAUsed || !c.itemA || c.itemA.kind !== 'heal') {
            return
        }
        c.turnBusy = true
        c.errorMsg = ''

        var bMoveNames = []
        for (var i = 0; i < c.result.b.moves.length; i++) {
            bMoveNames.push(c.result.b.moves[i].name)
        }

        c.server
            .get({
                action: 'turn',
                pokemonA: c.pokemonA,
                pokemonB: c.pokemonB,
                useItem: true,
                bMoveNames: bMoveNames,
                hpA: c.hpA,
                hpB: c.hpB,
                statusA: c.statusA,
                statusB: c.statusB,
                confusionA: c.confusionA,
                confusionB: c.confusionB,
                itemAName: c.itemA.rawName,
                itemBName: c.itemB ? c.itemB.rawName : null,
                itemBUsed: c.itemBUsed,
            })
            .then(handleTurnResponse)
    }

    c.newBattle = function () {
        c.started = false
        c.result = null
        c.battleLog = []
        c.winner = ''
        c.errorMsg = ''
        c.currentRound = 1
        c.statusA = { type: null, turnsRemaining: 0 }
        c.statusB = { type: null, turnsRemaining: 0 }
        c.confusionA = { turnsRemaining: 0 }
        c.confusionB = { turnsRemaining: 0 }
    }

    // Search-as-you-type picker for the 1v1 selects, since scrolling a
    // 1300+ option <select> isn't practical. Typing clears any existing
    // pick until a result is clicked; results close on blur (delayed so
    // the click on a result registers first).
    c.onSearch = function (side) {
        if (side === 'a') {
            c.pokemonA = ''
        } else {
            c.pokemonB = ''
        }
        c.searchResults[side] = filterPokemonList(c.search[side])
    }

    c.focusSearch = function (side) {
        c.searchFocus[side] = true
    }

    c.blurSearch = function (side) {
        $timeout(function () {
            c.searchFocus[side] = false
        }, 200)
    }

    c.pickPokemon = function (side, p) {
        if (side === 'a') {
            c.pokemonA = p.sys_id
        } else {
            c.pokemonB = p.sys_id
        }
        c.search[side] = p.name
        c.searchResults[side] = []
        c.searchFocus[side] = false
    }

    c.randomize1v1 = function () {
        if (c.started) {
            return
        }
        var pool = shuffledCopy(c.data.pokemonList)
        if (pool.length < 2) {
            return
        }
        c.pickPokemon('a', pool[0])
        c.pickPokemon('b', pool[1])
    }

    // ==================== 4v4 ====================

    c.randomizeTeam = function (side) {
        var pool = shuffledCopy(c.data.pokemonList)
        var picks = []
        var names = []
        for (var k = 0; k < 4 && k < pool.length; k++) {
            picks.push(pool[k].sys_id)
            names.push(pool[k].name)
        }
        var key = side === 'A' ? 'a' : 'b'
        if (side === 'A') {
            c.teamA = picks
        } else {
            c.teamB = picks
        }
        c.teamSearch[key] = names
        c.teamSearchResults[key] = [[], [], [], []]
    }

    // Search-as-you-type picker for the 4v4 team slots, same reasoning as
    // c.onSearch/c.pickPokemon above.
    c.onTeamSearch = function (side, idx) {
        ;(side === 'a' ? c.teamA : c.teamB)[idx] = ''
        c.teamSearchResults[side][idx] = filterPokemonList(c.teamSearch[side][idx])
    }

    c.focusTeamSearch = function (side, idx) {
        c.teamSearchFocus[side][idx] = true
    }

    c.blurTeamSearch = function (side, idx) {
        $timeout(function () {
            c.teamSearchFocus[side][idx] = false
        }, 200)
    }

    c.pickTeamPokemon = function (side, idx, p) {
        ;(side === 'a' ? c.teamA : c.teamB)[idx] = p.sys_id
        c.teamSearch[side][idx] = p.name
        c.teamSearchResults[side][idx] = []
        c.teamSearchFocus[side][idx] = false
    }

    function hasFourDistinct(team) {
        var seen = {}
        var count = 0
        for (var i = 0; i < team.length; i++) {
            if (!team[i]) {
                return false
            }
            if (!seen[team[i]]) {
                seen[team[i]] = true
                count++
            }
        }
        return count === 4
    }

    c.canStartTeamBattle = function () {
        return !c.loading && !c.started && hasFourDistinct(c.teamA) && hasFourDistinct(c.teamB)
    }

    c.startTeamBattle = function () {
        if (!c.canStartTeamBattle()) {
            return
        }
        c.loading = true
        c.errorMsg = ''
        c.teamResult = null
        c.battleLog = []
        c.teamWinner = ''

        c.server
            .get({ action: 'teamSetup', teamA: c.teamA, teamB: c.teamB, controlMode: c.teamControlMode })
            .then(function (r) {
                c.loading = false
                if (r.data.error) {
                    c.errorMsg = r.data.error
                    return
                }
                c.teamResult = r.data.result
                c.activeA = 0
                c.activeB = 0
                c.hpArrA = []
                c.hpArrB = []
                for (var i = 0; i < 4; i++) {
                    c.hpArrA.push(c.teamResult.teamA[i].maxHp)
                    c.hpArrB.push(c.teamResult.teamB[i].maxHp)
                }
                c.selectedMoveA = null
                c.selectedMoveB = null
                c.itemChosenA = false
                c.itemChosenB = false
                c.teamItemA = c.teamResult.itemA
                c.teamItemB = c.teamResult.itemB
                c.teamItemAUsed = false
                c.teamItemBUsed = false
                c.statusA = { type: null, turnsRemaining: 0 }
                c.statusB = { type: null, turnsRemaining: 0 }
                c.confusionA = { turnsRemaining: 0 }
                c.confusionB = { turnsRemaining: 0 }
                c.currentRound = 1
                c.started = true
            })
    }

    function bothTeamActionsChosen() {
        return (c.selectedMoveA || c.itemChosenA) && (c.selectedMoveB || c.itemChosenB)
    }

    c.chooseTeamMove = function (side, move) {
        if (c.teamTurnBusy || c.teamWinner || !c.started) {
            return
        }
        if (side === 'A') {
            c.selectedMoveA = move
            c.itemChosenA = false
        } else {
            c.selectedMoveB = move
            c.itemChosenB = false
        }

        if (c.teamControlMode === 'ai') {
            if (side === 'A') {
                c.resolveTeamRound()
            }
            return
        }

        if (bothTeamActionsChosen()) {
            c.resolveTeamRound()
        }
    }

    c.useTeamItem = function (side) {
        if (c.teamTurnBusy || c.teamWinner || !c.started) {
            return
        }
        if (side === 'A') {
            if (c.teamItemAUsed || !c.teamItemA) {
                return
            }
            c.itemChosenA = true
            c.selectedMoveA = null
        } else {
            if (c.teamItemBUsed || !c.teamItemB) {
                return
            }
            c.itemChosenB = true
            c.selectedMoveB = null
        }

        if (c.teamControlMode === 'ai') {
            if (side === 'A') {
                c.resolveTeamRound()
            }
            return
        }

        if (bothTeamActionsChosen()) {
            c.resolveTeamRound()
        }
    }

    c.resolveTeamRound = function () {
        c.teamTurnBusy = true
        c.errorMsg = ''

        var payload = {
            action: 'teamTurn',
            teamA: c.teamA,
            teamB: c.teamB,
            controlMode: c.teamControlMode,
            activeA: c.activeA,
            activeB: c.activeB,
            hpA: c.hpArrA,
            hpB: c.hpArrB,
            statusA: c.statusA,
            statusB: c.statusB,
            confusionA: c.confusionA,
            confusionB: c.confusionB,
            itemAName: c.teamItemA ? c.teamItemA.rawName : null,
            itemBName: c.teamItemB ? c.teamItemB.rawName : null,
            itemBUsed: c.teamItemBUsed,
        }

        if (c.itemChosenA) {
            payload.useItemA = true
        } else {
            payload.chosenMoveA = c.selectedMoveA.name
        }

        if (c.teamControlMode === 'manual') {
            if (c.itemChosenB) {
                payload.useItemB = true
            } else {
                payload.chosenMoveB = c.selectedMoveB.name
            }
        } else {
            var activeBMoveNames = []
            var activeBMoves = c.teamResult.teamB[c.activeB].moves
            for (var i = 0; i < activeBMoves.length; i++) {
                activeBMoveNames.push(activeBMoves[i].name)
            }
            payload.activeBMoveNames = activeBMoveNames
        }

        c.server.get(payload).then(function (r) {
            if (r.data.error) {
                c.errorMsg = r.data.error
                c.teamTurnBusy = false
                c.selectedMoveA = null
                c.selectedMoveB = null
                c.itemChosenA = false
                c.itemChosenB = false
                return
            }
            var result = r.data.result

            playRoundLog(
                result.log,
                0,
                function () {
                    c.hpArrA = result.hpA
                    c.hpArrB = result.hpB
                    c.statusA = result.statusA
                    c.statusB = result.statusB
                    c.confusionA = result.confusionA
                    c.confusionB = result.confusionB

                    if (result.itemAUsedNow) {
                        c.teamItemAUsed = true
                    }
                    if (result.itemBUsedNow) {
                        c.teamItemBUsed = true
                    }

                    if (result.faintedA && result.activeA !== c.activeA) {
                        c.battleLog.unshift({
                            switchMessage: true,
                            text: c.teamResult.teamA[result.activeA].name + ' was sent out!',
                        })
                    }
                    if (result.faintedB && result.activeB !== c.activeB) {
                        c.battleLog.unshift({
                            switchMessage: true,
                            text: c.teamResult.teamB[result.activeB].name + ' was sent out!',
                        })
                    }

                    c.activeA = result.activeA
                    c.activeB = result.activeB
                    c.selectedMoveA = null
                    c.selectedMoveB = null
                    c.itemChosenA = false
                    c.itemChosenB = false
                    c.teamTurnBusy = false
                    c.currentRound++

                    if (result.teamWinner) {
                        c.teamWinner = result.teamWinner
                    }
                },
                function (entry) {
                    c.hpArrA[c.activeA] = entry.hpA
                    c.hpArrB[c.activeB] = entry.hpB
                }
            )
        })
    }

    c.newTeamBattle = function () {
        c.started = false
        c.teamResult = null
        c.battleLog = []
        c.teamWinner = ''
        c.errorMsg = ''
        c.currentRound = 1
        c.selectedMoveA = null
        c.selectedMoveB = null
        c.itemChosenA = false
        c.itemChosenB = false
        c.statusA = { type: null, turnsRemaining: 0 }
        c.statusB = { type: null, turnsRemaining: 0 }
        c.confusionA = { turnsRemaining: 0 }
        c.confusionB = { turnsRemaining: 0 }
    }
}
