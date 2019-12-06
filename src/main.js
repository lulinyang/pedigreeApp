import Vue from 'vue'
import router from './router'
import App from './App.vue'
import config from './config'
import websocket from './wesocket'
import store from '@/store/index'
import http from "@/http/server/api";
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import VueScroller from "vue-scroller"
Vue.use(VueScroller);

Vue.config.productionTip = false

Vue.prototype.$websocket = websocket;
Vue.prototype.$url = config.baseUrl;


const noLogin = ['login', 'home', 'conversation', 'genealogy', 'article', 'historyToday', 'start'];
router.beforeEach((to, from, next) => {
  if (from.name != null) {
    localStorage.setItem('routeName', from.name);
  }

  if(localStorage.getItem('uid')) {
    http.getUserById({}).then(res => {
      store.commit('setUserInfo', res.data.data);
    });
  }

  switch (to.name) {
    case 'home': store.commit('setActive', 0); break;
    case 'genealogy': store.commit('setActive', 1); break;
    case 'conversation': store.commit('setActive', 2); break;
    case 'message': store.commit('setActive', 3); break;
    case 'my': store.commit('setActive', 4); break;
  }
  if (noLogin.indexOf(to.name) === -1 && !localStorage.getItem('uid')) {
    next('/login');
  }
  next();
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
