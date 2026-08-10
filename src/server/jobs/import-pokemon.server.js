(function () {
    var POKE_TABLE = 'x_1850095_pokenow_attributes';
    var TYPE_TABLE = 'x_1850095_pokenow_type';
    var STAT_TABLE = 'x_1850095_pokenow_stat';
    var ABILITY_TABLE = 'x_1850095_pokenow_ability';
    var POKE_TYPE_TABLE = 'x_1850095_pokenow_poke_type';
    var POKE_STAT_TABLE = 'x_1850095_pokenow_poke_stat';
    var POKE_ABILITY_TABLE = 'x_1850095_pokenow_poke_ability';

    function fetchJson(functionName, params) {
        var rm = new sn_ws.RESTMessageV2('PokeAPI', functionName);
        for (var key in params) {
            rm.setStringParameterNoEscape(key, params[key]);
        }
        rm.setHttpTimeout(30000);
        var response = rm.execute();
        var status = response.getStatusCode();
        if (status < 200 || status >= 300) {
            gs.error('PokeNow import: ' + functionName + ' failed with status ' + status);
            return null;
        }
        return JSON.parse(response.getBody());
    }

    function attachmentExists(table, sysId, filename) {
        var att = new GlideRecord('sys_attachment');
        att.addQuery('table_name', table);
        att.addQuery('table_sys_id', sysId);
        att.addQuery('file_name', filename);
        att.query();
        return att.next();
    }

    function downloadAndAttach(imageUrl, table, sysId, filename) {
        if (!imageUrl) {
            return;
        }
        if (attachmentExists(table, sysId, filename)) {
            return;
        }
        var rm = new sn_ws.RESTMessageV2('PokeAPI', 'downloadImage');
        rm.setStringParameterNoEscape('imageUrl', imageUrl);
        rm.setHttpTimeout(30000);
        try {
            var response = rm.execute();
            var status = response.getStatusCode();
            if (status >= 200 && status < 300) {
                rm.saveResponseBodyAsAttachment(table, sysId, filename);
            } else {
                gs.error('PokeNow import: image download failed (' + status + '): ' + imageUrl);
            }
        } catch (e) {
            gs.error('PokeNow import: image download exception for ' + imageUrl + ': ' + e.message);
        }
    }

    function getOrCreateByName(table, name) {
        var gr = new GlideRecord(table);
        gr.addQuery('name', name);
        gr.query();
        if (gr.next()) {
            return gr.getUniqueValue();
        }
        var ins = new GlideRecord(table);
        ins.initialize();
        ins.setValue('name', name);
        return ins.insert();
    }

    function upsertJunction(table, matchFields, data) {
        var gr = new GlideRecord(table);
        for (var mf in matchFields) {
            gr.addQuery(mf, matchFields[mf]);
        }
        gr.query();
        if (!gr.next()) {
            gr.initialize();
            for (var mf2 in matchFields) {
                gr.setValue(mf2, matchFields[mf2]);
            }
        }
        for (var df in data) {
            gr.setValue(df, data[df]);
        }
        if (gr.isNewRecord()) {
            gr.insert();
        } else {
            gr.update();
        }
    }

    gs.info('PokeNow import: fetching Pokemon list...');
    var list = fetchJson('listPage', { limit: '2000', offset: '0' });
    if (!list || !list.results) {
        gs.error('PokeNow import: could not fetch Pokemon list, aborting');
        return;
    }

    var results = list.results;

    var limitProp = gs.getProperty('x_1850095_pokenow.import.limit');
    if (limitProp) {
        var limitNum = parseInt(limitProp, 10);
        if (!isNaN(limitNum) && limitNum > 0 && limitNum < results.length) {
            results = results.slice(0, limitNum);
        }
    }

    gs.info('PokeNow import: ' + results.length + ' Pokemon to process');

    var processed = 0;
    var failed = 0;

    for (var i = 0; i < results.length; i++) {
        var name = results[i].name;
        try {
            var p = fetchJson('getPokemon', { name: name });
            if (!p) {
                failed++;
                continue;
            }

            var gr = new GlideRecord(POKE_TABLE);
            gr.addQuery('name', p.name);
            gr.query();
            if (!gr.next()) {
                gr.initialize();
            }
            gr.setValue('id', p.id);
            gr.setValue('name', p.name);
            gr.setValue('base_experience', p.base_experience);
            gr.setValue('height', p.height);
            gr.setValue('weight', p.weight);
            gr.setValue('order', p.order);
            gr.setValue('is_default', p.is_default);
            gr.setValue('location_area_encounters', p.location_area_encounters);
            gr.setValue('forms', JSON.stringify(p.forms));
            gr.setValue('game_indices', JSON.stringify(p.game_indices));
            gr.setValue('held_items', JSON.stringify(p.held_items));
            gr.setValue('moves', JSON.stringify(p.moves));
            gr.setValue('past_abilities', JSON.stringify(p.past_abilities));
            gr.setValue('past_stats', JSON.stringify(p.past_stats));
            gr.setValue('past_types', JSON.stringify(p.past_types));
            gr.setValue('species', JSON.stringify(p.species));
            gr.setValue('sprites', JSON.stringify(p.sprites));
            gr.setValue('cries', JSON.stringify(p.cries));

            var pokeSysId;
            if (gr.isNewRecord()) {
                pokeSysId = gr.insert();
            } else {
                gr.update();
                pokeSysId = gr.getUniqueValue();
            }

            var types = p.types || [];
            for (var t = 0; t < types.length; t++) {
                var typeSysId = getOrCreateByName(TYPE_TABLE, types[t].type.name);
                upsertJunction(
                    POKE_TYPE_TABLE,
                    { pokemon: pokeSysId, type: typeSysId },
                    { slot: types[t].slot }
                );
            }

            var stats = p.stats || [];
            for (var s = 0; s < stats.length; s++) {
                var statSysId = getOrCreateByName(STAT_TABLE, stats[s].stat.name);
                upsertJunction(
                    POKE_STAT_TABLE,
                    { pokemon: pokeSysId, stat: statSysId },
                    { base_stat: stats[s].base_stat, effort: stats[s].effort }
                );
            }

            var abilities = p.abilities || [];
            for (var a = 0; a < abilities.length; a++) {
                var abilitySysId = getOrCreateByName(ABILITY_TABLE, abilities[a].ability.name);
                upsertJunction(
                    POKE_ABILITY_TABLE,
                    { pokemon: pokeSysId, ability: abilitySysId },
                    { slot: abilities[a].slot, is_hidden: abilities[a].is_hidden }
                );
            }

            var sprites = p.sprites || {};
            var defaultSprite = sprites.front_default;
            var officialArt =
                sprites.other &&
                sprites.other['official-artwork'] &&
                sprites.other['official-artwork'].front_default;

            downloadAndAttach(defaultSprite, POKE_TABLE, pokeSysId, p.name + '_default.png');
            downloadAndAttach(officialArt, POKE_TABLE, pokeSysId, p.name + '_official_artwork.png');

            processed++;
            if (processed % 50 === 0) {
                gs.info('PokeNow import: processed ' + processed + '/' + results.length);
            }
        } catch (e) {
            failed++;
            gs.error('PokeNow import: failed processing ' + name + ': ' + e.message);
        }
    }

    gs.info('PokeNow import complete. Processed: ' + processed + ', Failed: ' + failed);
})();
