<template>
  <page-header-wrapper content="本页面展示了您的交易详细信息。在这里，您能够清晰地追踪您的交易历史。">
    <!-- :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="
      (key) => {
        this.tabActiveKey = key
      }
    " -->
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
          <img style="height: 100%; transform: scale(2)" src="@/assets/beauty/pageRight/Trade.svg" />
        </div>
      </transition-group>

      <div style="height: 50px"></div>
    </template>

    <a-card :bordered="false" style="width: 100%">
      <!-- 筛选区域 -->
      <a-row type="flex">
        <div
          style="
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            margin-top: 0px;
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
          <div style="font-weight: 900; font-size: 30px; color: #438bfd">碳贸区块链正在守卫您的交易安全</div>
        </div>
      </a-row>

      <a-divider dashed></a-divider>

      <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol" style="margin-top: 40px">
        <a-form-model-item label="甲方">
          {{ tradeInfo.publishName }}({{ enterpriseInfo.enterpriseID }}) <a-tag color="cyan"> 您 </a-tag>
        </a-form-model-item>

        <a-form-model-item label="交易类型" prop="tradeType">
          <a-radio-group v-model="tradeInfo.tradeType" disabled>
            <a-radio value="SOLD"> 甲方向乙方出售碳排量 </a-radio>
            <a-radio value="SALE"> 甲方向乙方收购碳排量 </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="交易单价"> {{ tradeInfo.perEmission.toFixed(2) }} 碳币/tCO₂ </a-form-model-item>

        <a-form-model-item :label="`甲方剩余${tradeInfo.tradeType == 'SOLD' ? '库存' : '需求'}量`">
          {{ tradeInfo.emission.toFixed(4) }} tCO₂
        </a-form-model-item>

        <a-form-model-item :label="`交易状态`">
          <a-badge
            :status="tradeInfo.tradeStatus == 'YES' ? 'success' : 'processing'"
            :text="tradeInfo.tradeStatus == 'YES' ? '已完结' : '进行中'"
          ></a-badge>
        </a-form-model-item>

        <a-form-model-item :label="`成交订单量`"> {{ tradeInfo.orderID.length }} (如下表) </a-form-model-item>
      </a-form-model>

      <!-- 表格 -->
      <a-spin :spinning="dataLoading">
        <a-table
          :columns="columns"
          :data-source="myOrderListSource"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="orderID"
          style="width: 70%; margin: 5px auto"
        >
          <template slot="index" slot-scope="text, record, index">{{
            (currentPage - 1) * pageSize + Number(index) + 1
          }}</template>

          <template slot="purchaseName" slot-scope="text, record">
            <div v-if="record.purchaseName.length <= 5">{{ record.purchaseName }}</div>
            <div v-else>
              <a-tooltip>
                <template slot="title">
                  <div>
                    {{ record.purchaseName }}
                  </div>
                </template>
                {{ record.purchaseName.substring(0, 5) + '...' }}
              </a-tooltip>
            </div>
          </template>

          <template slot="dealNumTitle"> <a-icon type="gold" /> 交易量 (tCO₂) </template>
          <template slot="dealNum" slot-scope="text, record">
            {{ record.dealNum.toFixed(4) }}
          </template>

          <template slot="sum"> <a-icon type="money-collect" /> 总金额 </template>
          <template slot="sum" slot-scope="text, record">
            <span style="font-weight: bold"> {{ (record.dealNum * tradeInfo.perEmission).toFixed(2) }}</span>
          </template>

          <template slot="orderTime" slot-scope="text, record">
            <span> {{ computeDay(record.orderTime) }}</span>
          </template>

          <template slot="action" slot-scope="text, record">
            <a @click="openOrderDetail(record)"> 详情</a>
          </template>
        </a-table>
      </a-spin>

      <div style="width: 100%; text-align: center; margin-bottom: 50px; margin-top: 20px">
        <a-button type="danger" style="color: white" @click="() => this.$router.go(-1)">返回</a-button>
      </div>

      <!-- 交易发布表单 -->
    </a-card>

    <div>
      <orderDetail ref="orderDetailRef"></orderDetail>
      <!-- <video src="@/assets/pages/trade/tradeElse/tradeInBlockChain.mp4" loop autoplay style="width: 100%"></video> -->
    </div>
  </page-header-wrapper>
</template>

<script>
// import pdfTest from '@/components/PDFgenerate/pdfTest'
import changeBgCSS from '@/utils/ChangeBgCSS'
import { OrderDetail } from '@/api/trade'
import { tradeTypeClass_CN, tradeTypeClass_EN } from '@/config/class/trade/tradeTypeClass'
import store from '@/store'
import { enterpriseClassName_CN, enterpriseClassName_EN } from '@/config/class/enterpriseClass'
import dayjs from 'dayjs'
import orderDetail from '@/views/trade/myTrade/orderDetail.vue'

export default {
  name: 'CardList',
  components: {
    // pdfTest,
    orderDetail,
  },
  data() {
    // this.tabList = [
    //   { key: 'tab1', tab: '快速开始' },
    //   { key: 'tab2', tab: '产品简介' },
    //   { key: 'tab3', tab: '产品文档' },
    // ]
    return {
      // extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',

      tradeInfo: {},

      dataLoading: false,

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
          title: '乙方',
          dataIndex: 'purchaseName',
          key: 'purchaseName',
          // slots: { title: 'publishName' },
          scopedSlots: { customRender: 'purchaseName' },

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
          key: 'sum',
          slots: { title: 'sum' },
          scopedSlots: { customRender: 'sum' },
          sorter: (a, b) => a.perEmission * a.dealNum - b.perEmission * b.dealNum,
        },
        {
          title: '成交时间',

          key: 'orderTime',
          scopedSlots: { customRender: 'orderTime' },
          sorter: (a, b) => parseInt(a.orderTime) - parseInt(b.orderTime),
        },

        {
          title: '操作',
          // dataIndex: 'orderNum',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],

      labelCol: { span: 9 },
      wrapperCol: { span: 14 },

      tradeTypeClass_CN,
      tradeTypeClass_EN,
    }
  },
  mounted() {
    changeBgCSS('TRADE')
    // this.$message.info('您正在进行交易，请注意网络环境安全')
    this.initInfo()
  },
  computed: {
    lang() {
      return this.$store.state.app.lang
    },
    enterpriseInfo() {
      return this.$store.state.user.info
    },
  },

  methods: {
    async initInfo() {
      this.tradeInfo = this.$route.params.tradeInfo
      // console.log(this.tradeInfo)
      await store.dispatch('GetInfo')
      // console.log(this.tradeInfo.orderID)
      this.getOrdersInfo()
    },
    computeDay(timestamp) {
      let date = parseInt(timestamp) * 1000
      return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    getOrdersInfo() {
      this.dataLoading = true
      let orderIDList = this.tradeInfo.orderID
      const fetchPromises = orderIDList.map((orderID_) => {
        // 返回一个新的promise
        return OrderDetail(orderID_)
          .then((res) => {
            // 确保响应状态码是200
            if (res.success) {
              res.data.perEmission = this.tradeInfo.perEmission
              this.myOrderListSource.push(res.data)
              return true
            } else {
              this.$message.error(res.message)
              throw new Error()
            }
          })
          .catch((err) => {
            this.$message.error(err.response.data.message)
            throw new Error()
          })
      })
      // 等待所有promise完成
      Promise.all(fetchPromises)
        .then(() => {
          // console.log(this.myOrderListSource)
          this.dataLoading = false
          this.$message.success('获取订单信息成功，当前共有' + this.myOrderListSource.length + '个已成交订单')
        })
        .catch((err) => {
          this.dataLoading = false
          this.$message.error('获取订单信息失败,请检查网络后重试')
        })
    },
    handleTableChange(pagination) {
      // console.log(this.pagination)
      this.pageSize = pagination.pageSize
      this.currentPage = pagination.current
      this.pagination = JSON.parse(JSON.stringify(pagination))
      this.$forceUpdate()
    },
    openOrderDetail(record) {
      this.$refs.orderDetailRef.open(record, true)
    },
  },
}
</script>

<style lang="less" scoped>
@import '~@/components/index.less';

:deep(.ant-card-body) {
  padding-bottom: 4px;
}

.card-list {
  :deep(.ant-card-body:hover) {
    .ant-card-meta-title > a {
      color: @primary-color;
    }
  }

  :deep(.ant-card-meta-title) {
    margin-bottom: 12px;

    & > a {
      display: inline-block;
      max-width: 100%;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  :deep(.meta-content) {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}

.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}

.ant-card-actions {
  background: #f7f9fa;

  li {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }

    a {
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
      display: inline-block;
      width: 100%;
      &:hover {
        color: @primary-color;
      }
    }
  }
}

.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 188px;
}
</style>
