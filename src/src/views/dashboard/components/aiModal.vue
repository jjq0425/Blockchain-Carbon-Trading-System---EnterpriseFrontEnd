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
  >
    <div style="min-height: 500px;max-height: 500px;margin-bottom:0px; overflow-y: scroll; scroll-behavior: smooth;" id="AImsgbox">
        <div >
            <!-- 正常对话 -->
            <div v-for="(item,index) in msgList_Liushi" :key="index">
                <!-- AI回答 -->
                <a-row style="width:95%;margin:0 auto;margin-bottom:30px" type="flex" v-if="!item.my">
                    <a-col :flex="1">
                        <a-avatar size="large" src="https://pic.code-nav.cn/yucongming_model_picture/1650492623718633473/3AjmCaZA-logo.webp" />
                    </a-col>
                    <div style="background-color: #f5f5f5;min-width:92%;max-width:92%;padding:20px 20px;border-radius: 10px;" :flex="100" class="left-sanjiao">
                        {{ item.msg }}<div class="cursor" v-show="index==msgList_Liushi.length-1&&noSend==true&&showLoadMsg==false"></div>
                    </div>
                </a-row>
                <!-- 人类提问 -->
                <a-row style="width:95%;margin:0 auto;margin-bottom:30px" type="flex" v-if="item.my">
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
        <a-textarea :placeholder="noSend?'当前状态禁止发送装填问题':'智碳AI领航员乐意为您领航' " :rows="3" v-model="nowMsg"  :disabled="noSend"></a-textarea>
        <a-button
        class="btn"
        :disabled="noSend"
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
    open() {
      this.noSend = false
      this.msgList = []
      this.msgList_Liushi = []
      this.nowMsg = ''
      this.visible = true
      this.init()
    },
    liushishuchu() {
      this.msgList_Liushi.push({
        my: false,
        msg: '',
      })
      let timer
      let index = 0
      timer = setInterval(() => {
        if (index < this.msgList[this.msgList_Liushi.length - 1].msg.length) {
          this.msgList_Liushi[this.msgList_Liushi.length - 1].msg +=
            this.msgList[this.msgList_Liushi.length - 1].msg.charAt(index)
          index++
        } else if (!this.respondComplete) {
        } else {
          //   clear(timer)
          clearInterval(timer)
          this.noSendOver()
          //   console.log('over')
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
      this.showLoadMsg = true
      this.showLoadMsg = false
      this.liushishuchu()
    },
    close() {
      this.visible = false
      this.noSend = false
      this.msgList = []
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
            this.boxHeightAdjust()
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
        this.boxHeightAdjust()
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
      this.noSending()
      this.msgList.push({
        my: true,
        msg: this.nowMsg,
      })
      this.msgList_Liushi.push({
        my: true,
        msg: this.nowMsg,
      })
      this.nowMsg = ''
      this.noSending()
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
  left: 10px;
  top: 5px;
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: #d0bfff;
  border-radius: 10px;
  animation: cursorBlink 1s infinite;
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