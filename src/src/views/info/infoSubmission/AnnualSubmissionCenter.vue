<template>
  <page-header-wrapper :content="$t('info.submissionCenter.taskSubmit.title')">
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
    <a-card class="card" :title="$t('info.submissionCenter.taskSubmit')" :bordered="false" style="min-height: 80px">
      <!-- 正常页面 -->
      <div style="display: flex; flex-wrap: wrap">
        <div v-for="(task, idx) in taskList" :key="idx">
          <div
            style="
              width: 300px;
              min-height: 140px;
              border: 1px solid rgba(176, 191, 231, 0.15);
              box-shadow: 0 5px 15px 0 rgba(176, 191, 231, 0.15);
              border-radius: 10px;
              margin-left: 30px;
              margin-bottom: 20px;
            "
            class="info-submission-task-card"
            @click="RouteToSubmit(task)"
          >
            <div
              style="padding: 20px; border-radius: 8px 8px 0 0; color: white"
              :style="{ background: CardBgCalculate(idx) }"
            >
              <div style="font-weight: bold; font-size: 20px">
                {{ task.taskYear }}{{ $t('info.submissionCenter.annualDataSubmit') }}
              </div>
              <div v-if="task.taskDescription.length < 24">{{ task.taskDescription }}</div>
              <a-tooltip placement="rightTop" v-else>
                <template slot="title">
                  <span>{{ task.taskDescription }}</span>
                </template>
                <div>{{ task.taskDescription.substring(0, 23) + '...' }}</div>
              </a-tooltip>
            </div>
            <div style="padding: 20px; z-index: 10; display: flex; justify-content: space-between">
              <div>
                <div>
                  {{ $t('info.submissionCenter.taskBeginTime') }}：{{ momentFormat(task.taskBeginTime, 'YYYY-MM-DD') }}
                </div>
                <div>
                  {{ $t('info.submissionCenter.taskEndTime') }}：{{ momentFormat(task.taskBeginTime, 'YYYY-MM-DD') }}
                </div>

                <!-- <div v-if="lang.includes('zh-CN')">
                    {{ $t('info.submissionCenter.taskStatus') }}：{{ infoSubmitAuditClass_CN[task.auditStatus] }}
                  </div>
                  <div v-else>
                    {{ $t('info.submissionCenter.taskStatus') }}：{{ infoSubmitAuditClass_EN[task.auditStatus] }}
                  </div> -->

                <a-badge
                  :status="task | auditStatusStatus"
                  :text="task | auditStatusText"
                  style="padding: 5px 15px; margin-top: 10px; border-radius: 9999px"
                  :style="{ background: auditStatusStyle(task) }"
                />
              </div>

              <img
                v-if="!(task.isBegin == false || (task.isEnd == true && task.auditStatus == 'WAIT'))"
                class="info-submission-task-card-arrow animate__animated"
                src="@/assets/pages/info/infoSubmissionCenter/dataSubmissionTaskArrow.png"
                style="position: relative; z-index: 1; transform: scale(0.5); width: 90px"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 空页面 -->
      <div>
        <a-result :title="$t('info.submissionCenter.notask')" v-if="taskList.length == 0 && taskListLoading == false">
          <template #icon><img style="height: 200px" src="@/assets/default/EmptyInfo.png" /> </template
        ></a-result>
        <!-- 加载中 -->
        <a-result :title="$t('info.submissionCenter.taskLoading')" v-if="taskListLoading">
          <template #icon><a-icon type="loading" /> </template
        ></a-result>
      </div>
    </a-card>

    <a-card
      class="card info-submission-requirement-card"
      title="数据上报须知"
      :bordered="false"
      style="min-height: 30px"
      v-if="lang.includes('zh')"
    >
      根据国家发展和改革委员会发布的《中国企业温室气体排放核算方法与报告指南(试行)》，各企业应当按照以下要求上报温室气体排放数据：

      <a-row type="flex" style="margin-top: 15px">
        <a-col flex="1" style="font-weight: bold; color: #134089">数据真实可靠</a-col>
        <a-col flex="8"
          >企业上报的温室气体排放数据必须真实、准确、完整，不得虚报、瞒报、漏报。企业需对其上报数据的真实性负责。</a-col
        >
      </a-row>
      <a-row type="flex" style="margin-top: 15px">
        <a-col flex="1" style="font-weight: bold; color: #134089">数据来源明确</a-col>
        <a-col flex="8"
          >企业在上报各项温室气体排放数据时，需提供明确的数据来源，确保数据的真实性和可靠性。数据来源包括企业内部台账记录、第三方监测数据、政府主管部门公布数据等。</a-col
        >
      </a-row>
      <a-row type="flex" style="margin-top: 15px">
        <a-col flex="1" style="font-weight: bold; color: #134089">质量保证制度</a-col>
        <a-col flex="8"
          >企业应建立健全温室气体排放数据质量保证制度，指定专人负责温室气体排放数据核算和报告工作，建立数据监测计划，健全企业温室气体排放和能源消耗台账记录，并做好数据文件归档管理。
        </a-col>
      </a-row>
      <a-row type="flex" style="margin-top: 15px">
        <a-col flex="1" style="font-weight: bold; color: #134089">法律责任担保</a-col>
        <a-col flex="8"
          >企业需对其上报数据的真实性承担法律责任。若发现企业存在虚报、瞒报、漏报等行为，将依法追究法律责任。</a-col
        >
      </a-row>
      <a-row type="flex" style="margin-top: 15px">
        <a-col flex="1" style="font-weight: bold; color: #134089">其他要求事项</a-col>
        <a-col flex="8"
          >企业需按照规定的格式和要求，通过指定渠道上报温室气体排放数据。企业需严格执行国家关于温室气体排放核算和报告的相关规定，积极履行企业社会责任，为我国实现温室气体减排目标作出贡献。</a-col
        >
      </a-row>
    </a-card>

    <a-card
      class="card info-submission-requirement-card"
      title="Data Reporting Notice"
      :bordered="false"
      style="min-height: 30px"
      v-else
    >
      According to the "Accounting Methods and Reporting Guidelines for Greenhouse Gas Emissions of Chinese Enterprises
      (Trial)" issued by the China Development and Reform Commission, each enterprise shall report greenhouse gas
      emission data in accordance with the following requirements:

      <a-row type="flex" style="margin-top: 15px">
        <a-col flex="1" style="font-weight: bold; color: #134089">True and reliable</a-col>
        <a-col flex="8"
          >The greenhouse gas emission data reported by enterprises must be true, accurate, and complete, and must not
          be falsely reported, concealed, or omitted. Enterprises are responsible for the authenticity of their reported
          data.</a-col
        >
      </a-row>
      <a-row type="flex" style="margin-top: 15px">
        <a-col flex="1" style="font-weight: bold; color: #134089">Clear data source</a-col>
        <a-col flex="8"
          >When reporting greenhouse gas emission data, enterprises need to provide clear data sources to ensure the
          authenticity and reliability of the data. The data sources include internal ledger records of enterprises,
          third-party monitoring data, and data published by government regulatory departments.</a-col
        >
      </a-row>
      <a-row type="flex" style="margin-top: 15px">
        <a-col flex="1" style="font-weight: bold; color: #134089">Quality assurance</a-col>
        <a-col flex="8"
          >Enterprises should establish and improve a quality assurance system for greenhouse gas emission data,
          designate a dedicated person to be responsible for greenhouse gas emission data accounting and reporting,
          establish a data monitoring plan, improve the enterprise's greenhouse gas emission and energy consumption
          ledger records, and do a good job in data file archiving management.
        </a-col>
      </a-row>
      <a-row type="flex" style="margin-top: 15px">
        <a-col flex="1" style="font-weight: bold; color: #134089">Legal liability</a-col>
        <a-col flex="8"
          >Enterprises are legally responsible for the authenticity of their reported data. If it is found that the
          enterprise has engaged in false reporting, concealment, or omission, legal responsibility will be pursued in
          accordance with the law.</a-col
        >
      </a-row>
      <a-row type="flex" style="margin-top: 15px">
        <a-col flex="1" style="font-weight: bold; color: #134089">Other requirements</a-col>
        <a-col flex="8"
          >Enterprises need to report greenhouse gas emission data through designated channels in accordance with the
          prescribed format and requirements. Enterprises need to strictly implement the relevant national regulations
          on greenhouse gas emission accounting and reporting, actively fulfill their corporate social responsibility,
          and contribute to achieving China's greenhouse gas emission reduction goals.</a-col
        >
      </a-row>
    </a-card>

    <!-- 乱七八糟的东西 -->
    <!-- 暂未开始的弹窗 -->
    <a-modal v-model="NotBeginMoal.visible" :title="$t('modal.notice.title')">
      <template slot="footer">
        <a-button key="ok" type="primary" @click="() => (NotBeginMoal.visible = false)">
          {{ $t('modal.btn.ok2') }}
        </a-button>
      </template>
      <p>{{ $t('info.submissionCenter.taskNotBegin') }}</p>
    </a-modal>

    <a-modal v-model="HASEndMoal.visible" :title="$t('modal.notice.title')">
      <template slot="footer">
        <a-button key="ok" type="primary" @click="() => (HASEndMoal.visible = false)">
          {{ $t('modal.btn.ok2') }}
        </a-button>
      </template>
      <p>{{ $t('info.submissionCenter.taskHasEnd') }}</p>
    </a-modal>
  </page-header-wrapper>
</template>
  
  <script>
import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'
import ChangeBgCSS from '../../../utils/ChangeBgCSS'
import store from '@/store'
import { GetTaskList } from '@/api/info'
import { infoSubmitAuditClass_CN, infoSubmitAuditClass_EN } from '@/config/class/infoSubmitAduitClass'

import dayjs from 'dayjs'

export default {
  name: 'AdvancedForm',
  mixins: [baseMixin],
  components: {
    FooterToolBar,
  },
  data() {
    return {
      taskListLoading: true,
      // memberLoading: false,
      taskList: [],

      infoSubmitAuditClass_CN: infoSubmitAuditClass_CN,
      infoSubmitAuditClass_EN: infoSubmitAuditClass_EN,

      NotBeginMoal: {
        visible: false,
      },
      HASEndMoal: {
        visible: false,
      },
    }
  },
  computed: {
    lang() {
      return store.state.app.lang
    },
  },
  filters: {
    auditStatusStatus(task) {
      if (task.isBegin == false || (task.isEnd == true && task.auditStatus == 'WAIT')) {
        return 'default'
      }
      if (task.auditStatus == 'WAIT') {
        return 'processing'
      } else if (task.auditStatus == 'PASS') {
        return 'success'
      } else if (task.auditStatus == 'REFUSE') {
        return 'error'
      } else if (task.auditStatus == 'AUDIT') {
        return 'warning'
      } else {
        return 'default'
      }
    },

    auditStatusText(task) {
      if (store.state.app.lang.includes('zh')) {
        if (task.isBegin == false) {
          return '未开始'
        } else if (task.isEnd == true && task.auditStatus == 'WAIT') {
          return '已结束'
        }
        return infoSubmitAuditClass_CN[task.auditStatus]
      } else {
        if (task.isBegin == false) {
          return 'Not Started'
        } else if (task.isEnd == true && task.auditStatus == 'WAIT') {
          return 'Has End'
        }
        return infoSubmitAuditClass_EN[task.auditStatus]
      }
    },
  },
  mounted() {
    ChangeBgCSS('INFO')
    GetTaskList().then((res) => {
      let taskList = res.data.taskList
      taskList.forEach((item) => {
        item.isBegin = this.DayAafterOrSameB(
          this.momentFormat(this.getTodayTimeStamp()),
          this.momentFormat(item.taskBeginTime)
        )
        item.isEnd = this.DayAafterB(this.momentFormat(this.getTodayTimeStamp()), this.momentFormat(item.taskEndTime))
        // console.log(item.isBegin, this.momentFormat(this.getTodayTimeStamp()), this.momentFormat(item.taskBeginTime))
      })
      this.taskList = taskList
      this.taskListLoading = false
    })
  },
  methods: {
    auditStatusStyle(task) {
      if (task.isBegin == false || (task.isEnd == true && task.auditStatus == 'WAIT')) {
        return 'rgba(217, 217, 217,0.2)'
      }
      if (task.auditStatus == 'WAIT') {
        return 'rgba(24, 144, 255,0.1)'
      } else if (task.auditStatus == 'PASS') {
        return 'rgba(82, 196, 26,0.1)'
      } else if (task.auditStatus == 'REFUSE') {
        return 'rgba(245, 34, 45,0.1)'
      } else if (task.auditStatus == 'AUDIT') {
        return 'rgba(250, 173, 20,0.1)'
      } else {
        return 'rgba(217, 217, 217,0.1)'
      }
    },
    CardBgCalculate(idx) {
      const bgStr = [
        // `linear-gradient(135deg,#ce9ffc,#7367f0)`,
        `linear-gradient(250deg,#52e5e7,#130cb7)`,
        `linear-gradient(135deg,#43cbff,#9708cc)`,
        `linear-gradient(135deg,#fd6e6a,#ffc600)`,
        `linear-gradient(135deg,#f54ea2,#ff7676)`,
        `linear-gradient(275deg,#42e695,#3bb2b8)`,
      ]

      return bgStr[idx % bgStr.length]
    },
    RouteToSubmit(task) {
      if (task.isBegin) {
        if (task.auditStatus == 'PASS' || task.auditStatus == 'AUDIT') {
          this.$router.push({
            name: 'InfoSubmissionDetail',
            params: {
              task: task,
            },
          })
        } else if (task.isEnd == true && task.auditStatus == 'WAIT') {
          this.HASEndMoal.visible = true
        } else {
          this.$router.push({
            name: 'InfoSubmission',
            params: {
              task: task,
            },
          })
        }
      } else {
        this.NotBeginMoal.visible = true
      }
    },
    /**
     *
     * dayjs工具函数
     */
    momentFormat(date, format = 'YYYY-MM-DD') {
      // return moment().unix().format(format)

      date = parseInt(date) * 1000
      // console.log(dayjs().unix())
      return dayjs(date).format(format)
    },
    getTodayTimeStamp() {
      return dayjs().unix()
    },
    DayAafterOrSameB(date1, date2) {
      return dayjs(date1).isAfter(dayjs(date2), 'day') || dayjs(date1).isSame(dayjs(date2), 'day')
    },
    DayAafterB(date1, date2) {
      return dayjs(date1).isAfter(dayjs(date2), 'day')
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
    min-width: 256px;
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
  
<style scoped>
.footer-submission {
  background: linear-gradient(30deg, #edf2ff, white) !important;

  box-shadow: 0px 0 3px #adb5bd !important;
  /* animation: FooterBGcolorChange 1.5s infinite; */
}
.info-submission-requirement-card {
  background: white url('@/assets/pages/info/infoSubmissionCenter/dataSubmissionRequirements.png') no-repeat;
  background-position: 97% 95%;
  background-size: 15%;
  backdrop-filter: blur(4px);
}

.info-submission-task-card {
  transition: all 0.2s ease-in-out;
}
.info-submission-task-card:hover {
  transform: translateY(-5px);
  cursor: pointer;
}
.info-submission-task-card-arrow {
  visibility: hidden;
  transition: all 0.2s ease-in-out;
}

.info-submission-task-card:hover .info-submission-task-card-arrow {
  visibility: visible;
}
</style>
  