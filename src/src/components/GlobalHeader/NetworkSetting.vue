<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <a-modal
    title="服务器网络设置"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="600"
    :footer="null"
    @cancel="close"
    destroyOnClose
  >
    <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item label="旧服务器地址">
        <span>{{ OldServer }}</span>
      </a-form-item>
      <a-form-item label="新服务器地址" prop="NewServer">
        <a-input v-model="NewServer" />
        <div style="font-size: 10px; color: grey">服务器地址必须以http://或者https://开头！并且结尾不能包含/</div>
      </a-form-item>
      <a-form-item label="测试结果">
        <span>{{ TestRes }}</span>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button @click="TestNewServer" style="margin-right: 20px"> 测试</a-button>
        <a-button type="primary" @click="setNewServer"> 提交</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
  
  <script>
import { SET_NETWORK_BASEURL } from '@/store/mutation-types'
import request from '@/utils/request'
export default {
  name: 'NetworkSetting',
  data() {
    return {
      visible: false,
      confirmLoading: false,
      OldServer: '',
      NewServer: 'https://',
      TestRes: '未测试',
    }
  },
  props: {},
  methods: {
    open() {
      this.visible = true
      this.getOldServer()
    },
    close() {
      this.visible = false
      this.OldServer = ''
      this.NewServer = 'https://'
      this.TestRes = '未测试'
    },
    getOldServer() {
      console.log(this.$store.state.app.baseUrl)
      this.OldServer = this.$store.state.app.baseUrl
    },
    setNewServer() {
      // 判断设置是否成功？首先需要以https或者http开头，并且以/结尾
      if (!this.NewServer.startsWith('http://') && !this.NewServer.startsWith('https://')) {
        this.$message.error('服务器地址必须以http://或者https://开头！')
        return
      } else if (this.NewServer.endsWith('/')) {
        this.$message.error('结尾不能包含/')
        return
      }
      this.$store.commit(SET_NETWORK_BASEURL, this.NewServer)
      this.$message.success('设置成功！')
      this.close()
    },
    TestNewServer() {
      this.TestRes = '测试中....'
      //   this.$axios
      //     .get(this.NewServer + '/api/user/getInfo')
      //     .then((res) => {
      //       this.TestRes = res.data
      //       this.$message.success('测试成功！')
      //     })
      //     .catch((err) => {
      //       this.TestRes = err.data + '   (测试失败)'
      //       this.$message.error('测试失败！')
      //     })
      let testUrl = this.NewServer + '/api/user/getInfo'
      testUrl = 'https://console-mock.apipost.cn/mock/b2880e0e-7b68-4425-9aea-8e0f230bb462/test?apipost_id=feefc2'
      request({
        url: testUrl,
        method: 'get',
      })
        .then((res) => {
          this.TestRes = res
          this.$message.success('测试成功！')
        })
        .catch((err) => {
          this.TestRes = err + '   (测试失败)'
          this.$message.error(testUrl + '测试失败！')
        })
    },
  },
}
</script>
  
  <style lang="less" scoped>
</style>
  