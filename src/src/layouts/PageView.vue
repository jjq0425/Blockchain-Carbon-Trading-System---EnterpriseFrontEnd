<template>
  <page-header-wrapper>
    <router-view />
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'PageView',
}
</script>

<style>
.ant-pro-page-header-wrap {
  background: url('@/assets/bg.png') no-repeat center left; /* 图片背景，不重复，位置在左侧 */
  background-size: cover; /* 背景图片覆盖整个区域 */
  background-color: #f7f9fe; /* 浅蓝色背景 */
  background-position: 100% 0; /* 背景图片的位置在右侧 */
  background-size: contain; /* 确保图片在水平方向上完整显示 */
  /* background-clip: padding-box;  */
  /* padding: 30% 0; */
}
.ant-page-header {
  background-color: #134089;
  color: white !important;
}
.ant-breadcrumb-link {
  color: white;
}
.ant-breadcrumb-link .router-link-active {
  color: white;
}
.ant-breadcrumb-separator {
  color: white;
}
.ant-page-header-heading-title {
  color: white;
}
.ant-card {
  border-radius: 8px !important;
  padding: 10px !important;
  /* box-shadow: 0px 5px 5px #f0f2f5; */
}
.ant-page-header-footer .ant-tabs-nav {
  color: #97b2cd;
}
.ant-page-header-footer .ant-tabs-tab-active {
  font-weight: bold;
  color: white !important;
  /* background: #f7f9fe; */
  /* border-radius: 999999px; */
}
.ant-page-header-footer .ant-tabs-ink-bar {
  background-color: #f7f9fe !important;
}
</style>
