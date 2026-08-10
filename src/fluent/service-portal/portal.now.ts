import '@servicenow/sdk/global'
import { ServicePortal } from '@servicenow/sdk/core'
import { pokenowBattlePage } from '../sp-page/pokenow-battle/page.now'

// OOTB Coral theme - verified present on the instance.
const CORAL_THEME = '281507c44317d210ca4c1f425db8f2fd'

export const pokenowPortal = ServicePortal({
    $id: Now.ID['pokenow-portal'],
    title: 'PokeNow',
    urlSuffix: 'pokenow',
    theme: CORAL_THEME,
    homePage: pokenowBattlePage,
})
