import '@servicenow/sdk/global'
import { SPPage } from '@servicenow/sdk/core'
import { pokemonBattleWidget } from '../../sp-widget/pokemon-battle/widget.now'

export const pokenowBattlePage = SPPage({
    pageId: 'pokenow-battle',
    title: 'Pokemon Battle',
    public: true,
    containers: [
        {
            $id: Now.ID['pokenow-battle-container'],
            name: 'Main Container',
            order: 1,
            rows: [
                {
                    $id: Now.ID['pokenow-battle-row'],
                    order: 1,
                    columns: [
                        {
                            $id: Now.ID['pokenow-battle-column'],
                            size: 12,
                            order: 1,
                            instances: [
                                {
                                    $id: Now.ID['pokenow-battle-instance'],
                                    widget: pokemonBattleWidget,
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
