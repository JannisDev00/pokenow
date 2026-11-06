import { Table, ReferenceColumn, StringColumn, ChoiceColumn, IntegerColumn, DateTimeColumn } from '@servicenow/sdk/core'

// One row per completed Tournament mode attempt, written when a run ends
// (champion or eliminated) - deliberately separate from battle_log so
// Tournament results don't blend into the regular 1v1/4v4 win/loss
// counters or the "Wins by Pokemon" dashboard. Individual rounds within a
// run aren't logged, just the final tally.
export const x_2270446_pokenow_tournament_run = Table({
    name: 'x_2270446_pokenow_tournament_run',
    label: 'Tournament Run',
    allowWebServiceAccess: true,
    schema: {
        pokemon: ReferenceColumn({
            label: 'Pokemon',
            referenceTable: 'x_2270446_pokenow_attributes',
            mandatory: true,
        }),
        pokemon_name: StringColumn({ label: 'Pokemon', maxLength: 100 }),
        difficulty: ChoiceColumn({
            label: 'Difficulty',
            mandatory: true,
            choices: {
                easy: 'Easy',
                moderate: 'Moderate',
                hard: 'Hard',
            },
        }),
        length_mode: ChoiceColumn({
            label: 'Length',
            mandatory: true,
            choices: {
                fixed: 'Fixed (5 rounds)',
                endless: 'Endless Survival',
            },
        }),
        rounds_won: IntegerColumn({ label: 'Rounds Won', default: 0 }),
        outcome: ChoiceColumn({
            label: 'Outcome',
            mandatory: true,
            choices: {
                champion: 'Champion',
                eliminated: 'Eliminated',
            },
        }),
        ended_at: DateTimeColumn({ label: 'Date and time of tournament' }),
    },
})
