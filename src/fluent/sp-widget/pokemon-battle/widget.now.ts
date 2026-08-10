import '@servicenow/sdk/global'
import { SPWidget } from '@servicenow/sdk/core'

// Pick two imported Pokemon and compare base stat totals adjusted by type
// matchup effectiveness (see pokemon-battle.server.js) to determine a winner.
export const pokemonBattleWidget = SPWidget({
    $id: Now.ID['pokemon-battle-widget'],
    name: 'Pokemon Battle',
    id: 'pokemon-battle',
    description: 'Pick two Pokemon and compare stats + type matchups to see who wins.',
    htmlTemplate: Now.include('./pokemon-battle.html'),
    clientScript: Now.include('./pokemon-battle.client.js'),
    serverScript: Now.include('./pokemon-battle.server.js'),
    customCss: Now.include('./pokemon-battle.scss'),
    hasPreview: true,
})
