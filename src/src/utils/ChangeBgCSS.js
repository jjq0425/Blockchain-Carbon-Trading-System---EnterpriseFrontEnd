/*
 * @Author: jjq
 * @Description: 
 * 
 */
/*
 * @Author: jjq
 * @Description: 
 * 
 */
const changeBgCSS = function (RouterPosition, EnterpriseClass) {
    document.documentElement.style.setProperty('--base-bg-backgroud', `none`)
    let BGPIC
    // 位于碳币交易的板块
    if (RouterPosition == 'TRADE') {
        BGPIC = require('@/assets/beauty/bg/bg_trade.png')

        // console.log(document.documentElement.style.getPropertyValue('--base-bg-backgroud'))
    } else if (RouterPosition == 'SETTING') {
        BGPIC = require('@/assets/beauty/bg/bg_setting.png')

    }
    else if (RouterPosition == 'INFO') {
        BGPIC = require('@/assets/beauty/bg/bg_info.png')

    } else {
        if (EnterpriseClass == 1) {
            BGPIC = require('@/assets/beauty/bg/bg1.png')
        } if (EnterpriseClass == 10) {
            BGPIC = require('@/assets/beauty/bg/bg10.png')
        } else {
            BGPIC = require('@/assets/beauty/bg/bg1.png')
        }


    }
    document.documentElement.style.setProperty('--base-bg-backgroud', `url(${BGPIC})`)


}

export default changeBgCSS