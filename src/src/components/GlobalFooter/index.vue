<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <!-- <a href="https://www.github.com/vueComponent/pro-layout" target="_blank">Pro Layout</a>
      <a href="https://www.github.com/vueComponent/ant-design-vue-pro" target="_blank">Github</a>
      <a href="https://www.github.com/sendya/" target="_blank">@Sendya</a> -->
      <span v-if="lang.includes('zh')">碳盟链道 · 企业端</span>
      <span v-else>CarbonChain · Enterprise</span>
      <!-- 系统测试Footer -->
    </template>
    <!-- <template v-slot:copyright>
      <a href="https://github.com/vueComponent" target="_blank">vueComponent</a>
    </template> -->
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'
import store from '@/store'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter,
  },
  computed: {
    lang() {
      return store.state.app.lang
    },
  },
}
</script>


<style>
.ant-layout-footer {
  background: #f7f9fe;
}
</style>