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

    <!-- 开始卡片 -->
    <a-card :bordered="false" class="animate__animated animate__slideInUp" v-show="NowStep == 0">
      <task-comfirm ref="taskComfirm"></task-comfirm>
    </a-card>

    <a-card :bordered="false" class="animate__animated animate__slideInUp" v-show="NowStep == 1">
      <emission-submit ref="emissionSubmit"></emission-submit>
    </a-card>

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
        v-if="NowStep != 4"
      >
        {{ $t('modal.btn.nextPage') }}</a-button
      >

      <a-button type="primary" @click="validate" icon="upload" v-if="NowStep == 4">
        {{ $t('modal.btn.submit') }}</a-button
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
  },
  data() {
    return {
      NowStep: 1,
      taskInfo: {},

      errors: [],
    }
  },
  mounted() {
    ChangeBgCSS('INFO')

    this.taskInfo = this.$route.params.task
    console.log(this.$route.params.task)
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
      } else if (this.NowStep == 1) {
        this.goTonextPage()
      }

      // const {
      //   $refs: { repository, task },
      //   $notification,
      // } = this
      // const repositoryForm = new Promise((resolve, reject) => {
      //   repository.form.validateFields((err, values) => {
      //     if (err) {
      //       reject(err)
      //       return
      //     }
      //     resolve(values)
      //   })
      // })
      // const taskForm = new Promise((resolve, reject) => {
      //   task.form.validateFields((err, values) => {
      //     if (err) {
      //       reject(err)
      //       return
      //     }
      //     resolve(values)
      //   })
      // })
      // // clean this.errors
      // this.errors = []
      // Promise.all([repositoryForm, taskForm])
      //   .then((values) => {
      //     $notification['error']({
      //       message: 'Received values of form:',
      //       description: JSON.stringify(values),
      //     })
      //   })
      //   .catch(() => {
      //     const errors = Object.assign({}, repository.form.getFieldsError(), task.form.getFieldsError())
      //     const tmp = { ...errors }
      //     this.errorList(tmp)
      //   })
    },
    closeAndBack() {
      // TODO: 加一个退出提醒！
      this.$router.push({ name: 'AnnualSubmissionCenter' })
    },
    backTolastPage() {
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
