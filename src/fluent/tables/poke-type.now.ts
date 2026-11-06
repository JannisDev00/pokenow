import { Table, ReferenceColumn, IntegerColumn } from '@servicenow/sdk/core'

// Junction: which types a Pokemon has, and in what slot order.
export const x_2270446_pokenow_poke_type = Table({
    name: 'x_2270446_pokenow_poke_type',
    label: 'Pokemon Type',
    schema: {
        pokemon: ReferenceColumn({
            label: 'Pokemon',
            referenceTable: 'x_2270446_pokenow_attributes',
            mandatory: true,
        }),
        type: ReferenceColumn({
            label: 'Type',
            referenceTable: 'x_2270446_pokenow_type',
            mandatory: true,
        }),
        slot: IntegerColumn({ label: 'Slot' }),
    },
})
