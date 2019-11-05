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
const register_url_post = "/customer/auth/register";

/**
 * 用户列表
 */
const customerlist_url_get = "/customer/manage/query";

/**
 * 用户列表
 */
const deletecustomer_url_delete = "/customer/manage/delete/";

export default {
  login_url_post,
  logout_url_post,
  register_url_post,
  customerlist_url_get,
  deletecustomer_url_delete
};