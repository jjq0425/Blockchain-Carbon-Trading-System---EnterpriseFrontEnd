<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <!-- table -->
  <div>
    <a-table :columns="columns" :dataSource="data" :pagination="false" bordered :scroll="{ x: 200, y: 400 }">
      <template slot="index" slot-scope="text">
        {{ text.index }}
      </template>
      <template v-for="(col, i) in ['name', 'workId', 'department']" :slot="col" slot-scope="text, record">
        <a-input
          :key="col"
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          :placeholder="columns[i].title"
          @change="(e) => handleChange(e.target.value, record.key, col)"
        />

        <template v-else> /></template>
      </template>
      <!-- 
      <template slot="operation" slot-scope="text, record">
        <template v-if="record.editable">
          <span v-if="record.isNew">
            <a @click="saveRow(record)">添加</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="saveRow(record)">保存</a>
            <a-divider type="vertical" />
            <a @click="cancel(record.key)">取消</a>
          </span>
        </template>
        <span v-else>
          <a @click="toggle(record.key)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </template> -->
      <template slot="operation" slot-scope="text, record">
        <template v-if="record.editable">
          <span v-if="record.isNew">
            <a @click="saveRow(record)">添加</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="saveRow(record)">保存</a>
            <a-divider type="vertical" />
            <a @click="cancel(record.key)">取消</a>
          </span>
        </template>
        <span v-else>
          <a @click="toggle(record.key)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </template>
      <template slot="sum" slot-scope="record"> 1 </template>
    </a-table>
    <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember"
      >新增成员</a-button
    >
  </div>
</template>

<script>
import {
  GetMainClassName,
  ConstructColumns,
} from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/parserTable.js'
import { template_1 } from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/template.js'
export default {
  name: 'emissionSubmit',
  data() {
    return {
      // table
      columns: [
        // {
        //   title: '成员姓名',
        //   dataIndex: 'activityFactor_1',
        //   key: 'activityFactor_1',
        //   scopedSlots: { customRender: 'activityFactor_1' },
        // },
        // {
        //   title: '净消耗量',
        //   dataIndex: 'activityFactor_2',
        //   key: 'activityFactor_2',
        //   scopedSlots: { customRender: 'activityFactor_2' },
        // },
        // {
        //   title: '单位热值含碳量',
        //   dataIndex: 'EmissionFactor_1',
        //   key: 'EmissionFactor_1',
        //   scopedSlots: { customRender: 'EmissionFactor_1' },
        // },
        // {
        //   title: '碳氧化率',
        //   dataIndex: 'EmissionFactor_2',
        //   key: 'EmissionFactor_2',
        //   scopedSlots: { customRender: 'EmissionFactor_2' },
        // },
        // {
        //   title: '碳氧化率',
        //   key: 'action',
        //   scopedSlots: { customRender: 'operation' },
        // },
      ],
      data: [
        {
          index: 1,
          activityFactor_1: 100.1,
          activityFactor_2: 100.1,
          EmissionFactor_1: 100.1,
          EmissionFactor_2: 100.2,
          sum: 100,
        },
        // {
        //   key: '2',
        //   name: '李莉',
        //   workId: '002',
        //   editable: false,
        //   department: 'IT部',
        // },
        // {
        //   key: '3',
        //   name: '王小帅',
        //   workId: '003',
        //   editable: false,
        //   department: '财务部',
        // },
      ],
    }
  },
  mounted() {
    console.log('11', GetMainClassName(template_1))
    console.log(22, ConstructColumns(template_1.detail[0].children))
    this.columns = ConstructColumns(template_1.detail[0].children)
  },
  methods: {
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