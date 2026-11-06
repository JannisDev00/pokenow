import '@servicenow/sdk/global'
import { ScheduledScript } from '@servicenow/sdk/core'

// Manually-triggered job (Scheduled Jobs > this record > "Execute Now") that
// backfills generation (from the species URL's national dex number - no
// extra PokeAPI calls) and primary_type (slot-1 row from poke_type) for
// Pokemon missing a generation. Needed for the dashboard's group-by-Type /
// group-by-Generation selector. Run after "Import All Pokemon" (needs
// species and poke_type already populated).
ScheduledScript({
    $id: Now.ID['import-pokemon-breakdown-fields'],
    name: 'Import Pokemon Breakdown Fields',
    script: Now.include('../../server/jobs/import-pokemon-breakdown-fields.server.js'),
    frequency: 'on_demand',
})
