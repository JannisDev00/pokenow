import { Table, StringColumn, IntegerColumn, ChoiceColumn, ReferenceColumn } from '@servicenow/sdk/core'

// Lookup + cache table for Pokemon moves. Populated lazily by the battle
// widget the first time a move is needed (see pokemon-battle.server.js) -
// PokeAPI doesn't return move power/accuracy/type as part of a Pokemon's
// own detail record, only the move's name, so per-move detail is fetched
// and cached on demand rather than bulk-imported for all ~900 moves.
export const x_1850095_pokenow_move = Table({
    name: 'x_1850095_pokenow_move',
    label: 'Move',
    display: 'name',
    schema: {
        name: StringColumn({ label: 'Name', maxLength: 100, mandatory: true, unique: true }),
        power: IntegerColumn({ label: 'Power' }),
        accuracy: IntegerColumn({ label: 'Accuracy' }),
        pp: IntegerColumn({ label: 'PP' }),
        damage_class: ChoiceColumn({
            label: 'Damage Class',
            choices: {
                physical: 'Physical',
                special: 'Special',
                status: 'Status',
            },
        }),
        type: ReferenceColumn({ label: 'Type', referenceTable: 'x_1850095_pokenow_type' }),
        // From the move's meta object - which ailment it can inflict (if
        // any), how likely that is, and (for sleep/confusion) how many
        // turns it lasts. Only a subset of PokeAPI's ~22 ailments are
        // actually implemented in battle (see ITEM_EFFECTS-style constant
        // in pokemon-battle.server.js); the rest are stored but unused.
        ailment: StringColumn({ label: 'Ailment', maxLength: 40 }),
        ailment_chance: IntegerColumn({ label: 'Ailment Chance' }),
        min_turns: IntegerColumn({ label: 'Min Turns' }),
        max_turns: IntegerColumn({ label: 'Max Turns' }),
    },
})
