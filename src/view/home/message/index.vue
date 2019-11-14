<template>
  <div class="homeBox2">
    <van-swipe-cell v-for="i in 65" :key="i">
      <van-cell @click="jumpPage(`/chat/${i}`, '最后一眼')">
        <template slot="icon">
          <van-image
            round
            width="3.5rem"
            height="3.5rem"
            src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190719/156352098551333745.jpg"
          />
        </template>
        <template>
          <div class="message">
            <p class="message-p">最后一眼{{i}}</p>
            <p
              class="message-p van-ellipsis"
            >将后台获取的数据，复制到vue组件的数据源后，再进行调用done函数。如果在之前调用,会循环调用。如果不调用这个函数，上拉获取数据函数调用不成功。</p>
          </div>
        </template>
        <template slot="right-icon">
          <div>
            <p class="time-msg">21:00</p>
             <p><van-tag round type="danger">99+</van-tag></p>
          </div>
        </template>
      </van-cell>
      <template slot="right">
        <van-button class="del" square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    jumpPage(page, title) {
      if(title !== undefined) {
        localStorage.setItem('otherTitle', title);
      }
      this.$router.push(page);
    }
  }
}
</script>

<style scoped>
.homeBox2 {
  /* overflow-y: auto; */
  padding-bottom: 70px;
  background-color: #f8f8f8;
}
.message {
  padding: 0.5rem 0.5rem 0;
}
.message-p:nth-of-type(1) {
  font-size: 1rem;
}
.message-p {
  line-height: 1.5rem;
}
.message-p:nth-of-type(2) {
  font-size: 0.8rem;
  color: #999;
}
.del {
  width: 5rem;
  height: 100%;
}
.time-msg {
  font-size: .8rem;
  color: #999;
  margin-top: .3rem;
}
</style>