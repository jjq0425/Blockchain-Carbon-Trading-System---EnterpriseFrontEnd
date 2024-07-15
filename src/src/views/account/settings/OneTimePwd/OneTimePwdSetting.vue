<template>
  <a-modal
    :title="$t('account.settings.security.otp-modal.setting.title')"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="500"
    :footer="null"
    @cancel="cancelHandel"
    :destroyOnClose="true"
  >
    <p style="color: black">{{ $t('account.settings.security.otp-description') }}</p>

    <p style="color: #339af0; font-size: 17px; font-weight: bold; width: auto">动态口令是什么?</p>

    <p>
      TOTP利用时间同步生成动态六位数字密码，为用户登录提供一次性且仅在特定时间窗口内有效的验证，增强了双因素认证的安全性，技术广泛应用于双因素认证（2FA）中，作为第二层验证手段，有效保护用户账户免受恶意攻击和密码泄露的威胁。
    </p>

    <p style="color: #339af0; font-size: 17px; font-weight: bold; width: auto">我想重置动态密钥</p>
    <a-alert style="margin-bottom: 10px" message="重置成功后，过去设置的动态口令将全部失效。" banner />

    <p>请输入身份验证APP或工具显示的6位动态口令，以验证您的身份。</p>

    <p style="color: red; text-align: center; font-size: 13px" v-if="hasError">动态口令不正确，请重试</p>
    <!-- <p style="color: #12b886; text-align: center; font-size: 13px" v-if="hasVerSucess">
      动态口令验证成功，即将打开重置面板
    </p> -->
    <!-- <p style="color: #38d9a9; text-align: center; font-size: 13px">动态口令验证成功，正在提交信息</p> -->
    <vue-auth-code-input
      ref="auth_code"
      @inputChange="handleAuthCodeChange"
      @inputComplete="handleAuthCodeComplete"
      :codeLength="6"
    />

    <a-button
      type="primary"
      block
      style="margin-top: 10px"
      :loading="ver_loading"
      @click="handleAuthCodeComplete($refs.auth_code.codeArray, -1)"
    >
      重置动态密钥
    </a-button>
    <p style="color: grey; text-align: center; font-size: 11px; margin-top: 4px" @click="showSecret">
      动态口令采用时间同步的一次性密码技术（TOTP）实时生成校验。
    </p>
  </a-modal>
</template>



<script>
import VueAuthCodeInput from 'vue-auth-code-input'
import { GetTotp } from '@/api/login'
import store from '@/store'
import * as OTPAuth from 'otpauth'
import request from '@/utils/request'
// https://www.npmjs.com/package/vue-auth-code-input
export default {
  components: {
    VueAuthCodeInput,
  },
  data() {
    return {
      visible: false,
      hasError: false,
      ver_loading: false,
      hasVerSucess: false,

      id: null,
      confirmLoading: false,
      fileList: [],
      uploading: false,
      options: {
        // img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        img: '',
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true,
      },
      previews: {},

      secretKey: '',
      totp: null,
    }
  },
  computed: {
    enterpriseInfo() {
      return this.$store.state.user.info
    },
  },
  methods: {
    showSecret() {
      request({
        url: 'https://apifoxmock.com/m1/2214773-0-default/totpShowSecretKey',
        method: 'get',
        NetworkSetting: true,
      }).then((res) => {
        if (res.data.canShow) {
          this.$message.info('动态口令是' + this.totp.generate() + '密钥是' + this.secretKey)
        }
      })
    },
    clearAuthCode() {
      for (let i = 0; i < 6; i++) {
        // this.$refs.auth_code.$refs['authcode_input'][i].value = ''
        this.$refs.auth_code.updateCodeArray(i, '')
      }

      // 触发.warning_Tip类的CSS的动画animation
    },
    handleAuthCodeChange(code, index) {
      this.hasError = false
      // console.log(this.)
    },
    handleAuthCodeComplete(code, index) {
      console.log('Auth_CodeComplete', code)
      let codeStr = code.join('')
      // 验证code是不是每一位都有数字，比如['','','','','','1']就不行
      if (code.every(Boolean)) {
        // this.$message.success('提交成功')
      } else {
        this.$message.warning('请完整填写动态口令')
        return
      }

      this.AuthCodeDisabled(true)
      this.ver_loading = true
      let result = this.totp.generate(codeStr) === codeStr
      setTimeout(() => {
        this.ver_loading = false
        this.AuthCodeDisabled(false)
        if (result) {
          this.hasError = false
          this.hasVerSucess = true
          this.$message.warning('动态口令验证成功，请按重置面板流程重新创建动态口令。点击确认成功后才表明已经重置成功')
          this.$emit('Recreate')
          this.cancelHandel()
        } else {
          this.clearAuthCode()
          this.hasError = true
          this.hasVerSucess = false
          // 以上三句，顺序不要换
        }
      }, 500)

      // setTimeout(() => {
      //   this.ver_loading = false

      //   this.AuthCodeDisabled(false)
      //   if (codeStr == '111111') {
      //     this.hasError = false
      //     this.hasVerSucess = true
      //     this.$message.warning('动态口令验证成功，请按重置面板流程重新创建动态口令。点击确认成功后才表明已经重置成功')
      //     this.$emit('Recreate')
      //     this.cancelHandel()
      //   } else {
      //     this.clearAuthCode()
      //     this.hasError = true
      //     this.hasVerSucess = false
      //     // 以上三句，顺序不要换
      //   }
      // }, 1000)
    },
    AuthCodeDisabled(flag = true) {
      if (flag) {
        for (let i = 0; i < 6; i++) {
          this.$refs.auth_code.$refs['authcode_input'][i].disabled = true
        }
      } else {
        for (let i = 0; i < 6; i++) {
          this.$refs.auth_code.$refs['authcode_input'][i].disabled = false
        }
      }
    },

    open(flag = false) {
      this.id = null
      this.hasError = false
      this.hasSuccess = false
      this.ver_loading = false
      this.secretKey = ''
      this.totp = null
      GetTotp().then((res) => {
        if (res.data.hasTotp) {
          this.secretKey = res.data.totpSecret
          let totp = new OTPAuth.TOTP({
            issuer: '碳盟链道',
            label: this.enterpriseInfo.enterpriseName,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: this.secretKey,
          })
          this.totp = totp
          this.visible = true
        } else {
          this.visible = false
          this.$emit('initCreate')
        }
      })
    },
    close() {
      this.id = null
      this.hasError = false
      this.ver_loading = false
      this.asVerSucess = false
      this.secretKey = ''
      this.totp = null
      this.visible = false
    },
    cancelHandel() {
      this.close()
    },
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    beforeUpload(file) {
      const reader = new FileReader()
      // 把Array Buffer转化为blob 如果是base64不需要
      // 转化为base64
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.options.img = reader.result
      }
      // 转化为blob
      // reader.readAsArrayBuffer(file)

      return false
    },

    // 上传图片（点击上传按钮）
    finish(type) {
      console.log('finish')
      const _this = this
      const formData = new FormData()
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          const img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
          formData.APP或工具end('file', data, this.fileName)
          this.$http
            .post('https://www.mocky.io/v2/5cc8019d300000980a055e76', formData, {
              contentType: false,
              processData: false,
              headers: { 'Content-Type': 'APP或工具lication/x-www-form-urlencoded' },
            })
            .then((response) => {
              console.log('upload response:', response)
              // var res = response.data
              // if (response.status === 'done') {
              //   _this.imgFile = ''
              //   _this.headImg = res.realPathList[0] // 完整路径
              //   _this.uploadImgRelaPath = res.relaPathList[0] // 非完整路径
              //   _this.$message.success('上传成功')
              //   this.visible = false
              // }
              _this.$message.success('上传成功')
              _this.$emit('ok', response.url)
              _this.visible = false
            })
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    okHandel() {
      const vm = this

      vm.confirmLoading = true
      setTimeout(() => {
        vm.confirmLoading = false
        vm.close()
        vm.$message.success('上传头像成功')
      }, 2000)
    },

    realTime(data) {
      this.previews = data
    },
  },
}
</script>
  
  <style lang="less" scoped>
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>

<style scoped>
.warning_Tip {
  color: #515152;
  animation: warningChange 1s 4;
}

@keyframes warningChange {
  0% {
    color: #515152;
  }
  50% {
    color: #c92a2a;
  }
  100% {
    color: #515152;
  }
}
</style>
  