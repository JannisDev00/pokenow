import { Table, StringColumn } from '@servicenow/sdk/core'

// Lookup table of Pokemon types (fire, water, electric, ...). Populated
// on demand by the import job the first time each type name is seen.
export const x_2270446_pokenow_type = Table({
    name: 'x_2270446_pokenow_type',
    label: 'Type',
    display: 'name',
    schema: {
        name: StringColumn({ label: 'Name', maxLength: 40, mandatory: true, unique: true }),
    },
})
