import { Table, StringColumn } from '@servicenow/sdk/core'

// Lookup table of Pokemon stats (hp, attack, defense, ...). Populated
// on demand by the import job the first time each stat name is seen.
export const x_2270446_pokenow_stat = Table({
    name: 'x_2270446_pokenow_stat',
    label: 'Stat',
    display: 'name',
    schema: {
        name: StringColumn({ label: 'Name', maxLength: 40, mandatory: true, unique: true }),
    },
})
