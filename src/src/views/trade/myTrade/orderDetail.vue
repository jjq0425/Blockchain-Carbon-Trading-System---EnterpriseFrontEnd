<template>
  <a-modal v-model="visible" :title="$t('modal.detail.title')" :width="900" :dialog-style="{ top: '30px' }">
    <template slot="footer">
      <a-button key="back" @click="close()" type="danger"> {{ $t('modal.btn.close') }} </a-button>
      <!-- <a-button key="submit" type="primary" :loading="loading" @click="handleOk"> Submit </a-button> -->
    </template>

    <a-form-model :model="orderInfo" :label-col="{ span: 9 }" :wrapper-col="{ span: 14 }">
      <a-form-model-item :label="$t('trade.makeTrade.info.JIA')">
        {{ orderInfo.publishName }}
        <a-tag color="cyan" v-if="orderInfo.publishName === enterpriseInfo.enterpriseName">
          {{ $t('user.YOU') }}
        </a-tag>
      </a-form-model-item>

      <a-form-model-item :label="$t('trade.makeTrade.info.YI')" v-if="orderInfo.purchaseName == null">
        {{ enterpriseInfo.enterpriseName }} ({{ enterpriseInfo.enterpriseID }})
        <a-tag color="cyan"> {{ $t('user.YOU') }} </a-tag>
      </a-form-model-item>
      <a-form-model-item :label="$t('trade.makeTrade.info.YI')" v-else>
        {{ orderInfo.purchaseName }}
        <a-tag color="cyan" v-if="orderInfo.purchaseName == enterpriseInfo.enterpriseName">
          {{ $t('user.YOU') }}
        </a-tag>
      </a-form-model-item>
      <a-form-model-item :label="$t('trade.market.header.filter.tradeType.label')" prop="tradeType">
        <a-radio-group v-model="orderInfo.tradeType" disabled>
          <a-radio value="SOLD"> {{ $t('trade.makeTrade.info.tradeType.JIAsoldToYI') }} </a-radio>
          <a-radio value="SALE"> {{ $t('trade.makeTrade.info.tradeType.JIArequireFromYI') }} </a-radio>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item :label="$t('trade.makeTrade.info.perPrice')">
        {{ orderInfo.perEmission.toFixed(2) }} 碳币/tCO₂
      </a-form-model-item>

      <a-form-model-item
        :label="`${$t('trade.makeTrade.info.deal')}(${
          orderInfo.tradeType == 'SOLD' ? $t('trade.makeTrade.info.buy') : $t('trade.makeTrade.info.sold')
        })${$t('trade.makeTrade.info.COemission')}`"
        prop="dealNum"
      >
        {{ orderInfo.dealNum.toFixed(2) }}
        <span style="margin-left: 10px; font-size: 10px; color: grey">tCO₂</span>
      </a-form-model-item>

      <a-form-model-item :label="$t('trade.myOrder.table.content.orderTime')" prop="orderTime">
        {{ computedDay(orderInfo.orderTime) }}
      </a-form-model-item>
    </a-form-model>

    <div style="width: 50%; margin: 10px auto">
      <a-divider orientation="left" style="width: 50px; color: #228be6">{{
        $t('trade.makeTrade.info.inTotal')
      }}</a-divider>
    </div>
    <div style="width: 50%; margin: 10px auto; text-align: right">
      <div v-if="!isJIA">
        {{ $t('trade.makeTrade.info.coCoinChange') }}：
        <span :style="{ color: orderInfo.tradeType == 'SALE' ? 'green' : 'red' }">
          <span>{{ orderInfo.tradeType == 'SALE' ? '+' : '-' }}</span>
          {{ (orderInfo.perEmission * orderInfo.dealNum).toFixed(2) }}</span
        >
      </div>
      <div style="margin-top: 5px" v-if="!isJIA">
        {{ $t('trade.makeTrade.info.emissionChange') }}：<span>
          <span :style="{ color: orderInfo.tradeType == 'SALE' ? 'red' : 'green' }">
            <span>{{ orderInfo.tradeType == 'SALE' ? '-' : '+' }}</span>
            {{ orderInfo.dealNum == null ? '0.0000' : orderInfo.dealNum.toFixed(2) }}</span
          >
        </span>
      </div>

      <div v-if="isJIA">
        {{ $t('trade.makeTrade.info.coCoinChange') }}：
        <span :style="{ color: orderInfo.tradeType == 'SALE' ? 'red' : 'green' }">
          <span>{{ orderInfo.tradeType == 'SALE' ? '-' : '+' }}</span>
          {{ (orderInfo.perEmission * orderInfo.dealNum).toFixed(2) }}</span
        >
      </div>
      <div style="margin-top: 5px" v-if="isJIA">
        {{ $t('trade.makeTrade.info.emissionChange') }}：<span>
          <span :style="{ color: orderInfo.tradeType == 'SALE' ? 'green' : 'red' }">
            <span>{{ orderInfo.tradeType == 'SALE' ? '+' : '-' }}</span>
            {{ orderInfo.dealNum == null ? '0.0000' : orderInfo.dealNum.toFixed(2) }}</span
          >
        </span>
      </div>
      <div style="margin-top: 5px; margin-bottom: -15px">
        {{ $t('trade.orderDetail.orderID') }}：<span>
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

      isJIA: false,

      orderInfo: {},
    }
  },
  methods: {
    open(orderInfo) {
      this.visible = true
      this.orderInfo = orderInfo
    },
    close(isJIA = false) {
      this.visible = false
      this.isJIA = isJIA
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