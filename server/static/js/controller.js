/* 封装 WebSocket 实例化的方法  */
var CreateWebSocket = (function () {
  return function (urlValue) {
    if (window.WebSocket) return new WebSocket(urlValue);
    if (window.MozWebSocket) return new MozWebSocket(urlValue);
    return false;
  }
})();
/* 实例化 WebSocket 连接对象, 地址为 ws 协议 */
var webSocket = CreateWebSocket("ws://localhost:3000");
/* 接收到服务端的消息时 */
webSocket.onmessage = function (msg) {
  console.log("服务端说:" + msg.data);
};
/* 关闭时 */
webSocket.onclose = function () {
  console.log("关闭连接");
};
/* 发送消息 */
document.getElementById("send").onclick = function () {
  var str = document.getElementById("content").value;
  webSocket.send(str);
}
/* 关闭消息 */
document.getElementById("close").addEventListener("click", function () {
  webSocket.close();
});


/*var socket = io("ws://localhost:5000");

$("#left").click(function(){
  var data="left";
  send(data);
});
$("#right").click(function(){
  var data="right";
  send(data);
});
$("#up").click(function(){
  var data="up";
  send(data);
});
$("#down").click(function(){
  var data="down";
  send(data);
});
function send(data){
  socket.emit('message', data);
}*/
