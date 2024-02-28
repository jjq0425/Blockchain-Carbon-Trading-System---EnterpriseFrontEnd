# vue2-scroll-number

数字滚动组件

支持千分位、小数点、百分比

# 快速开始

#### 安装组件

```bash
npm i vue2-scroll-number
```

#### 引用组件库

在main.js中注册全局组件

```javascript
import Vue2ScrollNumber from 'vue2-scroll-number'
import 'vue2-scroll-number/lib/vue2-scroll-number.css'
Vue.use(Vue2ScrollNumber)

<ScrollNumber :number="number"></ScrollNumber>
```

在组件中注册局部组件

```javascript
<ScrollNumber :number="number"></ScrollNumber>
...
import { ScrollNumber } from 'vue2-scroll-number'
...
components: {
  ScrollNumber
}
```


