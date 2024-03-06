<template>
  <page-header-wrapper :content="$t('trade.makeTrade.header')">
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
        <a-col :flex="1">
          <a-row
            type="flex"
            style="
              box-shadow: 0 5px 15px 0 rgba(176, 191, 231, 0.25);
              border-radius: 10px;
              padding: 10px 20px;
              background-color: rgba(255, 255, 255, 0.9);
            "
          >
            <a-col :flex="1">
              <a-statistic
                :title="$t('trade.market.header.infoCard.remainEmission')"
                :value="enterpriseInfo.remainEmission.toFixed(4)"
                style="margin-right: 50px"
              >
                <!-- <template #suffix>
                  <a-icon type="like" />
                </template> -->
              </a-statistic>
            </a-col>
            <a-col :flex="1">
              <a-statistic
                :title="$t('trade.market.header.infoCard.remainCoCoin')"
                :value="enterpriseInfo.coCoin.toFixed(2)"
                style="margin-right: 50px"
              >
                <!-- <template #suffix>
                  <a-icon type="like" />
                </template> -->
              </a-statistic>
            </a-col>
          </a-row>
        </a-col>
        <a-col :flex="10">
          <div style="margin-left: 50px; width: 600px">
            <div style="font-size: 20px">{{ $t('trade.makeTrade.header.tips.title') }}</div>
            <div>{{ $t('trade.makeTrade.header.tips.tip1') }}</div>
            <div>{{ $t('trade.makeTrade.header.tips.tip2') }}</div>
          </div>
        </a-col>
      </a-row>

      <a-divider dashed></a-divider>

      <a-form-model
        ref="tradePublishForm"
        :model="tradePublishForm"
        :rules="tradePublishRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        style="margin-top: 40px"
      >
        <a-form-model-item :label="$t('trade.makeTrade.info.JIA')">
          {{ tradeInfo.publishName }}
        </a-form-model-item>

        <a-form-model-item :label="$t('trade.makeTrade.info.YI')">
          {{ enterpriseInfo.enterpriseName }} ({{ enterpriseInfo.enterpriseID }})
          <a-tag color="cyan"> {{ $t('user.YOU') }} </a-tag>
        </a-form-model-item>
        <a-form-model-item :label="$t('trade.market.header.filter.tradeType.label')" prop="tradeType">
          <a-radio-group v-model="tradeInfo.tradeType" disabled>
            <a-radio value="SOLD"> {{ $t('trade.makeTrade.info.tradeType.JIAsoldToYI') }} </a-radio>
            <a-radio value="SALE"> {{ $t('trade.makeTrade.info.tradeType.JIArequireFromYI') }} </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item :label="$t('trade.makeTrade.info.perPrice')">
          {{ tradeInfo.perEmission.toFixed(2) }} {{ $t('trade.makeTrade.info.coCoin') }}/tCO₂
        </a-form-model-item>

        <a-form-model-item
          :label="`${$t('trade.makeTrade.info.JIARremain')}${
            tradeInfo.tradeType == 'SOLD' ? $t('trade.market.card.stock') : $t('trade.market.card.need')
          }`"
        >
          {{ tradeInfo.emission.toFixed(4) }} tCO₂
        </a-form-model-item>

        <a-form-model-item
          :label="`${$t('trade.makeTrade.info.deal')} (${
            tradeInfo.tradeType == 'SOLD' ? $t('trade.makeTrade.info.buy') : $t('trade.makeTrade.info.sold')
          }) ${$t('trade.makeTrade.info.COemission')}`"
          prop="dealNum"
        >
          <a-input-number
            v-model="tradePublishForm.dealNum"
            :min="0.0001"
            :precision="4"
            :step="0.0001"
            style="width: 300px"
          />
          <span style="margin-left: 10px; font-size: 10px; color: grey">tCO₂</span>
        </a-form-model-item>
      </a-form-model>

      <div style="width: 50%; margin: 10px auto">
        <a-divider orientation="left" style="width: 50px; color: #228be6">{{
          $t('trade.makeTrade.info.inTotal')
        }}</a-divider>
      </div>
      <div style="width: 50%; margin: 10px auto; text-align: right">
        <div>
          {{ $t('trade.makeTrade.info.coCoinChange') }}：
          <span :style="{ color: tradeInfo.tradeType == 'SALE' ? 'green' : 'red' }">
            <span>{{ tradeInfo.tradeType == 'SALE' ? '+' : '-' }}</span>
            {{ (tradeInfo.perEmission * tradePublishForm.dealNum).toFixed(2) }}</span
          >
        </div>
        <div style="margin-top: 5px; margin-bottom: 25px">
          {{ $t('trade.makeTrade.info.emissionChange') }}：<span>
            <span :style="{ color: tradeInfo.tradeType == 'SALE' ? 'red' : 'green' }">
              <span>{{ tradeInfo.tradeType == 'SALE' ? '-' : '+' }}</span>
              {{ tradePublishForm.dealNum == null ? '0.0000' : tradePublishForm.dealNum.toFixed(4) }}</span
            >
          </span>
        </div>
      </div>

      <div style="width: 100%; text-align: center">
        <a-button type="danger" style="color: white" @click="() => this.$router.go(-1)" :loading="dataLoading">{{
          $t('modal.btn.back')
        }}</a-button>
        <a-button type="primary" style="color: white; margin-left: 10px" @click="handleSubmit" :loading="dataLoading">{{
          $t('form.basic-form.form.submit')
        }}</a-button>
      </div>

      <div
        style="
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          margin-top: 50px;
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
      <!-- 交易发布表单 -->
    </a-card>

    <div style="position: fixed; right: 50px; bottom: 50px">
      <a-tooltip>
        <template slot="title"> {{ $t('modal.btn.return') }} </template>
        <a-button
          type="primary"
          :style="{
            marginLeft: '8px',
            borderRadius: '99999px',
            width: '50px',
            height: '50px',
            fontSize: '22px',
            color: 'white',
            background: 'linear-gradient(135deg,#ff512f,#dd2476)',
            border: '0px solid white',
          }"
          shape="circle"
          icon="close"
          @click="() => this.$router.go(-1)"
          :loading="dataLoading"
        >
        </a-button>
      </a-tooltip>
    </div>
    <div>
      <!-- <video src="@/assets/pages/trade/tradeElse/tradeInBlockChain.mp4" loop autoplay style="width: 100%"></video> -->
    </div>
    <trading ref="trading"></trading>
  </page-header-wrapper>
</template>

<script>
// import pdfTest from '@/components/PDFgenerate/pdfTest'
import changeBgCSS from '@/utils/ChangeBgCSS'
import { MakeTrade } from '@/api/trade'
import { tradeTypeClass_CN, tradeTypeClass_EN } from '@/config/class/trade/tradeTypeClass'
import store from '@/store'
import { enterpriseClassName_CN, enterpriseClassName_EN } from '@/config/class/enterpriseClass'
import trading from '@/views/trade/myTrade/trading'

export default {
  name: 'CardList',
  components: {
    // pdfTest,
    trading,
  },
  data() {
    // this.tabList = [
    //   { key: 'tab1', tab: '快速开始' },
    //   { key: 'tab2', tab: '产品简介' },
    //   { key: 'tab3', tab: '产品文档' },
    // ]
    return {
      // extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',

      tradePublishForm: {
        dealNum: null,
      },
      tradePublishRules: {
        dealNum: [
          { required: true, message: this.$t('trade.makeTrade.RequireDealNum'), trigger: 'blur' },
          { validator: this.validateDealNum, trigger: 'change' },
        ],
      },

      tradeInfo: {},

      dataLoading: false,

      labelCol: { span: 9 },
      wrapperCol: { span: 14 },

      tradeTypeClass_CN,
      tradeTypeClass_EN,
    }
  },
  mounted() {
    changeBgCSS('TRADE')
    this.$message.info(this.$t('trade.makeTrade.SecurityTips'))
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
    },

    validateDealNum(rule, val, callback) {
      // SALE标识甲方买入乙方的碳排量，保证乙方足够碳排量
      if (this.tradeInfo.tradeType === 'SALE') {
        if (val <= 0) {
          callback(new Error(this.$t('trade.makeTrade.validate.dealNumBIG0')))
        } else if (val > this.enterpriseInfo.remainEmission) {
          callback(
            new Error(
              this.$t('trade.market.header.infoCard.remainEmission') +
                `: ${this.enterpriseInfo.remainEmission}，` +
                this.$t('trade.makeTrade.validate.SOLDnumNOTbigTHANremain')
            )
          )
        } else if (val > this.tradeInfo.emission) {
          callback(new Error(this.$t('trade.makeTrade.validate.saleNumNoBigJIArequire')))
        } else {
          callback()
        }
      }
      // SOLD标识乙方买入甲方的碳排量，保证乙方足够碳币
      else {
        if (val <= 0) {
          callback(new Error(this.$t('trade.makeTrade.validate.buyNumBIG0')))
        } else if (val * this.tradeInfo.perEmission > this.enterpriseInfo.coCoin) {
          callback(
            new Error(
              `${this.$t('trade.market.header.infoCard.remainCoCoin')}: ${this.enterpriseInfo.coCoin}，${this.$t(
                'trade.makeTrade.validate.SumCoinNoMoreThanRemainCoCoin'
              )}`
            )
          )
        } else if (val > this.tradeInfo.emission) {
          callback(new Error(this.$t('trade.makeTrade.validate.buyNumNoMoreThanJIAStock')))
        } else {
          callback()
        }
      }
    },

    handleSubmit() {
      this.$refs.tradePublishForm.validate((valid) => {
        if (valid) {
          this.dataLoading = true
          let submitForm = JSON.parse(JSON.stringify(this.tradePublishForm))
          submitForm.tradeID = this.tradeInfo.tradeID
          this.$refs.trading.open()
          MakeTrade(submitForm)
            .then((res) => {
              if (res.success) {
                this.$message.success(this.$t('trade.makeTrade.info.successDeal'))
                this.$refs.trading.close(true)
                setTimeout(() => {
                  this.dataLoading = false
                  this.$router.go(-1)
                }, 300)
              } else {
                this.$message.error(res.message)
                this.dataLoading = false
                this.$refs.trading.close(true)
              }
            })
            .catch((err) => {
              this.$message.error(this.$t('trade.makeTrade.info.failDeal'), err.response.data.message)
              this.dataLoading = false
              this.$refs.trading.close(true)
            })
        }
      })
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
