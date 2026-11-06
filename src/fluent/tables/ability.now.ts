import { Table, StringColumn } from '@servicenow/sdk/core'

// Lookup table of Pokemon abilities. Populated on demand by the import
// job the first time each ability name is seen.
export const x_2270446_pokenow_ability = Table({
    name: 'x_2270446_pokenow_ability',
    label: 'Ability',
    display: 'name',
    schema: {
        name: StringColumn({ label: 'Name', maxLength: 100, mandatory: true, unique: true }),
    },
})
