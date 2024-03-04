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
  <!-- hidden PageHeaderWrapper title demo -->
  <div>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-row>
        <a-col :sm="12" :xs="36">
          <info title="我的订单数" value="8个任务1" :bordered="true" />
        </a-col>
        <a-col :sm="12" :xs="36">
          <info title="累计成交量" value="32分钟" :bordered="true" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import changeBgCSS from '@/utils/ChangeBgCSS'
import { STable } from '@/components'
import info from './Info'

export default {
  name: 'PreviousReports',
  components: {
    STable,
    info,
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
  },
  mounted() {
    changeBgCSS('TRADE')
  },
}
</script>
