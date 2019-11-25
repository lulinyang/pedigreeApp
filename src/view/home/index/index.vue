<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="message"
        @load="onLoad"
        :offset="50"
        :immediate-check="false"
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
        <van-grid :border="false">
          <van-grid-item icon="photo-o" text="宗祠">
            <template slot="icon">
              <van-icon name="static/images/home_menu1.png" size="48" />
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="历史今日">
            <template slot="icon">
              <van-icon name="static/images/home_menu2.png" size="48" />
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="老黄历">
            <template slot="icon">
              <van-icon name="static/images/home_menu3.png" size="48" />
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="名人烈士">
            <template slot="icon">
              <van-icon name="static/images/home_menu4.png" size="48" />
            </template>
          </van-grid-item>
        </van-grid>
        <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
          足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。
        </van-notice-bar>
        <van-sticky>
          <van-tabs
            v-if="!isFixed && navTabs.length > 0"
            color="#1989FA"
            title-active-color="#1989FA"
            v-model="active"
            @click="selectTabs"
          >
            <van-tab title="全部" :name="0"></van-tab>
            <van-tab
              :name="item.id"
              v-for="(item, index) in navTabs"
              :title="item.name"
              :key="index"
            ></van-tab>
          </van-tabs>
        </van-sticky>

        <div v-for="(item, index) in articles" :key="index">
          <van-cell
            class="van-cell-article"
            :border="false"
            :center="true"
            @click="jumpPage(`/article/${item.id}`, item.typename)"
          >
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
              <span>{{item.comment_num}}评论</span>
            </div>
            <div slot="right-icon" class="article_label">
              <span>{{item.created_at.split(' ')[0]}}</span>
            </div>
          </van-cell>
        </div>
        <van-divider>{{message}}</van-divider>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      message: "",
      isFixed: false,
      active: 0,
      navTabs: [],
      params: {
        pageSize: 15,
        page: 1
      },
      articles: [],
      ArticleIds: [],
      loading: false,
      finished: false,
      viewportHeight: document.documentElement.clientHeight - 50,
      isLoading: false
    };
  },
  // watch() {},
  created() {
    this.reload();
  },

  methods: {
    onRefresh() {
      this.reload();
    },
    onScroll() {
      this.isFixed = this.$refs.homePage.scrollTop > 189 ? true : false;
    },
    onLoad() {
      this.getArctice();
    },
    jumpPage(page, title) {
      if (title) {
        localStorage.setItem("navTitle", title);
      }
      this.$router.push(page);
    },
    reload(isRefresh = false) {
      http.getColumn({}).then(res => {
        this.navTabs = res.data.data.data;
      });
      this.getArctice(isRefresh);
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
        this.loading = false;
        this.isLoading = false;
        this.message = "";
        if (data.total == 0) {
          this.message = "暂无文章";
        } else if (data.current_page >= data.last_page && data.total > 0) {
          this.message = "没有更多了";
          this.finished = true;
        }
      });
    }
  }
};
</script>

<style scoped>
.home-page {
  /* padding-bottom: 50px; */
  position: relative;
  overflow-y: auto;
}
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