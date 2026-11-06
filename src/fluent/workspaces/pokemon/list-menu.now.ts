import '@servicenow/sdk/global'
import { UxListMenuConfig, Applicability, Role } from '@servicenow/sdk/core'

export const pokemonWorkspaceUserRole = Role({
    name: 'x_2270446_pokenow.user',
    containsRoles: ['canvas_user'],
    description: 'Access to the Pokemon Workspace.',
})

const pokemonWorkspaceApplicability = Applicability({
    $id: Now.ID['pokemon-workspace-applicability'],
    name: 'Pokemon Workspace Audience',
    roles: [pokemonWorkspaceUserRole],
})

export const pokemonWorkspaceListConfig = UxListMenuConfig({
    $id: Now.ID['pokemon-workspace-list-config'],
    name: 'Pokemon Workspace List Configuration',
    categories: [
        {
            $id: Now.ID['pokemon-workspace-category-pokemon'],
            title: 'Pokemon',
            order: 10,
            lists: [
                {
                    $id: Now.ID['pokemon-workspace-list-pokemon'],
                    title: 'All Pokemon',
                    order: 10,
                    condition: '',
                    table: 'x_2270446_pokenow_attributes',
                    columns: 'name,height,weight,wins,losses',
                    applicabilities: [
                        {
                            $id: Now.ID['pokemon-workspace-list-pokemon-applicability'],
                            applicability: pokemonWorkspaceApplicability,
                        },
                    ],
                },
            ],
        },
        {
            $id: Now.ID['pokemon-workspace-category-battles'],
            title: 'Battles',
            order: 20,
            lists: [
                {
                    $id: Now.ID['pokemon-workspace-list-battle-log'],
                    title: 'Battle Log',
                    order: 10,
                    condition: '',
                    table: 'x_2270446_pokenow_battle_log',
                    columns: 'pokemon,opponent_name,result,sys_created_on',
                    applicabilities: [
                        {
                            $id: Now.ID['pokemon-workspace-list-battle-log-applicability'],
                            applicability: pokemonWorkspaceApplicability,
                        },
                    ],
                },
            ],
        },
        {
            $id: Now.ID['pokemon-workspace-category-reference'],
            title: 'Reference Data',
            order: 30,
            lists: [
                {
                    $id: Now.ID['pokemon-workspace-list-moves'],
                    title: 'Moves',
                    order: 10,
                    condition: '',
                    table: 'x_2270446_pokenow_move',
                    columns: 'name,power,accuracy,damage_class',
                    applicabilities: [
                        {
                            $id: Now.ID['pokemon-workspace-list-moves-applicability'],
                            applicability: pokemonWorkspaceApplicability,
                        },
                    ],
                },
                {
                    $id: Now.ID['pokemon-workspace-list-items'],
                    title: 'Items',
                    order: 20,
                    condition: '',
                    table: 'x_2270446_pokenow_item',
                    columns: 'name,category,cost',
                    applicabilities: [
                        {
                            $id: Now.ID['pokemon-workspace-list-items-applicability'],
                            applicability: pokemonWorkspaceApplicability,
                        },
                    ],
                },
            ],
        },
    ],
})
