<template>
  <div>
    <van-cell :border="false">
      <div class="vote_title">{{voteItem.title}}</div>
    </van-cell>
    <van-cell :border="false" class="vote_line-cell">
      <div class="vote_line"></div>
    </van-cell>
    <van-cell :border="false">
      <div class="btn-item-obj-box">
        <van-button
          class="btn-item-obj"
          type="primary"
          v-for="(item,index) in voteItem.vote_content"
          :key="index"
          :disabled="voteItem.isVote"
          @click="activeVote(item)"
        >{{item.content}}({{item.users.length}}票)</van-button>
      </div>
    </van-cell>
  </div>
</template>


<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      voteItem: {}
    };
  },
  created() {
    http.getVoteItem({ id: this.$route.params.id }).then(res => {
      res.data.data.vote_content = res.data.data.vote_content.map(item => {
        if (item.user_ids != "" && item.user_ids != null) {
          item.users = item.user_ids.split(",");
        } else {
          item.users = [];
        }
        return item;
      });
      this.voteItem = res.data.data;
    });
  },
  methods: {
    activeVote(item) {
      const params = { id: item.id, vote_id: this.$route.params.id };
      http.activeVoteItem(params).then(res => {
        this.$toast('投票成功！');
        this.voteItem.isVote = true;
        item.users.push(this.$store.getters.uid);
      });
    }
  }
};
</script>

<style scoped>
.btn-item-obj {
  width: 80%;
  margin-top: 0.5rem;
}
.btn-item-obj-box {
  text-align: center;
  /* padding-top: 3rem; */
}
.vote_line {
  width: 100%;
  height: 0.5rem;
  background-color: #f8f8f8;
}
.vote_line-cell {
  padding-top: 0;
  padding-bottom: 0;
}
</style>