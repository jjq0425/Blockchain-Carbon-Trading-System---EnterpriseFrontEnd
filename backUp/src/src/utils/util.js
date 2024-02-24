/*
 * @Author: jjq
 * @Description: 
 * 
 */

import store from '@/store'
export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  if (store.getters.lang === 'zh-CN')
    return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
  else if (store.getters.lang === 'en-US')
    return hour <= 12 ? 'Good morning' : hour < 20 ? 'Good afternoon' : 'Good evening'

}

export function welcome() {
  const arr_CN = ["碧空如洗，绿意盎然，我们承诺碳中和，绘就地球生态画卷。", "科技之光，照亮未来，助力碳中和，共筑绿色地球家园。", "绿色发展，智慧生活，携手共进，迈向碳中和新纪元。", "减碳护蓝，行动诠释责任，科技引领未来，共绘绿色地球。", "低碳生活，从我做起，选择绿色能源，共创美好未来。", "节能减碳，绿色发展，贡献力量，让地球更加美好。", "绿色出行，智慧生活，共同迈向碳中和，共筑绿色地球。", "科技创新，引领绿色发展，贡献力量，守护地球家园。", "绿色能源，智慧生活，共同迈向碳中和，守护地球家园。", "节能减碳，从我做起，贡献力量，让地球更加美好。"]
  const arr_EN = ["Clear blue skies, lush greenery, we pledge carbon neutrality, painting a ecological masterpiece of Earth.", "The light of technology, illuminating the future, supports carbon neutrality, co-building a green Earth.", "Green development, smart living, joining hands, strides towards a new era of carbon neutrality.", "Reducing carbon, protecting the blue planet, actions interpret responsibility, technology leads the future, co-creating a green Earth.", "Low-carbon living, starting from me, choosing green energy, co-creating a bright future.", "Energy saving and carbon reduction, green development, contributing our efforts, making Earth even more beautiful.", "Green travel, smart living, moving towards carbon neutrality together, co-building a green Earth.", "Technological innovation, leading green development, contributing our efforts, protecting our Earth.", "Green energy, smart living, moving towards carbon neutrality together, guarding our Earth.", "Energy saving and carbon reduction, starting from me, contributing our efforts, making Earth even more beautiful."]
  // 从store（Vuex）中判断语言
  let arr = []
  if (store.getters.lang === 'en-US') {
    arr = arr_EN
  } else if (store.getters.lang === 'zh-CN') {
    arr = arr_CN
  }


  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () { }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
export function scorePassword(pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
    letters[pass[i]] = (letters[pass[i]] || 0) + 1
    score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
    digits: /\d/.test(pass),
    lower: /[a-z]/.test(pass),
    upper: /[A-Z]/.test(pass),
    nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (var check in variations) {
    variationCount += (variations[check] === true) ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}
