<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div class="user-layout-lang">
        <!-- <select-lang class="select-lang-trigger" /> -->
        <span @click="() => this.$refs.NetworkSetting.open()">
          <a-icon type="api" style="color: aliceblue; margin-right: 20px; cursor: pointer" />
          <network-setting ref="NetworkSetting"></network-setting>
        </span>
      </div>

      <div class="user-layout-content" style="margin-top: 10px">
        <div style="display: flex; justify-content: center; align-items: center">
          <div
            class="user-layout-content-inner"
            style="
              background-color: white;
              border-right: 2px solid #f0f2f5;
              border-top: 2px solid #f0f2f5;
              border-bottom: 2px solid #f0f2f5;
              border-radius: 15px 15px 15px 15px;

              width: 80%;
              height: 700px;
              padding: 30px;
              padding-top: 50px;
            "
            v-if="!(bindAudit || BindStatus == 'AUDIT')"
          >
            <div>
              <div style="padding-left: 50px; display: flex; align-items: center">
                <div
                  style="
                    font-size: 26px;
                    color: rgba(0, 0, 0, 0.85);
                    font-weight: 600;
                    position: relative;
                    top: -10px;
                    right: 10px;
                  "
                >
                  👋请绑定企业信息
                </div>
                <a-alert
                  message="您的绑定信息被审核驳回，请根据审核要求认真重新填写提交信息，感谢您的配合"
                  type="warning"
                  show-icon
                  banner
                  style="margin: 0px auto; margin-top: -20px; margin-right: -10px"
                  v-show="BindStatus == 'REFUSE'"
                />
                <a-alert
                  message="请仔细填写所有信息，其将作为您企业碳排放报告的重要组成。提交后耐心等待审核。"
                  type="info"
                  show-icon
                  banner
                  style="margin: 0px auto; margin-top: -20px; margin-right: -10px"
                  v-show="BindStatus == 'WAIT'"
                />
              </div>
            </div>

            <div class="FormDiv">
              <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" style="margin-top: 20px">
                <a-row type="flex">
                  <a-col :flex="2"
                    ><a-form-item label="企业名">
                      <a-input
                        placeholder="请输入企业名"
                        v-decorator="['enterpriseName', { rules: [{ required: true, message: '请输入企业名' }] }]"
                      />
                    </a-form-item>
                    <a-form-item label="企业地址">
                      <a-textarea
                        :autosize="{ minRows: 3, maxRows: 3 }"
                        placeholder="请输入企业地址"
                        v-decorator="['enterprisePosition', { rules: [{ required: true, message: '请输入企业地址' }] }]"
                      />
                    </a-form-item>
                    <a-form-item label="企业组织机构代码">
                      <a-input
                        placeholder="请输入组织机构代码"
                        v-decorator="['enterpriseID', { rules: [{ required: true, message: '请输入组织机构代码' }] }]"
                      />
                      <div style="font-size: 10px; font-weight: bold; color: grey; margin-bottom: -10px">
                        请注意：组织机构代码非常重要，若审核通过将不允许更改！
                      </div>
                    </a-form-item>
                    <a-form-item label="企业性质">
                      <a-select
                        v-decorator="[
                          'enterpriseCharacter',
                          { rules: [{ required: true, message: '请选择企业性质' }] },
                        ]"
                        placeholder="请选择"
                        style="min-width: 180px"
                      >
                        <a-select-option value="国营企业"> 国有企业 </a-select-option>
                        <a-select-option value="集体所有制"> 集体所有制 </a-select-option>
                        <a-select-option value="私营企业"> 私营企业 </a-select-option>
                        <a-select-option value="股份制企业"> 股份制企业 </a-select-option>
                        <a-select-option value="有限合伙企业"> 有限合伙企业 </a-select-option>
                        <a-select-option value="合资企业"> 合资企业 </a-select-option>
                        <a-select-option value="外商投资企业"> 外商投资企业 </a-select-option>
                        <a-select-option value="个人独资企业"> 个人独资企业 </a-select-option>
                        <a-select-option value="股份合作企业"> 股份合作企业 </a-select-option>
                      </a-select>
                    </a-form-item>

                    <a-form-item label="企业所在行业">
                      <a-select
                        v-decorator="[
                          'enterpriseClass',
                          { rules: [{ required: true, message: '请选择企业所在行业' }] },
                        ]"
                        placeholder="请选择"
                        style="min-width: 180px"
                      >
                        <!-- <a-select-option value="1"> 发电 </a-select-option>
                        <a-select-option value="10" disabled> 民航 </a-select-option> -->
                        <template v-for="(item, index) in enterpriseClassNameOptions">
                          <template v-if="enterpriseClassAllowed.includes(index + 1)"
                            ><a-select-option :value="(index + 1).toString()" :key="(index + 1).toString()">
                              {{ item }}
                            </a-select-option>
                          </template>
                        </template>
                      </a-select>
                      <div style="font-size: 10px; font-weight: bold; color: grey">
                        不同行业对应碳排放报告内容不同，请务必选择正确。
                      </div>
                    </a-form-item>
                  </a-col>
                  <a-col :flex="3"
                    ><a-form-item label="企业法人">
                      <a-input
                        placeholder="请输入法人姓名"
                        v-decorator="[
                          'enterpriseLegelPerson',
                          { rules: [{ required: true, message: '请输入企业法人姓名' }] },
                        ]"
                      >
                        <template #addonBefore>
                          <a-icon type="user" />
                        </template>
                      </a-input>
                    </a-form-item>
                    <a-form-item label="企业填报负责人">
                      <a-input
                        placeholder="请输入企业填报负责人姓名"
                        v-decorator="[
                          'enterpriseResponsiblePerson',
                          { rules: [{ required: true, message: '请输入企业填报负责人姓名' }] },
                        ]"
                      >
                        <template #addonBefore>
                          <a-icon type="user" />
                        </template>
                      </a-input>
                    </a-form-item>
                    <a-form-item label="填报负责人邮箱">
                      <a-input
                        placeholder="请输入企业填报负责人邮箱"
                        v-decorator="[
                          'enterpriseResponsibleEmail',
                          {
                            rules: [
                              { required: true, message: '请输入企业填报负责人邮箱' },
                              { type: 'email', message: '请输入正确的邮箱格式' },
                            ],
                          },
                        ]"
                      >
                        <template #addonBefore>
                          <a-icon type="mail" />
                        </template>
                      </a-input>
                    </a-form-item>
                    <a-form-item label="企业简介">
                      <a-textarea
                        :autosize="{ minRows: 9, maxRows: 9 }"
                        size="large"
                        placeholder="请输入企业简介"
                        :maxLength="300"
                        v-decorator="[
                          'enterpriseDescription',
                          { rules: [{ required: true, message: '请输入企业简介' }] },
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </div>

            <div style="display: flex">
              <a-button
                style="margin-left: 44%; transform: translateX(-50%)"
                icon="vertical-right"
                :disabled="bindloading"
                @click="backToLogin()"
              >
                返回登录页
              </a-button>
              <a-button
                type="primary"
                style="margin-left: 15px; transform: translateX(-50%)"
                @click="submitBind"
                :loading="bindloading"
              >
                提交绑定信息
              </a-button>
            </div>

            <!-- <router-view /> -->

            <div class="footer"></div>
          </div>
          <div
            class="user-layout-content-inner"
            style="
              background-color: white;
              border-right: 2px solid #f0f2f5;
              border-top: 2px solid #f0f2f5;
              border-bottom: 2px solid #f0f2f5;
              border-radius: 15px 15px 15px 15px;

              width: 80%;
              height: 700px;
              padding: 30px;
              padding-top: 50px;
            "
            v-if="bindAudit || BindStatus == 'AUDIT'"
          >
            <div>
              <div style="padding-left: 50px; display: flex; align-items: center">
                <div
                  style="
                    font-size: 26px;
                    color: rgba(0, 0, 0, 0.85);
                    font-weight: 600;
                    position: relative;
                    top: -10px;
                    right: 10px;
                  "
                >
                  👋绑定信息审核中...
                </div>
              </div>
            </div>
            <a-result title="您的信息仍在审核中" sub-title="审核需要一定时间，请您耐心等待！感谢您的理解与支持！">
              <template #icon>
                <a-icon type="clock-circle" theme="filled" style="color: #108ee9; margin-bottom: 30px" />
              </template>
              <template #extra>
                <a-button key="console" type="primary" @click="backToLogin()"> 返回登录页 </a-button>
              </template>
            </a-result>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'
import SelectLang from '@/components/SelectLang'
import { Carousel } from 'ant-design-vue'
import NetworkSetting from '@/components/GlobalHeader/NetworkSetting.vue'
import store from '@/store'
import { Bind } from '@/api/login'

import { enterpriseClassName_CN, enterpriseClassName_EN, enterpriseClassAllowed } from '@/config/class/enterpriseClass'

export default {
  name: 'BindLayout',
  components: {
    SelectLang,
    Carousel,
    NetworkSetting,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      bindloading: false,
      bindAudit: false,

      enterpriseClassNameOptions: [],

      enterpriseClassName_CN: enterpriseClassName_CN,
      enterpriseClassName_EN: enterpriseClassName_EN,
      enterpriseClassAllowed: enterpriseClassAllowed,
    }
  },
  mixins: [deviceMixin],
  computed: {
    BindStatus() {
      return this.$store.state.user.info.BindStatus
    },
    lang() {
      return this.$store.state.app.lang
    },
  },
  created() {
    if (this.lang.includes('zh')) {
      this.enterpriseClassNameOptions = Object.entries(this.enterpriseClassName_CN).map((entry) => entry[1])
    } else {
      this.enterpriseClassNameOptions = Object.entries(this.enterpriseClassName_EN).map((entry) => entry[1])
    }
    console.log(this.enterpriseClassNameOptions)
  },
  methods: {
    backToLogin() {
      // console.log('backToLogin')
      store.dispatch('Logout').then(() => {
        this.$router.push({ name: 'login' })
      })
    },
    submitBind() {
      this.bindloading = true
      const {
        form: { validateFields },
      } = this
      validateFields({ force: true }, (err, values) => {
        if (!err) {
          // console.log('Received values of form: ', )
          let TMP = JSON.parse(JSON.stringify(this.form.getFieldsValue()))
          TMP.enterpriseClass = parseInt(TMP.enterpriseClass)
          Bind(TMP)
            .then((res) => {
              this.bindloading = false
              this.$message.success('绑定信息提交成功，等待审核')
              this.bindAudit = true
            })
            .catch((err) => {
              this.bindloading = false
              this.$message.error('绑定信息提交失败' + err.response.data.message)
            })
        } else {
          this.$message.warning('请补全信息')
          this.bindloading = false
        }
      })
    },
  },
  mounted() {
    // 设置全局禁止滚动
    document.body.style.overflow = 'hidden'
    document.body.classList.add('userLayout')
    if (this.BindStatus == 'AUDIT') {
      this.$notification.open({
        message: '绑定审核中',
        description: '您的绑定信息正在审核中，请耐心等待',
        icon: <a-icon type="smile" style="color: #108ee9" />,
      })
    } else if (this.BindStatus == 'WAIT') {
      this.$notification.open({
        message: '请绑定企业信息',
        description: '请您绑定企业相关信息',
        icon: <a-icon type="link" style="color: #fd7e14" />,
      })
    } else if (this.BindStatus == 'REFUSE') {
      this.$notification.open({
        message: '绑定审核未通过',
        description: '您的绑定信息审核未通过，请重新绑定',
        icon: <a-icon type="exclamation-circle" style="color: #f5222d" />,
      })
    }
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout')
    // 设置全局禁止滚动
    document.body.style.overflow = ''
  },
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f7f9fe url(~@/assets/background.svg) no-repeat 50%;
    background: #4e73df url(~@/assets/background.svg) no-repeat 50%;
    background: url(~@/assets/bg_bind);
    background-size: 100%;
    //padding: 50px 0 84px;
    position: relative;

    .user-layout-lang {
      width: 100%;
      height: 40px;
      line-height: 44px;
      text-align: right;

      .select-lang-trigger {
        cursor: pointer;
        padding: 12px;
        margin-right: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        vertical-align: middle;
      }
    }

    .user-layout-content {
      padding: 32px 0 24px;

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, 0.85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        // width: 368px;
        margin: 0 auto;
      }

      .footer {
        // position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }

    a {
      text-decoration: none;
    }
  }
}
</style>

<style scoped>
.body {
  overflow: hidden;
}
</style>



