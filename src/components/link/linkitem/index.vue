<template>
    <div class="add-link-item">
      <!-- Form -->
      <el-dialog title="添加链接Link" 
        :visible.sync="dialogFormVisible" 
        :show-close="false" 
        :close-on-click-modal="false"
        width="520px"
      >
        <el-form :model="form">
            <el-form-item label="链接名称" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="链接地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="可选类型" :label-width="formLabelWidth">
              <el-select v-model="form.type" placeholder="请选择...">
                  <template v-for="(item, index) in ntoolType">
                    <el-option :label="item" :value="index" :key="index"></el-option>
                  </template>
              </el-select>
            </el-form-item>
            <el-form-item label="所属标签" :label-width="formLabelWidth" :filterable=true >
              <el-select v-model="form.tags" placeholder="请选择..." :multiple="true">
                <template v-for="(item, index) in toolTags">
                  <el-option :label="item.title" :value="item.sid" :key="index"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="简要概述" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>

</template>

<script>
import { postData } from "@/utils/request.js";
import { _LINK_TOOL_TYPE, getKeysFromLink, getCompoleteConfig } from "@/api/data.js"

export default {
    props: {
      showItem: {
        type: Boolean,
        default: false,
      },
      // 本类下的所有标签
      toolTags: {
        type: Array,
        default: [],
      },
      // 本类下的相关类型选项
      toolType: {
        type: Array,
        default: []
      },
      // 当前分类
      type: {
        type: String | Number,
        default: null  
      }
    },
    watch: {
      //监听值变化，再赋值给showItem
      showItem(value){
        this.dialogFormVisible = value;
      },
      toolType: {
        handler(nValue, oldVauel) {
          this.ntoolType = getCompoleteConfig(nValue, 'type')
        },
        deep: true
      }
    },
    data() {
      return {
        dialogFormVisible: false, // dialog显示隐藏
        form: { // tool下items的相关字段
          title: '',
          type: '',
          tags: [],
          desc: '',
          address: '',
        },
        formLabelWidth: '80px',
        ntoolType: {},
      };
    },
    methods: {
      cancel() {
        this.$emit('cancel')
      },
      confirm() {
        if(this.form.title.trim() === '' 
          || this.form.type === '' 
          || this.form.tags === '' 
          || this.form.address === '') {
            this.$message({
              message: "名称，地址，标签，类型不能为空...",
              type: "warning",
              center: false,
            });
            return;
          }
        // 添加数据
        this.form.tid = this.type
        postData("addItemTool", this.form).then(res=>{
          if(res.status) {
            this.$emit('cancel')
          }
        })
      }
    },
    mounted() {
      this.dialogFormVisible = this.showItem
    }
  };
</script>

<style scoped>
  .add-link-item .el-select {
    width: 100%;
  }
</style>
