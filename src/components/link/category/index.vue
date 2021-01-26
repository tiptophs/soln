<template>
  <div class="link-create">
    <el-drawer
      title="创建分类"
      :with-header="false"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :modal="true"
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
              <template v-for="(value, key) in link_tool_type">
                <el-checkbox :label="value" name="type" checked :key="key"></el-checkbox>
              </template>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="内容模式">
            <el-checkbox-group v-model="form.mode">
              <template v-for="(value, key) in link_tool_mode">
                <el-checkbox :label="value" name="mode" checked :key="key" ></el-checkbox>
              </template>
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
import { _LINK_TOOL_TYPE, _LINK_TOOL_MODE, getKeysFromLink } from "@/api/data.js"

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
      link_tool_type: _LINK_TOOL_TYPE,
      link_tool_mode: _LINK_TOOL_MODE,
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
      // 生成新的数据并提交
      const data = Object.assign({}, this.form);
      data.type = getKeysFromLink(this.form.type, 'type');
      data.mode = getKeysFromLink(this.form.mode, 'mode');
      postData("addTool", data).then((res) => {
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
