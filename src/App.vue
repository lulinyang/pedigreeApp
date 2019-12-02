<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { METHODS } from "http";
export default {
  name: "app",
  data() {
    return {
      first: null
    };
  },
  created() {
    let that = this;
    this.$nextTick(() => {
      that.addListenBack();
    });
  },
  methods: {
    addListenBack() {
      let that = this;
      document.addEventListener("plusready", function() {
        var webview = plus.webview.currentWebview();
        plus.key.addEventListener("backbutton", function() {
          webview.canBack(function(e) {
            if (e.canBack && that.$route.name != "home") {
              that.$router.go(-1);
            } else {
              //首次按键，提示‘再按一次退出应用’
              if (!that.first) {
                that.first = new Date().getTime();
                that.$toast("再按一次退出应用");
                setTimeout(() => {
                  that.first = null;
                }, 2000);
              } else {
                if (new Date().getTime() - that.first < 1500) {
                  plus.runtime.quit();
                }
              }
            }
          });
        });
      });
    }
  }
};
</script>


<style>
.homeBox {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/* p {
  margin: 0;
} */

body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
button,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}
body {
  background: #f8f8f8;
  color: #555;
  font-size: 14px;
  font-family: Verdana, Arial, Helvetica, sans-serif;
}
td,
th,
caption {
  font-size: 14px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
  font-size: 100%;
}
address,
caption,
cite,
code,
dfn,
em,
strong,
th,
var {
  font-style: normal;
  font-weight: normal;
}
a {
  color: #555;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
img {
  border: none;
}
ol,
ul,
li {
  list-style: none;
}
input,
textarea,
select,
button {
  font: 14px Verdana, Helvetica, Arial, sans-serif;
}
table {
  border-collapse: collapse;
}
html {
  overflow-y: scroll;
}

.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}

.content {
  word-break: break-all;
}
</style>
