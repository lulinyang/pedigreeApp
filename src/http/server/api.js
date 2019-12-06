import extendsApi from './extendsApi'

class AllServiceApi extends extendsApi {
  constructor() {
    super()
  }
  //登录
  login(params) {
    return this.sendPost('/api/login', params);
  }
  //得到文章类目
  getColumn(params) {
    return this.sendPost('/api/getColumn', params);
  }
  //getArctice
  getArctice(params) {
    return this.sendPost('/api/getArctice', params);
  }
  //族谱列表
  getGenealogy(params) {
    return this.sendPost('/api/getGenealogy', params);
  }
  //注册
  register(params) {
    return this.sendPost('/api/addUser', params);
  }
  //获取验证码
  sendMsg(params) {
    return this.sendPost('/api/sendMsg', params);
  }
  //上传图片
  upImage(params) {
    return this.sendPost('/api/upImage', params);
  }
  //发布话题
  pushConversation(params) {
    return this.sendPost('/api/pushConversation', params);
  }
  //话题列表
  getConversationList(params) {
    return this.sendPost('/api/getConversationList', params);
  }
  //得到用户信息
  getUserById(params) {
    return this.sendPost('/api/getUserById', params);
  }
  //修改密码
  changePassword(params) {
    return this.sendPost('/api/changePassword', params);
  }
  //根据ID获取文章
  getArticleById(params) {
    return this.sendPost('/api/getArticleById', params);
  }
  //族谱详情
  getGenealogyById(params) {
    return this.sendPost('/api/getGenealogyById', params);
  }
  //评论
  saveComment(params) {
    return this.sendPost('/api/saveComment', params);
  }
  //获取评论
  getComment(params) {
    return this.sendPost('/api/getComment', params);
  }
  //记录文章浏览数
  addBrowseNumArctice(params) {
    return this.sendPost('/api/addBrowseNumArctice', params);
  }
  //点赞
  saveFabulous(params) {
    return this.sendPost('/api/saveFabulous', params);
  }
  //收藏
  saveCollection(params) {
    return this.sendPost('/api/saveCollection', params);
  }
  //取消收藏
  cancelCollection(params) {
    return this.sendPost('/api/cancelCollection', params);
  }
  //记录话题浏览量
  addBrowseNumConversation(params) {
    return this.sendPost('/api/addBrowseNumConversation', params);
  }
  //话题详情
  getConversationById(params) {
    return this.sendPost('/api/getConversationById', params);
  }
  //编辑用户信息
  editUserInfo(params) {
    return this.sendPost('/api/editUserInfo', params);
  }
  //设置用户经纬度并得到地址和天气
  setPosition(params) {
    return this.sendPost('/api/setPosition', params);
  }
  //获取首页轮播图
  getBanner(params) {
    return this.sendPost('/api/getBanner', params);
  }
  //获取首页菜单
  getMenu(params) {
    return this.sendPost('/api/getMenu', params);
  }
  //获取历史上的今天
  getHistoryToday(params) {
    return this.sendPost('/api/getHistoryToday', params);
  }
  //得到黄历
  getHuangLi(params) {
    return this.sendPost('/api/getHuangLi', params);
  }
  //获取宗祠列表
  getAncestral(params) {
    return this.sendPost('/api/getAncestral', params);
  }
  //获取名人烈士
  getCelebrity(params) {
    return this.sendPost('/api/getCelebrity', params);
  }
  //实名认证接口
  realAuthentication(params) {
    return this.sendPost('/api/realAuthentication', params);
  }
  //修改密码
  modifyPwd(params) {
    return this.sendPost('/api/modifyPwd', params);
  }
  //得到跟人信息/名片
  findUser(params) {
    return this.sendPost('/api/findUser', params);
  }
  //关注用户
  followUser(params) {
    return this.sendPost('/api/followUser', params);
  }
  //取消关注 
  removeConcerns(params) {
    return this.sendPost('/api/removeConcerns', params);
  }
  //更改已读状态
  updateUnread(params) {
    return this.sendPost('/api/updateUnread', params);
  }
  //获取聊天内容
  getChatRoomList(params) {
    return this.sendPost('/api/getChatRoomList', params);
  }
}

export default new AllServiceApi();