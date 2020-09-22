import Vue from 'vue'
import Index from './Index.vue'
import router  from './router'
import store from './store'
// import axios from 'axios'

Vue.config.productionTip = false;
// Vue.prototype.$axios = axios;
// Vue.prototype.$rou = router;

new Vue({
  router,
  store,
  render: h => h(Index)
}).$mount('#index')
