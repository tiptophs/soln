import axios from "axios";
import { Message, MessageBox } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import qs from "qs";

// 请求map对应表
const mapApiRequest = {
  getToolList: "index/tool/getToolList", // 获取工具分类列表
  addTool: "index/tool/addTools", // 添加工具分类
  getToolItem: "index/tool/getToolItem", // 获取分类下内容
  addItemTool: "index/tool/addToolItem", // 添加分类下内容
  addTag: "index/Tooltag/addTag", // 添加分类下的标签
  getToolTags: "index/Tooltag/getTags", // 获取分类下的标签
  register: "/index/login/register", // 注册
};

// 创建一个axios实例
const service = axios.create({
  baseURL: "/api", // process.env.BASE_API, // api 的 base_url
  timeout: 5000, // 超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      // config.headers["X-Token"] = getToken();
      config.headers.Authorization = getToken();
    }
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(`请求拦截器----${error}`); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  (response) => {
    const res = response.data;
    // 自定义返回的code，不是20000请求失败.

    if (res.code !== 20000) {
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          "你已被登出，可取消继续留在该页面，或者重新登录",
          "确定登出",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            window.location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      } else {
        // 其他任何错误
        Message({
          message: res.prompt || "你的请求已经消失在二次元, 请稍后重试...",
          type: "error",
          duration: 5 * 1000,
        });
      }
      return Promise.reject(new Error(res.prompt || "Error"));
    }
    return response.data;
  },
  (error) => {
    console.log(`err${error}`); // for debug
    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000,
    // });
    return Promise.reject(error);
  }
);
export default service;

/**
 * get方式获取数据
 * @param url 请求地址
 * @param params get请求的参数
 */
export function getData(url, params) {
  return new Promise((resolve, reject) => {
    service({
      method: "get",
      url: mapApiRequest[url],
      params,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * post方式获取数据
 * @param url 请求地址
 * @param data 请求参数
 * @param options 其他参数
 */
export function postData(url, data) {
  return new Promise((resolve, reject) => {
    service({
      method: "post",
      url: mapApiRequest[url],
      data,
      transformRequest: [
        (data) => {
          return qs.stringify(data);
        },
      ],
    })
      .then((res) => {
        resolve(res);
      })
      .catch(function (err) {
        reject(err);
      });
  });
}
