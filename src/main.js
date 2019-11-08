import Vue from 'vue'
import router from './router'
import axios from 'axios'
import App from './App.vue'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import VueScroller from "vue-scroller"
Vue.use(VueScroller);

import EasyRefresh from 'vue-easyrefresh'
Vue.use(EasyRefresh)

Vue.config.productionTip = false


Vue.prototype.$axios = axios;
import store from '@/store/index'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)



// router.beforeEach((to, from, next) => {
//   if (from.name != null) {
//     localStorage.setItem('routeName', from.name);
//   }
//   next();
// });


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
