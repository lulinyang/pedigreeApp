<template>
  <div>
    <div class="headUrl">
      <van-uploader :after-read="afterRead">
        <van-image round width="5rem" height="5rem" :src="$url + userInfo.headUrl" />
      </van-uploader>
    </div>
    <van-cell-group>
      <van-field label="手机号" v-model="userInfo.username" disabled placeholder="请输入用户名" />
      <van-field label="昵称" v-model="userInfo.name" clearable placeholder="请输入昵称" />
      <van-field label="性别">
        <template slot="input">
          <van-radio-group v-model="userInfo.sex">
            <van-row>
              <van-col span="10">
                <van-radio name="1">男</van-radio>
              </van-col>
              <van-col span="10">
                <van-radio name="0">女</van-radio>
              </van-col>
            </van-row>
          </van-radio-group>
        </template>
      </van-field>
    </van-cell-group>
    <van-cell class="edit-btn">
      <van-button type="info" round size="large" @click="editUser">保存</van-button>
    </van-cell>
  </div>
</template>

<script>
import http from "@/http/server/api";
import { upFile } from "@/tools/functions";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    this.userInfo = {
      username: this.$store.getters.username,
      sex: this.$store.getters.sex.toString(),
      name: this.$store.getters.name,
      headUrl: this.$store.getters.headUrl
    };
  },
  methods: {
    editUser() {
      http.editUserInfo(this.userInfo).then(res => {
        this.$toast(res.data.stateMsg);
        this.$store.commit('setUserInfo', this.userInfo);
        this.$router.go(-1);
      });
    },
    afterRead(file) {
      let fd = new FormData();
      fd.append("img", file.file);
      upFile(this.$url + "/api/upImage", fd).then(res => {
        if (res.code * 1 === 200) {
          this.userInfo.headUrl = res.data;
        } else {
          this.$toast(res.stateMsg);
        }
      });
    }
  }
};
</script>

<style scoped>
.headUrl {
  text-align: center;
  padding: 2rem 0;
}
.edit-btn {
  margin-top: 3rem;
  width: 100%;
  background-color: #f8f8f8;
}
</style>