// path
const path = require('path')
// 基于koa-websocket实现的即时通讯
const Koa = require('koa')
// 静态插件
const static_ = require('koa-static')
// 路由
const route = require('koa-route')

// 导入WebSocket模块:
const WebSocket = require('ws')

const app = new Koa()

//配置静态目录
app.use(static_(
  path.join('./static')
))

// koa app的listen()方法返回http.Server:
let server = app.listen(3000);

// 创建WebSocketServer:
let wss = new WebSocket.Server({
  server: server
});

let reader_controller_map = new Map();

wss.on('connection', function (ws) {
  //console.log("connection", ws)
  console.log(`connection`)
  ws.on('message', function (msg) {
    console.log(`Received message: ${msg}`)
    let data = JSON.parse(msg);
    //收到消息后判断是player的注册消息还是controller的指令消息
    if (data.type.toUpperCase() === "PLAYER" && !reader_controller_map.has(data.uid)) {
      //如果没有存储就将其存储下来
      reader_controller_map.set(data.uid, ws)
    } else if (data.type.toUpperCase() === "PLAYER") {
      //player 默认不发送消息，什么也不做
    } else if (data.type.toUpperCase() === "CONTROLLER") {
      //如果是 CONTROLLER 取出其id，并发送到对应id的 PLAYER 那里即可，PLAYER 不存在，发送错误提示
      let targetClient = reader_controller_map.get(data.uid);

      //判断目标客户端状态，如果未连接则提示错误
      if (targetClient.readyState === WebSocket.OPEN) {
        targetClient.send(data.play)
      } else {
        console.error(`targetClient: ${data.uid} not connected!`)
        //
      }

    } else {
      //当前只有 PLAYER 和 CONTROLLER 其他消息不处理
    }
  });
});


