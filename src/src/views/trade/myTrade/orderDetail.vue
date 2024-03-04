<template>
  <a-modal v-model="visible" :title="$t('modal.detail.title')" :width="900" :dialog-style="{ top: '30px' }">
    <template slot="footer">
      <a-button key="back" @click="close()" type="danger"> {{ $t('modal.btn.close') }} </a-button>
      <!-- <a-button key="submit" type="primary" :loading="loading" @click="handleOk"> Submit </a-button> -->
    </template>

    <a-form-model :model="orderInfo" :label-col="{ span: 9 }" :wrapper-col="{ span: 14 }">
      <a-form-model-item label="甲方">
        {{ orderInfo.publishName }}
      </a-form-model-item>

      <a-form-model-item label="乙方">
        {{ enterpriseInfo.enterpriseName }} ({{ enterpriseInfo.enterpriseID }}) <a-tag color="cyan"> 您 </a-tag>
      </a-form-model-item>
      <a-form-model-item label="交易类型" prop="tradeType">
        <a-radio-group v-model="orderInfo.tradeType" disabled>
          <a-radio value="SOLD"> 甲方向乙方出售碳排量 </a-radio>
          <a-radio value="SALE"> 甲方向乙方收购碳排量 </a-radio>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item label="交易单价"> {{ orderInfo.perEmission.toFixed(2) }} 碳币/tCO₂ </a-form-model-item>

      <a-form-model-item :label="`交易(${orderInfo.tradeType == 'SOLD' ? '购买' : '卖出'})碳排量`" prop="dealNum">
        {{ orderInfo.dealNum.toFixed(4) }}
        <span style="margin-left: 10px; font-size: 10px; color: grey">tCO₂</span>
      </a-form-model-item>

      <a-form-model-item :label="`交易时间`" prop="orderTime">
        {{ computedDay(orderInfo.orderTime) }}
      </a-form-model-item>
    </a-form-model>

    <div style="width: 50%; margin: 10px auto">
      <a-divider orientation="left" style="width: 50px; color: #228be6">合计</a-divider>
    </div>
    <div style="width: 50%; margin: 10px auto; text-align: right">
      <div>
        碳币变动：
        <span :style="{ color: orderInfo.tradeType == 'SALE' ? 'green' : 'red' }">
          <span>{{ orderInfo.tradeType == 'SALE' ? '+' : '-' }}</span>
          {{ (orderInfo.perEmission * orderInfo.dealNum).toFixed(2) }}</span
        >
      </div>
      <div style="margin-top: 5px">
        碳排量变动：<span>
          <span :style="{ color: orderInfo.tradeType == 'SALE' ? 'red' : 'green' }">
            <span>{{ orderInfo.tradeType == 'SALE' ? '-' : '+' }}</span>
            {{ orderInfo.dealNum == null ? '0.0000' : orderInfo.dealNum.toFixed(4) }}</span
          >
        </span>
      </div>
      <div style="margin-top: 5px; margin-bottom: -15px">
        订单编号：<span>
          {{ orderInfo.orderID }}
        </span>
      </div>
    </div>
  </a-modal>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      visible: false,

      orderInfo: {},
    }
  },
  methods: {
    open(orderInfo) {
      this.visible = true
      this.orderInfo = orderInfo
    },
    close() {
      this.visible = false
      //   this.orderInfo = {}
    },
    computedDay(ts) {
      let date = parseInt(ts) * 1000
      return dayjs(date).format('YYYY-MM-DD HH:mm')
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
}
</script>

<style>
</style>