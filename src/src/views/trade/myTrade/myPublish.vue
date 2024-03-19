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
        <a-col :sm="8" :xs="24">
          <info
            :title="$t('trade.myPublish.header.totalPublish')"
            :value="`${statistic.totoalNum} ${this.$t('trade.myPublish.header.unitGE')}`"
            :bordered="true"
          />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info
            :title="$t('trade.myPublish.header.finishPublish')"
            :value="`${statistic.successNum} ${this.$t('trade.myPublish.header.unitGE')}`"
            :bordered="true"
          />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info :title="$t('trade.myPublish.header.remainDealNum')" :value="`${statistic.remainDealNum} tCO₂`" />
        </a-col>
      </a-row>
    </a-card>
    <a-spin :spinning="dataLoading" :delay="100">
      <a-icon slot="indicator" type="loading" style="font-size: 48px" spin />
      <a-card :bordered="false" style="margin-top: 24px">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div>{{ $t('trade.myPublish.table.describe') }}</div>
          <div>
            <a-button
              type="primary"
              shape="round"
              style="border-radius: 9999px"
              icon="plus"
              @click="gotoTradePublish()"
              >{{ $t('trade.myPublish.table.describe_btn') }}</a-button
            >
            <a-button
              :style="{ marginLeft: '8px' }"
              style="
                background: linear-gradient(135deg, #ffa94d, #f38181);
                color: white;
                border: none;
                border-radius: 9999px;
              "
              @click="coCoinRecharge"
            >
              碳币充值</a-button
            >
            <coCoinRecharge ref="coCoinRecharge"></coCoinRecharge>
          </div>
        </div>
        <a-divider dashed></a-divider>
        <a-table
          :columns="columns"
          :data-source="myPublishListSource"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="tradeID"
        >
          <template slot="index" slot-scope="text, record, index">{{
            (currentPage - 1) * pageSize + Number(index) + 1
          }}</template>
          <template slot="tradeType" slot-scope="text, record">
            <a-tag style="font-weight: bold" :color="record.tradeType == 'SALE' ? '#0ca678' : '#f03e3e'">{{
              lang.includes('zh') ? tradeTypeClass_CN[record.tradeType] : tradeTypeClass_EN[record.tradeType]
            }}</a-tag>
          </template>

          <template slot="emissionTitle">
            <a-icon type="gold" /> {{ $t('trade.myPublish.header.remainDealNum') }} (tCO₂)
          </template>
          <template slot="emission" slot-scope="text, record">
            {{ record.emission.toFixed(2) }}
          </template>

          <template slot="perEmissionTitle">
            <a-icon type="pay-circle" /> {{ $t('trade.makeTrade.info.perPrice') }}
          </template>
          <template slot="perEmission" slot-scope="text, record">
            {{ record.perEmission.toFixed(2) }}
          </template>

          <template slot="tradeStatus" slot-scope="text, record">
            <a-badge
              :status="record.tradeStatus == 'YES' ? 'success' : 'processing'"
              :text="
                record.tradeStatus == 'YES'
                  ? $t('trade.myPublish.table.content.tradeStatus.YES')
                  : $t('trade.myPublish.table.content.tradeStatus.NO')
              "
            ></a-badge>
          </template>

          <template slot="orderNum" slot-scope="text, record">
            <span v-if="record.orderID.length" style="font-weight: bold">{{ record.orderID.length }}</span>
            <span v-else>{{ record.orderID.length }}</span>
          </template>

          <template slot="action" slot-scope="text, record">
            <a @click="openTradeDetail(record)"> {{ $t('modal.detail.title') }}</a>
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
  </div>
</template>

<script>
import changeBgCSS from '@/utils/ChangeBgCSS'
import { STable } from '@/components'
import info from './Info'
import { MyPublishTradeList } from '@/api/trade'
import { tradeTypeClass_CN, tradeTypeClass_EN } from '@/config/class/trade/tradeTypeClass'
import coCoinRecharge from '@/views/trade/components/coCoinRecharge'

export default {
  name: 'PreviousReports',
  components: {
    STable,
    info,
    coCoinRecharge,
  },
  data() {
    return {
      statistic: {
        totoalNum: 0,
        successNum: 0,
        remainDealNum: 0,
      },
      myPublishListSource: [],

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
          dataIndex: 'emission',
          key: 'emission',
          slots: { title: 'emissionTitle' },
          scopedSlots: { customRender: 'emission' },

          sorter: (a, b) => a.emission - b.emission,
        },
        {
          dataIndex: 'perEmission',
          key: 'perEmission',
          slots: { title: 'perEmissionTitle' },
          scopedSlots: { customRender: 'perEmission' },

          sorter: (a, b) => a.perEmission - b.perEmission,
        },
        {
          title: this.$t('trade.myPublish.table.content.tradeStatus.title'),
          dataIndex: 'tradeStatus',
          key: 'tradeStatus',
          scopedSlots: { customRender: 'tradeStatus' },
          filters: [
            {
              text: this.$t('trade.myPublish.table.content.tradeStatus.YES'),
              value: 'YES',
            },
            {
              text: this.$t('trade.myPublish.table.content.tradeStatus.NO'),
              value: 'NO',
            },
          ],
          onFilter: (value, record) => record.tradeStatus.indexOf(value) >= 0,
        },
        {
          title: this.$t('trade.myPublish.table.content.orderNum.title'),
          dataIndex: 'orderNum',
          key: 'orderNum',
          scopedSlots: { customRender: 'orderNum' },
          filters: [
            {
              text: this.$t('trade.myPublish.table.content.orderNum.Noorder'),
              value: '0',
            },
            {
              text: this.$t('trade.myPublish.table.content.orderNum.hasOrder'),
              value: '1',
            },
          ],
          onFilter: (value, record) => (record.orderID.length == 0 ? '0' : '1') == value,

          sorter: (a, b) => a.orderID.length - b.orderID.length,
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
    handleSubmit(e) {},
    fetchData() {
      this.dataLoading = true
      MyPublishTradeList().then((res) => {
        this.myPublishListSource = res.data.tradeListEnterprise.sort(
          (a, b) => parseInt(b.tradeID) - parseInt(a.tradeID)
        )
        this.calcuStatistic()
        this.dataLoading = false
      })
    },
    calcuStatistic() {
      this.statistic.totoalNum = this.myPublishListSource.length
      this.statistic.successNum = this.myPublishListSource.filter((item) => item.tradeStatus === 'YES').length
      this.statistic.remainDealNum = this.myPublishListSource
        .reduce((pre, cur) => {
          return pre + cur.emission
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
    gotoTradePublish() {
      this.$router.push({ name: 'tradePublish' })
    },
    openTradeDetail(record) {
      this.$router.push({ name: 'tradeDetail', params: { tradeInfo: record } })
    },
    coCoinRecharge() {
      this.$refs.coCoinRecharge.open()
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
