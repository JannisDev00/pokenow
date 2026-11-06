import '@servicenow/sdk/global'
import { SPWidget } from '@servicenow/sdk/core'

// Top Pokemon by win count, grouped from x_2270446_pokenow_battle_log
// (see pokemon-leaderboard.server.js) so it can be sliced by timeframe
// without touching the cumulative wins/losses counters on the Pokemon
// record itself.
export const pokemonLeaderboardWidget = SPWidget({
    $id: Now.ID['pokemon-leaderboard-widget'],
    name: 'Pokemon Leaderboard',
    id: 'pokemon-leaderboard',
    description: 'Top Pokemon by wins, all-time, this month, or this week.',
    htmlTemplate: Now.include('./pokemon-leaderboard.html'),
    clientScript: Now.include('./pokemon-leaderboard.client.js'),
    serverScript: Now.include('./pokemon-leaderboard.server.js'),
    customCss: Now.include('./pokemon-leaderboard.scss'),
    hasPreview: true,
})
