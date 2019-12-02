<template>
  <div>
    <van-field :value="$store.getters.userInfo.username" type="text" label="用户名" disabled />
    <van-field v-model="user.realname" type="text" label="真实姓名" required placeholder="真实姓名" />
    <van-field
      v-model="user.identity_card"
      type="text"
      label="身份证号"
      required
      placeholder="一经填写无法修改，请谨慎填写！"
    />
    <van-field v-model="user.email" type="text" label="邮箱" required placeholder="邮箱" />
    <van-field
      @click="selectArea"
      v-model="user.area_name"
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

    <van-field v-model="user.address" type="text" label="详细地址" required placeholder="详细地址" />
    <van-field
      @click="selectBirthday"
      type="text"
      v-model="user.birthday"
      label="生日"
      required
      input-align="right"
      class="selectInput"
      readonly
      placeholder="请选择"
    >
      <van-icon name="arrow" slot="right-icon" />
    </van-field>

    <div class="submit-box">
      <van-button type="info" class="submit" @click="submit">提交信息</van-button>
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
export default {
  data() {
    return {
      user: {
        realname: "",
        identity_card: "",
        email: "",
        area_name: "",
        address: "",
        birthday: ""
      },
      isArea: false,
      areaList: areas,
      isBirthday: false,
      maxDate: new Date(),
      currentDate: new Date(),
      minDate: new Date(1900 - 1 - 1)
    };
  },
  created() {
    if(this.$store.getters.userInfo.isAuthentication*1 === 1) {
      this.$router.push('/my');
    }
    this.user = this.$store.getters.userInfo;
  },
  methods: {
    submit() {
      var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      var emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (this.user.realname.replace(/\s*/g, "") === "") {
        this.$toast("真实姓名必填");
        return false;
      }
      if (this.user.identity_card.replace(/\s*/g, "") === "") {
        this.$toast("身份号必填");
        return false;
      }

      if (!idcardReg.test(this.user.identity_card)) {
        this.$toast("身份号不合法");
        return false;
      }
      if (this.user.email.replace(/\s*/g, "") === "") {
        this.$toast("邮箱必填");
        return false;
      }

      if (!emailReg.test(this.user.email)) {
        this.$toast("邮箱格式不正确");
        return false;
      }

      if (this.user.area_name.replace(/\s*/g, "") === "") {
        this.$toast("所在地必填");
        return false;
      }
      if (this.user.address.replace(/\s*/g, "") === "") {
        this.$toast("详细地址必填");
        return false;
      }
      if (this.user.birthday.replace(/\s*/g, "") === "") {
        this.$toast("生日必填");
        return false;
      }
      http.realAuthentication(this.user).then(res => {
        // console.log('res', res);
        this.$toast.success('认证成功');
        this.$store.commit('setUserInfo', res.data.data);
        this.$router.push('/real-success');
      });
    },
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
      this.user.area_name = area_name.join("-");
      this.user.area_code = area_code.join("-");
      this.isArea = false;
    },
    selectBirthday() {
      this.isBirthday = true;
    },
    confirmBirthday(birthday) {
      let year = birthday.getFullYear();
      let month = birthday.getMonth() + 1;
      let day = birthday.getDate();
      this.user.birthday = year + "-" + month + "-" + day;
      this.isBirthday = false;
    }
  }
};
</script>

<style scoped>
.submit-box {
  text-align: center;
  padding: 40px 20px;
}
.submit {
  width: 100%;
}
</style>