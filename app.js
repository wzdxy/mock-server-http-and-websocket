const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const ejs = require('ejs');
const open = require("open");

const cppRouters = require('./routers/cppServer');
const nodeRouters = require('./routers/nodeServer');
const webSocket = require('./routers/webSocket');
const log=require("./utils/log");
const config=require("./config")

const app = express();
// 设置模板引擎 ejs
app.set('view engine','ejs') ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 挂载静态资源
app.use('/assets', express.static('assets'))

// 跨域支持
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*')
    next();
})

// 控制台页面
app.get('/', function (req, res) {        
    res.render('control',{config:config})
});

// 接收控制台命令
app.post('/ws',function(req,res){
    let sentContent=req.body.body;
    let count=0;
    wsArray.forEach(function(ws){
        if(ws.OPEN===ws.readyState){
            ws.send(sentContent);
            count++;
        }
    })
    console.log('WebSocket Send'.bgCyan+' '+String(count).green+' client(s) at '+new Date().toLocaleString().gray,sentContent+"\n");
    res.send({code:0,data:sentContent,count:count});
});

// node 服务器的 mock
app.use(nodeRouters);
const nodeServer = app.listen(config.nodePort, function () {
    let host = nodeServer.address().address;
    console.log('Node 代理 Mock 已启动 , listening at http://%s:%s'.white.bgGreen, host, config.nodePort);    
});

// cpp 服务器的 mock
app.use(cppRouters);
const cppServer = app.listen(config.cppPort, function () {
    let host = cppServer.address().address;
    console.log('Cpp 代理 Mock 已启动 , listening at http://%s:%s'.white.bgGreen, host, config.cppPort);
});

// 启动 websocket 服务器
const wsArray=webSocket.start(config.wsPort);

// 控制台网页服务
const controlPanelServer=app.listen(config.controlPagePort)

// 打开控制台网页窗口
open("http://127.0.0.1:"+config.controlPagePort);