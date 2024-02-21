
<template>
  <div :class="wrpCls">
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
    <select-lang :class="prefixCls" style="color: aliceblue" />
    <span @click="() => this.$refs.NetworkSetting.open()">
      <a-icon type="api" style="color: aliceblue; margin-right: 20px; cursor: pointer" />
    </span>
    <network-setting ref="NetworkSetting"></network-setting>
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'
import NetworkSetting from './NetworkSetting.vue'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang,
    NetworkSetting,
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action',
    },
    isMobile: {
      type: Boolean,
      default: () => false,
    },
    topMenu: {
      type: Boolean,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showMenu: true,
      currentUser: {},
    }
  },
  computed: {
    wrpCls() {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${this.isMobile || !this.topMenu ? 'light' : this.theme}`]: true,
      }
    },
  },
  mounted() {
    setTimeout(() => {
      // this.currentUser = {
      //   name: 'Serati Ma',
      // }
      this.currentUser = this.$store.getters.userInfo
    }, 800)
  },
}
</script>
