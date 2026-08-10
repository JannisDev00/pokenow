import { Table, ReferenceColumn, FloatColumn } from '@servicenow/sdk/core'

// Type matchup multipliers (attacking type -> defending type), imported from
// PokeAPI's /type/{name} damage_relations. Only non-1x relations are stored,
// mirroring the shape of damage_relations itself - a missing row means a
// normal (1x) matchup. See jobs/import-type-effectiveness.now.ts.
export const x_1850095_pokenow_type_effectiveness = Table({
    name: 'x_1850095_pokenow_type_effectiveness',
    label: 'Type Effectiveness',
    schema: {
        attacking_type: ReferenceColumn({
            label: 'Attacking Type',
            referenceTable: 'x_1850095_pokenow_type',
            mandatory: true,
        }),
        defending_type: ReferenceColumn({
            label: 'Defending Type',
            referenceTable: 'x_1850095_pokenow_type',
            mandatory: true,
        }),
        multiplier: FloatColumn({ label: 'Multiplier', scale: 2 }),
    },
})
