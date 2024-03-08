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
              <div style="display: inline-block; font-size: 24px; font-weight: bold; padding: 10px">同业对标</div>
              <div style="display: inline-block; font-size: 12px; padding: 10px">
                随机对等分析行业内四个企业碳排动态与表现
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
              <div style="display: inline-block; font-size: 24px; font-weight: bold; padding: 10px">往绩洞悉</div>
              <div style="display: inline-block; font-size: 12px; padding: 10px">
                对本公司往昔碳排量数据进行纵向分析
              </div>
            </div>

            <!-- 页面 -->
            <div id="vertical" style="width: 100%; height: 300px" v-show="hasMy"></div>
            <a-result title="暂无您企业的任何填报数据" sub-title="填报后即可查看分析" v-show="!hasMy">
              <template #icon><img style="height: 200px" src="@/assets/default/EmptyInfo.png" /> </template
            ></a-result>
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
              <div style="font-size: 30px; color: black">智碳 AI</div>
              <div
                style="
                  font-size: 40px;
                  background: linear-gradient(90deg, #4752e6, #de81de);
                  background-clip: text;
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                "
              >
                领航员
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
            <div style="display: inline-block; font-size: 24px; font-weight: bold; padding: 10px">排量分布</div>
            <div style="display: inline-block; font-size: 12px; padding: 10px">
              内圈为本企业各模块占比，外圈为其他企业平均各模块占比，您可以据此分析各模块是否健康。
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
              <div style="display: inline-block; font-size: 24px; font-weight: bold; padding: 10px">智感评估</div>
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
                正在智能分析数据中
              </div>
              <aiAnalyzeLottie></aiAnalyzeLottie>

              <!-- 文本测试 -->
              <div v-show="!ana.isAnalysizing" style="margin-bottom: 30px" class="animate__fadeIn animate__animated">
                <div style="font-size: 18px; font-weight: 700; color: #4263eb">{{ ana.msgs[ana.nowType].title }}</div>
                <div style="margin-top: 10px">
                  {{ ana.msgLiushi }}
                  <div class="cursor" v-show="ana.noChange == true && ana.isAnalysizing == false"></div>
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
                  >去问AI：如何减排</a-button
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
                  >去交易市场逛逛</a-button
                >
              </div>
              <a-button
                type="text"
                style="border-radius: 999px; border: none; float: right; margin-top: 10px"
                icon="sync"
                @click="changeAnalyze"
                :disabled="ana.noChange"
                >换个维度</a-button
              >
            </div>
          </a-card>
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
      hasMy: true,

      ana: {
        isAnalysizing: true,
        msgLiushi: '',
        nowType: 2,
        noChange: false,
        msgs: [
          {
            title: '维度一：横向对比',
            describe:
              '根据横向对比分析，该企业在同行业内温室气体排放表现相对优秀。相较于其他同类企业，该企业不仅在排放量上显著低于行业平均水平，而且在环保措施和节能减排技术应用方面也处于领先地位。这一成就不仅有助于企业降低运营成本，提高市场竞争力，同时也展现了企业对履行社会责任的坚定承诺和对可持续发展的深入践行。在日益强调绿色发展和低碳经济的今天，该企业的这一表现无疑为行业树立了标杆，也为其他企业提供了值得借鉴的经验。',
          },
          {
            title: '维度二：纵向对比',
            describe:
              '通过纵向对比分析，我们发现该企业在历史碳排放数据上的表现呈现出明显的改善和下降趋势。与过去几年相比，该企业的碳排放量有了显著的减少，这充分展示了企业在环保领域的努力和成效。企业能够在减少碳排放方面取得进展，不仅有助于保护环境，减少温室气体排放，也为企业在绿色经济中的长远发展奠定了坚实的基础。因此，该企业的这一积极变化是值得肯定的，同时也为其他企业树立了减排降碳的榜样。',
          },
          {
            title: '维度三：模块分布对比',
            describe:
              '经过对各模块数据的细致分析和行业对比，我们得出结论：该企业在碳排放的各个细分领域与同行业平均水平大致相当，没有出现显著的差异。进一步分析显示，企业各模块的排放量占比分布合理，没有出现某个特定模块的碳排放异常偏高或偏低的情况。总之，该企业在碳排放管理上已经展现出一定的稳健性，但仍需不断探索和实践，以期在日益严峻的环境保护要求下，不断提升自身的绿色竞争力，实现可持续发展。',
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

      setTimeout(() => {
        this.ana.isAnalysizing = false
        // this.ana.msgLiushi = this.ana.msgs[this.ana.nowType].describe
        let index = 0
        let timer
        timer = setInterval(() => {
          if (index < this.ana.msgs[this.ana.nowType].describe.length) {
            this.ana.msgLiushi += this.ana.msgs[this.ana.nowType].describe.charAt(index)
            index++
          } else {
            this.ana.noChange = false
            clearInterval(timer)
            timer = null
          }
        }, 40)
      }, 1000)
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
      await vertical().then((res) => {
        this.verticalData = res.data.datas
        this.hasMy = res.data.hasMy
      })
      await horizontal().then((res) => {
        this.horizontalData = res.data.datas
      })

      this.initCharts()
    },
    initCharts() {
      this.initHorizontal()
      this.initVertical()
      this.initPie()
      this.changeAnalyze()
    },
    initVertical() {
      let data_ = []
      let v_dataSource = this.verticalData.sort((a, b) => {
        return a.taskYear - b.taskYear
      })
      for (let i = 0; i < v_dataSource.length; i++) {
        data_.push({
          year: v_dataSource[i].taskYear,
          class_type: '总和',
          value: this.verticalData[i].sumEmission,
        })
        for (let j = 0; j < v_dataSource[i].children.length; j++) {
          data_.push({
            year: v_dataSource[i].taskYear,
            class_type: v_dataSource[i].children[j].className,
            value: v_dataSource[i].children[j].classDataSum,
          })
        }
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
      window['vchart'] = vchart
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
      window['vchart'] = vchart
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
      window['vchart'] = vchart
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





