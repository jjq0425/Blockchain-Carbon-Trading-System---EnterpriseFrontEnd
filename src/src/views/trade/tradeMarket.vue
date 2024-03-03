<template>
  <page-header-wrapper
    content="欢迎来到交易市场，我们为您打造了一个安全可靠的碳交易平台。在这里，区块链技术如同一条忠诚的守护者，每笔交易都经过它的严格监督，确保信息不被泄露，让您在交易中享受到铜墙铁壁般的安全保障。"
  >
    <!-- :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="
      (key) => {
        this.tabActiveKey = key
      }
    " -->
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
          <img style="height: 100%; transform: scale(2)" src="@/assets/beauty/pageRight/Trade.svg" />
        </div>
      </transition-group>

      <div style="height: 50px"></div>
    </template>

    <a-card :bordered="false" style="width: 100%">
      <a-list rowKey="id" :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }" :dataSource="dataSource" class="card-list">
        <a-list-item slot="renderItem" slot-scope="item">
          <!-- <template v-if="!item || item.id === undefined">
            <a-button class="new-btn" type="dashed">
              <a-icon type="plus" />
              新增产品
            </a-button>
          </template> -->
          <template>
            <a-card
              :hoverable="true"
              style="
                background-size: 100% 60%;

                background-repeat: no-repeat;
              "
            >
              <a-card-meta>
                <a slot="title">{{ item.title }}</a>
                <!-- <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large" /> -->
                <div class="meta-content" slot="description">{{ item.content }}</div>
              </a-card-meta>
              <template class="ant-card-actions" slot="actions">
                <a>操作二</a>
              </template>
            </a-card>
          </template>
        </a-list-item>
      </a-list>
    </a-card>
    <!-- <pdfTest ref="pdfTest"></pdfTest> -->
  </page-header-wrapper>
</template>

<script>
// import pdfTest from '@/components/PDFgenerate/pdfTest'
import changeBgCSS from '@/utils/ChangeBgCSS'
const dataSource = []
// dataSource.push({})
for (let i = 0; i < 9; i++) {
  dataSource.push({
    id: i,
    title: 'Alipay',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    content:
      '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
  })
}

export default {
  name: 'CardList',
  components: {
    // pdfTest,
  },
  data() {
    this.tabList = [
      { key: 'tab1', tab: '快速开始' },
      { key: 'tab2', tab: '产品简介' },
      { key: 'tab3', tab: '产品文档' },
    ]
    return {
      tabActiveKey: 'tab1',

      // extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
      dataSource,
    }
  },
  mounted() {
    changeBgCSS('TRADE')
  },
  methods: {
    testFun() {
      this.$message.info('快速开始被点击！')
    },
  },
}
</script>

<style lang="less" scoped>
@import '~@/components/index.less';

.card-list {
  :deep(.ant-card-body:hover) {
    .ant-card-meta-title > a {
      color: @primary-color;
    }
  }

  :deep(.ant-card-meta-title) {
    margin-bottom: 12px;

    & > a {
      display: inline-block;
      max-width: 100%;
      color: rgba(0, 0, 0, 0.85);
    }
  }

  :deep(.meta-content) {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    margin-bottom: 1em;
  }
}

.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}

.ant-card-actions {
  background: #f7f9fa;

  li {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;

    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }

    a {
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
      display: inline-block;
      width: 100%;
      &:hover {
        color: @primary-color;
      }
    }
  }
}

.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 188px;
}
</style>
