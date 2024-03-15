<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <div>
    <OneTimePwdAuth ref="OneTimePwdAuthModal" />
    <OneTimePwdCreate ref="OneTimePwdCreateModal" />
    <OneTimePwdSetting ref="OneTimePwdSettingModal" @Recreate="recreate" @initCreate="initCreate" />
    <a-list itemLayout="horizontal" :dataSource="data_">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
            <span class="security-list-description">{{ item.description }}</span>
            <span v-if="item.value"> : </span>
            <span class="security-list-value">{{ item.value }}</span>
          </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import OneTimePwdAuth from './OneTimePwd/OneTimePwdAuth'
import OneTimePwdCreate from './OneTimePwd/OneTimePwdCreate'
import OneTimePwdSetting from './OneTimePwd/OneTimePwdSetting'

import store from '@/store'
export default {
  components: {
    OneTimePwdAuth,
    OneTimePwdCreate,
    OneTimePwdSetting,
  },
  data() {
    return {
      data_: [
        // {
        //   title: this.$t('account.settings.security.password'),
        //   description: this.$t('account.settings.security.password-description'),
        //   value: '强',
        //   actions: {
        //     title: this.$t('account.settings.security.modify'),
        //     callback: () => {
        //       this.$message.info('This is a normal message')
        //     },
        //   },
        // },
        // {
        //   title: this.$t('account.settings.security.phone'),
        //   description: this.$t('account.settings.security.phone-description'),
        //   value: '138****8293',
        //   actions: {
        //     title: this.$t('account.settings.security.modify'),
        //     callback: () => {
        //       this.$message.success('This is a message of success')
        //     },
        //   },
        // },
        // {
        //   title: this.$t('account.settings.security.question'),
        //   description: this.$t('account.settings.security.question-description'),
        //   value: '',
        //   actions: {
        //     title: this.$t('account.settings.security.set'),
        //     callback: () => {
        //       this.$message.error('This is a message of error')
        //     },
        //   },
        // },
        {
          title: this.$t('account.Moresetting.form.enterpriseResponsibleEmail'),
          // this.$t('account.settings.security.email')
          description: this.$t('account.settings.security.email-description'),
          value:
            this.$store.state.user.info.enterpriseResponsibleEmail +
            '  ' +
            this.$t('account.security.enterpriseEmail.modifyNotice'),
          actions: {
            // title: this.$t('account.settings.security.modify'),
            // callback: () => {
            //   this.$message.warning('This is message of warning')
            // },
          },
        },
        {
          title: this.$t('account.settings.security.otp'),
          description: this.$t('account.settings.security.otp-description'),
          value: '',
          actions: {
            title: this.$t('account.settings.security.set'),
            callback: () => {
              // this.$message.info('This is a normal message')
              // console.log(this.$refs.OneTimePwdAuthModal.open())
              this.$refs.OneTimePwdSettingModal.open()
            },
          },
        },
      ],
    }
  },
  computed: {
    enterpriseInfo() {
      return this.$store.state.user.info
    },
  },
  methods: {
    recreate() {
      this.$refs.OneTimePwdCreateModal.open(true)
    },
    initCreate() {
      this.$refs.OneTimePwdCreateModal.open(false)
    },
  },
}
</script>

<style scoped>
</style>
