<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16" type="flex" justify="center">
      <a-col :order="isMobile ? 2 : 1" :md="24" :lg="16">
        <a-form-model layout="vertical" :model="form" ref="BasicForm" :rules="rules">
          <div style="font-size: 18px; color: #108ee9; margin: 15px auto; width: 100%; font-weight: bold">
            企业性质与行业
          </div>

          <a-form-model-item label="企业性质" prop="enterpriseCharacter">
            <a-select placeholder="请选择" style="min-width: 180px" v-model="form.enterpriseCharacter">
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
          </a-form-model-item>

          <a-form-model-item label="企业所在行业" prop="enterpriseClass">
            <a-select placeholder="请选择" style="min-width: 180px" v-model="form.enterpriseClass">
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
          </a-form-model-item>

          <div style="font-size: 18px; color: #108ee9; margin: 15px auto; width: 100%; font-weight: bold">
            企业联系人信息
          </div>

          <a-form-model-item label="企业法人姓名" prop="enterpriseLegelPerson">
            <a-input placeholder="请输入" v-model="form.enterpriseLegelPerson">
              <template #addonBefore>
                <a-icon type="user" />
              </template>
            </a-input>
          </a-form-model-item>

          <a-form-model-item label="企业填报负责人姓名" prop="enterpriseResponsiblePerson">
            <a-input placeholder="请输入" v-model="form.enterpriseResponsiblePerson">
              <template #addonBefore>
                <a-icon type="user" />
              </template>
            </a-input>
          </a-form-model-item>

          <a-form-model-item label="企业填报负责人邮箱" prop="enterpriseResponsibleEmail">
            <a-input placeholder="请输入" v-model="form.enterpriseResponsibleEmail">
              <template #addonBefore>
                <a-icon type="mail" />
              </template>
            </a-input>
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
import { enterpriseClassName_CN, enterpriseClassName_EN, enterpriseClassAllowed } from '@/config/class/enterpriseClass'

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
        enterpriseClass: '1',
      },
      rules: {
        enterpriseCharacter: [{ required: true, message: '请选择企业性质', trigger: 'blur' }],
        enterpriseClass: [{ required: true, message: '请选择企业所在行业', trigger: 'blur' }],
        enterpriseLegelPerson: [{ required: true, message: '请输入企业法人姓名', trigger: 'blur' }],
        enterpriseResponsiblePerson: [{ required: true, message: '请输入企业填报负责人姓名', trigger: 'blur' }],
        enterpriseResponsibleEmail: [
          { required: true, message: '请输入企业填报负责人邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
        ],
      },
      submitLoading: false,

      enterpriseClassNameOptions: [],

      enterpriseClassName_CN: enterpriseClassName_CN,
      enterpriseClassName_EN: enterpriseClassName_EN,
      enterpriseClassAllowed: enterpriseClassAllowed,
    }
  },
  computed: {
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
    setavatar(url) {
      this.option.img = url
      store.commit('SET_AVATAR', url)
      // console.log('ava', url, store.state.user.avatar)
    },
    initForm() {
      let TME = JSON.parse(JSON.stringify(store.state.user.info))
      TME.enterpriseClass = TME.enterpriseClass.toString()
      this.form = TME
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
