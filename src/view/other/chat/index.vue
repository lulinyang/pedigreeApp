<template>
  <div class="chat-room" ref="room">
    <div class="room-box">
      <van-nav-bar class="navbar-title" :title="title" @click-left="onClickLeft">
        <van-icon name="arrow-left" slot="left" size="24" color="#000" />
      </van-nav-bar>
    </div>

    <div class="chat-content">
      <div class="content-box" ref="scrollBox">
        <div v-for="(item, index) in contentList" :key="index">
          <van-cell :border="false" v-if="item.from_id*1 !== $store.getters.uid*1 && item.content != ''">
            <van-image slot="icon" round width="3rem" height="3rem" :src="$url + item.headUrl" />
            <div slot="default" class="default" v-if="item.msgType*1 === 0">{{item.content}}</div>
            <div slot="default" class="default-img" v-if="item.msgType*1 === 1">
               <img :src="$url + item.content"  class="chat-img" @click="previewImg($url + item.content)"/>
            </div>
          </van-cell>

          <van-cell :border="false" v-if="item.from_id*1 === $store.getters.uid*1  && item.content != ''">
            <van-image
              slot="right-icon"
              round
              width="3rem"
              height="3rem"
              :src="$url + item.headUrl"
            />
            <div slot="default" class="default2" v-if="item.msgType*1 === 0">
               <span>{{item.content}}</span>
            </div>
            <div slot="default" class="default2-img" v-if="item.msgType*1 === 1">
               <img :src="$url + item.content"  class="chat-img" @click="previewImg($url + item.content)"/>
            </div>
          </van-cell>
        </div>
      </div>
    </div>
    <div class="footer-form">
      <van-field @blur="onBlur">
        <div slot="right-icon" class="right-icon-box">
          <van-uploader :after-read="afterRead">
            <van-icon name="static/images/add_img.png" size="24" class="right-icon-btn" />
          </van-uploader>
          <van-icon
            name="static/images/send.png"
            size="24"
            class="right-icon-btn"
            @click="sendMessage"
          />
        </div>
        <input
          type="text"
          v-model="content"
          @focus="onText"
          @keyup.enter="sendMessage"
          placeholder="请输入内容"
          slot="input"
          class="send-input"
          ref="sendInput"
        />
      </van-field>
      <!-- <van-grid :border="false" style="background:#fff;" v-if="isFile">
        <van-grid-item icon="photo-o" text="图片" style="color:#409EFF" />
        <van-grid-item text="文件">
          <van-icon name="static/images/file.png" size="30" slot="icon" />
        </van-grid-item>
      </van-grid>-->
    </div>
  </div>
</template>
<script>
import http from "@/http/server/api";
import config from "@/config/index";
import { upFile } from "@/tools/functions";
import Vue from 'vue';
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
export default {
  data() {
    return {
      content: "",
      roomHeight: document.body.clientHeight,
      title: localStorage.getItem("otherTitle")
        ? localStorage.getItem("otherTitle")
        : "",
      isFile: false,
      websocket: null,
      contentList: [],
      imgsPreview: [],
    };
  },
  created() {
    http
      .getChatRoomList({
        uid: localStorage.getItem("uid"),
        from_id: this.$route.params.id
      })
      .then(res => {
        this.imgsPreview = [];
        res.data.data.forEach(item => {
          if(item.msgType*1 === 1) {
            this.imgsPreview.push(this.$url + item.content);
          }
        });
        this.contentList = res.data.data;
        this.$nextTick(() => {
          var container = this.$refs.scrollBox;
          window.console.log("container.scrollTop2", container.clientHeight);
          container.scrollTop = container.scrollHeight*2;
        });
      });
    // getChatRoomList
    this.initWebSocket();
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
    previewImg(img) {
      const that = this;
      let index = that.imgsPreview.indexOf(img);
      ImagePreview({
        images: that.imgsPreview,
        startPosition: index,
      });
    },
    afterRead(file) {
      let fd = new FormData();
      fd.append("img", file.file);
      upFile(this.$url + "/api/upChatImage", fd).then(res => {
        if (res.code * 1 === 200) {
          this.sendFile(res.data);
        } else {
          this.$toast('图片上传失败！');
        }
      });
    },
    sendFile(content) {
      const that = this;
      const data = {
        action: "saveChat",
        content: {
          from_id: that.$store.getters.uid,
          to_id: that.$route.params.id,
          msgType: 1,
          content: content,
          name: that.$store.getters.userInfo.name,
          headUrl: that.$store.getters.userInfo.headUrl,
          sex: that.$store.getters.userInfo.sex
        }
      };
      this.websocket.send(JSON.stringify(data));
    },
    jumpPage(page) {
      this.$router.push(page);
    },
    onText() {
      this.isFile = false;
      setTimeout(() => {
        var container = this.$refs.scrollBox;
        container.scrollTop = container.scrollHeight*2;
      }, 500);
    },
    onBlur() {
      setTimeout(() => {
        var container = this.$refs.scrollBox;
        container.scrollTop = container.scrollHeight*2;
      }, 500);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    sendMessage() {
      this.$refs.sendInput.focus();
      const that = this;
      const data = {
        action: "saveChat",
        content: {
          from_id: that.$store.getters.uid,
          to_id: that.$route.params.id,
          msgType: 0,
          content: that.content,
          name: that.$store.getters.userInfo.name,
          headUrl: that.$store.getters.userInfo.headUrl,
          sex: that.$store.getters.userInfo.sex
        }
      };
      if (this.content === "") {
        this.$toast("内容不能为空！");
        return false;
      }
      this.websocket.send(JSON.stringify(data));
      this.content = "";
    },
    websocketonmessage(e) {
      let that = this;
      try {
        const data = JSON.parse(e.data);
        if(data.msgType*1 === 1) {
          this.imgsPreview.push(data.content);
        }
        this.contentList.push(data);
        setTimeout(() => {
          http.updateUnread({ uid: localStorage.getItem("uid") });
          var container = that.$refs.scrollBox;
          container.scrollTop = container.scrollHeight*2;
        }, 500);
      } catch (error) {
        console.log("error", error);
      }
    },
    websocketonopen(e) {
      console.log("WebSocket连接成功", e);
    },
    websocketonerror(e) {
      console.log("WebSocket连接错误", e);
    },
    websocketclose(e) {
      console.log("WebSocket连接关闭", e);
    },
    initWebSocket() {
      const wsuri = `${config.wsUrl}?uid=${localStorage.getItem("uid")}`;
      this.websocket = new WebSocket(wsuri);
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onclose = this.websocketclose;
    }
  },
  destroyed() {
    this.websocket.close();
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
}
.room-box {
  width: 100%;
  height: 100%;
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
.default2,
.default-img,
.default2-img {
  max-width: 80%;
  background-color: #fff;
  position: relative;
  margin-top: 1rem;
  border-radius: 0.4rem;
  padding: 0.5rem;
  -moz-box-shadow: 0 0px 4px #ddd;
  -webkit-box-shadow: 0 0px 4px #ddd;
  box-shadow: 0 0px 4px #ddd;
  color: #000;
  word-break: break-all;
}
.default {
  margin-left: 0.6rem;
  display: inline-block;
}
.default:after,
.default2:after,
.default2-img:after
.default-img:after {
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
  margin-left: 0.2rem;
}
.default-img:after {
  right: 100%;
  border-radius: 0 0 0 32px;
  margin-left: 0.2rem;
}
.default2 {
  margin-right: 0.6rem;
  float: right;
}
.default2:after {
  left: 100%;
  border-radius: 0 0 32px 0;
}
.default-img {
  padding-bottom: .1rem;
}
.default2-img {
  margin-right: 0.6rem;
  float: right;
  padding-bottom: .1rem;
}
.default2-img:after {
  left: 100%;
  border-radius: 0 0 32px 0;
}
.content-box .van-cell {
  background-color: #f8f8f8;
}
.right-icon-btn {
  display: inline-block;
  margin-right: 0.3rem;
  vertical-align: middle;
}
.send-input {
  width: 100%;
  border: 0;
  border-bottom: 1px solid #ddd;
  padding: 0.3rem 0;
}
.chat-img {
  max-width: 100%;
  border: 0;
  margin: 0;
  padding: 0;
}
</style>