<template>
  <div class="login-page" :style="{height: viewportHeight + 'px'}">
    <div class="app-logo">
      <img src="static/images/logo.png" width="150px" />
    </div>
    <div class="login-box">
      <van-field v-model="form.username" clearable placeholder="手机号" class="form-input" />

      <van-field v-model="form.code" clearable placeholder="短信验证码" class="form-input">
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="getCode"
          :disabled="second > 0"
        >{{second > 0 ? second + ' s' :'发送验证码'}}</van-button>
      </van-field>
      <van-field
        type="password"
        clearable
        v-model="form.password"
        placeholder="新密码"
        class="form-input"
      />

      <van-field
        type="password"
        clearable
        v-model="form.reg_pwd"
        placeholder="确认密码"
        class="form-input"
      />
      <van-button round class="login-btn" type="info" size="large" @click="submit">提交</van-button>
      <div class="footer-link">
        <a href="javascript:;" @click="jumpPage('/home')">首页</a>
        <a href="javascript:;" @click="jumpPage('/login')">去登录</a>
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
        reg_pwd: "",
        code: ""
      },
      second: 0
    };
  },
  methods: {
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
    submit() {
      this.form.type = this.isCode ? 2 : 1;
      if (this.form.username === "") {
        this.$toast("手机必填");
        return false;
      }
      if (this.form.code === "") {
        this.$toast("验证必填");
        return false;
      }

      if (this.form.password === "") {
        this.$toast("新密码必填");
        return false;
      }

      if (this.form.password !== this.form.reg_pwd) {
        this.$toast("两次密码不一致");
        return false;
      }
      http.changePassword(this.form).then(res => {
        window.console.log('resss', res);
        this.$toast("修改成功");
        this.$router.push("/login");
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