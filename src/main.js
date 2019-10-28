import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
      return moment(dataStr).format(pattern)
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
