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

}

export default new AllServiceApi()