- 流程梳理

ppt控制分为控制端和被控制端，以及衔接他们的服务端。

将被控制端称为播放器，播放器 的实现有impress和ms-office这两种，他们启动时随机生成一个ID，ID最好简单，并将ID告知用户，然后将ID以及自己的类别(播放器)发送到服务端。

将控制端称为控制器，控制器是一个静态页面，打开时提供输入框，输入播放器端生成的ID，然后发送ID和自己的类别(控制器)到服务端。

控制器连接时还可以判断对应ID的播放器是否在线，提高使用可靠性。

服务端即可根据ID进行控制指令的分发，发送到对应的播放器，播放器只担当接受指令并控制PPT播放的功能。

控制器的前端代码在server/static/index.html 中

播放器的代码在player目录中有不同的实现方式

- websocket 如何区分客户端

https://stackoverflow.com/questions/13364243/websocketserver-node-js-how-to-differentiate-clients

## impress.js player

impress.js player 中的 index.html 322行增加了控制器的js代码,即可实现控制,如下所示
```
<script type="text/javascript" src="js/controller.js"></script>
```

注意: 当修改服务器地址或端口后要去`controller.js`中(第一行)进行修改, ws为http, wss为https

