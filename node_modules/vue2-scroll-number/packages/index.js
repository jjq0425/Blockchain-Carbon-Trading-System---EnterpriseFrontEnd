import ScrollNumber from './scroll-number'

const components = [
  ScrollNumber
]
const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export {
  install,
  ScrollNumber
}
export default {
  install,
  ScrollNumber
}