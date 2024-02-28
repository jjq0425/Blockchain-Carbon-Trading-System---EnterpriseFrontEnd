
<template>
  <!-- table -->
  <div>
    <div>
      <div class="tabelSetOptions" style="width: 100%; text-align: right">
        表格设置：
        <a-checkbox-group
          v-if="MainClassName.length > 0"
          :options="tableSetOptions"
          v-model="tableSetOptionsChecked"
          :default-value="['ShowUnit', 'ShowDataSource']"
          @change="ontableSetOptionsChange"
          style="margin-bottom: 20px"
        >
          <span slot="label" slot-scope="{ value }">{{ value }}</span>
        </a-checkbox-group>
      </div>
      <a-tabs tab-position="left" default-active-key="0">
        <a-tab-pane v-for="(name, idx) in MainClassName.length" :key="idx" :tab="MainClassName[idx]">
          <emission-submit-table
            :tableIdx="idx"
            :classdata="dataSource.detail[idx]"
            :tableSetOptionsChecked="tableSetOptionsChecked"
            @dataUpdate="dataUpdate"
          ></emission-submit-table>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { GetMainClassName } from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/parserTable.js'
import { template_1 } from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/template.js'
import emissionSubmitTable from './emissionSubmitCompnent/emissionSubmitTable.vue'
export default {
  name: 'emissionSubmit',
  data() {
    return {
      // table
      // columns: [], // 用于存储列的配置
      // colkey: [], // 用于存储列的key
      // activeKey: 0,
      dataSource: null, // 用于存储数据源
      dataTemplate: null, // 用于存储数据模板
      MainClassName: [],

      // 配置项
      tableSetOptions: [
        { label: '展示单位', value: 'ShowUnit' },
        { label: '展示来源', value: 'ShowDataSource' },
      ],
      tableSetOptionsChecked: ['ShowUnit', 'ShowDataSource'],
    }
  },
  components: {
    emissionSubmitTable,
  },
  mounted() {
    this.initTable()
  },
  methods: {
    chooseTemplate() {
      // console.log('t1', template_1.detail[0].children.length)
      // this.$forceUpdate()

      let template = JSON.stringify(template_1)

      this.dataSource = JSON.parse(template)
      this.dataTemplate = JSON.parse(template)

      // console.log('88template', template)
    },
    initTable() {
      this.chooseTemplate()
      this.MainClassName = GetMainClassName(this.dataTemplate)

      this.createTable()
    },
    createTable() {},

    // 数据被修改
    dataUpdate(idx, updatedData) {
      this.dataSource.detail[idx] = updatedData
    },

    // 表格配置项
    ontableSetOptionsChange() {
      // console.log('checked = ', checkedValues);
      // console.log('value = ', this.tableSetOptionsChecked)
    },

    // OLD
    newMember() {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        name: '',
        workId: '',
        department: '',
        editable: true,
        isNew: true,
      })
    },
    remove(key) {
      const newData = this.data.filter((item) => item.key !== key)
      this.data = newData
    },
    saveRow(record) {
      this.memberLoading = true
      const { key, name, workId, department } = record
      if (!name || !workId || !department) {
        this.memberLoading = false
        this.$message.error('请填写完整成员信息。')
        return
      }
      // 模拟网络请求、卡顿 800ms
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ loop: false })
        }, 800)
      }).then(() => {
        const target = this.data.find((item) => item.key === key)
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      })
    },
    toggle(key) {
      const target = this.data.find((item) => item.key === key)
      target._originalData = { ...target }
      target.editable = !target.editable
    },
    getRowByKey(key, newData) {
      const data = this.data
      return (newData || data).find((item) => item.key === key)
    },
    cancel(key) {
      const target = this.data.find((item) => item.key === key)
      Object.keys(target).forEach((key) => {
        target[key] = target._originalData[key]
      })
      target._originalData = undefined
    },
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.find((item) => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.ant-table-body {
  &::-webkit-scrollbar {
    //整体样式
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    //滑动滑块条样式
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    // background: #eff1f7;
  }
  &::-webkit-scrollbar-track {
    //轨道的样式
    -webkit-box-shadow: 0;
    border-radius: 0;
    background: #f6f8ff;
  }
}
</style>