import { Table, ReferenceColumn, StringColumn, ChoiceColumn, IntegerColumn, DateTimeColumn } from '@servicenow/sdk/core'

// One row per Pokemon per battle outcome, written by updatePokemonRecord()
// in pokemon-battle.server.js alongside the existing wins/losses counters
// and recent_battles cap-5 JSON on the Pokemon record itself. Unlike those,
// this table is never pruned, so it's the source of truth for the
// leaderboard widget's time-windowed rankings (this week/month/all-time).
export const x_2270446_pokenow_battle_log = Table({
    name: 'x_2270446_pokenow_battle_log',
    label: 'Battle Log',
    allowWebServiceAccess: true,
    schema: {
        pokemon: ReferenceColumn({
            label: 'Pokemon',
            referenceTable: 'x_2270446_pokenow_attributes',
            mandatory: true,
        }),
        // Capitalized copy of the pokemon reference's own name, since the
        // underlying attributes.name is stored lowercase (reference fields
        // display the raw value, not a capitalized one) - kept in sync with
        // opponent_name below, which was already capitalized at the source.
        pokemon_name: StringColumn({ label: 'Pokemon 1', maxLength: 100 }),
        opponent_name: StringColumn({ label: 'Pokemon 2', maxLength: 100 }),
        result: ChoiceColumn({
            label: 'Result',
            mandatory: true,
            choices: {
                win: 'Win',
                loss: 'Loss',
                tie: 'Tie',
            },
        }),
        // Human-readable form of result + pokemon_name (e.g. "Scizor won"),
        // for list display. result itself stays a plain choice field since
        // the dashboard widgets filter on it directly (result=win).
        result_summary: StringColumn({ label: 'Result', maxLength: 120 }),
        // Set alongside sys_created_on (same instant) as a field we control
        // the label on, rather than overriding the system dictionary entry
        // for sys_created_on itself.
        battle_datetime: DateTimeColumn({ label: 'Date and time of battle' }),
        // Snapshotted from the Pokemon record at write time (not dot-walked
        // at query time) so the dashboard's By Type / By Generation widgets
        // can group directly off this table, same as the By Pokemon ones.
        primary_type: ReferenceColumn({ label: 'Primary Type', referenceTable: 'x_2270446_pokenow_type' }),
        generation: IntegerColumn({ label: 'Generation' }),
    },
})
