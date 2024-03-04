

import request from '@/utils/request'

import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// const token = storage.get(ACCESS_TOKEN)
let token = storage.get(ACCESS_TOKEN)
// if (token == null) {
//     token = storage.state.user.token
// }

const tradeApi = {
    TradeList: '/public/tradeList',
    TradePublish: '/trade/tradePulish',


}

export function TradeList() {
    return request({
        url: tradeApi.TradeList,
        method: 'post',
        data: {
            token: token,

        }
    })
}



export function TradePublish(params) {
    return request({
        url: tradeApi.TradePublish,
        method: 'post',
        data: {
            token: token,
            ...params

        }
    })
}