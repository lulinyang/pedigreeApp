const host = window.location.host;
let baseUrl = '';
let wsUrl = ''
if (/127.0.0.1/g.test(host) || /localhost/g.test(host)) {
  baseUrl = 'http://api.com';
  wsUrl = 'ws://api.lyang.top:9501';
} else {
  baseUrl = 'https://api.lyang.top';
  wsUrl = 'ws://api.lyang.top:9501';
}

export default {
  baseUrl,
  apiKey: 'iSqQiR68eFhYnYQ1CwZJgCxdnUMNdqJiUcIHq4Gg',
  BaiduMapAk: 'REo68a39WKRrSk3KRs1DiTcHAOlPpTXV',
  wsUrl,
}