import { Table, ReferenceColumn } from '@servicenow/sdk/core'

// Junction: which attributes an item has (countable, holdable, consumable, ...).
export const x_1850095_pokenow_item_attribute_map = Table({
    name: 'x_1850095_pokenow_item_attribute_map',
    label: 'Item Attribute Map',
    schema: {
        item: ReferenceColumn({
            label: 'Item',
            referenceTable: 'x_1850095_pokenow_item',
            mandatory: true,
        }),
        attribute: ReferenceColumn({
            label: 'Attribute',
            referenceTable: 'x_1850095_pokenow_item_attribute',
            mandatory: true,
        }),
    },
})
