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
let config=require("./config")

app.use('/page', express.static('page'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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
    res.send({sent:sentContent,count:count});
});

app.get('/', function (req, res) {
    res.send('Hello Mock!');
});
app.use(cppRouters);
app.use(nodeRouters);


var nodeServer = app.listen(config.nodePort, function () {
    var host = nodeServer.address().address;
    console.log('Node 代理 Mock 已启动 , listening at http://%s:%s'.white.bgGreen, host, config.nodePort);    
});

var cppServer = app.listen(config.cppPort, function () {
    var host = cppServer.address().address;
    console.log('Cpp 代理 Mock 已启动 , listening at http://%s:%s'.white.bgGreen, host, config.cppPort);
});

var wsArray=webSocket.start(config.wsPort);

var controlPanelServer=app.listen(config.controlPagePort)

var open = require("open");
open("http://127.0.0.1:"+config.controlPagePort+"/page/control.html");