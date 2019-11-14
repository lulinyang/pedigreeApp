<template>
  <div class="homeBox">
    <div class="header-card-box">
      <van-row>
        <van-col span="12">
          <van-button type="primary" color="#74ACE6" round size="mini">签到</van-button>
        </van-col>
        <van-col span="12" style="text-align: right;">
          <van-icon name="setting-o" class="setting-icon" />
        </van-col>
      </van-row>
      <div class="van-image-box">
        <van-image
          round
          width="4.5rem"
          height="4.5rem"
          src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190719/156352098551333745.jpg"
        />
      </div>
    </div>
    <div class="card-info">
      <div class="info-name van-hairline--bottom">最后一眼</div>
      <!-- <div class="van-hairline--top"></div> -->
      <van-grid style="margin-top: .5rem;" :border="false">
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </div>
    <van-cell-group style="margin-top: 1rem;">
      <van-cell icon="photo-o" title="单元格" is-link value="内容" />
      <van-cell icon="photo-o" title="单元格" is-link value="内容" />
      <van-cell icon="photo-o" title="单元格" is-link value="内容" />
      <van-cell icon="photo-o" title="单元格" is-link value="内容" />
    </van-cell-group>

    <van-cell style="background-color: #f8f8f8;">
      <template>
        <van-button style="background-color: #f8f8f8;"  plain type="danger" round="" size="large" @click="logout">退出登录</van-button>
      </template>
    </van-cell>
    
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    // console.log('this.$route.query', this.$route.query);
  },
  methods: {
    logout() {
      this.$store.commit("logout", '');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.header-card-box {
  height: 11rem;
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
  padding: .1rem;
}
.info-name {
  line-height: 3rem;
  text-align: center;
  font-size: 1.2rem;
}
</style>