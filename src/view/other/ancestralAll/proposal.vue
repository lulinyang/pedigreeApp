<template>
  <div class="content-box">
    <van-sticky :offset-top="46">
      <van-tabs v-model="active" color="#1989FA" title-active-color="#1989FA" @change="checkActive">
        <van-tab title="全部建议"></van-tab>
        <van-tab title="我的建议"></van-tab>
      </van-tabs>
    </van-sticky>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, index) in list" :key="index">
        <van-row>
          <van-col span="12">
            <img :src="$url + item.headUrl" class="headurl" />
            <span class="userInfo-name">{{item.name}}</span>
          </van-col>
          <van-col span="12" class="push-time">{{item.created_at}}</van-col>
        </van-row>
        <div class="content">{{item.content}}</div>
      </van-cell>
    </van-list>
    <div class="footer-h"></div>
    <div class="footer-box">
      <van-cell>
        <van-button
          type="info"
          class="footer-btn"
          @click="jumpPage(`/add-proposal/${$route.params.id}`)"
        >我要建议</van-button>
      </van-cell>
    </div>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      active: 0,
      params: {
        pageSize: 15,
        page: 1
      },
      list: [],
      listIds: [],
      loading: false,
      finished: false
    };
  },
  created() {},
  methods: {
    checkActive() {
      this.params.type = this.active;
      this.params.page = 1;
      this.getProposalList(true);
    },
    onLoad() {
      this.getProposalList();
    },
    jumpPage(page) {
      this.$router.push(page);
    },
    getProposalList(isRefresh = false) {
      this.params.ancestral_id = this.$route.params.id;
      http.getProposalList(this.params).then(res => {
        const data = res.data.data;
        if (isRefresh) {
          this.finished = false;
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
        this.loading = false;
        this.isLoading = false;
        this.message = "";
        if (data.total == 0) {
          this.message = "暂无数据";
          this.finished = true;
        } else if (data.current_page >= data.last_page && data.total > 0) {
          this.message = "没有更多了";
          this.finished = true;
        }
      });
    }
  }
};
</script>

<style  scoped>
.footer-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.footer-btn {
  width: 100%;
}
.footer-h {
  height: 64px;
}
.headurl {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
.userInfo-name {
  display: inline-block;
  vertical-align: middle;
  padding-left: 0.5rem;
}
.push-time {
  text-align: right;
  line-height: 2.5rem;
  color: #999;
  font-size: 0.8rem;
}
</style>