<template>
  <div class="homeBox2">
    <div v-if="$store.getters.chatList.length > 0">
      <van-swipe-cell v-for="(item, index) in $store.getters.chatList" :key="index">
        <van-cell @click="jumpPage(`/chat/${item.id}`, item.name)">
          <template slot="icon">
            <van-image round width="3.5rem" height="3.5rem" :src="$url + item.headUrl" />
          </template>
          <template>
            <div class="message">
              <p class="message-p">{{item.name}}</p>
              <p class="message-p van-ellipsis" v-if="item.msgType*1 === 0">{{item.content}}</p>
              <p class="message-p van-ellipsis" v-if="item.msgType*1 === 1">【图片】</p>
            </div>
          </template>
          <template slot="right-icon">
            <div>
              <p class="time-msg">
                <van-count-down :time="item.timestamp" :auto-start="false">
                  <template v-slot="timeData">
                    <span class="item" v-if="timeData.days > 0">{{ timeData.days}}天前</span>
                    <span
                      class="item"
                      v-if="timeData.hours > 0 && timeData.days <= 0"
                    >{{ timeData.hours }}小时前</span>
                    <span
                      class="item"
                      v-if="timeData.days <= 0 && timeData.hours <= 0 && timeData.minutes > 0"
                    >{{ timeData.minutes }}分钟前</span>
                    <span
                      class="item"
                      v-if="timeData.hours <= 0 && timeData.hours <= 0 && timeData.minutes <= 0"
                    >刚刚</span>
                  </template>
                </van-count-down>
              </p>
              <p class="message-tips">
                <van-tag round type="danger" v-if="item.unread_num > 0 && item.unread_num < 99">{{item.unread_num}}</van-tag>
                <van-tag round type="danger" v-if="item.unread_num > 99">99+</van-tag>
              </p>
            </div>
          </template>
        </van-cell>
        <template slot="right">
          <van-button class="del" square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </div>
    <van-divider v-else>暂无聊天记录</van-divider>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      chatList: []
    };
  },
  created() {
    console.log("this.$store.getters.chatList", this.$store.getters.chatList);
  },
  methods: {
    jumpPage(page, title) {
      http.updateUnread({uid: localStorage.getItem('uid')});
      if (title !== undefined) {
        localStorage.setItem("otherTitle", title);
      }
      this.$router.push(page);
    }
  }
};
</script>

<style scoped>
.homeBox2 {
  /* overflow-y: auto; */
  padding-bottom: 70px;
  background-color: #f8f8f8;
}
.message {
  padding: 0.5rem 0.5rem 0;
}
.message-p:nth-of-type(1) {
  font-size: 1rem;
}
.message-p {
  line-height: 1.5rem;
}
.message-p:nth-of-type(2) {
  font-size: 0.8rem;
  color: #999;
}
.del {
  width: 5rem;
  height: 100%;
}
.time-msg {
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.3rem;
}
.item {
  font-size: .8rem;
  color: #999;
}
.message-tips {
  text-align: right;
}
</style>