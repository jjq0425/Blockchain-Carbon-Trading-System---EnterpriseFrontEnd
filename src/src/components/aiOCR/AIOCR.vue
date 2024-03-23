<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <a-modal
    title="AI图证票据智能识别引擎"
    v-model="visible"
    :footer="null"
    :width="800"
    :dialog-style="{ top: '20px' }"
    :maskClosable="false"
    :cancel="close"
    destroyOnClose
    :closable="!submitting"
  >
    <div style="height: 500px; padding: 20px; overflow: hidden">
      <div
        style="
          width: 705px;
          height: 400px;

          border-radius: 10px;
          background-color: #f9fbff;

          display: flex;
        "
        class="uploadBtn"
        @click="choosecoverImgHandler"
      >
        <div style="margin: auto" v-if="previewImg == null">
          <div style="width: 100%; text-align: center">
            <a-icon type="plus" style="font-size: 80px; color: #495057" />
          </div>
          <div style="width: 100%; text-align: center">
            <p style="margin-top: 10px; font-size: 20px; color: #495057">请上传待识别的图片</p>
          </div>
          <div style="width: 100%; text-align: center">
            <p style="margin-top: 10px; font-size: 12px; color: grey" v-if="ocrType == 'YYZZ'">
              为保证识别效果，当前场景只允许上传营业执照，包括拍照版、扫描版
            </p>
            <template v-else-if="ocrType == 'FP'">
              <p style="margin-top: 10px; font-size: 12px; color: grey">
                为保证识别效果，当前场景只允许上传相关增值税发票，包括拍照版、扫描版，
              </p>
              <p style="margin-top: 10px; font-size: 12px; color: grey">
                识别结果仅本模块 {{ className }} 使用，跨模块发票请分别上传。
              </p>
              <p style="margin-top: 10px; font-size: 12px; color: grey; font-weight: bold">
                如有多张发票，请逐个完成扫描和核对，数据将会累加
              </p>
            </template>
          </div>
        </div>
        <div
          style="width: 705px; height: 400px; position: absolute"
          :style="{
            background: submitting ? 'rgba(249, 251, 255, 0.85)' : 'transparent',
          }"
          id="lottie_ai_aiOCR"
          class="lottie_ai_aiOCR_class animate__fadeIn animate__animated"
          v-show="submitting"
        >
          <div
            style="
              font-size: 40px;
              font-weight: bold;
              background: linear-gradient(90deg, #4752e6, #de81de);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-top: 200px;
              text-align: center;
              transform: translateY(-100%);
              z-index: 100000;
            "
            class="lottie_ai_aiOCR_class animate__fadeIn animate__animated"
          >
            智能识别中
          </div>
        </div>
        <img :src="previewImg" alt="" class="cover-img" ref="imgRef" v-if="previewImg != null" style="margin: auto" />
        <div class="loading animate__fadeIn animate__animated" style="z-index: 1000" v-show="submitting"></div>
      </div>

      <div style="display: flex; justify-content: space-between; margin-top: 10px" v-if="previewImg != null">
        <a-tooltip>
          <template slot="title">
            <p v-if="ocrType == 'YYZZ'">为保证识别效果，当前场景只允许上传营业执照，包括拍照版、扫描版</p>
            <p v-else-if="ocrType == 'FP'">
              为保证识别效果，当前场景只允许上传相关增值税发票，包括拍照版、扫描版，识别结果仅本模块使用
            </p>
          </template>
          <a-button
            type="text"
            style="border-radius: 999px; border: none; background: transparent"
            @click="choosecoverImgHandler"
            :disabled="submitting"
            ><a-icon type="sync" />重新上传</a-button
          >
        </a-tooltip>
        <a-button type="primary" @click="submitHandler" style="border-radius: 999px; border: none" :loading="submitting"
          ><a-icon type="cloud-upload" v-show="!submitting" />开始识别</a-button
        >
      </div>

      <!-- 文件选择框，默认被隐藏 -->
      <input @change="coverImgChangeHandler" type="file" accept="image/*" ref="iptFileRef" hidden />
      <!-- 选择封面的按钮 -->
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

      previewImg: null,
      ocrType: 'YYZZ',
      className: '', //模块名，专用于数据上传，发票验证
      submitting: false,

      baiduOCRToken: '',
    }
  },
  components: {},
  computed: {
    lang() {
      return this.$store.state.app.lang
    },
  },
  methods: {
    open(type, className = '') {
      this.ocrType = type
      this.submitting = false
      this.baiduOCRToken = ''
      this.previewImg = null
      this.className = className

      this.visible = true
    },
    close() {
      //   this.animation.destroy()
      //   this.animation = null
      if (this.submitting) return

      setTimeout(() => {
        this.visible = false
      }, 100)
    },
    choosecoverImgHandler() {
      if (this.submitting) return
      this.$refs.iptFileRef.click()
    },
    // ◆图片选择框的 change 事件触发
    coverImgChangeHandler(e) {
      //   console.log(e.target.files)

      // 1.获取用户选择的文件对象
      const files = e.target.files

      if (
        files.length !== 0 &&
        !(files[0].type == 'image/png' || files[0].type == 'image/jpeg' || files[0].type == 'image/jpg')
      ) {
        this.$message.error('请上传图片，暂不支持其他格式')

        return
      }

      // 2.判断用户是否选择了文件对象
      if (files.length === 0) {
        // 2.1用户没有选择图片(使用默认图片)
        // 法1
        // this.$refs.imgRef.src = coverImg
        // 法2
        // this.previewImg = null
        return
      } else {
        // 2.2用户选择了图片(使用选择的图片)
        // ◆将 File 对象 转成 BASE64 字符串
        // 1.创建 FileReader 对象
        const fr = new FileReader()
        // 2.调用 readAsDataURL 函数，读取文件内容
        fr.readAsDataURL(files[0])
        // 3.监听 fr 的 onload 事件
        fr.onload = (e) => {
          // 通过 e.target.result 获取到读取的结果，值是 BASE64 格式的字符串
          // 法1
          // this.$refs.imgRef.src = e.target.result
          // 法2
          this.previewImg = e.target.result
          this.$refs.iptFileRef.value = null
        }
      }
    },
    submitHandler() {
      this.submitting = true

      setTimeout(() => {
        this.fetchOCRtoken()
        // this.closeLott()
      }, 500)
    },
    fetchOCRtoken() {
      axios.get('https://mock.apifox.com/m1/2214773-0-default' + '/baiduOCR').then((CLIENTres) => {
        // console.log(CLIENTres)
        if (CLIENTres.data.data.client_token != '') {
          if (this.ocrType == 'YYZZ') {
            this.OCR_YYZZ(CLIENTres.data.data.client_token)
          } else if (this.ocrType == 'FP') {
            this.OCR_FP(CLIENTres.data.data.client_token)
          }
        } else {
          this.$message.loading('AI识别中')

          if (this.ocrType == 'YYZZ') {
            this.OCR_YYZZ_moni()
          } else if (this.ocrType == 'FP') {
            this.OCR_FP_moni()
          }
          return
        }
      })
    },
    OCR_YYZZ(client_token) {
      // console.log(this.previewImg)
      // 将previreImg转为BASE64

      //   构造一个form对象
      let form = new FormData()
      form.append('image', this.previewImg)

      axios({
        url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/business_license?access_token=' + client_token,
        method: 'post',

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: form,
      }).then((OCRRes) => {
        let OCR_RES = OCRRes.data

        setTimeout(() => {
          this.close()
          this.submitting = false
        }, 1000)
        setTimeout(() => {
          this.$emit('OCRfinish', OCR_RES, 'YYZZ')
        }, 1200)
      })
    },
    OCR_YYZZ_moni() {
      setTimeout(() => {
        let CORRES = {
          words_result: {
            经营范围: {
              location: {
                top: 512,
                left: 239,
                width: 374,
                height: 102,
              },
              words:
                '一航项目:再生资源回收(除生产性废旧金属);物业管理;金属制品销售。(除依法须经批准的项目外,凭营业执照依法自主开展经营活动)许可项目:城市生活垃圾经营性服务:退路货物运输(不含危险货物)。(依法须经效准的项目,经租关部门批准后方可开展经营活动,具体经营项目以审批结采为准)',
            },
            组成形式: {
              location: {
                top: -1,
                left: -1,
                width: 0,
                height: 0,
              },
              words: '无',
            },
            法人: {
              location: {
                top: 479,
                left: 241,
                width: 38,
                height: 18,
              },
              words: '夏燕',
            },
            证件编号: {
              location: {
                top: -1,
                left: -1,
                width: 0,
                height: 0,
              },
              words: '无',
            },
            注册资本: {
              location: {
                top: 399,
                left: 782,
                width: 120,
                height: 17,
              },
              words: '100万元',
            },
            单位名称: {
              location: {
                top: 410,
                left: 241,
                width: 223,
                height: 14,
              },
              words: '陕西威泽住环保科技有限公司',
            },
            有效期: {
              location: {
                top: 466,
                left: 784,
                width: 37,
                height: 18,
              },
              words: '长期',
            },
            社会信用代码: {
              location: {
                top: 314,
                left: 112,
                width: 177,
                height: 11,
              },
              words: '91610136MAB0QXTC10',
            },
            实收资本: {
              location: {
                top: -1,
                left: -1,
                width: 0,
                height: 0,
              },
              words: '无',
            },
            有效期起始日期: {
              location: {
                top: -1,
                left: -1,
                width: 0,
                height: 0,
              },
              words: '年月日',
            },
            核准日期: {
              location: {
                top: 715,
                left: 877,
                width: 159,
                height: 16,
              },
              words: '2021年10月23日',
            },
            成立日期: {
              location: {
                top: 433,
                left: 783,
                width: 139,
                height: 15,
              },
              words: '2021年02月23日',
            },
            税务登记号: {
              location: {
                top: -1,
                left: -1,
                width: 0,
                height: 0,
              },
              words: '无',
            },
            地址: {
              location: {
                top: 499,
                left: 785,
                width: 282,
                height: 13,
              },
              words: '陕西省西安市沪灞生态区百柳路62号',
            },
            登记机关: {
              location: {
                top: 593,
                left: 944,
                width: 126,
                height: 118,
              },
              words: '浙国市市场巨餐件(()',
            },
            类型: {
              location: {
                top: 445,
                left: 240,
                width: 202,
                height: 15,
              },
              words: '有限责任公司(自然人独资)',
            },
          },
          direction: 0,
          words_result_num: 16,
          log_id: 1769196086197683922,
        }
        let OCR_RES = CORRES

        setTimeout(() => {
          this.submitting = false
          this.close()
        }, 1000)
        setTimeout(() => {
          this.$emit('OCRfinish', OCR_RES, 'YYZZ')
        }, 1200)
      }, 1500)
    },
    /**
     * fap
     */
    OCR_FP(client_token) {
      // console.log(this.previewImg)
      // 将previreImg转为BASE64

      //   构造一个form对象
      let form = new FormData()
      form.append('image', this.previewImg)

      axios({
        url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/vat_invoice?access_token=' + client_token,
        method: 'post',

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: form,
      }).then((OCRRes) => {
        let OCR_RES = OCRRes.data

        setTimeout(() => {
          this.close()
          this.submitting = false
        }, 1000)
        setTimeout(() => {
          this.$emit('OCRfinish', OCR_RES, 'FP')
        }, 1200)
      })
    },
    OCR_FP_moni() {
      setTimeout(() => {
        let CORRES = {
          words_result_num: 46,
          words_result: {
            InvoiceNumDigit: '',
            CommodityUnit: [
              {
                row: '1',
                word: '升',
              },
              {
                row: '2',
                word: '升',
              },
            ],
            PurchaserAddress: '湘潭市南湖区云塘街道389号52523730',
            SheetNum: '第三联：发票联',
            CommodityType: [
              {
                row: '1',
                word: '92号车用汽油VT',
              },
              {
                row: '2',
                word: '95号车用汽油VI',
              },
            ],
            TotalAmount: '10382.59',
            Checker: '赵华',
            PurchaserBank: '中国农业银行湘潭车站路支行18192101040003851',
            Agent: '否',
            Password:
              '4251-274*2+72870</4-+475*944>0+7+8<285241<9>8-7+6/7839<*1+31++28+07</47>36445*6/-**342750<*880+-',
            InvoiceTypeOrg: '湖南增值税专用发票',
            InvoiceCodeConfirm: '430',
            TotalTax: '1349.74',
            ServiceType: '交通',
            CommodityTaxRate: [
              {
                row: '1',
                word: '13%',
              },
              {
                row: '2',
                word: '13%',
              },
            ],
            CommodityTax: [
              {
                row: '1',
                word: '656.14',
              },
              {
                row: '2',
                word: '693.60',
              },
            ],
            SellerBank: '中国建设银行股份有限公司湘潭广源支行43050163670800000260',
            Remarks: '4868463',
            SellerAddress: '湘潭韶山东路568#0731-58261675',
            NoteDrawer: '肖幼',
            InvoiceTag: '成品油',
            InvoiceNumConfirm: '0680760',
            OnlinePay: '2法',
            Payee: '周金花',
            CommodityName: [
              {
                row: '1',
                word: '*汽油*车用油',
              },
              {
                row: '2',
                word: '*汽油*车用油',
              },
            ],
            CommodityVehicleType: [],
            InvoiceCode: '4300204130',
            AmountInWords: '壹万壹仟柒叁拾贰圆叁角叁分',
            AmountInFiguers: '11732.33',
            City: '',
            InvoiceType: '专用发票',
            CommodityEndDate: [],
            PurchaserName: '湘潭市水利水电勘测设计院有限公司',
            InvoiceDate: '2021年10月20日',
            CommodityNum: [
              {
                row: '1',
                word: '824.07',
              },
              {
                row: '2',
                word: '817.1',
              },
            ],
            PurchaserRegisterNum: '91430300184711279E',
            MachineCode: '',
            CommodityPlateNum: [],
            CheckCode: '',
            SellerRegisterNum: '914303007170577687',
            CommodityPrice: [
              {
                row: '1',
                word: '6.1246860097',
              },
              {
                row: '2',
                word: '6.5297026068',
              },
            ],
            CommodityStartDate: [],
            SellerName: '中国石化销售股份有限公司湖南湘潭石油分公司',
            CommodityAmount: [
              {
                row: '1',
                word: '5047.17',
              },
              {
                row: '2',
                word: '5335.42',
              },
            ],
            Province: '湖南省',
            InvoiceNum: '807600',
          },
          log_id: '1769278837058628769',
        }
        let OCR_RES = CORRES

        setTimeout(() => {
          this.submitting = false
          this.close()
        }, 1000)
        setTimeout(() => {
          this.$emit('OCRfinish', OCR_RES, 'FP')
        }, 1200)
      }, 1500)
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

.cover-img {
  max-width: 700px;
  max-height: 380px;
  object-fit: cover;
}

.uploadBtn {
  border: 2px dashed #a5d8ff;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 9px 0 rgba(117, 170, 255, 0.26);
  cursor: pointer;
}
.uploadBtn:hover {
  border: 2px dashed #5c7cfa;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 25px 0 rgba(117, 170, 255, 0.36);
}

.lottie_ai_aiOCR_class {
  transition: all 0.4s ease-in-out;
  border-radius: 10px;
}

.loading {
  position: absolute;
  width: 705px;
  height: 400px;
  top: 100px;
  left: 45px;
  right: 0;
  bottom: 0;
  border-radius: 10px;

  background: linear-gradient(#07aaff, #07aaff), linear-gradient(90deg, #ffffff33 1px, transparent 0),
    linear-gradient(#ffffff33 1px, transparent 0), linear-gradient(transparent, #07aaff);
  background-size: 100% 1.5%, 10% 100%, 100% 8%, 100% 100%;
  background-repeat: no-repeat, repeat, repeat, no-repeat;
  background-position: 0 0, 0 0, 0 0, 0 0;

  clip-path: polygon(0% 0%, 100% 0%, 100% 1.5%, 0% 1.5%);

  animation: move 3s infinite ease-in-out;
}
@keyframes move {
  0% {
    background-position: 0 0%, 0 0, 0 0, 0 0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 1.5%, 0% 1.5%);
  }
  50% {
    background-position: 0 100%, 0 0, 0 0, 0 0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
  100% {
    background-position: 0 0%, 0 0, 0 0, 0 0;
    clip-path: polygon(0% 0%, 100% 0%, 100% 1.5%, 0% 1.5%);
  }
}
</style>