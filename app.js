/**
 * Created by zc on 2017/8/1.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cppRouters = require('./routers/cppServer');
var nodeRouters = require('./routers/nodeServer');
var webSocket = require('./routers/webSocket');
var colors = require('colors');
let log=require("./utils/log");


var wsArray=webSocket.start(9001);
app.post('/ws',function(req,res){
    let sentContent=req.body;
    let count=0;
    wsArray.forEach(function(ws){
        if(ws.OPEN===ws.readyState){
            ws.send(JSON.stringify(sentContent));
            count++;
        }
    })
    console.log('WebSocket Send'.bgCyan+' '+String(count).green+' client(s) at '+new Date().toLocaleString().gray,JSON.stringify(sentContent,null,4)+"\n");
    res.send(JSON.stringify({sent:sentContent,count:count}));
});

app.get('/', function (req, res) {
    res.send('Hello Mock!');    
});
app.use(cppRouters);
app.use(nodeRouters);

//在此配置端口号
var nodeServer = app.listen(8122, function () {
    var host = nodeServer.address().address;
    var port = nodeServer.address().port;
    console.log('Node 代理 Mock 已启动 , listening at http://%s:%s'.white.bgGreen, host, port);    
});

var cppServer = app.listen(8126, function () {
    var host = cppServer.address().address;
    var port = cppServer.address().port;
    console.log('Cpp 代理 Mock 已启动 , listening at http://%s:%s'.white.bgGreen, host, port);
});

