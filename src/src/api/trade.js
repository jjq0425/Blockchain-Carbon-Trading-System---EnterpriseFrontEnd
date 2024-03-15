

import request from '@/utils/request'

import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// const token = storage.get(ACCESS_TOKEN)
// let token = storage.get(ACCESS_TOKEN)
let token = localStorage.getItem('ACCESS_TOKEN')
// if (token == null) {
//     token = storage.state.user.token
// }

const tradeApi = {
    TradeList: '/public/tradeList',
    TradePublish: '/trade/tradePulish',
    MakeTrade: '/trade/tradeComplete',

    MyPublishTradeList: '/trade/myTradeList',
    MyOrderList: '/trade/myOrderList',
    OrderDetail: '/public/order',



}

export function TradeList() {
    let token = localStorage.getItem('ACCESS_TOKEN')
    return request({
        url: tradeApi.TradeList,
        method: 'post',
        data: {
            token: token,

        }
    })
}



export function TradePublish(params) {
    let token = localStorage.getItem('ACCESS_TOKEN')
    return request({
        url: tradeApi.TradePublish,
        method: 'post',
        data: {
            token: token,
            ...params

        }
    })
}

export function MakeTrade(params) {
    let token = localStorage.getItem('ACCESS_TOKEN')
    return request({
        url: tradeApi.MakeTrade,
        method: 'post',
        data: {
            token: token,
            ...params

        }
    })
}

export function MyPublishTradeList() {
    let token = localStorage.getItem('ACCESS_TOKEN')
    return request({
        url: tradeApi.MyPublishTradeList,
        method: 'post',
        data: {
            token: token,

        }
    })


}


export function MyOrderList() {
    let token = localStorage.getItem('ACCESS_TOKEN')
    return request({
        url: tradeApi.MyOrderList,
        method: 'post',
        data: {
            token: token,

        }
    })
}

export function OrderDetail(orderID) {
    let token = localStorage.getItem('ACCESS_TOKEN')
    return request({
        url: tradeApi.OrderDetail,
        method: 'post',
        data: {
            token: token,
            orderID: orderID
        }
    })
}