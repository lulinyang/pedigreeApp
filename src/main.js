import Vue from 'vue'
import router from './router'
import axios from 'axios'
import App from './App.vue'
import config from './config'
import store from '@/store/index'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// Vue.use(ImagePreview);
import VueScroller from "vue-scroller"
Vue.use(VueScroller);

// import BaiduMap from 'vue-baidu-map'

// Vue.use(BaiduMap, {
//   ak: config.BaiduMapAk
// })

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.$url = config.baseUrl;


const noLogin = ['login', 'home', 'conversation', 'genealogy', 'article'];
router.beforeEach((to, from, next) => {
  if (from.name != null) {
    localStorage.setItem('routeName', from.name);
  }
  if(noLogin.indexOf(to.name) === -1 && !localStorage.getItem('uid')) {
    next('/login');
  }
  next();
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
