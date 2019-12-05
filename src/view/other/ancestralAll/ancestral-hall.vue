<template>
  <div>
    <van-notice-bar text="文字内容多于一行时，可通过scrollable参数控制是否开启滚动" left-icon="volume-o" mode="closeable"/>
    <van-cell-group>
      <van-cell is-link :center="true">
        <van-image
          round
          class="member-list"
          width="2.5rem"
          height="2.5rem"
          src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190719/156352098551333745.jpg"
          v-for="i in 5"
          :key="i"
        />
        <span slot="right-icon">
          <span class="right-member">136成员</span>
          <van-icon class="right-member" name="arrow" />
        </span>
      </van-cell>
    </van-cell-group>
    
    <div class="swipe-banner">
      <van-swipe :autoplay="3000" indicator-color="white" style="height: 180px;">
        <van-swipe-item>
          <img
            src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190719/156352098551333745.jpg"
            width="100%"
            height="100%"
          />
        </van-swipe-item>
        <van-swipe-item>
          <img
            src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190719/156352098551333745.jpg"
            width="100%"
            height="100%"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- <van-row class="ranking">
      <van-col span="12">
        <van-cell value="内容" class="ranking-cell" :center="true">
          <van-icon slot="icon" name="static/images/first.png" size="24" />
        </van-cell>
      </van-col>
      <van-col span="12">
        <van-cell value="内容" class="ranking-cell" :center="true">
          <van-icon slot="icon" name="static/images/second.png" size="24" />
        </van-cell>
      </van-col>
      <van-col span="12">
        <van-cell value="内容" class="ranking-cell" :center="true">
          <van-icon slot="icon" name="static/images/third.png" size="24" />
        </van-cell>
      </van-col>
      <van-col span="12">
        <van-cell value="内容" class="ranking-cell" :center="true">
          <van-icon slot="icon" name="static/images/fourth.png" size="24" />
        </van-cell>
      </van-col>
    </van-row>-->
    <van-grid :border="false" style="margin-top:1px;">
      <van-grid-item icon="photo-o" text="族谱" />
      <van-grid-item icon="photo-o" text="公告" />
      <van-grid-item icon="photo-o" text="文件" />
      <van-grid-item icon="photo-o" text="建议" />
    </van-grid>
    <van-tabs v-model="active">
      <van-tab title="话题">
        <div
          class="conversation"
          v-for="(item, index) in $store.getters.conversation"
          :key="index"
          @click="jumpPage(`/talk/${item.id}`)"
        >
          <van-cell :border="false" style="padding-bottom: 0;">
            <van-image
              slot="icon"
              round
              width="3rem"
              height="3rem"
              :src="$url + item.headUrl"
              @click.stop
            />

            <template>
              <div class="userInfo">
                <p class="userInfo-p">
                  {{item.name}}
                  <img
                    src="static/images/man.png"
                    width="12px"
                    v-if="item.sex*1 === 1"
                  />
                  <img src="static/images/woman.png" width="12px" v-if="item.sex*1 === 0" />
                </p>
                <p class="userInfo-p">
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
                  <van-image
                    width="100%"
                    height="100%"
                    :src="$url + v"
                    @click.stop="imagePreview(item.imgsUrl)"
                  />
                </van-grid-item>
              </van-grid>

              <van-grid
                :border="false"
                :column-num="2"
                square
                v-if="item.imgsUrl.length === 4 || item.imgsUrl.length === 2"
              >
                <van-grid-item v-for="(v, k) in item.imgsUrl" :key="k">
                  <van-image
                    width="100%"
                    height="100%"
                    :src="$url + v"
                    @click.stop="imagePreview(item.imgsUrl)"
                  />
                </van-grid-item>
              </van-grid>

              <van-grid :border="false" :column-num="1" v-if="item.imgsUrl.length === 1">
                <van-grid-item v-for="(v, k) in item.imgsUrl" :key="k">
                  <van-image
                    width="100%"
                    height="100%"
                    :src="$url + v"
                    @click.stop="imagePreview(item.imgsUrl)"
                  />
                </van-grid-item>
              </van-grid>
            </template>
          </van-cell>
          <van-cell>
            <template>
              <van-row>
                <van-col span="12" class="operation">
                  <van-icon name="chat-o" class="i" />
                  <span>{{item.comment_num}}</span>
                </van-col>
                <van-col span="12" class="operation">
                  <van-icon name="good-job-o" class="i" />
                  <span>{{item.fabulous_num}}</span>
                </van-col>
              </van-row>
            </template>
          </van-cell>
        </div>
      </van-tab>
      <van-tab title="帖子"></van-tab>
      <van-tab title="投票"></van-tab>
    </van-tabs>
    <!-- first -->
    <div class="menu-group">
      <div class="menu-position">
        <van-icon
          name="static/images/push_full.png"
          size="44"
          class="relative"
          @click="isMenu = !isMenu"
        />
        <transition name="van-fade">
          <van-button type="primary" class="menu-item vote" v-if="isMenu">投票</van-button>
        </transition>
        <transition name="van-fade">
          <van-button type="primary" class="menu-item posting" v-if="isMenu">发帖</van-button>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { ImagePreview } from "vant";

Vue.use(ImagePreview);
export default {
  data() {
    return {
      isMenu: false,
      active: 0
    };
  },
  methods: {
    imagePreview(imgs) {
      let imgsArray = imgs.map(item => {
        return this.$url + item;
      });
      ImagePreview(imgsArray);
    }
  }
};
</script>
<style  scoped>
.menu-group {
  position: fixed;
  right: 1rem;
  bottom: 3rem;
  width: 44px;
  height: 44px;
  background-color: #fff;
  border-radius: 50%;
}
.menu-position {
  position: relative;
}
.relative {
  position: absolute;
  top: 0;
  left: 0;
}
.menu-item {
  position: absolute;
  padding: 0;
  width: 44px;
  border-radius: 50%;
}
.posting {
  top: -48px;
}
.vote {
  left: -48px;
}
.swipe-banner {
  background-color: #fff;
  padding: 10px 15px;
}

.ranking {
  background-color: #fff;
  padding: 0 15px;
}
.ranking-cell {
  padding: 0.3rem 0;
}
.member-list {
  margin-right: 0.3rem;
}
.userInfo {
  padding: 0.2rem 0.5rem 0;
}
.userInfo-p:nth-of-type(1) {
  font-size: 1rem;
}
.userInfo-p {
  line-height: 1.5rem;
}
.userInfo-p:nth-of-type(2) {
  font-size: 0.8rem;
  color: #999;
}
.content-box {
  padding: 0 0.3rem;
}
.text {
  font-size: 0.9rem;
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
.right-member {
  vertical-align: middle;
}
</style>

<style>
.conversation .van-grid-item__content {
  padding: 4px;
}
.conversation .van-count-down {
  color: #999;
  font-size: 0.8rem;
}
</style>