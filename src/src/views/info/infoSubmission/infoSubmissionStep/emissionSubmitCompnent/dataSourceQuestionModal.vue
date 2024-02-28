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
  <a-modal v-model="visible" :title="$t('modal.notice.title')">
    <template slot="footer">
      <a-button key="back" @click="close" type="primary"> {{ $t('modal.btn.close') }} </a-button>
    </template>
    <div style="width: 100%; text-align: center; margin-bottom: 20px" v-if="lang.includes('zh')">数据来源取值说明</div>
    <div style="width: 100%; text-align: center; margin-bottom: 20px" v-else>Data Source Value Description</div>
    <img
      src="@/assets/pages/info/infoSubmissionCenter/dataSourceQuestion/dataSourceQuestion_CN.png"
      style="width: 480px; margin: 0 auto"
      v-if="lang.includes('zh')"
    />
    <img
      src="@/assets/pages/info/infoSubmissionCenter/dataSourceQuestion/dataSourceQuestion_EN.png"
      style="width: 480px; margin: 0 auto"
      alt=""
      v-else
    />
  </a-modal>
</template>
  
  <script>
export default {
  name: 'dataSourceQuestionModal',
  prop: [],
  data() {
    return {
      visible: false,
    }
  },
  computed: {
    lang() {
      return this.$store.state.app.lang
    },
  },
  methods: {
    open() {
      this.visible = true
    },
    close() {
      this.visible = false
    },
  },
}
</script>
  
  <style>
</style>