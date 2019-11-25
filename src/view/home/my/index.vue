<template>
  <div class="homeBox">
    <div class="header-card-box">
      <!-- <van-row>
        <van-col span="12">
          <van-button type="primary" color="#74ACE6" round size="mini">签到</van-button>
        </van-col>
        <van-col span="12" style="text-align: right;">
          <van-icon name="setting-o" class="setting-icon" />
        </van-col>
      </van-row> -->
      <div class="van-image-box">
        <van-image
          round
          width="4.5rem"
          height="4.5rem"
          :src="$url + $store.getters.headUrl"
        />
      </div>
    </div>
    <div class="card-info">
      <div class="info-name van-hairline--bottom">
        {{$store.getters.name}}
        <img src="static/images/woman.png" width="15px" v-if="$store.getters.sex*1 === 0">
        <img src="static/images/man.png" width="15px" v-if="$store.getters.sex*1 === 1">
      </div>
      <van-grid style="margin-top: .5rem;" :border="false">
        <van-grid-item text="我的话题">
          <img slot="icon" width="50%" src="static/images/huati_icon.png" />
        </van-grid-item>
        <van-grid-item text="系统消息">
          <img slot="icon" width="50%" src="static/images/system_msg.png" />
        </van-grid-item>
        <van-grid-item text="分享">
          <img slot="icon" width="50%" src="static/images/share.png" />
        </van-grid-item>
        <van-grid-item text="联系我们">
          <img slot="icon" width="50%" src="static/images/contact.png" />
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell-group style="margin-top: 1rem;">
      <van-cell icon="static/images/collection_full.png" title="收藏" is-link  size="large"/>
      <van-cell icon="static/images/fabulous_full.png" title="点赞" is-link  size="large"/>
      <van-cell icon="static/images/message_full.png" title="评论" is-link  size="large"/>
      <van-cell icon="static/images/zupu.png" title="族谱" is-link  size="large"/>
      <van-cell icon="static/images/setting.png" to="/setting" title="设置" is-link  size="large"/>
    </van-cell-group>

    
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {};
  },
  created() {
    // console.log('this.$route.query', this.$route.query);
    this.getUserById();
  },
  methods: {
    getUserById() {
      http.getUserById({}).then(res => {
        // window.console.log('sss', res);
        this.$store.commit('setUserInfo', res.data.data);
      });
    },
    logout() {
      this.$store.commit("logout", "");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.header-card-box {
  height: 9rem;
  background-image: linear-gradient(#1989fa, #1989fa);
  padding: 0.8rem;
}
.setting-icon {
  font-size: 1.2rem;
  color: #fff;
}
.van-image-box {
  text-align: center;
}
.card-info {
  width: 90%;
  height: 10rem;
  background-color: #fff;
  margin: -5rem auto 0;
  border-radius: 0.3rem;
  -moz-box-shadow: 1px 0px 15px #999;
  -webkit-box-shadow: 1px 0px 15px #999;
  box-shadow: 1px 0px 15px #999;
  padding: 0.1rem;
}
.info-name {
  line-height: 3rem;
  text-align: center;
  font-size: 1.2rem;
}
</style>

<style>
.card-info .van-grid-item__icon-wrapper {
  text-align: center;
}
</style>