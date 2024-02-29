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
import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  // baseURL: process.env.VUE_APP_API_BASE_URL,
  // baseURL: store.state.app.baseUrl,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    let token = storage.get(ACCESS_TOKEN)
    // if (token == null) {
    //   token = storage.state.user.token
    // }

    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.data && data.data.LoginApi)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  console.log(">>request", config)
  if (token) {
    config.headers[ACCESS_TOKEN] = token
  }

  // 在服务器测试时候不带baseUrl，在NetworkSetting已经带了
  if (config.NetworkSetting == null || !config.NetworkSetting) {
    config.url = store.state.app.baseUrl + config.url
  }
  // 下面的代码是检测是否使用apipost的mock地址，若是，则增加apipost的私钥以正常获得mock数据
  if (config.NoMock == null || !config.NoMock) {
    // 正则表达式1：匹配不包含问号的URL
    const regex1 = /https:\/\/console-mock\.apipost\.cn\/mock\/b2880e0e-7b68-4425-9aea-8e0f230bb462\/[^?]*/;
    // 正则表达式2：匹配包含问号的URL
    const regex2 = /https:\/\/console-mock\.apipost\.cn\/mock\/b2880e0e-7b68-4425-9aea-8e0f230bb462\/[^?]*\?[^?]*/;
    // 检查URL是否匹配正则表达式
    // console.log(regex2.test(config.url), regex1.test(config.url))
    if (regex2.test(config.url)) {
      config.url += ''
    }
    else if (regex1.test(config.url)) {
      config.url += ''
    }


  }

  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
