<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <a-modal
    :visible="visible"
    :title="$t('modal.detail.title')"
    :dialog-style="{ top: '20px' }"
    :width="600"
    :closable="false"
  >
    <template slot="footer">
      <a-popconfirm title="确认不保存关闭？" ok-text="确认" cancel-text="取消" @confirm="close">
        <a-button type="danger"> 不保存关闭 </a-button>
      </a-popconfirm>
      <a-button type="primary" style="margin-left: 10px" @click="save"> 保存并关闭 </a-button>
    </template>
    <a-form-model layout="vertical" :model="FactorForm" style="max-height: 500px; overflow: scroll" ref="FactorFormRef">
      <a-form-model-item
        label="因子名称"
        prop="dataName"
        :rules="{
          required: true,
          message: '请输入因子名',
          trigger: 'blur',
        }"
      >
        <a-input v-model="FactorForm.dataName" :disabled="!canDeepEdit" />
      </a-form-model-item>
      <a-form-model-item
        label="因子单位"
        prop="dataUnit"
        :rules="{
          required: true,
          message: '请输入单位',
          trigger: 'blur',
        }"
      >
        <a-input v-model="FactorForm.dataUnit" :disabled="!canDeepEdit" />
      </a-form-model-item>

      <a-form-model-item
        label="缺省值数据组"
        style="display: inline-block"
        prop="dataUnit"
        :rules="{
          validate: DefaultValValidate,
        }"
      >
        <div v-for="(item, index) in FactorForm.defaultVal" :key="index">
          <div style="margin-top: 10px">
            缺省数值：
            <a-input-number
              v-model="item.val"
              style="display: inline-block; width: 35%"
              :rules="{
                required: true,
                message: '请填写',
                trigger: 'blur',
              }"
            />
            描述：
            <a-input
              v-model="item.description"
              style="display: inline-block; width: 35%"
              :rules="{
                required: true,
                message: '请填写',
                trigger: 'blur',
              }"
            />
            <a-icon type="delete" style="color: red; margin-left: 10px" @click="removeDefaulVal(index)" />
          </div>
        </div>
        <div style="color: orange; font-size: 10px" v-if="FactorForm.dataUnit == '%'">
          注意：请填写原始数值而非百分比
        </div>
      </a-form-model-item>
      <a-form-model-item
        v-bind="{
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        }"
      >
        <a-button type="dashed" @click="addDefaultVal" block> <a-icon type="plus" /> 添加缺省值 </a-button>
      </a-form-model-item>
      <a-form-model-item
        label="数据默认来源"
        prop="dataSource"
        :rules="{
          required: true,
          message: '请选择数据默认来源',
          trigger: 'blur',
        }"
      >
        <a-cascader
          :options="cascaderOptionCreate(FactorForm)"
          placeholder="数据默认来源"
          :popupStyle="{ height: '220px' }"
          expandTrigger="hover"
          @change="cascadeChange($event, FactorForm)"
          :allowClear="false"
          style="width: 90%; margin-right: 10px"
          v-model="cascadeChoose"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
  
  <script>
import {
  infoSubmitTableDataSourceClass_CN,
  infoSubmitTableDataSourceClass_EN,
} from '@/config/class/infoSubmitTableDataSourceClass.js'
import store from '@/store'
export default {
  data() {
    return {
      canDeepEdit: false,
      index: -1,
      type: 'activity',
      visible: false,
      FactorForm: {},
      cascadeChoose: [],

      infoSubmitTableDataSourceClass_CN,
      infoSubmitTableDataSourceClass_EN,
    }
  },
  methods: {
    open(factorDataSTR, canDeepEdit, index, type) {
      this.FactorForm = JSON.parse(factorDataSTR)
      this.canDeepEdit = canDeepEdit
      this.index = index
      this.type = type
      this.visible = true
      this.cascaderDefualtValChoose()
      console.log('factorformmodal', this.FactorForm, this.canDeepEdit, this.index, this.type)
    },
    close() {
      this.visible = false
    },
    cascaderOptionCreate() {
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
      if (this.FactorForm.defaultVal.length == 0) {
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
        for (let i = 0; i < this.FactorForm.defaultVal.length; i++) {
          defaultChild.push({
            value: `DEFAULT_${i}`,
            label: `${this.FactorForm.defaultVal[i].val}(${this.FactorForm.defaultVal[i].description})`,
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
    cascadeChange(val) {
      console.log(val, this.FactorForm)
      if (val[0] != 'DEFAULT') {
        this.FactorForm.defaultValChooseIdx = -1
        this.FactorForm.dataSource = val[0]
      } else {
        if (val[1] != '') {
          this.FactorForm.dataSource = val[0]
          this.FactorForm.defaultValChooseIdx = parseInt(val[1].split('_')[1])
          //   this.SetDefaultVal(this.FactorForm)
        } else {
          this.FactorForm.defaultValChooseIdx = -1
          this.FactorForm.dataSource = 'MEASURE'
        }
      }
    },
    cascaderDefualtValChoose() {
      let res = []
      res.push(this.FactorForm.dataSource)
      if (
        this.FactorForm.dataSource == 'DEFAULT' &&
        this.FactorForm.defaultVal.length > 0 &&
        this.FactorForm.defaultValChooseIdx != -1
      ) {
        res.push(`DEFAULT_${this.FactorForm.defaultValChooseIdx}`)
        // this.SetDefaultVal(this.FactorForm)
      }
      this.cascadeChoose = res
    },

    addDefaultVal() {
      this.FactorForm.defaultVal.push({
        val: null,
        description: '',
      })
    },
    removeDefaulVal(idx) {
      if (this.FactorForm.dataSource == 'DEFAULT') {
        this.FactorForm.defaultValChooseIdx = -1
        this.FactorForm.dataSource = 'MEASURE'
        this.cascaderDefualtValChoose()
      }
      this.FactorForm.defaultVal.splice(idx, 1)
    },
    DefaultValValidate() {
      //   console.log(val)
      // 检查this.FactorForm.defaultVal 是否所有的元素都有val和description
      if (this.FactorForm.defaultVal.length == 0) {
        return true
      }
      let flag = true
      this.FactorForm.defaultVal.forEach((item) => {
        if (item.val != null && item.description) {
          flag = true
        } else {
          flag = false
        }
        if (this.FactorForm.dataUnit == '%' && item.val > 1) {
          callback(new Error('百分比数值不能大于1'))
          flag = false
          return false
        }
      })
      if (flag) {
        return true
      } else {
        this.$message.warning('请填写完整缺省值信息,包括数值和描述')
        return false
      }
    },
    save() {
      let res = this.DefaultValValidate()
      this.$refs.FactorFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error('请完整填写信息')
        } else if (res == true && valid == true) {
          this.$emit('updateFactorForm', this.FactorForm, this.index, this.type, 'update')
          this.close()
          this.$message.success('编辑成功')
        }
      })
    },
  },
  computed: {
    lang() {
      return this.$store.state.app.lang
    },
  },
  mounted() {},
}
</script>
  
  <style>
</style>