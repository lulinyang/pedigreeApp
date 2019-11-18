<template>
  <div>
    <van-nav-bar
      :title="$route.meta.title === '' ? title : $route.meta.title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
    />
    <div class="other-box" ref="otherBox" :style="{height: viewportHeight + 'px'}">
      <router-view :key="$route.path + $route.params.t"/>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   title: {
  //     type: String,
  //     default: ''
  //   }
  // },
  data() {
    return {
      title: localStorage.getItem('navTitle'),
      viewportHeight: document.documentElement.clientHeight - 46
    };
  },
  created() {
    // this.title = this.$route.meta.title
    // window.console.log(this.$route.meta.title);
    // this.title = this.$route.meta.title
  },
  // mounted() {
  //    window.addEventListener('scroll',this.handleScroll);
  // },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      // Toast('按钮');
    },
    handleScroll(e) {
      window.console.log('e', e, window.document.body.scrollTop);
      
    }
  }
};
</script>

<style scoped>
.other-box {
  padding-top: 47px;
  width: 100%;
  background-color: #f8f8f8;
}
.van-nav-bar__left  .van-icon {
  color: #000;
}
</style>