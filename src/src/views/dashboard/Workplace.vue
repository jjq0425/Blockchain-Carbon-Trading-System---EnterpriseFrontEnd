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
            <div id="vertical" style="width: 100%; height: 300px"></div>
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

const DataSet = require('@antv/data-set')

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper,
    Radar,
    aiLottie,
    aiModal,
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
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null,
          },
          hideFirstLine: false,
        },
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null,
          },
        },
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80,
        },
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 },
      ],
      radarData: [],
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
    fetchData() {
      this.initCharts()
    },
    initCharts() {
      this.initHorize()
      this.initVertical()
      this.initPie()
    },
    initHorize() {
      const spec = {
        type: 'line',
        data: {
          values: [
            { type: 'Eyeshadows', country: 'Africa', value: 3308 },
            { type: 'Eyeshadows', country: 'EU', value: 4572 },
            { type: 'Eyeshadows', country: 'China', value: 12043 },
            { type: 'Eyeshadows', country: 'USA', value: 12998 },
            { type: 'Eyeliner', country: 'Africa', value: 5432 },
            { type: 'Eyeliner', country: 'EU', value: 3417 },
            { type: 'Eyeliner', country: 'China', value: 15067 },
            { type: 'Eyeliner', country: 'USA', value: 12321 },
          ],
        },
        title: {
          visible: false,
          text: 'Stacked line chart',
        },
        stack: true,
        xField: 'type',
        yField: 'value',
        seriesField: 'country',
        lineLabel: { visible: true },
        legends: [{ visible: true, position: 'middle', orient: 'bottom' }],
      }

      const vchart = new VChart(spec, { dom: 'horizontal' })
      vchart.renderSync()

      // Just for the convenience of console debugging, DO NOT COPY!
      window['vchart'] = vchart
    },
    initVertical() {
      const spec = {
        type: 'common',
        seriesField: 'color',
        data: [
          {
            id: 'id0',
            values: [
              { x: '周一', type: '早餐', y: 15 },
              { x: '周一', type: '午餐', y: 25 },
              { x: '周二', type: '早餐', y: 12 },
              { x: '周二', type: '午餐', y: 30 },
              { x: '周三', type: '早餐', y: 15 },
              { x: '周三', type: '午餐', y: 24 },
              { x: '周四', type: '早餐', y: 10 },
              { x: '周四', type: '午餐', y: 25 },
              { x: '周五', type: '早餐', y: 13 },
              { x: '周五', type: '午餐', y: 20 },
              { x: '周六', type: '早餐', y: 10 },
              { x: '周六', type: '午餐', y: 22 },
              { x: '周日', type: '早餐', y: 12 },
              { x: '周日', type: '午餐', y: 19 },
            ],
          },
          {
            id: 'id1',
            values: [
              { x: '周一', type: '饮料', y: 22 },
              { x: '周二', type: '饮料', y: 43 },
              { x: '周三', type: '饮料', y: 33 },
              { x: '周四', type: '饮料', y: 22 },
              { x: '周五', type: '饮料', y: 10 },
              { x: '周六', type: '饮料', y: 30 },
              { x: '周日', type: '饮料', y: 50 },
            ],
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
          },
          {
            type: 'line',
            dataIndex: 1,
            label: { visible: true },
            seriesField: 'type',
            xField: 'x',
            yField: 'y',
            stack: false,
          },
        ],
        axes: [{ orient: 'left' }, { orient: 'bottom', label: { visible: true }, type: 'band' }],
        legends: {
          visible: true,
          orient: 'bottom',
        },
      }

      const vchart = new VChart(spec, { dom: 'vertical' })
      vchart.renderSync()

      // Just for the convenience of console debugging, DO NOT COPY!
      window['vchart'] = vchart
    },
    initPie() {
      const spec = {
        type: 'common',
        data: [
          {
            id: 'id0',
            values: [
              { type: '0~29', value: '126.04' },
              { type: '30~59', value: '128.77' },
              { type: '60 and over', value: '77.09' },
            ],
          },
          {
            id: 'id1',
            values: [
              { type: '0~9', value: '119.12' },
              { type: '10~19', value: '43.01' },
              { type: '20~29', value: '43.91' },
              { type: '30~39', value: '45.4' },
              { type: '40~49', value: '40.89' },
              { type: '50~59', value: '42.48' },
              { type: '60~69', value: '39.63' },
              { type: '70~79', value: '25.17' },
              { type: '80 and over', value: '12.29' },
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
          },
          {
            type: 'pie',
            dataIndex: 1,
            outerRadius: 0.8,
            innerRadius: 0.67,
            valueField: 'value',
            categoryField: 'type',
            label: {
              visible: true,
            },
            pie: {
              style: {
                stroke: '#ffffff',
                lineWidth: 2,
              },
            },
          },
        ],
        color: ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'],
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
</style>





