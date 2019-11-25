<template>
  <div class="talk" ref="talk" :style="{height: viewportHeight + 'px'}">
    <div class="conversation">
      <van-cell :border="false" style="padding-bottom: 0;">
        <van-image
          slot="icon"
          round
          width="3rem"
          height="3rem"
          :src="$url + item.headUrl"
          @click.stop
        />
        <template>
          <div class="userInfo">
            <p class="userInfo-p">
              {{data.name}}
              <img src="static/images/man.png" width="12px" v-if="data.sex*1 === 1" />
              <img src="static/images/woman.png" width="12px" v-if="data.sex*1 === 0" />
            </p>
            <p class="userInfo-p">
              <van-count-down :time="data.timestamp" :auto-start="false">
                <template v-slot="timeData">
                  <span class="item" v-if="timeData.days > 0">{{ timeData.days}} 天前</span>
                  <span
                    class="item"
                    v-if="timeData.hours > 0 && timeData.days <= 0"
                  >{{ timeData.hours }} 小时前</span>
                  <span
                    class="item"
                    v-if="timeData.hours <= 0 && timeData.hours <= 0 && timeData.minutes > 0"
                  >{{ timeData.minutes }}分钟前</span>
                  <span
                    class="item"
                    v-if="timeData.hours <= 0 && timeData.hours <= 0 && timeData.minutes <= 0"
                  >刚刚</span>
                </template>
              </van-count-down>
            </p>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <template>
          <div class="content-box">
            <p class="text">{{data.content}}</p>
          </div>
          <van-grid
            :border="false"
            :column-num="3"
            square
            v-if="data.imgsUrl.length > 4 || data.imgsUrl.length === 3"
          >
            <van-grid-item v-for="(v, k) in data.imgsUrl" :key="k">
              <van-image
                width="100%"
                height="100%"
                :src="$url + v"
                @click.stop="imagePreview(data.imgsUrl)"
              />
            </van-grid-item>
          </van-grid>

          <van-grid
            :border="false"
            :column-num="2"
            square
            v-if="data.imgsUrl.length === 4 || data.imgsUrl.length === 2"
          >
            <van-grid-item v-for="(v, k) in data.imgsUrl" :key="k">
              <van-image
                width="100%"
                height="100%"
                :src="$url + v"
                @click.stop="imagePreview(data.imgsUrl)"
              />
            </van-grid-item>
          </van-grid>

          <van-grid :border="false" :column-num="1" v-if="data.imgsUrl.length === 1">
            <van-grid-item v-for="(v, k) in data.imgsUrl" :key="k">
              <van-image
                width="100%"
                height="100%"
                :src="$url + v"
                @click.stop="imagePreview(data.imgsUrl)"
              />
            </van-grid-item>
          </van-grid>
        </template>
      </van-cell>
      <van-cell>
        <template>
          <van-row>
            <van-col span="12" class="operation">
              <span style="color: #409eff;">{{data.browse_volume}}</span>
              <van-icon name="static/images/browse.png" class="i" />
            </van-col>
            <van-col span="12" class="operation" v-if="!data.isFabulous">
              <van-icon
                name="static/images/fabulous.png"
                class="i"
                size="18"
                @click="fabulous(3, data)"
              />
              <span>{{data.fabulous_num}}</span>
            </van-col>
            <van-col span="12" class="operation" v-else>
              <van-icon
                name="static/images/fabulous_full.png"
                class="i"
                size="18"
                @click="fabulous(3, data)"
              />
              <span style="color: #409eff;">{{data.fabulous_num}}</span>
            </van-col>
          </van-row>
        </template>
      </van-cell>
    </div>
    <div ref="comment">
      <van-cell-group title="热门评论" :border="false" v-if="comment.length > 0">
        <div v-for="(item, index) in comment" :key="index">
          <van-cell :center="true" :border="false">
            <van-icon slot="icon" size="45" name="static/images/default_man.png" />
            <template>
              <span style="margin:0 10px 0 10px;font-size:.9rem;">{{item.name}}</span>
              <van-icon size="12" name="static/images/man.png" />
              <p class="time-text">
                <van-count-down :time="item.timestamp" :auto-start="false">
                  <template v-slot="timeData">
                    <span class="item" v-if="timeData.hours > 0">{{ timeData.hours }} 小时前</span>
                    <span class="item" v-else>{{ timeData.minutes }}分钟前</span>
                  </template>
                </van-count-down>
              </p>
            </template>
            <van-icon
              slot="right-icon"
              size="18"
              name="static/images/del.png"
              v-if="$store.getters.uid*1 === item.uid*1"
            />
          </van-cell>
          <div class="content" @click="replyWho(item)">{{item.content}}</div>
          <div class="opt">
            <van-row class="opt-item">
              <van-col span="12" style="text-align: left;">
                <van-tag
                  v-if="item.children.length > 0"
                  round
                  size="medium"
                  @click="jumpPage(`/reply/3/${item.theme_id}/${item.id}`)"
                >{{item.children.length}}回复</van-tag>
              </van-col>
              <van-col span="12">
                <span class="fa_msg">{{item.fabulous_num}}</span>
                <van-icon
                  size="18"
                  name="static/images/fabulous.png"
                  @click="fabulous(4, item)"
                  v-if="!item.isFabulous"
                />
                <van-icon size="18" name="static/images/fabulous_full.png" v-else />
                <van-icon
                  class="right-icon"
                  size="18"
                  name="static/images/msg.png"
                  @click="replyWho(item)"
                />
              </van-col>
            </van-row>
            <div></div>
          </div>
        </div>
      </van-cell-group>
      <div class="comment-kong">暂无评论</div>
    </div>
    <div class="footer">
      <van-field>
        <input
          ref="contentInpt"
          slot="input"
          type="text"
          v-model="content"
          :placeholder="placeholder"
          class="content-input"
          @keyup.enter="submit"
        />
        <van-icon slot="right-icon" size="26" name="static/images/send.png" @click="submit" />
      </van-field>
    </div>
  </div>
</template>

<script>
import http from "@/http/server/api";
import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
export default {
  data() {
    return {
      data: {
        imgsUrl: []
      },
      content: "",
      comment: [],
      placeholder: "我也来说两句",
      pid: 0,
      item: {},
      viewportHeight: document.documentElement.clientHeight - 110
    };
  },
  created() {
    this.getConversationById(this.$route.params.id);
    this.getComment(this.$route.params.id);
    http.addBrowseNumConversation({ id: this.$route.params.id });
  },
  methods: {
    replyWho(item) {
      this.placeholder = "@" + item.name;
      this.$refs.contentInpt.focus();
      this.pid = item.id * 1;
      this.item = item;
      window.console.log("params", this.pid);
    },
    imagePreview(imgs) {
      let imgsArray = imgs.map(item => {
        return this.$url + item;
      });
      ImagePreview(imgsArray);
    },
    getConversationById(id) {
      // window.console.log('timestamp', timestamp);
      http.getConversationById({ id: id }).then(res => {
        if (res.data.data.imgs) {
          res.data.data.imgsUrl = res.data.data.imgs.split(",");
        } else {
          res.data.data.imgsUrl = [];
        }
        let timestamp = parseInt(new Date().getTime());
        res.data.data.timestamp =
          timestamp - parseInt(new Date(res.data.data.created_at).getTime());
        window.console.log("res.data.data.timestamp", res.data.data.timestamp);
        this.data = res.data.data;
      });
    },
    getComment(id) {
      http
        .getComment({
          type: 3,
          theme_id: id
        })
        .then(res => {
          window.console.log("sss", res);
          this.comment = res.data.data.map(item => {
            let timestamp = parseInt(new Date().getTime());
            item.timestamp =
              timestamp - parseInt(new Date(item.created_at).getTime());
            return item;
          });
        });
    },
    jumpPage(page) {
      this.$router.push(page);
    },
    submit() {
      const params = {
        type: 3,
        theme_id: this.data.id,
        pid: this.pid,
        content: this.content
      };
      if (params.content === "") {
        this.$toast("回复内容不能为空！");
        return false;
      }
      http.saveComment(params).then(res => {
        this.$refs.contentInpt.blur();

        this.$toast(res.data.stateMsg);
        const data = {
          headUrl: this.$store.getters.headUrl,
          name: this.$store.getters.name,
          sex: this.$store.getters.sex,
          uid: this.$store.getters.uid,
          username: this.$store.getters.username,
          content: this.content,
          children: []
        };
        if (this.pid === 0) {
          this.comment.unshift(data);
          this.$refs.talk.scrollTop = this.$refs.comment.offsetTop - 100;
        } else {
          this.item.children.push(data);
        }

        this.content = "";
        this.placeholder = "我也来说两句";
        this.pid = 0;
      });
    },
    //点赞
    fabulous(type, item) {
      const params = {
        type: type,
        theme_id: item.id
      };
      http.saveFabulous(params).then(res => {
        this.$toast("点赞成功！");
        window.console.log("res", res);
        item.isFabulous = true;
        item.fabulous_num = item.fabulous_num * 1 + 1;
      });
    }
  }
};
</script>

<style scoped>
.userInfo {
  padding: 0.2rem 0.5rem 0;
}
.userInfo-p:nth-of-type(1) {
  font-size: 1rem;
}
.userInfo-p {
  line-height: 1.5rem;
}
.userInfo-p:nth-of-type(2) {
  font-size: 0.8rem;
  color: #999;
}
.content-box {
  padding: 0 0.3rem;
}
.text {
  font-size: 0.9rem;
}
.conversation {
  margin-bottom: 0.5rem;
}
.operation {
  text-align: center;
}
.operation .i {
  font-size: 1.4rem;
}
.operation span {
  font-size: 1rem;
  color: #999;
  margin-left: 0.2rem;
  vertical-align: top;
}
.push {
  width: 3.5rem;
  height: 3.5rem;
  overflow: hidden;
  position: fixed;
  bottom: 80px;
  right: 10px;
  background-color: #fff;
  border-radius: 50%;
  -moz-box-shadow: 1px 0px 15px #999;
  -webkit-box-shadow: 1px 0px 15px #999;
  box-shadow: 1px 0px 15px #999;
  text-align: center;
}
.conversation .van-grid-item__content {
  padding: 4px;
}
.conversation .van-count-down {
  color: #999;
  font-size: 0.8rem;
}
.item {
  color: #999;
  font-size: 0.8rem;
}

.talk {
  padding-bottom: 1rem;
  overflow-y: auto;
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
}

.footer .van-cell.van-field {
  border-top: 1px solid #f8f8f8;
}
.van-cell-group__title {
  background-color: #f8f8f8;
}
.content {
  padding: 0 20px 0 40px;
}
.time-text {
  font-size: 0.8rem;
  color: #999;
  text-indent: 10px;
}
.opt {
  padding: 0 20px 20px 40px;
}
.opt-item {
  border-bottom: 1px solid #f8f8f8;
  text-align: right;
  padding: 1rem 0;
}
.right-icon {
  margin-left: 2rem;
}
.content-input {
  width: 100%;
  height: 100%;
  border: 0;
  background-color: #f8f8f8;
}
.fa_msg {
  vertical-align: top;
  margin-right: 0.2rem;
  color: #999;
}
</style>
<style>
.footer .van-field__control {
  background-color: #f8f8f8;
  padding: 0.2rem 0.4rem;
}
.comment-kong {
  text-align: center;
  color: #999;
  line-height: 3rem;
  font-size: 0.8rem;
}
</style>