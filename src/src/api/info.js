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

import request from '@/utils/request'

import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// const token = storage.get(ACCESS_TOKEN)
let token = storage.get(ACCESS_TOKEN)
// if (token == null) {
//     token = storage.state.user.token
// }

const infoApi = {
    TaskList: '/info/enterpriseTaskList',
    TaskSubmit: '/info/submission',
    GetReport: '/public/enterpriseReport',

}

/**
 * 
 * @returns {Promise}
 * 获取填报任务列表
 */
export function GetTaskList() {

    return request({
        url: infoApi.TaskList,
        method: 'post',
        data: {
            token: token
        }
    })

}

/**
 * 
 * @returns {Promise}
 * 提交填报任务
 */

export function Submit(parameter) {
    return request({
        url: infoApi.TaskSubmit,
        method: 'post',
        data: {
            token: token,
            ...parameter
        }
    })
}

export function GetReport(parameter) {
    return request({
        url: infoApi.GetReport,
        method: 'post',
        data: {
            enterpriseID: parameter.enterpriseID,
            taskYear: parameter.taskYear,

        }
    })
}

