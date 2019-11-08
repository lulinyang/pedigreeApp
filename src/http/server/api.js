import extendsApi from '../extendsApi'

class AllServiceApi extends extendsApi {
  constructor() {
    super()
  }
  //获取token
  getToken(params) {
    const data = {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'iSqQiR68eFhYnYQ1CwZJgCxdnUMNdqJiUcIHq4Gg',
      provider: 'customer',
      username: 'admin',
      password: '123456'
    }
    return this.sendPost('/oauth/token', data);
  }

}

export default new AllServiceApi()