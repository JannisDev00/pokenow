import '@servicenow/sdk/global'
import { SPPage } from '@servicenow/sdk/core'
import { pokemonLeaderboardWidget } from '../../sp-widget/pokemon-leaderboard/widget.now'

export const pokenowLeaderboardPage = SPPage({
    pageId: 'pokenow-leaderboard',
    title: 'Pokemon Leaderboard',
    public: true,
    containers: [
        {
            $id: Now.ID['pokenow-leaderboard-container'],
            name: 'Main Container',
            order: 1,
            rows: [
                {
                    $id: Now.ID['pokenow-leaderboard-row'],
                    order: 1,
                    columns: [
                        {
                            $id: Now.ID['pokenow-leaderboard-column'],
                            size: 12,
                            order: 1,
                            instances: [
                                {
                                    $id: Now.ID['pokenow-leaderboard-instance'],
                                    widget: pokemonLeaderboardWidget,
                                    order: 1,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
})
