(function () {
    var ATTR_TABLE = 'x_1850095_pokenow_attributes'

    gs.info('PokeNow image backfill: finding Pokemon without an image...')

    var gr = new GlideRecord(ATTR_TABLE)
    gr.addQuery('image_html', '')
    gr.orderBy('name')
    gr.setLimit(2000)
    gr.query()

    var processed = 0
    var skipped = 0

    while (gr.next()) {
        try {
            var sprites = JSON.parse(gr.getValue('sprites') || '{}')
            var imageUrl =
                (sprites.other && sprites.other['official-artwork'] && sprites.other['official-artwork'].front_default) ||
                sprites.front_default ||
                ''

            if (!imageUrl) {
                skipped++
                continue
            }

            gr.setValue('image_html', '<img src="' + imageUrl + '" alt="' + gr.getValue('name') + '" style="max-height:200px;max-width:100%;">')
            gr.update()
            processed++
        } catch (e) {
            skipped++
            gs.error('PokeNow image backfill: failed processing ' + gr.getValue('name') + ': ' + e.message)
        }
    }

    gs.info('PokeNow image backfill complete. Processed: ' + processed + ', Skipped (no sprite): ' + skipped)
})()
