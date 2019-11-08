<template>
  <div class="homeBox">
    <EasyRefresh :userSelect="false" :onRefresh="onRefresh" :loadMore="loadMore">
      <div class="genealogy-list" v-for="i in 45" :key="i">
        <van-cell>
          <template slot="icon">
            <van-image
              width="4.5rem"
              height="5.5rem"
              src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190828/156696360816068825.jpg"
            />
          </template>
          <template>
            <p class="title">云梦江氏</p>
            <p
              class="describe van-multi-ellipsis--l3"
            >仙门世家四大家族之一，家族所在为莲花坞，家徽为九瓣莲。先祖江迟为游侠出身，立“明知不可为而为之”为唯一家训。</p>
          </template>
        </van-cell>
      </div>
    </EasyRefresh>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onRefresh() {},
    loadMore() {}
  }
};
</script>

<style scoped>
.title,
.describe {
  padding: 0 0.5rem;
}
.title {
  font-size: 1.2rem;
}
.describe {
  font-size: 1rem;
  line-height: 1.2rem;
  color: #999;
}
.genealogy-list {
  width: 90%;
  margin: .5rem auto 0;
  border-radius: .3rem;
  overflow: hidden;
   -moz-box-shadow: 1px 0px 15px #999;
  -webkit-box-shadow: 1px 0px 15px #999;
  box-shadow: 1px 0px 15px #999;
}
</style>