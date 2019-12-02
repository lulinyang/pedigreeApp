<template>
  <div class="index-grid">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="message"
        @load="onLoad"
        :offset="50"
        :immediate-check="false"
      >
        <van-cell class="weather" :center="true" :border="false">
          <span slot="icon" class="centigrade">{{$store.getters.weather.tem}}</span>
          <span slot="title">{{$store.getters.weather.week}}</span>
          <template slot="label">
            <van-tag  type="warning">{{$store.getters.weather.wea}}</van-tag>
            <span class="tem-range">{{$store.getters.weather.tem1}}/{{$store.getters.weather.tem2}}</span>
          </template>
          
          <span slot="right-icon" class="right-icon">
            <van-icon name="location" size="18" color="#FF976A" class="location"/>
            <span class="city_name">{{$store.getters.weather.city_name}}</span>
          </span>
        </van-cell>
        <van-swipe :autoplay="3000" indicator-color="white" style="height: 12rem;">
          <van-swipe-item v-for="(item,index) in $store.getters.banners" :key="index" @click="jumpUrl(item)">
            <img
              width="100%"
              height="100%"
              :src="$url + item.imgUrl"
            />
          </van-swipe-item>
        </van-swipe>
        <van-grid :border="false">
          <van-grid-item icon="photo-o" :text="item.name" v-for="(item, index) in $store.getters.menus" :key="index" @click="jumpPage(item.router)">
            <template slot="icon">
              <van-icon :name="$url + item.icon" size="48" />
            </template>
          </van-grid-item>
        </van-grid>
        <van-notice-bar
          color="#1989fa"
          background="#ecf9ff"
          left-icon="volume-o"
        >足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。</van-notice-bar>
        <van-sticky>
          <van-tabs
            color="#1989FA"
            title-active-color="#1989FA"
            v-model="active"
            @click="selectTabs"
            v-if="$store.getters.navTabs.length > 0"
          >
            <van-tab title="全部" :name="0"></van-tab>
            <van-tab
              :name="item.id"
              v-for="(item, index) in $store.getters.navTabs"
              :title="item.name"
              :key="index"
            ></van-tab>
          </van-tabs>
        </van-sticky>

        <div v-for="(item, index) in $store.getters.articles" :key="index">
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
      active: 0,
      params: {
        pageSize: 15,
        page: 1
      },
      articles: [],
      ArticleIds: [],
      loading: false,
      finished: false,
      isLoading: false,
    };
  },
  created() {
    this.reload();
  },
  methods: {
    jumpUrl(item) {
      if(item.isLink*1 === 1) {
        window.location.href= item.link;
      }
    },
    myFun(result){
      http.setPosition(result.center).then(res => {
        this.$store.commit("setWeatherAll", JSON.parse(res.data.data.content));
        this.$store.commit("setWeather", {
          city_name: res.data.data.city_name,
          week: res.data.data.week,
          wea: res.data.data.wea,
          tem: res.data.data.tem,
          tem1: res.data.data.tem1,
          tem2: res.data.data.tem2,
        });
      })
    },
    geolocation() {
        let that = this;
        // 开启SDK辅助定位
        var geolocation = new BMap.Geolocation();
        geolocation.enableSDKLocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            http.setPosition(r.point).then(res => {
              that.$store.commit("setWeatherAll", JSON.parse(res.data.data.content));
              that.$store.commit("setWeather", {
                city_name: res.data.data.city_name,
                week: res.data.data.week,
                wea: res.data.data.wea,
                tem: res.data.data.tem,
                tem1: res.data.data.tem1,
                tem2: res.data.data.tem2,
              });
            })
          }else {
            var myCity = new BMap.LocalCity();
            myCity.get(that.myFun);
          }        
        });
    },
    onRefresh() {
      this.reload();
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
        this.$store.commit("setNavTabs", res.data.data.data);
      });
      http.getBanner({}).then(res => {
        this.$store.commit("setBanners", res.data.data);
      });
      http.getMenu({}).then(res => {
        this.$store.commit("setMenus", res.data.data);
      });
      this.getArctice(isRefresh);
      this.geolocation();
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
          this.finished = false;
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
          this.finished = true;
        } else if (data.current_page >= data.last_page && data.total > 0) {
          this.message = "没有更多了";
          this.finished = true;
        }
        this.$store.commit("setArticles", this.articles);
        
      });
    }
  }
};
</script>

<style scoped>
.index-grid {
  padding-bottom: 50px;
}
.weather {
  padding-left: 0;
  padding-right: 0;
  background-color: rgba(25, 137, 250, 0.8);
  color: #fff;
}
.centigrade {
  line-height: 45px;
  font-size: 1.2rem;
  padding: 0 0.5rem;
}
.right-icon {
  padding: 0 0.5rem;
}
.city_name {
  /* margin-top: -0.1rem; */
  padding: 0.1rem;
  font-size: 1rem;
}
.location {
  vertical-align: top;
  margin-top: .2rem;
}
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
.tem-range {
  color: #fff;
  margin-left: 10px;
}
</style>