<template>
  <div class="homeBox">
    <scroller
      style="background-color: #f8f8f8;"
      :on-refresh="refresh"
      :on-infinite="infinite"
      ref="arcticeList"
      :refreshText="'下拉刷新'"
      :noDataText="message"
    >
      <div class="conversation">
        <van-cell :border="false" style="padding-bottom: 0;">
          <template slot="icon">
            <van-image
              round
              width="4rem"
              height="4rem"
              src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190719/156352098551333745.jpg"
            />
          </template>
          <template>
            <div class="userInfo">
              <p class="userInfo-p">最后一眼</p>
              <p class="userInfo-p">21:00</p>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <div class="content-box">
              <p class="text">
                将后台获取的数据，复制到vue组件的数据源后，再进行调用done函数。
                如果在之前调用,会循环调用。如果不调用这个函数，上拉获取数据函数调用不成功。
              </p>
            </div>
            <van-grid :border="false" :column-num="3" square>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
            </van-grid>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <van-row>
              <van-col span="12" class="operation">
                <van-icon name="chat-o" class="i" />
                <span>8</span>
              </van-col>
              <van-col span="12" class="operation">
                <van-icon name="good-job-o" class="i" />
                <span>8</span>
              </van-col>
            </van-row>
          </template>
        </van-cell>
      </div>

      <div class="conversation">
        <van-cell :border="false" style="padding-bottom: 0;">
          <template slot="icon">
            <van-image
              round
              width="4rem"
              height="4rem"
              src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190719/156352098551333745.jpg"
            />
          </template>
          <template>
            <div class="userInfo">
              <p class="userInfo-p">最后一眼</p>
              <p class="userInfo-p">21:00</p>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <div class="content-box">
              <p class="text">
                将后台获取的数据，复制到vue组件的数据源后，再进行调用done函数。
                如果在之前调用,会循环调用。如果不调用这个函数，上拉获取数据函数调用不成功。
              </p>
            </div>
            <van-grid :border="false" :column-num="2" square>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
              <van-grid-item>
                <van-image
                  width="100%"
                  height="100%"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
            </van-grid>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <van-row>
              <van-col span="12" class="operation">
                <van-icon name="chat-o" class="i" />
                <span>8</span>
              </van-col>
              <van-col span="12" class="operation">
                <van-icon name="good-job-o" class="i" />
                <span>8</span>
              </van-col>
            </van-row>
          </template>
        </van-cell>
      </div>
      <div class="conversation">
        <van-cell :border="false" style="padding-bottom: 0;">
          <template slot="icon">
            <van-image
              round
              width="4rem"
              height="4rem"
              src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190719/156352098551333745.jpg"
            />
          </template>
          <template>
            <div class="userInfo">
              <p class="userInfo-p">最后一眼</p>
              <p class="userInfo-p">21:00</p>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <div class="content-box">
              <p class="text">
                将后台获取的数据，复制到vue组件的数据源后，再进行调用done函数。
                如果在之前调用,会循环调用。如果不调用这个函数，上拉获取数据函数调用不成功。
              </p>
            </div>
            <van-grid :border="false" :column-num="1">
              <van-grid-item>
                <van-image
                  width="100%"
                  fit="fit"
                  src="https://lulinyang.oss-cn-beijing.aliyuncs.com/20190726/156413350839204345.jpg"
                />
              </van-grid-item>
            </van-grid>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <van-row>
              <van-col span="12" class="operation">
                <van-icon name="chat-o" class="i" />
                <span>8</span>
              </van-col>
              <van-col span="12" class="operation">
                <van-icon name="good-job-o" class="i" />
                <span>8</span>
              </van-col>
            </van-row>
          </template>
        </van-cell>
      </div>
    </scroller>

    <img class="push" @click="jumpPage('/words')" src="static/images/push_full.png" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "没有更多了"
    };
  },
  methods: {
    refresh() {
     
    },
    infinite() {
     
    },
    onRefresh() {},
    loadMore() {},
    jumpPage(page) {
      this.$router.push(page);
    }
  }
};
</script>

<style scoped>
.userInfo {
  padding: 0.7rem 0.5rem 0;
}
.userInfo-p:nth-of-type(1) {
  font-size: 1.2rem;
}
.userInfo-p {
  line-height: 1.5rem;
}
.userInfo-p:nth-of-type(2) {
  font-size: 0.9rem;
  color: #999;
}
.text {
  font-size: 1.1rem;
}
.conversation {
  margin-bottom: 0.5rem;
}
.operation {
  text-align: center;
}
.operation .i {
  font-size: 1.4rem;
}
.operation span {
  font-size: 1rem;
  color: #999;
  margin-left: 0.2rem;
  vertical-align: top;
}
.push {
  width: 3.5rem;
  height: 3.5rem;
  overflow: hidden;
  position: fixed;
  bottom: 80px;
  right: 10px;
  background-color: #fff;
  border-radius: 50%;
  -moz-box-shadow: 1px 0px 15px #999;
  -webkit-box-shadow: 1px 0px 15px #999;
  box-shadow: 1px 0px 15px #999;
  text-align: center;
}
</style>
<style>
.conversation .van-grid-item__content {
  padding: 4px;
}
</style>