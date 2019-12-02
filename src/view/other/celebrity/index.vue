<template>
  <div>
    <van-row class="top-nav">
      <van-col span="14">
        <van-tabs v-model="active" color="#1989FA" title-active-color="#1989FA">
          <van-tab title="推荐"></van-tab>
          <van-tab title="最新"></van-tab>
          <van-tab title="最热"></van-tab>
        </van-tabs>
      </van-col>
      <van-col span="10">
        <van-search
          style="padding: 5px;"
          v-model="keyword"
          placeholder="请输入关键词"
          shape="round"
          @search="onSearch"
        ></van-search>
      </van-col>
    </van-row>
    <div class="scroll-box" :style="{height: viewportHeight + 'px'}">
      <scroller
        style="background-color: #f8f8f8;"
        :on-refresh="refresh"
        :on-infinite="infinite"
        ref="list"
        :refreshText="'下拉刷新'"
        :noDataText="message"
      >
        <div class="card-box" v-for="(item, index) in list" :key="index">
          <van-cell>
            <span class="left-title">{{item.name}}</span>
            <span class="name_word" v-if="item.name_word">字{{item.name_word}}</span>
            <span slot="right-icon" class="right-nember">4555赞</span>
            <span slot="right-icon" class="right-nember">4555评论</span>
            <span slot="right-icon" class="right-nember">4555阅</span>
          </van-cell>
          <van-cell>
            <img :src="$url + item.thumbnail" class="celebrity-img" width="120px" />
            <span class="celebrity-text">{{item.describe}}</span>
          </van-cell>
          <van-cell>
            <template>
              <van-tag
                v-for="(tag, tagIndex) in item.tags"
                :key="tagIndex"
                :color="tag.color"
                size="large"
                class="tag"
              >{{tag.name}}</van-tag>
            </template>
          </van-cell>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      keyword: "",
      active: 0,
      params: {
        page: 1,
        pageSize: 8
      },
      list: [],
      listIds: [],
      viewportHeight: document.documentElement.clientHeight - 50,
      message: "没有更多了",
      colors: [
        "#f2826a",
        "#7232dd",
        "#67C23A",
        "#409EFF",
        "#F56C6C",
        "#909399",
        "#303133"
      ]
    };
  },
  methods: {
    refresh() {
      this.params.page = 1;
      this.getCelebrity(true);
    },
    infinite() {
      this.getCelebrity();
    },
    onSearch() {},
    getCelebrity(isRefresh = false) {
      const that = this;
      http.getCelebrity(this.params).then(res => {
        const data = res.data.data;
        if (isRefresh) {
          this.$refs.list.finishPullToRefresh(true);
          this.list = [];
          this.listIds = [];
        }
        data.data.forEach(item => {
          this.params.page = data.current_page + 1;
          if (this.listIds.indexOf(item.id) === -1) {
            if (item.tag) {
              item.tags = item.tag.split(",").map(tag => {
                let index = parseInt(Math.random() * 6);
                console.log('index', index);
                return { name: tag, color: that.colors[index] };
              });
            } else {
              item.tags = [];
            }
            this.list.push(item);
            this.listIds.push(item.id);
          }
        });
        if (data.total == 0) {
          this.message = "暂无数据";
          this.$refs.list.finishInfinite(true);
        } else if (data.current_page >= data.last_page && data.total > 0) {
          this.message = "没有更多了";
          this.$refs.list.finishInfinite(true);
        } else {
          this.$refs.list.finishInfinite(false);
        }
      });
    }
  }
};
</script>
<style scoped>
.scroll-box {
  margin-top: 50px;
  position: relative;
}
.card-box {
  width: 95%;
  margin: 0.5rem auto;
  background-color: #fff;
  -moz-box-shadow: 1px 0px 15px #999;
  -webkit-box-shadow: 1px 0px 15px #999;
  box-shadow: 1px 0px 15px #999;
  border-radius: 0.2rem;
  overflow: hidden;
}
.left-title {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}
.right-nember {
  /* color: #ff976a; */
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: #999;
}
.tag {
  margin-right: 0.5rem;
}
.celebrity-img {
  vertical-align: top;
  float: left;
  padding: 0 0.5rem 0rem 0;
}
.top-nav {
  position: fixed;
  top: 44px;
  width: 100%;
  z-index: 999;
}
.name_word {
  font-size: 0.8rem;
  color: #999;
}
</style>