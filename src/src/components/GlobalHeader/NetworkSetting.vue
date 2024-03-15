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
    <div v-if="showSet">
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="旧服务器地址">
          <span>{{ OldServer }}</span>
        </a-form-item>
        <a-form-item label="新服务器地址" prop="NewServer">
          <a-input v-model="NewServer" />
          <!-- <a-button @click="SetNewServerDefault('http://localhost:8080')" style="margin-right: 20px">
          本地服务地址</a-button
        > -->
          <a-button
            @click="SetNewServerDefault('https://mock.apifox.com/m1/2214773-0-default')"
            style="margin-right: 20px"
          >
            Mock服务地址</a-button
          >
          <a-button @click="SetNewServerDefault('https://8.137.108.102:8080')" style="margin-right: 20px">
            正式环境（https://8.137.108.102:8080）</a-button
          >
          <!-- <a-button @click="SetNewServerDefault('https://8.137.108.102:8080/turnTo')" style="margin-right: 20px">
          区块链浏览器（https://8.137.108.102:8080/turnTo）</a-button
        > -->
          <div style="font-size: 10px; color: grey">服务器地址必须以http://或者https://开头！并且结尾不能包含/</div>
        </a-form-item>
        <a-form-item label="测试结果">
          <div>{{ TestRes }}</div>
          <div style="font-size: 10px; color: grey">不填新服务器地址则按旧地址测试</div>
        </a-form-item>
        <a-form-item label="您的token">
          {{ token }}
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 18, offset: 5 }">
          <a-button @click="goTosupervisor" style="margin-right: 20px"> 区块链管理端</a-button>
          <a-button @click="TestNewServer" style="margin-right: 20px"> 测试</a-button>
          <a-button type="primary" @click="setNewServer"> 提交</a-button>
        </a-form-item>
      </a-form>
    </div>

    <div>
      <a-result :status="showSet_Title == '网络链接失败，请检查网络' ? 'error' : 'success'" v-if="!showSet">
        <template #title>
          <div>
            <a-icon type="smile" style="margin-right: 10px" />
            {{ showSet_Title }}
          </div>
        </template>
      </a-result>
    </div>
  </a-modal>
</template>
  
  <script>
import { SET_NETWORK_BASEURL } from '@/store/mutation-types'
import request from '@/utils/request'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  name: 'NetworkSetting',
  data() {
    return {
      visible: false,
      confirmLoading: false,
      OldServer: '',
      NewServer: 'https://',
      TestRes: '未测试',

      showSet: false, //是否展示服务器设置
      showSet_Title: '网络链接正常',
    }
  },

  props: {},
  computed: {
    token() {
      return storage.get(ACCESS_TOKEN)
    },
  },
  methods: {
    open() {
      this.getShowSet()
      this.visible = true

      this.getOldServer()
    },
    close() {
      this.visible = false
      this.OldServer = ''
      this.NewServer = 'https://'
      this.TestRes = '未测试'
    },
    getShowSet() {
      request({
        url: 'https://mock.apifox.com/m1/2214773-0-default/fuwuqiSet',
        method: 'get',
        timeout: 1000,
        NetworkSetting: true,
      })
        .then((res) => {
          this.showSet = res.data.showSet
          this.showSet_Title = '网络链接正常'
        })
        .catch(() => {
          this.showSet_Title = '网络链接失败，请检查网络'
        })
    },
    getOldServer() {
      // console.log(this.$store.state.app.baseUrl)
      this.OldServer = this.$store.state.app.baseUrl
    },
    SetNewServerDefault(url) {
      this.NewServer = url
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
      let testUrl = this.NewServer
      if (this.NewServer == '' || this.NewServer == 'https://') {
        this.$notification.open({
          message: `按旧地址测试`,
          description: '您未设置新地址，按旧地址' + this.OldServer + '测试',
        })
        testUrl = this.OldServer
      }
      request({
        url: testUrl,
        method: 'get',

        timeout: 1000,
        data: {
          url: '/auth/login',
          urlType: 'POST',
          postBody: {
            user: 'exploreradmin',
            password: 'exploreradminpw',
            network: 'org1-network',
          },
          token: '',
        },
        NetworkSetting: true,
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
    goTosupervisor() {
      window.open('http://8.137.108.102:8081/#/login')
    },
  },
}
</script>
  
  <style lang="less" scoped>
</style>
  