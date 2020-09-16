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
          <el-button class="cus-button" icon="el-icon-edit"></el-button>
          <el-button class="cus-button" icon="el-icon-delete"></el-button>
        </div>
      </div>

      <!--文章书签-->
      <el-divider class="cus-divider" content-position="right"
        ><span class="tag-description"
          >文章过多，查找过慢？点击标签缩小下范围试试。</span
        >
      </el-divider>
      <div class="soln-tag">
        <el-tag>爱豆</el-tag>
        <el-tag type="success">webpack</el-tag>
        <el-tag type="info">黑历史</el-tag>
        <el-tag type="warning">丫丫</el-tag>
        <el-tag type="danger">空气炮</el-tag>
        <el-tag type="success">webpack</el-tag>
        <el-tag type="info">黑历史</el-tag>
        <el-tag type="warning">丫丫</el-tag>
        <el-tag type="danger">空气炮</el-tag>
        <el-tag type="success">webpack</el-tag>
        <el-tag type="info">黑历史</el-tag>
        <el-tag type="warning">丫丫</el-tag>
        <el-tag type="danger">空气炮</el-tag>
      </div>
    </div>

    <!--soln-content-->
    <div class="soln-container">
      <!--侧边栏-->
      <div class="soln-container-left" @createaa="create()">
        <el-button class="item-btn" icon="el-icon-search" circle></el-button>
        <el-button
          class="item-btn"
          type="primary"
          icon="el-icon-edit"
          circle
        ></el-button>
        <el-button
          class="item-btn"
          type="success"
          icon="el-icon-check"
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
        <card />
        <card />
        <card />
        <card />
      </div>
    </div>
  </div>
</template>

<script>
import card from "@/components/cards/index.vue";
import { getData } from "@/utils/request.js";
import { bus } from "@/utils/util.js";

export default {
  components: {
    card,
  },
  data() {
    return {
      cardList: [],
      toolTitle: "",
    };
  },
  watch: {
    $route: {
      handler(n) {
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
  },
  mounted() {
    bus.$on("toolList", (tools) => {
      const type = this.checkType(tools);
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
  padding: 6px 12px;
  margin-left: 5px;
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
  padding-bottom: 32px;
}
</style>
