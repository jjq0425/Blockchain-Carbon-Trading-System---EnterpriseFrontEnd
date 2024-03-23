<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <a-modal
    :footer="null"
    :visible="visible"
    :width="800"
    @cancel="close"
    title="智碳AI领航员"
    :dialog-style="{ top: '20px' }"
    :destroyOnClose="true"
  >
    <div style="min-height: 500px;max-height: 500px;margin-bottom:0px; overflow-y: scroll; scroll-behavior: smooth;" id="AImsgbox">
        <div >
            <!-- 正常对话 -->
            <div v-for="(item,index) in msgList_Liushi" :key="index">
                <!-- AI回答 -->
                <transition
                  enter-active-class="animate__animated animate__fadeIn animate__animated animate__faster"
                  appear
                >
                <a-row style="width:95%;margin:0 auto;margin-bottom:30px" type="flex" v-if="!item.my">
                    <a-col :flex="1">
                        <!-- <a-avatar size="large" src="https://pic.code-nav.cn/yucongming_model_picture/1650492623718633473/3AjmCaZA-logo.webp" /> -->
                        <a-avatar size="large" :src="require('@/assets/pages/dashboard/ai/aiLogo.png')" />
                    </a-col>
                    <div style="background-color: #f5f5f5;min-width:92%;max-width:92%;padding:20px 20px;border-radius: 10px;" :flex="100" class="left-sanjiao">
                        
                        <span v-html="item.msg"> 
                        </span>
                        
                        <span class="cursor" v-if="index==msgList_Liushi.length-1&&noSend==true&&showLoadMsg==false"></span>
                    </div>
                </a-row>
                </transition>
                <!-- 人类提问 -->
                <a-row style="width:95%;margin:0 auto;margin-bottom:30px" type="flex" v-if="item.my" >
                    <div style="text-align: right;min-width:92%;max-width:92%;padding:10px 20px;border-radius: 10px;" :flex="100" class="left-sanjiao">
                        {{ item.msg }}
                    </div>
                    <a-col :flex="1" style="margin-left:10px">
                        <a-avatar size="large" :src="currentUserAvatar" />
                    </a-col>
                </a-row>
                
            </div>
            <!-- AI对话加载中 -->
            <a-row style="width:95%;margin:0 auto;margin-bottom:30px" type="flex" v-show="showLoadMsg&&!initMsg" class="animate__fadeInUp animate__animated animate__faster ">
                    <a-col :flex="1">
                        <a-avatar size="large" src="https://pic.code-nav.cn/yucongming_model_picture/1650492623718633473/3AjmCaZA-logo.webp" />
                    </a-col>
                    <div style="background-color: #f5f5f5;min-width:92%;max-width:92%;padding:20px 20px;border-radius: 10px;" :flex="100" class="left-sanjiao">
                       <aiLoadingLottie ref="aiLoadingLottieRef"></aiLoadingLottie>
                       <div id="lottie_ai_loading" style="width:40px"></div>
                    </div>
            </a-row>
        

        </div>
        
    
    </div>
    <div>
        <a-textarea :placeholder="noSend?'领航员正在思考，稍后再装填问题吧':'智碳AI领航员乐意为您领航' " :rows="3" v-model="nowMsg"  :disabled="noSend||!canUse" @pressEnter="sendMsg"></a-textarea>
        <a-button
        class="btn"
        :disabled="noSend||!canUse"
        :max="100"
        shape="round"
        @click="sendMsg"
        
        >发送</a-button
      >
     
    </div>
    
      
    </a-textarea>
    
  </a-modal>
</template>

<script>
import store from '@/store'
import aiLoadingLottie from './aiLoadingLottie.vue'
import CryptoJS from 'crypto-js'
import axios from 'axios'
export default {
  data() {
    return {
      visible: false,
      msgList: [],
      msgList_Liushi: [],
      noSend: false, //整个过程是否结束
      showLoadMsg: false,
      nowMsg: '',
      respondComplete: true, //响应请求是否完成
      initMsg: false, //是否初始化

      //   配置
      canUse: false,
      appId: '',
      apiSecret: '',
      apiKey: '',

      ttsWS: null,
      willsendMsg: '',
      template: '',
    }
  },
  components: {
    aiLoadingLottie,
  },
  computed: {
    currentUserAvatar() {
      return this.$store.state.user.avatar
    },
  },
  methods: {
    fetchConfig() {
      axios.get('https://mock.apifox.com/m1/2214773-0-default/llm').then((res) => {
        let resData = res.data.data
        this.canUse = resData.canUse || true
        if (!this.canUse) {
          this.init()
        } else {
          this.appId = resData.appId
          this.apiKey = resData.apiKey
          this.apiSecret = resData.apiSecret
          this.init()
        }
      })
    },
    sendNouse() {
      setTimeout(() => {
        if (this.visible) {
          this.msgList.push({
            my: false,
            msg: '🔔实现碳中和对发电企业来说，主要挑战包括技术成本、技术难题、系统整合以及经济社会部门联动等。具体如下：<ul><li> <b>1. 技术成本：</b>碳中和技术目前的成本相对较高，这限制了其大规模应用的可能性。为了实现碳中和目标，需要通过技术进步和规模化生产来降低成本。</li><li> <b>2. 捕获难题：</b>碳捕获和封存技术（CCS）是实现碳中和的关键技术之一，但目前还存在一些技术难题，需要加强研究和开发以克服这些难题。</li><li> <b>3. 系统整合：</b>智能电网的建设是实现碳中和的重要环节，但涉及到技术的整合和系统安全问题，需要解决这些技术挑战以保证电网的稳定和安全。</li><li> <b>4. 经济社会部门联动：</b>碳中和目标的实现是一个涉及经济社会各部门联动的长期系统性问题。电力行业作为能源系统最大的碳排放部门，其变革将影响到整个能源和经济体系。</li></ul>综上所述，发电企业在迈向碳中和的过程中，不仅需要关注技术和成本的挑战，还需要考虑到整个经济社会系统的变革。',
          })
          this.respondComplete = false
          this.initMsg = true
          this.noSend = true
          this.showLoadMsg = false
          this.respondComplete = true
          // this.liushishuchu()
          // 拼接流失输出
          if (!this.visible) return
          this.msgList_Liushi.push({
            my: false,
            msg: '',
          })

          // setTimeout(() => {
          //   this.msgList[this.msgList.length - 1].msg = ''
          //   this.respondComplete = true
          //   this.noSend = true
          //   this.showLoadMsg = false
          // }, 1500)

          let index = 0
          let timer
          timer = setInterval(() => {
            // console.log('xiangy', timer)
            if (this.visible) {
              if (index < this.msgList[this.msgList_Liushi.length - 1].msg.length) {
                this.msgList_Liushi[this.msgList_Liushi.length - 1].msg +=
                  this.msgList[this.msgList_Liushi.length - 1].msg.charAt(index)
                index++
              } else if (!this.respondComplete) {
              } else {
                //   clear(timer)
                clearInterval(timer)
                timer = null
                if (this.visible) {
                  console.log('hah')
                  this.noSendOver()
                }
                //   console.log('over')
              }
            } else {
              clearInterval(timer)
            }
          }, 20)
        }
      }, 10)
    },
    open(msgInit = '') {
      this.noSend = false
      this.msgList = []
      this.msgList_Liushi = []

      this.visible = true
      this.nowMsg = msgInit

      this.$nextTick(() => {
        this.msgList = []

        this.msgList_Liushi = []
        this.fetchConfig()
      })
    },
    liushishuchu() {
      if (!this.visible) return
      this.msgList_Liushi.push({
        my: false,
        msg: '',
      })

      let index = 0
      let timer
      timer = setInterval(() => {
        // console.log('xiangy', timer)
        if (this.visible) {
          if (index < this.msgList[this.msgList_Liushi.length - 1].msg.length) {
            this.msgList_Liushi[this.msgList_Liushi.length - 1].msg +=
              this.msgList[this.msgList_Liushi.length - 1].msg.charAt(index)
            index++
          } else if (!this.respondComplete) {
          } else {
            //   clear(timer)
            clearInterval(timer)
            timer = null
            if (this.visible) {
              if (!this.canUse) {
                this.sendNouse()
              }
              this.noSendOver()
            }
            //   console.log('over')
          }
        } else {
          clearInterval(timer)
        }
      }, 20)
    },
    init() {
      this.msgList.push({
        my: false,
        msg: '你好，我是您的智碳AI领航员，我可以为您解答碳普惠、碳中和、碳填报的一系列问题，欢迎向我提问',
      })

      this.initMsg = true
      this.noSend = true
      this.showLoadMsg = false
      this.liushishuchu()
    },
    close() {
      console.log('close')
      this.msgList = []
      this.msgList_Liushi = []
      this.$forceUpdate()
      // console.log(timer)
      this.$nextTick(() => {
        this.visible = false
        this.noSend = false
      })
    },
    noSending() {
      if (!this.noSend) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.noSend = true
            this.showLoadMsg = true
            this.$refs.aiLoadingLottieRef.openL()
          }, 100)
          setTimeout(() => {
            if (this.visible) {
              this.boxHeightAdjust()
            }
          }, 610)
        })
      } else {
        this.$message.warning('请等待当前对话完成')
      }
    },
    noSendOver() {
      this.noSend = false
      this.showLoadMsg = false
      setTimeout(() => {
        if (this.visible) {
          this.boxHeightAdjust()
        }
      }, 10)
      this.initMsg = false
    },
    boxHeightAdjust() {
      var box = document.getElementById('AImsgbox') // 获取盒子元素

      let boxHeight = box.scrollHeight

      box.scrollTo({
        top: boxHeight,
        behavior: 'smooth',
      }) // 设置滚动条位置为最大值，即滚动到最下面
    },
    sendMsg() {
      if (this.nowMsg == '') {
        this.$message.warning('不能发送空字符串')
        return
      }
      this.boxHeightAdjust()
      this.noSending()
      this.msgList.push({
        my: true,
        msg: this.nowMsg,
      })
      this.msgList_Liushi.push({
        my: true,
        msg: this.nowMsg,
      })
      this.willsendMsg = this.nowMsg
      this.nowMsg = ''

      this.noSending()
      setTimeout(() => {
        this.sendNouse()
      }, 1000)

      // this.noSending()
      // this.inSendingProcess()
    },

    webSocketSend() {
      let textArrySend = []
      textArrySend.push({
        role: 'user',
        content: this.template + this.willsendMsg,
      })
      const params = {
        header: {
          app_id: this.appId,
          uid: 'fd3f47e4-d',
        },
        parameter: {
          chat: {
            domain: 'general',
            temperature: 0.5,
            max_tokens: 1024,
          },
        },
        payload: {
          message: {
            text: textArrySend,
          },
        },
      }
      this.willsendMsg = ''
      this.ttsWS.send(JSON.stringify(params))
      console.log('>模型准备发送数据', params)
    },
    getWebsocketUrl() {
      let this_ = this
      return new Promise((resolve, reject) => {
        const apiKey = this_.apiKey
        const apiSecret = this_.apiSecret
        const url = 'wss://spark-api.xf-yun.com/v1.1/chat'
        const host = window.location.host
        const date = new Date().toGMTString()
        const algorithm = 'hmac-sha256'
        const headers = 'host date request-line'
        const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`
        const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
        const signature = CryptoJS.enc.Base64.stringify(signatureSha)
        const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
        const authorization = window.btoa(authorizationOrigin)
        const finalUrl = `${url}?authorization=${authorization}&date=${date}&host=${host}`
        // console.log(finalUrl)
        resolve(finalUrl)
      })
    },

    inSendingProcess() {
      this.getWebsocketUrl().then((url) => {
        let ttsWS
        if ('WebSocket' in window) {
          ttsWS = new WebSocket(url)
        } else if ('MozWebSocket' in window) {
          ttsWS = new MozWebSocket(url)
        } else {
          alert('浏览器不支持WebSocket')
          return
        }
        this.ttsWS = ttsWS
        // 建立链接
        ttsWS.onopen = (e) => {
          this.webSocketSend()
          //链接成功
          this.respondComplete = false
          // push

          this.showLoadMsg = false
          this.msgList.push({
            my: false,
            msg: '',
          })
          this.liushishuchu()
        }
        ttsWS.onmessage = (e) => {
          //   this.result(e.data)
          //接收消息

          let result = JSON.parse(e.data)

          let dataArray = result.payload.choices.text
          console.log(dataArray)
          this.msgList[this.msgList.length - 1].msg += dataArray[0].content
          //   for (let i = 0; i < dataArray.length; i++) {
          //     this.msgList[this.msgList.length - 1].msg += dataArray[i]
          //   }
          let jsonData = JSON.parse(e.data)

          if (jsonData.header.code !== 0) {
            this.$message.error('大模型调用失败，星火服务器原因')
            this.showLoadMsg = false
            this.noSend = false
            this.ttsWS.close()
            return
          }
          if (jsonData.header.code === 0 && jsonData.header.status === 2) {
            this.respondComplete = true
            this.ttsWS.close()
          }
        }
        ttsWS.onerror = (e) => {
          this.$message.error('大模型调用失败，星火服务器原因！')
          this.showLoadMsg = false
          this.noSend = false
          this.respondComplete = true
          console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`)
        }
        ttsWS.onclose = (e) => {
          console.log(e)
        }
      })

      //发送消息

      //   链接断开
    },
    inSendingProcess_tets() {
      // 建立链接

      //链接成功
      this.respondComplete = false

      //发送消息

      // push
      setTimeout(() => {
        this.showLoadMsg = false
        this.msgList.push({
          my: false,
          msg: '',
        })
        this.liushishuchu()
      }, 1000)

      //接收消息
      setTimeout(() => {
        this.msgList[this.msgList.length - 1].msg +=
          '你好安居客大家ask贷记卡圣诞节甲i到静安寺哦大家算擦及擦酒精擦军事才能'

        //   链接断开
      }, 2000)

      setTimeout(() => {
        this.msgList[this.msgList.length - 1].msg +=
          '你好安居客大家ask贷记卡圣诞节甲i到静安寺哦大家算擦及擦酒精擦军事才能'
        this.respondComplete = true
      }, 5000)
    },
  },
  mounted() {},
}
</script>

<style scoped>
/deep/ .ant-modal-content {
  background: url('https://p1-hera.feishucdn.com/tos-cn-i-jbbdkfciu3/d35b3b8c2a10457a8efe6f397418620f~tplv-jbbdkfciu3-png:0:0.png');
}
/deep/ .ant-modal-header {
  background: url('https://p1-hera.feishucdn.com/tos-cn-i-jbbdkfciu3/d35b3b8c2a10457a8efe6f397418620f~tplv-jbbdkfciu3-png:0:0.png');
  /* 将图片左移动 */
  background-position: 10% 10%;
}

/deep/ .ant-input {
  background: white !important;
  border: none;
  box-shadow: 0 5px 15px 0 rgba(176, 191, 231, 0.95);
  border-radius: 10px;
}

.cursor {
  position: relative;
  display: inline-block;
  left: 10px;
  top: 5px;
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: #d0bfff;
  border-radius: 10px;
  animation: cursorBlink 0.5s infinite;
}
/* 实现一个闪烁效果的动画 */
@keyframes cursorBlink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.btn {
  border-radius: 999px;
  background-color: #683ef0;
  color: white;
  border-color: #683ef0;
  position: absolute;
  right: 30px;
  bottom: 30px;
}
/* 如果btn有disabled属性 */
.btn[disabled] {
  border-radius: 999px;
  background-color: #f8f9fa;
  color: grey;
  border-color: #f8f9fa;
  position: absolute;
  right: 30px;
  bottom: 30px;
}
</style>