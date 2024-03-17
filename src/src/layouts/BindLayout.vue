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

      <div class="user-layout-content" style="margin-top: -25px">
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
                  👋{{ $t('user.bind.header.title') }}
                </div>
                <a-alert
                  :message="$t('user.bind.header.refuse')"
                  type="warning"
                  show-icon
                  banner
                  style="margin: 0px auto; margin-top: -20px; margin-right: -10px"
                  v-show="BindStatus == 'REFUSE'"
                />
                <a-alert
                  :message="$t('user.bind.header.wait')"
                  type="info"
                  show-icon
                  banner
                  style="margin: 0px auto; margin-top: -20px; margin-right: -10px"
                  v-show="BindStatus == 'WAIT'"
                />
              </div>
            </div>

            <div class="FormDiv" style="max-height: 520px; overflow-y: scroll">
              <div
                v-if="BindStatus == 'REFUSE'"
                style="
                  width: 100%;
                  padding: 10px 40px;
                  background: #ffe3e3;
                  border-radius: 999px;
                  margin-top: 10px;
                  margin-bottom: 10px;
                "
              >
                <div style="padding-bottom: 2px; border-bottom: 1px dashed grey">
                  <span style="font-weight: bold; border: 0px dashed grey"
                    >{{ $t('user.bind.header.auditOption') }}：</span
                  >
                  {{ RefuseStr }}
                </div>
              </div>
              <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" style="margin-top: 20px">
                <a-row type="flex">
                  <a-col :flex="2"
                    ><a-form-item
                      :label="$t('account.settings.basic.EnterpriseName')"
                      style="transition: all 0.3s ease-in-out; border-radius: 10px"
                      :style="{
                        boxShadow:
                          NowOCR_IDX == 0
                            ? '0 5px 15px 0 rgba(176, 191, 231, 0.35)'
                            : '0 5px 15px 0 rgba(176, 191, 231, 0)',
                        border: NowOCR_IDX == 0 ? ' 1px solid #9968f8' : '1px solid white',
                      }"
                    >
                      <a-input
                        :placeholder="$t('user.bind.form.placeholder.enterpriseName')"
                        v-decorator="[
                          'enterpriseName',
                          {
                            rules: [{ required: true, message: `${$t('user.bind.form.placeholder.enterpriseName')}` }],
                          },
                        ]"
                      />
                    </a-form-item>
                    <a-form-item
                      :label="$t('account.basicSetting.enterprisePosition')"
                      style="
                        transition: all 0.5s ease-in-out;

                        border-radius: 10px;
                      "
                      :style="{
                        boxShadow:
                          NowOCR_IDX == 1
                            ? '0 5px 15px 0 rgba(176, 191, 231, 0.35)'
                            : '0 5px 15px 0 rgba(176, 191, 231, 0)',
                        border: NowOCR_IDX == 1 ? ' 1px solid #9968f8' : '1px solid white',
                      }"
                    >
                      <a-textarea
                        :autosize="{ minRows: 3, maxRows: 3 }"
                        :placeholder="$t('account.basicSetting.rule.enterprisePosition')"
                        v-decorator="[
                          'enterprisePosition',
                          {
                            rules: [
                              { required: true, message: `${$t('account.basicSetting.rule.enterprisePosition')}` },
                            ],
                          },
                        ]"
                      />
                    </a-form-item>
                    <a-form-item
                      :label="$t('account.basicSetting.enterpriseID.label')"
                      style="
                        transition: all 0.5s ease-in-out;

                        border-radius: 10px;
                      "
                      :style="{
                        boxShadow:
                          NowOCR_IDX == 2
                            ? '0 5px 15px 0 rgba(176, 191, 231, 0.35)'
                            : '0 5px 15px 0 rgba(176, 191, 231, 0)',
                        border: NowOCR_IDX == 2 ? ' 1px solid #9968f8' : '1px solid white',
                      }"
                    >
                      <a-input
                        :placeholder="$t('account.basicSetting.rule.enterpriseID')"
                        v-decorator="[
                          'enterpriseID',
                          { rules: [{ required: true, message: `${$t('account.basicSetting.rule.enterpriseID')}` }] },
                        ]"
                      />
                      <div style="font-size: 10px; font-weight: bold; color: grey; margin-bottom: -10px">
                        {{ $t('user.bind.form.notice.enterpriseID') }}
                      </div>
                    </a-form-item>
                    <a-form-item
                      :label="$t('account.Moresetting.form.enterpriseCharacter')"
                      style="
                        transition: all 0.5s ease-in-out;

                        border-radius: 10px;
                      "
                      :style="{
                        boxShadow:
                          NowOCR_IDX == 3
                            ? '0 5px 15px 0 rgba(176, 191, 231, 0.35)'
                            : '0 5px 15px 0 rgba(176, 191, 231, 0)',
                        border: NowOCR_IDX == 3 ? ' 1px solid #9968f8' : '1px solid white',
                      }"
                    >
                      <a-select
                        v-decorator="[
                          'enterpriseCharacter',
                          {
                            rules: [
                              { required: true, message: `${$t('account.Moresetting.rule.enterpriseCharacter')}` },
                            ],
                          },
                        ]"
                        :placeholder="$t('modal.please.select')"
                        style="min-width: 180px"
                      >
                        <a-select-option value="国营企业">
                          {{ $t('account.Moresetting.form.enterpriseCharacter_option.GuoYou') }}
                        </a-select-option>
                        <a-select-option value="集体所有制">
                          {{ $t('account.Moresetting.form.enterpriseCharacter_option.JiTiSuoYou') }}
                        </a-select-option>
                        <a-select-option value="私营企业">
                          {{ $t('account.Moresetting.form.enterpriseCharacter_option.SiYing') }}
                        </a-select-option>
                        <a-select-option value="股份制企业">
                          {{ $t('account.Moresetting.form.enterpriseCharacter_option.GuFen') }}
                        </a-select-option>
                        <a-select-option value="有限合伙企业">
                          {{ $t('account.Moresetting.form.enterpriseCharacter_option.YouXianHeHuo') }}
                        </a-select-option>
                        <a-select-option value="合资企业">
                          {{ $t('account.Moresetting.form.enterpriseCharacter_option.HeZi') }}
                        </a-select-option>
                        <a-select-option value="外商投资企业">
                          {{ $t('account.Moresetting.form.enterpriseCharacter_option.WaiShangeTouZi') }}
                        </a-select-option>
                        <a-select-option value="个人独资企业">
                          {{ $t('account.Moresetting.form.enterpriseCharacter_option.GeRenDuZi') }}
                        </a-select-option>
                        <a-select-option value="股份合作企业">
                          {{ $t('account.Moresetting.form.enterpriseCharacter_option.GuFenHeZuo') }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>

                    <a-form-item
                      :label="$t('account.Moresetting.form.enterpriseClass')"
                      style="
                        transition: all 0.5s ease-in-out;

                        border-radius: 10px;
                      "
                      :style="{
                        boxShadow:
                          NowOCR_IDX == 4
                            ? '0 5px 15px 0 rgba(176, 191, 231, 0.35)'
                            : '0 5px 15px 0 rgba(176, 191, 231, 0)',
                        border: NowOCR_IDX == 4 ? ' 1px solid #9968f8' : '1px solid white',
                      }"
                    >
                      <a-select
                        v-decorator="[
                          'enterpriseClass',
                          { rules: [{ required: true, message: `${$t('account.Moresetting.rule.enterpriseClass')}` }] },
                        ]"
                        :placeholder="$t('modal.please.select')"
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
                        {{ $t('account.Moresetting.title.notice.enterpriseClass') }}
                      </div>
                    </a-form-item>
                  </a-col>
                  <a-col :flex="3"
                    ><a-form-item
                      :label="$t('user.bind.form.label.enterpriseLegelPerson')"
                      style="
                        transition: all 0.5s ease-in-out;

                        border-radius: 10px;
                      "
                      :style="{
                        boxShadow:
                          NowOCR_IDX == 5
                            ? '0 5px 15px 0 rgba(176, 191, 231, 0.35)'
                            : '0 5px 15px 0 rgba(176, 191, 231, 0)',
                        border: NowOCR_IDX == 5 ? ' 1px solid #9968f8' : '1px solid white',
                      }"
                    >
                      <a-input
                        :placeholder="$t('account.Moresetting.rule.enterpriseLegelPerson')"
                        v-decorator="[
                          'enterpriseLegelPerson',
                          {
                            rules: [
                              { required: true, message: `${$t('account.Moresetting.rule.enterpriseLegelPerson')}` },
                            ],
                          },
                        ]"
                      >
                        <template #addonBefore>
                          <a-icon type="user" />
                        </template>
                      </a-input>
                    </a-form-item>
                    <a-form-item :label="$t('user.bind.form.label.enterpriseResponsiblePerson')">
                      <a-input
                        :placeholder="$t('account.Moresetting.rule.enterpriseResponsiblePerson')"
                        v-decorator="[
                          'enterpriseResponsiblePerson',
                          {
                            rules: [
                              {
                                required: true,
                                message: `${$t('account.Moresetting.rule.enterpriseResponsiblePerson')}`,
                              },
                            ],
                          },
                        ]"
                      >
                        <template #addonBefore>
                          <a-icon type="user" />
                        </template>
                      </a-input>
                    </a-form-item>
                    <a-form-item :label="$t('user.bind.form.label.enterpriseResponsibleEmail')">
                      <a-input
                        :placeholder="$t('account.Moresetting.rule.enterpriseResponsibleEmail')"
                        v-decorator="[
                          'enterpriseResponsibleEmail',
                          {
                            rules: [
                              {
                                required: true,
                                message: `${$t('account.Moresetting.rule.enterpriseResponsibleEmail')}`,
                              },
                              { type: 'email', message: `${$t('form.basic-form.email.RightEmailNeed')}` },
                            ],
                          },
                        ]"
                      >
                        <template #addonBefore>
                          <a-icon type="mail" />
                        </template>
                      </a-input>
                    </a-form-item>
                    <a-form-item :label="$t('account.settings.basic.profile-placeholder')">
                      <a-textarea
                        :autosize="{ minRows: 9, maxRows: 9 }"
                        size="large"
                        :placeholder="$t('account.basicSetting.rule.enterpriseDescription')"
                        :maxLength="300"
                        v-decorator="[
                          'enterpriseDescription',
                          {
                            rules: [
                              { required: true, message: `${$t('account.basicSetting.rule.enterpriseDescription')}` },
                            ],
                          },
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </div>

            <div style="display: flex">
              <a-button
                style="margin-left: 40%; transform: translateX(-50%)"
                icon="vertical-right"
                :disabled="bindloading"
                @click="backToLogin()"
              >
                {{ $t('user.bind.footer.btn.returnLogin') }}
              </a-button>
              <a-button
                type="primary"
                style="margin-left: 15px; transform: translateX(-50%)"
                @click="submitBind"
                :loading="bindloading"
              >
                {{ $t('user.bind.footer.btn.submitBind') }}
              </a-button>
              <a-tooltip>
                <template slot="title"> 基于AI能力智能识别营业执照信息，一键提取，解放双手 </template>
                <a-button
                  @click="openAIOCR"
                  class="aiShadow"
                  :disabled="bindloading"
                  style="
                    margin-left: 30px;
                    transform: translateX(-50%);

                    color: white;
                    border: none;
                  "
                  icon="chrome"
                >
                  营业执照AI识别
                </a-button>
              </a-tooltip>
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
                  👋{{ $t('user.bind.audit.title') }}
                </div>
              </div>
            </div>
            <a-result :title="$t('user.bind.audit.result.title')" :sub-title="$t('user.bind.audit.result.subTitle')">
              <template #icon>
                <a-icon type="clock-circle" theme="filled" style="color: #108ee9; margin-bottom: 30px" />
              </template>
              <template #extra>
                <a-button key="console" type="primary" @click="backToLogin()">
                  {{ $t('user.bind.footer.btn.returnLogin') }}
                </a-button>
              </template>
            </a-result>
          </div>
        </div>
      </div>
    </div>
    <AIOCR ref="AIOCR" @OCRfinish="OCRfinish"></AIOCR>
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

import AIOCR from '@/components/aiOCR/AIOCR.vue'

export default {
  name: 'BindLayout',
  components: {
    SelectLang,
    Carousel,
    NetworkSetting,
    AIOCR,
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

      RefuseStr: '',

      NowOCR_IDX: -1,
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
              this.$message.success(this.$t('user.bind.footer.btn.result.successSubmit'))
              this.bindAudit = true
            })
            .catch((err) => {
              this.bindloading = false
              this.$message.error(this.$t('user.bind.footer.btn.result.errorSubmit') + err.response.data.message)
            })
        } else {
          this.$message.warning(this.$t('result.fail.bu-quan-hou-ti-jiao'))
          this.bindloading = false
        }
      })
    },
    /**
     * aiocr相关
     */
    openAIOCR() {
      this.$refs.AIOCR.open('YYZZ')
    },
    enterpriseCharacter_OCR(word) {
      if (word.includes('自然人独资')) {
        return '个人独资企业'
      } else if (word.includes('合伙')) {
        return '有限合伙企业'
      } else if (word.includes('个人')) {
        return '个人独资企业'
      } else if (word.includes('个体')) {
        return '个人独资企业'
      } else if (word.includes('股份')) {
        return '股份制企业'
      } else {
        return ''
      }
    },
    enterpriseClass_OCR(word) {
      function containsAny(arr, str = word) {
        for (let i = 0; i < arr.length; i++) {
          if (str.includes(arr[i])) {
            return true
          }
        }
        return false
      }
      if (containsAny(['航空', '飞行', '飞机', '民航'])) {
        return '10' // 与化学相关的先对比
      } else if (containsAny(['输电', '供电', '电力供应'])) {
        return '2'
      } else if (containsAny(['电解铝', '惰性阴极', '惰性阳极', '铝电解'])) {
        return '5'
      } else if (containsAny(['镁', '电熔镁'])) {
        return '6'
      } else if (containsAny(['玻璃', '平板玻璃'])) {
        return '7'
      } else if (containsAny(['水泥', '混凝土'])) {
        return '8'
      } else if (containsAny(['陶瓷', '釉面'])) {
        return '9'
      } else if (containsAny(['金属', '钢'])) {
        return '3'
      } else if (containsAny(['化学', '化工', '中间体', '活性剂'])) {
        return '4' // 与化学相关的先对比
      } else if (containsAny(['发电'])) {
        return '1'
      } else {
        return ''
      }
    },
    OCRfinish(data, type) {
      if (type == 'YYZZ') {
        console.log(data)
        /**
         * 字段填充
         */
        let result = data.words_result
        if (result != null) {
          this.NowOCR_IDX = -1
          let stepLabel = ['单位名称', '地址', '社会信用代码', '类型', '经营范围', '法人']
          let setFeild = [
            'enterpriseName',
            'enterprisePosition',

            'enterpriseID',
            'enterpriseCharacter',
            'enterpriseClass',
            'enterpriseLegelPerson',
          ]
          let timer = setInterval(() => {
            this.NowOCR_IDX++
            if (this.NowOCR_IDX >= 6) {
              this.NowOCR_IDX = -1
              clearInterval(timer)
            } else {
              if (stepLabel[this.NowOCR_IDX] == '类型') {
                this.form.setFieldsValue({
                  enterpriseCharacter:
                    result['类型'].words == '无' || result['类型'].words == null
                      ? ''
                      : this.enterpriseCharacter_OCR(result['类型'].words),
                })
              } else if (stepLabel[this.NowOCR_IDX] == '经营范围') {
                this.form.setFieldsValue({
                  [setFeild[this.NowOCR_IDX]]:
                    result[stepLabel[this.NowOCR_IDX]].words == '无' || result[stepLabel[this.NowOCR_IDX]].words == null
                      ? ''
                      : this.enterpriseClass_OCR(result[stepLabel[this.NowOCR_IDX]].words),
                })
              } else {
                this.form.setFieldsValue({
                  [setFeild[this.NowOCR_IDX]]:
                    result[stepLabel[this.NowOCR_IDX]].words == '无' || result[stepLabel[this.NowOCR_IDX]].words == null
                      ? ''
                      : result[stepLabel[this.NowOCR_IDX]].words,
                })
              }
            }
          }, 350)

          // this.form.setFieldsValue({
          //   enterpriseName:
          //     result['单位名称'].words == '无' || result['单位名称'].words == null ? '' : result['单位名称'].words,
          //   enterprisePosition:
          //     result['地址'].words == '无' || result['地址'].words == null ? '' : result['地址'].words,

          //   enterpriseLegelPerson:
          //     result['法人'].words == '无' || result['法人'].words == null ? '' : result['法人'].words,
          //   enterpriseID:
          //     result['社会信用代码'].words == '无' || result['社会信用代码'].words == null
          //       ? ''
          //       : result['社会信用代码'].words,
          //   enterpriseCharacter:
          //     result['类型'].words == '无' || result['类型'].words == null
          //       ? ''
          //       : this.enterpriseCharacter_OCR(result['类型'].words),

          //   enterpriseClass:
          //     result['经营范围'].words == '无' || result['经营范围'].words == null
          //       ? ''
          //       : this.enterpriseClass_OCR(result['经营范围'].words),
          // })

          this.$notification.open({
            message: '智能字段已填充完成',
            description: '已自动为您填充相关匹配字段，请您核对。剩余字段需人工填写',
            icon: <a-icon type="chrome" style="color:#12b886" />,
            style: {
              // background: `linear-gradient(135deg,white ,#a5d8ff 50%,#dbe4ff )`,
              background: `url('https://xinghuo.xfyun.cn/static/media/n-hover-bg.971eecbfea9dbd3797f7.png')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            },
          })
        }
      }
    },
  },
  mounted() {
    // 设置全局禁止滚动
    document.body.style.overflow = 'hidden'
    document.body.classList.add('userLayout')
    store.dispatch('GetInfo').then((res) => {
      // console.log('res', res)
      // this.BindStatus = res.data.auditStatus

      if (this.BindStatus == 'REFUSE') {
        this.RefuseStr = res.data.auditOpinion
      }
    })

    if (this.BindStatus == 'AUDIT') {
      this.$notification.open({
        message: this.$t('user.bind.notification.audit.message'),
        description: this.$t('user.bind.notification.audit.des'),
        icon: <a-icon type="smile" style="color: #108ee9" />,
      })
    } else if (this.BindStatus == 'WAIT') {
      this.$notification.open({
        message: this.$t('user.bind.header.title'),
        description: this.$t('user.bind.notification.wait.des'),
        icon: <a-icon type="link" style="color: #fd7e14" />,
      })
    } else if (this.BindStatus == 'REFUSE') {
      this.$notification.open({
        message: this.$t('user.bind.notification.refuse.message'),
        description: this.$t('user.bind.notification.refuse.des'),
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
    background: url('@/assets/bg_bind.png');
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

.aiShadow {
  box-shadow: 0 0 8px rgba(243, 240, 255, 0.95);
  background-color: #b18df8;
  animation: shadowChaneg 3s infinite;
}
@keyframes shadowChaneg {
  0% {
    background-color: #b18df8;
  }
  50% {
    background-color: #9968f8;
  }
  100% {
    background-color: #b18df8;
  }
}
</style>



