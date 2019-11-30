<template>
  <div>
    <div class="card-box" v-for="(item, index) in historyToday" :key="index">
      <div class="card-content">
        <div>
          <span class="history-time">{{item.year}}年</span>
          <p><span class="history-title">{{item.title}}</span></p>
          <img :src="item.pic" width="100%;" class="history-img" v-if="item.pic">
          <p class="history-des">{{item.des}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      historyToday: []
    }
  },
  created() {
    http.getHistoryToday({}).then(res => {
      console.log('res', res.data);
      this.historyToday = res.data.data;
    });
  }
}
</script>

<style scoped>
.card-box {
  margin: .5rem auto 0;
  width: 92%;
  /* height: 300px; */
  background-color: #fff;
  -moz-box-shadow: 1px 0px 15px #999;
  -webkit-box-shadow: 1px 0px 15px #999;
  box-shadow: 1px 0px 15px #999;
  border-radius: .3rem;
}
.card-box:last-child {
  margin-bottom: .5rem;
}
.card-content {
  padding: 1rem;
}
.history-time {
 color: #f56c6c;
 margin-right: .5rem; 
}
.history-img {
  margin: .3rem 0;
}
.history-des {
  line-height: 1.4rem;
}
</style>