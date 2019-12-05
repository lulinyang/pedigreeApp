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
        <van-search class="search-box" placeholder="请输入宗祠名" shape="round" @search="onSearch"></van-search>
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
        <div class="card-box top-card" @click="jumpPage('/ancestral-hall')">
          <van-cell>
            <span class="left-title">宗祠名称</span>
            <van-tag type="success" class="tag">已加入</van-tag>
            <span slot="right-icon" class="right-nember">4555成员</span>
          </van-cell>
          <van-cell>
            <p>
              如果遇到问题，建议保持你的 PR 足够小。保证一个 PR 只解决一个问题或只添加一个功能
              如果遇到问题，建议保持你的 PR 足够小。保证一个 PR 只解决一个问题或只添加一个功能
            </p>
          </van-cell>
          <van-cell>
            <template>
              <van-tag color="#ffe1e1" text-color="#ad0000" size="large" class="tag">标签</van-tag>
            </template>
          </van-cell>
        </div>

        <div class="card-box" v-for="(item, index) in list" :key="index">
          <van-cell>
            <span class="left-title">{{item.name}}</span>
            <div slot="right-icon">
              <span class="right-nember">4555成员</span>
              <van-button type="primary" size="small">申请加入</van-button>
            </div>
          </van-cell>
          <van-cell>
            <p>{{item.describe}}</p>
          </van-cell>
          <van-cell
            :center="true"
            class="admin"
            @click="jumpPage('/user-list', item.name + '-管理员', item.admin)"
          >
            <span v-for="(adminItem, i) in item.admin" :key="i">
              <van-image
                round
                class="admin_headUrl"
                width="2rem"
                height="2rem"
                :src="$url + adminItem.headUrl"
                 v-if="i < 4"
              />
            </span>
            <div slot="right-icon" class="Administrators_span">
              <span class="Administrators_icon">管理员</span>
              <van-icon name="arrow" class="Administrators_icon" />
            </div>
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
      message: "没有更多了"
    };
  },
  created() {
    // this.getAncestral();
  },
  methods: {
    jumpPage(page, navTitle, list) {
      if (navTitle) {
        localStorage.setItem("navTitle", navTitle);
      }
      if (list) {
        // setMemberList
        this.$store.commit("setMemberList", list);
      }
      this.$router.push(page);
    },
    refresh() {
      this.params.page = 1;
      this.getAncestral(true);
    },
    infinite() {
      this.getAncestral();
    },
    onSearch() {},
    getAncestral(isRefresh = false) {
      http.getAncestral(this.params).then(res => {
        const data = res.data.data;
        if (isRefresh) {
          this.$refs.list.finishPullToRefresh(true);
          this.list = [];
          this.listIds = [];
        }
        data.data.forEach(item => {
          this.params.page = data.current_page + 1;
          if (this.listIds.indexOf(item.id) === -1) {
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
  margin-top: 40px;
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
  color: #ff976a;
  font-size: 0.8rem;
  margin-right: 0.3rem;
}
.tag {
  margin-right: 0.5rem;
}
.top-nav {
  position: fixed;
  top: 44px;
  width: 100%;
  z-index: 999;
}
.Administrators_span {
  display: inline-block;
  color: #999;
}
.Administrators_icon {
  vertical-align: middle;
}
.admin_headUrl {
  border-radius: 50%;
  margin-right: 0.5rem;
}
.search-box {
  /* border-bottom: 1px solid #f8f8f8; */
  border-top: 1px solid #f8f8f8;
  padding: 4.6px;
}
</style>
