import {
    Table,
    IntegerColumn,
    StringColumn,
    BooleanColumn,
    UrlColumn,
    JsonColumn,
    HtmlColumn,
} from '@servicenow/sdk/core'

// One row per Pokemon, one column per top-level attribute returned by the
// PokeAPI pokemon resource (https://pokeapi.co/api/v2/pokemon/{id or name}).
// abilities/stats/types are normalized out into their own lookup + junction
// tables (see poke-type.now.ts, poke-stat.now.ts, poke-ability.now.ts) so
// they're filterable/reportable; the remaining attributes are long-tail data
// that's rarely queried, so they stay as JSON to preserve full structure.
export const x_1850095_pokenow_attributes = Table({
    name: 'x_1850095_pokenow_attributes',
    label: 'Pokemons',
    display: 'name',
    allowWebServiceAccess: true,
    schema: {
        id: IntegerColumn({ label: 'ID' }),
        name: StringColumn({ label: 'Name', maxLength: 100, mandatory: true }),
        base_experience: IntegerColumn({ label: 'Base Experience' }),
        height: IntegerColumn({ label: 'Height' }),
        weight: IntegerColumn({ label: 'Weight' }),
        order: IntegerColumn({ label: 'Order' }),
        is_default: BooleanColumn({ label: 'Is Default' }),
        location_area_encounters: UrlColumn({ label: 'Location Area Encounters' }),
        forms: JsonColumn({ label: 'Forms' }),
        game_indices: JsonColumn({ label: 'Game Indices' }),
        held_items: JsonColumn({ label: 'Held Items' }),
        moves: JsonColumn({ label: 'Moves' }),
        past_abilities: JsonColumn({ label: 'Past Abilities' }),
        past_stats: JsonColumn({ label: 'Past Stats' }),
        past_types: JsonColumn({ label: 'Past Types' }),
        species: JsonColumn({ label: 'Species' }),
        sprites: JsonColumn({ label: 'Sprites' }),
        cries: JsonColumn({ label: 'Cries' }),
        // Official artwork sprite, as an <img> tag pointing at the same URL
        // already in sprites.other.official-artwork.front_default. HTML
        // fields render their content inline on the form view, so this
        // shows the actual picture without needing to download/attach any
        // binary data. Backfilled by the "Import Pokemon Images" job, which
        // just re-derives this from the sprites already saved by the main
        // import - no extra REST calls needed.
        image_html: HtmlColumn({ label: 'Image' }),
        wins: IntegerColumn({ label: 'Wins', default: 0 }),
        losses: IntegerColumn({ label: 'Losses', default: 0 }),
        // Up to 5 most-recent battle outcomes, newest first:
        // [{ opponent, result: 'win'|'loss'|'tie', date }, ...]
        recent_battles: JsonColumn({ label: 'Recent Battles' }),
    },
})
