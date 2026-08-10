import { Table, ReferenceColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'

// Junction: which abilities a Pokemon can have, slot order, and whether
// the ability is a hidden ability.
export const x_1850095_pokenow_poke_ability = Table({
    name: 'x_1850095_pokenow_poke_ability',
    label: 'Pokemon Ability',
    schema: {
        pokemon: ReferenceColumn({
            label: 'Pokemon',
            referenceTable: 'x_1850095_pokenow_attributes',
            mandatory: true,
        }),
        ability: ReferenceColumn({
            label: 'Ability',
            referenceTable: 'x_1850095_pokenow_ability',
            mandatory: true,
        }),
        slot: IntegerColumn({ label: 'Slot' }),
        is_hidden: BooleanColumn({ label: 'Is Hidden' }),
    },
})
