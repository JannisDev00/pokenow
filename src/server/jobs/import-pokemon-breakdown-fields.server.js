;(function () {
    var ATTR_TABLE = 'x_2270446_pokenow_attributes'
    var POKE_TYPE_TABLE = 'x_2270446_pokenow_poke_type'
    var BATTLE_LOG_TABLE = 'x_2270446_pokenow_battle_log'

    // Fixed national dex ID ranges per generation - avoids an extra PokeAPI
    // call per species just to read its own "generation" field.
    var GENERATION_RANGES = [
        { generation: 1, max: 151 },
        { generation: 2, max: 251 },
        { generation: 3, max: 386 },
        { generation: 4, max: 493 },
        { generation: 5, max: 649 },
        { generation: 6, max: 721 },
        { generation: 7, max: 809 },
        { generation: 8, max: 905 },
        { generation: 9, max: 1025 },
    ]

    function generationForDexId(dexId) {
        for (var i = 0; i < GENERATION_RANGES.length; i++) {
            if (dexId <= GENERATION_RANGES[i].max) {
                return GENERATION_RANGES[i].generation
            }
        }
        return null
    }

    function speciesDexId(speciesJson) {
        try {
            var species = JSON.parse(speciesJson || '{}')
            var match = /\/(\d+)\/?$/.exec(species.url || '')
            return match ? parseInt(match[1], 10) : null
        } catch (e) {
            return null
        }
    }

    function primaryTypeSysId(pokemonSysId) {
        var tgr = new GlideRecord(POKE_TYPE_TABLE)
        tgr.addQuery('pokemon', pokemonSysId)
        tgr.orderBy('slot')
        tgr.setLimit(1)
        tgr.query()
        return tgr.next() ? tgr.getValue('type') : null
    }

    gs.info('PokeNow breakdown fields backfill: finding Pokemon without a generation...')

    var gr = new GlideRecord(ATTR_TABLE)
    gr.addQuery('generation', '')
    gr.orderBy('name')
    gr.setLimit(2000)
    gr.query()

    var processed = 0
    var skipped = 0

    while (gr.next()) {
        try {
            var dexId = speciesDexId(gr.getValue('species'))
            var generation = dexId ? generationForDexId(dexId) : null
            var typeSysId = primaryTypeSysId(gr.getUniqueValue())

            if (!generation && !typeSysId) {
                skipped++
                continue
            }

            if (generation) {
                gr.setValue('generation', generation)
            }
            if (typeSysId) {
                gr.setValue('primary_type', typeSysId)
            }
            gr.update()
            processed++
        } catch (e) {
            skipped++
            gs.error('PokeNow breakdown fields backfill: failed processing ' + gr.getValue('name') + ': ' + e.message)
        }
    }

    gs.info('PokeNow breakdown fields backfill complete. Processed: ' + processed + ', Skipped: ' + skipped)

    gs.info('PokeNow breakdown fields backfill: finding battle log rows without a generation...')

    var logGr = new GlideRecord(BATTLE_LOG_TABLE)
    logGr.addQuery('generation', '')
    logGr.setLimit(2000)
    logGr.query()

    var logProcessed = 0
    var logSkipped = 0

    while (logGr.next()) {
        try {
            var pgr = new GlideRecord(ATTR_TABLE)
            if (!pgr.get(logGr.getValue('pokemon'))) {
                logSkipped++
                continue
            }
            logGr.setValue('primary_type', pgr.getValue('primary_type'))
            logGr.setValue('generation', pgr.getValue('generation'))
            logGr.update()
            logProcessed++
        } catch (e) {
            logSkipped++
            gs.error('PokeNow breakdown fields backfill: failed processing battle log row ' + logGr.getUniqueValue() + ': ' + e.message)
        }
    }

    gs.info('PokeNow breakdown fields backfill complete (battle log). Processed: ' + logProcessed + ', Skipped: ' + logSkipped)
})()
