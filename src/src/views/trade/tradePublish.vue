<template>
  <page-header-wrapper
    content="欢迎来到“交易发布”页面，我们专注于提供碳排放量交易服务。请根据表单信息完成填报。在这里，您可以放心地将交易信息上链至区块链，确保账单安全无忧。"
  >
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
                title="您当前剩余碳排量"
                :value="enterpriseInfo.remainEmission.toFixed(4)"
                style="margin-right: 50px"
              >
                <!-- <template #suffix>
                  <a-icon type="like" />
                </template> -->
              </a-statistic>
            </a-col>
            <a-col :flex="1">
              <a-statistic title="您当前剩余碳币" :value="enterpriseInfo.coCoin.toFixed(2)" style="margin-right: 50px">
                <!-- <template #suffix>
                  <a-icon type="like" />
                </template> -->
              </a-statistic>
            </a-col>
          </a-row>
        </a-col>
        <a-col :flex="10">
          <div style="margin-left: 50px; width: 600px">
            <div style="font-size: 20px">交易提示</div>
            <div>1. 为确保交易安全，请仔细核对您的交易信息。因误填造成的损失由您自行承担。</div>
            <div>
              2. 请您在发布交易时，详细描述交易内容，包括碳排放量、交易金额等信息，以便其他用户快速了解并参与交易。
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
        <a-form-model-item label="交易类型" prop="tradeType">
          <a-radio-group v-model="tradePublishForm.tradeType">
            <a-radio value="SOLD"> 出售碳排量 </a-radio>
            <a-radio value="SALE"> 收购碳排量 </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item label="交易(出售/收购)量" prop="emission">
          <a-input-number
            v-model="tradePublishForm.emission"
            :min="0.0001"
            :precision="4"
            :step="0.0001"
            style="width: 300px"
          />
          <span style="margin-left: 10px; font-size: 10px; color: grey">tCO₂</span>
        </a-form-model-item>

        <a-form-model-item label="交易(出售/收购)单价" prop="perEmission">
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
          label="所需碳币"
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
            交易(收购)总价不能大于您当前剩余碳币量: {{ enterpriseInfo.coCoin }}，请调整交易量或单价
          </div>
        </a-form-model-item>

        <a-form-model-item label="交易发布者(甲方)">
          {{ enterpriseInfo.enterpriseName }} ({{ enterpriseInfo.enterpriseID }})
        </a-form-model-item>

        <div style="width: 100%; text-align: center">
          <a-button type="danger" style="color: white" @click="() => this.$router.go(-1)" :loading="dataLoading"
            >返回</a-button
          >
          <a-button type="primary" style="color: white; margin-left: 10px" @click="handleSubmit" :loading="dataLoading"
            >提交</a-button
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
        <div style="font-weight: 900; font-size: 30px; color: #438bfd">碳贸区块链正在守卫您的交易安全</div>
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
  </page-header-wrapper>
</template>

<script>
// import pdfTest from '@/components/PDFgenerate/pdfTest'
import changeBgCSS from '@/utils/ChangeBgCSS'
import { TradePublish } from '@/api/trade'
import { tradeTypeClass_CN, tradeTypeClass_EN } from '@/config/class/trade/tradeTypeClass'
import store from '@/store'
import { enterpriseClassName_CN, enterpriseClassName_EN } from '@/config/class/enterpriseClass'

export default {
  name: 'CardList',
  components: {
    // pdfTest,
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
        tradeType: [{ required: true, message: '请选择交易类型', trigger: 'change' }],
        emission: [
          { required: true, message: '请输入交易(出售/收购)量', trigger: 'blur' },
          { validator: this.validateEmission, trigger: 'change' },
        ],
        perEmission: [
          { required: true, message: '请输入交易(出售/收购)单价', trigger: 'blur' },
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
          callback(new Error('交易(出售/收购)碳排量必须大于0'))
        } else if (val > this.enterpriseInfo.remainEmission) {
          callback(new Error(`交易(出售)碳排量不能大于您当前剩余碳排放量: ${this.enterpriseInfo.remainEmission}`))
        } else {
          callback()
        }
      } else {
        if (val <= 0) {
          callback(new Error('交易(出售/收购)量必须大于0'))
        } else if (val * this.tradePublishForm.perEmission > this.enterpriseInfo.coCoin) {
          callback(
            new Error(`交易(收购)总价不能大于您当前剩余碳币量: ${this.enterpriseInfo.coCoin}，请调整交易量或单价`)
          )
        } else {
          callback()
        }
      }
    },
    validatePerEmission(rule, val, callback) {
      if (this.tradePublishForm.tradeType === 'SALE') {
        if (val <= 0) {
          callback(new Error('交易(出售/收购)单价必须大于0'))
        } else if (val * this.tradePublishForm.emission > this.enterpriseInfo.coCoin) {
          callback(
            new Error(`交易(收购)总价不能大于您当前剩余碳币量: ${this.enterpriseInfo.coCoin}，请调整交易量或单价`)
          )
        } else {
          callback()
        }
      } else {
        if (val <= 0) {
          callback(new Error('交易(出售/收购)单价必须大于0'))
        } else {
          callback()
        }
      }
    },

    handleSubmit() {
      this.$refs.tradePublishForm.validate((valid) => {
        if (valid) {
          this.dataLoading = true
          TradePublish(this.tradePublishForm)
            .then((res) => {
              if (res.success) {
                this.$message.success('发布成功')
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
              this.$message.error('发布失败')
              this.dataLoading = false
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
