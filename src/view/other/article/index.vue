<template>
  <div class="article" ref="article" :style="{height: viewportHeight + 'px'}">
    <van-cell :border="false">
      <template>
        <div class="describe">{{data.describe}}</div>
        <van-divider content-position="left">
          来源：{{data.create_user_name}}
          <span style="margin-left: 30px;">{{data.created_at}}</span>
        </van-divider>
        <div v-html="data.content"></div>
      </template>
    </van-cell>
    <van-cell :border="false">
      <template>
        <van-grid :column-num="3" :border="false">
          <van-grid-item :text="data.fabulous_num + '赞'">
            <img
              slot="icon"
              src="static/images/fabulous.png"
              width="30px"
              @click="fabulous(1, data)"
              v-if="!data.isFabulous"
            />
            <img slot="icon" src="static/images/fabulous_full.png" width="30px" v-else />
          </van-grid-item>
          <van-grid-item :text="data.collection_num + '收藏'">
            <img slot="icon" src="static/images/collection.png" width="30px" @click="saveCollection(1, data)" v-if="!data.isCollection"/>
            <img slot="icon" src="static/images/collection_full.png" width="30px" v-else @click="cancelCollection(1, data)"/>
          </van-grid-item>

          <van-grid-item text="分享">
            <img slot="icon" src="static/images/share_icon.png" width="30px" />
          </van-grid-item>
        </van-grid>
      </template>
    </van-cell>
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
                  @click="jumpPage(`/reply/1/${item.theme_id}/${item.id}`)"
                >{{item.children.length}}回复</van-tag>
              </van-col>
              <van-col span="12">
                <span class="fa_msg">{{item.fabulous_num}} </span>
                <van-icon size="18" name="static/images/fabulous.png" @click="fabulous(4, item)" v-if="!item.isFabulous" />
                <van-icon size="18" name="static/images/fabulous_full.png" v-else/>
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
      data: {
        fabulous_num: 0,
        collection_num: 0
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
    this.getArticleById(this.$route.params.id);
    this.getComment(this.$route.params.id);
    http.addBrowseNum({ id: this.$route.params.id });
  },
  methods: {
    replyWho(item) {
      this.placeholder = "@" + item.name;
      this.$refs.contentInpt.focus();
      this.pid = item.id * 1;
      this.item = item;
      window.console.log("params", this.pid);
    },
    getArticleById(id) {
      http.getArticleById({ id: id }).then(res => {
        this.data = res.data.data;
        localStorage.setItem("navTitle", this.data.typename);
      });
    },
    getComment(id) {
      http
        .getComment({
          type: 1,
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
        type: 1,
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
          this.$refs.article.scrollTop = this.$refs.comment.offsetTop - 250;
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
        item.fabulous_num = item.fabulous_num*1 + 1;
      });
    },
    saveCollection(type, item) {
      const params = {
        type: type,
        theme_id: item.id
      };
      http.saveCollection(params).then(res => {
        this.$toast("收藏成功！");
        window.console.log("res", res);
        item.isCollection = true;
        item.collection_num = item.collection_num*1 + 1;
      });
    },
    cancelCollection(type, item) {
      const params = {
        type: type,
        theme_id: item.id
      };
      http.cancelCollection(params).then(res => {
        this.$toast(res.data.stateMsg);
        window.console.log("res", res);
        item.isCollection = false;
        item.collection_num = item.collection_num*1 - 1;
      });
    },
  }
};
</script>

<style scoped>
.item {
  color: #999;
  font-size: 0.8rem;
}
.describe {
  font-size: 1.2rem;
}
.article {
  padding-bottom: 1rem;
  background-color: #fff;
  /* height: 100%; */
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
  /* font-size: .8rem; */
}
</style>
<style>
.footer .van-field__control {
  background-color: #f8f8f8;
  padding: 0.2rem 0.4rem;
}
</style>