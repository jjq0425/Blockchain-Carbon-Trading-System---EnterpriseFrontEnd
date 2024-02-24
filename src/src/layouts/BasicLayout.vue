<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :i18nRender="i18nRender"
    v-bind="settings"
    style="background-color: #f7f9fe"
  >
    <!-- <template v-slot:breadcrumbRender="{ route, params, routes }">
      <span v-if="routes.indexOf(route) === routes.length - 1"> {{ route.breadcrumbName }}</span>
      <router-link v-else :to="{ path: route.path, params }">
        {{ route.breadcrumbName }}
      </router-link>
    </template> -->

    <template v-slot:menuHeaderRender>
      <div>
        <img src="@/assets/logo.svg" />
        <h1 v-if="lang.includes('zh')">{{ title }}</h1>
        <!-- 标题测试 -->
        <h1 v-else style="font-size: 17px">CarbonChain</h1>
        <!-- 可用width来控制tag -->
        <img
          v-if="lang.includes('zh')"
          src="@/assets/header/EnterpriseSideIndication.png"
          style="width: auto; transform: scale(0.85) translateY(-10px)"
        />
        <img
          v-else
          src="@/assets/header/EnterpriseSideIndication_EN.png"
          style="width: auto; transform: scale(0.65) translateY(-15px)"
        />
      </div>
    </template>
    <!-- 1.0.0+ 版本 pro-layout 提供 API,
          增加 Header 左侧内容区自定义:https://sunshinelixun.github.io/pro-components/
    -->
    <template v-slot:headerContentRender>
      <div>
        <!-- <span> {{ route.breadcrumbName }}</span> -->
        <a-tooltip title="刷新页面">
          <a-icon type="reload" style="font-size: 18px; cursor: pointer" @click="reload()" />
        </a-tooltip>
      </div>
    </template>

    <!-- <setting-drawer v-if="isDev" :settings="settings" @change="handleSettingChange">
      <div style="margin: 12px 0">This is SettingDrawer custom footer content.</div>
    </setting-drawer> -->
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <!-- custom footer / 自定义Footer -->
    <template v-slot:footerRender>
      <global-footer />
    </template>
    <!-- <router-view /> -->
    <!-- <transition-group
      appear
      name="animate__animated animate__bounce "
      enter-active-class="animate__fadeIn animate__faster"
      leave-active-class="animate__fadeOut"
    > -->
    <router-view key="ROUTER_VIEW" />
    <!-- </transition-group> -->
  </pro-layout>
</template>

<script>
import { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout'
import { i18nRender } from '@/locales'
import { mapState } from 'vuex'
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'

import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
// import Ads from '@/components/Other/CarbonAds'

export default {
  name: 'BasicLayout',
  components: {
    SettingDrawer,
    RightContent,
    GlobalFooter,
  },
  data() {
    return {
      // preview.pro.antdv.com only use.
      isProPreviewSite: process.env.VUE_APP_PREVIEW === 'true' && process.env.NODE_ENV !== 'development',
      // end
      isDev: process.env.NODE_ENV === 'development' || process.env.VUE_APP_PREVIEW === 'true',

      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: defaultSettings.title,
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        hideHintAlert: false,
        hideCopyButton: false,
      },
      // 媒体查询
      query: {},

      // 是否手机模式
      isMobile: false,
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: (state) => state.permission.addRouters,
    }),
    lang() {
      return this.$store.getters.lang
    },
  },
  created() {
    console.log(this.mainMenu)
    const routes = this.mainMenu.find((item) => item.path === '/')
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }

    // first update color
    // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
    if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
      updateTheme(this.settings.primaryColor)
    }
  },
  methods: {
    i18nRender,
    reload() {
      // window.location.reload()
      this.$router.go(0)
    },
    handleMediaQuery(val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse(val) {
      this.collapsed = val
    },
    handleSettingChange({ type, value }) {
      console.log('type', type, value)
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          }
          break
      }
    },
  },
}
</script>

<style lang="less">
@import './BasicLayout.less';
</style>

<style >
/* modal和按钮、通知的圆角设置 */
.ant-modal-content {
  border-radius: 10px;
}

.ant-btn {
  border-radius: 8px;
}

.ant-modal-header {
  border: none;
  border-radius: 10px;
}

.ant-modal-header .ant-modal-title {
  font-weight: bold;
}

.ant-modal-footer {
  border: none;
}

.ant-notification-notice {
  border-radius: 10px !important;
}
.ant-notification-notice-message {
  font-weight: bold;
}
.ant-message-notice-content {
  border-radius: 999px;
  border: 1px solid #748ffc;
}

/* 错误提示，仿照arco */
/* .has-error .ant-input-affix-wrapper .ant-input {
  background: rgba(255, 227, 227, 0.3) !important;
} */

.ant-input-search-enter-button + .ant-input-group-addon,
.ant-input-search-enter-button input + .ant-input-group-addon {
  background: transparent !important;
}

.ant-input {
  background: #f2f3f5 !important;
  border: 1px solid #f2f3f5 !important;
}

.ant-input:focus {
  background: #fff !important;
  border: 1px solid #134089 !important;
}

.has-error .ant-input {
  background: rgba(255, 227, 227, 0.3) !important; /* 初始颜色 */
  border: 1px solid red !important;
  animation: ERRORINPUTbackgroundColorChange 1s ease-in-out forwards !important;
}

.ant-input-number {
  background: #f2f3f5 !important;
  border: 1px solid #f2f3f5 !important;
}

.ant-input-number:focus {
  background: #fff !important;
  border: 1px solid #134089 !important;
}
.has-error .ant-input-number {
  background: rgba(255, 227, 227, 0.3) !important; /* 初始颜色 */
  border: 1px solid red !important;
  animation: ERRORINPUTbackgroundColorChange 1s ease-in-out forwards !important;
}

.ant-select-selection {
  background: #f2f3f5 !important;
  border: 1px solid #f2f3f5 !important;
}

.ant-select-selection:focus {
  background: #fff !important;
  border: 1px solid #134089 !important;
}

.ant-select-disabled .ant-select-selection {
  color: #c9cdd4 !important;
  background: #e8e9eb !important;
  border: 1px solid #e8e9eb !important;
  /* border: 1px solid #ced4da !important; */
}

.has-error .ant-select-selection {
  background: rgba(255, 227, 227, 0.3) !important;
  border: 1px solid red !important;
  animation: ERRORINPUTbackgroundColorChange 1s ease-in-out forwards !important;
}

.ant-time-picker-input {
  background: #f2f3f5 !important;
  border: 1px solid #f2f3f5 !important;
}

.ant-time-picker-input:focus {
  background: #fff !important;
  border: 1px solid #134089 !important;
}

.has-error .ant-time-picker-input {
  background: rgba(255, 227, 227, 0.3) !important;
  border: 1px solid red !important;
  animation: ERRORINPUTbackgroundColorChange 1s ease-in-out forwards !important;
}

@keyframes ERRORINPUTbackgroundColorChange {
  25% {
    background: rgba(255, 227, 227, 0.3) !important; /* 中间颜色 */
  }
  60% {
    background: #f2f3f5 !important; /* 最终颜色 */
  }
  85% {
    background: rgba(255, 227, 227, 0.3) !important; /* 中间颜色 */
  }
  100% {
    background: #f2f3f5 !important; /* 最终颜色 */
  }
}

/* 前后缀 */
.ant-input-group-addon {
  background: #f2f3f5 !important; /* 初始颜色 */
  color: #343a40 !important;
  border: none !important;
}
/* .ant-dropdown-menu-item-selected {
  background-color: #f1f5f7 !important;
} */
.ant-dropdown-menu-item:hover,
.ant-dropdown-menu-submenu-title:hover {
  background-color: #f1f5f7 !important;
}

.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
  background: #e0ebf033 !important;
}

.ant-table-thead > tr > th {
  background: #f1f5f9 !important;
  font-weight: bold !important;
}
.ant-table-thead > tr:first-child > th:first-child {
  border-radius: 7px 0px 0px 0px !important;
}
.ant-table-thead > tr:first-child > th:last-child {
  border-radius: 0px 7px 0px 0px !important;
}

/* 滚动条 */

/* 滚动条整体样式 */
::-webkit-scrollbar {
  width: 5px; /* 设置滚动条的宽度 */
  /* height: 2000000000000000px; */
}

/* 滚动轨迹的样式 */
::-webkit-scrollbar-track {
  background: transparent; /* 设置滚动轨迹的背景颜色 */
}

/* 滚动滑块的样式 */
::-webkit-scrollbar-thumb {
  background: #adb5bd; /* 设置滚动滑块的背景颜色 */
  border-radius: 100px; /* 设置滚动滑块的圆角 */
  transition: all 0.3s ease-in-out;
}

/* 当鼠标悬停在滚动滑块上时的样式 */
::-webkit-scrollbar-thumb:hover {
  background: #868e96; /* 设置鼠标悬停时滚动滑块的背景颜色 */
}

/* 步骤条 */
.ant-steps-label-horizontal .ant-steps-item-active .ant-steps-item-icon {
  /* box-shadow: 0 0 5px #f2f3f5; */
  animation: STEPBORDERcolorChange 2s infinite;
}
.ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
  font-weight: bold;
}
.ant-steps-item-finish .ant-steps-item-icon {
  background-color: #e8f3ff !important;
}
@keyframes STEPBORDERcolorChange {
  0% {
    border: 2px solid #1890ff;
  }
  50% {
    border: 2px solid white;
  }
  100% {
    border: 2px solid #1890ff;
  }
}

.ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
  background: #134089;
  animation: STEPBGcolorChange 1.5s infinite;
}
@keyframes STEPBGcolorChange {
  0% {
    background: #134089;
    box-shadow: 0 0 5px #1890ff;
  }
  50% {
    background: #1890ff;
    box-shadow: 0 0 5px white;
  }
  100% {
    background: #134089;
    box-shadow: 0 0 5px #1890ff;
  }
}

/* 底部提交 */
.ant-pro-footer-toolbar {
  background: linear-gradient(30deg, #edf2ff, white) !important;
  box-shadow: 0px 0 3px #adb5bd !important;
  /* animation: FooterBGcolorChange 1.5s infinite; */
}

.ant-pro-page-header-search {
  border-radius: 100px;
}

/* 解决侧边栏太空 */
.ant-menu-item {
  margin-top: 15px !important;
  margin-bottom: 20px !important;
}
.ant-menu-submenu {
  margin-top: 15px !important;
  margin-bottom: 20px !important;
}
.ant-menu-submenu .ant-menu-item {
  margin-top: 5px !important;
  margin-bottom: 10px !important;
}

.ant-menu-item .anticon,
.ant-menu-submenu-title .anticon {
  font-size: 18px;
}

.ant-menu-item-selected > a {
  font-weight: bold;
}

.ant-pro-sider-menu-sider.fix-sider-bar .ant-menu-inline {
  background: transparent;
}
.ant-pro-sider-menu-sider.light .ant-menu-light {
  background: url('@/assets/beauty/sidebar/sidebar.png');
  background-position: -100% 0%;
  backdrop-filter: blur(10px);
  /* animation: moveSideBarBackground 20s ease-in-out infinite;  */
}
@keyframes moveSideBarBackground {
  0% {
    background-position: -100% 0;
  }
  50% {
    background-position: -50% 30%;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
