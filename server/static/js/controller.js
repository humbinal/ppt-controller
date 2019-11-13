

/*/!* 接收到服务端的消息时 *!/
webSocket.onmessage = function (msg) {
  console.log("服务端说:" + msg.data);
};
/!* 关闭时 *!/
webSocket.onclose = function () {
  console.log("关闭连接");
};
/!* 发送消息 *!/
document.getElementById("send").onclick = function () {
  var str = document.getElementById("content").value;
  webSocket.send(str);
}
/!* 关闭消息 *!/
document.getElementById("close").addEventListener("click", function () {
  webSocket.close();
});*/


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
