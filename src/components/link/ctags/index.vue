<!--
 * @Descripttion: 
 * @version: 
 * @Author: tiptop
 * @Date: 2020-07-26 11:17:44
 * @LastEditors: tiptop
 * @LastEditTime: 2020-09-13 23:42:18
-->
<template>
  <div class="link-create">
    <el-drawer
      title="创建分类"
      :with-header="false"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :modal="true"
      na
      :close-on-press-escape="true"
      :wrapper-closable="false"
      size="38%"
    >
      <div class="drawer-wrapper">
        <h2 class="drawer-title"><span class="hr-line">创 建 分 类</span></h2>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="类型名称">
            <el-input
              v-model="form.title"
              placeholder="请输入分类名称，example: 日常办公"
            ></el-input>
          </el-form-item>

          <el-form-item label="链接私密">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>

          <el-form-item label="内容性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="媒体资源" name="type" checked></el-checkbox>
              <el-checkbox label="文本资源" name="type" checked></el-checkbox>
              <el-checkbox label="图片资源" name="type" checked></el-checkbox>
              <el-checkbox label="网站资源" name="type" checked></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="内容模式">
            <el-checkbox-group v-model="form.mode">
              <el-checkbox label="单一模式" name="mode" checked></el-checkbox>
              <el-checkbox label="组合模式" name="mode"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="简要描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { postData } from "@/utils/request";

export default {
  props: {
    drawer: {
      // 是否显示侧边栏
      type: Boolean,
      data: false,
    },
  },
  data() {
    return {
      direction: "ltr",
      form: {
        title: "",
        delivery: false,
        type: [],
        mode: [],
        desc: "",
      },
    };
  },
  methods: {
    handleClose() {
      this.$emit("hiden");
    },
    /**
     * 提交数据
     */
    onSubmit() {
      if (this.form.title === "") return;
      postData("index/tool/addTools", this.form).then((res) => {
        if (res.status) {
          this.$message({
            message: "创建成功...",
            type: "success",
            center: true,
          });
          // 关闭弹窗
          this.handleClose();
        } else {
          this.$message({
            message: res.prompt,
            type: "error",
            center: true,
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.drawer-wrapper {
  padding: 10px 35px;
}
.drawer-title {
  text-align: left;
  padding: 0px 24px 12px 12px;
  margin-bottom: 25px;
}
.hr-line {
  padding-bottom: 12px;
  border-bottom: 2px solid #3a8ee6;
}
</style>
