import Vue from 'vue'
import router from './router'
import axios from 'axios'
import App from './App.vue'
import config from './config'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import VueScroller from "vue-scroller"
Vue.use(VueScroller);

// import EasyRefresh from 'vue-easyrefresh'
// Vue.use(EasyRefresh)

Vue.config.productionTip = false


Vue.prototype.$axios = axios;
Vue.prototype.$url = config.baseUrl;
import store from '@/store/index'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)


const noLogin = ['login', 'home', 'conversation', 'genealogy'];
router.beforeEach((to, from, next) => {
  window.console.log('from', from);
  if(noLogin.indexOf(to.name) === -1 && !VueCookies.get('uid')) {
    next('/login');
  }
  next();
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
