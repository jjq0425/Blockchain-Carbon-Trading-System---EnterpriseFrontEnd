<template>
  <a-modal
    title="碳排放报告PDF下载"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="600"
    :footer="null"
    @cancel="close"
    destroyOnClose
  >
    <div style="display: flex; justify-content: space-around; align-items: center">
      <div style="width: 40%">
        <!-- <video src="https://chatglm.cn//media/analyze.9527f201.mp4" loop autoplay style="width: 100%"></video>
         -->
        <video src="@/assets/components/PDFgenerate/DownloadVideo.mp4" loop autoplay style="width: 100%"></video>
      </div>
      <div style="width: 60%; text-align: center">
        <div v-if="NowPercentage != 100" style="font-weight: bold; font-size: 30px; color: #108ee9">
          下载中，请稍后...
        </div>
        <div
          v-else-if="NowPercentage == 100"
          class="animate__animated animate__tada animate__repeat-2"
          style="font-weight: bold; font-size: 30px; color: #0ca678"
        >
          下载成功
        </div>
        <div
          v-if="NowPercentage != 100"
          style="width: 100%; text-align: center; font-size: 10px; color: grey; margin-top: 20px"
        >
          <a-icon type="exclamation-circle" /> &nbsp;&nbsp; 关闭弹窗后下载将中断
        </div>
        <div v-else style="width: 100%; text-align: center; font-size: 10px; color: grey; margin-top: 20px">
          <a-icon type="exclamation-circle" /> &nbsp;&nbsp; 请允许浏览器下载文件，点击右上角 × 关闭弹窗
        </div>
      </div>
    </div>
    <a-progress
      :stroke-color="{
        from: '#108ee9',
        to: '#87d068',
      }"
      :percent="NowPercentage"
      :status="NowPercentage == 100 ? 'success' : 'active'"
      :strokeWidth="2"
      :showInfo="false"
    />
    <div>[{{ NowPercentage }}%] {{ downloadStepInfo }}</div>
  </a-modal>
</template>
  
  
  
<script>
import jsPDF from 'jspdf'
import { autoTable } from 'jspdf-autotable-extra'
// import  autoTable  from 'jspdf-autotable'
import dayjs from 'dayjs'

import { enterpriseClassName_CN } from '@/config/class/enterpriseClass.js'

import { taskInfo_tem, submitData_tem } from './PDFtemplate/templateJson'

import { infoSubmitTableDataSourceClass_CN } from '@/config/class/infoSubmitTableDataSourceClass.js'
export default {
  components: {},
  data() {
    return {
      visible: false,
      confirmLoading: false,
      id: null,
      downloadStep: 0,
      downloadStepInfo: '正在准备下载',
      StartPercentage: [0, 10, 30, 70, 80, 85, 98],
      // StopPercentage: [0, 30, 70, 80, 85, 90, 100],
      NowPercentage: 0,

      // class配置
      enterpriseClassName_CN: enterpriseClassName_CN,
      submitData: {},
      sourceData: {},
      taskInfo: {},
      infoSubmitTableDataSourceClass_CN: infoSubmitTableDataSourceClass_CN,
      TableRowAndColCalcu: {},

      // 数据
      extraTableDescriptionList: [
        [], //没有0！
        [
          '附表 1     报告主体二氧化碳排放量报告',
          '附表 2     报告主体活动水平数据',
          '附表 3     报告主体排放因子和计算系数',
        ], //行业1
        [
          '附表 1     报告主体二氧化碳排放量报告',
          '附表 2     报告主体活动水平数据',
          '附表 3     报告主体排放因子和计算系数',
        ], //行业2
        [
          '附表 1     报告主体二氧化碳排放量报告',
          '附表 2     报告主体活动水平数据',
          '附表 3     报告主体排放因子和计算系数',
        ], //行业3
        [
          '附表 1     报告主体二氧化碳排放量报告',
          '附表 2     报告主体活动水平数据',
          '附表 3     报告主体排放因子和计算系数',
        ], //行业4
        [
          '附表 1     报告主体二氧化碳排放量报告',
          '附表 2     报告主体活动水平数据',
          '附表 3     报告主体排放因子和计算系数',
        ], //行业5
        [
          '附表 1     报告主体二氧化碳排放量报告',
          '附表 2     报告主体活动水平数据',
          '附表 3     报告主体排放因子和计算系数',
        ], //行业6
        [
          '附表 1     报告主体二氧化碳排放量报告',
          '附表 2     报告主体活动水平数据',
          '附表 3     报告主体排放因子和计算系数',
        ], //行业7
        [
          '附表 1     报告主体二氧化碳排放量报告',
          '附表 2     报告主体活动水平数据',
          '附表 3     报告主体排放因子和计算系数',
        ], //行业8
        [
          '附表 1     报告主体二氧化碳排放量报告',
          '附表 2     报告主体活动水平数据',
          '附表 3     报告主体排放因子和计算系数',
        ], //行业9
        [
          '附表 1     报告主体二氧化碳排放量报告',
          '附表 2     报告主体活动水平数据',
          '附表 3     报告主体排放因子和计算系数',
        ], //行业10
      ],
    }
  },
  watch: {
    downloadStep: {
      handler(newVal, oldVal) {
        switch (newVal) {
          case 0:
            this.downloadStepInfo = '正在准备下载'
            break
          case 1:
            this.downloadStepInfo = '正在初始化信息'
            break
          case 2:
            this.downloadStepInfo = '正在加载必要组件，若为首次加载速度较慢，请稍等'
            break
          case 3:
            this.downloadStepInfo = '正在加载字体A，若为首次加载速度较慢，请稍等'
            break
          case 4:
            this.downloadStepInfo = '正在加载字体B'
            break
          case 5:
            this.downloadStepInfo = '正在生成初始密钥'
            break
          case 6:
            this.downloadStepInfo = '正在生成最后文件'
            break
          case 7:
            this.downloadStepInfo = '文件生成成功'
            break
        }
        if (newVal != 0) {
          this.NowPercentage = this.StartPercentage[newVal - 1]
        }
        if (newVal == 7) {
          this.NowPercentage = 100
        }
      },
      immediate: true,
    },
  },
  computed: {
    enterpriseInfo() {
      return this.$store.state.user.info
    },
  },
  methods: {
    open(submitData, taskInfo) {
      this.submitData = JSON.parse(JSON.stringify(submitData))
      this.sourceData = JSON.parse(JSON.stringify(submitData))
      this.taskInfo = JSON.parse(JSON.stringify(taskInfo))
      // console.log(JSON.stringify(this.submitData), JSON.stringify(this.taskInfo))
      /**
       * 用模板
       */
      // this.taskInfo = JSON.parse(JSON.stringify(taskInfo_tem))
      // this.submitData = JSON.parse(JSON.stringify(submitData_tem))
      // this.sourceData = JSON.parse(JSON.stringify(submitData_tem))

      this.visible = true
      this.runPdf()
    },
    close() {
      this.visible = false
      setTimeout(() => {
        this.id = null
        this.downloadStep = 0
        this.downloadStepInfo = '正在准备下载'
        this.NowPercentage = 0
      }, 100)
    },

    /**
     * 设置进度条
     */
    setProgress() {
      let this_ = this
      let progressTime = setInterval(() => {
        if (this_.NowPercentage < this_.StartPercentage[this_.downloadStep]) {
          this_.NowPercentage++
        } else if (this_.NowPercentage == 100) {
          clearInterval(progressTime)
        }
      }, 100)
    },
    /**
     * 生成随机密码用于加密文件
     */
    generateRandomKey(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      let result = ''
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(window.crypto.getRandomValues(new Uint8Array(1)) * 1) % charactersLength)

        //   真随机数，可以吹牛https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto/getRandomValues
      }
      return result
    },
    /**
     * 导入字体
     */
    async importFont() {
      this.downloadStep = 1
      await import('@/assets/fonts/Fangsong_GB2312-normal')
      this.downloadStep = 2
      await import('@/assets/fonts/simhei-normal')
      this.downloadStep = 3
      await import('@/assets/fonts/simheibd-normal')
      this.downloadStep = 4
      await import('@/assets/fonts/HYYunHei-45W-normal')
    },
    /**
     * --------------------------------------------------------------------------------
     *                    PDF生成相关代码
     * --------------------------------------------------------------------------------
     */
    // --------------以下是生成主体相关代码------------------------
    /**
     * 适用于所有函数
     * @param {Object} JSPDF_para JSPDF参数
     * @returns {Object} JSPDF_para JSPDF参数
     * @description 所有函数均为async异步函数，需要再runPDF中使用await来等待函数执行完毕，否则顺序会不一致。
     * 所有函数均需要返回JSPDF_para，以便后续函数使用。
     */
    /**
     * 初始化
     */
    async initPdf(JSPDF_para) {
      let KEY = this.generateRandomKey(48)

      console.log('文件加密密码为：', KEY)
      JSPDF_para.doc = new jsPDF({
        encryption: { userPermissions: ['print', 'copy'], ownerPassword: KEY },
      })
      JSPDF_para.doc.addFont('Fangsong_GB2312-normal.ttf', 'Fangsong_GB2312', 'normal')
      JSPDF_para.doc.addFont('simheibd-normal.ttf', 'simheibd', 'normal')
      JSPDF_para.doc.addFont('simhei-normal.ttf', 'simhei', 'normal')
      JSPDF_para.doc.addFont('HYYunHei-45W-normal.ttf', 'HYYunHei-45W', 'normal')

      this.downloadStep = 6

      return JSPDF_para
    },
    /**
     * 生成封面
     */
    async generateCover(JSPDF_para) {
      JSPDF_para.doc.setFont('simheibd')
      JSPDF_para.doc.setFontSize(25)
      JSPDF_para.doc.text(
        `中国${this.enterpriseClassName_CN[this.enterpriseInfo.enterpriseClass]}企业温室气体排放报告`,
        JSPDF_para.doc.internal.pageSize.getWidth() / 2,
        100,
        {
          align: 'center',
        }
      )

      JSPDF_para.doc.setFontSize(15)
      JSPDF_para.doc
        .setFont('simhei')
        .text('报告主体（盖章）： ', 45, 220)
        .setFont('simhei')
        .text(`${this.enterpriseInfo.enterpriseName}`, 45 + JSPDF_para.doc.getTextWidth('报告主体（盖章）： '), 220)
      JSPDF_para.doc.text('报告年度： ' + `${this.taskInfo.taskYear} 年度`, 45, 235)
      JSPDF_para.doc.text('报告日期： ' + `${dayjs().format('YYYY 年 MM 月 DD 日')}`, 45, 250)
      return JSPDF_para
    },
    /**
     * 第二页-开头
     */
    async SecondPageHead(JSPDF_para) {
      JSPDF_para.doc.addPage()
      JSPDF_para.yPos = 30

      JSPDF_para.doc.setFont('Fangsong_GB2312')
      JSPDF_para.doc.setFontSize(17)
      JSPDF_para.doc.setLineHeightFactor = 1.8
      JSPDF_para.text =
        `    根据国家发展和改革委员会发布的《中国${
          this.enterpriseClassName_CN[this.enterpriseInfo.enterpriseClass]
        }企业温室气体排放核算方法与报告指南（试行）》，本报告主体核算了` +
        ` ${this.taskInfo.taskYear} ` +
        '年度温室气体排放量，并填写了相关数据表格。现将有关情况报告如下:'
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText, { lineHeightFactor: 1.8 })
      JSPDF_para.yPos += JSPDF_para.JSPDF_blockHeight

      return JSPDF_para
    },
    /**
     * 第二页-企业基本情况
     */
    async EnterpriseBasicSituation(JSPDF_para) {
      JSPDF_para.doc.setFont('simheibd')
      JSPDF_para.doc.setFontSize(17)
      JSPDF_para.doc.setLineHeightFactor = 1.8
      JSPDF_para.text = '    一、企业基本情况'
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      JSPDF_para.doc.text(20, JSPDF_para.yPos + 5, JSPDF_para.JSPDF_splittedText, { lineHeightFactor: 1.8 })
      JSPDF_para.yPos += JSPDF_para.JSPDF_blockHeight

      JSPDF_para.doc.setFont('Fangsong_GB2312')
      JSPDF_para.doc.setFontSize(15)
      JSPDF_para.doc.setLineHeightFactor = 1.5
      JSPDF_para.text = '    ' + this.enterpriseInfo.enterpriseDescription
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      JSPDF_para.yPos += 5 //段前5
      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      }

      autoTable(JSPDF_para.doc, {
        startY: JSPDF_para.yPos + 5,
        head: [
          //表头
          ['类目', '详情'],
        ],
        body: [
          //表格内容 长度与上面对应
          ['单位名称', this.enterpriseInfo.enterpriseName],
          ['单位地址', this.enterpriseInfo.enterprisePosition],
          ['单位性质', this.enterpriseInfo.enterpriseCharacter],
          ['组织机构代码', this.enterpriseInfo.enterpriseID],
          ['所属行业', this.enterpriseClassName_CN[this.enterpriseInfo.enterpriseClass]],
          ['报告年度', '2022'],
          ['法定代表人', this.enterpriseInfo.enterpriseLegelPerson],
          ['填报负责人', this.enterpriseInfo.enterpriseResponsiblePerson],
          ['负责人邮箱', this.enterpriseInfo.enterpriseResponsibleEmail],
        ],
        styles: {
          font: 'Fangsong_GB2312', //字体
          //   fontStyle: 'normal', //字体样式
          fontSize: 14,

          valign: 'middle',
          lineWidth: 0.1,
          fillColor: [255, 255, 255],
          color: [0, 0, 0],
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
        },
        headStyles: {
          font: 'simheibd', //字体
          fontStyle: 'normal', //字体样式
          fontSize: 14,
          halign: 'center',
          valign: 'middle',
          lineWidth: 0.1,
          fillColor: [255, 255, 255],
          color: [0, 0, 0],
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
        },
        columnStyles: {
          0: { halign: 'center', cellWidth: 40 },
          1: {
            halign: 'left',
          },
        },
        cellStyles: { overflow: 'linebreak' },
        theme: 'grid',
      })
      JSPDF_para.yPos = JSPDF_para.doc.lastAutoTable.finalY

      return JSPDF_para
    },
    /**
     * 第二页-温室气体排放
     */
    async EnterpriseEmission(JSPDF_para) {
      JSPDF_para.doc.setFont('simheibd')
      JSPDF_para.doc.setFontSize(17)
      JSPDF_para.doc.setLineHeightFactor = 1.5
      JSPDF_para.text = '    二、温室气体排放'
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      JSPDF_para.yPos += 15 //段前5
      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      }

      JSPDF_para.doc.setFont('Fangsong_GB2312')
      JSPDF_para.doc.setFontSize(15)
      JSPDF_para.doc.setLineHeightFactor = 1.5
      JSPDF_para.text = `    本报告主体在本年度核算和报告期内温室气体排放总量为 ${this.submitData.sumEmission.toFixed(
        6
      )} 吨二氧化碳当量。各模块分别的排放情况如下表：`
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      JSPDF_para.yPos += 15 //段前5
      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      }

      /**
       * 设置body内容
       */
      let TableBody = []
      for (let i = 0; i < this.submitData.detail.length; i++) {
        let bodyEle = [
          { content: '', styles: { lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0.1 } } },
          {
            content: `${this.submitData.detail[i].className}（tCO₂）`,
            styles: { lineWidth: { top: 0.1, right: 0.1, bottom: 0.1, left: 0 } },
          },
          {
            content: `${this.submitData.detail[i].classDataSum.toFixed(6)}`,
            styles: { lineWidth: { top: 0.1, right: 0.1, bottom: 0.1, left: 0.1 } },
          },
        ]
        TableBody.push(bodyEle)
      }

      autoTable(JSPDF_para.doc, {
        startY: JSPDF_para.yPos + 5,
        head: [
          //表头
          [
            { content: '模块', colSpan: 2, styles: { halign: 'center' } },
            { content: '数据', styles: { halign: 'center' } },
          ],
        ],
        body: TableBody,
        styles: {
          font: 'HYYunHei-45W', //字体
          //   fontStyle: 'normal', //字体样式
          fontSize: 14,

          valign: 'middle',
          lineWidth: 0,
          fillColor: [255, 255, 255],
          color: [0, 0, 0],
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
        },
        headStyles: {
          font: 'simheibd', //字体
          fontStyle: 'normal', //字体样式
          fontSize: 14,

          valign: 'middle',
          lineWidth: 0.1,
          fillColor: [255, 255, 255],
          color: [0, 0, 0],
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
        },
        columnStyles: {
          0: { halign: 'left' },
          1: {
            halign: 'left',
          },
          2: {
            halign: 'center',
          },
        },
        cellStyles: { overflow: 'linebreak' },
        theme: 'grid',
      })
      JSPDF_para.yPos = JSPDF_para.doc.lastAutoTable.finalY

      return JSPDF_para
    },
    /**
     * 第二页-活动水平数据及来源
     */
    async EnterpriseActivityFactorAndSource(JSPDF_para) {
      JSPDF_para.doc.setFont('simheibd')
      JSPDF_para.doc.setFontSize(17)
      JSPDF_para.doc.setLineHeightFactor = 1.5
      JSPDF_para.text = '    三、活动水平数据及来源说明'
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      JSPDF_para.yPos += 15 //段前5
      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      }

      JSPDF_para.doc.setFont('Fangsong_GB2312')
      JSPDF_para.doc.setFontSize(15)
      JSPDF_para.doc.setLineHeightFactor = 1.5
      JSPDF_para.text = '    本报告中采用的活动水平数据及来源如下表所示：'
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      JSPDF_para.yPos += 15 //段前5
      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      }

      JSPDF_para = await this.SetActivityFactorTable_(JSPDF_para, this.TableRowAndColCalcu, true)

      return JSPDF_para
    },
    /**
     * 第二页-排放因子数据及来源
     */
    async EnterpriseEmissionFactorAndSource(JSPDF_para) {
      JSPDF_para.doc.setFont('simheibd')
      JSPDF_para.doc.setFontSize(17)
      JSPDF_para.doc.setLineHeightFactor = 1.5
      JSPDF_para.text = '    四、排放因子数据及来源说明'
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      JSPDF_para.yPos += 15 //段前5
      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      }

      JSPDF_para.doc.setFont('Fangsong_GB2312')
      JSPDF_para.doc.setFontSize(15)
      JSPDF_para.doc.setLineHeightFactor = 1.5
      JSPDF_para.text = '    本报告中采用的排放因子数据及来源如下表所示：'
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      JSPDF_para.yPos += 15 //段前5
      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      }

      JSPDF_para = await this.SetEmissionFactorTable_(JSPDF_para, this.TableRowAndColCalcu, true)

      return JSPDF_para
    },
    /**
     * 第二页-承诺签字
     */
    async SecondPageSignature(JSPDF_para) {
      JSPDF_para.doc.setFont('Fangsong_GB2312')
      JSPDF_para.doc.setFontSize(17)
      JSPDF_para.doc.setLineHeightFactor = 1.8
      JSPDF_para.text = '    本报告真实、可靠，如报告中的信息与实际情况不符，本企业将承担相应的法律责任。'
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      JSPDF_para.yPos += 25 //段前5
      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      }

      JSPDF_para.doc.setFont('Fangsong_GB2312')
      JSPDF_para.doc.setFontSize(17)
      JSPDF_para.doc.setLineHeightFactor = 1.8
      JSPDF_para.text = '法人（签字）：          '
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      JSPDF_para.yPos += 20 //段前5
      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(115, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      }

      JSPDF_para.doc.setFont('Fangsong_GB2312')
      JSPDF_para.doc.setFontSize(17)
      JSPDF_para.doc.setLineHeightFactor = 1.8
      JSPDF_para.text = '     年    月    日'
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      JSPDF_para.yPos += 15 //段前5
      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(125, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      }

      return JSPDF_para
    },
    /**
     * 第二页-附表描述
     */
    async ExtraTableDescription(JSPDF_para) {
      let extraTableNum = 1
      if ((this.enterpriseInfo.enterpriseClass <= 10) & (this.enterpriseInfo.enterpriseClass > 0)) {
        extraTableNum = this.enterpriseInfo.enterpriseClass
      }
      for (let i = 0; i < this.extraTableDescriptionList[extraTableNum].length; i++) {
        JSPDF_para.doc.setFont('Fangsong_GB2312')
        JSPDF_para.doc.setFontSize(15)
        JSPDF_para.doc.setLineHeightFactor = 1.8
        JSPDF_para.text = this.extraTableDescriptionList[extraTableNum][i]
        JSPDF_para.JSPDF_lineHeight =
          (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
          (JSPDF_para.doc.getLineHeightFactor() + 0.4)
        JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
          JSPDF_para.text,
          JSPDF_para.doc.internal.pageSize.getWidth() - 40
        )
        JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
        JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
        if (i == 0) {
          JSPDF_para.yPos += 25 //段前5
        } else {
          JSPDF_para.yPos += 10 //段前5
        }
        for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
          if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
            JSPDF_para.doc.addPage()
            JSPDF_para.yPos = 30
          } else if (i != 0) {
            JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
          }
          JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
        }
      }
      // JSPDF_para.doc.setFont('Fangsong_GB2312')
      // JSPDF_para.doc.setFontSize(15)
      // JSPDF_para.doc.setLineHeightFactor = 1.8
      // JSPDF_para.text = '附表 1 报告主体二氧化碳排放量报告'
      // JSPDF_para.JSPDF_lineHeight =
      //   (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
      //   (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      // JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
      //   JSPDF_para.text,
      //   JSPDF_para.doc.internal.pageSize.getWidth() - 40
      // )
      // JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      // JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      // JSPDF_para.yPos += 25 //段前5
      // for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
      //   if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
      //     JSPDF_para.doc.addPage()
      //     JSPDF_para.yPos = 30
      //   } else if (i != 0) {
      //     JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
      //   }
      //   JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      // }

      // JSPDF_para.doc.setFont('Fangsong_GB2312')
      // JSPDF_para.doc.setFontSize(15)
      // JSPDF_para.doc.setLineHeightFactor = 1.8
      // JSPDF_para.text = '附表 2 报告主体活动水平数据'
      // JSPDF_para.JSPDF_lineHeight =
      //   (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
      //   (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      // JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
      //   JSPDF_para.text,
      //   JSPDF_para.doc.internal.pageSize.getWidth() - 40
      // )
      // JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      // JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      // JSPDF_para.yPos += 10 //段前5
      // for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
      //   if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
      //     JSPDF_para.doc.addPage()
      //     JSPDF_para.yPos = 30
      //   } else if (i != 0) {
      //     JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
      //   }
      //   JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      // }

      // JSPDF_para.doc.setFont('Fangsong_GB2312')
      // JSPDF_para.doc.setFontSize(15)
      // JSPDF_para.doc.setLineHeightFactor = 1.8
      // JSPDF_para.text = '附表 3 报告主体排放因子和计算系数'
      // JSPDF_para.JSPDF_lineHeight =
      //   (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
      //   (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      // JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
      //   JSPDF_para.text,
      //   JSPDF_para.doc.internal.pageSize.getWidth() - 40
      // )
      // JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      // JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight
      // JSPDF_para.yPos += 10 //段前5
      // for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
      //   if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
      //     JSPDF_para.doc.addPage()
      //     JSPDF_para.yPos = 30
      //   } else if (i != 0) {
      //     JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
      //   }
      //   JSPDF_para.doc.text(20, JSPDF_para.yPos, JSPDF_para.JSPDF_splittedText[i])
      // }

      return JSPDF_para
    },
    //------------------------------以下是生成附表----------------------------
    /**
     * 生成附表的工具函数
     */
    async TableRowAndColCalculate_ActivityFactorANDEmissionFactor() {
      // 找到this.submitData中非isConst的最大值
      let res = {
        activityFactorLength: [],
        EmissionFactorLength: [],
        activityFactorMaxCol: 0,
        EmissionFactorMaxCol: 0,
        A_Column: [0, 0, 0, 0, 0, 0, 0, 0],
        E_Column: [0, 0, 0, 0, 0, 0, 0, 0],
      }

      for (let classS = 0; classS < this.submitData.detail.length; classS++) {
        // 寻找每个大类所需要的最大列数
        res.activityFactorLength.push(this.submitData.detail[classS].children.length)
        for (let i = 0; i < this.submitData.detail[classS].children[0].activityFactor.length; i++) {
          // 以0号元素为模板
          if (this.submitData.detail[classS].children[0].activityFactor[i].isConst == false) {
            res.A_Column[classS]++
          }
        }
        res.EmissionFactorLength.push(this.submitData.detail[classS].children.length)
        for (let i = 0; i < this.submitData.detail[classS].children[0].EmissionFactor.length; i++) {
          // 以0号元素为模板
          if (this.submitData.detail[classS].children[0].EmissionFactor[i].isConst == false) {
            res.E_Column[classS]++
          }
        }
      }
      // A_Column 找到最大的元素
      res.activityFactorMaxCol = Math.max(...res.A_Column)
      res.EmissionFactorMaxCol = Math.max(...res.E_Column)
      return res
    },

    async SetActivityFactorTable_(JSPDF_para, TableRowAndColCalcu, hasSource = true) {
      JSPDF_para.yPos = JSPDF_para.yPos + 5
      let TableBigBody = []
      for (let mainClass = 0; mainClass < this.submitData.detail.length; mainClass++) {
        let mainClasData = this.submitData.detail[mainClass]
        // 下面对每个大类进行设置
        // 设置大类的头部
        let TableHeaer = []
        let unitRow = []
        // 补齐空的列
        if (TableRowAndColCalcu.A_Column[mainClass] != 1) {
          TableHeaer.push(
            { content: '', styles: { halign: 'center', valign: 'middle' }, rowSpan: 2 },
            { content: '', styles: { halign: 'center', valign: 'middle' }, rowSpan: 2 }
          )
          //
          // unitRow.push(
          //   { content: '', styles: { halign: 'center', valign: 'middle' } },
          //   { content: '', styles: { halign: 'center', valign: 'middle' } }
          // )
          for (let TableHeaerIdx = 0; TableHeaerIdx < TableRowAndColCalcu.activityFactorMaxCol; TableHeaerIdx++) {
            if (TableHeaerIdx < TableRowAndColCalcu.A_Column[mainClass]) {
              TableHeaer.push({
                content: `${mainClasData.children[0].activityFactor[TableHeaerIdx].dataName}`,
                // 其单位在下一个单元格展示
                styles: { halign: 'center', valign: 'middle' },
              })
              unitRow.push({
                content: `单位：${mainClasData.children[0].activityFactor[TableHeaerIdx].dataUnit}`,
                styles: { halign: 'center', valign: 'middle', fontSize: 7 },
              })
              if (hasSource) {
                TableHeaer.push({
                  content: `来源`,
                  styles: { halign: 'center', valign: 'middle' },
                  rowSpan: 2,
                })
                // unitRow.push({
                //   content: ``,
                //   styles: { halign: 'center', valign: 'middle' },
                // })
              }
            } else {
              TableHeaer.push({
                content: '',
                styles: { halign: 'center', valign: 'middle' },
                rowSpan: 2,
              })
              // unitRow.push({
              //   content: ``,
              //   styles: { halign: 'center', valign: 'middle' },
              // })
            }
          }
        } else if (TableRowAndColCalcu.A_Column[mainClass] == 1) {
          TableHeaer.push(
            { content: '', styles: { halign: 'center', valign: 'middle' } },
            { content: '', styles: { halign: 'center', valign: 'middle' } }
          )
          for (let TableHeaerIdx = 0; TableHeaerIdx < TableRowAndColCalcu.activityFactorMaxCol; TableHeaerIdx++) {
            if (TableHeaerIdx <= TableRowAndColCalcu.A_Column[mainClass]) {
              if (TableHeaerIdx == 0) {
                TableHeaer.push({
                  content: `${mainClasData.children[0].activityFactor[TableHeaerIdx].dataName}`,
                  styles: { halign: 'center', valign: 'middle' },
                })
                if (hasSource) {
                  TableHeaer.push({
                    content: `来源`,
                    styles: { halign: 'center', valign: 'middle' },
                  })
                }
                TableHeaer.push({
                  content: `单位`,
                  styles: { halign: 'center', valign: 'middle' },
                })
              } else {
              }
            } else {
              TableHeaer.push({
                content: '',
                styles: { halign: 'center', valign: 'middle' },
              })
            }
          }
        }
        // 设置大类的数据
        let TableBody = []
        if (TableRowAndColCalcu.A_Column[mainClass] != 1) {
          for (let rowIdx = 0; rowIdx < mainClasData.children.length; rowIdx++) {
            let row = []
            if (rowIdx == 0) {
              row = [
                {
                  content: `${mainClasData.className} `,
                  styles: { halign: 'center', valign: 'middle' },
                  rowSpan: mainClasData.children.length,
                },
                {
                  content: `${mainClasData.children[rowIdx].className} `,
                  styles: { halign: 'center', valign: 'middle' },
                },
              ]
            } else {
              row = [
                {
                  content: `${mainClasData.children[rowIdx].className} `,
                  styles: { halign: 'center', valign: 'middle' },
                },
              ]
            }
            for (let TableHeaerIdx = 0; TableHeaerIdx < TableRowAndColCalcu.activityFactorMaxCol; TableHeaerIdx++) {
              if (TableHeaerIdx < TableRowAndColCalcu.A_Column[mainClass]) {
                if (mainClasData.children[0].activityFactor[TableHeaerIdx].dataUnit == '%') {
                  row.push({
                    content: `${mainClasData.children[rowIdx].activityFactor[TableHeaerIdx].dataNum * 100} `,
                    styles: { halign: 'center', valign: 'middle' },
                  })
                } else {
                  row.push({
                    content: `${mainClasData.children[rowIdx].activityFactor[TableHeaerIdx].dataNum} `,
                    styles: { halign: 'center', valign: 'middle' },
                  })
                }

                if (hasSource) {
                  row.push({
                    content: `${
                      this.infoSubmitTableDataSourceClass_CN[
                        mainClasData.children[rowIdx].activityFactor[TableHeaerIdx].dataSource
                      ]
                    } `,
                    styles: { halign: 'center', valign: 'middle' },
                  })
                }
              } else {
                row.push({
                  content: ` `,
                  styles: { halign: 'center', valign: 'middle' },
                })
              }
            }
            TableBody.push(row)
          }
        } else if (TableRowAndColCalcu.A_Column[mainClass] == 1) {
          for (let rowIdx = 0; rowIdx < mainClasData.children.length; rowIdx++) {
            let row = []
            if (rowIdx == 0) {
              row = [
                {
                  content: `${mainClasData.className} `,
                  styles: { halign: 'center', valign: 'middle' },
                  rowSpan: mainClasData.children.length,
                },
                {
                  content: `${mainClasData.children[rowIdx].className} `,
                  styles: { halign: 'center', valign: 'middle' },
                },
              ]
            } else {
              row = [
                {
                  content: `${mainClasData.children[rowIdx].className} `,
                  styles: { halign: 'center', valign: 'middle' },
                },
              ]
            }
            // let row = [
            //   {
            //     content: `${mainClasData.className} `,
            //     styles: { halign: 'center', valign: 'middle' },
            //   },
            //   {
            //     content: `${mainClasData.children[rowIdx].className} `,
            //     styles: { halign: 'center', valign: 'middle' },
            //   },
            // ]
            for (let TableHeaerIdx = 0; TableHeaerIdx < TableRowAndColCalcu.activityFactorMaxCol; TableHeaerIdx++) {
              if (TableHeaerIdx <= TableRowAndColCalcu.A_Column[mainClass]) {
                if (TableHeaerIdx == 0) {
                  if (mainClasData.children[rowIdx].activityFactor[TableHeaerIdx].dataUnit == '%') {
                    row.push({
                      content: `${mainClasData.children[rowIdx].activityFactor[TableHeaerIdx].dataNum * 100} `,
                      styles: { halign: 'center', valign: 'middle' },
                    })
                  } else {
                    row.push({
                      content: `${mainClasData.children[rowIdx].activityFactor[TableHeaerIdx].dataNum} `,
                      styles: { halign: 'center', valign: 'middle' },
                    })
                  }

                  if (hasSource) {
                    row.push({
                      content: `${
                        this.infoSubmitTableDataSourceClass_CN[
                          mainClasData.children[rowIdx].activityFactor[TableHeaerIdx].dataSource
                        ]
                      } `,
                      styles: { halign: 'center', valign: 'middle' },
                    })
                  }
                  row.push({
                    content: `${mainClasData.children[rowIdx].activityFactor[TableHeaerIdx].dataUnit} `,
                    styles: { halign: 'center', valign: 'middle' },
                  })
                } else {
                }
              } else {
                row.push({
                  content: ` `,
                  styles: { halign: 'center', valign: 'middle' },
                })
              }
            }
            TableBody.push(row)
          }
        }
        if (TableRowAndColCalcu.A_Column[mainClass] != 1) {
          TableBody.unshift(unitRow)
        }
        TableBody.unshift(TableHeaer)

        TableBigBody = [...TableBigBody, ...TableBody]
      }
      // console.log(TableBigBody)
      // let header = JSON.parse(JSON.stringify(TableBigBody[0]))
      let header = []
      header.push({
        content: `活动水平${hasSource ? '及数据来源' : ''}`,
        styles: { halign: 'center', valign: 'middle' },
        colSpan: TableBigBody[0].length,
      })
      console.log(header, TableBigBody)

      autoTable(JSPDF_para.doc, {
        startY: JSPDF_para.yPos + 1,
        head: [
          //表头
          header,
        ],
        body: TableBigBody,
        styles: {
          font: 'HYYunHei-45W', //字体
          //   fontStyle: 'normal', //字体样式
          fontSize: 12,

          valign: 'middle',
          lineWidth: 0.1,
          fillColor: [255, 255, 255],
          color: [0, 0, 0],
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
        },
        headStyles: {
          font: 'HYYunHei-45W', //字体
          //   fontStyle: 'normal', //字体样式
          fontSize: 12,

          valign: 'middle',
          lineWidth: 0.1,
          fillColor: [255, 255, 255],
          color: [0, 0, 0],
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
        },

        cellStyles: {
          overflow: 'linebreak',

          fontStyle: 'normal',
          textColor: [0, 0, 0],
          columnwidth: 'wrap',
        },
        theme: 'grid',
      })
      JSPDF_para.yPos = JSPDF_para.doc.lastAutoTable.finalY

      return JSPDF_para
    },

    async SetEmissionFactorTable_(JSPDF_para, TableRowAndColCalcu, hasSource = true) {
      JSPDF_para.yPos = JSPDF_para.yPos + 5
      let TableBigBody = []
      for (let mainClass = 0; mainClass < this.submitData.detail.length; mainClass++) {
        let mainClasData = this.submitData.detail[mainClass]
        // 下面对每个大类进行设置
        // 设置大类的头部
        let TableHeaer = []
        let unitRow = []
        // 补齐空的列
        if (TableRowAndColCalcu.E_Column[mainClass] != 1) {
          TableHeaer.push(
            { content: '', styles: { halign: 'center', valign: 'middle' }, rowSpan: 2 },
            { content: '', styles: { halign: 'center', valign: 'middle' }, rowSpan: 2 }
          )
          //
          // unitRow.push(
          //   { content: '', styles: { halign: 'center', valign: 'middle' } },
          //   { content: '', styles: { halign: 'center', valign: 'middle' } }
          // )
          for (let TableHeaerIdx = 0; TableHeaerIdx < TableRowAndColCalcu.EmissionFactorMaxCol; TableHeaerIdx++) {
            if (TableHeaerIdx < TableRowAndColCalcu.E_Column[mainClass]) {
              TableHeaer.push({
                content: `${mainClasData.children[0].EmissionFactor[TableHeaerIdx].dataName}`,
                // 其单位在下一个单元格展示
                styles: { halign: 'center', valign: 'middle' },
              })
              unitRow.push({
                content: `单位：${mainClasData.children[0].EmissionFactor[TableHeaerIdx].dataUnit}`,
                styles: { halign: 'center', valign: 'middle', fontSize: 7 },
              })
              if (hasSource) {
                TableHeaer.push({
                  content: `来源`,
                  styles: { halign: 'center', valign: 'middle' },
                  rowSpan: 2,
                })
                // unitRow.push({
                //   content: ``,
                //   styles: { halign: 'center', valign: 'middle' },
                // })
              }
            } else {
              TableHeaer.push({
                content: '',
                styles: { halign: 'center', valign: 'middle' },
                rowSpan: 2,
              })
              // unitRow.push({
              //   content: ``,
              //   styles: { halign: 'center', valign: 'middle' },
              // })
            }
          }
        } else if (TableRowAndColCalcu.E_Column[mainClass] == 1) {
          TableHeaer.push(
            { content: '', styles: { halign: 'center', valign: 'middle' } },
            { content: '', styles: { halign: 'center', valign: 'middle' } }
          )
          for (let TableHeaerIdx = 0; TableHeaerIdx < TableRowAndColCalcu.EmissionFactorMaxCol; TableHeaerIdx++) {
            if (TableHeaerIdx <= TableRowAndColCalcu.E_Column[mainClass]) {
              if (TableHeaerIdx == 0) {
                TableHeaer.push({
                  content: `${mainClasData.children[0].EmissionFactor[TableHeaerIdx].dataName} `,
                  styles: { halign: 'center', valign: 'middle' },
                })
                if (hasSource) {
                  TableHeaer.push({
                    content: `来源`,
                    styles: { halign: 'center', valign: 'middle' },
                  })
                }
                TableHeaer.push({
                  content: `单位`,
                  styles: { halign: 'center', valign: 'middle' },
                })
              } else {
              }
            } else {
              TableHeaer.push({
                content: '',
                styles: { halign: 'center', valign: 'middle' },
              })
            }
          }
        }
        // 设置大类的数据
        let TableBody = []
        if (TableRowAndColCalcu.E_Column[mainClass] != 1) {
          for (let rowIdx = 0; rowIdx < mainClasData.children.length; rowIdx++) {
            let row = []
            if (rowIdx == 0) {
              row = [
                {
                  content: `${mainClasData.className} `,
                  styles: { halign: 'center', valign: 'middle' },
                  rowSpan: mainClasData.children.length,
                },
                {
                  content: `${mainClasData.children[rowIdx].className} `,
                  styles: { halign: 'center', valign: 'middle' },
                },
              ]
            } else {
              row = [
                {
                  content: `${mainClasData.children[rowIdx].className} `,
                  styles: { halign: 'center', valign: 'middle' },
                },
              ]
            }
            for (let TableHeaerIdx = 0; TableHeaerIdx < TableRowAndColCalcu.EmissionFactorMaxCol; TableHeaerIdx++) {
              if (TableHeaerIdx < TableRowAndColCalcu.E_Column[mainClass]) {
                if (mainClasData.children[rowIdx].EmissionFactor[TableHeaerIdx].dataUnit == '%') {
                  row.push({
                    content: `${mainClasData.children[rowIdx].EmissionFactor[TableHeaerIdx].dataNum * 100} `,
                    styles: { halign: 'center', valign: 'middle' },
                  })
                } else {
                  row.push({
                    content: `${mainClasData.children[rowIdx].EmissionFactor[TableHeaerIdx].dataNum} `,
                    styles: { halign: 'center', valign: 'middle' },
                  })
                }

                if (hasSource) {
                  row.push({
                    content: `${
                      this.infoSubmitTableDataSourceClass_CN[
                        mainClasData.children[rowIdx].EmissionFactor[TableHeaerIdx].dataSource
                      ]
                    } `,
                    styles: { halign: 'center', valign: 'middle' },
                  })
                }
              } else {
                row.push({
                  content: ` `,
                  styles: { halign: 'center', valign: 'middle' },
                })
              }
            }
            TableBody.push(row)
          }
        } else if (TableRowAndColCalcu.E_Column[mainClass] == 1) {
          for (let rowIdx = 0; rowIdx < mainClasData.children.length; rowIdx++) {
            let row = []
            // let row = [
            //   {
            //     content: `${mainClasData.className} `,
            //     styles: { halign: 'center', valign: 'middle' },
            //   },
            //   {
            //     content: `${mainClasData.children[rowIdx].className} `,
            //     styles: { halign: 'center', valign: 'middle' },
            //   },
            // ]
            if (rowIdx == 0) {
              row = [
                {
                  content: `${mainClasData.className} `,
                  styles: { halign: 'center', valign: 'middle' },
                  rowSpan: mainClasData.children.length,
                },
                {
                  content: `${mainClasData.children[rowIdx].className} `,
                  styles: { halign: 'center', valign: 'middle' },
                },
              ]
            } else {
              row = [
                {
                  content: `${mainClasData.children[rowIdx].className} `,
                  styles: { halign: 'center', valign: 'middle' },
                },
              ]
            }
            for (let TableHeaerIdx = 0; TableHeaerIdx < TableRowAndColCalcu.EmissionFactorMaxCol; TableHeaerIdx++) {
              if (TableHeaerIdx <= TableRowAndColCalcu.E_Column[mainClass]) {
                if (TableHeaerIdx == 0) {
                  if (mainClasData.children[rowIdx].EmissionFactor[TableHeaerIdx].dataUnit == '%') {
                    row.push({
                      content: `${mainClasData.children[rowIdx].EmissionFactor[TableHeaerIdx].dataNum * 100} `,
                      styles: { halign: 'center', valign: 'middle' },
                    })
                  } else {
                    row.push({
                      content: `${mainClasData.children[rowIdx].EmissionFactor[TableHeaerIdx].dataNum} `,
                      styles: { halign: 'center', valign: 'middle' },
                    })
                  }

                  if (hasSource) {
                    row.push({
                      content: `${
                        this.infoSubmitTableDataSourceClass_CN[
                          mainClasData.children[rowIdx].EmissionFactor[TableHeaerIdx].dataSource
                        ]
                      } `,
                      styles: { halign: 'center', valign: 'middle' },
                    })
                  }
                  row.push({
                    content: `${mainClasData.children[rowIdx].EmissionFactor[TableHeaerIdx].dataUnit} `,
                    styles: { halign: 'center', valign: 'middle' },
                  })
                } else {
                }
              } else {
                row.push({
                  content: ` `,
                  styles: { halign: 'center', valign: 'middle' },
                })
              }
            }
            TableBody.push(row)
          }
        }
        if (TableRowAndColCalcu.E_Column[mainClass] != 1) {
          TableBody.unshift(unitRow)
        }
        TableBody.unshift(TableHeaer)

        TableBigBody = [...TableBigBody, ...TableBody]
      }
      // console.log(TableBigBody)
      // let header = JSON.parse(JSON.stringify(TableBigBody[0]))
      // for (let i = 0; i < header.length; i++) {
      //   header[i].rowSpan = 1
      // }
      let header = []
      header.push({
        content: `排放因子${hasSource ? '及数据来源' : ''}`,
        styles: { halign: 'center', valign: 'middle' },
        colSpan: TableBigBody[0].length,
      })
      autoTable(JSPDF_para.doc, {
        startY: JSPDF_para.yPos + 1,
        head: [
          //表头
          header,
        ],
        body: TableBigBody,
        styles: {
          font: 'HYYunHei-45W', //字体
          //   fontStyle: 'normal', //字体样式
          fontSize: 12,

          valign: 'middle',
          lineWidth: 0.1,
          fillColor: [255, 255, 255],
          color: [0, 0, 0],
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
        },
        headStyles: {
          font: 'HYYunHei-45W', //字体
          //   fontStyle: 'normal', //字体样式
          fontSize: 12,

          valign: 'middle',
          lineWidth: 0.1,
          fillColor: [255, 255, 255],
          color: [0, 0, 0],
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
        },

        cellStyles: {
          overflow: 'linebreak',

          fontStyle: 'normal',
          textColor: [0, 0, 0],
          columnwidth: 'wrap',
        },
        theme: 'grid',
      })
      JSPDF_para.yPos = JSPDF_para.doc.lastAutoTable.finalY

      return JSPDF_para
    },

    /**
     * 生成附表
     */

    async ExtraTable(JSPDF_para) {
      JSPDF_para.doc.addPage()
      JSPDF_para.yPos = 30

      let extraTableNum = 1
      if ((this.enterpriseInfo.enterpriseClass <= 10) & (this.enterpriseInfo.enterpriseClass > 0)) {
        extraTableNum = this.enterpriseInfo.enterpriseClass
      }

      JSPDF_para = await this.ExtraTable_EmissionCO2(JSPDF_para, this.extraTableDescriptionList[extraTableNum][0]) //设置附表1二氧化碳排放量报告

      let TableRowAndColCalcu = this.TableRowAndColCalcu

      JSPDF_para.doc.addPage()
      JSPDF_para.yPos = 30

      JSPDF_para = await this.ExtraTable_ACTIVITYFACTOR(
        JSPDF_para,
        this.extraTableDescriptionList[extraTableNum][1],
        TableRowAndColCalcu
      ) //设置附表2二氧化碳活动水平报告

      JSPDF_para.doc.addPage()
      JSPDF_para.yPos = 30

      JSPDF_para = await this.ExtraTable_EMISSIONFACTOR(
        JSPDF_para,
        this.extraTableDescriptionList[extraTableNum][2],
        TableRowAndColCalcu
      ) //设置附表3
      // JSPDF_para = await this.ExtraTable_ActivityFactor(JSPDF_para) //设置附表2活动水平

      return JSPDF_para
    },
    /**
     * 生成附表_报告主体二氧化碳排放量报告
     */
    async ExtraTable_EmissionCO2(JSPDF_para, title = '附表 1    报告主体二氧化碳排放量报告') {
      JSPDF_para.doc.setFont('Fangsong_GB2312')
      JSPDF_para.doc.setFontSize(17)
      JSPDF_para.doc.setLineHeightFactor = 1.8
      JSPDF_para.text = title
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight

      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(
          JSPDF_para.doc.internal.pageSize.getWidth() / 2,
          JSPDF_para.yPos,
          JSPDF_para.JSPDF_splittedText[i],
          { align: 'center' }
        )
      }

      /**
       * 设置body内容
       */
      let TableBody = []
      for (let i = 0; i < this.submitData.detail.length; i++) {
        let bodyEle = [
          { content: '', styles: { lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0.1 } } },
          {
            content: `${this.submitData.detail[i].className}（tCO₂）`,
            styles: { lineWidth: { top: 0.1, right: 0.1, bottom: 0.1, left: 0 } },
          },
          {
            content: `${this.submitData.detail[i].classDataSum.toFixed(6)}`,
            styles: { lineWidth: { top: 0.1, right: 0.1, bottom: 0.1, left: 0.1 } },
          },
        ]
        TableBody.push(bodyEle)
      }

      autoTable(JSPDF_para.doc, {
        startY: JSPDF_para.yPos + 15,
        head: [
          //表头
          [
            { content: '企业二氧化碳排放总量（tCO₂）', colSpan: 2 },
            { content: this.submitData.sumEmission.toFixed(6), styles: { halign: 'center' } },
          ],
        ],
        body: TableBody,
        styles: {
          font: 'HYYunHei-45W', //字体
          //   fontStyle: 'normal', //字体样式
          fontSize: 14,

          valign: 'middle',
          lineWidth: 0,
          fillColor: [255, 255, 255],
          color: [0, 0, 0],
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
        },
        headStyles: {
          font: 'HYYunHei-45W', //字体
          fontStyle: 'normal', //字体样式
          fontSize: 14,

          valign: 'middle',
          lineWidth: 0.1,
          fillColor: [255, 255, 255],
          color: [0, 0, 0],
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
        },
        columnStyles: {
          0: { halign: 'left' },
          1: {
            halign: 'left',
          },
          2: {
            halign: 'center',
          },
        },
        cellStyles: { overflow: 'linebreak' },
        theme: 'grid',
      })
      JSPDF_para.yPos = JSPDF_para.doc.lastAutoTable.finalY

      return JSPDF_para
    },
    /**
     * 生成附表2_报告主体活动水平
     */
    async ExtraTable_ACTIVITYFACTOR(JSPDF_para, title = '附表 2     报告主体活动水平数据', TableRowAndColCalcu) {
      JSPDF_para.doc.setFont('Fangsong_GB2312')
      JSPDF_para.doc.setFontSize(17)
      JSPDF_para.doc.setLineHeightFactor = 1.8
      JSPDF_para.text = title
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight

      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(
          JSPDF_para.doc.internal.pageSize.getWidth() / 2,
          JSPDF_para.yPos,
          JSPDF_para.JSPDF_splittedText[i],
          { align: 'center' }
        )
      }

      /**
       * 设置body内容
       */
      JSPDF_para = await this.SetActivityFactorTable_(JSPDF_para, TableRowAndColCalcu, false)

      return JSPDF_para
    },

    async ExtraTable_EMISSIONFACTOR(JSPDF_para, title = '附表 3     报告主体排放因子和计算系数', TableRowAndColCalcu) {
      JSPDF_para.doc.setFont('Fangsong_GB2312')
      JSPDF_para.doc.setFontSize(17)
      JSPDF_para.doc.setLineHeightFactor = 1.8
      JSPDF_para.text = title
      JSPDF_para.JSPDF_lineHeight =
        (JSPDF_para.doc.getLineHeight(JSPDF_para.text) / JSPDF_para.doc.internal.scaleFactor) *
        (JSPDF_para.doc.getLineHeightFactor() + 0.4)
      JSPDF_para.JSPDF_splittedText = JSPDF_para.doc.splitTextToSize(
        JSPDF_para.text,
        JSPDF_para.doc.internal.pageSize.getWidth() - 40
      )
      JSPDF_para.JSPDF_lines = JSPDF_para.JSPDF_splittedText.length // splitted text is a string array
      JSPDF_para.JSPDF_blockHeight = JSPDF_para.JSPDF_lines * JSPDF_para.JSPDF_lineHeight

      for (let i = 0; i < JSPDF_para.JSPDF_lines; i++) {
        if (JSPDF_para.yPos >= JSPDF_para.doc.internal.pageSize.height - 30) {
          JSPDF_para.doc.addPage()
          JSPDF_para.yPos = 30
        } else if (i != 0) {
          JSPDF_para.yPos = JSPDF_para.yPos + JSPDF_para.JSPDF_lineHeight
        }
        JSPDF_para.doc.text(
          JSPDF_para.doc.internal.pageSize.getWidth() / 2,
          JSPDF_para.yPos,
          JSPDF_para.JSPDF_splittedText[i],
          { align: 'center' }
        )
      }

      /**
       * 设置body内容
       */
      JSPDF_para = await this.SetEmissionFactorTable_(JSPDF_para, TableRowAndColCalcu, false)

      return JSPDF_para
    },

    /**
     * 生成PDF（测试）
     */
    async runPdf() {
      this.setProgress() // 设置进度条
      await this.importFont() // 导入字体

      let JSPDF_para = {
        yPos: 0,
        text: null,
        line: null,
        JSPDF_lineHeight: null,
        JSPDF_splittedText: null,
        JSPDF_lines: null,
        JSPDF_blockHeight: null,
        doc: null,
      }
      this.TableRowAndColCalcu = await this.TableRowAndColCalculate_ActivityFactorANDEmissionFactor()

      JSPDF_para = await this.initPdf(JSPDF_para) // 初始化+设置密码
      JSPDF_para = await this.generateCover(JSPDF_para) //设置封面
      JSPDF_para = await this.SecondPageHead(JSPDF_para) //设置第二页头部
      JSPDF_para = await this.EnterpriseBasicSituation(JSPDF_para) //设置企业基本情况
      JSPDF_para = await this.EnterpriseEmission(JSPDF_para) //设置企业温室气体排放
      JSPDF_para = await this.EnterpriseActivityFactorAndSource(JSPDF_para) //设置企业活动水平及来源
      JSPDF_para = await this.EnterpriseEmissionFactorAndSource(JSPDF_para) //设置企业排放水平及来源
      JSPDF_para = await this.SecondPageSignature(JSPDF_para) //设置第二页签名
      JSPDF_para = await this.ExtraTableDescription(JSPDF_para) //设置附表描述
      JSPDF_para = await this.ExtraTable(JSPDF_para) //设置附表

      // JSPDF_para.doc.addPage()
      // JSPDF_para.yPos = 30

      JSPDF_para = await this.addWaterMark(JSPDF_para)
      JSPDF_para = await this.addPageCountAndDownload(JSPDF_para)
    },
    /**
     *
     * @param {jsPDF()} JSPDF_para  jsPDF对象
     * @description 添加水印
     */
    async addWaterMark(JSPDF_para) {
      var pageCount = JSPDF_para.doc.internal.getNumberOfPages() //Total Page Number
      for (let i = 1; i <= pageCount; i++) {
        JSPDF_para.doc.setPage(i)
        if (i == 1) {
          JSPDF_para.doc.setFont('simheibd')
          JSPDF_para.doc.setFontSize(20)
          JSPDF_para.doc.setTextColor('#ff1e00')
          JSPDF_para.doc.text('本报告由碳盟链道自动化生成', JSPDF_para.doc.internal.pageSize.getWidth() / 2, 120, {
            align: 'center',
          })
        } else {
          JSPDF_para.doc.setFont('Fangsong_GB2312')
          JSPDF_para.doc.setFontSize(10)
          JSPDF_para.doc.setTextColor('#ff1e00')
          JSPDF_para.doc.text('链接绿色未来，碳盟领航之道', JSPDF_para.doc.internal.pageSize.getWidth() / 2, 10, {
            align: 'center',
          })
        }
        // 添加水印
        JSPDF_para.doc.setTextColor('#000000')
        JSPDF_para.doc.setFont('simhei')
        JSPDF_para.doc.setFontSize(10)
        JSPDF_para.doc.saveGraphicsState() // 保存图形状态
        JSPDF_para.doc.setGState(JSPDF_para.doc.GState({ opacity: 0.1 })) // 设置透明度为0.3
        for (let j = 0; j <= 3; j++) {
          for (let k = 0; k <= 3; k++) {
            JSPDF_para.doc.text(
              `${this.enterpriseInfo.enterpriseName}${this.taskInfo.taskYear}年度碳排放报告——碳盟链道生成`,
              (j * JSPDF_para.doc.internal.pageSize.getWidth()) / 3,
              (k * JSPDF_para.doc.internal.pageSize.getHeight()) / 3 - 20,
              42
            ) // 水印文本, 横向坐标， 纵向坐标， 倾斜角度
          }
        }
        JSPDF_para.doc.restoreGraphicsState() // 设置完毕之后，清除图形状态，防止影响其他内容
      }

      return JSPDF_para
    },
    /**
     *
     * @param {jsPDF()} JSPDF_para  jsPDF对象
     * @description 添加页码并下载PDF
     */
    async addPageCountAndDownload(JSPDF_para) {
      // 添加页码
      var pageCount = JSPDF_para.doc.internal.getNumberOfPages() //Total Page Number
      JSPDF_para.doc.setFont('simhei')
      JSPDF_para.doc.setFontSize(10)
      //   跳过第一页
      for (let i = 2; i <= pageCount; i++) {
        JSPDF_para.doc.setPage(i)
        let pageCurrent = JSPDF_para.doc.internal.getCurrentPageInfo().pageNumber //Current Page
        JSPDF_para.doc.text(
          pageCurrent + '/' + pageCount,
          JSPDF_para.doc.internal.pageSize.getWidth() / 2,
          JSPDF_para.doc.internal.pageSize.height - 10
        )
      }

      //   console.log(JSPDF_para)

      setTimeout(() => {
        if (this.visible) {
          let DocSavePromise = JSPDF_para.doc.save(
            `${this.enterpriseInfo.enterpriseID}-${this.enterpriseInfo.enterpriseName}-${
              this.taskInfo.taskYear
            }-碳排放核算报告（预览）-${dayjs().unix()}.pdf`,
            { returnPromise: true }
          )
          DocSavePromise.then(() => {
            this.downloadStep = 7
          })

          this.downloadStep = 7
          // console.log(this.downloadStep)
        }
      }, 1000)
      return JSPDF_para
    },
  },
  mounted() {},
}
</script>
    

</style>


<style scoped>
</style>
    