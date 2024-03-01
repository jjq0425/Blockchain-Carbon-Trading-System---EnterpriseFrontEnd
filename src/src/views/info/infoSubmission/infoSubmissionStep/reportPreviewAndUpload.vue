<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <div>
    <a-form :form="form" style="min-width: 400px; max-width: 1000px; margin: 0px auto">
      <div style="display: flex; justify-content: space-between">
        <div style="margin-right: 50px; width: 45%">
          <div style="margin-bottom: 20px; font-weight: bold">
            <span style="font-size: 32px; color: #1677ff; font-weight: bold">1.</span> 下载并预览您的碳核算报告
          </div>
          <a-form-item>
            <div style="background-color: #fafafa; text-align: center; border-radius: 9px" class="downloadDIV">
              <p class="ant-upload-drag-icon">
                <img
                  src="@/assets/pages/info/infoSubmissionCenter/reportPreviewAndUpload/downloadReport.png"
                  alt=""
                  style="width: 50%"
                />
              </p>
              <p class="ant-upload-hint">点击下载并预览您的碳排放报告</p>
              <a-button
                type="primary"
                shape="round"
                icon="download"
                size="large"
                :block="true"
                style="
                  width: 60%;
                  background: linear-gradient(135deg, #3776e1, #65affb);
                  border: 0px;
                  margin-top: -10px;
                  margin-bottom: 20px;
                "
                @click="downloadPDF"
                >下载</a-button
              >
            </div>
          </a-form-item>
        </div>
        <div style="width: 45%">
          <div style="margin-bottom: 20px; font-weight: bold">
            <span style="font-size: 32px; color: #1677ff; font-weight: bold">2.</span> 上传碳核算报告签字盖章版扫描件
          </div>
          <a-form-item>
            <a-alert
              message="请先下载碳排放报告，随后再上传签字版。"
              banner
              v-if="!hasDownload"
              style="margin-bottom: 10px"
            />
            <a-upload-dragger
              :disabled="!hasDownload"
              name="file"
              accept=".pdf,"
              :multiple="false"
              :remove="handleFileRemove"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :customRequest="fileUpload"
              :fileList="fileListPDF"
              ref="uploadRef"
              v-decorator="[
                'fileListsTmp',
                {
                  getValueFromEvent: normFile,
                  rules: [{ validator: this.fileValidator }],
                },
              ]"
            >
              <p class="ant-upload-drag-icon">
                <img
                  src="@/assets/pages/info/infoSubmissionCenter/reportPreviewAndUpload/uploadReport.png"
                  alt=""
                  style="width: 50%"
                />
              </p>
              <p class="ant-upload-text">
                点击或者拖拽<span style="font-weight: bold; font-size: 18px">签字盖章后的核算报告</span>文件以上传
              </p>
              <p class="ant-upload-hint">请将报告文件（不含数据来源）通过扫描器按顺序放置在一个PDF中</p>
            </a-upload-dragger>
          </a-form-item>
        </div>
      </div>
    </a-form>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <h4>我是否可以用以前生成的报告？</h4>
      <p>不可以，您必须在本页面重新下载报告进行生成。</p>
      <h4>我可以上传多个文件吗？</h4>
      <p>不可以，您只能上传一份碳排放核算报告。</p>
      <h4>如何命名文件？</h4>
      <p>文件名将在后台会被自动地重命名为【组织机构代码-企业名-年份-碳排放报告-核算报告-时间戳】。您无需手工设置。</p>
      <dataSourceQuestionModal ref="dataSourceQuestionModal"></dataSourceQuestionModal>
    </div>
    <pdfDownload ref="pdfDownloadRef"></pdfDownload>
  </div>
</template>
      
<script>
import dayjs from 'dayjs'
import dataSourceQuestionModal from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/dataSourceQuestionModal'
import { UploadFileAPI } from '@/api/public'
import axios from 'axios'
import pdfDownload from '@/components/PDFgenerate/pdfDownload.vue'
export default {
  name: 'dataSourceUpload',
  data() {
    return {
      form: this.$form.createForm(this),
      hasDownload: false,

      fileListPDF: [],
      submitData: {},
      taskInfo: {},
    }
  },
  components: {
    dataSourceQuestionModal,
    pdfDownload,
  },
  methods: {
    passSubdata(submitData, taskInfo) {
      this.submitData = JSON.parse(JSON.stringify(submitData))
      this.taskInfo = JSON.parse(JSON.stringify(taskInfo))
    },
    momentFormat(date, format = 'YYYY-MM-DD') {
      date = parseInt(date) * 1000
      return dayjs(date).format(format)
    },
    getreportPDFUrl() {
      return this.fileListPDF[0].url
    },
    fileUpload(file) {
      const isPDF = file.file.type === 'application/pdf'

      //   console.log(this.fileList.length, file, 'isPDF', isPDF)
      let fileNameAuto = `${this.enterpriseInfo.enterpriseID}-${this.enterpriseInfo.enterpriseName}-${
        this.taskInfo.taskYear
      }年度-碳排放报告-核算报告-${dayjs().unix()}.pdf`

      //初始化文件信息
      const fileInfo = {
        uid: file.file.uid,
        name: fileNameAuto,
        status: 'uploading',
        response: '',
        url: '',
        type: file.file.type,
      }
      Object.defineProperty(file.file, 'name', {
        writable: true, //设置属性为可写
      })
      file.file.name = fileNameAuto
      //放入上传列表中，以便于显示上传进度
      this.fileListPDF.push(fileInfo)
      this.setFileListPDF()

      this.handleFileChange()

      const formData = new FormData()
      formData.append('file', file.file)

      if (!isPDF) {
        setTimeout(() => {
          this.$message.error('文件格式不合规，请上传PDF文件')
          file.onError()
        }, 100)
      } else {
        let api = UploadFileAPI().api
        let token = UploadFileAPI().MYtoken

        formData.append('token', token)
        let this_ = this

        axios
          .post(this.$store.state.app.baseUrl + api, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              const percentNum = Math.round((progressEvent.loaded * 100) / progressEvent.total)

              file.onProgress(
                {
                  percent: percentNum,
                },
                formData.file
              )
            },
          })
          .then((response) => {
            let res = response.data
            if (res.success) {
              fileInfo.status = 'done'
              fileInfo.id = fileInfo.uid
              fileInfo.url = res.data.url
              // TODO: 这里需要修改，因为上传的文件数据可能和数据库中的不一致
              fileInfo.name = fileNameAuto
              file.onSuccess(res.data, file)
              this.$message.success('上传成功')
            } else {
              fileInfo.status = 'error'
              fileInfo.response = res.msg
              file.onError()
              this.$message.error('上传失败,请确认网络环境后重新上传')
            }
          })
          .catch(() => {
            fileInfo.status = 'error'

            file.onError()
            this.$message.error('上传失败,请确认网络环境后重新上传')
          })
      }
    },

    handleFileChange() {
      if (this.fileListPDF.length >= 1) {
        this.fileListPDF = this.fileListPDF.slice(-1)
        this.setFileListPDF()
        return true
      } else {
        this.setFileListPDF()
        return true
      }
    },
    handleFileRemove(file) {
      //   在this.fileList中找到uid相同的并删除
      this.fileListPDF = this.fileListPDF.filter((item) => item.uid !== file.uid)
      this.setFileListPDF()
      return true
    },
    normFile(e) {
      //   console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    setFileListPDF() {
      let list = this.fileListPDF
      this.form.setFieldsValue({ fileList: list })
    },
    fileValidator(rule, value, callback) {
      value = this.fileListPDF
      // console.log('fileValidator', rule, value)
      if (value.length === 0) {
        callback(new Error('请上传签字盖章后碳排放报告'))
        // this.$message.error('请上传数据来源证明文件')
      } else if (value[0].type != 'application/pdf') {
        callback(new Error('文件类型错误，请上传PDF文件'))
      } else if (value[0].status == 'error') {
        callback(new Error('文件上传失败，请重新上传'))
      } else {
        callback()
      }
    },

    /**
     * 打开数据源问题弹窗
     */
    openDataSourceQuestionModal() {
      // console.log(this.$refs.dataSourceQuestionModal)
      this.$refs.dataSourceQuestionModal.open()
    },
    downloadPDF() {
      this.hasDownload = true
      this.$refs.pdfDownloadRef.open(this.submitData, this.taskInfo)
    },
  },
  mounted() {
    this.enterpriseInfo = this.$store.state.user.info
    this.taskInfo = this.$route.params.task
    // console.log(this.taskInfo)
  },
}
</script>
      
<style lang="less" scoped>
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
.downloadDIV {
  border: 1px dashed #d9d9d9;
  transition: all 0.3s ease-in-out;
}
.downloadDIV:hover {
  border: 1px dashed #1890ff;
}
</style>
      