<template>
  <div>
    <van-cell>
      <div class="cell-content" v-html="member.brief_introduction"></div>
    </van-cell>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      id: "",
      member: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getMember();
  },
  methods: {
    getMember() {
      http.getMember({ id: this.id }).then(res => {
        this.member = res.data.data;
      });
    }
  }
};
</script>


<style scoped>
.cell-content {
  text-align: left;
}
</style>