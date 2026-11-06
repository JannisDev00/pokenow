(function () {
    var ITEM_TABLE = 'x_2270446_pokenow_item'
    var CATEGORY_TABLE = 'x_2270446_pokenow_item_category'
    var ATTRIBUTE_TABLE = 'x_2270446_pokenow_item_attribute'
    var ATTRIBUTE_MAP_TABLE = 'x_2270446_pokenow_item_attribute_map'

    function fetchJson(functionName, params) {
        var rm = new sn_ws.RESTMessageV2('PokeAPI', functionName)
        for (var key in params) {
            rm.setStringParameterNoEscape(key, params[key])
        }
        rm.setHttpTimeout(30000)
        var response = rm.execute()
        var status = response.getStatusCode()
        if (status < 200 || status >= 300) {
            gs.error('PokeNow item import: ' + functionName + ' failed with status ' + status)
            return null
        }
        return JSON.parse(response.getBody())
    }

    function getOrCreateByName(table, name) {
        var gr = new GlideRecord(table)
        gr.addQuery('name', name)
        gr.query()
        if (gr.next()) {
            return gr.getUniqueValue()
        }
        var ins = new GlideRecord(table)
        ins.initialize()
        ins.setValue('name', name)
        return ins.insert()
    }

    function upsertJunction(table, matchFields, data) {
        var gr = new GlideRecord(table)
        for (var mf in matchFields) {
            gr.addQuery(mf, matchFields[mf])
        }
        gr.query()
        if (!gr.next()) {
            gr.initialize()
            for (var mf2 in matchFields) {
                gr.setValue(mf2, matchFields[mf2])
            }
        }
        for (var df in data) {
            gr.setValue(df, data[df])
        }
        if (gr.isNewRecord()) {
            gr.insert()
        } else {
            gr.update()
        }
    }

    // Effect text is one entry per language - just take the English one.
    function pickEnglishEffect(effectEntries) {
        for (var i = 0; i < effectEntries.length; i++) {
            if (effectEntries[i].language && effectEntries[i].language.name === 'en') {
                return effectEntries[i].short_effect || effectEntries[i].effect || ''
            }
        }
        return ''
    }

    // Flavor text has one entry per (language, game version), roughly in
    // release order - keep the last English one as "most recent".
    function pickLatestEnglishFlavorText(flavorTextEntries) {
        var latest = ''
        for (var i = 0; i < flavorTextEntries.length; i++) {
            if (flavorTextEntries[i].language && flavorTextEntries[i].language.name === 'en') {
                latest = flavorTextEntries[i].text || latest
            }
        }
        return latest
    }

    gs.info('PokeNow item import: fetching item list...')
    var list = fetchJson('listItems', { limit: '3000', offset: '0' })
    if (!list || !list.results) {
        gs.error('PokeNow item import: could not fetch item list, aborting')
        return
    }

    var results = list.results

    var limitProp = gs.getProperty('x_2270446_pokenow.import.items.limit')
    if (limitProp) {
        var limitNum = parseInt(limitProp, 10)
        if (!isNaN(limitNum) && limitNum > 0 && limitNum < results.length) {
            results = results.slice(0, limitNum)
        }
    }

    gs.info('PokeNow item import: ' + results.length + ' items to process')

    var processed = 0
    var failed = 0

    for (var i = 0; i < results.length; i++) {
        var name = results[i].name
        try {
            var p = fetchJson('getItem', { name: name })
            if (!p) {
                failed++
                continue
            }

            var gr = new GlideRecord(ITEM_TABLE)
            gr.addQuery('name', p.name)
            gr.query()
            if (!gr.next()) {
                gr.initialize()
            }

            gr.setValue('id', p.id)
            gr.setValue('name', p.name)
            gr.setValue('cost', p.cost)
            if (p.fling_power !== null && p.fling_power !== undefined) {
                gr.setValue('fling_power', p.fling_power)
            }
            gr.setValue('fling_effect', p.fling_effect ? p.fling_effect.name : '')
            gr.setValue('sprite', (p.sprites && p.sprites.default) || '')
            gr.setValue('effect', pickEnglishEffect(p.effect_entries || []))
            gr.setValue('flavor_text', pickLatestEnglishFlavorText(p.flavor_text_entries || []))
            gr.setValue('game_indices', JSON.stringify(p.game_indices))
            gr.setValue('machines', JSON.stringify(p.machines))

            if (p.category && p.category.name) {
                gr.setValue('category', getOrCreateByName(CATEGORY_TABLE, p.category.name))
            }

            var itemSysId
            if (gr.isNewRecord()) {
                itemSysId = gr.insert()
            } else {
                gr.update()
                itemSysId = gr.getUniqueValue()
            }

            var attributes = p.attributes || []
            for (var a = 0; a < attributes.length; a++) {
                var attrSysId = getOrCreateByName(ATTRIBUTE_TABLE, attributes[a].name)
                upsertJunction(ATTRIBUTE_MAP_TABLE, { item: itemSysId, attribute: attrSysId }, {})
            }

            processed++
            if (processed % 100 === 0) {
                gs.info('PokeNow item import: processed ' + processed + '/' + results.length)
            }
        } catch (e) {
            failed++
            gs.error('PokeNow item import: failed processing ' + name + ': ' + e.message)
        }
    }

    gs.info('PokeNow item import complete. Processed: ' + processed + ', Failed: ' + failed)
})()
