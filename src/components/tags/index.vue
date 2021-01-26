<template>
    <div class="tags-group">
      <!--标签添加组件-->
      <div class="tag-add" v-if="showAdd">
        <el-input v-model="tagInfo.title" size="small" placeholder="请输入标签名称"></el-input>
        <el-color-picker v-model="tagInfo.color" size="small" class="color-picker"></el-color-picker>
        <el-button size="small" class="tag-button" @click="addTag">确认</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </div>
      <!--标签加载区域-->
      <div class="tag-list">
        <template v-for="item in tagList">
          <el-tag :key="item.sid" :color="item.color" effect="plain">{{ item.title }}</el-tag>
        </template>
      </div>
      
    </div>
</template>

<script> 
import { postData, getData } from "@/utils/request.js";
export default {
    name: 'tags',
    props: {
      toolType: {
        type: String | Number,
        default: null,
      },
      showAdd: {
        type: Boolean,
        default: false,
      }
    },
    data(){
        return {
          tagInfo: {
            title: '',
            color: '#14B0D7',
            type: null,
          },
          tagList: []
        }
    },
    watch:{
      toolType:{
        handler(n, o){
          if(n != null) {
            this.tagInfo.type = n;
            // 获取当前类型下的所有标签
            this.getToolTags();
            // 取消掉添加标签
            this.cancel();
          }
        }
      }
    },
    methods:{
      addTag() {
        // 获取当前用户和当前分类
        if (this.tagInfo.title === "") return;
        postData('addTag', this.tagInfo).then(res => {
          if (res.status) {
            // 重新刷新标签数据
            this.getToolTags()
           // 关闭添加标签区域
          this.cancel();
        } else {
          this.$message({
            message: res.prompt,
            type: "error",
            center: true,
          });
        }
        });
      },
      cancel() {
        this.$emit('destoryAddTag')
      },
      /**
       * 获取类型下所有标签
       */
      getToolTags() {
        getData("getToolTags", {type: this.toolType}).then(res=>{
          this.tagList = res.value;
          this.$emit('toolTags', this.tagList);
        })
      }
    },
}
</script>

<style scoped>
  .tag-add {
    margin-bottom: 15px;
    position: relative;
  }
  .tag-add .el-input {
    width: 180px;
  }
  .color-picker {
    position: absolute;
  }

  .tag-button {
    margin-left:40px;
  }

  .tag-list .el-tag {
    margin-bottom: 6px;
    margin-left: 6px;
    color:white;
    cursor: pointer;
  }
</style>
