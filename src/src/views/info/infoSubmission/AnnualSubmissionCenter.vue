<template>
  <page-header-wrapper content="年度数据上报">
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
    <a-card class="card" title="上报任务" :bordered="false" style="min-height: 80px">
      <!-- 正常页面 -->
      <div style="display: flex; flex-wrap: wrap">
        <div v-for="idx in 10" :key="idx">
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
          >
            <div
              style="padding: 20px; border-radius: 8px 8px 0 0; color: white"
              :style="{ background: CardBgCalculate(idx) }"
            >
              <div style="font-weight: bold; font-size: 20px">2023年度数据上报</div>

              <a-tooltip placement="rightTop">
                <template slot="title">
                  <span>请上报2023年数据请上报2023年数据,并仔细提交</span>
                </template>
                <div>请上报2023年数据请上报2023年数据...</div>
              </a-tooltip>
            </div>
            <div style="padding: 20px; z-index: 10; display: flex; justify-content: space-between">
              <div>
                <div>截止时间：2023年4月15日</div>
                <div>当前状态：未填报</div>
              </div>

              <img
                class="info-submission-task-card-arrow animate__animated"
                src="@/assets/pages/info/infoSubmissionCenter/dataSubmissionTaskArrow.png"
                style="position: relative; z-index: 1; transform: scale(0.5); width: 50px"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 空页面 -->
      <div>
        <a-result title="暂无报送任务">
          <template #icon><img style="height: 200px" src="@/assets/default/EmptyInfo.png" /> </template
        ></a-result>
        <!-- 加载中 -->
        <a-result title="报送任务加载中">
          <template #icon><a-icon type="loading" /> </template
        ></a-result>
      </div>
    </a-card>

    <a-card
      class="card info-submission-requirement-card"
      title="数据上报须知"
      :bordered="false"
      style="min-height: 30px"
      v-if="this.$store.state.app.lang.includes('zh')"
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
  </page-header-wrapper>
</template>
  
  <script>
import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'
import ChangeBgCSS from '../../../utils/ChangeBgCSS'
import store from '@/store'

export default {
  name: 'AdvancedForm',
  mixins: [baseMixin],
  components: {
    FooterToolBar,
  },
  data() {
    return {
      loading: false,
      memberLoading: false,
    }
  },
  mounted() {
    ChangeBgCSS('INFO')
  },
  methods: {
    CardBgCalculate(idx) {
      const bgStr = [
        `linear-gradient(135deg,#ce9ffc,#7367f0)`,
        `linear-gradient(275deg,#5efce8,#736efe)`,
        `linear-gradient(135deg,#43cbff,#9708cc)`,
        `linear-gradient(135deg,#fd6e6a,#ffc600)`,
        `linear-gradient(135deg,#f54ea2,#ff7676)`,
        `linear-gradient(135deg,#ffa6b7,#1e2ad2)`,
      ]

      return bgStr[idx % bgStr.length]
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
  