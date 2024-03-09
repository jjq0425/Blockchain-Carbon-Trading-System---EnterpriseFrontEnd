<template>
  <a-modal
    :title="$t('account.settings.security.otp-modal.auth.title')"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="400"
    :footer="null"
    @cancel="cancelHandel"
    destroyOnClose
    :dialog-style="{ top: '220px' }"
  >
    <p style="color: black">为确保账号安全，此操作需要输入动态口令。</p>
    <p style="color: red; text-align: center; font-size: 13px" v-if="hasError">动态口令不正确，请重试</p>
    <p style="color: #38d9a9; text-align: center; font-size: 13px" v-if="hasSuccess">动态口令验证成功，正在提交信息</p>
    <vue-auth-code-input
      ref="auth_code"
      @inputChange="handleAuthCodeChange"
      @inputComplete="handleAuthCodeComplete"
      :codeLength="6"
    />
    <div
      style="
        text-align: left;
        background: #e8e9eb;
        padding: 0px 10px;
        font-size: 12px;
        margin-top: 15px;
        border-radius: 5px;
      "
    >
      <ul style="list-style-type: circle">
        <li>请查阅关联设备的动态口令。</li>
        <li class="warning_Tip" v-if="hasError">单个口令有效期30秒，过时需重新生成。</li>
        <li v-else>单个口令有效期30秒，过时需重新生成。</li>

        <!-- <li>单个账号连续错误5次将24小时内无法使用敏感操作。</li> -->
      </ul>
    </div>
    <a-button
      type="primary"
      block
      :loading="ver_loading"
      @click="handleAuthCodeComplete($refs.auth_code.codeArray, -1)"
    >
      提交验证
    </a-button>
    <p style="color: grey; text-align: center; font-size: 11px; margin-top: 4px">
      无法使用动态口令时，请立即联系管理员删除旧动态口令。
    </p>
  </a-modal>
</template>



<script>
import VueAuthCodeInput from 'vue-auth-code-input'
// https://www.npmjs.com/package/vue-auth-code-input
export default {
  components: {
    VueAuthCodeInput,
  },
  data() {
    return {
      visible: false,
      hasError: false,
      hasSuccess: false,
      ver_loading: false,

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
    }
  },
  computed: {},
  methods: {
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
      // console.log('Auth_CodeComplete', code)
      // 验证code是不是每一位都有数字，比如['','','','','','1']就不行
      if (code.every(Boolean)) {
        // this.$message.success('提交成功')
      } else {
        this.$message.warning('请完整填写动态口令')
        return
      }
      let codeStr = code.join('')

      this.AuthCodeDisabled(true)
      this.ver_loading = true
      setTimeout(() => {
        if (codeStr == '111111') {
          this.hasSuccess = true
          this.ver_loading = false
          this.$message.success('验证成功')
          this.$emit('success')
          setTimeout(() => {
            this.close()
          }, 500)
        } else {
          this.ver_loading = false
          this.clearAuthCode()
          this.AuthCodeDisabled(false)
          this.hasError = true
        }
      }, 500)
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
      this.$message.info('TOTP功能开发中，请使用111111')
      this.visible = true
    },
    close() {
      this.id = null
      this.hasError = false
      this.hasSuccess = false
      this.ver_loading = false
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
          // formData.APP或工具end('file', data, this.fileName)
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
  