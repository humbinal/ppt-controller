//服务端地址配置
const WS_ADDR = "ws://localhost:3000"

//用于产生uid的值，数字1和字母l容易混淆，去掉
const STR_CODE = [0, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

function uid_gen(length) {
  let randNum = null;
  let str = "";
  for (let i = 0; i < length; i++) {
    randNum = Math.floor(Math.random() * STR_CODE.length);
    str = str + STR_CODE[randNum];
  }
  return str
}

let uid = uid_gen(4);
window.alert("Please record your player ID: " + uid);
let impressApi = impress();
// 打开一个WebSocket
var ws = new WebSocket(WS_ADDR);

// 给服务器发送一个指令,注册自己的UID
let data = {type: "PLAYER", uid: uid};
//添加事件监听
ws.addEventListener('open', function () {
  ws.send(JSON.stringify(data));
});

// 响应onmessage事件，进行PPT控制
ws.onmessage = function (msg) {
  let play = msg.data;
  console.log("received msg data: ", play)
  switch (play) {
    case 'left':
      impressApi.prev();
      break;
    case 'right':
      impressApi.next();
      break;
    case 'up':
      impressApi.prev();
      break;
    case 'down':
      impressApi.next();
      break;
    case 'home':
      impressApi.goto(0);
      break;
    default:
  }
}

/*

    The `impress()` function also gives you access to the API that controls the presentation.

    Just store the result of the call:

        var api = impress();

    and you will get three functions you can call:

        `api.init()` - initializes the presentation,
        `api.next()` - moves to next step of the presentation,
        `api.prev()` - moves to previous step of the presentation,
        `api.goto( idx | id | element, [duration] )` - moves the presentation to the step given by its index number
                id or the DOM element; second parameter can be used to define duration of the transition in ms,
                but it's optional - if not provided default transition duration for the presentation will be used.

    You can also simply call `impress()` again to get the API, so `impress().next()` is also allowed.
    Don't worry, it wont initialize the presentation again.

    For some example uses of this API check the last part of the source of impress.js where the API
    is used in event handlers.

*/
