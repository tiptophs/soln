<!--
 * @Descripttion: 收藏的展示card
 * @version: 
 * @Author: tiptop
 * @Date: 2020-07-20 21:41:17
 * @LastEditors: tiptop
 * @LastEditTime: 2020-09-13 23:34:13
-->
<template>
  <div :class="[{'active': isActive }, 'card']" @click="selectCard(linkInfo)">
    <div class="tips clearfix">
      <span :class="'bg-soln-'+ linkInfo.type"></span>
      <span>{{ linkInfo.type | linktype }}</span>
      <span>{{ linkInfo.update_time }}</span>
      <span>0 次数</span>
    </div>
    <div class="title" @click="goAddress(linkInfo)">
      {{ linkInfo.title }}
    </div>
    <div class="desc">
      {{ linkInfo.desc }}
    </div>
    <div class="tags">
      <template v-for="item in tagsName">
        <span class="tag-item" :key="item.sid" :style ="{'background-color': item.color}">{{ item.title }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { _LINK_TOOL_TYPE, _LINK_TOOL_MODE } from "@/api/data.js"

export default {
  props:{
    linkInfo: {
      type: Object,
      default: {}
    },
    toolTags: {
      type: Array,
      default: []
    },
    isActive: {
      type: Boolean,
      default: false,
    }
  },
  filters: {
    linktype: function (value) {
      if (!value) return ''
      return _LINK_TOOL_TYPE[value]
    }
  },
  watch: {
    toolTags:{
      handler(nValue, oldValue) {
        this.linkInfo.tags.forEach(tgaId => {
          nValue.forEach(ele => {
            if(ele.sid === Number(tgaId)) {
              this.tagsName.push(ele)
            }
          })
        });
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      tagsName: [],
      nowCardId: '',
    }
  },
  methods: {
    /**跳转到link界面, 考虑是否内嵌iframe */
    goAddress(link) {
      window.open(link.address);
    },
    selectCard(link) {
      this.nowCardId = link.sid
      this.$emit('nowCard', link)
    }
  }
};
</script>

<style scoped>

.card {
  box-sizing: border-box;
  float: left;
  width: 380px;
  height: 180px;
  background-color: #fff;
  border-radius: 4px;
  margin: 0px 8px 12px;
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid #ddd;
}
.card:hover {
  border: 1px solid #3a8ee6;
  background-color: #ecf5ff;
}

.active {
  border: 1px solid #3a8ee6;
  background-color: #ecf5ff;
}

.tips span {
  float: left;
  margin-right: 4px;
  vertical-align: middle;
  color: #a9b1bb;
  font-size: 14px;
  line-height: 25px;
}
.tips span::before {
  content: "";
  display: inline-block;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background-color: #a9b1bb;
  margin: 0 5px;
  font-weight: 500;
  vertical-align: middle;
}
.tips .bg-soln-media {
  background: url(./imgs/video_fill.png) no-repeat;
  width: 25px;
  height: 25px;
}
.tips .bg-soln-web {
  background: url(./imgs/web_fill.png) no-repeat;
  width: 25px;
  height: 25px;
}
.tips .bg-soln-text {
  background: url(./imgs/text.png) no-repeat;
  width: 25px;
  height: 25px;
}
.tips .bg-soln-picture {
  background: url(./imgs/picture_fill.png) no-repeat;
  width: 25px;
  height: 25px;
}
.card .title {
  text-align: left;
  margin: 7px 0px;
  font-weight: 500;
  color: #000;
  font-size: 14px;
  max-height: 38px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  cursor: pointer;
}

.card .title:hover {
  color:#3a8ee6;
}

.card .desc {
  text-align: left;
  margin: 7px 0px;
  font-weight: 500;
  color: #858f9a;
  font-size: 12px;
  max-height: 57px;
  min-height: 53px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}

.card .tags {
  text-align: left;
}
.card .tag-item {
  margin: 0 5px 5px 0;
  font-size: 12px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  color: white;
  display: inline-block;
  box-sizing: border-box;
  list-style: none;
  font-feature-settings: "tnum", "tnum";
  height: auto;
  padding: 8px 7px;
  line-height: 12px;
  white-space: nowrap;
  background: #f2f3fa;
  border: 1px solid #d9d9d9;
  opacity: 1;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
}

/**响应式布局 */
@media (max-width: 1143px) {
  .card {
    width: calc(100% - 39px);
  }
}
@media (min-width: 1144px) and (max-width: 1503px) {
  .card {
    width: calc((100% - 47px) / 2);
  }
}
@media (min-width: 1504px) and (max-width: 1919px) {
  .card {
    width: calc((100% - 63px) / 3);
  }
}
@media (min-width: 1920px) {
  .card {
    width: calc((100% - 79px) / 4);
  }
}
</style>
