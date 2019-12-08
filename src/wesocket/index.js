import config from "@/config/index";
import store from '@/store/index'
let websocket = websocket = new WebSocket(config.wsUrl);
websocket.onopen = function (e) {
  console.log('连接成功');
  let uid = localStorage.getItem('uid');
  if (uid) {
    websocket.send(JSON.stringify({
      action: 'getChatList',
      content: uid
    }));
  }
  setInterval(() => {
    let uid = localStorage.getItem('uid');
    if (uid) {
      websocket.send(JSON.stringify({
        action: 'getChatList',
        content: uid
      }));
    }
  }, 2000);
}
websocket.onerror = function (error) {
  console.log('连接错误');
}
websocket.onclose = function (e) {
  console.log('连接关闭'); e.data
}
websocket.onmessage = function (e) {
  try {
    const data = JSON.parse(e.data);
    if (data.code * 1 === 100) {
      data.data = data.data.map(item => {
        let timestamp = parseInt(new Date().getTime());
        item.timestamp = timestamp - parseInt(new Date(item.chat_time).getTime());
        return item;
      });
      store.commit('setChatList', data.data);
    }
  } catch (error) {
    console.log('e.data', e.data);
  }
}





export default websocket;