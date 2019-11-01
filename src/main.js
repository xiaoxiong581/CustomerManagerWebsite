import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import moment from 'moment'
import session from '@/backend/session'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.requireAuth)) {
    if (session.isLogin()) {
      next()
    }
    else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
