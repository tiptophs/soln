<template>
  <div class="header">
    <el-menu
      :default-active="activeIndex"
      class="el-head-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <!--logo-->
      <span class="logo">
        <a href="javascript:;">
          <img src="../source/logo.png" />
        </a>
      </span>
      <el-menu-item index="1" v-if="!isLogin">登录</el-menu-item>
      <el-submenu index="3" v-else>
        <template slot="title">{{ uName }}</template>
        <el-menu-item index="3-1">注销</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">桌面管理</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3"><a href="javascript:;">收藏</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      activeIndex: "3", // 当前选中选项
    };
  },
  computed: {
    // 用户是否登录
    isLogin() {
      return !!this.$store.getters.token;
    },
    uName() {
      return this.$store.getters.name;
    },
  },
  methods: {
    /**
     * 根据选中的信息，跳转到相应的界面
     */
    handleSelect(key) {
      switch (key) {
        case "1":
          this.$router.push({ name: "login" });
          break;
        case "3":
          this.$router.push({ name: "soln", query: { type: 0 } });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.el-menu li {
  float: right;
}
.el-head-menu {
  padding: 0px 10px;
}

.logo {
  float: left;
  height: 61px;
}
.logo img {
  height: 61px;
}
</style>
