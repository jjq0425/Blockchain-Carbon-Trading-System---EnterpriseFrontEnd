<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <a-modal
    title="识别结果复核"
    v-model="visible"
    :footer="null"
    :width="800"
    :dialog-style="{ top: '20px' }"
    :maskClosable="false"
    :cancel="close"
    destroyOnClose
  >
    <div style="height: 500px; padding: 20px; overflow: scroll">
      <div>以下是对发票项的识别结果，请您复核并匹配选择对应的本模块（{{ className }}）报送项——</div>

      <a-table
        :columns="columns"
        :data-source="data_for_table"
        :pagination="false"
        style="margin-top: 10px; box-shadow: 0 5px 15px 0 rgba(176, 191, 231, 0.35); background-color: white"
      >
        <!-- <a slot="name" slot-scope="text">{{ text }}</a> -->
        <template slot="index" slot-scope="text, record, index">{{ index + 1 }}</template>
        <template slot="ocrName" slot-scope="text, record">{{ record.ocrName }}</template>
        <template slot="ocrNum" slot-scope="text, record">
          <a-input-number
            v-model="record.ocrNum"
            :min="0"
            :max="999999"
            placeholder="请输入数值"
            style="width: 120px"
          />
        </template>
        <template slot="match" slot-scope="text, record">
          <a-select style="width: 200px" v-model="record.match">
            <a-select-option v-for="item in record.cascaderOption" :key="item.value" :value="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </template>
      </a-table>

      <div style="margin-top: 20px; width: 100%; border-radius: 10px; background-color: #f9fbff; padding: 20px">
        <h3>温馨提示</h3>

        <p>
          请您逐项选择识别结果对应的报送项，并核对修正识别数额，识别数额将累加到对应报送项的活动水平第一子项中，且数据来源计为“发票台账”。若有发票内容为额外内容，请选择“不匹配此项”，该项内容会被忽略。
        </p>
      </div>
    </div>
    <div style="display: flex; justify-content: right">
      <a-button type="danger" @click="close">关闭</a-button>
      <a-button type="primary" @click="handleOk" style="margin-left: 10px">确定</a-button>
    </div>
  </a-modal>
</template>
  
  <script>
import store from '@/store'
// import aiOCRLottie from './aiOCRLottie.vue'
import axios from 'axios'

export default {
  data() {
    return {
      visible: false,

      ocrResult: null,
      dataSource: null,

      data_for_table: [],

      className: '',

      columns: [
        {
          title: '#',
          //   dataIndex: 'index',
          scopedSlots: { customRender: 'index' },
          key: 'index',
        },
        {
          title: '识别项',

          scopedSlots: { customRender: 'ocrName' },
          key: 'ocrName',
        },
        {
          title: '识别数额',
          scopedSlots: { customRender: 'ocrNum' },
          key: 'ocrNum',
        },
        {
          title: '匹配项',
          scopedSlots: { customRender: 'match' },
          key: 'match',
        },
      ],
    }
  },
  components: {},
  computed: {
    lang() {
      return this.$store.state.app.lang
    },
  },
  methods: {
    open(ocrResult, dataSource, className) {
      this.data_for_table = []
      this.ocrResult = JSON.parse(JSON.stringify(ocrResult)).words_result
      this.dataSource = JSON.parse(JSON.stringify(dataSource))
      this.className = className
      this.visible = true
      this.$notification.open({
        message: '已为您识别到发票结果',
        description: '请根据识别结果核对并选择报送匹配项',
        icon: <a-icon type="chrome" style="color:#12b886" />,
        style: {
          // background: `linear-gradient(135deg,white ,#a5d8ff 50%,#dbe4ff )`,
          background: `url('https://xinghuo.xfyun.cn/static/media/n-hover-bg.971eecbfea9dbd3797f7.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        },
      })
      this.initOptions()
    },
    initOptions() {
      let cascaderOption = [
        {
          label: '不匹配此项',
          value: '-1',
        },
      ]
      for (let i = 0; i < this.dataSource.length; i++) {
        let opt_obj = {
          label: this.dataSource[i].className,
          value: i.toString(),
          // children:this.dataSource[i].children
        }
        cascaderOption.push(opt_obj)
      }
      this.initTable(cascaderOption)
    },
    initTable(cascaderOption) {
      for (let i = 0; i < this.ocrResult.CommodityNum.length; i++) {
        let obj = {
          ocrName: this.ocrResult.CommodityName[i].word,
          ocrNum: parseFloat(this.ocrResult.CommodityNum[i].word),
          cascaderOption: cascaderOption,
          match: '-1',
        }
        this.data_for_table.push(obj)
      }
    },
    close() {
      this.ocrResult = null

      this.visible = false
    },
    handleOk() {
      let data = this.data_for_table
      let IdxNeedUpdate = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].match != '-1') {
          // IdxNeedUpdate.push(data[i].match)
          //有可能有重复，要去重
          if (IdxNeedUpdate.indexOf(data[i].match) == -1) {
            IdxNeedUpdate.push(data[i].match)
          }
        }
      }

      //把data的每一项都逐项加入到dataSource数组的dataNum中
      for (let i = 0; i < data.length; i++) {
        let idx = parseInt(data[i].match)
        if (idx == -1) continue
        this.dataSource[idx].activityFactor[0].dataNum += data[i].ocrNum
        this.dataSource[idx].activityFactor[0].dataSource = 'INVOICE'
        this.dataSource[idx].activityFactor[0].defaultValChooseIdx = -1
      }
      setTimeout(() => {
        if (IdxNeedUpdate.length > 0) {
          this.$emit('ocr_update', IdxNeedUpdate, this.dataSource)
        }
      }, 100)

      this.close()
    },
  },
}
</script>
  
  <style scoped>
/deep/ .ant-modal-content {
  background: url('https://openres.xfyun.cn/xfyundoc/2024-01-30/771f3dc3-4880-4cbf-979e-24d709e585b6/1706555813768/%E4%BD%8D%E5%9B%BE%20(3).png');
  background-repeat: no-repeat;
  background-size: cover;
}
/deep/ .ant-modal-header {
  /* background: url('https://openres.xfyun.cn/xfyundoc/2024-01-30/771f3dc3-4880-4cbf-979e-24d709e585b6/1706555813768/%E4%BD%8D%E5%9B%BE%20(3).png'); */
  /* 将图片左移动 */
  background-color: #ebf1fe;
  background-position: 10% 10%;
}

/deep/ .ant-input {
  background: white !important;
  border: none;
  box-shadow: 0 5px 15px 0 rgba(176, 191, 231, 0.95);
  border-radius: 10px;
}
</style>