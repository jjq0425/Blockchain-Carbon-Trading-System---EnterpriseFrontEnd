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
// require('@/assets/fonts/Fangsong_GB2312-normal')
// require('@/assets/fonts/simhei-normal')
// require('@/assets/fonts/simheibd-normal')
// require('@/assets/fonts/HYYunHei-45W-normal')
import jsPDF from 'jspdf'
import { autoTable } from 'jspdf-autotable-extra'
export default {
  components: {},
  data() {
    return {
      visible: false,
      confirmLoading: false,
      id: null,
      downloadStep: 0,
      downloadStepInfo: '正在准备下载',
      StartPercentage: [0, 10, 30, 70, 80, 85, 95],
      // StopPercentage: [0, 30, 70, 80, 85, 90, 100],
      NowPercentage: 0,
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
  computed: {},
  methods: {
    open(id) {
      this.id = id

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
     * 生成PDF（测试）
     */
    async runPdf() {
      this.setProgress()
      await this.importFont()

      let yPos = 0
      let line = null
      let text = null
      let JSPDF_lineHeight
      let JSPDF_splittedText
      let JSPDF_lines
      let JSPDF_blockHeight
      this.downloadStep = 5
      let KEY = this.generateRandomKey(48)

      /**
       * 初始化
       */
      console.log('文件加密密码为：', KEY)
      const doc = new jsPDF({
        encryption: { userPermissions: ['print', 'copy'], ownerPassword: KEY },
      })
      doc.addFont('Fangsong_GB2312-normal.ttf', 'Fangsong_GB2312', 'normal')
      doc.addFont('simheibd-normal.ttf', 'simheibd', 'normal')
      doc.addFont('simhei-normal.ttf', 'simhei', 'normal')
      doc.addFont('HYYunHei-45W-normal.ttf', 'HYYunHei-45W', 'normal')

      this.downloadStep = 6
      /**
       * 生成封面
       */
      doc.setFont('simheibd')
      doc.setFontSize(25)
      doc.text('中国发电企业温室气体排放报告', doc.internal.pageSize.getWidth() / 2, 100, { align: 'center' })

      doc.setFontSize(15)
      doc
        .setFont('simhei')
        .text('报告主体（盖章）： ', 45, 220)
        .setFont('simhei')
        .text('电子科技大学', 45 + doc.getTextWidth('报告主体（盖章）： '), 220)
      doc.text('报告年度： ' + '2022年度', 45, 235)
      doc.text('报告日期： ' + '2022 年 6 月 13 日', 45, 250)

      /**
       * 第二页-开头
       */
      doc.addPage()
      yPos = 30

      doc.setFont('Fangsong_GB2312')
      doc.setFontSize(17)
      doc.setLineHeightFactor = 1.8
      text =
        '    根据国家发展和改革委员会发布的《中国发电企业温室气体排放核算方法与报告指南（试行）》，本报告主体核算了' +
        ' 2022 ' +
        '年度温室气体排放量，并填写了相关数据表格。现将有关情况报告如下:'
      JSPDF_lineHeight = (doc.getLineHeight(text) / doc.internal.scaleFactor) * (doc.getLineHeightFactor() + 0.4)
      JSPDF_splittedText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
      JSPDF_lines = JSPDF_splittedText.length // splitted text is a string array
      JSPDF_blockHeight = JSPDF_lines * JSPDF_lineHeight
      doc.text(20, yPos, JSPDF_splittedText, { lineHeightFactor: 1.8 })
      yPos += JSPDF_blockHeight

      /**
       * 第二页-企业基本情况
       */
      doc.setFont('simheibd')
      doc.setFontSize(17)
      doc.setLineHeightFactor = 1.8
      text = '    一、企业基本情况'
      JSPDF_lineHeight = (doc.getLineHeight(text) / doc.internal.scaleFactor) * (doc.getLineHeightFactor() + 0.4)
      JSPDF_splittedText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
      JSPDF_lines = JSPDF_splittedText.length // splitted text is a string array
      JSPDF_blockHeight = JSPDF_lines * JSPDF_lineHeight
      doc.text(20, yPos + 5, JSPDF_splittedText, { lineHeightFactor: 1.8 })
      yPos += JSPDF_blockHeight

      doc.setFont('Fangsong_GB2312')
      doc.setFontSize(15)
      doc.setLineHeightFactor = 1.5
      text =
        '    电子科技大学（University of Electronic Science and Technology of China），简称“电子科大”，坐落于四川省成都市，是中华人民共和国教育部直属高校，由教育部、工业和信息化部、四川省和成都市共建；位列国家“双一流”、“985工程”、“211工程”，入选“2011计划”、“111计划”、卓越工程师教育培养计划、国家建设高水平大学公派研究生项目、中国政府奖学金来华留学生接收院校、全国深化创新创业教育改革示范高校，为“两电一邮”成员；是一所完整覆盖整个电子类学科，以电子信息科学技术为核心，以工为主，理工渗透，理、工、管、文、医协调发展的多科性研究型全国重点大学。 学校原名成都电讯工程学院，1956年由交通大学（现上海交通大学、西安交通大学）、南京工学院（现东南大学）、华南工学院（现华南理工大学）的电讯工程有关专业合并创建而成；1960年被列为全国重点高等学校；1961年被确定为七所国防工业院校之一；1988年更名为电子科技大学；2000年由原信息产业部主管划转为教育部主管；2017年进入国家“双一流”建设高校行列。2019年教育部和四川省签约共同推进学校世界一流大学建设。 截至2023年8月，学校有清水河、沙河、九里堤3个校区，校舍总建筑面积149万余平方米；设有25个教学科研单位，65个本科专业；有博士后流动站15个，一级学科博士点19个，一级学科硕士点31个，博士专业学位授权点4个、硕士专业学位授权点12个；有教职工3800余人，在读本、硕、博学生42000余人。2017年进入国家“双一流”建设高校行列。2019年教育部和四川省签约共同推进学校世界一流大学建设。 截至2023年8月，学校有清水河、沙河、九里堤3个校区，校舍总建筑面积149万余平方米；设有25个教学科研单位，65个本科专业；有博士后流动站15个，一级学科博士点19个，一级学科硕士点31个，博士专业学位授权点4个、硕士专业学位授权点12个；有教职工3800余人，在读本、硕、博学生42000余人。2017年进入国家“双一流”建设高校行列。2019年教育部和四川省签约共同推进学校世界一流大学建设。 截至2023年8月，学校有清水河、沙河、九里堤3个校区，校舍总建筑面积149万余平方米；设有25个教学科研单位，65个本科专业；有博士后流动站15个，一级学科博士点19个，一级学科硕士点31个，博士专业学位授权点4个、硕士专业学位授权点12个；有教职工3800余人，在读本、硕、博学生42000余人。'
      JSPDF_lineHeight = (doc.getLineHeight(text) / doc.internal.scaleFactor) * (doc.getLineHeightFactor() + 0.4)
      JSPDF_splittedText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
      JSPDF_lines = JSPDF_splittedText.length // splitted text is a string array
      JSPDF_blockHeight = JSPDF_lines * JSPDF_lineHeight
      yPos += 5 //段前5
      for (let i = 0; i < JSPDF_lines; i++) {
        if (yPos >= doc.internal.pageSize.height - 30) {
          doc.addPage()
          yPos = 30
        } else if (i != 0) {
          yPos = yPos + JSPDF_lineHeight
        }
        doc.text(20, yPos, JSPDF_splittedText[i])
      }

      autoTable(doc, {
        startY: yPos + 5,
        head: [
          //表头
          ['类目', '详情'],
        ],
        body: [
          //表格内容 长度与上面对应
          ['单位名称', '电子科技大学'],
          ['单位地址', '成都市成华区建设北路二段4号'],
          ['单位性质', 'XXXXX'],
          ['组织机构代码', '91350122MA31GW0N65'],
          ['所属行业', 'XXXXXXX'],
          ['报告年度', '2022'],
          ['法定代表人', '曾涌'],
          ['填报负责人', 'ABC'],
          ['负责人邮箱', 'jiang_jinqian@qq.com'],
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
      yPos = doc.lastAutoTable.finalY

      /**
       * 第二页-温室气体排放
       */
      doc.setFont('simheibd')
      doc.setFontSize(17)
      doc.setLineHeightFactor = 1.5
      text = '    二、温室气体排放'
      JSPDF_lineHeight = (doc.getLineHeight(text) / doc.internal.scaleFactor) * (doc.getLineHeightFactor() + 0.4)
      JSPDF_splittedText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
      JSPDF_lines = JSPDF_splittedText.length // splitted text is a string array
      JSPDF_blockHeight = JSPDF_lines * JSPDF_lineHeight
      yPos += 15 //段前5
      for (let i = 0; i < JSPDF_lines; i++) {
        if (yPos >= doc.internal.pageSize.height - 30) {
          doc.addPage()
          yPos = 30
        } else if (i != 0) {
          yPos = yPos + JSPDF_lineHeight
        }
        doc.text(20, yPos, JSPDF_splittedText[i])
      }

      autoTable(doc, {
        startY: yPos + 5,
        head: [
          //表头
          ['类目', '详情'],
        ],
        body: [
          //表格内容 长度与上面对应
          ['单位名称', '电子科技大学'],
          ['单位地址', '成都市成华区建设北路二段4号'],
          ['单位性质', 'XXXXX'],
          ['组织机构代码', '91350122MA31GW0N65'],
          ['所属行业', 'XXXXXXX'],
          ['报告年度', '2022'],
          ['法定代表人', '曾涌'],
          ['填报负责人', 'ABC'],
          ['负责人邮箱', 'jiang_jinqian@qq.com'],
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
      yPos = doc.lastAutoTable.finalY

      /**
       * 第二页-活动水平数据及来源
       */
      doc.setFont('simheibd')
      doc.setFontSize(17)
      doc.setLineHeightFactor = 1.5
      text = '    三、活动水平数据及来源说明'
      JSPDF_lineHeight = (doc.getLineHeight(text) / doc.internal.scaleFactor) * (doc.getLineHeightFactor() + 0.4)
      JSPDF_splittedText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
      JSPDF_lines = JSPDF_splittedText.length // splitted text is a string array
      JSPDF_blockHeight = JSPDF_lines * JSPDF_lineHeight
      yPos += 15 //段前5
      for (let i = 0; i < JSPDF_lines; i++) {
        if (yPos >= doc.internal.pageSize.height - 30) {
          doc.addPage()
          yPos = 30
        } else if (i != 0) {
          yPos = yPos + JSPDF_lineHeight
        }
        doc.text(20, yPos, JSPDF_splittedText[i])
      }

      /**
       * 第二页-排放因子数据及来源
       */
      doc.setFont('simheibd')
      doc.setFontSize(17)
      doc.setLineHeightFactor = 1.5
      text = '    四、排放因子数据及来源说明'
      JSPDF_lineHeight = (doc.getLineHeight(text) / doc.internal.scaleFactor) * (doc.getLineHeightFactor() + 0.4)
      JSPDF_splittedText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
      JSPDF_lines = JSPDF_splittedText.length // splitted text is a string array
      JSPDF_blockHeight = JSPDF_lines * JSPDF_lineHeight
      yPos += 15 //段前5
      for (let i = 0; i < JSPDF_lines; i++) {
        if (yPos >= doc.internal.pageSize.height - 30) {
          doc.addPage()
          yPos = 30
        } else if (i != 0) {
          yPos = yPos + JSPDF_lineHeight
        }
        doc.text(20, yPos, JSPDF_splittedText[i])
      }

      /**
       * 第二页-承诺签字
       */
      doc.setFont('Fangsong_GB2312')
      doc.setFontSize(17)
      doc.setLineHeightFactor = 1.8
      text = '    本报告真实、可靠，如报告中的信息与实际情况不符，本企业将承担相应的法律责任。'
      JSPDF_lineHeight = (doc.getLineHeight(text) / doc.internal.scaleFactor) * (doc.getLineHeightFactor() + 0.4)
      JSPDF_splittedText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
      JSPDF_lines = JSPDF_splittedText.length // splitted text is a string array
      JSPDF_blockHeight = JSPDF_lines * JSPDF_lineHeight
      yPos += 25 //段前5
      for (let i = 0; i < JSPDF_lines; i++) {
        if (yPos >= doc.internal.pageSize.height - 30) {
          doc.addPage()
          yPos = 30
        } else if (i != 0) {
          yPos = yPos + JSPDF_lineHeight
        }
        doc.text(20, yPos, JSPDF_splittedText[i])
      }

      doc.setFont('Fangsong_GB2312')
      doc.setFontSize(17)
      doc.setLineHeightFactor = 1.8
      text = '法人（签字）：          '
      JSPDF_lineHeight = (doc.getLineHeight(text) / doc.internal.scaleFactor) * (doc.getLineHeightFactor() + 0.4)
      JSPDF_splittedText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
      JSPDF_lines = JSPDF_splittedText.length // splitted text is a string array
      JSPDF_blockHeight = JSPDF_lines * JSPDF_lineHeight
      yPos += 20 //段前5
      for (let i = 0; i < JSPDF_lines; i++) {
        if (yPos >= doc.internal.pageSize.height - 30) {
          doc.addPage()
          yPos = 30
        } else if (i != 0) {
          yPos = yPos + JSPDF_lineHeight
        }
        doc.text(115, yPos, JSPDF_splittedText[i])
      }

      doc.setFont('Fangsong_GB2312')
      doc.setFontSize(17)
      doc.setLineHeightFactor = 1.8
      text = '2022 年 12 月 10 日'
      JSPDF_lineHeight = (doc.getLineHeight(text) / doc.internal.scaleFactor) * (doc.getLineHeightFactor() + 0.4)
      JSPDF_splittedText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
      JSPDF_lines = JSPDF_splittedText.length // splitted text is a string array
      JSPDF_blockHeight = JSPDF_lines * JSPDF_lineHeight
      yPos += 15 //段前5
      for (let i = 0; i < JSPDF_lines; i++) {
        if (yPos >= doc.internal.pageSize.height - 30) {
          doc.addPage()
          yPos = 30
        } else if (i != 0) {
          yPos = yPos + JSPDF_lineHeight
        }
        doc.text(125, yPos, JSPDF_splittedText[i])
      }

      /**
       * 第二页-附表
       */
      doc.setFont('Fangsong_GB2312')
      doc.setFontSize(15)
      doc.setLineHeightFactor = 1.8
      text = '附表 1 报告主体二氧化碳排放量报告'
      JSPDF_lineHeight = (doc.getLineHeight(text) / doc.internal.scaleFactor) * (doc.getLineHeightFactor() + 0.4)
      JSPDF_splittedText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
      JSPDF_lines = JSPDF_splittedText.length // splitted text is a string array
      JSPDF_blockHeight = JSPDF_lines * JSPDF_lineHeight
      yPos += 25 //段前5
      for (let i = 0; i < JSPDF_lines; i++) {
        if (yPos >= doc.internal.pageSize.height - 30) {
          doc.addPage()
          yPos = 30
        } else if (i != 0) {
          yPos = yPos + JSPDF_lineHeight
        }
        doc.text(20, yPos, JSPDF_splittedText[i])
      }

      doc.setFont('Fangsong_GB2312')
      doc.setFontSize(15)
      doc.setLineHeightFactor = 1.8
      text = '附表 2 报告主体活动水平数据'
      JSPDF_lineHeight = (doc.getLineHeight(text) / doc.internal.scaleFactor) * (doc.getLineHeightFactor() + 0.4)
      JSPDF_splittedText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
      JSPDF_lines = JSPDF_splittedText.length // splitted text is a string array
      JSPDF_blockHeight = JSPDF_lines * JSPDF_lineHeight
      yPos += 10 //段前5
      for (let i = 0; i < JSPDF_lines; i++) {
        if (yPos >= doc.internal.pageSize.height - 30) {
          doc.addPage()
          yPos = 30
        } else if (i != 0) {
          yPos = yPos + JSPDF_lineHeight
        }
        doc.text(20, yPos, JSPDF_splittedText[i])
      }

      doc.setFont('Fangsong_GB2312')
      doc.setFontSize(15)
      doc.setLineHeightFactor = 1.8
      text = '附表 3 报告主体排放因子和计算系数'
      JSPDF_lineHeight = (doc.getLineHeight(text) / doc.internal.scaleFactor) * (doc.getLineHeightFactor() + 0.4)
      JSPDF_splittedText = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 40)
      JSPDF_lines = JSPDF_splittedText.length // splitted text is a string array
      JSPDF_blockHeight = JSPDF_lines * JSPDF_lineHeight
      yPos += 10 //段前5
      for (let i = 0; i < JSPDF_lines; i++) {
        if (yPos >= doc.internal.pageSize.height - 30) {
          doc.addPage()
          yPos = 30
        } else if (i != 0) {
          yPos = yPos + JSPDF_lineHeight
        }
        doc.text(20, yPos, JSPDF_splittedText[i])
      }

      doc.addPage()
      yPos = 30

      this.addWaterMark(doc)
    },
    /**
     *
     * @param {jsPDF()} doc jsPDF对象
     * @description 添加水印
     */
    addWaterMark(doc) {
      var pageCount = doc.internal.getNumberOfPages() //Total Page Number
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        if (i == 1) {
          doc.setFont('simheibd')
          doc.setFontSize(20)
          doc.setTextColor('#ff1e00')
          doc.text('非正式报告！报告仅供审核使用', doc.internal.pageSize.getWidth() / 2, 120, { align: 'center' })
        } else {
          doc.setFont('Fangsong_GB2312')
          doc.setFontSize(10)
          doc.setTextColor('#ff1e00')
          doc.text('非正式报告！报告仅供审核使用', doc.internal.pageSize.getWidth() / 2, 10, { align: 'center' })
        }
        // 添加水印
        doc.setTextColor('#000000')
        doc.setFont('simhei')
        doc.setFontSize(10)
        doc.saveGraphicsState() // 保存图形状态
        doc.setGState(doc.GState({ opacity: 0.3 })) // 设置透明度为0.3
        for (let j = 0; j <= 3; j++) {
          for (let k = 0; k <= 3; k++) {
            doc.text(
              '电子科技大学2022年度碳排放报告——碳盟链道生成',
              (j * doc.internal.pageSize.getWidth()) / 3,
              (k * doc.internal.pageSize.getHeight()) / 3 - 20,
              42
            ) // 水印文本, 横向坐标， 纵向坐标， 倾斜角度
          }
        }
        doc.restoreGraphicsState() // 设置完毕之后，清除图形状态，防止影响其他内容
      }
      this.addPageCountAndDownload(doc)
    },
    /**
     *
     * @param {jsPDF()} doc jsPDF对象
     * @description 添加页码并下载PDF
     */
    addPageCountAndDownload(doc) {
      // 添加页码
      var pageCount = doc.internal.getNumberOfPages() //Total Page Number
      doc.setFont('simhei')
      doc.setFontSize(10)
      //   跳过第一页
      for (let i = 2; i <= pageCount; i++) {
        doc.setPage(i)
        let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber //Current Page
        doc.text(pageCurrent + '/' + pageCount, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.height - 10)
      }

      //   console.log(doc)

      setTimeout(() => {
        if (this.visible) {
          doc.save('a4.pdf')
          // console.log('>>下载结束')

          this.downloadStep = 7
          // console.log(this.downloadStep)
        }
      }, 1000)
    },
  },
  mounted() {},
}
</script>
    

</style>


<style scoped>
</style>
    