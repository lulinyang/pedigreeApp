<template>
  <div class="homeBox">
    <scroller
      style="background-color: #f8f8f8;"
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="list"
      :refreshText="'下拉刷新'"
      :noDataText="message"
    >
      <div class="conversation" v-for="(item, index) in list" :key="index">
        <van-cell :border="false" style="padding-bottom: 0;">
          <template slot="icon">
            <van-image
              v-if="item.sex*1 === 1"
              round
              width="4rem"
              height="4rem"
              src="static/images/default_man.png"
            />
            <van-image
              v-if="item.sex*1 === 0"
              round
              width="4rem"
              height="4rem"
              src="static/images/default_woman.png"
            />
          </template>
          <template>
            <div class="userInfo">
              <p class="userInfo-p">
                {{item.name}}
                <img src="static/images/man.png" width="14px" v-if="item.sex*1 === 1"/>
                <img src="static/images/woman.png" width="14px" v-if="item.sex*1 === 0"/>
              </p>
              <p class="userInfo-p">
                {{item.created_at}}
              </p>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <div class="content-box">
              <p class="text">{{item.content}}</p>
            </div>
            <van-grid
              :border="false"
              :column-num="3"
              square
              v-if="item.imgsUrl.length > 4 || item.imgsUrl.length === 3"
            >
              <van-grid-item v-for="(v, k) in item.imgsUrl" :key="k">
                <van-image width="100%" height="100%" :src="$url + v" />
              </van-grid-item>
            </van-grid>

            <van-grid
              :border="false"
              :column-num="2"
              square
              v-if="item.imgsUrl.length === 4 || item.imgsUrl.length === 2"
            >
              <van-grid-item v-for="(v, k) in item.imgsUrl" :key="k">
                <van-image width="100%" height="100%" :src="$url + v" />
              </van-grid-item>
            </van-grid>

            <van-grid :border="false" :column-num="1" v-if="item.imgsUrl.length === 1">
              <van-grid-item v-for="(v, k) in item.imgsUrl" :key="k">
                <van-image width="100%" height="100%" :src="$url + v" />
              </van-grid-item>
            </van-grid>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <van-row>
              <van-col span="12" class="operation">
                <van-icon name="chat-o" class="i" />
                <span>8</span>
              </van-col>
              <van-col span="12" class="operation">
                <van-icon name="good-job-o" class="i" />
                <span>8</span>
              </van-col>
            </van-row>
          </template>
        </van-cell>
      </div>
    </scroller>

    <img class="push" @click="jumpPage('/words')" src="static/images/push_full.png" />
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      message: "没有更多了",
      params: {
        pageSize: 15,
        page: 1
      },
      list: [],
      listIds: []
    };
  },
  created() {
    this.getConversationList();
  },
  methods: {
    refresh() {
      this.params.page = 1;
      this.getConversationList(true);
    },
    infinite() {
      this.getConversationList();
    },
    getConversationList(isRefresh = false) {
      http.getConversationList(this.params).then(res => {
        const data = res.data.data;
        if (isRefresh) {
          this.$refs.list.finishPullToRefresh(true);
          this.list = [];
          this.listIds = [];
        }
        data.data.forEach(item => {
          this.params.page = data.current_page + 1;
          if (this.listIds.indexOf(item.id) === -1) {
            if (item.imgs) item.imgsUrl = item.imgs.split(",");
            this.list.push(item);
            this.listIds.push(item.id);
          }
        });
        if (data.total == 0) {
          this.message = "暂无文章";
          this.$refs.list.finishInfinite(true);
        } else if (data.current_page >= data.last_page && data.total > 0) {
          this.message = "没有更多了";
          this.$refs.list.finishInfinite(true);
        } else {
          this.$refs.list.finishInfinite(false);
        }
      });
    },
    jumpPage(page) {
      this.$router.push(page);
    }
  }
};
</script>

<style scoped>
.userInfo {
  padding: 0.7rem 0.5rem 0;
}
.userInfo-p:nth-of-type(1) {
  font-size: 1.2rem;
}
.userInfo-p {
  line-height: 1.5rem;
}
.userInfo-p:nth-of-type(2) {
  font-size: 0.9rem;
  color: #999;
}
.text {
  font-size: 1.1rem;
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
</style>
<style>
.conversation .van-grid-item__content {
  padding: 4px;
}
</style>