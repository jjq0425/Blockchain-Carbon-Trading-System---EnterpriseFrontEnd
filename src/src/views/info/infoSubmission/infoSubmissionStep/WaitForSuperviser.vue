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
  <a-card :bordered="false">
    <a-result status="success" :title="result.title" :sub-title="result.description">
      <!-- <template #extra>
        <a-button type="primary">{{ $t('result.success.btn-return') }}</a-button>
        <a-button style="margin-left: 8px">{{ $t('result.success.btn-project') }}</a-button>
        <a-button style="margin-left: 8px">{{ $t('result.success.btn-print') }}</a-button>
      </template> -->
      <template #icon>
        <div id="dataSubmitSuccess" style="width: 50%; margin: 0 auto; margin-top: -120px"></div>
      </template>
      <div class="content">
        <!-- <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 20px">
          {{ $t('result.success.operate-title') }}
        </div> -->
        <a-row style="margin-bottom: 16px">
          <a-col :span="12">
            <span style="color: rgba(0, 0, 0, 0.85)">{{ $t('account.basicSetting.enterpriseID.label') }}：</span>
            {{ enterpriseInfo.enterpriseID }}
          </a-col>
          <a-col :span="12">
            <span style="color: rgba(0, 0, 0, 0.85)">{{ $t('account.settings.basic.EnterpriseName') }}：</span>
            {{ enterpriseInfo.enterpriseName }}
          </a-col>
          <a-col :span="12">
            <span style="color: rgba(0, 0, 0, 0.85)"
              >{{ $t('info.infoSubmission.pages.waitForSuperviser.reportYear') }}：</span
            >
            {{ taskInfo_.taskYear }}年度
          </a-col>
          <a-col :span="12">
            <span style="color: rgba(0, 0, 0, 0.85)"
              >{{ $t('info.infoSubmission.pages.waitForSuperviser.submitTime') }}：</span
            >
            {{ submitTime }}
          </a-col>
        </a-row>
        <div style="width: 100%; text-align: center; padding-top: 10px; color: #65affb">
          ———— {{ $t('layouts.userLayout.title') }} ————
        </div>
      </div>
    </a-result>
  </a-card>
</template>
  
  <script>
import { baseMixin } from '@/store/app-mixin'
import dayjs from 'dayjs'

import lottie from 'lottie-web'
import animationData from '@/assets/pages/info/infoSubmissionCenter/submitSuccessLottie.json' //这个json动画文件是UI给的

const directionType = {
  horizontal: 'horizontal',
  vertical: 'vertical',
}

export default {
  name: 'WaitForSuperviser',
  mixins: [baseMixin],
  prop: {
    taskinfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      taskInfo_: {},
      submitTime: '',

      lottieHasLoad: false,
    }
  },
  computed: {
    result() {
      return {
        title: this.$t('result.success.title') + this.$t('info.infoSubmission.pages.waitForSuperviser.title2'),
        // description: this.$t('result.success.description'),
      }
    },
    enterpriseInfo() {
      return this.$store.state.user.info
    },
  },
  mounted() {
    this.submitTime = dayjs().format('YYYY-MM-DD HH:mm')
    // console.log('111', this.$parent)
    this.taskInfo_ = this.$parent.taskinfo
  },
  methods: {
    passTaskInfo(taskInfo) {
      this.taskInfo_ = taskInfo

      if (!this.lottieHasLoad) {
        let animation = lottie.loadAnimation({
          container: document.getElementById('dataSubmitSuccess'),
          renderer: 'svg',
          loop: false, //循环播放 true/number/false
          autoplay: false,
          animationData,
        })
        setTimeout(() => {
          animation.play()
        }, 1000)
        this.lottieHasLoad = true
      }
    },
  },
}
</script>
  