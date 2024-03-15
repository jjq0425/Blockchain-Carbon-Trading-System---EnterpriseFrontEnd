<template>
  <page-header-wrapper :content="$t('trade.publish.header.title')">
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
                :value="enterpriseInfo.remainEmission.toFixed(2)"
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
            <div>{{ $t('trade.publish.header.notice.N1') }}</div>
            <div>
              {{ $t('trade.publish.header.notice.N2') }}
            </div>
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
        <a-form-model-item :label="$t('trade.market.header.filter.tradeType.label')" prop="tradeType">
          <a-radio-group v-model="tradePublishForm.tradeType">
            <a-radio value="SOLD"> {{ $t('trade.publish.content.tradeType.sold') }} </a-radio>
            <a-radio value="SALE"> {{ $t('trade.publish.content.tradeType.sale') }} </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item :label="$t('trade.publish.content.dealEmissionNum')" prop="emission">
          <a-input-number
            v-model="tradePublishForm.emission"
            :min="0.0001"
            :precision="2"
            :step="0.0001"
            style="width: 300px"
          />
          <span style="margin-left: 10px; font-size: 10px; color: grey">tCO₂</span>
        </a-form-model-item>

        <a-form-model-item :label="$t('trade.publish.content.perEmission')" prop="perEmission">
          <a-input-number
            v-model="tradePublishForm.perEmission"
            :min="0.0001"
            :precision="2"
            :step="0.01"
            style="width: 300px"
          />
          <span style="margin-left: 10px; font-size: 10px; color: grey">碳币/tCO₂</span>
        </a-form-model-item>

        <a-form-model-item
          :label="$t('trade.publish.content.coCoinNeed')"
          v-show="tradePublishForm.tradeType == 'SALE'"
          :style="{
            color:
              (tradePublishForm.perEmission * tradePublishForm.emission).toFixed(2) > enterpriseInfo.coCoin
                ? 'red'
                : '',
          }"
        >
          {{ (tradePublishForm.perEmission * tradePublishForm.emission).toFixed(2) }}
          <div
            style="color: red; font-weight: bold"
            v-if="(tradePublishForm.perEmission * tradePublishForm.emission).toFixed(2) > enterpriseInfo.coCoin"
          >
            {{ $t('trade.publish.content.rule.saleNumNotBigRemainCoin') }}: {{ enterpriseInfo.coCoin }}，{{
              $t('trade.publish.content.rule.pleaseChangeNumOrPrice')
            }}
          </div>
        </a-form-model-item>

        <a-form-model-item :label="$t('trade.publish.content.JIA')">
          {{ enterpriseInfo.enterpriseName }} ({{ enterpriseInfo.enterpriseID }})
        </a-form-model-item>

        <div style="width: 100%; text-align: center">
          <a-button type="danger" style="color: white" @click="() => this.$router.go(-1)" :loading="dataLoading">{{
            $t('modal.btn.back')
          }}</a-button>
          <a-button
            type="primary"
            style="color: white; margin-left: 10px"
            @click="handleSubmit"
            :loading="dataLoading"
            >{{ $t('form.basic-form.form.submit') }}</a-button
          >
        </div>
      </a-form-model>

      <!-- 交易发布表单 -->
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
    </a-card>

    <div style="position: fixed; right: 50px; bottom: 50px">
      <a-tooltip>
        <template slot="title"> 退出 </template>
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
    <OneTimePwdAuth ref="OneTimePwdAuth" @success="submitLast"></OneTimePwdAuth>
  </page-header-wrapper>
</template>

<script>
// import pdfTest from '@/components/PDFgenerate/pdfTest'
import changeBgCSS from '@/utils/ChangeBgCSS'
import { TradePublish } from '@/api/trade'
import { tradeTypeClass_CN, tradeTypeClass_EN } from '@/config/class/trade/tradeTypeClass'
import store from '@/store'
import { enterpriseClassName_CN, enterpriseClassName_EN } from '@/config/class/enterpriseClass'
import OneTimePwdAuth from '../account/settings/OneTimePwd/OneTimePwdAuth.vue'

export default {
  name: 'CardList',
  components: {
    // pdfTest,
    OneTimePwdAuth,
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
        tradeType: '',
        emission: null,
        perEmission: null,
      },
      tradePublishRules: {
        tradeType: [
          { required: true, message: this.$t('trade.publish.content.rule.chooseTradeType'), trigger: 'change' },
        ],
        emission: [
          { required: true, message: this.$t('trade.publish.content.rule.dealNumNeed'), trigger: 'blur' },
          { validator: this.validateEmission, trigger: 'change' },
        ],
        perEmission: [
          { required: true, message: this.$t('trade.publish.content.rule.perEmissionNeed'), trigger: 'blur' },
          { validator: this.validatePerEmission, trigger: 'change' },
        ],
      },

      dataLoading: false,

      labelCol: { span: 9 },
      wrapperCol: { span: 14 },

      tradeTypeClass_CN,
      tradeTypeClass_EN,
    }
  },
  mounted() {
    changeBgCSS('TRADE')
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
      await store.dispatch('GetInfo')
    },
    validateEmission(rule, val, callback) {
      if (this.tradePublishForm.tradeType === 'SOLD') {
        if (val <= 0) {
          callback(new Error(this.$t('trade.publish.content.rule.dealNumLarge0')))
        } else if (val > this.enterpriseInfo.remainEmission) {
          callback(
            new Error(
              `${this.$t('trade.publish.content.rule.dealNumNoBigRemainEmission')}: ${
                this.enterpriseInfo.remainEmission
              }`
            )
          )
        } else {
          callback()
        }
      } else {
        if (val <= 0) {
          callback(new Error(this.$t('trade.publish.content.rule.dealNumLarge0_2')))
        } else if (val * this.tradePublishForm.perEmission > this.enterpriseInfo.coCoin) {
          callback(
            new Error(
              `${this.$t('trade.publish.content.rule.saleNumNotBigRemainCoin')}: ${
                this.enterpriseInfo.coCoin
              }，${this.$t('trade.publish.content.rule.pleaseChangeNumOrPrice')}`
            )
          )
        } else {
          callback()
        }
      }
    },
    validatePerEmission(rule, val, callback) {
      if (this.tradePublishForm.tradeType === 'SALE') {
        if (val <= 0) {
          callback(new Error(this.$t('trade.publish.content.rule.perEmissionLarge0')))
        } else if (val * this.tradePublishForm.emission > this.enterpriseInfo.coCoin) {
          callback(
            new Error(
              `${this.$t('trade.publish.content.rule.saleNumNotBigRemainCoin')}: ${
                this.enterpriseInfo.coCoin
              }，${this.$t('trade.publish.content.rule.pleaseChangeNumOrPrice')}`
            )
          )
        } else {
          callback()
        }
      } else {
        if (val <= 0) {
          callback(new Error(this.$t('trade.publish.content.rule.perEmissionLarge0')))
        } else {
          callback()
        }
      }
    },

    handleSubmit() {
      this.$refs.tradePublishForm.validate((valid) => {
        if (valid) {
          this.$refs.OneTimePwdAuth.open()
        }
      })
    },
    submitLast() {
      this.$message.loading({ content: this.$t('modal.loading.tradePublishLoading') + '...', key: 'tradePublish' })
      this.dataLoading = true

      TradePublish(this.tradePublishForm)
        .then((res) => {
          if (res.success) {
            this.$message.success({ content: this.$t('result.success.publishSuccess'), key: 'tradePublish' })
            setTimeout(() => {
              this.$router.go(-1)
              this.dataLoading = false
            }, 300)
          } else {
            this.$message.error(res.message)
            this.dataLoading = false
          }
        })
        .catch((err) => {
          this.$message.error(this.$t('result.fail.publishError'))
          this.dataLoading = false
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
