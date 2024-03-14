


<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <div>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-row>
        <a-col :sm="12" :xs="36">
          <info
            :title="$t('trade.myOrder.header.totalNum')"
            :value="`${statistic.totoalNum} ${this.$t('trade.myPublish.header.unitGE')}`"
            :bordered="true"
          />
        </a-col>
        <a-col :sm="12" :xs="36">
          <info
            :title="$t('trade.myOrder.header.sumEmission')"
            :value="`${statistic.sumEmission} tCO₂`"
            :bordered="true"
          />
        </a-col>
      </a-row>
    </a-card>

    <a-spin :spinning="dataLoading" :delay="100">
      <a-icon slot="indicator" type="loading" style="font-size: 48px" spin />
      <a-card :bordered="false" style="margin-top: 24px">
        <!-- 以下是由您的订单，点击表头按钮可以对表格进行筛选、排序。 -->
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div>{{ $t('trade.myOrder.table.describe') }}</div>
          <div>
            <a-button
              type="primary"
              shape="round"
              style="border-radius: 9999px"
              icon="shopping-cart"
              @click="gotoTradeMarket()"
              >{{ $t('dashboard.data_analysis.zhi-gan-ping-gu.btn.N2') }}</a-button
            >
          </div>
        </div>
        <a-divider dashed></a-divider>
        <a-table
          :columns="columns"
          :data-source="myOrderListSource"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="orderID"
        >
          <template slot="index" slot-scope="text, record, index">{{
            (currentPage - 1) * pageSize + Number(index) + 1
          }}</template>
          <template slot="tradeType" slot-scope="text, record">
            <a-tag style="font-weight: bold" :color="record.tradeType == 'SALE' ? '#0ca678' : '#f03e3e'">{{
              lang.includes('zh') ? tradeTypeClass_CN[record.tradeType] : tradeTypeClass_EN[record.tradeType]
            }}</a-tag>
          </template>

          <template slot="publishName" slot-scope="text, record">
            <div v-if="record.publishName.length <= 7">{{ record.publishName }}</div>
            <div v-else>
              <a-tooltip>
                <template slot="title">
                  <div>
                    {{ record.publishName }}
                  </div>
                </template>
                {{ record.publishName.substring(0, 7) + '...' }}
              </a-tooltip>
            </div>
          </template>

          <template slot="dealNumTitle">
            <a-icon type="gold" /> {{ $t('trade.myOrder.table.content.dealNum') }} (tCO₂)
          </template>
          <template slot="dealNum" slot-scope="text, record">
            {{ record.dealNum.toFixed(2) }}
          </template>

          <template slot="perEmissionTitle">
            <a-icon type="pay-circle" /> {{ $t('trade.makeTrade.info.perPrice') }}
          </template>
          <template slot="perEmission" slot-scope="text, record">
            {{ record.perEmission.toFixed(2) }}
          </template>

          <template slot="sum" slot-scope="text, record">
            <span style="font-weight: bold"> {{ (record.perEmission * record.dealNum).toFixed(2) }}</span>
          </template>

          <template slot="orderTime" slot-scope="text, record">
            <span> {{ computeDay(record.orderTime) }}</span>
          </template>

          <template slot="action" slot-scope="text, record">
            <a @click="openOrderDetail(record)"> {{ $t('modal.detail.title') }}</a>
            <a style="margin-left: 10px" @click="trackOrderTXID(record.orderID)">{{
              $t('trade.myOrder.table.content.btn.qu-kuai-su-yuan')
            }}</a>
          </template>
        </a-table>
        <div
          style="
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            border-radius: 999px;
            background: linear-gradient(90deg, #e7f5ff 10%, white 25%, white 40%, #e7f5ff);
          "
        >
          <div style="width: 25%">
            <video
              src="@/assets/pages/trade/tradeElse/tradeInBlockChain.mp4"
              loop
              autoplay
              style="width: 30%; transform: translateX(150%)"
            ></video>
          </div>
          <div style="font-weight: 900; font-size: 30px; color: #438bfd">{{ $t('trade.blockChainSecurity') }}</div>
        </div>

        <!-- 表格区域 -->
      </a-card>
    </a-spin>
    <orderDetail ref="orderDetailRef"></orderDetail>
    <orderTrackTXID ref="orderTrackTXID"></orderTrackTXID>
  </div>
</template>

<script>
import changeBgCSS from '@/utils/ChangeBgCSS'
import { STable } from '@/components'
import info from './Info'
import { MyOrderList } from '@/api/trade'
import dayjs from 'dayjs'
import { tradeTypeClass_CN, tradeTypeClass_EN } from '@/config/class/trade/tradeTypeClass'

import orderDetail from '@/views/trade/myTrade/orderDetail.vue'
import orderTrackTXID from './orderTrackTXID.vue'

export default {
  name: 'PreviousReports',
  components: {
    STable,
    info,
    orderDetail,
    orderTrackTXID,
  },
  data() {
    return {
      statistic: {
        totoalNum: 0,
        sumEmission: 0,
      },
      myOrderListSource: [],

      pageSize: 10,
      currentPage: 1,
      pagination: {
        pageSize: 10,
        currentPage: 1,
      },

      columns: [
        {
          title: '#',

          key: 'index',
          scopedSlots: { customRender: 'index' },
        },
        {
          title: this.$t('trade.market.header.filter.tradeType.label'),
          dataIndex: 'tradeType',
          key: 'tradeType',
          scopedSlots: { customRender: 'tradeType' },
          filters: [
            {
              text: this.$t('trade.publish.content.tradeType.sold'),
              value: 'SOLD',
            },
            {
              text: this.$t('trade.publish.content.tradeType.sale'),
              value: 'SALE',
            },
          ],

          onFilter: (value, record) => record.tradeType.indexOf(value) >= 0,
        },
        {
          title: this.$t('trade.makeTrade.info.JIA'),
          dataIndex: 'publishName',
          key: 'publishName',
          // slots: { title: 'publishName' },
          scopedSlots: { customRender: 'publishName' },

          // sorter: (a, b) => a.dealNum - b.dealNum,
        },
        {
          dataIndex: 'dealNum',
          key: 'dealNum',
          slots: { title: 'dealNumTitle' },
          scopedSlots: { customRender: 'dealNum' },

          sorter: (a, b) => a.dealNum - b.dealNum,
        },
        {
          dataIndex: 'perEmission',
          key: 'perEmission',
          slots: { title: 'perEmissionTitle' },
          scopedSlots: { customRender: 'perEmission' },

          sorter: (a, b) => a.perEmission - b.perEmission,
        },
        {
          title: this.$t('trade.myOrder.table.content.sumCoin'),

          key: 'sum',
          scopedSlots: { customRender: 'sum' },
          sorter: (a, b) => a.perEmission * a.dealNum - b.perEmission * b.dealNum,
        },
        {
          title: this.$t('trade.myOrder.table.content.orderTime'),

          key: 'orderTime',
          scopedSlots: { customRender: 'orderTime' },
          defaultSortOrder: 'descend',
          sorter: (a, b) => parseInt(a.orderTime) - parseInt(b.orderTime),
        },

        {
          title: this.$t('trade.myPublish.table.content.action.title'),
          // dataIndex: 'orderNum',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],

      dataLoading: false,
      tradeTypeClass_CN,
      tradeTypeClass_EN,
    }
  },
  methods: {
    // handler
    computeDay(timestamp) {
      let date = parseInt(timestamp) * 1000
      return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    handleSubmit(e) {},
    fetchData() {
      this.dataLoading = true
      MyOrderList().then((res) => {
        this.myOrderListSource = res.data.orderListEnterprise
        this.calcuStatistic()
        this.dataLoading = false
      })
    },
    calcuStatistic() {
      this.statistic.totoalNum = this.myOrderListSource.length
      this.statistic.sumEmission = this.myOrderListSource
        .reduce((pre, cur) => {
          return pre + cur.dealNum
        }, 0)
        .toFixed(2)
    },
    handleTableChange(pagination) {
      // console.log(this.pagination)
      this.pageSize = pagination.pageSize
      this.currentPage = pagination.current
      this.pagination = JSON.parse(JSON.stringify(pagination))
      this.$forceUpdate()
    },
    openOrderDetail(record) {
      this.$refs.orderDetailRef.open(record)
    },
    gotoTradeMarket() {
      this.$router.push({ name: 'tradeMarket' })
    },
    trackOrderTXID(orderID) {
      let txID = orderID
      this.$refs.orderTrackTXID.open(txID)
    },
  },
  computed: {
    lang() {
      return this.$store.state.app.lang
    },
    enterpriseInfo() {
      return this.$store.state.user.info
    },
  },
  mounted() {
    changeBgCSS('TRADE')
    this.fetchData()
  },
}
</script>
