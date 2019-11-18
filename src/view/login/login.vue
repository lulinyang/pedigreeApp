<template>
  <div class="login-page" :style="{height: viewportHeight + 'px'}">
    <div class="app-logo">
      <img src="static/images/logo.png" width="150px" />
    </div>
    <div class="login-box">
      <van-field v-model="form.username" clearable placeholder="请输入用户名" class="form-input">
        <van-image
          slot="left-icon"
          width="1.2rem"
          height="1.2rem"
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
          height="1.2rem"
          fit="fit"
          src="static/images/pwd_icon.png"
        />
      </van-field>

      <van-field
        v-model="form.code"
        clearable
        placeholder="请输入短信验证码"
        class="form-input"
        v-if="isCode"
      >
        <van-image
          slot="left-icon"
          width="1.2rem"
          height="1.2rem"
          fit="fit"
          src="static/images/code_icon.png"
          class="code-input"
        />
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="getCode"
          :disabled="second > 0"
        >{{second > 0 ? second + ' s' :'发送验证码'}}</van-button>
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
        <a href="javascript:;" @click="jumpPage('/rest')">忘记密码</a>
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
      isCode: false,
      second: 0
    };
  },
  methods: {
    loginType() {
      this.isCode = !this.isCode;
    },
    jumpPage(page) {
      this.$router.push(page);
    },
    getCode() {
      if (this.form.username === "") {
        this.$toast("手机号必填");
        return false;
      }
      http.sendMsg({ tel: this.form.username }).then(res => {
        if (res.data.code * 1 === 200) {
          this.second = 120;
          this.$toast("发送成功");
          let timer = setInterval(() => {
            if (this.second <= 0) {
              clearInterval(timer);
            } else {
              this.second -= 1;
            }
          }, 1000);
        }
      });
    },
    login() {
      this.form.type = this.isCode ? 2 : 1;
      if (this.form.username === "") {
        this.$toast("用户名必填");
        return false;
      }
      http.login(this.form).then(res => {
        this.$store.commit("setUid", res.data.data.id);
        this.$store.commit('setUserInfo', res.data.data);
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