<template>
  <div>
    <div class="success-icon">
      <van-icon name="static/images/success.png" size="80" />
    </div>
    <van-cell-group>
      <van-field :value="$store.getters.userInfo.username" label="手机号" readonly />
      <van-field :value="$store.getters.userInfo.realname" label="真实姓名" readonly />
      <van-field :value="$store.getters.userInfo.identity_card" label="身份证号" readonly />
      <van-field :value="$store.getters.userInfo.email" label="邮箱" readonly />
      <van-field
        :value="$store.getters.userInfo.area_name + $store.getters.userInfo.address"
        label="地址"
        readonly
      />
      <van-field :value="$store.getters.userInfo.birthday" label="生日" readonly />
    </van-cell-group>

    <div class="submit-box">
      <van-button type="info" class="submit"  to="/home">返回首页</van-button>
    </div>
  </div>
</template>
<style scoped>
.success-icon {
  width: 100%;
  text-align: center;
  padding: 1rem 0;
  background-color: #fff;
}
.submit-box {
  text-align: center;
  padding: 40px 20px;
}
.submit {
  width: 100%;
}
</style>