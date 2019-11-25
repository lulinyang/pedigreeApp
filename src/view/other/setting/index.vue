<template>
  <div>
    <van-cell-group>
      <van-cell icon="static/images/change_info.png" title="编辑资料" is-link size="large" to="/edit-user"/>
      <van-cell icon="static/images/change_pwd.png" title="修改密码" is-link size="large" />
    </van-cell-group>
    <van-cell class="logout">
        <van-button
          style="background-color: #f8f8f8;"
          plain
          type="danger"
          round
          size="large"
          @click="logout"
        >退出登录</van-button>
    </van-cell>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.commit("logout", "");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.logout {
  margin-top: 3rem;
  width: 100%;
  background-color: #f8f8f8;
}
</style>