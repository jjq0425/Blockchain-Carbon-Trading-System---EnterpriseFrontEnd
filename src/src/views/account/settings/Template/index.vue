
<template>
  <!-- <a-list
      itemLayout="horizontal"
      :dataSource="data"
    >
  
    </a-list> -->
  <div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;
        background: linear-gradient(135deg, #dbe4ff, #d0ebff);
        padding: 10px 30px;
        border-radius: 999px;
      "
    >
      <div style="color: #134089; font-size: 12px">
        设计个性化模板后，点击右侧按钮即可导出模板，在填报时进行导入，方便快捷。您也可以导入已有模板进行二次修改、二次编辑。
      </div>
      <div style="width: 30%; margin-left: 40px">
        <a-button-group>
          <a-tooltip>
            <template slot="title"> 导出模板以便您下次填报时可直接使用 </template>
            <a-button icon="cloud-download" @click="exportData"> 导出模板 </a-button>
          </a-tooltip>

          <a-tooltip>
            <template slot="title"> 将导出的模板/数据重新导入，然后您可以对模板进行修改 </template>
            <a-button icon="cloud-upload" @click="importData" v-if="submitType != 'detail'"> 导入模板 </a-button>
          </a-tooltip>
          <input type="file" @change="loadTextFromFile" id="txtUpload" style="display: none" />
        </a-button-group>
      </div>
    </div>
    <div>
      <a-row :gutter="24">
        <a-col :xl="10" :lg="24" :md="24" :sm="24" :xs="24">
          <a-tree :tree-data="treeData" :expandedKeys.sync="expandedKeys" showLine @select="onSelect" defaultExpandAll>
          </a-tree>
        </a-col>

        <a-col :xl="14" :lg="24" :md="24" :sm="24" :xs="24">
          <div
            style="
              background-color: white;
              box-shadow: 0 0px 25px 0 rgba(176, 191, 231, 0.25);
              border: 2px dashed #134089;
              min-height: 650px;
              max-height: 850px;
              overflow-y: scroll;
              border-radius: 10px;
              padding: 20px;
            "
          >
            <div v-if="currentFloor == -1">
              <a-result title="加载中，请稍后">
                <template #icon>
                  <a-icon type="loading" style="color: #339af0; font-size: 50px" />
                </template>
              </a-result>
            </div>
            <!-- 默认是第零层 -->
            <div v-if="currentFloor == 0">
              <a-result title="个性化填报模板" sub-title="设计后点击右上角导出模板即可在填报时使用">
                <template #icon>
                  <img src="@/assets/pages/user/account/template/templateGuide.png" alt="" style="width: 400px" />
                </template>
              </a-result>
            </div>
            <!-- 第一层被点击的时候 -->
            <div v-if="currentFloor == 1">
              <a-result :title="`${Floor1Data.title}`" sub-title="您当前位于本模块">
                <template #icon>
                  <a-icon type="smile" theme="twoTone" />
                </template>
                <template #extra>
                  <a-button
                    type="danger"
                    @click="
                      () => {
                        currentFloor = 0
                      }
                    "
                  >
                    {{ $t('modal.btn.close') }}
                  </a-button>
                  <a-tooltip>
                    <template #title>
                      {{ Floor1Data.canAdd == true ? '点击向本模块添加子元素' : '本模块暂不支持新增子项目' }}
                    </template>
                    <a-button type="primary" :disabled="!Floor1Data.canAdd" @click="addChild()"> 新增子结点 </a-button>
                  </a-tooltip>
                </template>
              </a-result>
            </div>

            <div v-if="currentFloor == 2">
              <floor2Form
                :datas="Floor2Data.datas"
                :parentIdx="Floor2Data.parentIdx"
                :idx="Floor2Data.idx"
                :type="Floor2Data.type"
                :extra="Floor2Data.extra"
                :classNameTEMP="Floor2Data.className"
                @close="
                  () => {
                    currentFloor = 0
                  }
                "
                @save="updateData"
                @remove="removeData"
              ></floor2Form>
            </div>
            <!-- 作为增加结点专用 -->
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
  
  <script>
import { enterpriseClassName_CN } from '@/config/class/enterpriseClass.js'
import { template_THS } from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/template.js'
import floor2Form from './floor2Form.vue'
import { saveAs } from 'file-saver'
import dayjs from 'dayjs'

const Base64 = require('js-base64').Base64
export default {
  components: {
    floor2Form,
  },
  data() {
    return {
      template_THS,
      enterpriseClassName_CN,

      treeData: [],
      dataTemplate: null,

      expandedKeys: [],

      currentFloor: 0,

      Floor1Data: {
        title: 'Floor 1',
        canAdd: false,
        parentIdx: -1,
        idx: -1,
      },
      Floor2Data: {
        datas: {},
        parentIdx: -1,
        idx: -1,
        type: 'edit',
        className: '',
        extra: {
          canAdd: false,
          length: 0,
        },
      },
    }
  },
  computed: {
    enterpriseClass() {
      return this.$store.state.user.info.enterpriseClass
    },
  },
  mounted() {
    this.initTree()
  },
  methods: {
    async chooseTemplate() {
      // this.$forceUpdate()

      let template = JSON.stringify(this.template_THS[`template_${this.enterpriseClass}`])

      // this.dataSource = JSON.parse(template)
      this.dataTemplate = JSON.parse(template)

      // console.log('88template', template)
    },
    async initTree(hasSource = false, source = {}) {
      if (!hasSource) {
        await this.chooseTemplate()
      } else {
        this.dataTemplate = source
      }
      // 加入第一层级
      let root = {}
      root.floor = 0
      root.key = '0'
      root.title = this.enterpriseClassName_CN[this.enterpriseClass]
      root.children = []
      root.selectable = false
      this.expandedKeys = []
      this.expandedKeys.push(root.key)

      // 加入第二层级

      for (let a = 0; a < this.dataTemplate.detail.length; a++) {
        // 把className加入到treeData,作为子节点
        root.children.push(this.dataTemplate.detail[a])
        root.children[a].floor = 1
        root.children[a].idx = a
        root.children[a].parentIdx = -1
        root.children[a].key = `0-${a}`
        root.children[a].title = this.dataTemplate.detail[a].className
        this.expandedKeys.push(root.children[a].key)

        for (let b = 0; b < this.dataTemplate.detail[a].children.length; b++) {
          root.children[a].children[b].floor = 2
          root.children[a].children[b].parentIdx = a
          root.children[a].children[b].idx = b
          root.children[a].children[b].key = `0-${a}-${b}`

          root.children[a].children[b].title = this.dataTemplate.detail[a].children[b].className
          // 进入三级子类
        }
      }
      //   console.log('treeData', root)
      //   root_LAST.push(JSON.parse(JSON.stringify(root)))
      this.treeData.push(root)
      this.$forceUpdate()
    },

    async ReinitTree(zancun) {
      // 加入第一层级
      let root = {}
      root.floor = 0
      root.key = '0'
      root.title = this.enterpriseClassName_CN[this.enterpriseClass]
      root.children = []
      root.selectable = false
      this.expandedKeys = []
      this.expandedKeys.push(root.key)

      // 加入第二层级

      for (let a = 0; a < zancun.children.length; a++) {
        // 把className加入到treeData,作为子节点
        root.children.push(zancun.children[a])
        root.children[a].floor = 1
        root.children[a].idx = a
        root.children[a].parentIdx = -1
        root.children[a].key = `0-${a}`
        root.children[a].title = zancun.children[a].className
        this.expandedKeys.push(root.children[a].key)

        // 对每个一级子类，形成二级子类
        for (let b = 0; b < zancun.children[a].children.length; b++) {
          //   root.children[a].children.push({
          //     title: this.dataTemplate.detail[a].children[b].className,
          //     key: `0-${a}-${b}`,
          //     floor: 1,
          //   })
          //   root.children[a].children.push(this.dataTemplate.detail[a].children[b])
          root.children[a].children[b].floor = 2
          root.children[a].children[b].parentIdx = a
          root.children[a].children[b].idx = b
          root.children[a].children[b].key = `0-${a}-${b}`

          root.children[a].children[b].title = zancun.children[a].children[b].className
          // 进入三级子类
        }
      }
      console.log('REtreeData', root)
      //   root_LAST.push(JSON.parse(JSON.stringify(root)))
      this.treeData.push(root)
      this.$forceUpdate()
    },
    onSelect(selectedKeys, info) {
      console.log(selectedKeys, info)
      if (info.selectedNodes[0].data.props.floor == 1) {
        // 添加子节点
        this.currentFloor = -1
        this.Floor1Data.title = info.selectedNodes[0].data.props.title
        this.Floor1Data.canAdd = info.selectedNodes[0].data.props.canAdd
        this.Floor1Data.idx = info.selectedNodes[0].data.props.idx
        setTimeout(() => {
          this.currentFloor = 1
        }, 400)
      } else if (info.selectedNodes[0].data.props.floor == 2) {
        // 添加子节点

        this.currentFloor = -1

        this.Floor2Data.datas = JSON.stringify(info.selectedNodes[0].data.props)
        this.Floor2Data.parentIdx = info.selectedNodes[0].data.props.parentIdx

        this.Floor2Data.idx = info.selectedNodes[0].data.props.idx
        this.Floor2Data.extra.canAdd = this.treeData[0].children[this.Floor2Data.parentIdx].canAdd
        this.Floor2Data.extra.length = this.treeData[0].children[this.Floor2Data.parentIdx].children.length

        this.Floor2Data.type = 'edit'
        this.Floor2Data.className = info.selectedNodes[0].data.class
        setTimeout(() => {
          this.currentFloor = 2
        }, 400)
      }
    },
    updateData(formData, tparentIdx, idx, type) {
      if (type == 'edit') {
        let zancun = JSON.parse(JSON.stringify(this.treeData[0]))
        zancun.children[tparentIdx].children[idx] = formData
        zancun.children[tparentIdx].children[idx].title = zancun.children[tparentIdx].children[idx].className
        this.treeData = []
        setTimeout(() => {
          this.treeData.push(zancun)
        }, 0)
        this.$message.success('修改成功')
        this.currentFloor = 0
      } else {
        let zancun = JSON.parse(JSON.stringify(this.treeData[0]))
        zancun.children[tparentIdx].children.push(formData)
        zancun.children[tparentIdx].children[idx].title = zancun.children[tparentIdx].children[idx].className
        this.treeData = []
        this.ReinitTree(zancun)

        this.$message.success('新增成功')
        this.currentFloor = 0
      }
      this.$forceUpdate()
    },
    removeData(tparentIdx, idx) {
      let zancun = JSON.parse(JSON.stringify(this.treeData[0]))
      zancun.children[tparentIdx].children.splice(idx, 1)
      //   删除后需要更新一轮
      //   console.log(zancun)
      this.treeData = []
      this.ReinitTree(zancun)
      //   zancun就是root

      this.$message.success('删除成功')
      this.currentFloor = 0

      this.$forceUpdate()
    },
    addChild() {
      this.Floor2Data.parentIdx = this.Floor1Data.idx
      this.Floor2Data.idx = this.treeData[0].children[this.Floor2Data.parentIdx].children.length
      this.Floor2Data.extra.canAdd = this.treeData[0].children[this.Floor2Data.parentIdx].canAdd
      this.Floor2Data.extra.length = this.treeData[0].children[this.Floor2Data.parentIdx].children.length
      this.Floor2Data.className = ''
      this.Floor2Data.type = 'add'
      this.currentFloor = -1
      let temData = JSON.parse(JSON.stringify(this.treeData[0].children[this.Floor2Data.parentIdx].children[0]))
      temData.floor = 2
      temData.key = `0-${this.Floor2Data.parentIdx}-${this.Floor2Data.idx}`
      this.Floor2Data.datas = JSON.stringify(temData)

      //   不用加1因为从0开始

      setTimeout(() => {
        this.currentFloor = 2
      }, 400)
    },
    /**
     * 导入导出数据
     */
    transFormData() {
      let treeD = JSON.parse(JSON.stringify(this.treeData[0].children))
      for (let a = 0; a < treeD.length; a++) {
        delete treeD[a].key
        delete treeD[a].title
        delete treeD[a].floor
        delete treeD[a].parentIdx
        delete treeD[a].idx
        treeD[a].classDataSum = 0
        // 未改sort，所以不用改
        for (let b = 0; b < treeD[a].children.length; b++) {
          treeD[a].children[b].classSort = b + 1
          treeD[a].children[b].classDataSum = 0
          treeD[a].children[b].activityFactorNum = 0
          treeD[a].children[b].EmissionFactorNum = 0
          for (let i = 0; i < treeD[a].children[b].activityFactor.length; i++) {
            if (treeD[a].children[b].activityFactor[i].isConst != true) {
              treeD[a].children[b].activityFactor[i].dataNum = 0
            }
          }
          for (let i = 0; i < treeD[a].children[b].EmissionFactor.length; i++) {
            if (treeD[a].children[b].EmissionFactor[i].isConst != true) {
              treeD[a].children[b].EmissionFactor[i].dataNum = 0
            }
          }

          delete treeD[a].children[b].key
          delete treeD[a].children[b].title
          delete treeD[a].children[b].floor
          delete treeD[a].children[b].parentIdx
          delete treeD[a].children[b].idx
        }
      }
      console.log(treeD)
      return treeD
    },

    async exportData() {
      this.$message.loading({ content: '导出模板中...', key: 'exportData' })
      let treeD = await this.transFormData()
      setTimeout(() => {
        // 需要1. 对classSort重新排序，2. 对dataNum等赋值 3. 进行改造，删除title、key、floor、parentIdx、idx字段
        const exStr = Base64.encode(JSON.stringify(treeD)) //加密
        // const exStr = JSON.stringify(treeD) //加密
        const file = new File([exStr], `${dayjs().format('YYYY-MM-DD_HH-MM-ss')}--上报模板.json`, {
          type: 'text/plain;charset=utf-8',
        })
        saveAs(file)
        this.$message.success({ content: '保存成功,请勿修改元数据', key: 'exportData' })
      }, 500)
    },
    importData() {
      this.$confirm({
        title: this.$t('modal.notice.title'),
        content: '注意！导入数据后将覆盖原有数据，确认继续吗？',
        okType: 'danger',
        onOk() {
          document.getElementById('txtUpload').click()
          return new Promise((resolve, reject) => {
            // console.log('aa')

            resolve()
          })
        },
        onCancel() {},
      })
    },
    loadTextFromFile(e) {
      const file = e.target.files[0]
      let name = file.name.split('.').splice(-1).toString()
      if (name !== 'json') {
        this.$message.warning({ content: '文件类型错误,请重新选择文件', key: 'importData' })
        return
      }
      const reader = new FileReader()
      if (typeof FileReader === 'undefined') {
        this.$message.warning({ content: '您的浏览器不支持FileReader接口', key: 'importData' })
        return
        // alert('您的浏览器不支持FileReader接口')
      }
      this.$message.loading({ content: '数据解析中...', key: 'importData' })
      e.target.value = '' //文件置空，传重复的文件也会导入
      setTimeout(() => {
        reader.onload = (e) => this.$emit('load', this.dealFile(e.target.result))
        reader.readAsText(file, 'utf-8')
      }, 500)
    },
    dealFile(item) {
      const dcStr = Base64.decode(item) //加密
      try {
        const dcObj = JSON.parse(dcStr)
        let res = {
          detail: dcObj,
        }
        this.treeData = []
        this.expandedKeys = []
        setTimeout(() => {
          this.initTree(true, res)
        }, 200)

        this.$message.success({ content: '数据解析成功', key: 'importData' }, 1)
      } catch {
        this.$message.warning({ content: '数据解析失败,请勿修改元数据', key: 'importData' })
      }
      return
      // console.log(dcObj)
    },
  },
}
</script>
  
  <style scoped>
</style>
  