function setAuth(customerId, token) {
  localStorage.setItem("customerId", customerId)
  localStorage.setItem("token", token)
}

function isLogin() {
  let customerId = localStorage.getItem("customerId");
  let token = localStorage.getItem("token");

  return null != customerId && null != token
}

function logout() {
  localStorage.removeItem("customerId")
  localStorage.removeItem("token")
}

function getCustomerId() {
  return localStorage.getItem("customerId");
}

function getToken() {
  return localStorage.getItem("token");
}

export default {
  setAuth,
  isLogin,
  logout,
  getCustomerId,
  getToken
};