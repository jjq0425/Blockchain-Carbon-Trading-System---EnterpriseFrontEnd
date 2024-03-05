<template>
  <div>
    <a-form-model layout="vertical" :model="formData">
      <a-form-model-item label="报送项名">
        <a-input v-model="className" placeholder="请输入" />
      </a-form-model-item>
      <a-divider orientation="left" style="color: #339af0" dashed> 活动水平 </a-divider>

      <div>
        <a-table :columns="columns" :data-source="filter_activity">
          <template slot="dataDefualt" slot-scope="text, record">{{ record.defaultVal.length }}</template>
          <template slot="actions" slot-scope="text, record, index">
            <a-icon type="edit" @click="openDetailEditModal(record, index, 'activity')" />
          </template>
        </a-table>
      </div>

      <a-divider orientation="left" style="color: #339af0" dashed> 排放因子 </a-divider>

      <div>
        <a-table :columns="columns" :data-source="filter_Emission">
          <template slot="dataDefualt" slot-scope="text, record">{{ record.defaultVal.length }}</template>
          <template slot="actions" slot-scope="text, record, index">
            <a-icon type="edit" @click="openDetailEditModal(record, index, 'Emission')" />
          </template>
        </a-table>
      </div>

      <a-form-model-item>
        <a-popconfirm title="确认不保存关闭？" ok-text="确认" cancel-text="取消" @confirm="handleClose">
          <a-button> 不保存关闭 </a-button>
        </a-popconfirm>
        <a-popconfirm title="确认删除此项？" ok-text="确认" cancel-text="取消" @confirm="remove">
          <a-button
            type="danger"
            style="margin-left: 10px"
            v-if="!(extraOption.canAdd == false || extraOption.length == 1) && type != 'add'"
          >
            删除
          </a-button>
        </a-popconfirm>
        <a-tooltip>
          <template slot="title">不允许删除当前项目</template>
          <a-button
            type="danger"
            style="margin-left: 10px"
            v-if="extraOption.canAdd == false || extraOption.length == 1"
            :disabled="extraOption.canAdd == false || extraOption.length == 1"
          >
            删除
          </a-button>
        </a-tooltip>

        <a-button type="primary" style="margin-left: 10px" @click="save"> 保存并提交 </a-button>
      </a-form-model-item>
    </a-form-model>
    <factorFormModal ref="factorFormModalRef" @updateFactorForm="updateFactorForm"></factorFormModal>
  </div>
</template>

<script>
import factorFormModal from './factorFormModal.vue'

export default {
  components: {
    factorFormModal,
  },
  props: {
    datas: {
      type: String,
      default: '',
    },
    parentIdx: {
      type: Number,
      default: -1,
    },
    idx: {
      type: Number,
      default: -1,
    },
    type: {
      type: String,
      default: 'edit',
    },
    // 注意，传过来的时候会把className吞掉
    classNameTEMP: {
      type: String,
      default: '',
    },
    extra: {
      type: Object,
    },
  },
  computed: {
    className: {
      get() {
        return this.classNameTEMP
      },
      set(val) {
        this.classNameTEMP = val
      },
    },
  },
  data() {
    return {
      formData: {},
      className: '你',
      filter_activity: [],
      filter_Emission: [],

      extraOption: {
        canAdd: false,
        length: 0,
      },

      columns: [
        {
          title: '名称',
          key: 'dataName',
          dataIndex: 'dataName',
          scopedSlots: { customRender: 'dataName' },
        },
        {
          title: '单位',
          key: 'dataUnit',
          dataIndex: 'dataUnit',
          scopedSlots: { customRender: 'dataUnit' },
        },
        {
          title: '默认值数量',
          key: 'dataDefualt',
          dataIndex: 'dataDefualt',
          scopedSlots: { customRender: 'dataDefualt' },
        },
        {
          title: '操作',
          key: 'actions',
          //   dataIndex: 'dataDefualt',
          scopedSlots: { customRender: 'actions' },
        },
      ],
    }
  },
  methods: {
    initData() {
      if (this.type === 'edit') {
        this.formData = JSON.parse(this.datas)
        delete this.formData.dataRef
        // console.log(this.formData)
        this.className = this.classNameTEMP
        this.formData.key = `0-${this.parentIdx}-${this.idx}`
        //删除
        this.extraOption = this.extra
        // console.log(this.extraOption, this.extra)
        this.filter_activity_calcu()
        this.filter_Emission_calcu()

        this.$forceUpdate()
      } else {
        this.formData = JSON.parse(this.datas)
        delete this.formData.dataRef
        // console.log(this.formData)
        this.className = this.classNameTEMP
        this.formData.key = `0-${this.parentIdx}-${this.idx}`
        //删除
        this.extraOption = this.extra
        // console.log(this.extraOption, this.extra)
        this.filter_activity_calcu()
        this.filter_Emission_calcu()

        this.$forceUpdate()
      }
    },
    handleClose() {
      this.formData = {}
      this.$emit('close')
    },
    openDetailEditModal(record, index, type) {
      if (type == 'activity') {
        let searchArry = this.formData.activityFactor.filter((item) => item.isConst !== true)

        let canDeepEdit = this.canDeepEdit(searchArry)
        let recordStr = JSON.stringify(record)
        this.$refs.factorFormModalRef.open(recordStr, canDeepEdit, index, type)
      } else {
        let searchArry = this.formData.EmissionFactor.filter((item) => item.isConst !== true)

        let canDeepEdit = this.canDeepEdit(searchArry)
        let recordStr = JSON.stringify(record)
        this.$refs.factorFormModalRef.open(recordStr, canDeepEdit, index, type)
      }
    },
    canDeepEdit(factors) {
      return factors.length == 1
    },
    updateFactorForm(FactorForm, index, type, updateType) {
      //   console.log(FactorForm, index, type, updateType)
      if (updateType == 'update') {
        if (type == 'activity') {
          this.formData.activityFactor[index] = FactorForm
          this.filter_activity_calcu()
        } else {
          this.formData.EmissionFactor[index] = FactorForm
          this.filter_Emission_calcu()
        }
      } else {
      }
      //   console.log(this.filter_activity, this.formData)
    },
    filter_activity_calcu() {
      let retu = this.formData.activityFactor.filter((item) => item.isConst !== true)
      let res = JSON.parse(JSON.stringify(retu))
      this.filter_activity = res
    },
    filter_Emission_calcu() {
      let retu = this.formData.EmissionFactor.filter((item) => item.isConst !== true)
      let res = JSON.parse(JSON.stringify(retu))
      this.filter_Emission = res
    },
    save() {
      this.formData.className = this.className
      console.log('save', this.formData)
      this.$emit('save', this.formData, this.parentIdx, this.idx, this.type)
    },
    remove() {
      this.$emit('remove', this.parentIdx, this.idx)
    },
  },
  computed: {},
  mounted() {
    this.initData()
  },
}
</script>

<style>
</style>