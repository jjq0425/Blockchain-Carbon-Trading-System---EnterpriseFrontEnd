<!--
 * @Author: jjq
 * @Description: 
 * 
-->
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
:root {
  --base-bg-backgroud: url('@/assets/beauty/bg/bg1.png');
}
.ant-pro-page-header-wrap {
  /* background: url('@/assets/bg.png') no-repeat center left;  */
  background: #134089 var(--base-bg-backgroud) no-repeat center left;
  /* background: url('@/assets/beauty/bg/bg1.png') no-repeat center left;  */
  background-size: cover; /* 背景图片覆盖整个区域 */
  background-color: #f7f9fe;
  background-position: 100% 0; /* 背景图片的位置在右侧 */
  background-size: contain; /* 确保图片在水平方向上完整显示 */
  /* background-clip: padding-box;  */
  /* padding: 30% 0; */
}
.ant-page-header {
  /* background-color: #134089; */
  background: #134089 var(--base-bg-backgroud) no-repeat center left !important;

  background-size: cover !important; /* 背景图片覆盖整个区域 */

  background-position: 100% 0 !important; /* 背景图片的位置在右侧 */

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
