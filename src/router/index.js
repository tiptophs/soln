/*
 * @Descripttion:
 * @version:
 * @Author: tiptop
 * @Date: 2020-07-19 15:29:14
 * @LastEditors: tiptop
 * @LastEditTime: 2020-09-12 23:34:22
 */

import Vue from "vue";
import Router from "vue-router";
import Layout from "@/views/layout";
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(Router);

// 常用固定不变的路由
const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/components/login/login.vue"),
    name: "login",
  },
  {
    path: "/register",
    component: () => import("@/components/login/register.vue"),
    name: "register",
  },
  {
    path: "",
    component: Layout,
    redirect: "/soln",
    children: [
      {
        path: "/soln",
        component: () => import("@/views/soln"),
        name: "soln",
      },
    ],
  },
];

const createRouter = () =>
  new Router({
    mode: "history", // 采用history传参的方式
    // scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
    linkActiveClass: "active", // 选中的class
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter () {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    const token = localStorage.getItem("Authorization");

    if (token === "null" || token === "") {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
