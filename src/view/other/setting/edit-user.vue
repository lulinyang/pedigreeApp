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

      <div v-if="$store.getters.userInfo.isAuthentication*1 === 1">
        <van-field
          @click="selectArea"
          v-model="userInfo.area_name"
          type="text"
          label="所在地"
          required
          input-align="right"
          class="selectInput"
          readonly
          placeholder="省-市-区/县"
        >
          <van-icon name="arrow" slot="right-icon" />
        </van-field>

        <van-field v-model="userInfo.address" type="text" label="详细地址" required placeholder="详细地址" />
        <van-field
          @click="selectBirthday"
          type="text"
          v-model="userInfo.birthday"
          label="生日"
          required
          input-align="right"
          class="selectInput"
          readonly
          placeholder="请选择"
        >
          <van-icon name="arrow" slot="right-icon" />
        </van-field>
      </div>
    </van-cell-group>

    <div class="edit-btn">
      <van-button type="info" class="edit-confim" round @click="editUser">保存</van-button>
    </div>

    <van-popup v-model="isArea" position="bottom">
      <van-area :area-list="areaList" @cancel="isArea = false" @confirm="confirmArea" />
    </van-popup>

    <van-popup v-model="isBirthday" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmBirthday"
      />
    </van-popup>
  </div>
</template>

<script>
import areas from "@/tools/areas";
import http from "@/http/server/api";
import { upFile } from "@/tools/functions";
export default {
  data() {
    return {
      userInfo: {},
      isArea: false,
      areaList: areas,
      isBirthday: false,
      maxDate: new Date(),
      currentDate: new Date(),
      minDate: new Date(1900 - 1 - 1)
    };
  },
  created() {
    this.$store.getters.userInfo.sex = this.$store.getters.userInfo.sex.toString();
    this.userInfo = this.$store.getters.userInfo;
    // this.userInfo = {
    //   username: this.$store.getters.userInfo.username,
    //   sex: this.$store.getters.userInfo.sex.toString(),
    //   name: this.$store.getters.userInfo.name,
    //   headUrl: this.$store.getters.userInfo.headUrl
    // };
  },
  methods: {
    selectArea() {
      this.isArea = true;
    },
    confirmArea(area) {
      let area_name = [];
      let area_code = [];
      area.forEach(item => {
        area_name.push(item.name);
        area_code.push(item.code);
      });
      this.userInfo.area_name = area_name.join("-");
      this.userInfo.area_code = area_code.join("-");
      this.isArea = false;
    },
    selectBirthday() {
      this.isBirthday = true;
    },
    confirmBirthday(birthday) {
      let year = birthday.getFullYear();
      let month = birthday.getMonth() + 1;
      let day = birthday.getDate();
      this.userInfo.birthday = year + "-" + month + "-" + day;
      this.isBirthday = false;
    },
    editUser() {
      http.editUserInfo(this.userInfo).then(res => {
        this.$toast(res.data.stateMsg);
        this.$store.commit("setUserInfo", res.data.data);
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
  padding: 1rem 0;
}
.edit-btn {
  margin: 2rem 0;
  background-color: #f8f8f8;
  text-align: center;
}
.edit-confim {
  width: 90%;
}
</style>