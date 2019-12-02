<template>
  <div class="start-up" :style="{height: viewportHeight + 'px'}">
    <img
      src="http://lulinyang.oss-cn-beijing.aliyuncs.com/20191201%2F157516617066783666.jpg"
      class="start-up-img"
      width="100%"
      height="100%"
    />
  </div>
</template>
<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      params: {
        pageSize: 15,
        page: 1
      },
      viewportHeight: document.documentElement.clientHeight
    };
  },
  created() {
    const that = this;
    this.reload();
    setTimeout(() => {
      this.$store.commit('setIsStart', true);
      that.$router.push("/home");
    }, 5000);
  },
  methods: {
    myFun(result) {
      http.setPosition(result.center).then(res => {
        this.$store.commit("setWeatherAll", JSON.parse(res.data.data.content));
        this.$store.commit("setWeather", {
          city_name: res.data.data.city_name,
          week: res.data.data.week,
          wea: res.data.data.wea,
          tem: res.data.data.tem,
          tem1: res.data.data.tem1,
          tem2: res.data.data.tem2
        });
      });
    },
    geolocation() {
      let that = this;
      // 开启SDK辅助定位
      var geolocation = new BMap.Geolocation();
      geolocation.enableSDKLocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          http.setPosition(r.point).then(res => {
            that.$store.commit(
              "setWeatherAll",
              JSON.parse(res.data.data.content)
            );
            that.$store.commit("setWeather", {
              city_name: res.data.data.city_name,
              week: res.data.data.week,
              wea: res.data.data.wea,
              tem: res.data.data.tem,
              tem1: res.data.data.tem1,
              tem2: res.data.data.tem2
            });
          });
        } else {
          var myCity = new BMap.LocalCity();
          myCity.get(that.myFun);
        }
      });
    },
    reload(isRefresh = false) {
      http.getColumn({}).then(res => {
        this.$store.commit("setNavTabs", res.data.data.data);
      });
      http.getBanner({}).then(res => {
        this.$store.commit("setBanners", res.data.data);
      });
      http.getMenu({}).then(res => {
        this.$store.commit("setMenus", res.data.data);
      });
      this.getArctice(isRefresh);
      this.geolocation();
    },
    getArctice() {
      http.getArctice(this.params).then(res => {
        this.$store.commit("setArticles", res.data.data.data);
      });
    }
  },
  destroyed() {
    if(typeof(plus) != undefined) {
      plus.navigator.setFullscreen(false);
    }
  }
};
</script>
<style  scoped>
.start-up {
  position: fixed;
  top: 0;
  width: 100%;
  overflow: hidden;
  display: block;
}
.start-up-img {
  padding: 0;
  margin: 0;
}
</style>