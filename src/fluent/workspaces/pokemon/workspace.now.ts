import '@servicenow/sdk/global'
import { Workspace, Acl } from '@servicenow/sdk/core'
import { pokemonWorkspaceListConfig, pokemonWorkspaceUserRole } from './list-menu.now'

export const pokemonWorkspace = Workspace({
    $id: Now.ID['pokemon-workspace'],
    title: 'Pokemon Workspace',
    path: 'pokemon-workspace',
    landingPath: 'home',
    tables: [
        'x_2270446_pokenow_attributes',
        'x_2270446_pokenow_battle_log',
        'x_2270446_pokenow_move',
        'x_2270446_pokenow_item',
    ],
    listConfig: pokemonWorkspaceListConfig,
})

// Field MUST match the workspace path + '.*' for the route to be secured.
Acl({
    $id: Now.ID['pokemon-workspace-acl'],
    localOrExisting: 'Existing',
    type: 'ux_route',
    operation: 'read',
    roles: [pokemonWorkspaceUserRole],
    name: 'now.pokemon-workspace.*',
})
