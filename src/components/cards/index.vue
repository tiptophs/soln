<!--
 * @Descripttion: 收藏的展示card
 * @version: 
 * @Author: tiptop
 * @Date: 2020-07-20 21:41:17
 * @LastEditors: tiptop
 * @LastEditTime: 2020-09-13 23:34:13
-->
<template>
  <div class="card">
    <div class="tips clearfix">
      <span class="bg-soln-media"></span>
      <span>在线工具</span>
      <span>2020/01/21 11:12:33</span>
      <span>0 次数</span>
    </div>
    <div class="title">
      <p>
        欢迎使用Cubox收藏夹，值得喜欢的一款软件...
      </p>
    </div>
    <div class="desc">
      <p>
        欢迎使用Cubox收藏夹，值得喜欢的一款软件...欢迎使用Cubox收藏夹，值得喜欢的一款软件...欢迎使用Cubox收藏夹，值得喜欢的一款软件欢迎使用Cubox收藏夹，值得喜欢的一款软件...欢迎使用Cubox收藏夹，值得喜欢的一款软件...欢迎使用Cubox收藏夹，值得喜欢的一款软件...欢迎使用Cubox收藏夹，值得喜欢的一款软件...欢迎使用Cubox收藏夹，值得喜欢的一款软件...欢迎使用Cubox收藏夹，值得喜欢的一款软件...
      </p>
    </div>
    <div class="tags">
      <span class="tag-item">电影</span>
      <span class="tag-item">文本</span>
      <span class="tag-item">超链接</span>
      <span class="tag-item">图片</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  float: left;
  width: 380px;
  height: 193px;
  background-color: #fff;
  border-radius: 4px;
  margin: 0px 8px 12px;
  padding: 15px;
  box-sizing: border-box;
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
.card .title {
  text-align: left;
  margin: 7px 0px;
  font-weight: 500;
  color: #000;
  font-size: 14px;
  max-height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card .desc {
  text-align: left;
  margin: 7px 0px;
  font-weight: 500;
  color: #858f9a;
  font-size: 12px;
  max-height: 57px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
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
  color: #858f9a;
  display: inline-block;
  box-sizing: border-box;
  list-style: none;
  font-feature-settings: "tnum", "tnum";
  height: auto;
  padding: 0 7px;
  line-height: 20px;
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
