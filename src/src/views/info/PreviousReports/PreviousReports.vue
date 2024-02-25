
<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper
    content="在这里，您可以轻松查看过去的碳排放报告情况，包括排放量、来源和时间等关键信息，助您更好地掌握碳排放趋势，制定有效的碳减排策略。立即探索我们的碳排放历史数据页面，为您的环保事业增添力量！"
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
          <img style="height: 100%; transform: scale(1.7)" src="@/assets/beauty/pageRight/Data.png" />
        </div>
      </transition-group>

      <div style="height: 30px"></div>
    </template>

    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false"
      ><s-table ref="table" size="default" :columns="columns" :data="loadData"> </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import ChangeBgCSS from '../../../utils/ChangeBgCSS'
import { STable } from '@/components'

export default {
  name: 'PreviousReports',
  components: {
    STable,
  },
  data() {
    return {
      columns: [
        {
          title: '序号',
          dataIndex: 'no',
        },
        {
          title: '上报任务',
          dataIndex: 'task',
        },

        {
          title: '上报截止时间',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          customRender: (text) => text + ' 次',
        },
        {
          title: '排放总量',
          dataIndex: 'EmissionSum',
        },
        {
          title: '上报状态',
          dataIndex: 'status',
          needTotal: true,
        },
        // {
        //   title: '更新时间',
        //   dataIndex: 'updatedAt',
        //   sorter: true,
        // },
      ],
      loadData: (parameter) => {
        return getUsers(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.result
        })
      },
    }
  },
  methods: {
    // handler
    handleSubmit(e) {},
  },
  mounted() {
    ChangeBgCSS('INFO')
  },
}
</script>
