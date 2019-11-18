<template>
  <div>
    <!-- <van-nav-bar title="首页" /> -->
    <div class="home-box" ref="homeBox" :style="{height: viewportHeight + 'px'}">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" :border="false">
      <van-tabbar-item v-for="(item, index) in tabbers" :key="index" :to="item.path" :class="{'van-tabbar-item-large': index === 2}">
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.inactive" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      tabbers: [
        {
          active: "static/images/home_full.png",
          inactive: "static/images/home.png",
          path: "/home"
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
  },
  created() {
    window.console.log(this.$route.name);
    switch(this.$route.name) {
      case 'home': this.active = 0;break;
      case 'genealogy': this.active = 1;break;
      case 'conversation': this.active = 2;break;
      case 'message': this.active = 3;break;
      case 'my': this.active = 4;break;
    }
  },
  mounted() {
  
  }
};
</script>

<style scoped>
/* @import url("home"); */
.home-box {
  height: 100%;
  width: 100%;
  background-color: #f8f8f8;
}
.van-tabbar-item-large {
  width: 5rem;
  height: 5rem;
  line-height: normal;;
}
.van-tabbar-item img {
  width: 1.5rem;
  height: 1.5rem;;
}
.van-tabbar-item-large img {
  width: 3rem;
  height: 3rem;;
  margin-top: -2.2rem;
}
</style>