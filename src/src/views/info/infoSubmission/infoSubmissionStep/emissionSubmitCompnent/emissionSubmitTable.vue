
<template>
  <!-- table -->
  <div>
    <a-table :columns="columns" :dataSource="tableData" :pagination="false" bordered :scroll="{ x: 200, y: 400 }">
      <template slot="index" slot-scope="text, record, index">
        {{ index + 1 }}
      </template>
      <template slot="footer">
        <div style="display: flex; justify-content: right; align-items: center; width: 100%; text-align: right">
          <div style="font-weight: bold; padding-right: 30px">本模块汇总碳排量:</div>
          <a-statistic title="" :precision="5" :value="classdata.classDataSum" :valueStyle="{ color: '#1098ad' }">
            <template #suffix> <span style="font-size: 12px; color: #adb5bd; padding-left: 20px">tCO₂</span> </template>
          </a-statistic>
        </div>
      </template>
      <template slot="emissionName" slot-scope="text, record">
        {{ record.className }}
      </template>
      <template slot="sum" slot-scope="text, record">
        <span style="font-weight: bold">{{ record.classDataSum }}</span>
      </template>

      <template v-for="col in colkey" :slot="col" slot-scope="text, record">
        <div :key="col">
          <span>{{
            record[col.split('_')[0]][parseInt(col.split('_')[1]) - 1].dataUnit == '%'
              ? record[col.split('_')[0]][parseInt(col.split('_')[1]) - 1].dataNum * 100
              : record[col.split('_')[0]][parseInt(col.split('_')[1]) - 1].dataNum
          }}</span>
          <span style="font-size: 8px" v-if="tableSetOptionsChecked.includes('ShowUnit')">
            {{ record[col.split('_')[0]][parseInt(col.split('_')[1]) - 1].dataUnit }}</span
          >
          <br />
          <div
            style="font-size: 8.5px; color: #adb5bd"
            v-if="tableSetOptionsChecked.includes('ShowDataSource') && lang.includes('zh')"
          >
            ({{
              infoSubmitTableDataSourceClass_CN[record[col.split('_')[0]][parseInt(col.split('_')[1]) - 1].dataSource]
            }})
          </div>
          <div
            style="font-size: 8.5px; color: #adb5bd"
            v-else-if="tableSetOptionsChecked.includes('ShowDataSource') && lang.includes('en')"
          >
            ({{
              infoSubmitTableDataSourceClass_EN[record[col.split('_')[0]][parseInt(col.split('_')[1]) - 1].dataSource]
            }})
          </div>
          <div style="font-size: 8.5px" v-show="!tableSetOptionsChecked.includes('ShowDataSource')">&nbsp;</div>
        </div>
        <!-- <a-input
          :key="col"
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          :placeholder="columns[i].title"
          @change="(e) => handleChange(e.target.value, record.key, col)"
        /> -->
      </template>
      <!-- <template slot="action"> 按钮 </template> -->
      <template slot="action" slot-scope="text, record">
        <span>
          <a @click="toggle(record.key)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record)">
            <a style="color: #fa5252" v-if="tableData.length > 1">删除</a>
          </a-popconfirm>
          <a-popover :title="$t('modal.notice.title')" trigger="hover">
            <template slot="content">
              <p>无法删除，需至少保留一行数据</p>
            </template>
            <a style="color: #adb5bd" v-if="tableData.length == 1">删除</a>
          </a-popover>
        </span>
      </template>
    </a-table>
    <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember"
      >新增项目</a-button
    >
  </div>
</template>

<script>
import { ConstructColumns } from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/parserTable.js'
// import { template_1 } from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/template.js'
import {
  infoSubmitTableDataSourceClass_CN,
  infoSubmitTableDataSourceClass_EN,
} from '@/config/class/infoSubmitTableDataSourceClass.js'
export default {
  name: 'emissionSubmitTable',
  props: {
    classdata: {
      type: Object,
      default: () => {},
    },
    tableSetOptionsChecked: {
      type: Array,
      default: () => ['ShowUnit', 'ShowDataSource'],
    },
    tableIdx: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // table
      columns: [], // 用于存储列的配置
      colkey: [], // 用于存储列的key
      // dataSource: null, // 用于存储数据源
      // dataTemplate: null, // 用于存储数据模板
      tableData: [
        {
          emissionName: 'ranmei',
          activityFactor_1: 100.1,
          activityFactor_2: 100.1,
          EmissionFactor_1: 100.1,
          EmissionFactor_2: 100.2,
          sum: 100,
        },
      ],

      infoSubmitTableDataSourceClass_CN: infoSubmitTableDataSourceClass_CN,
      infoSubmitTableDataSourceClass_EN: infoSubmitTableDataSourceClass_EN,
    }
  },
  computed: {
    lang() {
      return this.$store.state.app.lang
    },
  },
  mounted() {
    // console.log('11', GetMainClassName(template_1))
    // console.log(22, ConstructColumns(template_1.detail[0].children))
    console.log('33', this.classdata, this.tableSetOptionsChecked)
    this.initTable()
  },
  methods: {
    initTable() {
      this.tableData = this.classdata.children
      this.columns = ConstructColumns(this.tableData).Columns
      this.colkey = ConstructColumns(this.tableData).ColKey
      // console.log(this.colkey, this.columns)
    },
    reconstructClassData(tableData = this.tableData) {
      this.classdata.children = tableData
      this.$emit('dataUpdate', this.tableIdx, this.classdata)
    },

    // 操作
    removeRow(record) {
      // 从表格中删除数据
      const newtableData = this.tableData.filter((item) => item.classSort !== record.classSort)
      // console.log(newtableData)
      this.tableData = newtableData
      this.reconstructClassData()
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

/deep/ .ant-table-footer {
  background: white;
}
</style>

