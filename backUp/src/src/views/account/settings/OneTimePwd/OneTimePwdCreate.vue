<template>
  <a-modal
    :title="$t('account.settings.security.otp-modal.create.title')"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="720"
    @cancel="cancelHandel"
    destroyOnClose
  >
    <template slot="footer">
      <a-button key="back" @click="cancelHandel" :disabled="ver_loading"> 取消 </a-button>
      <a-button key="submit" type="primary" :loading="submitloading" @click="handleOk" :disabled="ver_loading">
        确认
      </a-button>
    </template>
    <p style="color: black">
      请根据步骤顺序完成动态口令创建。
      <span v-if="isRecreate">请先删除身份验证APP或工具上原有的动态口令配置</span>
    </p>

    <!-- <p style="color: #38d9a9; text-align: center; font-size: 13px">动态口令验证成功，正在提交信息</p> -->
    <div style="display: flex; justify-content: center">
      <div style="width: 40%">
        <span style="color: #339af0; font-size: 22px; font-weight: bold; width: auto">1.</span>
        <p style="color: black; font-size: 13px">
          请使用支持TOTP的身份验证APP或工具扫描下方的二维码
          <span style="color: grey; font-size: 11px"
            >(如Microsoft Authenticator, Authy, Google Authenticator, 1Password)
          </span>
        </p>

        <qrcode-vue
          :value="qrcodeVal"
          :size="150"
          level="M"
          style="border: 1px dashed grey; border-radius: 10px; width: 170px; padding: 10px; margin: 0 auto"
        />

        <p style="font-size: 13px; margin-top: 15px">若无法扫描，请复制下方密钥至APP或工具中</p>
        <!-- <span>{{ secretKey }}</span> -->
        <div style="display: flex">
          <a-input ref="copyContainer" disabled :value="secretKey" style="margin-right: 13px"> </a-input>
          <a-button @click="onCopySecretKey"> 复制 </a-button>
        </div>
      </div>
      <a-divider type="vertical" style="height: 350px" />
      <div style="width: 56%">
        <span style="color: #339af0; font-size: 22px; font-weight: bold; width: auto">2.</span>
        <p style="color: black; font-size: 13px; margin-bottom: 50px">
          请输入身份验证APP或工具显示的6位动态口令以验证是否配置正确
          <span style="color: grey; font-size: 11px">(注：单个口令有效期30秒，过时需重新生成。)</span>
        </p>
        <vue-auth-code-input
          ref="Auth_codeCreate"
          @inputChange="handleAuthCodeChange"
          @inputComplete="handleAuthCodeComplete_"
          :codeLength="6"
        />
        <p style="color: red; text-align: center; font-size: 13px" v-if="hasError">动态口令不正确，请重试</p>
        <p style="color: #12b886; text-align: center; font-size: 13px" v-if="hasVerSucess">动态口令验证成功</p>

        <a-button
          type="primary"
          :loading="ver_loading"
          style="float: right; margin-top: 20px"
          class="verBtn"
          @click="handleAuthCodeComplete_($refs.Auth_codeCreate.codeArray, -1)"
        >
          验证
        </a-button>
        <p
          class="warning_Tip"
          style="color: #fd7e14; text-align: center; float: left; margin-top: 20px; margin-left: 10px"
          v-if="needVer"
        >
          请先验证动态口令
        </p>
      </div>
    </div>
    <a-alert
      message="此密钥(二维码)仅展示一次，请一次性完成所有关联设备的绑定操作，否则需重新生成密钥。请勿泄露密钥，否则任何人都可能获知您的动态口令！一旦泄露，请至安全设置界面重新生成密钥。"
      banner
      style="margin-top: 20px"
    />
    <a-alert
      type="info"
      message="点击确认按钮后才表明重置成功，否则仍然使用旧的动态口令"
      banner
      style="margin-top: 10px"
      v-if="isRecreate"
    />
  </a-modal>
</template>



<script>
import QrcodeVue from 'qrcode.vue'
import VueAuthCodeInput from 'vue-auth-code-input'

export default {
  components: {
    QrcodeVue,
    VueAuthCodeInput,
  },
  data() {
    return {
      visible: false,
      hasError: false,
      ver_loading: false,
      hasVerSucess: false,
      needVer: false,
      isRecreate: false,

      secretKey: '6YWPT2G3RYB5DQGJ',

      id: null,
      confirmLoading: false,
    }
  },
  computed: {
    qrcodeVal() {
      return `otpauth://totp/碳盟链道:测试公司?secret=${this.secretKey}&issuer=碳盟链道`
      // 请替换测试公司！
    },
  },
  methods: {
    // 验证密码
    clearAuthCode() {
      for (let i = 0; i < 6; i++) {
        // this.$refs.Auth_codeCreate.$refs['authcode_input'][i].value = ''
        this.$refs.Auth_codeCreate.updateCodeArray(i, '')
      }

      // 触发.warning_Tip类的CSS的动画animation
    },
    handleAuthCodeChange(code, index) {
      this.hasError = false
      this.hasVerSucess = false
      this.needVer = false
      // console.log(this.)
    },
    handleAuthCodeComplete_(code, index) {
      // console.log('AuthCodeComplete1', code)
      // 验证code是不是每一位都有数字，比如['','','','','','1']就不行
      // 把code['','','','','','1']，变成字符串
      let codeStr = code.join('')
      if (code.every(Boolean)) {
        // this.$message.success('提交成功')
      } else {
        this.$message.warning('请完整填写动态口令')
        return
      }
      console.log('1', codeStr)
      this.AuthCodeDisabled(true)
      this.ver_loading = true

      setTimeout(() => {
        this.ver_loading = false

        this.AuthCodeDisabled(false)
        if (codeStr == '111111') {
          this.hasError = false
          this.hasVerSucess = true
        } else {
          this.clearAuthCode()
          this.hasError = true
          this.hasVerSucess = false
          // 以上三句，顺序不要换
        }
      }, 1000)
    },
    AuthCodeDisabled(flag = true) {
      if (flag) {
        for (let i = 0; i < 6; i++) {
          this.$refs.Auth_codeCreate.$refs['authcode_input'][i].disabled = true
        }
      } else {
        for (let i = 0; i < 6; i++) {
          this.$refs.Auth_codeCreate.$refs['authcode_input'][i].disabled = false
        }
      }
    },

    /**
     * @abstract 复制secretKey
     */
    onCopySecretKey() {
      //将secretKey复制到用户剪切板
      // console.log(this.$copyText)
      this.$copyText(this.secretKey)
        .then(() => {
          this.$message.success('复制成功')
        })
        .catch(() => {
          this.$message.error('复制失败，请手动复制')
        })
    },

    open(flag = false) {
      this.visible = true
      this.isRecreate = flag
    },
    close() {
      this.id = null
      this.visible = false
    },
    cancelHandel() {
      this.close()
    },
    handleOk() {
      if (this.hasVerSucess == false) {
        this.$message.warning('请先验证动态口令')
        this.needVer = true
        return
      } else {
        if (this.isRecreate) {
          this.$message.success('重置成功')
        } else {
          this.$message.success('创建成功')
        }
        // this.$message.success('创建成功')
        this.close()
      }
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
  color: #fd7e14;
  font-size: 13px;
  animation: warningChange 1s 3;
}

@keyframes warningChange {
  0% {
    color: #fd7e14;
    font-size: 13px;
  }
  50% {
    color: #a61e4d;
    font-size: 14px;
  }
  100% {
    color: #fd7e14;
    font-size: 13px;
  }
}

.verBtn {
  border-radius: 999px;
}
</style>
  