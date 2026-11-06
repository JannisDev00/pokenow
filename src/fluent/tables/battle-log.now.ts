import { Table, ReferenceColumn, StringColumn, ChoiceColumn } from '@servicenow/sdk/core'

// One row per Pokemon per battle outcome, written by updatePokemonRecord()
// in pokemon-battle.server.js alongside the existing wins/losses counters
// and recent_battles cap-5 JSON on the Pokemon record itself. Unlike those,
// this table is never pruned, so it's the source of truth for the
// leaderboard widget's time-windowed rankings (this week/month/all-time),
// using the standard sys_created_on field as the battle timestamp.
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
        opponent_name: StringColumn({ label: 'Opponent', maxLength: 100 }),
        result: ChoiceColumn({
            label: 'Result',
            mandatory: true,
            choices: {
                win: 'Win',
                loss: 'Loss',
                tie: 'Tie',
            },
        }),
    },
})
