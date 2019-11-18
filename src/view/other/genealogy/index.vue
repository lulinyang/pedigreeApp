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
        <van-grid-item icon="photo-o" text="1222评论">
          <van-icon slot="icon" name="static/images/message_full.png" size="24"/>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="100赞">
          <van-icon slot="icon" name="static/images/fabulous.png" size="24"/>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="1000收藏">
          <van-icon slot="icon" name="static/images/collection.png" size="24"/>
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
      data: {}
    };
  },
  created() {
    this.getGenealogyById(this.$route.params.id);
  },
  methods: {
    getGenealogyById(id) {
      http.getGenealogyById({ id: id }).then(res => {
        // window.console.log("res=>", res.data.data);
        this.data = res.data.data;
      });
    }
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