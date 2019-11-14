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

// 打开一个WebSocket
let ws = new WebSocket(WS_ADDR);
// 给服务器发送一个指令,注册自己的UID
let data = {type: "PLAYER", event: 'init', uid: uid};
//添加事件监听
ws.addEventListener('open', function () {
  ws.send(JSON.stringify(data));
});

ws.addEventListener('close', function () {
  window.alert("Player connection with server has broken!");
});

//PPT控制api对象
let revealApi = Reveal;
// 响应onmessage事件，进行PPT控制
ws.onmessage = function (msg) {
  let response = msg.data;
  console.log("received msg data: ", response);
  let data = JSON.parse(response);
  if (data.event === 'init') {
    window.alert("Please record your player ID: " + uid);
  } else if (data.event === 'play') {
    let play = data.play;
    switch (play) {
      case 'left':
        revealApi.left();
        break;
      case 'right':
        revealApi.right();
        break;
      case 'up':
        revealApi.up();
        break;
      case 'down':
        revealApi.down();
        break;
      case 'home':
        revealApi.slide(0, 0);
        break;
      case 'end':
        revealApi.slide(revealApi.getTotalSlides() - 1);
        break;
      default:
        console.warn("player controller received play action: ", play, " , but do nothing!")
    }
  } else {
    console.log("player controller received msg, but event not is 'init' or 'play', event is: ", data.event)
  }
}

/*

copy from https://github.com/hakimel/reveal.js#api

// Navigation
Reveal.slide( indexh, indexv, indexf );
Reveal.left();
Reveal.right();
Reveal.up();
Reveal.down();
Reveal.prev();
Reveal.next();
Reveal.prevFragment();
Reveal.nextFragment();

*/
