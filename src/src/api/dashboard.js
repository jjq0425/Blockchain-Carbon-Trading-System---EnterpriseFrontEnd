/*
 * @Author: jjq
 * @Description: 
 * 
 */


import request from '@/utils/request'

import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// const token = storage.get(ACCESS_TOKEN)
// let token = storage.get(ACCESS_TOKEN)
let token = localStorage.getItem('ACCESS_TOKEN')
// if (token == null) {
//     token = storage.state.user.token
// }

const dashApi = {
    Horizontal: '/dashboard/horizontal',
    Vertical: '/dashboard/vertical',



}

export function horizontal() {
    let token = localStorage.getItem('ACCESS_TOKEN')
    return request({
        url: dashApi.Horizontal,
        method: 'post',
        data: {
            token: token,

        }
    })
}



export function vertical() {
    let token = localStorage.getItem('ACCESS_TOKEN')
    return request({
        url: dashApi.Vertical,
        method: 'post',
        data: {
            token: token,

        }
    })
}
