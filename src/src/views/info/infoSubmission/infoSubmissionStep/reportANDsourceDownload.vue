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
            <span style="font-size: 32px; color: #1677ff; font-weight: bold">1.</span> 碳核算报告
          </div>
          <a-form-item>
            <div style="text-align: center" class="downloadDIV">
              <p class="ant-upload-drag-icon">
                <img
                  src="@/assets/pages/info/infoSubmissionCenter/reportPreviewAndUpload/reportDownload.svg"
                  alt=""
                  style="width: 50%"
                />
              </p>
              <!-- <p class="ant-upload-hint">点击下载您的碳排放报告</p> -->
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
                @click="downloadPDF('report')"
                >下载碳排放报告</a-button
              >
            </div>
          </a-form-item>
        </div>
        <div style="width: 45%">
          <div style="margin-bottom: 20px; font-weight: bold">
            <span style="font-size: 32px; color: #1677ff; font-weight: bold">2.</span> 数据来源证明材料
          </div>
          <a-form-item>
            <div style="text-align: center" class="downloadDIV">
              <p class="ant-upload-drag-icon">
                <img
                  src="@/assets/pages/info/infoSubmissionCenter/reportPreviewAndUpload/datasourceDownload.svg"
                  alt=""
                  style="width: 50%"
                />
              </p>
              <!-- <p class="ant-upload-hint">点击下载并预览您的碳排放报告</p> -->
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
                @click="downloadPDF('dataSource')"
                >下载数据来源证明材料</a-button
              >
            </div>
          </a-form-item>
        </div>
      </div>
    </a-form>
    <a-divider />
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <h4>我上传的文件安全吗？</h4>
      <p>我们使用先进的ipfs技术，除了您、审核员、有权利的第三方监管者，其他人无权下载。</p>

      <dataSourceQuestionModal ref="dataSourceQuestionModal"></dataSourceQuestionModal>
    </div>
  </div>
</template>
      
<script>
import dayjs from 'dayjs'
import dataSourceQuestionModal from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/dataSourceQuestionModal'

export default {
  name: 'reportANDsourceDownload',
  data() {
    return {
      form: this.$form.createForm(this),

      fileListPDF: [],
      submitData: {},
      taskInfo: {},

      submitType: 'create',
    }
  },
  components: {
    dataSourceQuestionModal,
  },
  methods: {
    passSourceData(submitData, taskInfo, type) {
      this.submitData = JSON.parse(JSON.stringify(submitData))
      this.taskInfo = JSON.parse(JSON.stringify(taskInfo))
    },
    momentFormat(date, format = 'YYYY-MM-DD') {
      date = parseInt(date) * 1000
      return dayjs(date).format(format)
    },

    /**
     * 打开数据源问题弹窗
     */

    downloadPDF(downloadType) {
      // this.$refs.pdfDownloadRef.open(this.submitData, this.taskInfo)
      if (downloadType == 'report') {
        window.open(this.submitData.reportPDF)
      } else if (downloadType == 'dataSource') {
        // window.open(this.submitData.dataSourcePDF)
        window.open('http://8.137.108.102:8080/download/QmdCk3r2CbeT4F7hqSxoyYE6Hp4xAiu5VL5eqsMt9u6hCQ')
      }
    },
  },
  mounted() {},
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
  background: url('https://p1-hera.feishucdn.com/tos-cn-i-jbbdkfciu3/9ad072121ca04b2ca196258444996b96~tplv-jbbdkfciu3-png:0:0.png');
  box-shadow: 0 10px 30px 0 rgba(176, 191, 231, 0.25);
  background-size: cover;
  border: 2px dashed #3d7ee5;
  transition: all 0.5s ease-in-out;
  border-radius: 16px;
}
.downloadDIV:hover button {
  transform: scale(1.05);
}
</style>
      