<template>
  <div>
    <div class="top-nav">
      <van-tabs v-model="active" color="#1989FA" title-active-color="#1989FA" @change="selectTab">
        <van-tab title="已加入">
          <div class="my-ancestral" :style="{height: (viewportHeight-38) + 'px'}">
            <div class="card-box" v-for="(item, index) in myAncestral" :key="index" @click.stop="jumpPage(`/ancestral-hall/${item.id}`, item.name)">
              <van-cell>
                <span class="left-title">{{item.name}}</span>
                <div slot="right-icon">
                  <span class="right-nember">{{item.member_num}}成员</span>
                  <van-button type="warning" size="small" v-if="!item.isAdmin" @click="quitApply(item.id)">退出宗祠</van-button>
                </div>
              </van-cell>
              <van-cell>
                <p>{{item.describe}}</p>
              </van-cell>
              <van-cell
                :center="true"
                class="admin"
                @click.stop="jumpPage('/user-list', item.name + '-管理员', item.admin)"
              >
                <span v-for="(adminItem, i) in item.admin" :key="i">
                  <van-image
                    round
                    class="admin_headUrl"
                    width="2rem"
                    height="2rem"
                    :src="$url + adminItem.headUrl"
                    v-if="i < 4"
                  />
                </span>
                <div slot="right-icon" class="Administrators_span">
                  <span class="Administrators_icon">管理员</span>
                  <van-icon name="arrow" class="Administrators_icon" />
                </div>
              </van-cell>
            </div>
          </div>
        </van-tab>
        <van-tab title="已申请">
          <div class="my-ancestral" :style="{height: (viewportHeight-38) + 'px'}">
            <div class="card-box" v-for="(item, index) in applyAncestral" :key="index">
              <van-cell>
                <span class="left-title">{{item.name}}</span>
                <div slot="right-icon">
                  <span class="right-nember">{{item.member_num}}成员</span>
                  <van-button type="warning" size="small" @click="cancelApply(item.id)" >取消申请</van-button>
                </div>
              </van-cell>
              <van-cell>
                <p>{{item.describe}}</p>
              </van-cell>
              <van-cell
                :center="true"
                class="admin"
                @click="jumpPage('/user-list', item.name, item.admin)"
              >
                <span v-for="(adminItem, i) in item.admin" :key="i">
                  <van-image
                    round
                    class="admin_headUrl"
                    width="2rem"
                    height="2rem"
                    :src="$url + adminItem.headUrl"
                    v-if="i < 4"
                  />
                </span>
                <div slot="right-icon" class="Administrators_span">
                  <span class="Administrators_icon">管理员</span>
                  <van-icon name="arrow" class="Administrators_icon" />
                </div>
              </van-cell>
            </div>
          </div>
        </van-tab>
        <van-tab title="未加入">
          <div class="scroll-box" :style="{height: viewportHeight + 'px'}">
            <scroller
              style="background-color: #f8f8f8;"
              :on-refresh="refresh"
              :on-infinite="infinite"
              ref="list"
              :refreshText="'下拉刷新'"
              :noDataText="message"
            >
              <div class="card-box" v-for="(item, index) in list" :key="index">
                <van-cell>
                  <span class="left-title">{{item.name}}</span>
                  <div slot="right-icon">
                    <span class="right-nember">{{item.member_num}}成员</span>
                    <van-button
                      type="primary"
                      size="small"
                      @click="apply(item)"
                    >申请加入</van-button>
                  </div>
                </van-cell>
                <van-cell>
                  <p>{{item.describe}}</p>
                </van-cell>
                <van-cell
                  :center="true"
                  class="admin"
                  @click="jumpPage('/user-list', item.name + '-管理员', item.admin)"
                >
                  <span v-for="(adminItem, i) in item.admin" :key="i">
                    <van-image
                      round
                      class="admin_headUrl"
                      width="2rem"
                      height="2rem"
                      :src="$url + adminItem.headUrl"
                      v-if="i < 4"
                    />
                  </span>
                  <div slot="right-icon" class="Administrators_span">
                    <span class="Administrators_icon">管理员</span>
                    <van-icon name="arrow" class="Administrators_icon" />
                  </div>
                </van-cell>
              </div>
            </scroller>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <van-dialog
      v-model="show"
      closeOnPopstate
      showCancelButton
      @cancel="show = false"
      @confirm="applyActive"
    >
      <div class="remark-box">
        <div class="remark-title">宗祠申请</div>
        <van-field
          v-model="applyParams.remark"
          rows="3"
          autosize
          type="textarea"
          placeholder="请输入备注"
          class="input-remark"
        />
      </div>
    </van-dialog>
  </div>
</template>
<script>
import http from "@/http/server/api";
export default {
  data() {
    return {
      keyword: "",
      active: 0,
      params: {
        page: 1,
        pageSize: 8
      },
      list: [],
      listIds: [],
      viewportHeight: document.documentElement.clientHeight - 50,
      message: "没有更多了",
      show: false,
      applyParams: {
        remark: ""
      },
      item: {},
      myAncestral: [],
      applyAncestral: []
    };
  },
  created() {
    this.getAlreadyAncestral();
    this.getApplyAncestral();
  },
  methods: {
    selectTab(index) {
      console.log('index', index);
      if(index === 0) {
        this.getAlreadyAncestral();
      }else if(index === 1)  {
        this.getApplyAncestral();
      }
    },
    getApplyAncestral() {
      http.getApplyAncestral({}).then(res => {
        this.applyAncestral = res.data.data;
      });
    },
    cancelApply(id) {
      http.cancelAncestral({ancetral_id: id}).then(res => {
        this.$toast(res.data.stateMsg);
        this.getApplyAncestral();
      });
    },
    quitApply(id) {
      http.cancelAncestral({ancetral_id: id}).then(res => {
        this.$toast('您已退出宗祠');
        this.getAlreadyAncestral();
      });
    },
    getAlreadyAncestral() {
      let uid = localStorage.getItem("uid");
      if (uid) {
        http.getAlreadyAncestral({}).then(res => {
          this.myAncestral = res.data.data.map(item => {
            if (item.administrators.split(",").indexOf(uid) !== -1) {
              item.isAdmin = true;
            } else {
              item.isAdmin = false;
            }
            return item;
          });
        });
      }
    },
    applyActive() {
      http.applyAncestral(this.applyParams).then(res => {
        this.$toast(res.data.stateMsg);
        this.active = 1;
      });
    },
    apply(item) {
      let isAuthentication = this.$store.getters.userInfo.isAuthentication;
      if (isAuthentication * 1 === 0) {
        this.$router.push("/real-name");
      } else {
        let admin_ids = [];
        item.admin.forEach(element => {
          admin_ids.push(element.id);
        });
        this.item = item;
        this.applyParams = {
          admin_ids: admin_ids.toString(),
          ancetral_id: item.id,
          remark: ""
        };
        this.show = true;
      }
    },
    jumpPage(page, navTitle, list) {
      let isAuthentication = this.$store.getters.userInfo.isAuthentication;
      if (isAuthentication * 1 === 0) {
        this.$router.push("/real-name");
        return false;
      }
      if (navTitle) {
        localStorage.setItem("navTitle", navTitle);
      }
      if (list) {
        list = list.map(item => {
          item.role = 1;
          return item;
        });
        this.$store.commit("setMemberList", list);
      }
      this.$router.push(page);
    },
    refresh() {
      this.params.page = 1;
      this.getAncestral(true);
    },
    infinite() {
      this.getAncestral();
    },
    onSearch() {},
    getAncestral(isRefresh = false) {
      http.getAncestral(this.params).then(res => {
        const data = res.data.data;
        if (isRefresh) {
          this.$refs.list.finishPullToRefresh(true);
          this.list = [];
          this.listIds = [];
        }
        data.data.forEach(item => {
          this.params.page = data.current_page + 1;
          if (this.listIds.indexOf(item.id) === -1) {
            this.list.push(item);
            this.listIds.push(item.id);
          }
        });
        if (data.total == 0) {
          this.message = "暂无数据";
          this.$refs.list.finishInfinite(true);
        } else if (data.current_page >= data.last_page && data.total > 0) {
          this.message = "没有更多了";
          this.$refs.list.finishInfinite(true);
        } else {
          this.$refs.list.finishInfinite(false);
        }
      });
    }
  }
};
</script>
<style scoped>
.scroll-box {
  /* margin-top: 40px; */
  position: relative;
}
.card-box {
  width: 95%;
  margin: 0.5rem auto;
  background-color: #fff;
  -moz-box-shadow: 1px 0px 15px #999;
  -webkit-box-shadow: 1px 0px 15px #999;
  box-shadow: 1px 0px 15px #999;
  border-radius: 0.2rem;
  overflow: hidden;
}
.left-title {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}
.right-nember {
  color: #ff976a;
  font-size: 0.8rem;
  margin-right: 0.5rem;
}
.tag {
  margin-right: 0.5rem;
}
.top-nav {
  position: fixed;
  top: 44px;
  width: 100%;
  z-index: 999;
}
.Administrators_span {
  display: inline-block;
  color: #999;
}
.Administrators_icon {
  vertical-align: middle;
}
.admin_headUrl {
  border-radius: 50%;
  margin-right: 0.5rem;
}
.search-box {
  /* border-bottom: 1px solid #f8f8f8; */
  border-top: 1px solid #f8f8f8;
  height: 44px;
}
.remark-title {
  padding: 0.8rem 0;
  text-align: center;
}
.input-remark {
  border-top: 1px solid #f8f8f8;
  border-bottom: 1px solid #f8f8f8;
}
.my-ancestral {
  overflow-y: auto;
  /* padding-bottom: 1rem; */
}
</style>
