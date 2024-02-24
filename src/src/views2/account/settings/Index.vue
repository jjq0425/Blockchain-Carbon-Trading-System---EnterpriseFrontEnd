<template>
  <page-header-wrapper
    class="page-header-index-wide"
    content="段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态， 提供跨越设计与开发的体验解决方案。"
  >
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
          <img style="height: 100%; transform: scale(1.2)" src="@/assets/beauty/pageRight/Setting.png" />
        </div>
      </transition-group>

      <div style="height: 30px"></div>
    </template>
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="account-settings-info-main" :class="{ mobile: isMobile }">
        <div class="account-settings-info-left">
          <a-menu
            :mode="isMobile ? 'horizontal' : 'inline'"
            :style="{ border: '0', width: isMobile ? '560px' : 'auto' }"
            :selectedKeys="selectedKeys"
            type="inner"
            @openChange="onOpenChange"
          >
            <a-menu-item key="/account/basic">
              <router-link :to="{ name: 'BasicSettings' }"> {{ $t('account.settings.menuMap.basic') }} </router-link>
            </a-menu-item>
            <a-menu-item key="/account/security">
              <router-link :to="{ name: 'SecuritySettings' }">
                {{ $t('account.settings.menuMap.security') }}
              </router-link>
            </a-menu-item>
            <a-menu-item key="/account/custom">
              <router-link :to="{ name: 'CustomSettings' }">
                {{ $t('account.settings.menuMap.custom') }}
              </router-link>
            </a-menu-item>
            <a-menu-item key="/accounts/binding">
              <router-link :to="{ name: 'BindingSettings' }">
                {{ $t('account.settings.menuMap.binding') }}
              </router-link>
            </a-menu-item>
            <a-menu-item key="/account/notification">
              <router-link :to="{ name: 'NotificationSettings' }">
                {{ $t('account.settings.menuMap.notification') }}
              </router-link>
            </a-menu-item>
          </a-menu>
        </div>
        <div class="account-settings-info-right">
          <div class="account-settings-info-title">
            <span>{{ $t($route.meta.title) }}</span>
          </div>
          <route-view></route-view>
        </div>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { RouteView } from '@/layouts'
import { baseMixin } from '@/store/app-mixin'
import ChangeBgCSS from '../../../utils/ChangeBgCSS'

export default {
  components: {
    RouteView,
  },
  mixins: [baseMixin],
  data() {
    return {
      // horizontal  inline
      mode: 'inline',

      openKeys: [],
      selectedKeys: [],

      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1],
      },

      pageTitle: '',
    }
  },
  mounted() {
    this.updateMenu()
    ChangeBgCSS('SETTING')
  },
  methods: {
    onOpenChange(openKeys) {
      this.openKeys = openKeys
    },
    updateMenu() {
      const routes = this.$route.matched.concat()
      this.selectedKeys = [routes.pop().path]
    },
  },
  watch: {
    $route(val) {
      this.updateMenu()
    },
  },
}
</script>

<style lang="less" scoped>
.account-settings-info-main {
  width: 100%;
  display: flex;
  height: 100%;
  overflow: auto;

  &.mobile {
    display: block;

    .account-settings-info-left {
      border-right: unset;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 50px;
      overflow-x: auto;
      overflow-y: scroll;
    }
    .account-settings-info-right {
      padding: 20px 40px;
    }
  }

  .account-settings-info-left {
    border-right: 1px solid #e8e8e8;
    width: 224px;
  }

  .account-settings-info-right {
    flex: 1 1;
    padding: 8px 40px;

    .account-settings-info-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 12px;
    }
    .account-settings-info-view {
      padding-top: 12px;
    }
  }
}
</style>
