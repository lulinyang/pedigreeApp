<template>
  <div class="reply" ref="reply" :style="{height: viewportHeight + 'px'}">
    <van-cell-group>
      <div>
        <van-cell :center="true" :border="false">
          <van-image
              slot="icon"
              round
              width="3rem"
              height="3rem"
              :src="$url + Landlord.headUrl"
              @click.stop
            />
          <template>
            <span style="margin:0 10px 0 10px;font-size:.9rem;">{{Landlord.name}}</span>
            <van-icon size="12" name="static/images/man.png" />
            <p class="time-text">
              <van-count-down :time="Landlord.timestamp" :auto-start="false">
                <template v-slot="timeData">
                  <span class="item" v-if="timeData.hours > 0">{{ timeData.hours }}小时前</span>
                  <span class="item" v-else>{{ timeData.minutes }}分钟前</span>
                </template>
              </van-count-down>
            </p>
          </template>
          <van-icon
            slot="right-icon"
            size="18"
            name="static/images/del.png"
            v-if="$store.getters.uid*1 === Landlord.uid*1"
          />
        </van-cell>
        <div class="content">{{Landlord.content}}</div>
        <div class="opt opt-top">
          <van-row class="opt-item opt-item-top">
            <van-col span="12" style="text-align: left;">
              <van-tag round size="medium">楼主</van-tag>
            </van-col>
            <van-col span="12">
              <span class="fa_msg">{{Landlord.fabulous_num}}</span>
              <van-icon
                size="18"
                name="static/images/fabulous.png"
                @click="fabulous(4, Landlord)"
                v-if="!Landlord.isFabulous"
              />
              <van-icon size="18" name="static/images/fabulous_full.png" v-else />
            </van-col>
          </van-row>
        </div>
      </div>
    </van-cell-group>
    <div ref="comment">
      <van-cell-group title="热门评论" :border="false">
        <div v-for="(item, index) in comment" :key="index">
          <van-cell :center="true" :border="false">
            <van-image
              slot="icon"
              round
              width="3rem"
              height="3rem"
              :src="$url + item.headUrl"
              @click.stop
            />
            <template>
              <span style="margin:0 10px 0 10px;font-size:.9rem;">{{item.name}}</span>
              <van-icon size="12" name="static/images/man.png" />
              <p class="time-text">
                <van-count-down :time="item.timestamp" :auto-start="false">
                  <template v-slot="timeData">
                    <span class="item" v-if="timeData.hours > 0">{{ timeData.hours }}小时前</span>
                    <span class="item" v-else>{{ timeData.minutes }}分钟前</span>
                  </template>
                </van-count-down>
              </p>
            </template>
            <van-icon
              slot="right-icon"
              size="18"
              name="static/images/del.png"
              v-if="$store.getters.uid*1 === Landlord.uid*1"
            />
          </van-cell>
          <div class="content" @click="replyWho(item)">{{item.content}}</div>
          <div class="opt">
            <van-row class="opt-item">
              <van-col span="12" style="text-align: left;">
                <van-tag
                  round
                  size="medium"
                  v-if="item.children.length > 0"
                  @click="jumpPage(`/reply/1/${item.theme_id}/${item.id}`)"
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
          </div>
        </div>
      </van-cell-group>
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
export default {
  data() {
    return {
      Landlord: {},
      comment: [],
      placeholder: "我也来说两句",
      content: "",
      viewportHeight: document.documentElement.clientHeight - 110,
      pid: 0,
      item: {}
    };
  },
  created() {
    window.console.log("this.$route.params", this.$route.params);
    this.pid = this.$route.params.pid;
    this.getComment(this.$route.params);
  },
  methods: {
    jumpPage(page) {
      this.$router.push(page);
      // this.pid = this.$route.params.pid;
      // this.getComment(this.$route.params);
    },
    replyWho(item) {
      this.placeholder = "@" + item.name;
      this.$refs.contentInpt.focus();
      this.pid = item.id * 1;
      this.item = item;
      window.console.log("params", this.pid);
    },
    getComment(params) {
      http.getComment(params).then(res => {
        window.console.log("sss", res);
        this.Landlord = res.data.data[0];
        let timestamp = parseInt(new Date().getTime());
        this.Landlord.timestamp =
          timestamp - parseInt(new Date(this.Landlord.created_at).getTime());
        this.comment = res.data.data[0].children.map(item => {
          timestamp = parseInt(new Date().getTime());
          item.timestamp =
            timestamp - parseInt(new Date(item.created_at).getTime());
          return item;
        });
      });
    },
    submit() {
      const params = {
        type: this.$route.params.type,
        theme_id: this.$route.params.theme_id,
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
          headUrl: this.$store.getters.userInfo.headUrl,
          name: this.$store.getters.userInfo.name,
          sex: this.$store.getters.userInfo.sex,
          uid: this.$store.getters.uid,
          username: this.$store.getters.userInfo.username,
          content: this.content,
          children: []
        };
        if (this.pid*1 === 0) {
          this.comment.unshift(data);
          this.$refs.reply.scrollTop = this.$refs.comment.offsetTop - 250;
        } else {
          if(!this.item.children) {
            this.item.children = [];
          }
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
.reply {
  padding-bottom: 1rem;
  background-color: #fff;
  height: 100%;
  overflow-y: auto;
}
.content {
  padding: 0 20px 0 40px;
}
.time-text {
  font-size: 0.8rem;
  color: #999;
  text-indent: 10px;
}
.right-icon {
  margin-left: 2rem;
}
.item {
  color: #999;
  font-size: 0.8rem;
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
.opt-top {
  padding-bottom: 0;
}
.opt-item-top {
  border: 0;
}
</style>

<style>
.footer .van-field__control {
  background-color: #f8f8f8;
  padding: 0.2rem 0.4rem;
}
</style>