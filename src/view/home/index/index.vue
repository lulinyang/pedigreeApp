<template>
  <div class="homeBox">
    <van-tabs
      class="fixedNav"
      v-if="isFixed && navTabs.length > 0"
      color="#1989FA"
      title-active-color="#1989FA"
      v-model="active"
      @click="selectTabs"
    >
      <van-tab title="全部" :name="0"></van-tab>
      <van-tab v-for="(item, index) in navTabs" :name="item.id" :title="item.name" :key="index"></van-tab>
    </van-tabs>
    <scroller
      style="background-color: #f8f8f8;"
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="arcticeList"
      :refreshText="'下拉刷新'"
      :noDataText="message"
    >
      <van-swipe :autoplay="3000" indicator-color="white" style="height: 12rem;">
        <van-swipe-item>
          <img
            width="100%"
            height="100%"
            src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
          />
        </van-swipe-item>
        <van-swipe-item>
          <img
            width="100%"
            height="100%"
            src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
          />
        </van-swipe-item>
      </van-swipe>

      <van-tabs
        v-if="!isFixed && navTabs.length > 0"
        color="#1989FA"
        title-active-color="#1989FA"
        v-model="active"
        @click="selectTabs"
      >
        <van-tab title="全部" :name="0"></van-tab>
        <van-tab :name="item.id" v-for="(item, index) in navTabs" :title="item.name" :key="index"></van-tab>
      </van-tabs>

      <div v-for="(item, index) in articles" :key="index">
        <van-cell class="van-cell-article" :border="false" :center="true" @click="jumpPage(`/article/${item.id}`, item.typename)">
          <template>
            <div class="article_title">#{{item.title}}#</div>
            <div class="article_describe">{{item.describe}}</div>
          </template>
          <template slot="right-icon">
            <van-image width="6.5rem" height="5rem" fit="fit" :src="$url + item.thumbnail" />
          </template>
        </van-cell>
        <van-cell class="van-cell-label" :border="false">
          <div slot="default" class="article_label">
            <span>{{item.create_user_name}}</span>
            <span>{{item.browse_num}}浏览</span>
            <span>{{item.fabulous_num}}赞</span>
          </div>
          <div slot="right-icon" class="article_label">
            <span>{{item.created_at.split(' ')[0]}}</span>
          </div>
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
      isFixed: false,
      active: 0,
      navTabs: [],
      params: {
        pageSize: 15,
        page: 0
      },
      articles: [],
      ArticleIds: [],
      timer: null
    };
  },
  created() {
    this.reload();
  },
  mounted() {
    // this.$nextTick(() => {
    //   if (!this.timer) {
    //     this.timer = setInterval(() => {
    //       if (
    //         this.$refs.arcticeList &&
    //         this.$refs.arcticeList.getPosition() &&
    //         this.$refs.arcticeList.getPosition().top >= 178
    //       ) {
    //         this.isFixed = true;
    //       } else {
    //         this.isFixed = false;
    //       }
    //     }, 10);
    //   }
    // });
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    jumpPage(page, title) {
      if(title) {
        localStorage.setItem('navTitle',title);
      }
      this.$router.push(page);
    },
    reload(isRefresh = false) {
      http.getColumn({}).then(res => {
        this.navTabs = res.data.data.data;
      });
      this.getArctice(isRefresh);
    },
    refresh() {
      this.params.page = 1;
      this.reload(true);
    },
    infinite() {
      this.getArctice();
    },
    selectTabs(id) {
      window.console.log("id", id);
      if ((id * 10) / 10 === 0) {
        delete this.params.type;
      } else {
        this.params.type = id;
      }
      this.params.page = 1;
      this.getArctice(true);
    },
    getArctice(isRefresh = false) {
      http.getArctice(this.params).then(res => {
        const data = res.data.data;
        if (isRefresh) {
          this.$refs.arcticeList.finishPullToRefresh(true);
          this.articles = [];
          this.ArticleIds = [];
        }
        data.data.forEach(item => {
          this.params.page = data.current_page + 1;
          if (this.ArticleIds.indexOf(item.id) === -1) {
            this.articles.push(item);
            this.ArticleIds.push(item.id);
          }
        });
        if (data.total == 0) {
          this.message = "暂无文章";
          this.$refs.arcticeList.finishInfinite(true);
        } else if (data.current_page >= data.last_page && data.total > 0) {
          this.message = "没有更多了";
          this.$refs.arcticeList.finishInfinite(true);
        } else {
          this.$refs.arcticeList.finishInfinite(false);
        }
      });
    }
  }
};
</script>

<style scoped>
.fixedNav {
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100%;
}
.article_title {
  font-size: 1rem;
  color: #409eff;
}
.article_describe {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 1rem;
  padding-right: 0.2rem;
}
.article_label {
  padding: 0.3rem 0;
  font-size: 0.8rem;
  color: #999;
  border-bottom: 1px solid #f8f8f8;
}
.article_label span {
  margin-right: 0.5rem;
}
.van-cell-label {
  padding-top: 0;
  padding-bottom: 0;
}
.van-cell-article {
  padding-bottom: 0;
}
</style>