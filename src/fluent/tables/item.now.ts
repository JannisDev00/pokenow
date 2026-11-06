import {
    Table,
    IntegerColumn,
    StringColumn,
    UrlColumn,
    ReferenceColumn,
    MultiLineTextColumn,
    JsonColumn,
} from '@servicenow/sdk/core'

// One row per item, one column per top-level attribute returned by the
// PokeAPI item resource (https://pokeapi.co/api/v2/item/{id or name}).
// category/attributes are normalized into their own lookup + junction
// tables (see item-category.now.ts, item-attribute-map.now.ts) so they're
// filterable/reportable. held_by_pokemon and localized names aren't
// imported, and effect/flavor_text keep only one representative English
// entry rather than the full per-game-version history.
export const x_2270446_pokenow_item = Table({
    name: 'x_2270446_pokenow_item',
    label: 'Item',
    display: 'name',
    allowWebServiceAccess: true,
    schema: {
        id: IntegerColumn({ label: 'ID' }),
        name: StringColumn({ label: 'Name', maxLength: 100, mandatory: true, unique: true }),
        cost: IntegerColumn({ label: 'Cost' }),
        fling_power: IntegerColumn({ label: 'Fling Power' }),
        fling_effect: StringColumn({ label: 'Fling Effect', maxLength: 60 }),
        category: ReferenceColumn({ label: 'Category', referenceTable: 'x_2270446_pokenow_item_category' }),
        sprite: UrlColumn({ label: 'Sprite' }),
        effect: MultiLineTextColumn({ label: 'Effect' }),
        flavor_text: MultiLineTextColumn({ label: 'Flavor Text' }),
        game_indices: JsonColumn({ label: 'Game Indices' }),
        machines: JsonColumn({ label: 'Machines' }),
    },
})
