<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, index) in list" :key="index" :center="true">
        <van-icon slot="icon" name="static/images/tar.png" size="30" />
        <div class="content">{{item.name}}.{{item.ext}}</div>
        <van-button slot="right-icon" type="info" size="small" @click="downLoadClick(item)">下载</van-button>
      </van-cell>
    </van-list>
    <div class="footer-h"></div>
    <div class="footer-box">
      <van-cell>
        <van-button
          type="info"
          class="footer-btn"
          @click="jumpPage(`/add-file/${$route.params.id}`)"
        >我要上传文件</van-button>
      </van-cell>
    </div>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      params: {
        pageSize: 15,
        page: 1
      },
      list: [],
      listIds: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      this.getAncestralFileList();
    },
    jumpPage(page) {
      this.$router.push(page);
    },
    getAncestralFileList(isRefresh = false) {
      this.params.ancestral_id = this.$route.params.id;
      http.getAncestralFileList(this.params).then(res => {
        const data = res.data.data;
        if (isRefresh) {
          this.finished = false;
          this.list = [];
          this.listIds = [];
        }
        data.data.forEach(item => {
          this.params.page = data.current_page + 1;
          if (this.listIds.indexOf(item.id) === -1) {
            this.list.push(item);
            this.listIds.push(item.id);
          }
        });
        this.loading = false;
        this.isLoading = false;
        this.message = "";
        if (data.total == 0) {
          this.message = "暂无数据";
          this.finished = true;
        } else if (data.current_page >= data.last_page && data.total > 0) {
          this.message = "没有更多了";
          this.finished = true;
        }
      });
    },
    download(item) {
      window.location.href = this.$url + item.link;
    },
    downLoadClick(item) {
      let _this = this;
      _this.lodingShow = true;
      let dtask = null;
      if (~navigator.userAgent.indexOf("Html5Plus")) {
        let plusReady = function(callback) {
          if (window.plus) {
            callback();
          } else {
            document.addEventListener("plusready", callback);
          }
        };
        plusReady(function() {
          // console.log( _this.$url + item.link);
          dtask = plus.downloader.createDownload(
            _this.$url + item.link,
            {
              method: "GET",
              filename: `_documents/download/${item.name}.${item.ext}`
            },
            function(d, status) {
              _this.lodingShow = false;
              if (status == 200) {
                // _this.alertVal = `<p>文件下载成功:</p>${d.filename}`;
                console.log('d.filename' + d.filename);
                console.log(JSON.stringify(d));
                _this.$toast("文件下载成功");
                plus.runtime.openFile(d.filename);
              } else {
                // _this.alertVal = "文件下载失败";
                _this.$toast("文件下载失败");
              }
            }
          );
          dtask.start();
        });
      }
    }
  }
};
</script>

<style scoped>
.content {
  padding-left: 0.5rem;
}
.footer-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.footer-btn {
  width: 100%;
}
.footer-h {
  height: 64px;
}
</style>