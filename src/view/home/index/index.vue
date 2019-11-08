<template>
  <div class="homeBox">
    <van-tabs v-if="isFixed" color="#1989FA" title-active-color="#1989FA">
      <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index"></van-tab>
    </van-tabs>

    <EasyRefresh
      :userSelect="false"
      :onRefresh="onRefresh"
      :loadMore="loadMore"
      :onScroll="easyRefreshTop"
    >
      <van-swipe :autoplay="3000" indicator-color="white" style="height: 12rem;">
        <van-swipe-item>
          <img width="100%" height="100%" src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg" />
        </van-swipe-item>
        <van-swipe-item>
          <img width="100%" height="100%" src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg" />
        </van-swipe-item>
        <van-swipe-item>
          <img width="100%" height="100%" src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg" />
        </van-swipe-item>
        <van-swipe-item>
          <img width="100%" height="100%" src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg" />
        </van-swipe-item>
      </van-swipe>

      <van-tabs v-if="!isFixed" color="#1989FA" title-active-color="#1989FA">
        <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index"></van-tab>
      </van-tabs>

      <van-cell v-for="i in 49" :key="i">
        <template>
          <div class="article_title">标签栏支持路由模式，用于搭配vue-router使用。路由模式下会匹配页面路径和标签的to属性，并自动选中对应的标签</div>
          <div class="article_label">
            <span>英雄联盟官方</span>
            <span>2600评论</span>
          </div>
        </template>
        <template slot="right-icon">
          <van-image
            width="6.5rem"
            height="5rem"
            fit="fit"
            src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
          />
        </template>
      </van-cell>
    </EasyRefresh>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "没有更多了",
      isFixed: false
    };
  },
  methods: {
    onRefresh() {},
    loadMore() {},
    easyRefreshTop(number) {
      if (number > 159) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    }
  }
};
</script>

<style scoped>
.article_title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 1.2rem;
  padding-right: 0.2rem;
}
.article_label {
  padding: 0.3rem 0;
  font-size: 0.8rem;
  color: #999;
}
.article_label span {
  margin-right: 0.5rem;
}
/* .van-tabs-title {
  position: absolute;
  top: 0;
} */
</style>