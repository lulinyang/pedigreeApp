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
      <div class="genealogy-list" v-for="(item, index) in list" :key="index">
        <van-cell>
          <template slot="icon">
            <van-image
              width="4.5rem"
              height="5.5rem"
              src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190828/156696360816068825.jpg"
            />
          </template>
          <template>
            <p class="title">{{item.area_surname}}</p>
            <p
              class="describe van-multi-ellipsis--l3"
            >{{item.describe}}</p>
          </template>
        </van-cell>
      </div>
    </scroller>
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
    this.getGenealogy();
  },
  methods: {
    refresh() {
      this.params.page = 1;
      this.getGenealogy(true);
    },
    infinite() {
      this.getGenealogy();
    },
    getGenealogy(isRefresh = false) {
      http.getGenealogy(this.params).then(res => {
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
          this.message = "暂无文章";
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
.title,
.describe {
  padding: 0 0.5rem;
}
.title {
  font-size: 1.2rem;
}
.describe {
  font-size: 1rem;
  line-height: 1.2rem;
  color: #999;
}
.genealogy-list {
  width: 90%;
  margin: 0.5rem auto 0;
  border-radius: 0.3rem;
  overflow: hidden;
  -moz-box-shadow: 1px 0px 15px #999;
  -webkit-box-shadow: 1px 0px 15px #999;
  box-shadow: 1px 0px 15px #999;
}
</style>