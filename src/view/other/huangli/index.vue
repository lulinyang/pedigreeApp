<template>
  <div class="huangli">
    <van-cell-group :border="false" class="cell-group-title">
      <van-cell class="huangli-time">
        <span slot="title">{{$store.getters.huangli.yangli}}</span>
        <span class="huangli-week">{{$store.getters.huangli.week}}</span>
        <span slot="label" class="huangli-label">{{$store.getters.huangli.yinli}}</span>
      </van-cell>
    </van-cell-group>
    <van-cell-group :border="false" title="冲煞" class="cell-group-title">
      <van-cell>
        <span>{{$store.getters.huangli.chongsha}}</span>
      </van-cell>
    </van-cell-group>

    <van-cell-group :border="false" title="五行" class="cell-group-title">
      <van-cell>
        <span>{{$store.getters.huangli.wuxing}}</span>
      </van-cell>
    </van-cell-group>

    <van-cell-group :border="false" title="吉神宜趋" class="cell-group-title">
      <van-cell>
        <span>{{$store.getters.huangli.jishen}}</span>
      </van-cell>
    </van-cell-group>
   
    <van-cell-group :border="false" title="彭祖百忌" class="cell-group-title">
      <van-cell>
        <span>{{$store.getters.huangli.baiji}}</span>
      </van-cell>
    </van-cell-group>
    <van-cell-group :border="false" class="cell-group-title">
      <van-cell :border="false">
        <span slot="icon" class="xiong">凶</span>
        <span>{{$store.getters.huangli.xiongshen}}</span>
      </van-cell>

      <van-cell :border="false">
        <span slot="icon" class="xiong yi">宜</span>
        <span>{{$store.getters.huangli.yi}}</span>
      </van-cell>

      <van-cell :border="false">
        <span slot="icon" class="xiong ji">忌</span>
        <span>{{$store.getters.huangli.ji}}</span>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {};
  },
  created() {
    this.getHuangLi();
  },
  methods: {
    getHuangLi() {
      http.getHuangLi({}).then(res => {
        var a = ["日", "一", "二", "三", "四", "五", "六"];
        var week = new Date().getDay();
        var str = "周" + a[week];
        res.data.data.week = str;
        this.$store.commit("setHuangli", res.data.data);
        console.log(this.$store.getters.huangli);
      });
    }
  }
};
</script>

<style scoped>
.huangli {
  min-height: 100%;
  background-color: #fff;
  padding: 20px;
}
.huangli-time {
  font-size: 1.4rem;
  padding: 20px 0;
}
.huangli-label {
  color: #ff976a;
  font-size: 1rem;
}
.xiong {
  display: inline-block;
  padding: 0.2rem;
  width: 1.2rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  background-color: #000;
  color: #fff;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.yi {
  background-color: #f4eece;
  color: #ff976a;
}
.ji {
  background-color: #dedede;
  color: #000;
}
.cell-group-title {
  border-bottom: 1px solid #f8f8f8;
}
</style>