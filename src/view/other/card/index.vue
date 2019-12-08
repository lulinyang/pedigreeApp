<template>
  <div>
    <van-cell :center="true" v-if="userInfo.id">
      <van-image slot="icon" width="4rem" height="4rem" :src="$url + userInfo.headUrl"/>
      <div slot="title" class="info-text">
        <span class="info-name">{{userInfo.name}}</span>
        <van-icon class="info-name" name="static/images/man.png" size="12" v-if="userInfo.sex*1 === 1"/>
        <van-icon class="info-name" name="static/images/woman.png" size="12" v-else/>
      </div>
      <span slot="label" class="info-text">+86 {{userInfo.username.replace(userInfo.username.substring(3,7), "****")}}</span>
    </van-cell>
    
    <van-cell-group style="margin-top:.5rem;">
      <van-cell title="生日" :value="userInfo.birthday" />
      <van-cell title="地区" :value="userInfo.area_name" />
      <van-cell title="个性签名" :value="userInfo.autograph" />
    </van-cell-group>

    <div class="btn-box" v-if="userInfo.id != $store.getters.uid">
      <van-button type="primary" class="btn" v-if="!userInfo.isFollow" @click="follow">关注</van-button>
      <van-button type="warning" class="btn" v-else @click="unfollow">取消关注</van-button>
      <van-button type="info" class="btn" @click="jumpPage(`/chat/${userInfo.id}`, userInfo.name)">私信</van-button>
    </div>
  </div>
</template>
<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      userInfo: {
        username: ""
      }
    }
  },
  created() {
    http.findUser({user_id: this.$route.params.id}).then(res => {
      this.userInfo = res.data.data;
    });
  },
  methods: {
    jumpPage(page, otherTitle) {
      if(otherTitle) {
        localStorage.setItem('otherTitle', otherTitle);
      }
      this.$router.push(page);
    },
    follow() {
      http.followUser({follow_id: this.userInfo.id}).then(res => {
        this.$toast(res.data.stateMsg);
        this.userInfo.isFollow = true;
      });
    },
    unfollow() {
      http.removeConcerns({follow_id: this.userInfo.id}).then(res => {
        this.$toast(res.data.stateMsg);
        this.userInfo.isFollow = false;
      });
    }
  }
}
</script>

<style scoped>
.info-text {
  padding: 0 0.5rem;
}
.info-name {
  vertical-align: middle;
  margin-right: 0.3rem;
}
.btn-box {
  padding: 2rem 0;
  text-align: center;
}
.btn {
  width: 95%;
  margin-bottom: 1rem;
}
</style>