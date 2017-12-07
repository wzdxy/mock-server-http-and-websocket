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
var wsPort = 9001
var socket=new WebSocket.Server({
    port:wsPort
},function(){
    var host = nodeServer.address().address;
    var port = nodeServer.address().port;
    console.log('webSocket Mock 已启动 , listenning as ws://:::%s'.white.bgGreen, wsPort);
})
socket.on('connection',function(ws){
    wsArray.push(ws);
    console.log('WebSocket Connected'.bgCyan+' at '+new Date().toLocaleString().gray+' Total Client(s):'+wsArray.filter(ws=>ws.OPEN===ws.readyState).length+"\n");
    let status=2,active=2,database=2,net=2;
    setInterval(function () {    
        let str=JSON.stringify({
            Type:"ServerStatus",
            Status:status,
            Server:"192.168.3.48",
            Params:{
                Active:active,
                Database:database,   
                Net:net
            }
        })
        // console.log(str);        
        if(ws.readyState===1){
            ws.send(str);
        }
        status=status===2?5:2;
        active=status===2?2:5;
        database=status===2?2:5;                
    },2000)
    ws.onopen=function(){
        console.log('open');                
    }
    ws.onmessage = function(){
        
    }
    ws.onclose = function(e,a){
        console.log('WebSocket Closed'.bgYellow+' Code:'+String(e.code).green+' '+e.reason+' at '+new Date().toLocaleString().gray+' Total Client(s):'+wsArray.filter(ws=>ws.OPEN===ws.readyState).length+"\n");    
    }
    ws.onerror = function(e){
        console.log('error',e)
    }
})

app.use(function(req,res,next){
    next();
});  
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

