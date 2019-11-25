<template>
  <div class="brief_introduction">
    <van-cell :border="false">
      <template>
        <div class="describe">{{data.describe}}</div>
        <van-divider content-position="left">家族简介</van-divider>
        <div v-html="data.brief_introduction"></div>
      </template>
    </van-cell>
    <div class="footer footer-grid">
      <van-grid>
        <van-grid-item icon="photo-o" text="查看成员">
          <van-icon slot="icon" name="static/images/look.png" size="24"/>
        </van-grid-item>
        <van-grid-item icon="photo-o" :text="data.comment_num + '评论'">
          <van-icon slot="icon" name="static/images/message_full.png" size="24" @click="jumpPage(`/genealogy-comment/${data.id}`)"/>
        </van-grid-item>
        <van-grid-item icon="photo-o" :text="data.fabulous_num + '赞'">
          <van-icon slot="icon" name="static/images/fabulous.png" size="24" @click="fabulous(2, data)" v-if="!data.isFabulous"/>
          <van-icon slot="icon" name="static/images/fabulous_full.png" size="24" v-else/>
        </van-grid-item>
        <van-grid-item icon="photo-o" :text="data.collection_num + '收藏'">
          <van-icon slot="icon" name="static/images/collection.png" size="24" @click="saveCollection(2, data)" v-if="!data.isCollection"/>
          <van-icon slot="icon" name="static/images/collection_full.png" size="24" @click="cancelCollection(2, data)" v-else/>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      data: {
        fabulous_num: 0,
        collection_num: 0,
        comment_num: 0
      }
    };
  },
  created() {
    this.getGenealogyById(this.$route.params.id);
  },
  methods: {
    jumpPage(page) {
      this.$router.push(page);
    },
    getGenealogyById(id) {
      http.getGenealogyById({ id: id }).then(res => {
        this.data = res.data.data;
      });
    },
        //点赞
    fabulous(type, item) {
      const params = {
        type: type,
        theme_id: item.id
      };
      http.saveFabulous(params).then(res => {
        this.$toast("点赞成功！");
        window.console.log("res", res);
        item.isFabulous = true;
        item.fabulous_num = item.fabulous_num*1 + 1;
      });
    },
    saveCollection(type, item) {
      const params = {
        type: type,
        theme_id: item.id
      };
      http.saveCollection(params).then(res => {
        this.$toast("收藏成功！");
        window.console.log("res", res);
        item.isCollection = true;
        item.collection_num = item.collection_num*1 + 1;
      });
    },
    cancelCollection(type, item) {
      const params = {
        type: type,
        theme_id: item.id
      };
      http.cancelCollection(params).then(res => {
        this.$toast(res.data.stateMsg);
        window.console.log("res", res);
        item.isCollection = false;
        item.collection_num = item.collection_num*1 - 1;
      });
    },
  }
};
</script>
<style scoped>
.brief_introduction {
  padding-bottom: 60px;
  background-color: #fff;
}
img {
  width: 100%;
}
.footer {
  /* height: 40px; */
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: bisque;
}
</style>

<style>
.footer-grid .van-grid-item__content {
  padding: .3rem 0;
}
.footer-grid .van-grid-item__text {
  margin: 0;
}
</style>