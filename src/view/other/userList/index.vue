<template>
  <div>
    <van-cell
      v-for="(item, index) in $store.getters.memberList"
      :key="index"
      :center="true"
      :to="`/card/${item.id}`"
    >
      <van-image slot="icon" round class="admin_headUrl" width="3.5rem" height="3.5rem" :src="$url + item.headUrl" />
      <p class="info-p">
        <span class="info-name">{{item.name}}</span>
        <van-icon name="static/images/man.png" size="10"/>
      </p>
      <p class="info-p" style="color:#999;">+86 {{item.username.replace(item.username.substring(3,7), "****")}}</p>
      <div slot="right-icon">
        <span class="text-center" v-if="item.role*1 === 1">管理员</span> 
        <span class="text-center" v-else>成员</span> 
        <van-icon class="text-center" name="arrow" />
      </div>
    </van-cell>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  created() {
    
    // console.log("setMemberList", this.$store.getters.memberList);
  },
  methods: {}
};
</script>

<style scoped>
.info-p {
  padding: 0 .5rem;
}
.info-name {
  margin-right: .3rem;
}
.text-center {
  vertical-align: middle;
}
</style>