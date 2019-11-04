/**
 * 登陆
 */
const login_url_post = "/customer/auth/login";

/**
 * 注销退出
 */
const logout_url_post = "/customer/auth/logout";

/**
 * 注册
 */
const register_url_post = "/customer/manage/add";

/**
 * 用户列表
 */
const customerlist_url_get = "/customer/manage/query";

export default {
  login_url_post,
  logout_url_post,
  register_url_post,
  customerlist_url_get
};