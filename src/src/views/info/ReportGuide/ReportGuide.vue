<!--
 * @Author: jjq
 * @Description: 
 * 
-->

<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <page-header-wrapper :content="$t('info.ReportGuide.header')">
    <template v-slot:extraContent>
      <transition-group
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__jackInTheBox"
        leave-active-class="animate__backOutUp"
      >
        <div
          class=""
          style="height: 100px; margin-top: -20px; margin-right: 80px; position: absolute"
          key="pageRightPNG"
        >
          <img style="height: 100%; transform: scale(1.7)" src="@/assets/beauty/pageRight/Data.png" />
        </div>
      </transition-group>

      <div style="height: 30px"></div>
    </template>

    <a-card :body-style="{ padding: '10px' }" :bordered="false" :title="$t('info.ReportGuide.shu-ju-jia-gou')">
      <div>
        <Vue2OrgTree
          :data="treeData_LAST"
          :renderContent="renderContent"
          @on-expand="onExpand"
          collapsable
          style="margin: 0 auto; width: 100%; overflow-x: scroll"
        ></Vue2OrgTree>
        <a-alert :message="$t('info.ReportGuide.shu-ju-jia-gou.info')" style="text-align: center" type="info" banner />
      </div>
    </a-card>

    <!-- <a-card :body-style="{ padding: '24px 32px' }" :bordered="false" style="margin-top: 24px">
      <div style="margin-bottom: 20px">
        <div
          style="
            display: inline-block;
            font-size: 24px;
            font-weight: bold;
            padding: 5px 10px;
            background: linear-gradient(135deg, #abdcff, #0396ff);
            border-radius: 999px;
            color: white;
          "
        >
          Q & A
        </div>
        <div style="display: inline-block; font-size: 24px; font-weight: bold; padding: 10px">常见问题</div>
      </div>

      <div class="question_Card" style="padding: 20px">
        <div style="margin-bottom: 30px" v-for="(item, index) in qANDa" :key="index">
          <div style="font-weight: bold"><span style="font-size: 16px; color: #438bfd">问题：</span>{{ item.q }}</div>
          <div style="margin-top: 5px">
            {{ item.a }}
          </div>
        </div>
      </div>
    </a-card> -->

    <a-row :gutter="24">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :body-style="{ padding: '24px 32px' }" :bordered="false" style="margin-top: 24px">
          <div style="margin-bottom: 20px">
            <div
              style="
                display: inline-block;
                font-size: 24px;
                font-weight: bold;
                padding: 5px 10px;
                background: linear-gradient(135deg, #abdcff, #0396ff);
                border-radius: 999px;
                color: white;
              "
            >
              Q & A
            </div>
            <div style="display: inline-block; font-size: 24px; font-weight: bold; padding: 10px">
              {{ $t('info.ReportGuide.question.title') }}
            </div>
          </div>

          <div class="question_Card" style="padding: 20px">
            <div style="margin-bottom: 30px" v-for="(item, index) in qANDa" :key="index">
              <div style="font-weight: bold">
                <span style="font-size: 16px; color: #438bfd">{{ $t('info.ReportGuide.question') }}：</span>{{ item.q }}
              </div>
              <div style="margin-top: 5px">
                {{ item.a }}
              </div>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :body-style="{ padding: '24px 32px' }" :bordered="false" style="margin-top: 24px">
          <div style="margin-bottom: 20px">
            <div
              style="
                display: inline-block;
                font-size: 24px;
                font-weight: bold;
                padding: 5px 10px;
                background: linear-gradient(135deg, #42e695, #3bb2b8);
                border-radius: 999px;
                color: white;
              "
            >
              Flow
            </div>
            <div style="display: inline-block; font-size: 24px; font-weight: bold; padding: 10px">
              {{ $t('info.ReportGuide.workflow.title') }}
            </div>
          </div>

          <div class="question_Card" style="">
            <img src="@/assets/pages/info/reportGuide/ReportWokflow.png" alt="" style="height: 550px" />
          </div>
        </a-card>
        <div
          style="
            display: inline-block;
            font-size: 24px;
            font-weight: bold;
            padding: 5px 10px;
            margin-top: 20px;
            width: 100%;
            height: 140px;
            background: linear-gradient(45deg, #20c997, #339af0);
            border-radius: 9px;
            color: white;
            text-align: center;
            display: flex;
          "
        >
          <div style="margin: auto; font-size: 36px" class="bottom-solgan">
            链接绿色未来 <br />
            碳盟领航之道
          </div>
        </div>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import ChangeBgCSS from '../../../utils/ChangeBgCSS'
import { STable } from '@/components'
import Vue2OrgTree from 'vue2-org-tree'
import { template_THS } from '@/views/info/infoSubmission/infoSubmissionStep/emissionSubmitCompnent/template.js'
import { enterpriseClassName_CN } from '@/config/class/enterpriseClass.js'
import store from '@/store'

export default {
  name: 'PreviousReports',
  components: {
    STable,
    Vue2OrgTree,
  },
  data() {
    return {
      dataTemplate: {},
      treeData_LAST: undefined,
      treeData: {},
      template_THS,
      enterpriseClassName_CN,

      qANDa: [
        {
          q: this.$t('info.ReportGuide.question.1.q'),
          a: this.$t('info.ReportGuide.question.1.a'),
        },
        {
          q: this.$t('info.ReportGuide.question.2.q'),
          a: this.$t('info.ReportGuide.question.2.a'),
        },
        {
          q: this.$t('info.ReportGuide.question.3.q'),
          a: this.$t('info.ReportGuide.question.3.a'),
        },
        {
          q: this.$t('info.ReportGuide.question.4.q'),
          a: this.$t('info.ReportGuide.question.4.a'),
        },
        {
          q: this.$t('info.ReportGuide.question.5.q'),
          a: this.$t('info.ReportGuide.question.5.a'),
        },
        {
          q: this.$t('info.ReportGuide.question.6.q'),
          a: this.$t('info.ReportGuide.question.6.a'),
        },
      ],
    }
  },
  computed: {
    enterpriseClass() {
      return this.$store.state.user.info.enterpriseClass
    },
  },
  methods: {
    // handler
    handleSubmit(e) {},
    async chooseTemplate() {
      // this.$forceUpdate()

      let template = JSON.stringify(this.template_THS[`template_${this.enterpriseClass}`])

      // this.dataSource = JSON.parse(template)
      this.dataTemplate = JSON.parse(template)

      // console.log('88template', template)
    },
    async initTree() {
      await this.chooseTemplate()
      // 加入第一层级

      this.treeData.children = []
      this.treeData.floor = 0
      this.treeData.id = 1
      this.treeData.expand = true
      this.treeData.label = this.enterpriseClassName_CN[this.enterpriseClass]

      // 加入第二层级

      for (let a = 0; a < this.dataTemplate.detail.length; a++) {
        // 把className加入到treeData,作为子节点
        this.treeData.children.push({
          label: this.dataTemplate.detail[a].className,
          floor: 1,
          expand: false,
          children: [],
        })
        // 对每个一级子类，形成二级子类
        for (let b = 0; b < this.dataTemplate.detail[a].children.length; b++) {
          this.treeData.children[a].children.push({
            label: this.dataTemplate.detail[a].children[b].className,
            floor: 2,
            expand: false,
            children: [],
          })
          // 进入三级子类
          for (let c = 0; c < this.dataTemplate.detail[a].children[b].activityFactor.length; c++) {
            if (!this.dataTemplate.detail[a].children[b].activityFactor[c].isConst)
              this.treeData.children[a].children[b].children.push({
                label: this.dataTemplate.detail[a].children[b].activityFactor[c].dataName,
                floor: 3,
                expand: false,
              })
          }

          for (let c = 0; c < this.dataTemplate.detail[a].children[b].EmissionFactor.length; c++) {
            if (!this.dataTemplate.detail[a].children[b].EmissionFactor[c].isConst)
              this.treeData.children[a].children[b].children.push({
                label: this.dataTemplate.detail[a].children[b].EmissionFactor[c].dataName,
                floor: 3,
              })
          }
        }
      }
      // console.log('treeData', this.treeData)
      this.treeData_LAST = JSON.parse(JSON.stringify(this.treeData))
      this.$forceUpdate()
    },
    onExpand(e, data) {
      if ('expand' in data) {
        data.expand = !data.expand
        if (!data.expand && data.children) {
          this.collapse(data.children)
        }
      } else {
        this.$set(data, 'expand', true)
      }
    },
    collapse(nodes) {
      nodes.forEach((node) => {
        if (node.expand) {
          node.expand = false
        }

        node.children && this.collapse(node.children)
      })
    },

    renderContent(h, data) {
      let classType = function (floor) {
        return `tree-floor-${floor}`
      }
      if (data.floor === 0) {
        return (
          <div class={classType(data.floor)}>
            <a-icon type="compass" theme="twoTone" style="margin-right:10px" />
            <span>{data.label}</span>
          </div>
        )
      } else {
        return (
          <div class={classType(data.floor)}>
            <span>{data.label}</span>
          </div>
        )
      }
    },
  },
  mounted() {
    ChangeBgCSS('INFO')
    this.initTree()
  },
}
</script>

<style>
.org-tree-container {
  display: inline-block;

  padding: 15px;
  background-color: #fff;
}
.org-tree {
  display: table;
  text-align: center;
  margin: 0 auto;
}
.org-tree:after,
.org-tree:before {
  content: '';
  display: table;
}
.org-tree:after {
  clear: both;
}
.org-tree-node,
.org-tree-node-children {
  position: relative;
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.org-tree-node-children:after,
.org-tree-node-children:before,
.org-tree-node:after,
.org-tree-node:before {
  transition: all 0.35s;
}
.org-tree-node-label {
  position: relative;
  display: inline-block;
}
.org-tree-node-label .org-tree-node-label-inner {
  padding: 10px 15px;
  text-align: center;
  border-radius: 3px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}
.org-tree-node-btn {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  z-index: 10;
  margin-left: -11px;
  margin-top: 9px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.35s ease;
}
.org-tree-node-btn:hover {
  background-color: #e7e8e9;
  -webkit-transform: scale(1.15);
  transform: scale(1.15);
}
.org-tree-node-btn:after,
.org-tree-node-btn:before {
  content: '';
  position: absolute;
}
.org-tree-node-btn:before {
  top: 50%;
  left: 4px;
  right: 4px;
  height: 0;
  border-top: 1px solid #ccc;
}
.org-tree-node-btn:after {
  top: 4px;
  left: 50%;
  bottom: 4px;
  width: 0;
  border-left: 1px solid #ccc;
}
.org-tree-node-btn.expanded:after {
  border: none;
}
.org-tree-node {
  padding-top: 20px;
  display: table-cell;
  vertical-align: top;
}
.org-tree-node.collapsed,
.org-tree-node.is-leaf {
  padding-left: 10px;
  padding-right: 10px;
}
.org-tree-node:after,
.org-tree-node:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 19px;
}
.org-tree-node:after {
  left: 50%;
  border-left: 1px solid #ddd;
}
.org-tree-node:not(:first-child):before,
.org-tree-node:not(:last-child):after {
  border-top: 1px solid #ddd;
}
.collapsable .org-tree-node.collapsed {
  padding-bottom: 30px;
}
.collapsable .org-tree-node.collapsed .org-tree-node-label:after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  width: 50%;
  height: 20px;
  border-right: 1px solid #ddd;
}
.org-tree > .org-tree-node {
  padding-top: 0;
}
.org-tree > .org-tree-node:after {
  border-left: 0;
}
.org-tree-node-children {
  padding-top: 20px;
  display: table;
}
.org-tree-node-children:before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 20px;
  border-left: 1px solid #ddd;
}
.org-tree-node-children:after {
  content: '';
  display: table;
  clear: both;
}
.horizontal .org-tree-node {
  display: table-cell;
  float: none;
  padding-top: 0;
  padding-left: 20px;
}
.horizontal .org-tree-node.collapsed,
.horizontal .org-tree-node.is-leaf {
  padding-top: 10px;
  padding-bottom: 10px;
}
.horizontal .org-tree-node:after,
.horizontal .org-tree-node:before {
  width: 19px;
  height: 50%;
}
.horizontal .org-tree-node:after {
  top: 50%;
  left: 0;
  border-left: 0;
}
.horizontal .org-tree-node:only-child:before {
  top: 1px;
  border-bottom: 1px solid #ddd;
}
.horizontal .org-tree-node:not(:first-child):before,
.horizontal .org-tree-node:not(:last-child):after {
  border-top: 0;
  border-left: 1px solid #ddd;
}
.horizontal .org-tree-node:not(:only-child):after {
  border-top: 1px solid #ddd;
}
.horizontal .org-tree-node .org-tree-node-inner {
  display: table;
}
.horizontal .org-tree-node-label {
  display: table-cell;
  vertical-align: middle;
}
.horizontal.collapsable .org-tree-node.collapsed {
  padding-right: 30px;
}
.horizontal.collapsable .org-tree-node.collapsed .org-tree-node-label:after {
  top: 0;
  left: 100%;
  width: 20px;
  height: 50%;
  border-right: 0;
  border-bottom: 1px solid #ddd;
}
.horizontal .org-tree-node-btn {
  top: 50%;
  left: 100%;
  margin-top: -11px;
  margin-left: 9px;
}
.horizontal > .org-tree-node:only-child:before {
  border-bottom: 0;
}
.horizontal .org-tree-node-children {
  display: table-cell;
  padding-top: 0;
  padding-left: 20px;
}
.horizontal .org-tree-node-children:before {
  top: 50%;
  left: 0;
  width: 20px;
  height: 0;
  border-left: 0;
  border-top: 1px solid #ddd;
}
.horizontal .org-tree-node-children:after {
  display: none;
}
.horizontal .org-tree-node-children > .org-tree-node {
  display: block;
}

/* 数据层级 */
.tree-floor-0 {
  font-size: 30px;
  font-weight: 900;
  background-image: -webkit-linear-gradient(bottom, #339af0, #20c997);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.tree-floor-1 {
  font-weight: bold;
}

.bottom-solgan {
  font-size: 30px;
  font-weight: 900;
  background-image: -webkit-linear-gradient(bottom, #e6fcf5, #f3f0ff, #edf2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>