<template>
  <a-modal
    title="正在交易"
    :visible="visible"
    :maskClosable="false"
    :closable="false"
    :width="600"
    :footer="null"
    @cancel="close"
    destroyOnClose
  >
    <div style="display: flex; justify-content: space-around; align-items: center">
      <div style="width: 40%">
        <!-- <video src="https://chatglm.cn//media/analyze.9527f201.mp4" loop autoplay style="width: 100%"></video>
         -->
        <!-- <video src="@/assets/components/PDFgenerate/DownloadVideo.mp4" loop autoplay style="width: 100%"></video> -->
        <!-- <div id="lottie" style="z-index: 1000; width: auto"></div> -->
        <trade-lottie></trade-lottie>
      </div>
      <div style="width: 60%; text-align: center">
        <div v-if="NowPercentage != 100" style="font-weight: bold; font-size: 30px; color: #b197fc">交易进行中</div>
        <div
          v-else-if="NowPercentage == 100"
          class="animate__animated animate__tada animate__repeat-2"
          style="font-weight: bold; font-size: 30px; color: #3bc9db"
        >
          交易成功
        </div>
        <div
          v-if="NowPercentage != 100"
          style="width: 100%; text-align: center; font-size: 10px; color: grey; margin-top: 20px"
        >
          <a-icon type="exclamation-circle" /> &nbsp;&nbsp; 碳贸区块链正在保证您的交易安全
        </div>
        <div v-else style="width: 100%; text-align: center; font-size: 10px; color: grey; margin-top: 20px">
          <a-icon type="exclamation-circle" /> &nbsp;&nbsp; 碳贸区块链已经准确记录您的交易
        </div>
      </div>
    </div>
    <a-progress
      :stroke-color="{
        from: '#b197fc',
        to: '#3bc9db',
      }"
      :percent="NowPercentage"
      :status="NowPercentage == 100 ? 'success' : 'active'"
      :strokeWidth="2"
      :showInfo="false"
    />
    <div>[{{ NowPercentage }}%] 请耐心等待交易进行中......</div>
  </a-modal>
</template>

<script>
import tradeLottie from './tradeLottie.vue'

export default {
  components: {
    tradeLottie,
  },
  data() {
    return {
      visible: false,
      NowPercentage: 0,
      timer: null,
    }
  },
  methods: {
    open() {
      this.NowPercentage = 0

      this.visible = true
      this.timer = setInterval(() => {
        if (this.NowPercentage <= 98) {
          this.NowPercentage++
        }
      }, 80)
    },
    close(isSuccess) {
      if (isSuccess) {
        this.NowPercentage = 100
      } else {
        this.NowPercentage = 0
      }
      this.timer = null
      setTimeout(() => {
        this.visible = false
      }, 800)
    },
  },
  mounted() {},
}
</script>

<style>
</style>