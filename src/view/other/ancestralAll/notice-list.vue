<template>
  <div>
    <van-cell v-for="(item,index) in list" :key="index" :title="item.content"  :label="item.created_at" />
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getNoticeList(this.$route.params.id);
  },
  methods: {
    getNoticeList(id) {
      http.getNoticeList({ancestral_id: id, pageSize: 100}).then(res => {
        this.list = res.data.data.data;
      });
    }
  }
}
</script>

<style scoped>

</style>