<template>
  <div>
    <!-- <van-nav-bar title="首页" /> -->
    <div class="home-box" ref="homeBox" :style="{height: viewportHeight + 'px'}">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="$store.state.common.active" :border="false">
      <!-- <van-tabbar-item
        v-for="(item, index) in tabbers"
        :key="index"
        :to="item.path"
        :class="{'van-tabbar-item-large': index === 2}"
        
      >
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.inactive" />
      </van-tabbar-item> -->
      <van-tabbar-item to="/home">
        <img slot="icon" slot-scope="props" :src="props.active ? 'static/images/home_full.png' : 'static/images/home.png'" />
      </van-tabbar-item>
      <van-tabbar-item to="/genealogy">
        <img slot="icon" slot-scope="props" :src="props.active ? 'static/images/zupu_full.png' : 'static/images/zupu.png'" />
      </van-tabbar-item>
      <van-tabbar-item to="/conversation">
        <img slot="icon" slot-scope="props" :src="props.active ? 'static/images/huati_full.png' : 'static/images/huati.png'" />
      </van-tabbar-item>
      <van-tabbar-item to="/message" :info="$store.getters.unread_num_total">
        <img slot="icon" slot-scope="props" :src="props.active ? 'static/images/message_full.png' : 'static/images/message.png'" />
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <img slot="icon" slot-scope="props" :src="props.active ? 'static/images/my_full.png' : 'static/images/my.png'" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabbers: [
        {
          active: "static/images/home_full.png",
          inactive: "static/images/home.png",
          path: "/home",
        },
        {
          active: "static/images/zupu_full.png",
          inactive: "static/images/zupu.png",
          path: "/genealogy"
        },
        {
          active: "static/images/huati_full.png",
          inactive: "static/images/huati.png",
          path: "/conversation"
        },
        {
          active: "static/images/message_full.png",
          inactive: "static/images/message.png",
          path: "/message"
        },
        {
          active: "static/images/my_full.png",
          inactive: "static/images/my.png",
          path: "/my"
        }
      ],
      viewportHeight: document.documentElement.clientHeight - 50
    };
  }
};
</script>

<style scoped>
.home-box {
  height: 100%;
  width: 100%;
  background-color: #f8f8f8;
}
.van-tabbar-item-large {
  width: 3rem;
  height: 3rem;
  line-height: normal;
}
.van-tabbar-item img {
  width: 1.5rem;
  height: 1.5rem;
}
.van-tabbar-item-large img {
  width: 3rem;
  height: 3rem;
  margin-top: -0.2rem;
}
</style>