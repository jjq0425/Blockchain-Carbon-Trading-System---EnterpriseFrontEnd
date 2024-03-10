<template>
  <page-header-wrapper :content="$t('info.infoSubmission.title')">
    <template v-slot:extraContent>
      <transition-group
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__jackInTheBox"
        leave-active-class="animate__backOutUp"
      >
        <div
          class=""
          style="height: 100px; margin-top: -20px; margin-right: 80px; position: absolute"
          key="pageRightPNG"
        >
          <img style="height: 100%; transform: scale(1.7)" src="@/assets/beauty/pageRight/Data.png" />
        </div>
      </transition-group>

      <div style="height: 30px"></div>
    </template>

    <a-card :bordered="false" :title="$t('info.infoSubmission.detailstep.header')">
      <a-steps :direction="(isMobile && 'vertical') || 'horizontal'" :current="NowStep" progressDot>
        <a-step>
          <template v-slot:title>
            <span>{{ $t('info.infoSubmission.detailstep.No1.title') }}</span>
          </template>
          <!-- <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ $t('info.infoSubmission.step.No1.describe') }}
            </div>
          </template> -->
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>{{ $t('info.infoSubmission.detailstep.No2.title') }}</span>
          </template>
          <!-- <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ $t('info.infoSubmission.step.No2.describe') }}
            </div>
          </template> -->
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>{{ $t('info.infoSubmission.detailstep.No3.title') }}</span>
          </template>
          <!-- <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ $t('info.infoSubmission.step.No3.describe') }}
            </div>
          </template> -->
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>{{ $t('info.infoSubmission.detailstep.No4') }}</span>
          </template>
          <!-- <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ $t('info.infoSubmission.step.No3.describe') }}
            </div>
          </template> -->
        </a-step>
      </a-steps>
    </a-card>

    <template>
      <!-- 开始卡片 -->

      <a-card :bordered="false" class="animate__animated animate__slideInUp" v-show="NowStep == 0">
        <a-skeleton active :paragraph="{ rows: 8 }" v-show="dataLoading"> </a-skeleton>
        <task-comfirm ref="taskComfirm" v-show="!dataLoading" submitType="detail"></task-comfirm>
      </a-card>

      <a-card :bordered="false" class="animate__animated animate__slideInUp" v-show="NowStep == 1">
        <emission-submit ref="emissionSubmit"></emission-submit>
      </a-card>

      <a-card :bordered="false" class="animate__animated animate__slideInUp" v-show="NowStep == 2">
        <reportANDsourceDownload ref="reportANDsourceDownload"></reportANDsourceDownload>
      </a-card>

      <a-card :bordered="false" class="animate__animated animate__slideInUp" v-show="NowStep == 3">
        <sang-ji-graph ref="SangJiGraph"></sang-ji-graph>
      </a-card>
    </template>

    <!-- fixed footer toolbar -->
    <footer-tool-bar
      :is-mobile="isMobile"
      :collapsed="sideCollapsed"
      style="display: block"
      class="footer-submission animate__animated animate__slideInUp"
    >
      <span class="popover-wrapper" style="min-width: 80px">
        <a-popover
          title="表单校验信息"
          overlayClassName="antd-pro-pages-forms-style-errorPopover"
          trigger="hover"
          :getPopupContainer="(trigger) => trigger.parentNode"
        >
          <template slot="content">
            <li
              v-for="item in errors"
              :key="item.key"
              @click="scrollToField(item.key)"
              class="antd-pro-pages-forms-style-errorListItem"
            >
              <a-icon type="cross-circle-o" class="antd-pro-pages-forms-style-errorIcon" />
              <div class="">{{ item.message }}</div>
              <div class="antd-pro-pages-forms-style-errorField">{{ item.fieldLabel }}</div>
            </li>
          </template>
          <span class="antd-pro-pages-forms-style-errorIcon" v-if="errors.length > 0">
            <a-icon
              theme="twoTone"
              type="exclamation-circle"
              two-tone-color="#fa5252"
              class="animate__animated animate__flash animate__repeat-2"
            />{{ errors.length }}
          </span>
        </a-popover>
      </span>

      <a-button style="margin-right: 20px" @click="closeAndBack" icon="close" v-if="NowStep == 0" type="danger">
        {{ $t('modal.btn.close') }}</a-button
      >

      <a-button style="margin-right: 20px" @click="backTolastPage" icon="vertical-right" v-if="NowStep != 0">
        {{ $t('modal.btn.lastPage') }}</a-button
      >

      <a-button
        style="margin-right: 20px"
        type="primary"
        @click="ValidateGoToNextStep"
        icon="vertical-left"
        :disabled="dataLoading"
        v-if="NowStep != 3"
      >
        {{ $t('modal.btn.nextPage') }}</a-button
      >

      <a-button style="margin-right: 20px" @click="closeAndBack" icon="close" v-if="NowStep == 3" type="danger">
        {{ $t('modal.btn.close') }}</a-button
      >
    </footer-tool-bar>
  </page-header-wrapper>
</template>

<script>
import RepositoryForm from './RepositoryForm'
import TaskForm from './TaskForm'
import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'
import ChangeBgCSS from '../../../utils/ChangeBgCSS'

import taskComfirm from '@/views/info/infoSubmission/infoSubmissionStep/taskComfirm'
import emissionSubmit from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmit'
import dataSourceUpload from '@/views/info/infoSubmission/infoSubmissionStep/dataSourceUpload'
import reportPreviewAndUpload from '@/views/info/infoSubmission/infoSubmissionStep/reportPreviewAndUpload'
import WaitForSuperviser from '@/views/info/infoSubmission/infoSubmissionStep/WaitForSuperviser'
import reportANDsourceDownload from '@/views/info/infoSubmission/infoSubmissionStep/reportANDsourceDownload'
import SangJiGraph from '@/views/info/infoSubmission/infoSubmissionStep/SangJiGraph'

import { Submit, GetReport } from '@/api/info'

// const fieldLabels = {
//   name: '仓库名',
//   url: '仓库域名',
//   owner: '仓库管理员',
//   approver: '审批人',
//   dateRange: '生效日期',
//   type: '仓库类型',
//   name2: '任务名',
//   url2: '任务描述',
//   owner2: '执行人',
//   approver2: '责任人',
//   dateRange2: '生效日期',
//   type2: '任务类型',
// }     
const fieldLabels = [
  {
    checkComfirm: '填报任务确认框',
  },
  {},
  {
    fileListsTmp: '数据来源文件上传框',
  },
  {
    fileListsTmp: '核算报告文件上传框',
  },
]

export default {
  name: 'AdvancedForm',
  mixins: [baseMixin],
  components: {
    FooterToolBar,
    RepositoryForm,
    TaskForm,
    //
    taskComfirm,
    emissionSubmit,
    dataSourceUpload,
    reportPreviewAndUpload,
    WaitForSuperviser,
    reportANDsourceDownload,
    SangJiGraph,
  },
  data() {
    return {
      NowStep: 0,
      taskInfo: {},
      submitData: {},

      errors: [],

      //
      dataLoading: true,
    }
  },
  mounted() {
    ChangeBgCSS('INFO')

    this.taskInfo = this.$route.params.task
    let params = {
      enterpriseID: this.enterpriseInfo.enterpriseID,
      taskYear: this.taskInfo.taskYear,
    }
    GetReport(params).then((res) => {
      // console.log(res)
      let result = JSON.parse(JSON.stringify(res))
      // console.log('res', result)
      // 检查result['data']['report']的类型，如果是字符串，说明是pdf文件，需要转换成blob
      if (typeof result['data']['report'] === 'string') {
        result['data']['report'] = JSON.parse(result['data']['report'])
      }
      this.submitData = result['data']['report']

      setTimeout(() => {
        this.$nextTick(() => {
          this.dataLoading = false
        })
        this.$message.success('获取历史数据成功')
      }, 900)
    })
    this.$refs.taskComfirm.passSubmitType('detail')
    // console.log(this.$route.params.task)
  },
  computed: {
    enterpriseInfo() {
      return this.$store.state.user.info
    },
  },
  methods: {
    // 最终全页面提交
    errorList(errors) {
      if (!errors || errors.length === 0) {
        return
      }
      this.errors = Object.keys(errors)
        .filter((key) => errors[key])
        .map((key) => ({
          key: key,
          message: errors[key][0],
          fieldLabel: fieldLabels[this.NowStep][key],
        }))
    },
    scrollToField(fieldKey) {
      let labelNode = document.querySelector(`label[for="${fieldKey}"]`)
      if (labelNode == null) {
        labelNode = document.querySelector(`#${fieldKey}`)
      }
      // console.log(labelNode)
      if (labelNode) {
        labelNode.scrollIntoView(true)
      }
    },
    async validate() {
      if (this.NowStep == 0) {
        this.$refs.emissionSubmit.passSourceData(this.submitData, 'detail')

        this.goTonextPage()
        window.scrollTo(0, 0)
      } else if (this.NowStep == 1) {
        this.$refs.reportANDsourceDownload.passSourceData(this.submitData, this.taskInfo, 'detail')
        this.goTonextPage()
        window.scrollTo(0, 0)
      } else if (this.NowStep == 2) {
        this.$refs.SangJiGraph.passSourceData(this.submitData)
        this.goTonextPage()
        window.scrollTo(0, 0)
      }
    },

    closeAndBack() {
      this.$router.push({ name: 'AnnualSubmissionCenter' })
    },
    backTolastPage() {
      window.scrollTo(0, 0)
      this.errors = []
      this.NowStep--
    },
    goTonextPage() {
      this.NowStep++
    },
    ValidateGoToNextStep() {
      this.validate()
      // this.NowStep++
    },
  },
}
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 24px;
}
.popover-wrapper {
  :deep(.antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content) {
    min-width: 396px;
    max-height: 290px;
    padding: 0;
    overflow: auto;
  }
}
.antd-pro-pages-forms-style-errorIcon {
  user-select: none;
  margin-right: 24px;
  color: #f5222d;
  cursor: pointer;
  i {
    margin-right: 4px;
  }
}
.antd-pro-pages-forms-style-errorListItem {
  padding: 8px 16px;
  list-style: none;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #e6f7ff;
  }
  .antd-pro-pages-forms-style-errorIcon {
    float: left;
    margin-top: 4px;
    margin-right: 12px;
    padding-bottom: 22px;
    color: #f5222d;
  }
  .antd-pro-pages-forms-style-errorField {
    margin-top: 2px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }
}
</style>

<style lang="less" scoped>
.footer-submission {
  background: linear-gradient(30deg, #edf2ff, white) !important;
  // background: red !important;
  box-shadow: 0px 0 3px #adb5bd !important;
  /* animation: FooterBGcolorChange 1.5s infinite; */
}
</style>
