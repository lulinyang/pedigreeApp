<template>
  <div class="login-page" :style="{height: viewportHeight + 'px'}">
    <div class="app-logo">
      <img src="static/images/logo.png" width="150px" />
    </div>
    <div class="login-box">
      <van-field v-model="form.username" clearable placeholder="请输入用户名" class="form-input">
        <van-image
          slot="left-icon"
          width="1.3rem"
          height="1.4rem"
          fit="fit"
          src="static/images/tel_icon.png"
        />
      </van-field>
      <van-field
        type="password"
        clearable
        v-model="form.password"
        placeholder="请输入密码"
        class="form-input"
        v-if="!isCode"
      >
        <van-image
          slot="left-icon"
          width="1.2rem"
          height="1.4rem"
          fit="fit"
          src="static/images/pwd_icon.png"
        />
      </van-field>

      <van-field v-model="form.code" clearable placeholder="请输入短信验证码" class="form-input" v-if="isCode">
        <van-image
          slot="left-icon"
          width="1.2rem"
          height="1.3rem"
          fit="fit"
          src="static/images/code_icon.png"
          class="code-input"
        />
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>

      <van-button round class="login-btn" type="info" size="large" @click="login">登录</van-button>
      <van-button
        round
        plain
        class="login-btn"
        type="info"
        size="large"
        @click="loginType"
      >{{ isCode ? '密码登录': '验证码登录' }}</van-button>
      <div class="footer-link">
        <a href="#">忘记密码</a>
        <a href="javascript:;" @click="jumpPage('/register')">还没账号，我去注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      viewportHeight: document.documentElement.clientHeight,
      form: {
        username: "",
        password: "",
        code: ""
      },
      isCode: false
    };
  },
  methods: {
    loginType() {
      this.isCode = !this.isCode;
    },
    jumpPage(page) {
      this.$router.push(page);
    },
    login() {
      this.form.type = this.isCode ? 2 : 1;
      if(this.form.username === "") {
        this.$toast("用户名必填");
        return false;
      }
      http.login(this.form).then(res => {
        this.$store.commit("setUid", res.data.data.id);
        this.$router.push("/home");
      });
    }
  }
};
</script>

<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.login {
  position: relative;
}
.login-box {
  width: 90%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 0.2rem;
}
.login-btn {
  margin: 2rem 0 0;
}
.code-input {
  margin-top: 0.15rem;
}
.app-logo {
  padding: 1rem 0;
  text-align: center;
}
.footer-link {
  width: 90%;
  margin: 0 auto;
  padding: 1rem 0.5rem;
}
.footer-link > a:nth-of-type(2) {
  float: right;
}
</style>