(function () {
    var TYPE_TABLE = 'x_2270446_pokenow_type'
    var EFFECT_TABLE = 'x_2270446_pokenow_type_effectiveness'

    function fetchJson(functionName, params) {
        var rm = new sn_ws.RESTMessageV2('PokeAPI', functionName)
        for (var key in params) {
            rm.setStringParameterNoEscape(key, params[key])
        }
        rm.setHttpTimeout(30000)
        var response = rm.execute()
        var status = response.getStatusCode()
        if (status < 200 || status >= 300) {
            gs.error('PokeNow type effectiveness import: ' + functionName + ' failed with status ' + status)
            return null
        }
        return JSON.parse(response.getBody())
    }

    function upsertEffectiveness(attackingTypeId, defendingTypeId, multiplier) {
        var gr = new GlideRecord(EFFECT_TABLE)
        gr.addQuery('attacking_type', attackingTypeId)
        gr.addQuery('defending_type', defendingTypeId)
        gr.query()
        if (!gr.next()) {
            gr.initialize()
            gr.setValue('attacking_type', attackingTypeId)
            gr.setValue('defending_type', defendingTypeId)
        }
        gr.setValue('multiplier', multiplier)
        if (gr.isNewRecord()) {
            gr.insert()
        } else {
            gr.update()
        }
    }

    function applyRelations(attackingId, typeIdByName, relatedTypes, multiplier) {
        for (var i = 0; i < relatedTypes.length; i++) {
            var defendingId = typeIdByName[relatedTypes[i].name]
            if (defendingId) {
                upsertEffectiveness(attackingId, defendingId, multiplier)
            }
        }
    }

    gs.info('PokeNow type effectiveness import: starting')

    var typeIdByName = {}
    var typeNames = []
    var tgr = new GlideRecord(TYPE_TABLE)
    tgr.setLimit(50)
    tgr.query()
    while (tgr.next()) {
        var n = tgr.getValue('name')
        typeIdByName[n] = tgr.getUniqueValue()
        typeNames.push(n)
    }

    gs.info('PokeNow type effectiveness import: ' + typeNames.length + ' types to process')

    var processed = 0
    var failed = 0

    for (var i = 0; i < typeNames.length; i++) {
        var typeName = typeNames[i]
        try {
            var detail = fetchJson('getType', { name: typeName })
            if (!detail || !detail.damage_relations) {
                failed++
                continue
            }

            var attackingId = typeIdByName[typeName]
            var relations = detail.damage_relations

            applyRelations(attackingId, typeIdByName, relations.double_damage_to || [], 2)
            applyRelations(attackingId, typeIdByName, relations.half_damage_to || [], 0.5)
            applyRelations(attackingId, typeIdByName, relations.no_damage_to || [], 0)

            processed++
        } catch (e) {
            failed++
            gs.error('PokeNow type effectiveness import: failed processing ' + typeName + ': ' + e.message)
        }
    }

    gs.info('PokeNow type effectiveness import complete. Processed: ' + processed + ', Failed: ' + failed)
})()
