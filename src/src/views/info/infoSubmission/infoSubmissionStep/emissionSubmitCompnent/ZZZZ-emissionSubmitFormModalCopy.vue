<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <a-modal v-model="visible" :title="title">
    <template slot="footer">
      <a-button key="back" @click="close"> 不保存关闭 </a-button>
      <a-button key="submit" type="primary" @click="handleOk"> 保存并提交 </a-button>
    </template>
    <div>
      <div>
        <a-form-model ref="dynamicValidateForm" :model="emissionForm" v-bind="formItemLayout">
          <a-form-model-item
            v-bind="formItemLayout"
            label="排放源名"
            :rules="{
              required: true,
              message: '排放原名不能为空',
              trigger: 'blur',
            }"
            prop="className"
          >
            <a-input v-model="emissionForm.className" placeholder="请输入排放源名" />
          </a-form-model-item>

          <a-form-model-item v-bind="formItemLayout" label="该项排放总额">
            {{ emissionForm.activityFactorNum * emissionForm.EmissionFactorNum }}
          </a-form-model-item>
          <div
            style="
              display: flex;
              width: 100%;
              background-color: #e7f5ff;
              padding: 5px 25px;
              border-radius: 999px;
              text-align: center;
              justify-content: space-between;
              margin-bottom: 20px;
            "
          >
            <div style="font-weight: bold">活动水平</div>
            <div style="font-size: 12px">小计: {{ emissionForm.activityFactorNum }}</div>
          </div>
          <template v-for="(activityFac, index) in emissionForm.activityFactor">
            <template v-if="!activityFac.isConst">
              <a-form-model-item
                :key="activityFac.dataSort"
                v-bind="formItemLayout"
                :label="`${activityFac.dataName}数量`"
                :prop="'activityFactor.' + index + '.dataNum'"
                :rules="{
                  required: true,
                  message: 'domain can not be null',
                  trigger: 'blur',
                }"
              >
                <a-input
                  v-model="activityFac.dataNum"
                  placeholder="please input domain"
                  :disabled="activityFac.dataSource == 'DEFAULT'"
                  style="width: 120px"
                />
                <span style="font-size: 9px; padding-left: 5px">{{ activityFac.dataUnit }}</span>
              </a-form-model-item>

              <a-form-model-item
                :key="activityFac.dataSort"
                v-bind="formItemLayout"
                :label="`${activityFac.dataName}来源`"
                :prop="'activityFactor.' + index + '.dataSource'"
                :rules="{
                  required: true,
                  message: 'domain can not be null',
                  trigger: 'blur',
                }"
              >
                <a-input v-model="activityFac.dataSource" placeholder="please input domain" />
              </a-form-model-item>
            </template>
          </template>
        </a-form-model>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'emissionSubmitFormModal',
  prop: [],
  data() {
    return {
      visible: false,
      title: '',
      record: {},
      //   labelCol: { lg: { span: 5 }, sm: { span: 5 } },
      //   wrapperCol: { lg: { span: 19 }, sm: { span: 19 } },
      //   form: this.$form.createForm(this),

      emissionForm: {},

      //   表单配置项
      formItemLayout: {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 15,
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
    }
  },
  methods: {
    open(editType, record) {
      this.visible = true
      if (editType == 'edit') {
        this.title = '编辑项目'
        this.record = record
        this.emissionForm = record
        console.log(this.record)
      } else {
        this.title = '新增项目'
      }
    },
    close() {
      this.visible = false
    },
    handleOk() {
      window.alert('大哥你还没做')
    },
  },
}
</script>

<style>
</style>