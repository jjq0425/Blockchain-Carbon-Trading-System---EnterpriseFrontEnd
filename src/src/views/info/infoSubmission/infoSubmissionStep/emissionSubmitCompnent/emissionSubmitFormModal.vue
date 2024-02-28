<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <a-drawer
    :visible="visible"
    :title="title"
    placement="bottom"
    :height="490"
    :zIndex="100"
    :closable="false"
    destroyOnClose
  >
    <dataSourceQuestionModal ref="dataSourceQuestionModal"></dataSourceQuestionModal>
    <!-- <template slot="footer">
      
    </template> -->
    <div>
      <div style="width: 100%; max-height: 450px; overflow-y: scroll">
        <a-form-model
          ref="emissionForm"
          :model="emissionForm"
          style="display: flex; width: 100%; justify-content: space-around"
          :rule="{
            className: [{ required: true, message: '请输入排放源名', trigger: 'blur' }],
          }"
        >
          <div style="width: 15%; align-self: center">
            <a-form-model-item
              v-bind="formItemLayoutLeft"
              label="排放源名"
              :rules="{
                required: true,
                message: '排放源名不能为空',
                trigger: 'blur',
              }"
              prop="className"
              labelAlign="left"
            >
              <a-input v-model="emissionForm.className" placeholder="请输入排放源名" />
              <div style="font-size: 9px; color: #868e96">
                点击添加化学式角标：
                <span class="chemicalSup" @click="() => (emissionForm.className = emissionForm.className + '₂')"
                  >₂
                </span>
                <span class="chemicalSup" @click="() => (emissionForm.className = emissionForm.className + '₃')"
                  >₃
                </span>
                <span
                  class="chemicalSup"
                  style=""
                  @click="() => (emissionForm.className = emissionForm.className + '₄')"
                  >₄&nbsp;
                </span>
              </div>
            </a-form-model-item>

            <a-form-model-item v-bind="formItemLayoutLeft" label="该项排放总额" labelAlign="left">
              <!-- {{ emissionForm.activityFactorNum * emissionForm.EmissionFactorNum }} -->
              <a-statistic
                title=""
                :precision="6"
                :value="emissionForm.classDataSum"
                :valueStyle="{ fontWeight: 'bold', fontSize: '36px' }"
              />
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
                <div :key="`activityFac_${activityFac.dataSort}`">
                  <a-form-model-item
                    :key="activityFac.dataSort"
                    v-bind="formItemLayout"
                    :prop="'activityFactor.' + index + '.dataNum'"
                    :rules="ruleCompute(activityFac.dataUnit)"
                  >
                    <span slot="label" :class="activityFac.dataName.length >= 11 ? 'label-box' : ''">{{
                      `${activityFac.dataName}数值`
                    }}</span>
                    <a-input-number
                      v-model="activityFac.dataNum"
                      :min="0"
                      :max="activityFac.dataUnit == '%' ? 1 : 99999999999999999999999999999999999999999999999"
                      placeholder="请输入数值"
                      :disabled="activityFac.dataSource == 'DEFAULT'"
                      style="width: 120px"
                      @change="reConclude"
                    />
                    <span style="font-size: 9px; padding-left: 5px" v-if="activityFac.dataUnit != '%'">{{
                      activityFac.dataUnit
                    }}</span>
                    <span style="font-size: 9px; padding-left: 5px; color: #ffa94d" v-else
                      >请输入原始数值而非百分比</span
                    >
                  </a-form-model-item>

                  <a-form-model-item
                    :key="activityFac.dataSort"
                    v-bind="formItemLayout"
                    :label="`来源`"
                    :prop="'activityFactor.' + index + '.dataSource'"
                    :rules="{
                      required: true,
                      message: '请选择数据来源',
                      trigger: 'blur',
                    }"
                  >
                    <a-cascader
                      :options="cascaderOptionCreate(activityFac)"
                      placeholder="请选择数据来源"
                      :popupStyle="{ height: '220px' }"
                      expandTrigger="hover"
                      @change="cascadeChange($event, activityFac)"
                      :defaultValue="cascaderDefualtValChoose(activityFac)"
                      :allowClear="false"
                      style="width: 90%; margin-right: 10px"
                    />
                    <a-icon type="question-circle" style="cursor: pointer" @click="openDataSourceQuestionModal" />
                  </a-form-model-item>
                </div>
              </template>
            </template>
          </div>

          <div style="width: 42%">
            <div
              style="
                display: flex;
                width: 100%;
                background-color: #e6fcf5;
                padding: 5px 25px;
                border-radius: 999px;
                text-align: center;
                justify-content: space-between;
                margin-bottom: 20px;
              "
            >
              <div style="font-weight: bold">排放因子</div>
              <div style="font-size: 12px">小计: {{ emissionForm.EmissionFactorNum }}</div>
            </div>
            <template v-for="(EmissionFac, index) in emissionForm.EmissionFactor">
              <template v-if="!EmissionFac.isConst">
                <div :key="`EmissionFac_${EmissionFac.dataSort}`">
                  <a-form-model-item
                    v-bind="formItemLayout"
                    :prop="'EmissionFactor.' + index + '.dataNum'"
                    :rules="ruleCompute(EmissionFac.dataUnit)"
                  >
                    <span slot="label" :class="EmissionFac.dataName.length >= 11 ? 'label-box' : ''">{{
                      `${EmissionFac.dataName}数值`
                    }}</span>
                    <a-input-number
                      v-model="EmissionFac.dataNum"
                      :min="0"
                      :max="EmissionFac.dataUnit == '%' ? 1 : 99999999999999999999999999999999999999999999999"
                      placeholder="请输入数据"
                      :disabled="EmissionFac.dataSource == 'DEFAULT'"
                      style="width: 120px"
                      @change="reConclude"
                    />
                    <span style="font-size: 9px; padding-left: 5px" v-if="EmissionFac.dataUnit != '%'">{{
                      EmissionFac.dataUnit
                    }}</span>
                    <span style="font-size: 9px; padding-left: 5px; color: #ffa94d" v-else
                      >请输入原始数值而非百分比</span
                    >
                  </a-form-model-item>

                  <a-form-model-item
                    v-bind="formItemLayout"
                    :label="`来源`"
                    :prop="'EmissionFactor.' + index + '.dataSource'"
                    :rules="{
                      required: true,
                      message: '请选择数据来源',
                      trigger: 'blur',
                    }"
                  >
                    <a-cascader
                      :options="cascaderOptionCreate(EmissionFac)"
                      placeholder="请选择数据来源"
                      :popupStyle="{ height: '220px' }"
                      expandTrigger="hover"
                      @change="cascadeChange($event, EmissionFac)"
                      :defaultValue="cascaderDefualtValChoose(EmissionFac)"
                      :allowClear="false"
                      style="width: 90%; margin-right: 10px"
                    />
                    <a-icon type="question-circle" style="cursor: pointer" @click="openDataSourceQuestionModal" />
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
        <a-popconfirm
          title="确认将非缺省值参数全置为0?"
          :ok-text="$t('modal.btn.confirm')"
          :cancel-text="$t('modal.btn.cancel')"
          @confirm="setZero"
        >
          <a-button style="margin-right: 20px"> 非缺省值参数置0 </a-button>
        </a-popconfirm>
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

import dataSourceQuestionModal from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/dataSourceQuestionModal'
export default {
  name: 'emissionSubmitFormModal',
  prop: [],
  components: {
    dataSourceQuestionModal,
  },
  data() {
    return {
      visible: false,
      type: '',
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
          span: 10,
        },
        wrapperCol: {
          span: 12,
        },
      },
      //   formItemLayoutWithOutLabel: {
      //     wrapperCol: {
      //       xs: { span: 24, offset: 0 },
      //       sm: { span: 20, offset: 4 },
      //     },
      //   },
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
      this.type = editType
      if (editType == 'edit') {
        this.title = '编辑项目'
        this.record = JSON.parse(JSON.stringify(record))
        this.emissionForm = JSON.parse(JSON.stringify(record))
      } else {
        this.title = '新增项目'
        this.record = JSON.parse(JSON.stringify(record))
        this.emissionForm = JSON.parse(JSON.stringify(record))
        console.log(this.record)
      }
    },
    close() {
      this.record = {}
      this.emissionForm = {}
      this.visible = false
    },

    handleOk() {
      //   window.alert('大哥你还没做')
      this.$refs['emissionForm'].validate((valid) => {
        if (valid) {
          this.$emit('dataUpdateFinish', this.type, this.emissionForm)
          if (this.type == 'edit') {
            this.$message.success('编辑成功')
          } else {
            this.$message.success('新增成功')
          }
          this.close()
          return
        } else {
          this.$message.error('请填写完整信息')

          return
        }
      })
    },
    /**
     * 计算
     */
    reConclude(type, factor) {
      //   console.log(this.emissionForm.activityFactor)

      // 计算emissionForm.activityFactorNum
      let res = 1
      for (let i = 0; i < this.emissionForm.activityFactor.length; i++) {
        res = res * this.emissionForm.activityFactor[i].dataNum
        // console.log(res, this.emissionForm.activityFactor)
      }
      // console.log(res)
      this.emissionForm.activityFactorNum = res.toFixed(6)

      // 计算emissionForm.EmissionFactorNum
      let res_2 = 1
      for (let i = 0; i < this.emissionForm.EmissionFactor.length; i++) {
        res_2 = res_2 * this.emissionForm.EmissionFactor[i].dataNum
      }
      this.emissionForm.EmissionFactorNum = res_2.toFixed(6)

      this.emissionForm.classDataSum = (
        this.emissionForm.EmissionFactorNum * this.emissionForm.activityFactorNum
      ).toFixed(6)
    },

    ruleCompute(factorUnit) {
      let validateNormalNum = (rule, value, callback) => {
        // console.log(rule, value, '111111')
        // console.log(rule, value, '1111112')
        if (value >= 0) {
          callback()
        } else if (value < 0) {
          callback(new Error('请输入正数'))
        } else {
          callback()
        }
      }
      let validatePercentNum = (rule, value, callback) => {
        // console.log(rule, value, '1111112')
        if (value <= 1 && value >= 0) {
          callback()
        } else if (value > 1 || value < 0) {
          callback(new Error('请输入原始数值。范围在0-1之间'))
        } else {
          callback()
        }
      }
      if (factorUnit == '%') {
        return [
          {
            required: true,
            message: '请输入数据',
            trigger: 'blur',
          },
          //   {
          //     min: 0,
          //     max: 1,
          //     message: '请输入原始数值。范围在0-1之间',
          //     trigger: 'blur',
          //   },
          { validator: validatePercentNum, trigger: 'blur' },
        ]
      } else {
        return [
          {
            required: true,
            message: '请输入数据',
            trigger: 'blur',
          },
          //   {
          //     min: 0,
          //     message: '请输入准确的数字。',
          //     trigger: 'blur',
          //   },
          { validator: validateNormalNum, trigger: 'blur' },
        ]
      }
    },
    /**
     * 打开数据源问题弹窗
     */
    openDataSourceQuestionModal() {
      // console.log(this.$refs.dataSourceQuestionModal)
      this.$refs.dataSourceQuestionModal.open()
    },
    /**
     *
     * @param {*} singleRecord
     * 级联选择器选项生成
     */
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
      //   console.log(option)
      return option
    },
    cascaderDefualtValChoose(singleRecord) {
      let res = []
      res.push(singleRecord.dataSource)
      if (
        singleRecord.dataSource == 'DEFAULT' &&
        singleRecord.defaultVal.length > 0 &&
        singleRecord.defaultValChooseIdx != -1
      ) {
        res.push(`DEFAULT_${singleRecord.defaultValChooseIdx}`)
        this.SetDefaultVal(singleRecord)
      }
      return res
    },
    SetDefaultVal(factor) {
      if (factor.dataSource == 'DEFAULT') {
        factor.dataNum = factor.defaultVal[factor.defaultValChooseIdx].val
        this.reConclude()
      }
    },
    cascadeChange(val, factor) {
      //   console.log(val, factor)
      if (val[0] != 'DEFAULT') {
        factor.defaultValChooseIdx = -1
        factor.dataSource = val[0]
      } else {
        if (val[1] != '') {
          factor.dataSource = val[0]
          factor.defaultValChooseIdx = parseInt(val[1].split('_')[1])
          this.SetDefaultVal(factor)
        } else {
          factor.defaultValChooseIdx = -1
          factor.dataSource = 'MEASURE'
        }
      }
    },
    /**
     * 全部置为0
     */
    setZero() {
      this.emissionForm.activityFactor.forEach((item) => {
        if (!item.isConst && item.dataSource != 'DEFAULT') {
          item.dataNum = 0
        }
      })
      this.emissionForm.EmissionFactor.forEach((item) => {
        if (!item.isConst && item.dataSource != 'DEFAULT') {
          item.dataNum = 0
          item.defaultValChooseIdx = -1
          item.dataSource = 'MEASURE'
        }
      })
      this.reConclude()
      this.$message.success('已将非缺省值字段全部置为0，缺省值请自行更改')
    },
  },
}
</script>

<style scoped>
.chemicalSup {
  padding: 2px;
  margin: 2px;
  width: 3px;
  border: 1px solid #dee2e6;
  color: #74c0fc;
  border-radius: 4px;
  background: #f1f3f5;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.chemicalSup:hover {
  padding: 2px;
  margin: 2px;
  width: 3px;
  border: 1px solid #dee2e6;
  color: white;
  border-radius: 4px;
  background: #4dabf7;
  cursor: pointer;
}

.label-box {
  width: 80%;
  display: inline-block;
  height: auto;
  white-space: break-spaces;
  line-height: 18px;
  text-align: left;
  vertical-align: bottom;
}
</style>

