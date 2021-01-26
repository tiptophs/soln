import Vue from "vue";
import ElementUI from "element-ui";
import qs from "qs";
import store from "./store";
import App from "./App";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
import "../static/css/base.css";

// 设置环境
Vue.config.productionTip = false;
// 全局注册，使用方法为:this.qs
Vue.prototype.qs = qs;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store, // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  components: { App },
  template: "<App/>",
});
