/*
 * @Author: jjq
 * @Description: 
 * 
 */

import request from '@/utils/request'

import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
let token = storage.get(ACCESS_TOKEN)
// if (token == null) {
//     token = storage.state.user.token
//     // console.log("ahah", token)
// }

const publicApi = {
    uploadFile: '/public/upload',

}

/**
 * 
 * @returns {Promise}
 * 获取填报任务列表
 */
export function UploadFileAPI() {
    let token = storage.get(ACCESS_TOKEN)
    if (token == null) {
        token = storage.get(ACCESS_TOKEN)
        // console.log(token)
    }
    return { api: publicApi.uploadFile, MYtoken: token }

}
