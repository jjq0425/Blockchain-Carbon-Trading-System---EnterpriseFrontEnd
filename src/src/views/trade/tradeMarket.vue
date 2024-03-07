<template>
  <page-header-wrapper :content="$t('trade.market.header')">
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
        <a-col :flex="100">
          <div style="margin-left: 50px">
            <a-form-model
              class="ant-advanced-search-form"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              :v-model="searchForm"
            >
              <a-row type="flex">
                <a-col :flex="1">
                  <a-form-model-item :label="$t('trade.market.header.filter.sort.label')" prop="sort">
                    <a-select default-value="random" v-model="searchForm.sort">
                      <a-select-opt-group>
                        <span slot="label"
                          ><a-icon type="retweet" /> {{ $t('trade.market.header.filter.sort.group.default') }}</span
                        >
                        <a-select-option value="random">
                          {{ $t('trade.market.header.filter.sort.random') }}
                        </a-select-option>
                      </a-select-opt-group>
                      <a-select-opt-group>
                        <span slot="label"
                          ><a-icon type="pay-circle" /> {{ $t('trade.market.header.filter.sort.group.Byprice') }}</span
                        >
                        <a-select-option value="HighPriceHighRank">
                          {{ $t('trade.market.header.filter.sort.HighPriceHighRank') }}
                        </a-select-option>
                        <a-select-option value="LowPriceHighRank">
                          {{ $t('trade.market.header.filter.sort.LowPriceHighRank') }}
                        </a-select-option>
                      </a-select-opt-group>
                      <a-select-opt-group>
                        <span slot="label"
                          ><a-icon type="gold" /> {{ $t('trade.market.header.filter.sort.group.Bystock') }}</span
                        >
                        <a-select-option value="HighStockHighRank"
                          >{{ $t('trade.market.header.filter.sort.HighStockHighRank') }}
                        </a-select-option>
                        <a-select-option value="LowStockHighRank">
                          {{ $t('trade.market.header.filter.sort.LowStockHighRank') }}
                        </a-select-option>
                      </a-select-opt-group>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :flex="1" style="margin-left: 30px">
                  <a-form-model-item :label="$t('trade.market.header.filter.tradeType.label')" prop="tradeTypeShow">
                    <a-select default-value="all" v-model="searchForm.tradeTypeShow">
                      <a-select-option value="all">
                        {{ $t('trade.market.header.filter.tradeType.all') }}
                      </a-select-option>
                      <a-select-option value="SOLD">
                        {{ $t('trade.market.header.filter.tradeType.SOLD') }}
                      </a-select-option>
                      <a-select-option value="SALE">
                        {{ $t('trade.market.header.filter.tradeType.SALE') }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :style="{ textAlign: 'right' }">
                  <a-button type="primary" html-type="submit" style="color: white" @click="searchNow">
                    {{ $t('trade.market.header.filter.btn.search') }}
                  </a-button>
                  <a-button :style="{ marginLeft: '8px' }" @click="searchOptionReset">
                    {{ $t('trade.market.header.filter.btn.resetRefresh') }}</a-button
                  >
                </a-col>
              </a-row>
            </a-form-model>
          </div>
        </a-col>
      </a-row>

      <a-divider dashed></a-divider>
      <a-spin :spinning="dataLoading" :delay="100">
        <a-icon slot="indicator" type="loading" style="font-size: 48px" spin />
        <a-list
          rowKey="id"
          :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
          :dataSource="inViewData"
          class="card-list"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <!-- <template v-if="!item || item.id === undefined">
            <a-button class="new-btn" type="dashed">
              <a-icon type="plus" />
              新增产品
            </a-button>
          </template> -->
            <template>
              <a-card
                :hoverable="true"
                style="background-size: 100% 60%; background-repeat: no-repeat"
                @click="MakeTrade(item)"
              >
                <a-card-meta>
                  <div slot="title">
                    <div style="display: flex; justify-content: space-between">
                      <a-tag style="font-weight: bold" :color="item.tradeType == 'SALE' ? '#0ca678' : '#f03e3e'">{{
                        lang.includes('zh') ? tradeTypeClass_CN[item.tradeType] : tradeTypeClass_EN[item.tradeType]
                      }}</a-tag>
                      <div style="font-size: 10px; font-weight: 200; color: grey; word-wrap: break-word">
                        {{ item.publishName }}{{ $t('trade.market.card.publish') }}
                      </div>
                    </div>
                  </div>

                  <!-- <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large" /> -->
                  <div class="meta-content" slot="description" style="min-height: 100px">
                    <img
                      src="@/assets/pages/trade/tradeMarket/SHOUGOU_trade_card_.png"
                      alt=""
                      style="width: 30%; z-index: 0; position: absolute; bottom: -10px"
                      v-if="item.tradeType == 'SALE'"
                    />
                    <img
                      src="@/assets/pages/trade/tradeMarket/CHUSHOU_trade_card_.png"
                      alt=""
                      style="width: 40%; z-index: 0; position: absolute; bottom: -10px"
                      v-else-if="item.tradeType == 'SOLD'"
                    />
                    <template>
                      <div style="display: inline-block; text-align: right; width: 100%">
                        <a-statistic
                          title=""
                          :value="item.perEmission"
                          :precision="2"
                          :valueStyle="{
                            color: `${item.tradeType == 'SALE' ? '#0ca678' : '#f03e3e'}`,
                            fontWeight: '900',
                            fontSize: '36px',
                          }"
                        >
                          <template #suffix>
                            <div style="font-size: 10px; font-weight: 200; color: grey">
                              /{{ $t('trade.market.card.per') }} tCO₂
                            </div>
                          </template>
                        </a-statistic>
                        <div>
                          {{ $t('trade.market.card.perPrice') }}
                          <a-icon type="pay-circle" style="color: grey; margin-left: 0px" />
                        </div>
                      </div>
                    </template>
                  </div>
                </a-card-meta>
                <template class="ant-card-actions" slot="actions" style="z-index: 10">
                  <div>
                    {{ $t('trade.market.card.remain')
                    }}{{ item.tradeType == 'SALE' ? $t('trade.market.card.need') : $t('trade.market.card.stock') }}：{{
                      item.emission.toFixed(2)
                    }}
                    tCO₂
                  </div>
                </template>
              </a-card>
            </template>
          </a-list-item>
        </a-list>
      </a-spin>
      <a-pagination
        show-quick-jumper
        :default-current="1"
        :total="filterDataSource.length"
        :page-size="page.pageSize"
        v-model="page.pageNow"
        @change="pageChange"
        :show-total="
          (total, range) =>
            `${$t('trade.market.footer.record')}${range[0]}-${range[1]}  (${$t('trade.market.footer.sum')}${total} ${$t(
              'trade.market.footer.record'
            )})`
        "
      />
    </a-card>
    <!-- <pdfTest ref="pdfTest"></pdfTest> -->
    <!-- <a-back-top @click="handleAdd">
      <div class="ant-back-top-inner">UP</div>
    </a-back-top> -->
    <div style="position: fixed; right: 50px; bottom: 50px">
      <a-tooltip>
        <template slot="title"> {{ $t('menu.trade.tradePublish') }} </template>
        <a-button
          type="primary"
          :style="{
            marginLeft: '8px',
            borderRadius: '99999px',
            width: '50px',
            height: '50px',
            fontSize: '22px',
            color: 'white',
            background: 'linear-gradient(135deg,#ce9ffc,#7367f0)',
            border: '0px solid white',
          }"
          shape="circle"
          icon="plus"
          @click="handleAdd"
        >
        </a-button>
      </a-tooltip>
    </div>
  </page-header-wrapper>
</template>

<script>
// import pdfTest from '@/components/PDFgenerate/pdfTest'
import changeBgCSS from '@/utils/ChangeBgCSS'
import { TradeList } from '@/api/trade'
import { tradeTypeClass_CN, tradeTypeClass_EN } from '@/config/class/trade/tradeTypeClass'
import store from '@/store'

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
      tabActiveKey: 'tab1',

      // extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
      dataSource: [],
      filterDataSource: [],
      inViewData: [],

      page: {
        pageSize: 9,
        pageNow: 1,
      },

      searchForm: {
        sort: 'random',
        tradeTypeShow: 'all',
      },

      dataLoading: false,

      tradeTypeClass_CN,
      tradeTypeClass_EN,
    }
  },
  mounted() {
    changeBgCSS('TRADE')
    this.fetchData()
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
    async fetchData(needFilter = true) {
      this.dataLoading = true
      await store.dispatch('GetInfo')
      TradeList()
        .then((res) => {
          if (res.success) {
            this.page.pageNow = 1
            this.dataSource = res.data.tradeListEnterprise
            if (needFilter) {
              setTimeout(() => {
                this.filterData()
              }, 200)
            }
          }
        })
        .catch((err) => {
          this.$message.warning(this.$t('result.fail.getError'))
          this.dataLoading = false
        })
    },

    async filterData() {
      // 首先排除掉tradeStatus==YES的数据
      this.filterDataSource = this.dataSource.filter((item) => {
        return item.tradeStatus === 'NO' && item.publishName != this.enterpriseInfo.enterpriseName
      })
      // console.log(this.filterDataSource)

      this.inViewDataCalcu()
    },

    async inViewDataCalcu() {
      this.dataLoading = false
      // 计算当前视窗内的数据
      let start = (this.page.pageNow - 1) * this.page.pageSize
      let end = this.page.pageNow * this.page.pageSize
      if (end > this.filterDataSource.length) {
        end = this.filterDataSource.length
      }
      this.inViewData = this.filterDataSource.slice(start, end)
      this.$forceUpdate()
    },
    pageChange(page, pageSize) {
      this.page.pageNow = page
      this.inViewDataCalcu()
    },

    /**
     * 顶部搜索
     */
    searchOptionReset() {
      this.searchForm = {
        sort: 'random',
        tradeTypeShow: 'all',
      }

      this.searchNow()
    },
    async searchNow() {
      this.dataLoading = true
      await this.fetchData(false)
      this.dataLoading = true
      if (this.searchForm.tradeTypeShow == 'SOLD') {
        this.filterDataSource = this.dataSource.filter((item) => {
          return (
            item.tradeType == 'SOLD' &&
            item.tradeStatus == 'NO' &&
            item.publishName != this.enterpriseInfo.enterpriseName
          )
        })
      } else if (this.searchForm.tradeTypeShow == 'SALE') {
        this.filterDataSource = this.dataSource.filter((item) => {
          return (
            item.tradeType == 'SALE' &&
            item.tradeStatus == 'NO' &&
            item.publishName != this.enterpriseInfo.enterpriseName
          )
        })
      } else {
        this.filterDataSource = this.dataSource.filter((item) => {
          return item.tradeStatus === 'NO' && item.publishName != this.enterpriseInfo.enterpriseName
        })
      }

      // console.log('form', this.searchForm)
      if (this.searchForm.sort == 'HighPriceHighRank') {
        this.filterDataSource.sort((a, b) => {
          return b.perEmission - a.perEmission
        })
      } else if (this.searchForm.sort == 'LowPriceHighRank') {
        this.filterDataSource.sort((a, b) => {
          return a.perEmission - b.perEmission
        })
      } else if (this.searchForm.sort == 'HighStockHighRank') {
        this.filterDataSource.sort((a, b) => {
          return b.emission - a.emission
        })
      } else if (this.searchForm.sort == 'LowStockHighRank') {
        this.filterDataSource.sort((a, b) => {
          return a.emission - b.emission
        })
      } else {
        this.filterDataSource.sort((a, b) => {
          return Math.random() - 0.5
        })
      }

      this.page.pageNow = 1
      setTimeout(() => {
        this.inViewDataCalcu()
      }, 500)
    },

    handleAdd() {
      this.$router.push({ name: 'tradePublish' })
    },

    MakeTrade(tradeInfo) {
      this.$router.push({ name: 'makeTrade', params: { tradeInfo: tradeInfo } })
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
