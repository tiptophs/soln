<!--
 * @Descripttion: 
 * @version: 
 * @Author: tiptop
 * @Date: 2020-07-19 21:58:36
 * @LastEditors: tiptop
 * @LastEditTime: 2020-09-13 22:41:06
-->
<template>
  <div class="layout">
    <el-container class="layout-container">
      <el-header>
        <!--导航栏部分-->
        <navbar />
      </el-header>
      <el-container>
        <!--侧边栏部分-->
        <link-sidebar />
        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 通用底部兰
import navbar from "./components/navbar";
// soln右侧栏
import linkSidebar from "./components/linksidebar";

export default {
  data() {
    return {};
  },
  components: {
    navbar,
    linkSidebar,
  },
};
</script>

<style scoped="scoped">
.layout,
.layout-container {
  width: 100%;
  height: 100%;
  min-width: 800px;
}
.el-header {
  padding: 0px;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #f2f3fa;
  color: #333;
  text-align: center;
}
</style>
