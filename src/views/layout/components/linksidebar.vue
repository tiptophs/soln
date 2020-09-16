<!--
 * @Descripttion: 
 * @version: 
 * @Author: tiptop
 * @Date: 2020-07-19 23:01:32
 * @LastEditors: tiptop
 * @LastEditTime: 2020-09-13 21:45:44
-->
<template>
  <div class="sidebar">
    <el-menu
      class="el-menu-vertical"
      :collapse="isCollapse"
      :default-active="activeIndex"
    >
      <!--展开关闭
      <el-menu-item index="0" @click="showBar()">
        <i
          :class="[isCollapse ? 'el-icon-caret-right' : 'el-icon-caret-left']"
        ></i>
        <span slot="title">{{ isCollapse ? "展开" : "收起列表" }}</span>
      </el-menu-item>-->

      <!--创建-->
      <el-menu-item index="1" @click="createTags()">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">创建</span>
      </el-menu-item>

      <!--列表-->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-folder"></i>
          <span slot="title">soLn</span>
        </template>
        <template v-for="(item, index) in toolList">
          <el-menu-item
            :index="`2-${index}`"
            :key="`tool-${index}`"
            @click="getTagSolns(item, index)"
            >{{ item.title }}</el-menu-item
          >
        </template>
      </el-submenu>

      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>

    <!--其它组件部分-->
    <ctag :drawer="drawer" @hiden="hiden" />
  </div>
</template>

<script>
import ctag from "@/components/link/ctags/index.vue";
import { getData } from "@/utils/request.js";
import { bus } from "@/utils/util.js";

export default {
  name: "sidebar",
  data() {
    return {
      drawer: false, // 显示添加标签界面
      isCollapse: false, // 隐藏右侧栏
      toolList: [], // 列表数据
      activeIndex: "", // 设置默认选中
    };
  },
  components: {
    ctag,
  },
  watch: {
    $route: {
      handler(n) {
        // type为零的情况下展开这个列表,重新设置type哈
        if (Number(n.query.type) === 0) {
          this.activeIndex = "2-0";
          this.$router.push({
            name: "soln",
            query: { type: this.toolList["0"].sid },
          });
        }
      },
    },
  },
  created() {
    this.getToolList();
  },
  methods: {
    /**
     * 控制右侧栏
     */
    showBar() {
      this.isCollapse = !this.isCollapse;
    },
    /**
     * 抛出创建事件
     */
    createTags() {
      this.drawer = true;
    },
    hiden() {
      this.drawer = false;
    },
    /**
     * 获取工具列表数据
     */
    getToolList() {
      getData("getToolList", {}).then((res) => {
        if (res.status) {
          this.toolList = res.value;
          bus.$emit("toolList", this.toolList);
        }
      });
    },
    /**
     * 根据标签获取列表数据,url拼接响应type
     * @param item 点击tag的详情
     */
    getTagSolns(item) {
      this.$router.push({
        name: "soln",
        query: { type: item.sid },
      });
    },
  },
};
</script>

<style scoped>
.el-menu-vertical {
  width: 200px;
  height: 100%;
}

.sidebar {
  position: relative;
  top: 2px;
  height: calc(100% - 2px);
}
</style>
