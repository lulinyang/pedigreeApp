<template>
  <div>
    <van-notice-bar :text="notice_content" left-icon="volume-o" mode="closeable" />
    <van-cell-group>
      <van-cell is-link :center="true" @click="lookMembers('/user-list', ancestralInfo.members)">
        <van-image
          round
          class="member-list"
          width="2.5rem"
          height="2.5rem"
          :src="$url + item.headUrl"
          v-for="(item, index) in ancestralInfo.members"
          :key="index"
        />
        <span slot="right-icon">
          <span class="right-member">{{ancestralInfo.members.length}}成员</span>
          <van-icon class="right-member" name="arrow" />
        </span>
      </van-cell>
    </van-cell-group>

    <div class="swipe-banner">
      <van-swipe :autoplay="3000" indicator-color="white" style="height: 180px;">
        <van-swipe-item v-for="(item, index) in ancestralInfo.banner_imgs" :key="index">
          <img :src="$url + item" width="100%" height="100%" />
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
      <van-grid-item text="族谱" @click="jumpPage('/genealogy-hall')">
        <van-icon slot="icon" size="45" name="static/images/home_menu1.png" />
      </van-grid-item>
      <van-grid-item text="公告" @click="jumpPage(`/notice-list/${ancestralInfo.id}`)">
        <van-icon slot="icon" size="45" name="static/images/home_menu2.png" />
      </van-grid-item>
      <van-grid-item text="文件" @click="jumpPage(`/file-list/${ancestralInfo.id}`)">
        <van-icon slot="icon" size="45" name="static/images/home_menu4.png" />
      </van-grid-item>
      <van-grid-item text="建议" @click="jumpPage(`/proposal/${ancestralInfo.id}`)">
        <van-icon slot="icon" size="45" name="static/images/home_menu6.png" />
      </van-grid-item>
    </van-grid>
    <van-tabs v-model="active" color="#1989FA" title-active-color="#1989FA">
      <van-tab title="话题">
        <div
          class="conversation"
          v-for="(item, index) in list"
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
                    @click.stop="imagePreview(item.imgsUrl, k)"
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
      <van-tab title="投票">
        <van-cell
          v-for="(item, index) in voteList"
          :key="index"
          is-link
          :center="true"
          :to="`/vote-content/${item.id}`"
        >
          <img slot="icon" :src="$url + item.headUrl" width="45" height="45" />
          <div slot="title" class="content-right">{{item.title}}</div>
          <div slot="label" class="content-right">{{item.username}}</div>
        </van-cell>
      </van-tab>
    </van-tabs>
    <div class="menu-group">
      <div class="menu-position">
        <van-icon
          name="static/images/push_full.png"
          size="44"
          class="relative"
          @click="isMenu = !isMenu"
        />
        <transition name="van-fade">
          <van-button
            type="primary"
            class="menu-item vote"
            v-if="isMenu"
            @click="jumpPage(`/add-vote/${ancestralInfo.id}`)"
          >投票</van-button>
        </transition>
        <transition name="van-fade">
          <van-button
            type="primary"
            class="menu-item posting"
            v-if="isMenu"
            @click="jumpPage(`/words/${ancestralInfo.id}`)"
          >话题</van-button>
        </transition>
        <!-- <transition name="van-fade">
          <van-button type="primary" class="menu-item talk" v-if="isMenu">发帖</van-button>
        </transition>-->
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { ImagePreview } from "vant";
import http from "@/http/server/api";
Vue.use(ImagePreview);
export default {
  data() {
    return {
      isMenu: false,
      active: 0,
      ancestralInfo: {
        members: []
      },
      list: [],
      listIds: [],
      params: {
        pageSize: 15,
        page: 1,
        ancestral_id: ""
      },
      voteList: [],
      params2: {
        pageSize: 15,
        page: 1,
        ancestral_id: ""
      },
      instance: null,
      notice_content: ""
    };
  },
  created() {
    this.params.ancestral_id = this.$route.params.id;
    this.params2.ancestral_id = this.$route.params.id;
    this.getAncestralInfo(this.$route.params.id);
    this.getConversationList();
    this.getVoteList();
    this.getNoticeNew(this.$route.params.id);
  },
  methods: {
    jumpPage(page) {
      if (page === "/genealogy-hall") {
        this.$store.commit("setMyGenealogy", this.ancestralInfo.genealogys);
      }
      this.$router.push(page);
    },
    lookMembers(page, members) {
      this.$store.commit("setMemberList", members);
      this.$router.push(page);
    },
    getAncestralInfo(id) {
      http.getAncestralInfo({ id: id }).then(res => {
        if (res.data.data.banners) {
          res.data.data.banner_imgs = res.data.data.banners.split(",");
        } else {
          res.data.data.banner_imgs = [];
        }
        this.ancestralInfo = res.data.data;
      });
    },
    imagePreview(imgs, index) {
      let imgsArray = imgs.map(item => {
        return this.$url + item;
      });
      this.instance = ImagePreview({
        images: imgsArray,
        startPosition: index
      });
    },
    getConversationList() {
      http.getConversationList(this.params).then(res => {
        const data = res.data.data;
        data.data.forEach(item => {
          this.params.page = data.current_page + 1;
          if (this.listIds.indexOf(item.id) === -1) {
            if (item.imgs) {
              item.imgsUrl = item.imgs.split(",");
            } else {
              item.imgsUrl = [];
            }
            let timestamp = parseInt(new Date().getTime());
            item.timestamp =
              timestamp - parseInt(new Date(item.created_at).getTime());
            this.list.push(item);
            this.listIds.push(item.id);
          }
        });
      });
    },
    getVoteList() {
      http.getVoteList(this.params2).then(res => {
        // console
        this.voteList = res.data.data.data;
      });
    },
    getNoticeNew(id) {
      http.getNoticeNew({ ancestral_id: id }).then(res => {
        if(res.data.data) {
          this.notice_content = res.data.data.content;
        }
      });
    }
  },
  destroyed() {
    if (this.instance) {
      this.instance.close();
    }
  }
};
</script>
<style  scoped>
.menu-group {
  position: fixed;
  right: 2rem;
  bottom: 4rem;
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
  top: -20px;
}
.talk {
  left: -38px;
  bottom: -80px;
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
.content-right {
  padding-left: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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