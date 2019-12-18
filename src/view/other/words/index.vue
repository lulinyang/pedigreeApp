<template>
  <div>
    <van-field v-model="content" type="textarea" rows="10" placeholder="你想说的话" />
    <div class="upImgBox">
      <van-uploader
        class="upImg"
        v-model="fileList"
        multiple
        :max-count="9"
        preview-size="95"
        @delete="deleteImg"
        :before-read="beforeRead"
      />
    </div>
    <van-cell class="pushBtn">
      <template>
        <van-button type="info" size="large" round @click="submit" :disabled="isSave">发布</van-button>
      </template>
    </van-cell>
  </div>
</template>

<script>
import http from "@/http/server/api";
import { upFile } from "@/tools/functions";
export default {
  data() {
    return {
      value: "",
      fileList: [],
      imgs: [],
      content: "",
      toast: null,
      isSave: false
    };
  },
  methods: {
    beforeRead(file) {
      if (!(file instanceof Array)) file = [file];
      return true;
    },
    deleteImg(file, detail) {
      window.console.log("filefile", file, detail);
    },
    submit() {
      this.isSave = true;
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "正在发布，请稍等。。。"
      });
      let promises = [];
      this.fileList.forEach(item => {
        let fd = new FormData();
        fd.append("img", item.file);
        promises.push(
          new Promise((resolve, reject) => {
            upFile(this.$url + "/api/upImage", fd).then(res => {
              if (res.code * 1 === 200) {
                resolve(res.data);
              } else {
                reject(res.data);
              }
            });
          })
        );
      });
      new Promise((resolve, reject) => {
        Promise.all(promises)
          .then(res => {
            this.imgs = this.imgs.concat(res);
            resolve(this.imgs);
          })
          .catch(error => {
            window.console.log("error", error);
            reject(error);
          });
      }).then(res => {
        const params = {
          content: this.content,
          imgs: res.toString(),
          ancestral_id: this.$route.params.type
        };
        http.pushConversation(params).then(res => {
          this.$toast.clear();
          setTimeout(() => {
            this.$toast(res.data.stateMsg);
            this.$router.go(-1);
          }, 1000);
        }).catch(error => {
          this.isSave = false;
          window.console.log("error2", error);
        });
      });
    }
  }
};
</script>

<style scoped>
.upImg {
  margin-top: 0.5rem;
}
.pushBtn {
  background-color: #f8f8f8;
  padding: 2rem 0;
}
.upImgBox {
  padding: 20px;
  background-color: #fff;
}
</style>