/**
 * 上传文件用
 * @param {*} url 上传地址
 * @param {*} data 参数
 */
export const upFile = function(url, data) {
  return new Promise(function(resolve, reject) {
    var XHR = XMLHttpRequest
      ? new XMLHttpRequest()
      : new window.ActiveXObject("Microsoft.XMLHTTP");
    XHR.onreadystatechange = function() {
      if (XHR.readyState == 4) {
        if ((XHR.status >= 200 && XHR.status < 300) || XHR.status == 304) {
          try {
            var response = JSON.parse(XHR.responseText);
            resolve(response);
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error("Request was unsuccessful: " + XHR.statusText));
        }
      }
    };
    // XHR.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    XHR.open("POST", url, true);
    XHR.send(data);
  });
}