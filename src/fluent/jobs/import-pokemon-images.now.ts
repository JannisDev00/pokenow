import '@servicenow/sdk/global'
import { ScheduledScript } from '@servicenow/sdk/core'

// Manually-triggered job (Scheduled Jobs > this record > "Execute Now") that
// backfills the image_html field from each Pokemon's sprite URL, already
// saved in the "sprites" JSON by the main import - no PokeAPI calls needed,
// just an <img> tag pointing at the same URL. Only processes Pokemon that
// don't have image_html set yet, so it's safe to re-run. Run after "Import
// All Pokemon" (needs sprites already populated).
ScheduledScript({
    $id: Now.ID['import-pokemon-images'],
    name: 'Import Pokemon Images',
    script: Now.include('../../server/jobs/import-pokemon-images.server.js'),
    frequency: 'on_demand',
})
