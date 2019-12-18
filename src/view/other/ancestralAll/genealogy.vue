<template>
  <div class="list-box">
    <div class="genealogy-list" v-for="(item, index) in $store.getters.my_genealogy" :key="index">
      <van-cell @click="jumpPage(`/genealogy-details/${item.id}`, item.area_surname)">
        <template slot="icon">
          <van-image width="4.5rem" height="5.5rem" :src="$url + item.thumbnail" />
        </template>
        <template>
          <p class="title">{{item.area_surname}}</p>
          <p class="describe van-multi-ellipsis--l3">{{item.describe}}</p>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {};
  },
  created() {
    // console.log(
    //   "$store.getters.my_genealogy",
    //   this.$store.getters.my_genealogy
    // );
  },
  methods: {
    jumpPage(page, area_surname) {
      if (area_surname) {
        localStorage.setItem("navTitle", area_surname);
      }
      this.$router.push(page);
    }
  }
};
</script>

<style scoped>
.title,
.describe {
  padding: 0 0.5rem;
}
.title {
  font-size: 1.2rem;
}
.describe {
  font-size: 1rem;
  line-height: 1.2rem;
  color: #999;
}
.genealogy-list {
  width: 90%;
  margin: 0.5rem auto 0;
  border-radius: 0.3rem;
  overflow: hidden;
  -moz-box-shadow: 1px 0px 15px #999;
  -webkit-box-shadow: 1px 0px 15px #999;
  box-shadow: 1px 0px 15px #999;
}
</style>