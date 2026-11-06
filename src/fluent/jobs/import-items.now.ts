import '@servicenow/sdk/global'
import { ScheduledScript } from '@servicenow/sdk/core'

// Manually-triggered job (Scheduled Jobs > this record > "Execute Now") that
// pulls every item from PokeAPI, normalizes category/attributes into their
// own tables, and stores one representative English effect/flavor text per
// item rather than the full per-game-version history.
//
// Optional system property "x_2270446_pokenow.import.items.limit" caps how
// many items are processed per run - useful for a quick test before running
// the full ~2223 item import.
ScheduledScript({
    $id: Now.ID['import-all-items'],
    name: 'Import All Items',
    script: Now.include('../../server/jobs/import-items.server.js'),
    frequency: 'on_demand',
})
