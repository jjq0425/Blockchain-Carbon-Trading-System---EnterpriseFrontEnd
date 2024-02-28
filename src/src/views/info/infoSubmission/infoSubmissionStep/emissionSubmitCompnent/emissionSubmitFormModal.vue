<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <a-drawer :visible="visible" :title="title" placement="bottom" :height="490" :zIndex="100">
    <!-- <template slot="footer">
      
    </template> -->
    <div>
      <div style="width: 100%; max-height: 450px; overflow-y: scroll">
        <a-form-model
          ref="dynamicValidateForm"
          :model="emissionForm"
          style="display: flex; width: 100%; justify-content: space-around"
        >
          <div style="width: 15%; align-self: center">
            <a-form-model-item
              v-bind="formItemLayoutLeft"
              label="排放源名"
              :rules="{
                required: true,
                message: '排放原名不能为空',
                trigger: 'blur',
              }"
              prop="className"
              labelAlign="left"
            >
              <a-input v-model="emissionForm.className" placeholder="请输入排放源名" />
            </a-form-model-item>

            <a-form-model-item v-bind="formItemLayoutLeft" label="该项排放总额" labelAlign="left">
              {{ emissionForm.activityFactorNum * emissionForm.EmissionFactorNum }}
            </a-form-model-item>
          </div>
          <div style="align-self: center; width: 2%">
            <a-divider type="vertical" style="height: 200px" />
          </div>
          <div style="width: 42%; margin-right: 55px">
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
                  :label="`来源`"
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
          </div>

          <div style="width: 42%">
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
                <div :key="'activityFac' + activityFac.dataSort">
                  <a-form-model-item
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
                    v-bind="formItemLayout"
                    :label="`来源`"
                    :prop="'activityFactor.' + index + '.dataSource'"
                    :rules="{
                      required: true,
                      message: 'domain can not be null',
                      trigger: 'blur',
                    }"
                  >
                    <a-cascader
                      :options="cascaderOptionCreate(activityFac)"
                      placeholder="Please select"
                      @change="onChange"
                      :popupStyle="{ height: '220px' }"
                    />
                  </a-form-model-item>
                </div>
              </template>
            </template>
          </div>
        </a-form-model>
      </div>
    </div>
    <template>
      <div style="width: 100%; text-align: center">
        <a-button key="back" @click="close" style="margin-right: 20px" type="danger"> 不保存关闭 </a-button>
        <a-button key="submit" type="primary" @click="handleOk"> 保存并提交 </a-button>
      </div>
    </template>
  </a-drawer>
</template>

<script>
import {
  infoSubmitTableDataSourceClass_CN,
  infoSubmitTableDataSourceClass_EN,
} from '@/config/class/infoSubmitTableDataSourceClass.js'
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
      formItemLayoutLeft: {
        labelCol: {
          span: 12,
        },
        wrapperCol: {
          span: 20,
        },
      },
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
      infoSubmitTableDataSourceClass_CN: infoSubmitTableDataSourceClass_CN,
      infoSubmitTableDataSourceClass_EN: infoSubmitTableDataSourceClass_EN,
    }
  },
  computed: {
    lang() {
      return this.$store.state.app.lang
    },
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
    cascaderOptionCreate(singleRecord) {
      //   console.log('cascaderOptionCreate', record)
      let option = []
      let datasourcekey = Object.keys(infoSubmitTableDataSourceClass_CN)

      for (let i = 0; i < datasourcekey.length; i++) {
        if (datasourcekey[i] == 'DEFAULT') continue
        if (this.lang.includes('zh')) {
          option.push({
            value: datasourcekey[i],
            label: infoSubmitTableDataSourceClass_CN[datasourcekey[i]],
          })
        } else {
          option.push({
            value: datasourcekey[i],
            label: infoSubmitTableDataSourceClass_EN[datasourcekey[i]],
          })
        }
      }
      if (singleRecord.defaultVal.length == 0) {
        if (this.lang.includes('zh')) {
          option.push({
            value: 'DEFAULT',
            label: infoSubmitTableDataSourceClass_CN['DEFAULT'],
            disabled: true,
          })
        } else {
          option.push({
            value: 'DEFAULT',
            label: infoSubmitTableDataSourceClass_EN['DEFAULT'],
            disabled: true,
          })
        }
      } else {
        let defaultChild = []
        for (let i = 0; i < singleRecord.defaultVal.length; i++) {
          defaultChild.push({
            value: `DEFAULT_${i}`,
            label: `${singleRecord.defaultVal[i].val}(${singleRecord.defaultVal[i].description})`,
          })
        }
        if (this.lang.includes('zh')) {
          option.push({
            value: 'DEFAULT',
            label: infoSubmitTableDataSourceClass_CN['DEFAULT'],
            children: defaultChild,
          })
        } else {
          option.push({
            value: 'DEFAULT',
            label: infoSubmitTableDataSourceClass_EN['DEFAULT'],
            children: defaultChild,
          })
        }
      }
      console.log(option)
      return option
    },
  },
}
</script>


