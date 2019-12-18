<template>
  <div>
    <van-cell title="投票" :center="true" :border="false">
      <van-button type="info" class="btn-push" @click="push" :disabled="isPush">发布</van-button>
    </van-cell>
    <van-cell :center="true" :border="false">
      <textarea class="textarea" placeholder="投票描述" v-model="title"></textarea>
    </van-cell>
    <van-cell :center="true" :border="false" v-for="(item, index) in contents" :key="index">
      <input type="text" v-model="item.content" class="vote-input" placeholder="投票对象" />
      <div slot="right-icon" class="close-btn">
        <van-icon name="cross" @click="delItem(index)" />
      </div>
    </van-cell>
    <van-cell :center="true" :border="false">
      <div slot="title" class="add-item" @click="addItem">+添加投票对象</div>
    </van-cell>
  </div>
</template>

<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      title: "",
      contents: [{ content: "" }],
      isPush: false
    };
  },
  methods: {
    addItem() {
      this.contents.push({ content: "" });
    },
    delItem(index) {
      if (this.contents.length < 2) {
        this.$toast("投票对象最少一个");
        return false;
      }
      this.contents.splice(index, 1);
    },
    push() {
      this.isPush = true;
      if (this.title == "") {
        this.isPush = false;
        this.$toast("投票描述不能为空！");
        return false;
      }

      try {
        this.contents.forEach(element => {
          if (element.content == "") {
            throw new Error("跳出循环");
          }
        });
      } catch (error) {
        this.isPush = false;
        this.$toast("投票对象不能为空！");
        return false;
      }
      http
        .addVote({
          title: this.title,
          contents: this.contents,
          ancestral_id: this.$route.params.id
        })
        .then(res => {
          this.isPush = true;
          this.$toast(res.data.stateMsg);
          this.$router.go(-1);
        });
    }
  }
};
</script>

<style scoped>
.btn-push {
  width: 80px;
  height: 40px;
  line-height: 40px;
}
.textarea {
  width: 100%;
  height: 9rem;
  background-color: #f8f8f8;
  border: 0;
  padding: 0.5rem;
  border-radius: 0.3rem;
}
.vote-input {
  width: 100%;
  background-color: #f8f8f8;
  border: 0;
  padding: 0.5rem;
  border-radius: 0.3rem;
}
.close-btn {
  padding: 0 0.5rem;
}
.add-item {
  color: #1989fa;
}
</style>