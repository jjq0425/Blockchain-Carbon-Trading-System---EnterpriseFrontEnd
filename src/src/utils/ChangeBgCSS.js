/*
 * @Author: jjq
 * @Description: 
 * 
 */
const changeBgCSS = function (RouterPosition, EnterpriseClass) {
    let BGPIC
    // 位于碳币交易的板块
    if (RouterPosition == 'TRADE') {
        BGPIC = require('@/assets/beauty/bg/bg_trade.png')
        document.documentElement.style.setProperty('--base-bg-backgroud', `url(${BGPIC})`)
        // console.log(document.documentElement.style.getPropertyValue('--base-bg-backgroud'))
    } else if (RouterPosition == 'SETTING') {
        BGPIC = require('@/assets/beauty/bg/bg_setting.png')
        document.documentElement.style.setProperty('--base-bg-backgroud', `url(${BGPIC})`)
    }
    else if (RouterPosition == 'INFO') {
        BGPIC = require('@/assets/beauty/bg/bg_info.png')
        document.documentElement.style.setProperty('--base-bg-backgroud', `url(${BGPIC})`)
    } else {
        BGPIC = require('@/assets/beauty/bg/bg1.png')
        document.documentElement.style.setProperty('--base-bg-backgroud', `url(${BGPIC})`)
    }
}

export default changeBgCSS