<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">
        <a-form-model layout="vertical" :model="form" ref="BasicForm" :rules="rules">
          <a-form-model-item :label="$t('account.settings.basic.EnterpriseName')" prop="enterpriseName">
            <a-input :placeholder="$t('account.settings.basic.EnterpriseName-message')" v-model="form.enterpriseName" />
          </a-form-model-item>

          <a-form-model-item label="企业组织机构代码" prop="enterpriseID">
            <a-input placeholder="请输入" v-model="form.enterpriseID" disabled />
            <div style="font-size: 10px; color: grey; font-weight: bold">(企业组织机构代码暂不允许更改)</div>
          </a-form-model-item>

          <a-form-model-item label="企业地址" prop="enterprisePosition">
            <a-textarea row="2" placeholder="请输入" v-model="form.enterprisePosition" />
          </a-form-model-item>

          <a-form-model-item :label="$t('account.settings.basic.profile')" prop="enterpriseDescription">
            <a-textarea
              rows="7"
              :placeholder="$t('account.settings.basic.profile-message')"
              v-model="form.enterpriseDescription"
            />
          </a-form-model-item>

          <!-- <a-form-model-item :label="$t('account.settings.basic.email')" :required="false">
            <a-input placeholder="example@ant.design" />
          </a-form-model-item> -->

          <a-form-model-item>
            <a-button type="primary" @click="submitInfo()" :loading="submitLoading">{{
              $t('account.settings.enterpriseInfo.update')
            }}</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-col>
      <a-col :order="1" :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <!-- <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
          <a-icon type="cloud-upload-o" class="upload-icon" />
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img" />
        </div> -->

        <div class="ant-upload-preview">
          <span class="upload-icon">😀</span>

          <img :src="option.img" />
        </div>
      </a-col>
    </a-row>

    <avatar-modal ref="modal" @ok="setavatar" />
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { baseMixin } from '@/store/app-mixin'
import store from '@/store'
import { infoSet } from '@/api/login'

export default {
  mixins: [baseMixin],
  components: {
    AvatarModal,
  },
  data() {
    return {
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
      form: {
        enterpriseName: '',
        enterpriseID: '',
      },
      rules: {
        enterpriseName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        enterprisePosition: [{ required: true, message: '请输入企业地址', trigger: 'blur' }],
        enterpriseID: [{ required: true, message: '请输入企业组织机构代码', trigger: 'blur' }],
        enterpriseDescription: [{ required: true, message: '请输入企业简介', trigger: 'blur' }],
      },
      submitLoading: false,
    }
  },
  methods: {
    setavatar(url) {
      this.option.img = url
      store.commit('SET_AVATAR', url)
      // console.log('ava', url, store.state.user.avatar)
    },
    initForm() {
      this.form = JSON.parse(JSON.stringify(store.state.user.info))
      // console.log(store.state.user)
    },
    submitInfo() {
      this.submitLoading = true
      this.$refs.BasicForm.validate((valid) => {
        if (valid) {
          // alert('submit!')
          infoSet(this.form).then((res) => {
            if (res.success) {
              setTimeout(() => {
                this.$message.success(res.message)
                store.dispatch('GetInfo').then((res) => {
                  this.submitLoading = false
                  this.initForm()
                })
              }, 500)
            }
          })
        } else {
          this.submitLoading = false
          this.$message.warning('请补全信息后提交')
          return false
        }
      })
    },
  },
  mounted() {
    this.option.img = store.state.user.avatar
    this.initForm()
  },
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 125px;
    right: 0px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
