import request from "@/utils/request";

// 登录
export function login(data) {
  return request({
    url: "/index/login/login",
    method: "post",
    data,
  });
}

// 获取用户数据
export function getInfo(token) {
  return request({
    url: "index/login/info",
    method: "get",
    params: { token },
  });
}

// 登出
export function logout(token) {
  return request({
    url: "index/login/loginOut",
    method: "post",
    params: {
      token,
    },
  });
}
