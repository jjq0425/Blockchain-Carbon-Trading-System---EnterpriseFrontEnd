<template>
  <page-header-wrapper>
    <template v-slot:content>
      <div class="page-header-content">
        <div class="avatar">
          <a-avatar size="large" :src="currentUser.avatar" />
        </div>
        <div class="content">
          <div class="content-title animate__animated animate__fadeInUp" style="color: white">
            {{ timeFix }}，{{ user.name }}<span class="welcome-text" style="color: white"></span>
          </div>
          <div style="color: white" class="animate__animated animate__fadeInUp animate__delay-1s">{{ welcome }}</div>
        </div>
      </div>
    </template>
    <template v-slot:extraContent>
      <div class="extra-content">
        <div class="stat-item">
          <!-- <a-statistic title="项目数" :value="56" /> -->
          <div style="font-size: 14px">{{ $t('dashboard.header.info.EnterpriseClass') }}</div>
          <div style="font-size: 18px; margin-top: 10px; font-weight: bold" v-if="lang.includes('CN')">
            {{ user.enterpriseClassName_CN }}
          </div>
          <div style="font-size: 18px; margin-top: 10px; font-weight: bold" v-else>
            {{ user.enterpriseClassName_EN }}
          </div>
        </div>
        <div class="stat-item">
          <!-- <a-statistic title="团队内排名" :value="8" suffix="/ 24" /> -->
          <div style="font-size: 14px">{{ $t('dashboard.header.info.remainEmission') }}</div>
          <div style="font-size: 18px; margin-top: 10px; font-weight: bold">{{ user.remainEmission }}</div>
        </div>
        <div class="stat-item">
          <!-- <a-statistic title="项目访问" :value="2223" /> -->
          <div style="font-size: 14px">{{ $t('dashboard.header.info.remainCoCoin') }}</div>
          <div style="font-size: 18px; margin-top: 10px; font-weight: bold">{{ user.coCoin }}</div>
        </div>
      </div>
    </template>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <!-- <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px"
            :bordered="false"
            title="进行中的项目"
            :body-style="{ padding: 0 }"
          >
            <a slot="extra">全部项目</a>
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar size="small" :src="item.cover" />
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.description }}
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <a href="/#/">科学搬砖组</a>
                    <span class="datetime">9小时前</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card> -->

          <a-carousel
            autoplay
            style="margin-bottom: 24px; box-shadow: 5px 5px 15px 0 rgba(176, 191, 231, 0.85); background-color: white"
            effect="fade"
          >
            <div style="margin: 0 auto; background-color: transparent">
              <img
                src="@/assets/pages/dashboard/news/news1.png"
                alt=""
                style="height: 250px; box-shadow: 5px 5px 15px 0 rgba(176, 191, 231, 0.85)"
              />
            </div>
            <div style="margin: 0 auto">
              <img
                src="@/assets/pages/dashboard/news/news2.png"
                alt=""
                style="height: 250px; box-shadow: 5px 5px 15px 0 rgba(176, 191, 231, 0.85)"
              />
            </div>
            <div style="margin: 0 auto">
              <img
                src="@/assets/pages/dashboard/news/news3.png"
                alt=""
                style="height: 250px; box-shadow: 5px 5px 15px 0 rgba(176, 191, 231, 0.85)"
              />
            </div>
            <div style="margin: 0 auto">
              <img
                src="@/assets/pages/dashboard/news/news4.png"
                alt=""
                style="height: 250px; box-shadow: 5px 5px 15px 0 rgba(176, 191, 231, 0.85)"
              />
            </div>
            <div style="margin: 0 auto">
              <img
                src="@/assets/pages/dashboard/news/news5.png"
                alt=""
                style="height: 250px; box-shadow: 5px 5px 15px 0 rgba(176, 191, 231, 0.85)"
              />
            </div>
            <div style="margin: 0 auto">
              <img
                src="@/assets/pages/dashboard/news/news6.png"
                alt=""
                style="height: 250px; box-shadow: 5px 5px 15px 0 rgba(176, 191, 231, 0.85)"
              />
            </div>
          </a-carousel>

          <a-card :body-style="{ padding: '24px 32px' }" :bordered="false" style="margin-top: 24px">
            <div style="margin-bottom: 20px">
              <div
                style="
                  display: inline-block;
                  font-size: 24px;
                  font-weight: bold;
                  background: linear-gradient(135deg, #abdcff, #0396ff);
                  border-radius: 999px;
                  color: white;
                  width: 10px;
                  height: 30px;
                  transform: translateY(5px);
                "
              ></div>
              <div style="display: inline-block; font-size: 24px; font-weight: bold; padding: 10px">
                {{ $t('dashboard.data_analysis.tong-ye-dui-biao') }}
              </div>
              <div style="display: inline-block; font-size: 12px; padding: 10px">
                {{ $t('dashboard.data_analysis.describe.tong-ye-dui-biao') }}
              </div>
            </div>

            <!-- 页面 -->
            <div id="horizontal" style="width: 100%; height: 300px"></div>

            <!-- 对比2 -->
            <div style="margin-bottom: 20px">
              <div
                style="
                  display: inline-block;
                  font-size: 24px;
                  font-weight: bold;
                  background: linear-gradient(135deg, #fccf31, #f55555);
                  border-radius: 999px;
                  color: white;
                  width: 10px;
                  height: 30px;
                  transform: translateY(5px);
                "
              ></div>
              <div style="display: inline-block; font-size: 24px; font-weight: bold; padding: 10px">
                {{ $t('dashboard.data_analysis.wang-ji-dong-xi') }}
              </div>
              <div style="display: inline-block; font-size: 12px; padding: 10px">
                {{ $t('dashboard.data_analysis.describe.wang-ji-dong-xi') }}
              </div>
            </div>

            <!-- 页面 -->
            <div id="vertical" style="width: 100%; height: 300px" v-show="hasMy"></div>
            <a-result
              :title="$t('dashboard.data_analysis.NoSubmit.title')"
              :sub-title="$t('dashboard.data_analysis.NoSubmit.subTitle')"
              v-show="!hasMy"
            >
              <template #icon><img style="height: 200px" src="@/assets/default/EmptyInfo.png" /> </template
            ></a-result>
          </a-card>

          <!-- 交易 -->
          <a-card :body-style="{ padding: '24px 32px' }" :bordered="false" style="margin-top: 24px">
            <div style="margin-bottom: 20px">
              <div
                style="
                  display: inline-block;
                  font-size: 24px;
                  font-weight: bold;
                  background: linear-gradient(135deg, #f54ea2, #ff7676);
                  border-radius: 999px;
                  color: white;
                  width: 10px;
                  height: 30px;
                  transform: translateY(5px);
                "
              ></div>
              <div style="display: inline-block; font-size: 24px; font-weight: bold; padding: 10px">
                {{ $t('dashboard.data_analysis.jiao-yi-dong-tai') }}
              </div>
              <div style="display: inline-block; font-size: 12px; padding: 10px">
                {{ $t('dashboard.data_analysis.describe.jiao-yi-dong-tai') }}
              </div>
            </div>

            <!-- 页面 -->
            <a-result
              :title="$t('dashboard.data_analysis.NoSubmit.title_trade')"
              :sub-title="$t('dashboard.data_analysis.NoSubmit.subTitle_trade')"
              v-if="!hasMyOrderAndTrade"
            >
              <template #icon><img style="height: 150px" src="@/assets/default/EmptyInfo.png" /> </template
            ></a-result>
            <div style="display: flex; justify-content: center">
              <div style="height: 250px" v-show="hasMyOrderAndTrade">
                <div style="font-weight: 900; font-size: 20px">
                  {{ $t('dashboard.data_analysis.content.jiaoyi.youAretypecal') }}&nbsp;<span
                    style="font-size: 28px"
                    :style="{ color: tradeStatistic.color }"
                    >{{ tradeStatistic.type }}&nbsp;</span
                  >{{ $t('dashboard.data_analysis.content.jiaoyi.enterprise') }}
                </div>
                <div style="margin-top: 10px">
                  <a-tag style="font-weight: bold" :color="'SALE' == 'SALE' ? '#0ca678' : '#f03e3e'">{{
                    lang.includes('zh') ? tradeTypeClass_CN['SALE'] : tradeTypeClass_EN['SALE']
                  }}</a-tag>
                  <div>
                    {{ $t('dashboard.data_analysis.content.jiaoyi.Publish.N1') }}&nbsp;<span
                      style="font-weight: bold; color: #3eb370; font-size: 16px"
                    >
                      {{ tradeStatistic.shougouNum_publish }} </span
                    >&nbsp;{{ $t('dashboard.data_analysis.content.jiaoyi.Publish.N2') }}&nbsp;<span
                      style="font-weight: bold; color: #3eb370; font-size: 16px"
                    >
                      {{ tradeStatistic.shougouNum_Order }} </span
                    >&nbsp;{{ $t('dashboard.data_analysis.content.jiaoyi.Publish.N3') }}
                  </div>
                </div>
                <div style="margin-top: 10px">
                  <a-tag style="font-weight: bold" :color="'SOLD' == 'SALE' ? '#0ca678' : '#f03e3e'">{{
                    lang.includes('zh') ? tradeTypeClass_CN['SOLD'] : tradeTypeClass_EN['SOLD']
                  }}</a-tag>
                  <div>
                    {{ $t('dashboard.data_analysis.content.jiaoyi.Publish.N1') }}&nbsp;<span
                      style="font-weight: bold; color: #e83929; font-size: 16px"
                    >
                      {{ tradeStatistic.shoumaiNum_publish }} </span
                    >&nbsp;{{ $t('dashboard.data_analysis.content.jiaoyi.Sale.N2')
                    }}<span style="font-weight: bold; color: #e83929; font-size: 16px">
                      {{ tradeStatistic.shoumaiNum_Order }} </span
                    >&nbsp;{{ $t('dashboard.data_analysis.content.jiaoyi.Sale.N3') }}
                  </div>
                </div>
              </div>
              <div id="trade" style="width: 400px; align-self: top" v-show="hasMyOrderAndTrade"></div>
            </div>
          </a-card>
        </a-col>
        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <!-- <a-card
            title="快速开始 / 便捷导航"
            style="margin-bottom: 24px"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div class="item-group">
              <a>操作一</a>
              <a>操作二</a>
              <a>操作三</a>
              <a>操作四</a>
              <a>操作五</a>
              <a>操作六</a>
              <a-button size="small" type="primary" ghost icon="plus">添加</a-button>
            </div>
          </a-card> -->
          <!-- AI -->
          <div
            style="
              padding: 0px 10px;
              padding-right: 40px;
              margin-bottom: 24px;
              background: linear-gradient(90deg, #f3f4fd 0, #fcf2fc 100%);
              border-radius: 10px;
              min-height: 80px;

              font-size: 50px;
              font-weight: 900;
              display: flex;
              justify-content: space-around;
              align-items: center;
              box-shadow: 0 5px 15px 0 rgba(176, 191, 231, 0.45);
              cursor: pointer;
            "
            @click="() => this.$refs.aiModalRef.open()"
            class="aiCard"
          >
            <div id="lottie_ai" style="width: 40%; transform: translateX(10px) translateY(10px)"></div>
            <aiLottie></aiLottie>
            <div style="">
              <div style="font-size: 30px; color: black">{{ $t('dashboard.data_analysis.ai.title') }} AI</div>
              <div
                style="
                  font-size: 40px;
                  background: linear-gradient(90deg, #4752e6, #de81de);
                  background-clip: text;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                "
              >
                {{ $t('dashboard.data_analysis.ai.subTitle') }}
              </div>
            </div>
          </div>
          <aiModal ref="aiModalRef"></aiModal>
          <!--  -->

          <a-card :bordered="false" style="margin-bottom: 24px">
            <div
              style="
                display: inline-block;
                font-size: 24px;
                font-weight: bold;
                background: linear-gradient(135deg, #42e695, #3bb2b8);
                border-radius: 999px;
                color: white;
                width: 10px;
                height: 30px;
                transform: translateY(5px);
              "
            ></div>
            <div style="display: inline-block; font-size: 24px; font-weight: bold; padding: 10px">
              {{ $t('dashboard.data_analysis.pie.title') }}
            </div>
            <div style="display: inline-block; font-size: 12px; padding: 10px">
              {{ $t('dashboard.data_analysis.pie.subTitle') }}
            </div>
            <!-- 图 -->
            <div id="pie" style="width: 100%; height: 300px"></div>
          </a-card>

          <a-card :bordered="false" class="aiDescription" :body-style="{ padding: '24px 32px', background: 'white' }">
            <div style="margin-bottom: 20px">
              <div
                style="
                  display: inline-block;
                  font-size: 24px;
                  font-weight: bold;
                  background: linear-gradient(135deg, #ee9ae5, #5961f9);
                  border-radius: 999px;
                  color: white;
                  width: 10px;
                  height: 30px;
                  transform: translateY(5px);
                "
              ></div>
              <div style="display: inline-block; font-size: 24px; font-weight: bold; padding: 10px">
                {{ $t('dashboard.data_analysis.zhi-gan-ping-gu.title') }}
              </div>
              <!-- <div style="display: inline-block; font-size: 12px; padding: 10px">
                随机对等分析行业内四个企业碳排动态与表现
              </div> -->
              <div
                id="lottie_ai_aiAnalyze"
                style="width: 100%; transform: translateX(10px) translateY(10px)"
                v-show="ana.isAnalysizing"
                class="animate__fadeIn animate__animated"
              ></div>
              <div
                style="margin-bottom: 20px; text-align: center; color: #4263eb"
                v-show="ana.isAnalysizing"
                class="animate__fadeIn animate__animated"
              >
                {{ $t('dashboard.data_analysis.zhi-gan-ping-gu.loading') }}
              </div>
              <aiAnalyzeLottie></aiAnalyzeLottie>

              <!-- 文本测试 -->
              <div v-show="!ana.isAnalysizing" style="margin-bottom: 30px" class="animate__fadeIn animate__animated">
                <div style="font-size: 18px; font-weight: 700; color: #4263eb">{{ ana.msgs[ana.nowType].title }}</div>
                <div style="margin-top: 10px">
                  <span class="ana-content" v-html="ana.msgLiushi" style="text-indent: 20em"></span>
                  <span class="cursor" v-show="ana.noChange == true && ana.isAnalysizing == false"></span>
                </div>
              </div>
              <div style="display: flex">
                <a-button
                  shape="round"
                  style="border-radius: 999px"
                  type="dashed"
                  size="small"
                  @click="
                    () => {
                      this.$refs.aiModalRef.open(
                        this.userInfo.enterpriseClassName_CN + '企业如何减少二氧化碳排放，给出五点建议'
                      )
                    }
                  "
                  >{{ $t('dashboard.data_analysis.zhi-gan-ping-gu.btn.N1') }}</a-button
                >
                <a-button
                  shape="round"
                  style="border-radius: 999px; margin-left: 10px"
                  type="dashed"
                  size="small"
                  @click="
                    () => {
                      this.$router.push({ name: 'tradeMarket' })
                    }
                  "
                  >{{ $t('dashboard.data_analysis.zhi-gan-ping-gu.btn.N2') }}</a-button
                >
              </div>
              <a-button
                type="text"
                style="border-radius: 999px; border: none; float: right; margin-top: 10px"
                @click="changeAnalyze"
                :disabled="ana.noChange"
                ><a-icon type="sync" :spin="ana.noChange" />{{
                  $t('dashboard.data_analysis.zhi-gan-ping-gu.btn.changeDemission')
                }}</a-button
              >
            </div>
          </a-card>

          <div
            style="
              display: inline-block;
              font-size: 24px;
              font-weight: bold;
              padding: 5px 10px;
              margin-top: 20px;
              width: 100%;
              height: 140px;
              background: linear-gradient(45deg, #20c997, #339af0);
              border-radius: 9px;
              color: white;
              text-align: center;
              display: flex;
            "
          >
            <div style="margin: auto; font-size: 36px" class="bottom-solgan">
              链接绿色未来 <br />
              碳盟领航之道
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar } from '@/components'
import store from '@/store'
import ChangeBgCSS from '../../utils/ChangeBgCSS'

import { getRoleList, getServiceList } from '@/api/manage'

import aiLottie from './components/aiLottie.vue'
import aiModal from '@/views/dashboard/components/aiModal.vue'
import { default as VChart } from '@visactor/vchart'
import aiAnalyzeLottie from './components/aiAnalyzeLottie.vue'

import { vertical, horizontal } from '@/api/dashboard.js'
import { MyPublishTradeList, MyOrderList } from '@/api/trade.js'
import { tradeTypeClass_CN, tradeTypeClass_EN } from '@/config/class/trade/tradeTypeClass'

const DataSet = require('@antv/data-set')

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper,
    Radar,
    aiLottie,
    aiModal,
    aiAnalyzeLottie,
  },
  data() {
    return {
      timeFix: timeFix(),
      // avatar: '',
      user: {},

      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],

      // data
      verticalData: null,
      horizontalData: null,
      publishTradeData: null,
      orderData: null,
      hasMy: true,
      hasMyOrderAndTrade: true,
      tradeStatistic: {
        color: '#4c6ef5',
        type: '交易型',
        shougouNum_Order: 0,
        shoumaiNum_publish: 0,
        shougouNum_publish: 0,
        shoumaiNum_Order: 0,
      },
      tradeTypeClass_CN,
      tradeTypeClass_EN,

      ana: {
        isAnalysizing: true,
        msgLiushi: '',
        nowType: 2,
        noChange: false,
        msgs: [
          {
            title: '维度一：横向对比',
            describe: [
              '根据横向对比分析，该企业在同行业内温室气体排放表现相对优秀。相较于其他同类企业，该企业不仅在排放量上显著低于行业平均水平，而且在环保措施和节能减排技术应用方面也处于领先地位。这一成就不仅有助于企业降低运营成本，提高市场竞争力，同时也展现了企业对履行社会责任的坚定承诺和对可持续发展的深入践行。在日益强调绿色发展和低碳经济的今天，该企业的这一表现无疑为行业树立了标杆，也为其他企业提供了值得借鉴的经验。',
              '这是横向文本2',
            ],
          },
          {
            title: '维度二：纵向对比',
            describe: [
              '通过纵向对比分析，我们发现该企业在历史碳排放数据上的表现呈现出明显的改善和下降趋势。与过去几年相比，该企业的碳排放量有了显著的减少，这充分展示了企业在环保领域的努力和成效。企业能够在减少碳排放方面取得进展，不仅有助于保护环境，减少温室气体排放，也为企业在绿色经济中的长远发展奠定了坚实的基础。因此，该企业的这一积极变化是值得肯定的，同时也为其他企业树立了减排降碳的榜样。',
              '这是纵向文本2',
            ],
          },
          {
            title: '维度三：模块分布对比',
            describe: [
              '经过对各模块数据的细致分析和行业对比，我们得出结论：该企业在碳排放的各个细分领域与同行业平均水平大致相当，没有出现显著的差异。进一步分析显示，企业各模块的排放量占比分布合理，没有出现某个特定模块的碳排放异常偏高或偏低的情况。总之，该企业在碳排放管理上已经展现出一定的稳健性，但仍需不断探索和实践，以期在日益严峻的环境保护要求下，不断提升自身的绿色竞争力，实现可持续发展。',
              '这是文本3',
            ],
          },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      EnterpriseName: (state) => state.user.EnterpriseName,
      welcome: (state) => state.user.welcome,
      avatar: (state) => state.user.avatar,
    }),
    currentUser() {
      return {
        // name: 'Serati Ma',
        // avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        name: this.EnterpriseName,
        avatar: this.avatar,
      }
    },
    userInfo() {
      return this.$store.getters.userInfo
    },
    lang() {
      // console.log('11', this.$store.state.app.lang)
      return this.$store.state.app.lang
    },
  },
  created() {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
    store.dispatch('GetInfo').then(() => {
      this.user = this.userInfo
      this.avatar = this.userInfo.avatar
    })
    // getRoleList().then((res) => {
    //   // console.log('workplace -> call getRoleList()', res)
    // })
    // getServiceList().then((res) => {
    //   // console.log('workplace -> call getServiceList()', res)
    // })
  },
  mounted() {
    this.checkUserHasBind()

    ChangeBgCSS('', this.user.enterpriseClass)
    this.getProjects()
    this.getActivity()
    this.getTeams()
    this.fetchData()
  },
  methods: {
    changeAnalyze() {
      this.ana.isAnalysizing = true
      // this.nowType从0-5中随机选取一个，且不能与之前的重复
      this.ana.nowType = (this.ana.nowType + 1) % this.ana.msgs.length
      // console.log('nowType', this.ana.nowType, (this.ana.nowType + 1) % this.ana.msgs.length)
      this.ana.noChange = true
      this.ana.msgLiushi = ''

      let describe_idx = 0

      describe_idx = Math.floor(Math.random() * (this.ana.msgs[this.ana.nowType].describe.length - 1 - 0 + 1)) + 0 // 含最小值，含最大值
      // console.log(describe_idx, 'di')

      setTimeout(() => {
        this.ana.isAnalysizing = false
        // this.ana.msgLiushi = this.ana.msgs[this.ana.nowType].describe
        let index = 0
        let timer
        timer = setInterval(() => {
          if (index < this.ana.msgs[this.ana.nowType].describe[describe_idx].length) {
            this.ana.msgLiushi += this.ana.msgs[this.ana.nowType].describe[describe_idx].charAt(index)
            index++
          } else {
            this.ana.noChange = false
            clearInterval(timer)
            timer = null
          }
        }, 50)
      }, 1200)
    },
    checkUserHasBind() {
      if (this.userInfo.BindStatus != 'PASS') {
        this.$router.push({ path: '/bind' })
      }
    },
    getProjects() {
      // this.$http.get('/list/search/projects').then((res) => {
      //   this.projects = res.data && res.data.data
      //   this.loading = false
      // })
    },
    getActivity() {
      // this.$http.get('/workplace/activity').then((res) => {
      //   this.activities = res.data
      // })
    },
    getTeams() {
      // this.$http.get('/workplace/teams').then((res) => {
      //   this.teams = res.data
      // })
    },
    async fetchData() {
      this.hasMyOrderAndTrade = false
      await vertical().then((res) => {
        this.verticalData = res.data.datas
        this.hasMy = res.data.hasMy
      })
      await horizontal().then((res) => {
        this.horizontalData = res.data.datas
      })
      await MyPublishTradeList().then((res) => {
        this.publishTradeData = res.data.tradeListEnterprise
        if (this.publishTradeData.length != 0) {
          this.hasMyOrderAndTrade = true
        }
      })

      await MyOrderList().then((res) => {
        this.orderData = res.data.orderListEnterprise
        if (this.orderData.length != 0) {
          this.hasMyOrderAndTrade = true
        }
      })

      this.initCharts()
    },
    initCharts() {
      this.initHorizontal()
      this.initVertical()
      this.initPie()
      this.initTrade()
      this.initAnayize()
    },
    initAnayize() {
      let horizontal_ana = {
        title: '维度一：横向分析',
        describe: [],
      }
      let vertical_ana = {
        title: '维度二：纵向分析',
        describe: [],
      }
      let pie_ana = {
        title: '维度三：模块分析',
        describe: [],
      }
      /**
       * 横向分析—— 按年份统计
       */
      // 准备基础数据
      // 横向数据
      let sum_average_others = 0 //其他行业总平均值
      let average_others_modal = JSON.parse(JSON.stringify(this.horizontalData[0].children)) //其他行业每个模块的平均值
      let sum_average_me = 0
      let average_me_modal = []
      average_others_modal.forEach((item) => {
        item.classDataSum = 0
      })
      this.horizontalData.forEach((item) => {
        if (item.isMy) {
          sum_average_me = item.sumEmission
          average_me_modal = item.children
        } else {
          sum_average_others += item.sumEmission
          for (let i = 0; i < item.children.length; i++) {
            for (let j = 0; j < average_others_modal.length; j++) {
              if (item.children[i].className == average_others_modal[j].className) {
                average_others_modal[j].classDataSum += item.children[i].classDataSum
              }
            }
          }
        }
      })
      sum_average_others =
        sum_average_others / (this.hasMy ? this.horizontalData.length - 1 : this.horizontalData.length)
      average_others_modal.forEach((item) => {
        item.classDataSum =
          item.classDataSum / (this.hasMy ? this.horizontalData.length - 1 : this.horizontalData.length)
        item.percent = item.classDataSum / sum_average_others
      })
      average_me_modal.forEach((item) => {
        item.percent = item.classDataSum / sum_average_me
      })

      // console.log('sum_average_others', average_others_modal, sum_average_others, sum_average_me, average_me_modal)

      //纵向数据
      let sum_average_old = 0
      let average_old_modal = JSON.parse(JSON.stringify(this.verticalData[0].children))
      average_old_modal.forEach((item) => {
        item.classDataSum = 0
      })
      this.verticalData.forEach((item) => {
        // console.log('1', item)
        sum_average_old += item.sumEmission
        for (let i = 0; i < item.children.length; i++) {
          for (let j = 0; j < average_old_modal.length; j++) {
            if (item.children[i].className == average_old_modal[j].className) {
              average_old_modal[j].classDataSum += item.children[i].classDataSum
            }
          }
        }
      })

      sum_average_old = sum_average_old / this.verticalData.length
      average_old_modal.forEach((item) => {
        item.classDataSum = item.classDataSum / this.verticalData.length
        item.percent = item.classDataSum / sum_average_others
      })
      // console.log(average_old_modal, sum_average_old)

      /**
       * 下面针对不同的数据生成模板
       * 边界问题：无我，只有一年我
       */
      if (!this.hasMy) {
        horizontal_ana.describe.push(
          '由于您还未填写任何碳排放数据，我无法为您进行横向分析来比较不同企业之间的碳排放情况。😕请您尽快提供相关数据，这样我就能为您提供更全面和深入的分析，以帮助您更好地了解企业在行业中的碳排放表现。'
        )
        vertical_ana.describe.push(
          '您还没有提交碳排放的相关数据，这使得我无法执行纵向分析来观察碳排放随时间的动态变化。😕请您尽快补充这些数据，以便我能够为您提供更精确和有价值的分析。'
        )
        pie_ana.describe.push(
          '您尚未提供任何碳排放相关的数据资料，因此在此缺乏必要数据的前提下，领航员无法为您执行模块化分析，以观察和评估碳排放趋势随时间的变化情况。😕请您尽快提供相关数据，以便我能为您提供更全面和深入的分析服务。'
        )
      } else {
        if (this.verticalData.length == 1) {
          vertical_ana.describe.push(
            '您仅提供了最近一年的碳排放数据，这使我无法为您进行纵向分析，该分析能够帮助您追踪和理解碳排放随时间的变化趋势。🤔不过，您可以尝试切换其他维度，比如横向比较或模块比较，来进行比较分析，以获得有价值的洞察。'
          )
        } else {
          if (sum_average_me >= sum_average_old * 1.05) {
            vertical_ana.describe.push(
              `🤕哎呀，贵企业的碳排放总量在过去一年里悄悄上升了，比历史同期水平高<span style="color:red;font-weight:bold">${(
                (sum_average_me / sum_average_old - 1) *
                100
              ).toFixed(
                3
              )}%</span>。不过别担心，这正是我们发现问题、解决问题的时刻。🔍想要让碳排放的曲线再次向下倾斜吗？这里有几个小建议，让贵企业重新踏上低碳减排的征程：——<br/>
            <br/>🟠一是<b>加强环保合作</b>，与其他企业、政府机构或环保组织携手，共同推动环保技术和最佳实践的分享🤝；
            <br/>🔴二是<b>节能减排技术</b>，运用最新的节能减排技术，提高能源利用效率，让每一分能量都能发挥最大的价值🌍；
            <br/>🔵三是<b>绿色市场机遇</b>，发现绿色产品和服务的市场潜力，满足消费者对环保产品的需求，同时为贵企业开辟新的增长点🚀
            <br/>也建议前往【碳交易市场】收购碳排量缓解短时压力。我们相信，贵企业一定能够重新找到低碳减排的节奏，为我们的地球添上一抹更加鲜艳的绿。一起加油，共创美好未来！👏`
            )
            vertical_ana.describe.push(
              `🤕面对困难和挑战，我们要有勇气和信心，迎接未知的挑战，不断成长！🌈不禁意间，贵企业的碳排放总量在过去一年里悄然上升至<span style="color:red;font-weight:bold">${sum_average_me.toFixed(
                2
              )}</span>，高于历史平均值<span style="color:red">${sum_average_old.toFixed(
                2
              )}</span>。这无疑是一次严峻的挑战，但请别担忧，这同时也是我们发现问题的契机，更是我们寻求解决方案的起点。🔍💡<br/>
            <br/>🟠<b>能源结构优化</b>：把传统的能源消耗模式升级成更环保的版本，比如引入太阳能、风能等清洁能源，减少对化石燃料的依赖🌿
            <br/>🟣<b>碳交易市场</b>：如果短期内无法减少所有碳排放，探索碳交易市场的可能性，通过碳减排项目的投资，实现碳排放的补偿和平衡。💡
            <br/><br/>相信，通过这些努力，贵企业不仅能够迎头赶上，为我们的地球添上一抹更加鲜艳的绿。让我们一起期待贵企业未来的绿色变革！👏`
            )
            vertical_ana.describe.push(
              `🤕关注到，贵企业的碳排放总量在过去一年里高于历史同期<span style="color:red;font-weight:bold">${(
                sum_average_me - sum_average_old
              ).toFixed(
                2
              )}</span>二氧化碳当量。是时候播撒变革的种子，让它们在精心培育的土壤中生根发芽。🌱🌿 在此建议——<br/>
            <br/>🔵挖掘<b>绿色产品和服务的市场潜力</b>，满足消费者对环保产品的渴望，为贵企业开拓新的增长空间，让绿色成为企业发展的底色。。
            <br/>🟢与其他企业、政府机构或环保组织携手，<b>共同推动环保技术和最佳实践的分享</b>，让绿色力量汇聚成河，共同为地球家园的美好未来努力。
              <br/>🟡持续关注和投资新兴的环保技术，如碳捕捉与储存、生物降解材料等，让<b>科技创新成为企业绿色发展的强大推动力</b>。
              <br/><br/>🌞🚀让我们携手共进，以绿色为底色，以创新为动力，共同书写企业低碳发展的辉煌篇章🎨🌈 在这个绿色征途上，以实际行动，为地球母亲披上绿色的盛装。🦋🌿`
            )
          } else if (sum_average_me <= sum_average_old * 0.95) {
            vertical_ana.describe.push(
              `🎉最近一年，贵企业的减排成效显著，与历史同期平均值相比显著下降<span style="color:green;font-weight:bold">${(
                ((sum_average_old - sum_average_me) / sum_average_old) *
                100
              ).toFixed(
                3
              )}%</span>。在绿色低碳的道路上，贵企业已经迈出了坚实的步伐，展现出了领先同行的实力和担当。🚩为在未来的绿色竞争中脱颖而出，保持领先地位，我们建议贵企业可以从以下几个方面进一步提升碳排放管理——<br/>
            <br/>🟠继续<b>优化能源结构</b>，增加清洁能源的使用比例，减少化石能源的消耗。平衡产业结构，势在必行🔧；
            <br/>🔵深在企业内部培养和强化<b>绿色文化</b>，鼓励员工参与环保活动，提升全员环保意识。文化塑造行为，行为改变未来，让绿色文化成为贵企业的核心竞争力。🌍；
            <br/>🔴积极分享和收集<b>碳排控制的成功经验</b>，固步自封笃定不能发展，交流共荣才是硬道理！🌿
            <br/><br/>您可以前往【碳交易市场】进行多余碳排量的售卖。期待贵企业在绿色低碳的道路上继续前行，共创美好未来！👏👏`
            )
            vertical_ana.describe.push(
              `🎉贵企业最近一年的碳排放总量<span style="color:green;font-weight:bold">${sum_average_me.toFixed(
                2
              )}</span>，相较历史同期的平均数<span style="color:green">${sum_average_old.toFixed(
                2
              )}</span>明显下降，这个成绩真的让人眼前一亮🌳贵企业在碳管理上的稳定性，绝对值得我们点个赞👍想要在未来的绿色赛道上领先一步吗？领航员给出几个小建议——
            <br/><br/>🟣把钱花在刀刃上，投资能提高能源效率和减少碳排放的新技术。<b>创新，可是一切环保进步的源头活水哦！</b>🌅；
            <br/>🟠与供应商合作，推动他们采用更<b>环保的生产方法和材料</b>，从而减少整个供应链的碳足迹🌍；
            <br/>🟢看看那些绿色产品和服务的<b>交易市场</b>潜力有多大吧！消费者的环保意识越来越强，这可是一个新的增长点哦！🛫
            <br/><br/>期待看到贵企业在绿色低碳的道路上越走越远，一起为我们的地球添上一抹更加鲜艳的绿！🌱👏`
            )
            vertical_ana.describe.push(
              `🎉环保小能手非您莫属。在绿色低碳的道路上，贵企业已经迈出了坚实的步伐——您企业的碳排放总量相比历史同期平均降低<span style="color:green;font-weight:bold">${(
                sum_average_old - sum_average_me
              ).toFixed(
                2
              )}</span>二氧化碳当量。贵企业的这一举措不仅体现了对环境保护的坚定承诺，展现出了领先同行的实力和担当。👍贵企业的这一成就，不仅体现了对环境保护的坚定承诺，更是为行业树立了一面耀眼的绿色旗帜，引领着大家向可持续发展的方向迈进。🌱。
            
            <br/><br/>绿水青山就是金山银山，保护生态环境，贵企业功不可没。期待您在未来的低碳发展道路上，继续发光发热，为保护地球家园做出更大的贡献！🌳👏
            
            <br/><br/>您可以前往【碳交易市场】进行多余碳排量的售卖。🌱🌱我们相信，在贵企业的努力下，一定能够继续保持领先地位，为推动我国绿色低碳发展贡献力量。期待贵企业在绿色低碳的道路上<b>继续前行，共创美好未来！</b>👏👏🌈🌳👏`
            )
          } else {
            vertical_ana.describe.push(
              `🎉不错的消息，您的碳排放总量<span style="color:blue;font-weight:bold">${sum_average_me.toFixed(
                2
              )}</span>，与历史同期水平<span style="color:blue;">${sum_average_old.toFixed(
                2
              )}</span>基本持平。在碳排放管理这方面，贵企业展现出了强大的稳定性和自律性，值得我们点赞👍。稳定只是开始，贵企业还有无限可能。想要在未来的绿色赛道上领跑吗？——
            <br/><br/>🔵<b>创新绿色技术发展</b>：继续探索和采用更加清洁的能源解决方案，如太阳能、风能等可再生能源，以进一步减少对化石燃料的依赖🔋；
            <br/>🟡<b>合作共享共赢</b>：探与政府、行业组织、非政府组织和其他企业合作，共同推动环保技术和最佳实践的分享。合作是实现绿色转型的有力途径。💼
            <br/><br/>您也可以前往【碳交易市场】进行碳排量的交易。我们相信，在贵企业的努力下，一定能够继续保持领先地位，为推动我国绿色低碳发展贡献力量。期待贵企业在绿色低碳的道路上继续前行，共创美好未来！🌈🌱`
            )
            vertical_ana.describe.push(
              `👋在这场与碳排放的较量中，贵企业展现出了非凡的稳定性和高度的自律，这份坚持与努力，无疑是环保事业中的一颗璀璨明星，值得我们为之喝彩，为之点赞！👍贵企业的碳排放总量<span style="color:blue;font-weight:bold">${sum_average_me.toFixed(
                2
              )}</span>与历史平均线<span style="color:blue;">${sum_average_old.toFixed(
                2
              )}</span>并行🌟稳定中有变革的可能，要在未来的可持续发展中领跑——
            <br/><br/>🔴<b>绿色技术的革新</b>：勇往直前，继续探索和采用更加清洁的能源解决方案，如太阳能、风能等可再生能源，以进一步减少对化石燃料的依赖，让绿色能源为企业发展注入新动力。💡；
            <br/>🟣<b>绿色市场的开拓</b>——积极探索绿色产品和服务的市场潜力，满足消费者对环保产品的需求。绿色市场为企业提供了新的增长点，让企业在绿色发展的道路上越走越稳。💼🌍
            <br/><br/>此外，贵企业亦可涉足【碳交易市场】，在碳排量交易中寻找新的平衡与机遇。我们满怀期待，贵企业将在绿色与低碳的道路上，继续稳步前行，共同绘制一个更加繁荣与可持续的未来。🌈🌱👏`
            )
          }
        }
        /**横向 */

        //如果sum_average_me在sum_average_others，上下5%内，说明保持稳定，否则说明有变化，
        if (sum_average_me >= sum_average_others * 1.05) {
          horizontal_ana.describe.push(
            `🧐您企业的碳排放总量在过去一年中大于行业平均水平的<span style="color:red;font-weight:bold">${(
              (sum_average_me / sum_average_others - 1) *
              100
            ).toFixed(
              3
            )}%</span>。这一结果表明，相较于行业平均水平，您的企业在碳排放方面存在一定的差距。😔这可能是由于多种因素造成的，您不必气馁，及时发现问题解决问题。📈\n为了减少碳排放，您可以采取以下措施——<br/>
            <br/>🟠一是<b>优化能源结构</b>，提高清洁能源的使用比例减少化石能源的消耗🔁；
            <br/>🟢二是<b>提高能源利用效率</b>，通过技术改进降低能源消耗强度🌍；
            <br/>🔵三是<b>加强碳排放规划</b>，制定并执行有效的碳排放减少计划🌿
            <br/>也建议前往【碳交易市场】收购碳排量缓解短时压力。每一份努力都孕育着变革的种子。🌱 通过精准的规划和积极的行动，贵企业完全有能力扭转局面，迈向低碳发展的光明未来。🌞`
          )
          horizontal_ana.describe.push(
            `🧐面对挑战，我们看到的是一个充满机遇的起点！🌈数据显示，您的碳排放总量<span style="color:red;font-weight:bold">${sum_average_me.toFixed(
              2
            )}</span>，高于行业平均值<span style="color:red">${sum_average_others.toFixed(
              2
            )}</span>。这一数据揭示了贵企业在碳排放管理方面还有很大的提升空间。📈不必过于担忧，这其实是一个向绿色转型迈进的绝佳契机。为了帮助您缩小与行业平均水平的差距，建议采取以下策略——<br/>
            <br/>🟠<b>推动循环经济实践</b>：鼓励产品设计和制造过程中的循环经济原则，比如使用可回收或生物降解材料，以及延长产品的使用寿命🌿
            <br/>🟣<b>参与碳交易项目</b>：如果短期内无法减少所有碳排放，可以考虑通过交易短时期缓解碳排放压力💡
            <br/><br/>相信，通过这些努力，贵企业不仅能够迎头赶上，更能够在绿色低碳的发展道路上引领潮流。让我们一起期待贵企业未来的绿色变革！👏`
          )
          horizontal_ana.describe.push(
            `🧐您企业的碳排放总量高于行业平均<span style="color:red;font-weight:bold">${(
              sum_average_me - sum_average_others
            ).toFixed(
              2
            )}</span>二氧化碳当量。是时候播撒变革的种子，让它们在精心培育的土壤中生根发芽。🌱🌿 在此建议——<br/>
            <br/>🔵拥抱太阳的光辉，捕捉风的呼吸，让<b>清洁能源</b>成为推动贵企业前行的力量。
            <br/>🟢点燃员工心中的环保之火，让<b>每一个人</b>都成为绿色变革的使者。
              <br/>🟡与伙伴携手，共同编织一张绿色的<b>供应链网络</b>
              <br/><br/>🌞🚀让我们共同执笔，以蓝天为纸，以绿意为墨，描绘出一幅幅生机勃勃的可持续发展画卷。🎨🌈 在这个绿色征途上，每一次的跃动都是对明天的承诺，每一次的飞翔都是对未来的期许。🦋🌿`
          )
        } else if (sum_average_me <= sum_average_others * 0.95) {
          // console.log(sum_average_me, sum_average_others * 0.95)
          horizontal_ana.describe.push(
            `🎉您企业的碳排放总量在过去一年中低于行业平均水平，同比下降<span style="color:green;font-weight:bold">${(
              ((sum_average_others - sum_average_me) / sum_average_others) *
              100
            ).toFixed(
              3
            )}%</span>。为您企业的碳排放管理成果感到欣喜😁。这一卓越表现为行业的绿色发展树立了典范。🚩为了继续保持这一优势，建议您进一步巩固和扩大已取得的成果，例如：<br/>
            <br/>🟠继续<b>优化能源结构</b>，增加清洁能源的使用比例，减少化石能源的消耗🔧；
            <br/>🔵深入实施<b>节能减排技术改造</b>，提高利用效率，降低能耗强度🌍；
            <br/>🔴分享<b>碳排控制的成功经验</b>，与业内其他企业交流合作，共同推动整个行业的绿色低碳发展🌿
            <br/><br/>您可以前往【碳交易市场】进行多余碳排量的售卖。再次祝贺您企业在碳排放管理方面取得的辉煌成就，期待您在未来继续为我国的绿色低碳发展贡献力量！👍`
          )
          horizontal_ana.describe.push(
            `🎉衷心祝贺您企业的碳排放管理在过去一年中取得了令人瞩目的成就！🎉 数据显示，您的碳排放总量<span style="color:green;font-weight:bold">${sum_average_me.toFixed(
              2
            )}</span>，远低于行业平均值<span style="color:green">${sum_average_others.toFixed(
              2
            )}</span>，这一显著成果不仅证明了您在环保领域的领先地位，更为整个行业树立了绿色发展的标杆。🌳为了维持这一领先优势并继续进步，我们建议您在以下几个方面进一步努力——
            <br/><br/>🟣鼓励员工采取<b>环保的办公习惯</b>，如减少打印、使用节能设备等。🌅；
            <br/>🟠与供应商合作，推动他们采用更<b>环保的生产方法和材料</b>，从而减少整个供应链的碳足迹🌍；
            <br/>🟢考虑参与<b>【碳交易】</b>市场。通过出售碳排量或投资于碳减排项目，贵企业可以进一步降低其整体碳足迹。
            <br/><br/>期待您在未来继续发挥示范作用，引领行业向更加绿色、可持续的方向发展！👏🌿`
          )
          horizontal_ana.describe.push(
            `🎉您企业的碳排放总量相比行业平均降低<span style="color:green;font-weight:bold">${(
              sum_average_others - sum_average_me
            ).toFixed(
              2
            )}</span>二氧化碳当量，已显著优于行业平均水平，这无疑是一项值得骄傲的<b>环保里程碑</b>🌟。贵企业的这一举措不仅体现了对环境保护的坚定承诺，更为整个行业树立了一个高标准的环境责任典范🌱。
            
            <br/><br/>您的成功故事激励着同行们，证明了<b>绿色发展与经济效益可以并行不悖</b>。坚信，贵企业将继续发挥<b>领头羊</b>作用，为推动我国乃至全球的绿色低碳发展做出更大贡献。<br/><br/>您可以前往【碳交易市场】进行多余碳排量的售卖。期待看到贵企业在未来的环保征途上再创佳绩，为我们的地球家园增添更多<b>绿色希望！</b>🌈🌳👏`
          )
        } else {
          horizontal_ana.describe.push(
            `🎉数据显示，您的碳排放总量<span style="color:blue;font-weight:bold">${sum_average_me.toFixed(
              2
            )}</span>，与行业平均值<span style="color:blue;">${sum_average_others.toFixed(
              2
            )}</span>基本持平。我们对贵企业在碳排放管理方面所取得的稳定性表示认可🌟。为了在未来的绿色竞争中脱颖而出，我们建议贵企业考虑以下策略——
            <br/><br/>🔵<b>创新绿色技术发展</b>：投资研发新技术，以提高能源效率和减少碳排放。创新是推动环保进步的关键动力🔋；
            <br/>🟣<b>强化绿色文化建设</b>：在企业内部培养和强化绿色文化，鼓励员工参与环保活动，提升全员环保意识。文化塑造行为，行为改变未来👷‍♂️；
            <br/>🟡<b>拓展绿色市场机遇</b>：探索绿色产品和服务的市场潜力，满足消费者对环保产品的需求。绿色市场为企业提供了新的增长点。💼
            <br/><br/>您也可以前往【碳交易市场】进行碳排量的交易。期待贵企业在绿色低碳的道路上继续前行，共创美好未来！🌈🌱👏`
          )
          horizontal_ana.describe.push(
            `👋数据揭示，贵企业的碳排放总量<span style="color:blue;font-weight:bold">${sum_average_me.toFixed(
              2
            )}</span>与行业平均线<span style="color:blue;">${sum_average_others.toFixed(
              2
            )}</span>并行，这反映出贵企业在碳管理方面已稳步行走于绿色之路。🌟为了在未来的可持续发展中独占鳌头，我们诚邀贵企业深思以下策略——
            <br/><br/>🔴<b>绿色技术的革新</b>：投身于创新科技的研发，提升能源使用效率，减少碳足迹。创新，是推动环保革命的不竭动力。💡；
            <br/>🔵<b>绿色文化的培育</b>——在企业土壤中播种绿色理念，激励员工加入环保行列，让环保意识成为企业文化的DNA。👷‍♂️；
            <br/>🟣<b>绿色市场的开拓</b>——挖掘绿色产品与服务的无限潜力，迎合消费者对可持续生活的渴望。💼🌍
            <br/><br/>此外，贵企业亦可涉足【碳交易市场】，在碳排量交易中寻找新的平衡与机遇。我们满怀期待，贵企业将在绿色与低碳的道路上，继续稳步前行，共同绘制一个更加繁荣与可持续的未来。🌈🌱👏`
          )
        }
        /**模块 */
        let average_me_modal_sort = average_me_modal.sort((a, b) => {
          return a.className - b.className
        })
        let average_others_modal_sort = average_others_modal.sort((a, b) => {
          return a.className - b.className
        })
        let noFit_modal = []
        let has_Exceed_ = false
        let has_Decrease_ = false
        // 如果average_others_modal的每一个板块的percent都在average_me_modal的范围内

        for (let classIdx = 0; classIdx < average_others_modal.length; classIdx++) {
          // console.log(average_me_modal_sort[classIdx].percent, average_others_modal_sort[classIdx].percent)
          if (average_me_modal_sort[classIdx].percent >= average_others_modal_sort[classIdx].percent + 0.15) {
            noFit_modal.push({
              className: average_me_modal_sort[classIdx].className,
              classDataSum_me: average_me_modal_sort[classIdx].classDataSum,
              percent_me: average_me_modal_sort[classIdx].percent,
              classDataSum_others: average_others_modal_sort[classIdx].classDataSum,
              percent_others: average_others_modal_sort[classIdx].percent,
            })
            has_Exceed_ = true
          } else if (average_me_modal_sort[classIdx].percent <= average_others_modal_sort[classIdx].percent - 0.15) {
            noFit_modal.push({
              className: average_me_modal_sort[classIdx].className,
              classDataSum_me: average_me_modal_sort[classIdx].classDataSum,
              percent_me: average_me_modal_sort[classIdx].percent,
              classDataSum_others: average_others_modal_sort[classIdx].classDataSum,
              percent_others: average_others_modal_sort[classIdx].percent,
            })
            has_Decrease_ = true
          } else {
          }
        }

        if (noFit_modal.length == 0) {
          const combinedClassName = average_me_modal_sort.reduce((accumulator, current) => {
            if (current.className) {
              return accumulator + '，' + current.className
            }
            return accumulator
          }, '')
          // console.log(combinedClassName) // 输出: "class1 class2 class3"
          pie_ana.describe
            .push(`👋据最新数据分析，本企业在<span style="color:blue;font-weight:bold">${combinedClassName}</span>几个关键模块的排放占比与同行业保持基本一致，这一现象释放出积极信号，反映出本企业在行业内的碳排放控制处于稳健水平🍃🌞。然而，卓越并非终点，而是一个新的起点。我们必须持续探索更为先进的科技和管理策略，以推动碳减排工作向更深层次发展。👇
            <br/><br/>🔴做好<b>过程优化</b>：借助智能化和自动化技术，优化生产流程，降低能源消耗和排放🎯；
            <br/>🟠做实<b>废物回收</b>：采纳高效的废物回收和资源化利用技术，减少废弃物的排放，实现循环经济🚀；
            <br/>🔵做稳<b>能源优化</b>：引进先进的能源管理系统，调整能源结构，提高清洁能源的比重，降低对化石能源的依赖🌟
            <br/><br/>亲爱的同仁们，让我们携手并进，为地球环境保护贡献我们的力量，让我们的企业成为环保领域的闪耀之星！🌍💪
            `)
          pie_ana.describe
            .push(`👋综合分析各模块情况，您在<span style="color:blue;font-weight:bold">${combinedClassName}</span>模块的碳排放占比与行业平均水平保持了同步，这传递出一个清晰的信号：我们在碳排放控制方面，正稳健地紧跟大部队。为此，我们还可以继续努力🌳✨👇
            <br/><br/>🟣<b>能源结构优化</b>：逐步减少对传统化石能源的依赖，增加清洁能源和可再生能源的使用比例。例如，投资建设太阳能或风能发电设施，以替代部分传统能源消耗。🎯；
            <br/>🟠<b>碳捕捉与储存</b>：探索和应用碳捕捉、利用和储存（CCUS）技术，以减少碳排放。这包括在排放源头安装碳捕捉设备，将捕获的碳储存或转化为有用的产品。🚀；
            <br/><br/>通过实施这些建议，我们不仅能够平衡碳排放量结构，还能推动企业向低碳、环保的方向发展，为地球环境保护贡献我们的力量。让我们携手并进，为打造绿色企业、守护蓝色星球而努力！🌍💪
            `)
        } else {
          if (sum_average_me >= sum_average_others) {
            let notFitDetail = noFit_modal.reduce((accumulator, current) => {
              if (current.percent_me > current.percent_others) {
                return (
                  accumulator +
                  '，<span style="font-weight:bold">' +
                  current.className +
                  '</span>相比行业平均占比<span style="color:red">多' +
                  ((current.percent_me - current.percent_others) * 100).toFixed(2) +
                  '%</span>'
                )
              } else if (current.percent_me < current.percent_others) {
                return (
                  accumulator +
                  '，<span style="font-weight:bold">' +
                  current.className +
                  '</span>相比行业平均占比<span style="color:green">少' +
                  ((current.percent_others - current.percent_me) * 100).toFixed(2) +
                  '%</span>'
                )
              }
              return accumulator
            }, '')

            let notFitDetail_2 = noFit_modal.reduce((accumulator, current) => {
              if (current.classDataSum_me > current.classDataSum_others) {
                return (
                  accumulator +
                  '，<span style="font-weight:bold">' +
                  current.className +
                  '</span>相比行业平均排量<span style="color:red">多' +
                  ((current.classDataSum_me - current.classDataSum_others) * 100).toFixed(2) +
                  '</span>'
                )
              } else if (current.classDataSum_me < current.classDataSum_others) {
                return (
                  accumulator +
                  '，<span style="font-weight:bold">' +
                  current.className +
                  '</span>相比行业平均排量<span style="color:green">少' +
                  ((current.classDataSum_others - current.classDataSum_me) * 100).toFixed(2) +
                  '</span>'
                )
              }
              return accumulator
            }, '')
            pie_ana.describe
              .push(`🌟数据显示，贵企业在<span style="color:blue;font-weight:bold">${noFit_modal.length}个模块</span>的碳排放量与行业平均水平存在差异，总排放量也略高于行业平均。其中${notFitDetail}。然而，挑战往往伴随着机遇，这为我们指明了优化方向🚩:
<br/><br/>🔴<b>模块优化</b>：针对相关模块，深入分析其异常碳排放的原因，并探索节能减排的可能性。通过技术创新和流程优化，力求在保证效率的同时降低碳排放🚵🏻‍♂️。
<br/>🔵<b>全面均衡</b>：注重整体结构的平衡。优化其他模块的碳排放管理，以实现企业整体碳排放量的均衡和降低⏬。
<br/><br/>此外，贵企业可积极参与【碳交易市场】，利用市场机制优化碳排放结构，寻找新的平衡与机遇。我们坚信，在贵企业的努力下，必将能够在绿色与低碳的道路上稳步前行。🌍💪🌱
`)
            pie_ana.describe
              .push(`🌟数据分析揭示了企业<span style="color:blue;font-weight:bold">${noFit_modal.length}个模块</span>碳排放量与行业平均水平占比的明显结构不一致，同时总排放量也略超出了行业平均线。这一发现指出了贵企业面临的挑战。其中${notFitDetail_2}。为了优化贵企业的碳排放结构，我们提出以下专业建议：🚩:
<br/><br/>🔴<b>模块精准诊断</b>：对模块实施细致的数据剖析，精准定位其碳排放过高的根源。依托详尽的分析报告，探寻并实施节能减排的有效措施，依托技术进步和流程再造，力求在不牺牲生产效率的前提下削减碳排放🔍。
<br/>🔵<b>结构优化策略</b>：在推进减排的过程中，重视企业整体碳排放结构的均衡性。对其他模块的碳排放管理进行精细化调整，通过精准策略和动态平衡，促使企业整体碳排放量向更为均衡和低水平的方向发展🌿。
<br/><br/>让我们共同绘制一个更加繁荣与可持续的未来。💪🌱
`)
            if (has_Exceed_) {
              let notFitDetail_3 = noFit_modal.reduce((accumulator, current) => {
                if (current.percent_me > current.percent_others) {
                  return (
                    accumulator +
                    '，<span style="font-weight:bold">' +
                    current.className +
                    '</span>相比行业平均占比<span style="color:red">多' +
                    ((current.percent_me - current.percent_others) * 100).toFixed(2) +
                    '%</span>' +
                    '，企业总量<span style="font-weight:bold;color:blue">' +
                    current.classDataSum_me.toFixed(2) +
                    '</span>'
                  )
                } else if (current.percent_me < current.percent_others) {
                  return accumulator
                }
                return accumulator
              }, '')
              pie_ana.describe
                .push(`🌟据统计显示，贵企业部分模块的碳排放量超过行业平均水平且占比较大。其中${notFitDetail_3}，这可能是由于能源内部结构失衡所导致。为了实现更绿色、均衡的可持续发展，我们提出以下创新性建议：
              <br/><br/>🟢<b>模块差异化分析</b>：针对模块，深入挖掘其高碳排放的具体原因。通过定制化解决方案，实现模块间的碳排放优化，推动整体结构的均衡发展。🔎
              <br/>🔴<b>结构创新设计</b>：以系统思维为指导，重新审视企业整体碳排放结构。通过引入绿色设计和清洁生产理念，实现资源的高效利用和碳排放的源头减排。🆕
              <br/><br/>我们期望，贵企业能够在面对挑战时展现出创新精神和领导力，通过优化碳排放结构，引领行业走向绿色与低碳的未来。我们相信，在贵企业的努力下，必将能够在环保领域取得突破性成就，为地球环境保护贡献一份力量。🌍💪🌱`)
              horizontal_ana.describe
                .push(`🌟数据透露出贵企业在几个模块的碳排放量超过行业平均水平且占比较大，这暗示着企业内部结构可能存在失衡现象。其中${notFitDetail_3}。为了迈向更绿色、均衡的可持续发展道路，我们提出以下创新性建议：
              <br/><br/>🟠<b>绿色技术创新</b>：加大研发投入，推动绿色技术的创新与应用。例如，利用可再生能源、碳捕捉与储存技术，以及智能化能源管理系统，🚀
              <br/>🟣<b>跨企业协同</b>：鼓励各部门共同参与碳减排行动。通过共享最佳实践、碳交易、协同解决问题，实现企业整体碳排放量的均衡和降低。🛒
              <br/><br/>我们期待，贵企业在应对挑战之际，能展现出前瞻性的创新精神和卓越的领导力。通过精心优化碳排放结构，成为行业先锋，引领我们迈向一个更加绿色、低碳的未来。🌍💪🌱`)
            }
          } else {
            let notFitDetail = noFit_modal.reduce((accumulator, current) => {
              if (current.percent_me > current.percent_others) {
                return (
                  accumulator +
                  '，<span style="font-weight:bold">' +
                  current.className +
                  '</span>相比行业平均占比<span style="color:red">多' +
                  ((current.percent_me - current.percent_others) * 100).toFixed(2) +
                  '%</span>'
                )
              } else if (current.percent_me < current.percent_others) {
                return (
                  accumulator +
                  '，<span style="font-weight:bold">' +
                  current.className +
                  '</span>相比行业平均占比<span style="color:green">少' +
                  ((current.percent_others - current.percent_me) * 100).toFixed(2) +
                  '%</span>'
                )
              }
              return accumulator
            }, '')

            let notFitDetail_2 = noFit_modal.reduce((accumulator, current) => {
              if (current.classDataSum_me > current.classDataSum_others) {
                return (
                  accumulator +
                  '，<span style="font-weight:bold">' +
                  current.className +
                  '</span>相比行业平均排量<span style="color:red">多' +
                  ((current.classDataSum_me - current.classDataSum_others) * 100).toFixed(2) +
                  '</span>'
                )
              } else if (current.classDataSum_me < current.classDataSum_others) {
                return (
                  accumulator +
                  '，<span style="font-weight:bold">' +
                  current.className +
                  '</span>相比行业平均排量<span style="color:green">少' +
                  ((current.classDataSum_others - current.classDataSum_me) * 100).toFixed(2) +
                  '</span>'
                )
              }
              return accumulator
            }, '')
            pie_ana.describe
              .push(`🌟数据显示，贵企业的碳排放量低于行业平均水平！祝贺企业的成功探索和实践。但是我们发现，在<span style="color:blue;font-weight:bold">${noFit_modal.length}个模块</span>的碳排放量与行业平均水平存在差异。其中${notFitDetail}。可能有潜在的结构失衡，也可能是企业创新探索所致，我们建议：
<br/><br/>🟢<b>深入分析差异原因</b>：对相关模块的碳排放情况进行深入分析，以确定其低排放的原因。这将有助于了解是创新举措所致，还是潜在失衡的问题🎯。
<br/>🔵<b>积极履行社会责任</b>：与政府、行业协会、非政府组织等合作，推动绿色低碳产业发展。参与碳交易市场，开展碳减排项目，实现经济效益与社会责任的共赢🤝。
<br/><br/>我们相信，贵企业在探索创新的同时，具备应对潜在风险的能力。继续探索，无问西东！😊
`)
            pie_ana.describe
              .push(`🌟数据透露出，贵企业的碳排放量低于行业平均水平，这一成绩是对贵企业绿色发展战略的最佳诠释。然而，<span style="color:blue;font-weight:bold">${noFit_modal.length}个模块</span>的占比与市场平均不符，这可能是企业内部结构的一些失衡所致。其中${notFitDetail_2}。在此，我们提出以下建议，以鼓励企业继续创新并注意潜在风险🚩:
<br/><br/>🔴<b>模块精准诊断</b>：精确识别其碳排放过高的根源。借助详尽的分析报告，探索并实施节能减排的有效策略。通过合理调整资源配置和生产策略，优化其他模块的碳排放管理，实现企业整体碳排放量的均衡和降低。💎。
<br/>🔵<b>结构优化策略</b>：平衡碳排放量。通过调整资源配置和生产策略，优化模块的碳排放管理，提升贵企业的竞争力和可持续发展能力💞。
<br/><br/>让我们共同绘制一个更加繁荣与可持续的未来。躬耕探索，笃行不待💪🌱
`)
            if (has_Decrease_) {
              let notFitDetail_3 = noFit_modal.reduce((accumulator, current) => {
                if (current.percent_me < current.percent_others) {
                  return (
                    accumulator +
                    '，<span style="font-weight:bold">' +
                    current.className +
                    '</span>相比行业平均占比<span style="color:green">少' +
                    ((current.percent_me - current.percent_others) * 100).toFixed(2) +
                    '%</span>' +
                    '，企业总量<span style="font-weight:bold;color:blue">' +
                    current.classDataSum_me.toFixed(2) +
                    '</span>'
                  )
                } else if (current.percent_me > current.percent_others) {
                  return accumulator
                }
                return accumulator
              }, '')
              pie_ana.describe
                .push(`👋企业整体碳排放量低于行业平均水平，其中${notFitDetail_3}。种种迹象表明企业具有良好的减排低碳手段和方法，这一点值得肯定和发扬。但是我们注意到以上几个模块的能源占比均不同于同行业其他企业，有可能是企业结构风险导致，我们建议：
              <br/><br/>🔵<b>创新驱动</b>：继续加大创新力度，积极探索更多低碳技术和管理模式。这将进一步提升贵企业的竞争力和可持续发展能力，为整个行业树立绿色发展的典范。🌞
              <br/>🟣<b>结构优化</b>：关注整体碳排放结构的平衡。合理调整资源配置和生产策略，优化模块平衡。这将有助于贵企业在绿色发展的道路上稳步前行。🆕
              <br/><br/>创新是重要的生产力，希望企业积极探索，勇于实践，同时关注结构平衡，我们一起努力🔖🌏`)
              horizontal_ana.describe
                .push(`👋企业的碳排放量低于行业平均水平，这一成就充分展示了贵企业在环保领域的创新能力，同时也体现了贵企业绿色发展战略的初步成效${notFitDetail_3}。然而，我们也注意到其占比与市场平均存在差异，这可能暗示着企业内部结构的一些失衡：
              <br/><br/>🟠<b>绿色技术创新</b>：加大研发投入，推动绿色技术的创新与应用。积极探索更多低碳技术和管理模式。引入智能化能源管理系统，🚀
              <br/>🟠<b>结构优化</b>：关注整体碳排放结构的平衡。合理调整资源配置和生产策略，优化模块平衡。这将有助于贵企业在绿色发展的道路上达到飞跃🛫。
              <br/><br/>未来已来，绿色的低碳型企业正在召唤我们，希望企业能坚守初心，一路前行🌱`)
            }
          }
        }
      }

      this.ana.msgs[0] = horizontal_ana
      this.ana.msgs[1] = vertical_ana
      this.ana.msgs[2] = pie_ana

      this.changeAnalyze()
    },
    initTrade() {
      // 计算企业的剩余交易量
      // let remainPublishEmission = this.publishTradeData.reduce((pre, cur) => {
      //   return pre + cur.emission
      // }, 0)
      // let remainPublishNum = this.publishTradeData.reduce((pre, cur) => {
      //   if (cur.tradeStatus === 'YES') {
      //     return pre
      //   } else {
      //     return pre + 1
      //   }
      // }, 0)
      // let allPublishNum = this.publishTradeData.length

      // let orderEmissionSum = this.orderData.reduce((pre, cur) => {
      //   return pre + cur.dealNum
      // }, 0)
      // let orderNum = this.orderData.length

      let shougouNum_publish = this.publishTradeData.reduce((pre, cur) => {
        // 甲方发布买需求
        if (cur.tradeType == 'SALE') {
          return pre + 1
        } else {
          return pre
        }
      }, 0)
      let shoumaiNum_publish = this.publishTradeData.reduce((pre, cur) => {
        if (cur.tradeType == 'SOLD') {
          return pre + 1
        } else {
          return pre
        }
      }, 0)
      let shougouNum_Order = this.orderData.reduce((pre, cur) => {
        // 甲方发布买需求
        if (cur.tradeType == 'SOLD') {
          return pre + 1
        } else {
          return pre
        }
      }, 0)
      let shoumaiNum_Order = this.orderData.reduce((pre, cur) => {
        // 甲方发布买需求
        if (cur.tradeType == 'SALE') {
          return pre + 1
        } else {
          return pre
        }
      }, 0)
      this.tradeStatistic.shougouNum_Order = shougouNum_Order
      this.tradeStatistic.shoumaiNum_publish = shoumaiNum_publish
      this.tradeStatistic.shougouNum_publish = shougouNum_publish
      this.tradeStatistic.shoumaiNum_Order = shoumaiNum_Order

      let data_ =
        (shoumaiNum_Order + shoumaiNum_publish) /
        (shoumaiNum_Order + shoumaiNum_publish + shougouNum_publish + shougouNum_Order)

      // console.log(data_)
      if (data_ <= 0.4) {
        this.tradeStatistic.type = this.$t('dashboard.data_analysis.content.jiaoyi.EnterpriseType.shougou')
        this.tradeStatistic.color = '#20c997'
      } else if (data_ <= 0.6) {
        this.tradeStatistic.type = this.$t('dashboard.data_analysis.content.jiaoyi.EnterpriseType.pingheng')
        this.tradeStatistic.color = '#5c7cfa'
      } else {
        this.tradeStatistic.type = this.$t('dashboard.data_analysis.content.jiaoyi.EnterpriseType.shoumai')
        this.tradeStatistic.color = '#fd7e14'
      }

      const spec = {
        type: 'gauge',
        data: [
          {
            id: 'pointer',
            values: [
              {
                type: '售卖订单占比',
                value: data_,
              },
            ],
          },
          {
            id: 'segment',
            values: [
              {
                type: '收购型',
                color: '#07A35A',
                value: 0.4,
              },
              {
                type: '平衡型',
                color: '#FFC528',
                value: 0.6,
              },
              {
                type: '售卖型',
                color: '#E33232',
                value: 1.0,
              },
            ],
          },
        ],
        gauge: {
          type: 'gauge',
          dataIndex: 1,
          categoryField: 'type',
          valueField: 'value',
          seriesField: 'type',
          segment: {
            style: {
              cornerRadius: 10,
              fill: (datum) => datum['color'],
            },
          },

          label: {
            visible: true,
            position: 'inside-outer',
            offsetRadius: 10,
            style: {
              text: (datum) => datum['type'],
            },
          },
        },
        pointer: {
          width: 0.5,
          height: 0.75,

          style: {
            fill: '#666666',
          },
        },
        categoryField: 'type',
        valueField: 'value',
        outerRadius: 1.0,
        innerRadius: 0.9,
        startAngle: -210,
        endAngle: 30,
        axes: [
          {
            type: 'linear',
            orient: 'angle',
            inside: true,
            outerRadius: 1.0,
            innerRadius: 0.9,
            grid: { visible: false },
          },
        ],

        title: {
          // text: '售卖型订单&发布交易占比',
          subtext: '售卖型订单&发布交易占比:' + (data_ * 100).toFixed(2) + '%',
          orient: 'bottom',
          align: 'center',
        },
      }
      if (this.hasMyOrderAndTrade) {
        const vchart = new VChart(spec, { dom: 'trade' })
        vchart.renderSync()
      }

      // Just for the convenience of console debugging, DO NOT COPY!
      // window['vchart'] = vchart
    },
    initVertical() {
      let data_ = []
      let v_dataSource = this.verticalData.sort((a, b) => {
        return a.taskYear - b.taskYear
      })
      for (let i = 0; i < v_dataSource.length; i++) {
        for (let j = 0; j < v_dataSource[i].children.length; j++) {
          data_.push({
            year: v_dataSource[i].taskYear,
            class_type: v_dataSource[i].children[j].className,
            value: v_dataSource[i].children[j].classDataSum,
          })
        }
        data_.push({
          year: v_dataSource[i].taskYear,
          class_type: '总和',
          value: this.verticalData[i].sumEmission,
        })
      }
      const spec = {
        type: 'line',
        data: {
          values: [...data_],
        },
        title: {
          visible: false,
          text: 'Stacked line chart',
        },
        stack: false,
        xField: 'year',
        yField: 'value',
        seriesField: 'class_type',
        lineLabel: { visible: true },
        legends: [{ visible: true, position: 'middle', orient: 'bottom' }],
      }

      const vchart = new VChart(spec, { dom: 'vertical' })
      vchart.renderSync()

      // Just for the convenience of console debugging, DO NOT COPY!
      // window['vchart'] = vchart
      // 打印一串helloworld
    },
    initHorizontal() {
      let noMyEnterpriseIdx = 1
      let data_val_sum = []
      let data_class = []
      // 找出this.horizontalData[i].isMy==true的那一项
      this.horizontalData.forEach((item) => {
        if (item.isMy == true) {
          data_val_sum.push({
            x: '本企业',
            type: '总和',
            y: item.sumEmission,
          })
          for (let i = 0; i < item.children.length; i++) {
            data_class.push({
              x: '本企业',
              type: item.children[i].className,
              y: item.children[i].classDataSum,
            })
          }
        }
      })
      for (let i = 0; i < this.horizontalData.length; i++) {
        if (this.horizontalData[i].isMy == false) {
          data_val_sum.push({
            x: '企业' + noMyEnterpriseIdx,
            type: '总和',
            y: this.horizontalData[i].sumEmission,
          })
          for (let j = 0; j < this.horizontalData[i].children.length; j++) {
            data_class.push({
              x: '企业' + noMyEnterpriseIdx,
              type: this.horizontalData[i].children[j].className,
              y: this.horizontalData[i].children[j].classDataSum,
            })
          }
          noMyEnterpriseIdx++
        } else {
          continue
        }
      }

      const spec = {
        type: 'common',
        seriesField: 'color',
        data: [
          {
            id: 'id0',
            values: [
              ...data_class,
              // { x: '周一', type: '早餐', y: 15 },
              // { x: '周一', type: '午餐', y: 25 },
              // { x: '周二', type: '早餐', y: 12 },
              // { x: '周二', type: '午餐', y: 30 },
              // { x: '周三', type: '早餐', y: 15 },
              // { x: '周三', type: '午餐', y: 24 },
              // { x: '周四', type: '早餐', y: 10 },
              // { x: '周四', type: '午餐', y: 25 },
              // { x: '周五', type: '早餐', y: 13 },
              // { x: '周五', type: '午餐', y: 20 },
              // { x: '周六', type: '早餐', y: 10 },
              // { x: '周六', type: '午餐', y: 22 },
              // { x: '周日', type: '早餐', y: 12 },
              // { x: '周日', type: '午餐', y: 19 },
            ],
          },
          {
            id: 'id1',
            values: [...data_val_sum],
          },
        ],
        series: [
          {
            type: 'bar',
            dataIndex: 0,
            label: { visible: true },
            seriesField: 'type',
            dataIndex: 0,
            xField: ['x', 'type'],
            yField: 'y',
            bar: {
              style: {
                cornerRadius: 5,
              },
            },
          },
          {
            type: 'area',
            dataIndex: 1,
            label: { visible: true },
            seriesField: 'type',
            xField: 'x',
            yField: 'y',
            stack: false,
            area: {
              style: {
                fillOpacity: 1,
                fill: {
                  gradient: 'linear',
                  x0: 0.5,
                  y0: 0,
                  x1: 0.5,
                  y1: 1,
                  stops: [
                    {
                      offset: 0,
                      opacity: 0.2,
                    },
                    {
                      offset: 1,
                      opacity: 0,
                    },
                  ],
                },
              },
            },
            point: {
              style: {
                symbolType: 'diamond',
              },
            },
          },
        ],
        axes: [{ orient: 'left' }, { orient: 'bottom', label: { visible: true }, type: 'band' }],
        legends: {
          visible: true,
          orient: 'bottom',
        },
      }

      const vchart = new VChart(spec, { dom: 'horizontal' })
      vchart.renderSync()

      // Just for the convenience of console debugging, DO NOT COPY!
      // window['vchart'] = vchart
    },
    initPie() {
      let data_class_my = []

      let data_class_others = []
      // 找出this.horizontalData[i].isMy==true的那一项
      this.horizontalData.forEach((item) => {
        if (item.isMy == true) {
          for (let i = 0; i < item.children.length; i++) {
            data_class_my.push({
              type: item.children[i].className,
              value: item.children[i].classDataSum,
            })
          }
          data_class_my.forEach((item_) => {
            item_.percent = ((item_.value / item.sumEmission) * 100).toFixed(2)
          })
        }
      })
      let isFirst = true
      let noMyEnterprise_sum = 0
      for (let i = 0; i < this.horizontalData.length; i++) {
        if (this.horizontalData[i].isMy == false) {
          noMyEnterprise_sum += this.horizontalData[i].sumEmission
          if (isFirst) {
            for (let j = 0; j < this.horizontalData[i].children.length; j++) {
              data_class_others.push({
                type: this.horizontalData[i].children[j].className,
                value: this.horizontalData[i].children[j].classDataSum,
              })
              isFirst = false
            }
          } else {
            //找到data_class_others.type与this.horizontalData[i].children[j].className相同的元素，并计算value
            for (let j = 0; j < this.horizontalData[i].children.length; j++) {
              data_class_others.forEach((item) => {
                if (item.type == this.horizontalData[i].children[j].className) {
                  item.value += this.horizontalData[i].children[j].classDataSum
                }
              })
            }
          }
        } else {
          continue
        }
      }
      // 计算data_class每一类占的百分比
      data_class_others.forEach((item) => {
        item.percent = ((item.value / noMyEnterprise_sum) * 100).toFixed(2)
      })
      // console.log(data_class_my, data_class_others)
      data_class_my = data_class_my.sort((a, b) => {
        return a.type - b.type
      })

      data_class_others = data_class_others.sort((a, b) => {
        return a.type - b.type
      })

      const spec = {
        type: 'common',
        data: [
          {
            id: 'id0',
            values: [
              // { type: '0~29', value: '126.04' },
              // { type: '30~59', value: '128.77' },
              // { type: '60 and over', value: '77.09' },
              ...data_class_my,
            ],
          },
          {
            id: 'id1',
            values: [
              // { type: '0~9', value: '119.12' },
              // { type: '10~19', value: '43.01' },
              // { type: '20~29', value: '43.91' },
              // { type: '30~39', value: '45.4' },
              // { type: '40~49', value: '40.89' },
              // { type: '50~59', value: '42.48' },
              // { type: '60~69', value: '39.63' },
              // { type: '70~79', value: '25.17' },
              // { type: '80 and over', value: '12.29' },
              ...data_class_others,
            ],
          },
        ],
        series: [
          {
            type: 'pie',
            dataIndex: 0,
            outerRadius: 0.65,
            innerRadius: 0,
            valueField: 'value',
            categoryField: 'type',
            label: {
              position: 'inside',
              visible: true,
              formatter: '{_percent_}%',
              style: {
                fill: 'white',
              },
            },
            pie: {
              style: {
                stroke: '#ffffff',
                lineWidth: 2,
              },
            },
            tooltip: {
              mark: {
                content: [
                  {
                    key: (datum) => '本企业：' + datum['type'],
                    value: (datum) => datum['percent'] + '%',
                  },
                ],
              },
            },
          },
          {
            type: 'pie',
            dataIndex: 1,
            outerRadius: 0.8,
            innerRadius: 0.67,
            valueField: 'value',
            categoryField: 'type',
            label: {
              visible: false,
            },
            pie: {
              style: {
                stroke: '#ffffff',
                lineWidth: 2,
              },
            },
            tooltip: {
              mark: {
                content: [
                  {
                    key: (datum) => '行业平均：' + datum['type'],
                    value: (datum) => datum['percent'] + '%',
                  },
                ],
              },
            },
          },
        ],
        // color: ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'],
        title: {
          visible: false,
          text: 'Population Distribution by Age in the United States, 2021 (in millions)',
          textStyle: {
            fontFamily: 'Times New Roman',
          },
        },
        legends: {
          visible: true,
          orient: 'bottom',
        },
      }

      const vchart = new VChart(spec, { dom: 'pie' })
      vchart.renderSync()

      // Just for the convenience of console debugging, DO NOT COPY!
      // window['vchart'] = vchart
    },
  },
}
</script>

<style lang="less" scoped>
@import './Workplace.less';

.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }

  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;

    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }

  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;

    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }

    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>

<style scoped>
.extra-content {
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 6px;
}

.aiCard {
  transition: all 0.3s ease-in-out;
}
.aiCard:hover {
  transform: translate3d(0, -5px, -20px) scale(1.05);
}

.aiDescription {
  background: linear-gradient(135deg, white 30%, #d0bfff, #fdb99b, white 70%);
  background-size: 200% 100%;
  animation: aidescription 7000ms linear infinite;
  background-position: 150% 50%;
}
/* 为var(--aidescriptionedge)设置动画，每100毫秒转动一圈 */

@keyframes aidescription {
  0% {
    background-position: 150% 50%;
  }
  100% {
    background-position: -50% 50%;
  }
  /* 100% {
    background-position: 150% 50%;
  } */
}

.cursor {
  position: relative;
  left: 10px;
  top: 5px;
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: #d0bfff;
  border-radius: 10px;
  animation: cursorBlink 0.5s infinite;
}
/* 实现一个闪烁效果的动画 */
@keyframes cursorBlink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>





