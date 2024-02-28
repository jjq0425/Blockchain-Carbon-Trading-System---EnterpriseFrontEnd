
<template>
  <!-- table -->
  <div>
    <div>
      <div
        style="
          width: 100%;
          border-radius: 10px;
          background: linear-gradient(275deg, #42e695, #3bb2b8);
          min-height: 120px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        "
      >
        <img
          src="@/assets/pages/info/infoSubmissionCenter/CarbonSum.png"
          alt=""
          style="width: 100px; margin-left: 50px; margin: auto 50px"
        />
        <div style="color: white; width: 300px">
          <div>
            <!-- <span style="font-size: 42px; color: white; font-weight: bold">{{ dataSource.sumEmission }}</span> -->
            <a-statistic
              title=""
              :precision="6"
              :value="dataSource.sumEmission"
              :valueStyle="{ fontSize: '42px', color: 'white', fontWeight: 'bold' }"
            />
            <!-- <span style="margin-left: 20px">tCO₂</span> -->
          </div>
          <div>本年度碳排放量<span> (tCO₂)</span></div>
        </div>

        <div style="color: white; margin-left: 50px; width: 350px">
          <div>
            <!-- <span style="font-size: 42px; color: white; font-weight: bold">{{ enterpriseRemainEmission() }}</span> -->
            <a-statistic
              title=""
              :precision="6"
              :value="enterpriseRemainEmission"
              :valueStyle="{ fontSize: '42px', color: 'white', fontWeight: 'bold' }"
            />
          </div>
          <div>
            企业原剩余碳排放量<span> (tCO₂)</span><span style="font-size: 10px">（未含在本页填报的本年度碳排量）</span>
          </div>
        </div>
      </div>
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
        <a-tab-pane v-for="(name, idx) in MainClassName.length" :key="`tab_${idx}`" :tab="MainClassName[idx]">
          <emission-submit-table
            :tableIdx="idx"
            :classdata="dataSource.detail[idx]"
            :tableSetOptionsChecked="tableSetOptionsChecked"
            @dataUpdate="dataUpdate"
          ></emission-submit-table>
        </a-tab-pane>
      </a-tabs>
    </div>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <h4>如何切换模块？</h4>
      <p>
        点击左侧Tab栏可以切换到不同的填报模块。您所属行业为：{{ enterpriseClassName }}，因此一共需要填报{{
          MainClassName.length
        }}个模块，分别是{{ MainClassName.join('，') }}。
      </p>
      <h4>如何编辑、修改、新增排放项目？</h4>
      <p>
        在右侧表格中点击【删除】可以删除当前排放源，点击【编辑】可以对排放源信息（包括排放源名称以及活动水平、排放因子、数据来源）进行编辑，点击下方【新增项目】可以新增排放源
      </p>
      <h4>数据来源有哪些分类？</h4>
      <p>
        系统对数据源进行了统一分类。关于数据源分类的问题，您可以点击<a @click="openDataSourceQuestionModal()">这里</a
        >查看
      </p>
      <dataSourceQuestionModal ref="dataSourceQuestionModal"></dataSourceQuestionModal>
    </div>
  </div>
</template>

<script>
import { GetMainClassName } from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/parserTable.js'
import { template_1 } from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/template.js'
import emissionSubmitTable from './emissionSubmitCompnent/emissionSubmitTable.vue'
import { ScrollNumber } from 'vue2-scroll-number'
import store from '@/store'
import dataSourceQuestionModal from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/dataSourceQuestionModal'
export default {
  name: 'emissionSubmit',
  data() {
    return {
      // table
      // columns: [], // 用于存储列的配置
      // colkey: [], // 用于存储列的key
      // activeKey: 0,
      dataSource: {
        sumEmission: 0,
      }, // 用于存储数据源
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
    ScrollNumber,
    dataSourceQuestionModal,
  },
  mounted() {
    this.initTable()
  },
  computed: {
    enterpriseRemainEmission() {
      return this.$store.state.user.info.remainEmission
    },
    enterpriseClassName() {
      return this.$store.state.user.info.enterpriseClassName_CN
    },
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
    },

    reconcludeSum() {
      let res = 0
      for (let i = 0; i < this.MainClassName.length; i++) {
        // let sum=0
        // for(let j=0;j<this.dataSource.detail[i].children.length;j++){
        //   sum+=parseFloat(this.dataSource.detail[i].children[j].classDataSum)
        // }
        // this.dataSource.detail[i].classDataSum=sum
        res += parseFloat(this.dataSource.detail[i].classDataSum)
      }
      this.dataSource.sumEmission = res.toFixed(6)
      this.$forceUpdate()
    },

    // 数据被修改
    dataUpdate(idx, updatedData) {
      this.dataSource.detail[idx] = updatedData
      this.reconcludeSum()
    },

    // 表格配置项
    ontableSetOptionsChange() {
      // console.log('checked = ', checkedValues);
      // console.log('value = ', this.tableSetOptionsChecked)
    },
    /**
     * 打开数据源问题弹窗
     */
    openDataSourceQuestionModal() {
      // console.log(this.$refs.dataSourceQuestionModal)
      this.$refs.dataSourceQuestionModal.open()
    },
    /**
     * 父组件获取
     */
    getSourceData() {
      return this.dataSource
    },
    // OLD
    // newMember() {
    //   const length = this.data.length
    //   this.data.push({
    //     key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
    //     name: '',
    //     workId: '',
    //     department: '',
    //     editable: true,
    //     isNew: true,
    //   })
    // },
    // remove(key) {
    //   const newData = this.data.filter((item) => item.key !== key)
    //   this.data = newData
    // },
    // saveRow(record) {
    //   this.memberLoading = true
    //   const { key, name, workId, department } = record
    //   if (!name || !workId || !department) {
    //     this.memberLoading = false
    //     this.$message.error('请填写完整成员信息。')
    //     return
    //   }
    //   // 模拟网络请求、卡顿 800ms
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve({ loop: false })
    //     }, 800)
    //   }).then(() => {
    //     const target = this.data.find((item) => item.key === key)
    //     target.editable = false
    //     target.isNew = false
    //     this.memberLoading = false
    //   })
    // },
    // toggle(key) {
    //   const target = this.data.find((item) => item.key === key)
    //   target._originalData = { ...target }
    //   target.editable = !target.editable
    // },
    // getRowByKey(key, newData) {
    //   const data = this.data
    //   return (newData || data).find((item) => item.key === key)
    // },
    // cancel(key) {
    //   const target = this.data.find((item) => item.key === key)
    //   Object.keys(target).forEach((key) => {
    //     target[key] = target._originalData[key]
    //   })
    //   target._originalData = undefined
    // },
    // handleChange(value, key, column) {
    //   const newData = [...this.data]
    //   const target = newData.find((item) => key === item.key)
    //   if (target) {
    //     target[column] = value
    //     this.data = newData
    //   }
    // },
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

.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0, 0, 0, 0.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>