<template>
  <div class="chat-room" ref="room">
    <div class="room-box">
      <van-nav-bar
        class="navbar-title"
        :title="title"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <div class="chat-content">
      <div class="content-box" ref="scrollBox">
        <van-cell :border="false">
          <van-image
            slot="icon"
            round
            width="3rem"
            height="3rem"
            src="http://lulinyang.oss-cn-beijing.aliyuncs.com/20191109%2F157329563885359047.jpg"
          />

          <div
            slot="default"
            class="default"
          >使用 CSS 模拟气泡对话框主要使用 border-radius 属性，制造出过大的圆角，产生出小尾巴的效果。</div>
        </van-cell>

        <van-cell :border="false">
          <van-image
            slot="right-icon"
            round
            width="3rem"
            height="3rem"
            src="http://lulinyang.oss-cn-beijing.aliyuncs.com/20191109%2F157329568265858235.jpg"
          />

          <div
            slot="default"
            class="default2"
          >使用 CSS 模拟气泡对话框主要使用 border-radius 属性，制造出过大的圆角，产生出小尾巴的效果。</div>
        </van-cell>

        <van-cell :border="false">
          <van-image
            slot="right-icon"
            round
            width="3rem"
            height="3rem"
            src="http://lulinyang.oss-cn-beijing.aliyuncs.com/20191109%2F157329568265858235.jpg"
          />

          <div slot="default" class="default2">小尾巴的效果。</div>
        </van-cell>
        <van-cell :border="false" v-for="i in 99" :key="i">
          <van-image
            slot="icon"
            round
            width="3rem"
            height="3rem"
            src="http://lulinyang.oss-cn-beijing.aliyuncs.com/20191109%2F157329563885359047.jpg"
          />

          <div
            slot="default"
            class="default"
          >使用 CSS 模拟气泡对话框主要使用 border-radius 属性，制造出过大的圆角，产生出小尾巴的效果。</div>
        </van-cell>
      </div>
    </div>
    <div class="footer-form">
      <van-field v-model="value" placeholder="请输入用户名" @focus="onFocus" @blur="onBlur">
        <template slot="right-icon">
          <van-image width="1.8rem" class="add-img" src="/static/images/add_img.png" />
          <van-button type="info" size="small">发送</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>
<script>
// const clientHeight = document.body.clientHeight;
export default {
  data() {
    return {
      value: "",
      roomHeight: document.body.clientHeight,
      title: localStorage.getItem("otherTitle")
        ? localStorage.getItem("otherTitle")
        : ""
    };
  },
  created() {
    this.$nextTick(() => {
      var container = this.$refs.scrollBox;
      window.console.log("container.scrollTop2", container.clientHeight);
      container.scrollTop = container.scrollHeight;
    });
  },
  mounted() {
    window.onresize = function() {
      window.console.log(
        "document.body.clientHeight",
        document.body.clientHeight
      );
      this.roomHeight = document.body.clientHeight;
    };
  },
  methods: {
    onFocus() {
      setTimeout(() => {
        var container = this.$refs.scrollBox;
        window.console.log("container.scrollTop2", container.clientHeight);
        container.scrollTop = container.scrollHeight;
      }, 500);
    },
    onBlur() {
      setTimeout(() => {
        var container = this.$refs.scrollBox;
        window.console.log("container.scrollTop2", container.clientHeight);
        container.scrollTop = container.scrollHeight;
      }, 500);
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.chat-room {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f8f8f8;
  /* height: 90%;
  height: -moz-calc(100% - 100px);
  height: -webkit-calc(100% - 100px);
  height: calc(100% - 100px); */
  /* overflow-y: auto; */
}
.room-box {
  width: 100%;
  height: 100%;
  /* background-color: aquamarine; */
  position: relative;
}
.chat-content {
  width: 100%;
  height: -moz-calc(100% - 98px);
  height: -webkit-calc(100% - 98px);
  height: calc(100% - 98px);
  overflow: hidden;
  background-color: #f8f8f8;
  position: absolute;
  top: 47px;
}
.content-box {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #f8f8f8;
}
.navbar-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.footer-form {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.add-img {
  vertical-align: top;
  margin-right: 0.3rem;
}
.default,
.default2 {
  max-width: 80%;
  background-color: #fff;
  position: relative;
  margin-top: 1rem;
  border-radius: 0.2rem;
  padding: 0.5rem;
  -moz-box-shadow: 0 0px 4px #ddd;
  -webkit-box-shadow: 0 0px 4px #ddd;
  box-shadow: 0 0px 4px #ddd;
}
.default {
  margin-left: 0.6rem;
}
.default:after,
.default2:after {
  content: "";
  position: absolute;
  width: 12px;
  height: 13px;
  border-width: 0;
  border-style: solid;
  border-color: transparent;
  margin-left: -2px;
  border-bottom-width: 10px;
  border-bottom-color: currentColor;
  color: #fff;
  top: 0px;
}
.default:after {
  right: 100%;
  border-radius: 0 0 0 32px;
}
.default2 {
  margin-right: 0.6rem;
  float: right;
}
.default2:after {
  left: 100%;
  border-radius: 0 0 32px 0;
}
.content-box .van-cell {
  background-color: #f8f8f8;
}
</style>