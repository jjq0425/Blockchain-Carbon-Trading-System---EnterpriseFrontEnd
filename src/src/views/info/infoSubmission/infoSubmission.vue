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

    <a-card :bordered="false" :title="$t('info.infoSubmission.step.header')">
      <a-steps :direction="(isMobile && 'vertical') || 'horizontal'" :current="NowStep" progressDot>
        <a-step>
          <template v-slot:title>
            <span>{{ $t('info.infoSubmission.step.No1.title') }}</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ $t('info.infoSubmission.step.No1.describe') }}
            </div>
          </template>
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>{{ $t('info.infoSubmission.step.No2.title') }}</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ $t('info.infoSubmission.step.No2.describe') }}
            </div>
          </template>
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>{{ $t('info.infoSubmission.step.No3.title') }}</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ $t('info.infoSubmission.step.No3.describe') }}
            </div>
          </template>
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>{{ $t('info.infoSubmission.step.No4.title') }}</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ $t('info.infoSubmission.step.No4.describe') }}
            </div>
          </template>
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>{{ $t('info.infoSubmission.step.No5.title') }}</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              {{ $t('info.infoSubmission.step.No5.describe') }}
            </div>
          </template>
        </a-step>
      </a-steps>
    </a-card>

    <template>
      <!-- 开始卡片 -->

      <a-card :bordered="false" class="animate__animated animate__fadeIn" v-show="NowStep == 0">
        <a-skeleton active :paragraph="{ rows: 8 }" v-show="dataLoading"> </a-skeleton>
        <task-comfirm ref="taskComfirm" v-show="!dataLoading"></task-comfirm>
      </a-card>

      <a-card :bordered="false" class="animate__animated animate__slideInUp" v-show="NowStep == 1">
        <emission-submit ref="emissionSubmit"></emission-submit>
      </a-card>

      <a-card :bordered="false" class="animate__animated animate__slideInUp" v-show="NowStep == 2">
        <data-source-upload ref="dataSourceUpload"></data-source-upload>
      </a-card>

      <a-card :bordered="false" class="animate__animated animate__slideInUp" v-show="NowStep == 3">
        <report-preview-and-upload ref="reportPreviewAndUpload"></report-preview-and-upload>
      </a-card>

      <a-card :bordered="false" class="animate__animated animate__slideInUp" v-show="NowStep == 4">
        <wait-for-superviser ref="WaitForSuperviser"></wait-for-superviser>
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
          :title="$t('info.infoSubmission.footer.errorList.title')"
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

      <a-button
        style="margin-right: 20px"
        @click="closeAndBack"
        icon="close"
        v-if="NowStep == 0 || NowStep == 4"
        type="danger"
      >
        {{ $t('modal.btn.close') }}</a-button
      >

      <a-button
        style="margin-right: 20px"
        @click="backTolastPage"
        icon="vertical-right"
        v-if="NowStep != 0 && NowStep != 4"
      >
        {{ $t('modal.btn.lastPage') }}</a-button
      >

      <a-button
        style="margin-right: 20px"
        type="primary"
        @click="ValidateGoToNextStep"
        icon="vertical-left"
        :disabled="dataLoading"
        v-if="NowStep != 3 && NowStep != 4"
      >
        {{ $t('modal.btn.nextPage') }}</a-button
      >

      <a-popconfirm
        :title="$t('modal.confirm.confirmSubmit.content')"
        :ok-text="$t('modal.btn.confirm')"
        :cancel-text="$t('modal.btn.cancel')"
        @confirm="validate"
      >
        <a-button type="primary" icon="upload" v-if="NowStep == 3"> {{ $t('modal.btn.submit') }}</a-button>
      </a-popconfirm>
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
  },
  data() {
    return {
      fieldLabels: [
        {
          checkComfirm: this.$t('info.infoSubmission.footer.errorList.field.checkComfirm'),
        },
        {},
        {
          fileListsTmp: this.$t('info.infoSubmission.footer.errorList.field.fileListsTmp_source'),
        },
        {
          fileListsTmp: this.$t('info.infoSubmission.footer.errorList.field.fileListsTmp_report'),
        },
      ],
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
    if (this.taskInfo.auditStatus === 'REFUSE') {
      // 如果被驳货需要修改，修改的时候先获取信息
      let params = {
        enterpriseID: this.enterpriseInfo.enterpriseID,
        taskYear: this.taskInfo.taskYear,
      }
      GetReport(params).then((res) => {
        // console.log(res)
        let result = JSON.parse(JSON.stringify(res))
        // console.log('res', result)
        this.submitData = result['data']['report']

        setTimeout(() => {
          this.$nextTick(() => {
            this.dataLoading = false
          })
          this.$message.success(this.$t('result.success.getHistorySuccess'))
        }, 900)
        this.$refs.taskComfirm.passSubmitType('edit')
      })
    } else {
      this.dataLoading = false
      this.$refs.taskComfirm.passSubmitType('create')
    }

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
          fieldLabel: this.fieldLabels[this.NowStep][key],
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
        const taskComfirm = this.$refs.taskComfirm
        const taskComfirmForm = new Promise((resolve, reject) => {
          taskComfirm.form.validateFields((err, values) => {
            // console.log(err, values)
            if (err) {
              reject(err)
              return
            }
            resolve(values)
          })
        })
        Promise.all([taskComfirmForm])
          .then((values) => {
            this.errors = []
            this.goTonextPage()
          })
          .catch(() => {
            const errors = Object.assign({}, taskComfirm.form.getFieldsError())
            const tmp = { ...errors }
            this.errorList(tmp)
          })
        if (this.taskInfo.auditStatus === 'REFUSE') {
          // 如果是审核被拒绝了，获取原始数据重新提交
          this.$refs.emissionSubmit.passSourceData(this.submitData, 'modify')
        }
      } else if (this.NowStep == 1) {
        this.submitData = JSON.parse(JSON.stringify(this.$refs.emissionSubmit.getSourceData()))
        this.submitData.taskYear = this.taskInfo.taskYear
        this.submitData.enterpriseID = this.enterpriseInfo.enterpriseID
        this.submitData.enterpriseClass = this.enterpriseInfo.enterpriseClass

        /**
         * 将this.submitData涉及的数据进行格式转换
         * 例如：将字符串转换为数字
         */
        this.submitData.sumEmission = parseFloat(this.submitData.sumEmission)
        for (let i = 0; i < this.submitData.detail.length; i++) {
          this.submitData.detail[i].classDataSum = parseFloat(this.submitData.detail[i].classDataSum)
          for (let j = 0; j < this.submitData.detail[i].children.length; j++) {
            this.submitData.detail[i].children[j].EmissionFactorNum = parseFloat(
              this.submitData.detail[i].children[j].EmissionFactorNum
            )
            this.submitData.detail[i].children[j].activityFactorNum = parseFloat(
              this.submitData.detail[i].children[j].activityFactorNum
            )
            this.submitData.detail[i].children[j].classDataSum = parseFloat(
              this.submitData.detail[i].children[j].classDataSum
            )
          }
        }

        // console.log('submitDataINP2', this.submitData)
        if (this.taskInfo.auditStatus === 'REFUSE') {
          // 如果是审核被拒绝了，获取原始数据重新提交
          this.$refs.dataSourceUpload.passSourceData(this.submitData, 'modify')
        }
        this.goTonextPage()
      } else if (this.NowStep == 2) {
        const dataSourceUpload = this.$refs.dataSourceUpload
        const dataSourceUploadForm = new Promise((resolve, reject) => {
          dataSourceUpload.form.validateFields((err, values) => {
            // console.log(err, values)
            if (err) {
              reject(err)
              return
            }
            resolve(values)
          })
        })
        Promise.all([dataSourceUploadForm])
          .then((values) => {
            this.submitData.dataSourcePDF = this.$refs.dataSourceUpload.getdataSourcePDFUrl()
            this.errors = []
            if (this.taskInfo.auditStatus === 'REFUSE') {
              // 如果是审核被拒绝了，获取原始数据重新提交
              this.$refs.reportPreviewAndUpload.passSourceData(this.submitData, 'modify')
            }
            this.goTonextPage()
          })
          .catch(() => {
            const errors = Object.assign({}, dataSourceUpload.form.getFieldsError())
            const tmp = { ...errors }
            this.errorList(tmp)
          })
        this.$refs.reportPreviewAndUpload.passSubdata(this.submitData, this.taskInfo)
      } else if (this.NowStep == 3) {
        const reportPreviewAndUpload = this.$refs.reportPreviewAndUpload
        const reportPreviewAndUploadForm = new Promise((resolve, reject) => {
          reportPreviewAndUpload.form.validateFields((err, values) => {
            // console.log(err, values)
            if (err) {
              reject(err)
              return
            }
            resolve(values)
          })
        })
        Promise.all([reportPreviewAndUploadForm])
          .then((values) => {
            this.submitData.reportPDF = this.$refs.reportPreviewAndUpload.getreportPDFUrl()
            this.errors = []
            this.$refs.WaitForSuperviser.passTaskInfo(this.taskInfo)
            this.SubmitDataNow()
          })
          .catch(() => {
            const errors = Object.assign({}, reportPreviewAndUpload.form.getFieldsError())
            const tmp = { ...errors }
            this.errorList(tmp)
          })
      }
    },
    SubmitDataNow() {
      this.$message.loading({ content: this.$t('modal.loading.inSubmitLoadingWait'), key: 'subMitLoading' })
      Submit(this.submitData).then((res) => {
        if ((res.success = true)) {
          this.$message.success({ content: this.$t('result.success.submitSuccess'), key: 'subMitLoading' })
          this.goTonextPage()
        } else {
          this.$message.error({ content: this.$t('result.fail.submitErrorAndTryAgain'), key: 'subMitLoading' })
        }
      })
    },
    closeAndBack() {
      this.$router.push({ name: 'AnnualSubmissionCenter' })
    },
    backTolastPage() {
      window.scrollTo(0, 180)
      this.errors = []
      this.NowStep--
    },
    goTonextPage() {
      window.scrollTo(0, 180)
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
