
const common = {
  getters: {
    weather: state => {
			return state.weather;
    },
    weatherAll: state => {
			return state.weatherAll;
    },
    navTabs: state => {
			return state.navTabs;
    },
    articles: state => {
			return state.articles;
    },
    banners: state => {
			return state.banners;
    },
    menus: state => {
			return state.menus;
    },
    genealogyList: state => {
			return state.genealogyList;
    },
    conversation: state => {
			return state.conversation;
    },
    huangli: state => {
			return state.huangli;
    },
    active: state => {
			return state.active;
    },
    isStart: state => {
			return state.isStart;
    },
    memberList: state => {
			return state.memberList;
    },
    chatList: state => {
			return state.chatList;
    },
    unread_num_total: state => {
			return state.unread_num_total;
    },
  },
  //切换页面无感刷新，缓存设置
  state: {
    //今日天气及所在城市
    weather: {},
    //首页文章导航
    navTabs: [],
    //首页文章列表
    articles: [],
    //未来一周天气预报
    weatherAll: {},
    //首页轮播图
    banners: [],
    //首页菜单
    menus: [],
    //族谱列表
    genealogyList: [],
    //话题列表
    conversation: [],
    //老黄历
    huangli: {},
    // 首页底部导航索引
    active: 0,
    //是否已经展示启动页，监听返回键用
    isStart: false,
    //成员列表
    memberList: [],
    //聊天列表
    chatList: [],
    //未读数
    unread_num_total: ""
  },
  // actions: {
  // },
  mutations: {
    setWeather: (state, param) => {
			state.weather = param;
    },
    setWeatherAll: (state, param) => {
			state.weatherAll = param;
    },
    setNavTabs: (state, param) => {
			state.navTabs = param;
    },
    setArticles: (state, param) => {
			state.articles = param;
    },
    setBanners: (state, param) => {
			state.banners = param;
    },
    setMenus: (state, param) => {
			state.menus = param;
    },
    setGenealogyList: (state, param) => {
			state.genealogyList = param;
    },
    setConversation: (state, param) => {
			state.conversation = param;
    },
    setHuangli: (state, param) => {
			state.huangli = param;
    },
    setActive: (state, param) => {
			state.active = param;
    },
    setIsStart: (state, param) => {
			state.isStart = param;
    },
    setMemberList: (state, param) => {
			state.memberList = param;
    },
    setChatList: (state, param) => {
      state.chatList = param;
      // unread_num
      let unread_num_total = 0;
      param.forEach(item => {
        unread_num_total += parseInt(item.unread_num);
      });
      if(unread_num_total <= 0) {
        unread_num_total = "";
      }else if(unread_num_total > 99) {
        unread_num_total = "99+";
      }
      state.unread_num_total = unread_num_total.toString();
    },
  }
}
export default common