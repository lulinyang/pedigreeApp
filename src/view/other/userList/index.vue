<template>
  <div>
    <van-cell
      v-for="(item, index) in $store.getters.memberList"
      :key="index"
      :center="true"
      is-link
      :to="`/card/${item.id}`"
    >
      <van-image slot="icon" round class="admin_headUrl" width="3.5rem" height="3.5rem" :src="$url + item.headUrl" />
      <p class="info-p">
        <span class="info-name">{{item.name}}</span>
        <van-icon name="static/images/man.png" size="10"/>
      </p>
      <p class="info-p" style="color:#999;">+86 {{item.username}}</p>
    </van-cell>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  created() {
    
    console.log("setMemberList", this.$store.getters.memberList);
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
</style>