<template>
  <div>
    <van-cell-group>
      <van-field label="旧密码" type="password" v-model="params.old_pwd" clearable placeholder="旧密码" />
      <van-field label="新密码" type="password" v-model="params.password" clearable placeholder="新密码" />
      <van-field
        label="确认密码"
        type="password"
        v-model="params.reg_pwd"
        clearable
        placeholder="确认密码"
      />
    </van-cell-group>
    <div class="submit-box">
      <van-button type="info" class="submit" @click="submit">确认</van-button>
    </div>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      params: {
        old_pwd: "",
        password: "",
        reg_pwd: ""
      }
    };
  },
  methods: {
    submit() {
      http.modifyPwd(this.params).then(res => {
        this.$toast(res.data.stateMsg);
        localStorage.removeItem("uid");
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
.submit-box {
  text-align: center;
  padding: 40px 20px;
}
.submit {
  width: 100%;
}
</style>