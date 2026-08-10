import '@servicenow/sdk/global'
import { ScheduledScript } from '@servicenow/sdk/core'

// Manually-triggered job (Scheduled Jobs > this record > "Execute Now") that
// fetches damage_relations for every imported Pokemon type from PokeAPI and
// populates the type effectiveness matchup table used by the battle widget.
// Run this after "Import All Pokemon" (it needs the type lookup table
// populated first) - cheap, one REST call per type (~18 total).
ScheduledScript({
    $id: Now.ID['import-type-effectiveness'],
    name: 'Import Type Effectiveness',
    script: Now.include('../../server/jobs/import-type-effectiveness.server.js'),
    frequency: 'on_demand',
})
