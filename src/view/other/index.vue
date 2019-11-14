<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
    />
    <div class="other-box" ref="otherBox" :style="{height: viewportHeight + 'px'}">
      <router-view />
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
      title: this.$route.meta.title,
      viewportHeight: document.documentElement.clientHeight - 46
    };
  },
  created() {
    // window.console.log(this.$route.meta.title);
    // this.title = this.$route.meta.title
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      // Toast('按钮');
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
</style>