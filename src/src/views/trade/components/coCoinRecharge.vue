<template>
  <a-modal v-model="visible" title="碳币充值" width="500px" :footer="null" :dialog-style="{ top: '30px' }">
    <div style="min-height: 400px; overflow-y: scroll; padding: 20px; padding-top: 5px">
      <div>
        <!-- <a-form-model :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
          <a-form-model-item label="充值人"> {{ form.enterpriseName }} ( {{ form.enterpriseID }} ) </a-form-model-item>
          <a-form-model-item label="充值金额"> form.num </a-form-model-item>
        </a-form-model> -->
        <div>充值人：</div>
        <div style="margin-top: 5px; color: black; font-size: 20px">
          {{ form.enterpriseName }} <span style="font-size: 16px">( {{ form.enterpriseID }} )</span>
        </div>
        <div
          style="
            width: 100%;
            border-radius: 10px;
            margin-top: 10px;
            background-color: #f9f5e5;
            padding: 25px;
            box-shadow: 0 5px 15px 0 rgba(176, 191, 231, 0.25);
          "
        >
          <template v-if="status == 'CHARGING'">
            <a-form-model :model="form" :rules="rules" ref="chargForm">
              <div style="margin-top: 5px; font-size: 15px">充值金额 (元) ：</div>
              <div style="width: 100%; text-align: center">
                <span style="margin-top: 10px; font-size: 20px">
                  <a-form-model-item prop="num">
                    <a-input-number id="inputNumber" v-model="form.num" :min="0" :precision="2" ref="ainput" />
                  </a-form-model-item>
                </span>
              </div>
              <div
                style="
                  margin-top: -25px;
                  font-size: 10px;
                  color: grey;
                  font-weight: 200;
                  width: 100%;
                  text-align: center;
                "
              >
                <span style="font-weight: bold">1元=1碳币</span> 点击数据可自定义金额
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap">
                <div
                  v-for="(item, index) in chargelist"
                  :key="index"
                  style="
                    padding: 10px 25px;

                    border-radius: 8px;
                    box-shadow: 0 10px 30px 0 rgba(176, 191, 231, 0.15);
                    margin-left: 10px;
                    margin-top: 10px;
                    width: 100px;
                    text-align: center;
                    cursor: pointer;
                  "
                  class="chargeCard"
                  @click="form.num = item"
                >
                  <span style="font-weight: 600; font-size: 18px">{{ item }}</span> 元
                </div>
              </div>
              <div style="margin-top: 18px">银行卡号：</div>
              <a-form-model-item prop="bankCardID">
                <a-input placeholder="请填入银行卡号" v-model="form.bankCardID" />
              </a-form-model-item>
              <div style="margin-top: 20px">
                <a-button type="primary" block @click="submit" :loading="isCharging">充值</a-button>
              </div>
            </a-form-model>
          </template>

          <template v-else-if="status == 'BANKING'">
            <a-result title="扣款确认中">
              <template #icon><a-icon type="loading" /> </template
            ></a-result>
          </template>

          <template v-else-if="status == 'SUCCESS'">
            <a-result title="充值成功" :sub-title="`已充值${form.num.toFixed(2)}个碳币，5分钟内到账`" status="success">
              <template #icon><a-icon type="check-circle" theme="filled" /> </template>
            </a-result>
          </template>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import store from '@/store'
import { coCoinRecharge } from '@/api/trade'
import { status } from 'nprogress'

export default {
  data() {
    return {
      visible: false,
      form: {
        enterpriseName: '',
        enterpriseID: '',
        num: 0.0,
        bankCardID: '',
      },
      isCharging: false,
      status: 'CHARGING',

      rules: {
        num: [{ required: true, message: '请输入充值金额', trigger: 'change' }],
        bankCardID: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }],
      },

      chargelist: [10, 15, 20, 30, 50, 100],
    }
  },
  methods: {
    open() {
      this.status = 'CHARGING'
      this.form = {
        enterpriseName: '',
        enterpriseID: '',
        num: 0.0,
        bankCardID: '',
      }
      this.visible = true
      this.$nextTick(() => {
        this.$refs.ainput.focus()
      })
      this.initData()
    },
    initData() {
      this.form.enterpriseID = this.$store.state.user.info.enterpriseID
      this.form.enterpriseName = this.$store.state.user.info.enterpriseName
    },
    close() {
      this.visible = false
    },
    submit() {
      this.isCharging = true
      this.$refs['chargForm'].validate((valid) => {
        if (valid) {
          if (this.form.num == 0) {
            this.$message.warning('充值金额不能为0')
            this.isCharging = false
          } else {
            let params = {
              enterpriseID: this.form.enterpriseID,
              num: this.form.num,
            }
            this.status = 'BANKING'
            setTimeout(() => {
              coCoinRecharge(params).then((res) => {
                this.isCharging = false
                this.status = 'SUCCESS'
                setTimeout(() => {
                  store.dispatch('GetInfo')
                }, 200)
              })
            }, 1000)
          }
        } else {
          this.isCharging = false
          this.$message.warning('请填写正确充值信息')
          return false
        }
      })
    },
  },
}
</script>

<style scoped>
/deep/ .ant-modal-content {
  background: url('https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*wrw1QK6oaaQAAAAAAAAAAAAADvuFAQ/original')
    #f9f1d4;
  /* #fcf7e7 */
  background-repeat: no-repeat;
  /* background-size: cover; */
  background-size: 100% 100%;
  background-position: 100% 100%;
}
/deep/ .ant-modal-header {
  /* background: url('https://openres.xfyun.cn/xfyundoc/2024-01-30/771f3dc3-4880-4cbf-979e-24d709e585b6/1706555813768/%E4%BD%8D%E5%9B%BE%20(3).png'); */
  /* 将图片左移动 */
  background-color: #f9f1d4;
  background-position: 10% 10%;
}
/deep/ .ant-input:focus {
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid #1c7ed6 !important;
  box-shadow: none !important;
}
/deep/ .has-error .ant-input {
  border: none !important;
  border-bottom: 1px solid #f5222d !important;
}

/deep/ .ant-input {
  background: transparent !important;
  border: none;
  border-bottom: 1px solid #1c7ed6 !important;
  border-radius: 0px;
}
/deep/ .ant-input-number {
  border: none !important;
  background: transparent !important;
  color: #1c7ed6 !important;
  font-size: 30px !important;
  font-family: 'Fira code';
  text-align: center;
  width: auto;
  font-weight: 900;
  box-shadow: none !important;
}
/deep/ .ant-input-number-focused {
  border: none !important;
  background: transparent !important;
  color: #1c7ed6 !important;
  font-size: 30px !important;
  font-family: 'Fira code';
  text-align: center;
  width: auto;
  font-weight: 900;
  box-shadow: none !important;
}
/deep/ .ant-input-number-input {
  text-align: center;
}
/deep/ .ant-input-number-handler-wrap {
  display: none;
}

.chargeCard {
  background-color: white;
  transition: all 0.25s ease-in-out;
}

.chargeCard:hover {
  background-color: #292d3e;
  color: white;
}
</style>