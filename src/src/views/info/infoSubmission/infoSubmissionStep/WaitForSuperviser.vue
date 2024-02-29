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
      <div class="content">
        <!-- <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 20px">
          {{ $t('result.success.operate-title') }}
        </div> -->
        <a-row style="margin-bottom: 16px">
          <a-col :span="12">
            <span style="color: rgba(0, 0, 0, 0.85)">企业组织代码：</span>
            {{ enterpriseInfo.enterpriseID }}
          </a-col>
          <a-col :span="12">
            <span style="color: rgba(0, 0, 0, 0.85)">企业名：</span>
            {{ enterpriseInfo.enterpriseName }}
          </a-col>
          <a-col :span="12">
            <span style="color: rgba(0, 0, 0, 0.85)">报告年度：</span>
            {{ taskInfo_.taskYear }}年度
          </a-col>
          <a-col :span="12">
            <span style="color: rgba(0, 0, 0, 0.85)">提交时间：</span>
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
    }
  },
  computed: {
    result() {
      return {
        title: this.$t('result.success.title') + ', 等待监管审核',
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
    },
  },
}
</script>
  