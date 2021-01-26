<!--
 * @Descripttion: 
 * @version: 
 * @Author: tiptop
 * @Date: 2020-07-19 16:04:23
 * @LastEditors: tiptop
 * @LastEditTime: 2020-09-14 00:32:27
-->
<template>
  <div class="home-content clearfix">
    <!--soln-title-->
    <div class="soln-title">
      <div class="tag-item clearfix">
        <div class="title" v-if="toolTitle">
          {{ toolTitle }}
        </div>
        <div class="operation">
          <i class="el-icon-edit cus-button"></i>
          <i class="el-icon-delete cus-button"></i>
          <i class="el-icon-lollipop cus-button" @click="showAddTag = true"></i>
        </div>
      </div>

      <!--文章书签-->
      <el-divider class="cus-divider" content-position="right"
        ><span class="tag-description"
          >文章过多，查找过慢？点击标签缩小下范围试试。</span
        >
      </el-divider>
      <div class="soln-tag">
        <tag 
          :toolType="currentType" 
          :showAdd="showAddTag" 
          @destoryAddTag="showAddTag = false"
          @toolTags="toolTags"
        >
        </tag>
      </div>
    </div>

    <!--soln-content-->
    <div class="soln-container">
      <!--侧边栏-->
      <div class="soln-container-left" @createaa="create()">
        <el-button class="item-btn" icon="el-icon-search" circle></el-button>
        <el-button
          class="item-btn"
          type="success"
          icon="el-icon-plus"
          circle
          @click="showAddItem = true"
        ></el-button>
        <el-button
          class="item-btn"
          type="primary"
          icon="el-icon-edit"
          circle
        ></el-button>
        <el-button
          class="item-btn"
          type="info"
          icon="el-icon-message"
          circle
        ></el-button>
        <el-button
          class="item-btn"
          type="warning"
          icon="el-icon-star-off"
          circle
        ></el-button>
        <el-button
          class="item-btn"
          type="danger"
          icon="el-icon-delete"
          circle
        ></el-button>
      </div>
      <!--主内容展示区域-->
      <div class="soln-container-right clearfix">
        <template v-for="item in cardList">
          <card :linkInfo="item" 
            :key="item.sid" 
            :toolTags="tagList" 
            :isActive="selectCard.sid === item.sid"
            @nowCard="getSelectCard"  
          />
        </template>
      </div>

      <!--创建链接组件-->
      <addlinkitem 
        :showItem="showAddItem"
        :toolTags="tagList"
        :toolType="toolInfo.type"
        :type="currentType"
        @cancel="showAddItem = false"
      >
      </addlinkitem>
    </div>
  </div>
</template>

<script>
import card from "@/components/cards/index.vue";
import tag from "@/components/tags/index.vue";
import { getData } from "@/utils/request.js";
import { bus } from "@/utils/util.js";
import addlinkitem from "@/components/link/linkitem/index.vue"
export default {
  components: {
    card,
    tag,
    addlinkitem,
  },
  data() {
    return {
      cardList: [],
      toolTitle: "",
      toolInfo: {
        type: []
      },
      currentType: "",
      showAddTag: false,
      showAddItem: false,
      tagList:[],
      selectCard: {
        sid: '',
      },
    };
  },
  watch: {
    $route: {
      handler(n) {
        this.currentType = n.query.type;
        this.getCardList(n.query.type);
      },
    },
  },
  methods: {
    /**
     * 创建
     */
    create() {
      console.log("what");
    },
    /** 获取当前tool下的card数据 */
    getCardList(type) {
      getData("getToolItem", { type }).then((res) => {
        this.cardList = res.value.tools;
        this.toolTitle = res.value.info.title;
        this.toolInfo = res.value.info;
      });
    },
    /** 验证type是否存在 */
    checkType(tools) {
      let { type } = this.$route.query;
      const tool = tools.filter((element) => element.sid === Number(type));
      if (tool.length === 0) {
        type = tools["0"].sid;
        this.$router.replace({ name: "soln", query: { type } });
      }
      return type;
    },
    // 获取类型下所有标签
    toolTags(tagList) {
      this.tagList = tagList;
    },
    getSelectCard(card){
      this.selectCard = card;
    }
  },
  mounted() {
    bus.$on("toolList", (tools) => {
      const type = this.checkType(tools);
      this.currentType = type;
      this.getCardList(type);
    });
  },
};
</script>

<style scoped="scoped">
/**标题部分 */
.soln-title {
  text-align: left;
  color: #000;
}
.tag-item .title {
  float: left;
  color: #606266;
  font-size: 22px;
}
.tag-item .operation {
  float: left;
  margin-left: 12px;
  line-height: 29px;
}
.cus-button {
  padding: 6px 3px;
  margin-left: 3px;
  color: darkcyan;
  cursor: pointer;
  font-size: 17px;
}
.cus-divider {
  margin: 6px 0px 18px 0px;
}
.cus-divider >>> .is-right {
  padding: 0px;
}
.tag-description {
  color: #606266;
  background-color: #f2f3fa;
}

.soln-container-left {
  float: left;
  width: 40px;
}
.soln-container-left .item-btn {
  display: block;
  margin-bottom: 12px;
  margin-left: 0px !important;
}

.soln-container-right {
  float: right;
  padding: 0px 0px 0px 15px;
  width: calc(100% - 40px);
  box-sizing: border-box;
}

/**标签部分样式 */
.soln-tag {
  padding-bottom: 12px;
}
</style>
