import { Table, ReferenceColumn, IntegerColumn } from '@servicenow/sdk/core'

// Junction: a Pokemon's base stat values (hp, attack, defense, ...).
export const x_1850095_pokenow_poke_stat = Table({
    name: 'x_1850095_pokenow_poke_stat',
    label: 'Pokemon Stat',
    schema: {
        pokemon: ReferenceColumn({
            label: 'Pokemon',
            referenceTable: 'x_1850095_pokenow_attributes',
            mandatory: true,
        }),
        stat: ReferenceColumn({
            label: 'Stat',
            referenceTable: 'x_1850095_pokenow_stat',
            mandatory: true,
        }),
        base_stat: IntegerColumn({ label: 'Base Stat' }),
        effort: IntegerColumn({ label: 'Effort' }),
    },
})
