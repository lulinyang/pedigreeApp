<template>
  <div>
    <van-cell>
      <input type="text" class="file-input" v-model="name" placeholder="文件名" />
    </van-cell>
    <van-cell :center="true">
      <div slot="right-icon">
        <van-uploader accept="*/*" :before-read="beforeRead" :after-read="afterRead">
          <van-button type="primary" class="file-btn">上传文件</van-button>
        </van-uploader>
      </div>
      <div class="file-btn-text">{{filename}}</div>
    </van-cell>
    <div class="btn-submit-box">
      <van-button type="info" class="btn-submit" @click="submit" :disabled="isSave">提交</van-button>
    </div>
  </div>
</template>

<script>
import http from "@/http/server/api";
import config from "@/config/index";
import { upFile } from "@/tools/functions";
export default {
  data() {
    return {
      name: "",
      filename: "",
      fd: new FormData(),
      isSave: false
    };
  },
  methods: {
    // 返回布尔值
    beforeRead(file) {
      let limit = config.limit_file_size / 1024 / 1024;
      if (file.size > config.limit_file_size) {
        this.$toast(`文件过大,最大可上${limit}M`);
        return false;
      }
      this.filename = file.name;
      return true;
    },
    afterRead(file) {
      this.fd.append("file", file.file);
    },
    submit() {
      this.isSave = true;
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "正在提交，请稍等。。。"
      });
      this.fd.append("name", this.name);
      this.fd.append("ancestral_id", this.$route.params.id);
      upFile(this.$url + "/api/uploadAncestralFile", this.fd)
        .then(res => {
          this.$toast.clear();
          if (res.code * 1 === 200) {
            this.$toast(res.stateMsg);
            this.$router.go(-1);
          } else {
            this.isSave = false;
            this.$toast(res.stateMsg);
          }
        })
        .catch(error => {
          this.$toast.clear();
          this.isSave = false;
        });
      console.log("this.fd", this.fd);
    }
  }
};
</script>

<style scoped>
.file-input {
  width: 100%;
  border: 0;
  background-color: #f8f8f8;
  padding: 0.5rem;
}
.van-uploader__wrapper {
  width: 100%;
}
.van-uploader__input-wrapper {
  width: 100%;
}
.file-btn {
  width: 100%;
}
.file-btn-text {
  color: #999;
}
.btn-submit-box {
  padding: 2rem 20px;
}
.btn-submit {
  width: 100%;
}
</style>