<!--
 * @Author: jjq
 * @Description: 
 * 
-->
<template>
  <div>
    <a-form :form="form" style="min-width: 400px; max-width: 800px; margin: 40px auto 0">
      <a-form-item>
        <a-upload-dragger
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
            <a-icon type="inbox" style="color: #1677ff" />
          </p>
          <p class="ant-upload-text">
            点击或者拖拽<span style="font-weight: bold; font-size: 18px">数据来源证明</span>文件以上传
          </p>
          <p class="ant-upload-hint">请将所有相关证明材料合并到一个PDF中</p>
        </a-upload-dragger>
      </a-form-item>
    </a-form>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <h4>我需要上传什么文件？</h4>
      <p>
        在上一步骤中，除非您选择的为“缺省值”类型，否则您需要上传相关证明文件。各类型所需的证明文件可以点击<a
          @click="openDataSourceQuestionModal()"
          >这里</a
        >查看
      </p>
      <h4>我可以上传多个文件吗？</h4>
      <p>不可以，为了方便审核人员审核，您至多上传一个文件。请将所有证明材料合并到同一个PDF中。</p>
      <h4>如何命名文件？</h4>
      <p>
        文件名将在后台会被自动地重命名为【组织机构代码-企业名-年份-碳排放报告-数据来源证明-时间戳】。您无需手工设置。
      </p>
      <dataSourceQuestionModal ref="dataSourceQuestionModal"></dataSourceQuestionModal>
    </div>
  </div>
</template>
    
    <script>
import dayjs from 'dayjs'
import dataSourceQuestionModal from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/dataSourceQuestionModal'
import { UploadFileAPI } from '@/api/public'
import axios from 'axios'
export default {
  name: 'dataSourceUpload',
  data() {
    return {
      form: this.$form.createForm(this),

      submitType: 'create',

      fileListPDF: [],
    }
  },
  components: {
    dataSourceQuestionModal,
  },
  methods: {
    momentFormat(date, format = 'YYYY-MM-DD') {
      date = parseInt(date) * 1000
      return dayjs(date).format(format)
    },
    getdataSourcePDFUrl() {
      return this.fileListPDF[0].url
    },
    passSourceData(submitData, submitType) {
      this.fileListPDF = []
      let data_url = submitData.dataSourcePDF
      // 提取最后一个/后面的所有字符串
      data_name = '（文件名加密保护中）  ' + data_url.substring(data_url.lastIndexOf('/') + 1, data_url.length)
      let data_name
      const fileInfo = {
        uid: '-1',
        name: data_name,
        status: 'done',
        response: '',
        url: data_url,
        type: 'application/pdf',
      }
      this.fileListPDF.push(fileInfo)
      this.submitType = submitType
    },

    fileUpload(file) {
      const isPDF = file.file.type === 'application/pdf'

      //   console.log(this.fileList.length, file, 'isPDF', isPDF)
      let fileNameAuto = `${this.enterpriseInfo.enterpriseID}-${this.enterpriseInfo.enterpriseName}-${
        this.taskInfo.taskYear
      }年度-碳排放报告-数据来源证明-${dayjs().unix()}.pdf`

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
        // formData.append('type', 'SOURCE')
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
        // UploadFileAPI(formData['file'], config).then((res) => {
        //   if (res.success) {
        //     fileInfo.status = 'done'
        //     fileInfo.id = fileInfo.uid
        //     fileInfo.url = 'api/fileInfo/preview?id=' + res.data.url
        //     fileInfo.name = fileNameAuto
        //     file.onSuccess(res.data, file)

        //     this.$message.success('上传成功')
        //   } else {
        //     fileInfo.status = 'error'
        //     fileInfo.response = res.msg
        //     file.onError()
        //     this.$message.error('上传失败,请确认网络环境后重新上传')
        //   }
        // })
      }

      //调用上传文件接口
      //   fileInfoUpload(formData).then((res) => {
      //     this.uploading = false
      //     if (res.success) {
      //       fileInfo.status = 'done'
      //       fileInfo.id = fileInfo.uid = res.data
      //       fileInfo.url = 'api/fileInfo/preview?id=' + res.data
      //       fileInfo.name = file.file.name
      //       file.onSuccess(res.data, file)
      //       this.$message.success('上传成功')
      //     } else {
      //       fileInfo.status = 'error'
      //       fileInfo.response = res.msg
      //       file.onError()
      //       this.$message.info('上传失败：' + res.message)
      //     }
      //   })
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
        callback(new Error('请上传数据来源证明文件'))
        // this.$message.error('请上传数据来源证明文件')
      } else if (value[0].type != 'application/pdf') {
        callback(new Error('文件类型错误，请上传PDF文件'))
      } else if (value[0].status == 'error') {
        callback(new Error('文件上传失败，请重新上传'))
      } else if (value[0].status == 'uploading') {
        callback(new Error(`   `))
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
</style>
    