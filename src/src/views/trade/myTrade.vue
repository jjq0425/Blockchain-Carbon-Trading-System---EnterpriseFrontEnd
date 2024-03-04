

<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="tabChange"
    content="欢迎来到“我的交易”页面，这里是您查询之前发布和订购碳排放量交易的页面，您可以快速管理您的交易信息，让您轻松参与碳交易市场，实现低碳发展。"
  >
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
          <img style="height: 100%; transform: scale(1.7)" src="@/assets/beauty/pageRight/Trade.svg" />
        </div>
      </transition-group>

      <div style="height: 30px"></div>
    </template>

    <!-- <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <info title="我的待办" value="8个任务" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="本周任务平均处理时间" value="32分钟" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="本周完成任务数" value="24个" />
        </a-col>
      </a-row>
    </a-card> -->
    <router-view />
  </page-header-wrapper>
</template>

<script>
import changeBgCSS from '@/utils/ChangeBgCSS'
import { STable } from '@/components'

export default {
  name: 'PreviousReports',
  components: {
    STable,
  },
  data() {
    this.tabList = [
      { key: 'myPublish', tab: '我的发布' },
      { key: 'myOrder', tab: '我的订单' },
    ]
    return {
      tabActiveKey: 'myPublish',
    }
  },
  methods: {
    // handler
    handleSubmit(e) {},
    tabChange(key) {
      if (key == null || key == undefined) {
        key = 'myPublish'
      }
      this.tabActiveKey = key
      if (key === 'myPublish') {
        this.$router.push({ name: 'myPublish' })
      } else {
        this.$router.push({ name: 'myOrder' })
      }
    },
  },
  mounted() {
    changeBgCSS('TRADE')
  },
}
</script>
