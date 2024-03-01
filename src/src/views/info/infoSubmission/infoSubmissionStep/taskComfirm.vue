<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <div>
    <a-alert
      message="您的本次填报任务被审核驳回，请根据审核要求认真重新填写提交信息，感谢您的配合"
      type="info"
      show-icon
      banner
      style="margin: 0px auto; width: 90%; margin-bottom: 20px"
      v-if="taskInfo.auditStatus === 'REFUSE'"
    />

    <a-descriptions title="企业信息" style="margin: 20px auto; width: 90%">
      <a-descriptions-item label="企业名"> {{ enterpriseInfo.enterpriseName }} </a-descriptions-item>
      <a-descriptions-item label="企业组织机构代码"> {{ enterpriseInfo.enterpriseID }} </a-descriptions-item>
      <a-descriptions-item label="企业类型"> {{ enterpriseInfo.enterpriseCharacter }} </a-descriptions-item>
      <a-descriptions-item label="企业所属行业">
        {{ enterpriseInfo.enterpriseClassName_CN }}
      </a-descriptions-item>
      <a-descriptions-item label="企业法人">
        {{ enterpriseInfo.enterpriseLegelPerson }}
      </a-descriptions-item>
      <a-descriptions-item label="企业填报负责人">
        {{ enterpriseInfo.enterpriseResponsiblePerson }}
      </a-descriptions-item>
      <a-descriptions-item label="企业负责人邮箱">
        {{ enterpriseInfo.enterpriseResponsibleEmail }}
      </a-descriptions-item>
      <a-descriptions-item label="企业地址" :span="2"> {{ enterpriseInfo.enterprisePosition }} </a-descriptions-item>
      <a-descriptions-item label="企业简介" :span="3">
        {{ enterpriseInfo.enterpriseDescription }}
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="填报任务信息" style="margin: 20px auto; width: 90%">
      <a-descriptions-item label="填报年份"> {{ taskInfo.taskYear }} </a-descriptions-item>
      <a-descriptions-item label="填报截止">
        {{ momentFormat(taskInfo.taskEndTime) + ' 23:59:59' }}
      </a-descriptions-item>
      <!-- <a-descriptions-item label="填报状态"> {{ this.audtiStatusStr(taskInfo.auditStatus) }} </a-descriptions-item> -->
      <a-descriptions-item label="填报状态">
        <a-badge
          :status="auditStatusStatus(taskInfo.auditStatus)"
          :text="auditStatusText(taskInfo.auditStatus)"
          style="padding: 5px 15px; margin-top: 10px; border-radius: 9999px"
          :style="{ background: auditStatusStyle(taskInfo.auditStatus) }"
        />
      </a-descriptions-item>

      <a-descriptions-item label="填报描述" :span="3">
        {{ taskInfo.taskDescription }}
      </a-descriptions-item>
    </a-descriptions>

    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0" v-if="submitType != 'detail'">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-checkbox
          style="font-size: 16px; color: #1890ff"
          :checked="form.checkComfirm"
          v-decorator="[
            'checkComfirm',
            {
              valuePropName: 'checked',
              rules: [
                { required: true, message: '请确认' },
                { type: 'enum', enum: [true], message: '请确认' },
              ],
            },
          ]"
        >
          我已确认上述信息
        </a-checkbox>
      </a-form-item>
    </a-form>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <h4>企业信息有误？</h4>
      <p>请及时前往企业设置界面进行细致的修改和更新。确保所有提供的信息准确无误，这对碳排放报告的生成至关重要！</p>
      <h4>填报任务有误？</h4>
      <p>
        请务必仔细检查并确认您已经选择了正确的填报任务。在碳排放报告填写过程中，选择正确的任务是保证报告准确性和完整性的第一步。如果您发现自己选择了错误的任务，请及时调整，以避免错误的数据和信息对报告结果产生影响。仔细核对每一个步骤，确保您的填报工作精确无误。
      </p>
    </div>
  </div>
</template>
  
  <script>
import dayjs from 'dayjs'
import store from '@/store'
import { infoSubmitAuditClass_CN, infoSubmitAuditClass_EN } from '@/config/class/infoSubmitAduitClass'
export default {
  name: 'Step1',
  prop: {},
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 8, offset: 20 },
      form: this.$form.createForm(this),

      enterpriseInfo: {},
      taskInfo: {},

      // peizhi
      infoSubmitAuditClass_CN: infoSubmitAuditClass_CN,
      infoSubmitAuditClass_EN: infoSubmitAuditClass_EN,
      submitType: 'create',
    }
  },
  filters: {},

  methods: {
    auditStatusStatus(task) {
      if (task == 'WAIT') {
        return 'processing'
      } else if (task == 'PASS') {
        return 'success'
      } else if (task == 'REFUSE') {
        return 'error'
      } else if (task == 'AUDIT') {
        return 'warning'
      } else {
        return 'default'
      }
    },

    auditStatusText(task) {
      if (store.state.app.lang.includes('zh')) {
        return infoSubmitAuditClass_CN[task]
      } else {
        return infoSubmitAuditClass_EN[task]
      }
    },
    auditStatusStyle(task) {
      if (task == 'WAIT') {
        return 'rgba(24, 144, 255,0.1)'
      } else if (task == 'PASS') {
        return 'rgba(82, 196, 26,0.1)'
      } else if (task == 'REFUSE') {
        return 'rgba(245, 34, 45,0.1)'
      } else if (task == 'AUDIT') {
        return 'rgba(250, 173, 20,0.1)'
      } else {
        return 'rgba(217, 217, 217,0.1)'
      }
    },
    momentFormat(date, format = 'YYYY-MM-DD') {
      date = parseInt(date) * 1000
      return dayjs(date).format(format)
    },
    audtiStatusStr(taskInfoauditStatus) {
      if (this.lang.includes('zh')) {
        return this.infoSubmitAuditClass_CN[taskInfoauditStatus]
      } else {
        return this.infoSubmitAuditClass_EN[taskInfoauditStatus]
      }
    },
    passSubmitType(submitType) {
      this.submitType = submitType
    },
  },
  computed: {
    lang() {
      return this.$store.state.app.lang
    },
  },
  mounted() {
    this.enterpriseInfo = this.$store.state.user.info
    this.taskInfo = this.$route.params.task
    // console.log(this.taskInfo)
  },
}
</script>
  
  <style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0, 0, 0, 0.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
  