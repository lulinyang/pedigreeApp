<template>
  <div>
    <van-cell>
      <textarea placeholder="建议内容" class="textarea" v-model="content"></textarea>
      <van-button type="info" class="textarea-btn" @click="submit" :disabled="isSave">发布建议</van-button>
    </van-cell>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      ancestral_id: "",
      content: '',
      isSave: false
    };
  },
  created() {
    this.ancestral_id = this.$route.params.id;
  },
  methods: {
    submit() {
      this.isSave = true;
      const params = {
        ancestral_id: this.ancestral_id,
        content: this.content,
      }
      if(params.content === "") {
        this.$toast("内容不能为空！");
        this.isSave = false;
        return false;
      }

      http.saveProposal(params).then(res => {
        this.$toast(res.data.stateMsg);
        this.$router.go(-1);
      }).catch(error => {
        this.isSave = false;
      });
    }
  }
};
</script>

<style scoped>
.textarea {
  width: 100%;
  height: 15rem;
  border: 0;
  border-radius: 0.3rem;
  background-color: #f8f8f8;
  padding: 0.5rem;
}
.textarea-btn {
  margin: 2rem 0;
  width: 100%;
}
</style>