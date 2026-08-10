import '@servicenow/sdk/global'
import { RestMessage } from '@servicenow/sdk/core'

// Outbound integration used by the import job to pull Pokemon data and
// sprite images from https://pokeapi.co.
RestMessage({
    $id: Now.ID['pokeapi'],
    name: 'PokeAPI',
    endpoint: 'https://pokeapi.co/api/v2',
    description: 'Public PokeAPI - Pokemon data and sprite images',
    authenticationType: 'noAuthentication',
    headers: [
        { $id: Now.ID['pokeapi-header-accept'], name: 'Accept', value: 'application/json' },
    ],
    functions: [
        {
            name: 'listPage',
            httpMethod: 'GET',
            endpoint: 'https://pokeapi.co/api/v2/pokemon',
            variables: [
                { $id: Now.ID['pokeapi-list-var-limit'], name: 'limit' },
                { $id: Now.ID['pokeapi-list-var-offset'], name: 'offset' },
            ],
            queryParams: [
                { $id: Now.ID['pokeapi-list-param-limit'], name: 'limit', value: '${limit}', order: 1 },
                { $id: Now.ID['pokeapi-list-param-offset'], name: 'offset', value: '${offset}', order: 2 },
            ],
        },
        {
            name: 'getPokemon',
            httpMethod: 'GET',
            endpoint: 'https://pokeapi.co/api/v2/pokemon/${name}',
            variables: [{ $id: Now.ID['pokeapi-get-var-name'], name: 'name' }],
        },
        {
            name: 'downloadImage',
            httpMethod: 'GET',
            // Full URL is substituted in at runtime - sprite images are
            // hosted on a different host (raw.githubusercontent.com).
            endpoint: '${imageUrl}',
            variables: [{ $id: Now.ID['pokeapi-download-var-url'], name: 'imageUrl' }],
        },
        {
            name: 'getType',
            httpMethod: 'GET',
            endpoint: 'https://pokeapi.co/api/v2/type/${name}',
            variables: [{ $id: Now.ID['pokeapi-get-type-var-name'], name: 'name' }],
        },
        {
            name: 'getMove',
            httpMethod: 'GET',
            endpoint: 'https://pokeapi.co/api/v2/move/${name}',
            variables: [{ $id: Now.ID['pokeapi-get-move-var-name'], name: 'name' }],
        },
        {
            name: 'listItems',
            httpMethod: 'GET',
            endpoint: 'https://pokeapi.co/api/v2/item',
            variables: [
                { $id: Now.ID['pokeapi-list-items-var-limit'], name: 'limit' },
                { $id: Now.ID['pokeapi-list-items-var-offset'], name: 'offset' },
            ],
            queryParams: [
                { $id: Now.ID['pokeapi-list-items-param-limit'], name: 'limit', value: '${limit}', order: 1 },
                { $id: Now.ID['pokeapi-list-items-param-offset'], name: 'offset', value: '${offset}', order: 2 },
            ],
        },
        {
            name: 'getItem',
            httpMethod: 'GET',
            endpoint: 'https://pokeapi.co/api/v2/item/${name}',
            variables: [{ $id: Now.ID['pokeapi-get-item-var-name'], name: 'name' }],
        },
    ],
})
