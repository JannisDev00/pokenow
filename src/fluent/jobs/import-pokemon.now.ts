import '@servicenow/sdk/global'
import { ScheduledScript } from '@servicenow/sdk/core'

// Manually-triggered job (Scheduled Jobs > this record > "Execute Now")
// that pulls every Pokemon from PokeAPI, normalizes types/stats/abilities
// into their own tables, and downloads the default + official artwork
// sprites as attachments.
//
// Optional system property "x_1850095_pokenow.import.limit" caps how many
// Pokemon are processed per run - useful for a quick test before running
// the full ~1,351 Pokemon import, which will take a while given it makes
// roughly 3 outbound HTTP calls per Pokemon (detail + 2 images).
ScheduledScript({
    $id: Now.ID['import-all-pokemon'],
    name: 'Import All Pokemon',
    script: Now.include('../../server/jobs/import-pokemon.server.js'),
    frequency: 'on_demand',
})
