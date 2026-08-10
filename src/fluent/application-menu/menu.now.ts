import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'

// Top-level "PokeNow" entry in the Application Navigator (under "All").
export const pokenowMenu = ApplicationMenu({
    $id: Now.ID['pokenow-app-menu'],
    title: 'PokeNow',
    hint: 'Pokemon battle simulator',
    description: 'Import Pokemon data from PokeAPI and battle them 1v1 or 4v4.',
    active: true,
})

// Module: direct link to the battle portal page.
export const pokenowBattleModule = Record({
    $id: Now.ID['pokenow-app-module-battle'],
    table: 'sys_app_module',
    data: {
        title: 'Pokemon Battle',
        application: pokenowMenu,
        link_type: 'DIRECT',
        query: 'pokenow?id=pokenow-battle',
        window_name: 'pokenow_battle',
        hint: 'Open the Pokemon battle simulator',
        active: true,
        order: 100,
    },
})
