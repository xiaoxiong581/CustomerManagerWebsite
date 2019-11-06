import axios from "axios";
import session from '@/backend/session'
import router from '../router'

if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "https://localhost:29080/customermanager/v1";
} else {
  axios.defaults.baseURL = "/customermanager/v1";
}
axios.defaults.timeout = 10000;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (session.isLogin()) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.common['auth_customerId'] = session.getCustomerId();
      config.headers.common['auth_token'] = session.getToken();
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          session.logout();
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath }
          })
      }
    }
    if (error.response) {
      return Promise.reject(error.response.data.message)
    }
    return Promise.reject(error)
  });

function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function post(url, body) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, body)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function del (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default {
  get,
  post,
  del
};