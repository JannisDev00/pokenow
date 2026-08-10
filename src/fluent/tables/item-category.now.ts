import { Table, StringColumn } from '@servicenow/sdk/core'

// Lookup table of item categories (standard-balls, medicine, held-items, ...).
// Populated on demand by the import job the first time each category is seen.
export const x_1850095_pokenow_item_category = Table({
    name: 'x_1850095_pokenow_item_category',
    label: 'Item Category',
    display: 'name',
    schema: {
        name: StringColumn({ label: 'Name', maxLength: 60, mandatory: true, unique: true }),
    },
})
