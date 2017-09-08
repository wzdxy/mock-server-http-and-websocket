/**
 * Created by zc on 2017/8/1.
 */
var express = require('express');
var app = express();
var WebSocket=require('ws')
var bodyParser = require('body-parser');
var cppRouters = require('./routers/cppServer');
var nodeRouters = require('./routers/nodeServer');
var colors = require('colors');
let log=require("./utils/log");

app.use(bodyParser.json()); // for parsing application/json

var wsArray=[];

let sendString=JSON.stringify(            
    {
        "Type":"MatrixXpt",          
        "Params":
        [
           {
               "MatrixId":"45AA915B-B449-8597-6836-8AC5F0F88B71",  //逻辑矩阵ID
     
               "Index":1,    //输出序号
               "Value":"2"     //交叉输入序号    
           },
           {
               "MatrixId":"AC9D766D-2CDA-85FF-F63A-82122989048A",
               "Index":1,
               "Value":"3" 
           }
        ]                
     }
)

var socket=new WebSocket.Server({
    port:9001
})
socket.on('connection',function(ws){
    wsArray.push(ws);
    ws.onopen=function(){
        console.log('open');
        ws.send('hello');
    }
    ws.onmessage = function(){
        
    }
    ws.onclose = function(){
        console.log('close');
    }
    ws.onerror = function(e){
        console.log('error',e)
    }
    // setInterval(function(){
        
    //     console.log(new Date().toLocaleTimeString(),sendString);
    //     if(ws.OPEN===ws.readyState)ws.send(sendString);
    // },15000);
    
})


app.use(function(req,res,next){
    log.console(req,{});
    setTimeout(function(){
        wsArray.forEach(function(ws){            
            if(ws.OPEN===ws.readyState)ws.send(sendString);
        })
        console.log(sendString);
    },10)
    // socket.listeners.send(JSON.stringify({name:'zzz'}));
    // socket.send(JSON.stringify({name:'zzz'}));
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use(cppRouters);
app.use(nodeRouters);

//在此配置端口号
var nodeServer = app.listen(8122, function () {
    var host = nodeServer.address().address;
    var port = nodeServer.address().port;

    console.log('Node 代理 Mock 已启动 , listening at http://%s:%s'.green, host, port);
    console.log("正在等待请求 ...\n".white.bgGreen);
});

var cppServer = app.listen(8126, function () {
    var host = cppServer.address().address;
    var port = cppServer.address().port;

    console.log('Cpp 代理 Mock 已启动 , listening at http://%s:%s'.green, host, port);
    console.log("正在等待请求 ...\n".white.bgGreen);
});

