import { Table, StringColumn } from '@servicenow/sdk/core'

// Lookup table of item attributes (holdable, consumable, usable-in-battle, ...).
// Populated on demand by the import job the first time each attribute is seen.
export const x_1850095_pokenow_item_attribute = Table({
    name: 'x_1850095_pokenow_item_attribute',
    label: 'Item Attribute',
    display: 'name',
    schema: {
        name: StringColumn({ label: 'Name', maxLength: 60, mandatory: true, unique: true }),
    },
})
