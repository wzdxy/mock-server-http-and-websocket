/**
 * Created by zc on 2017/8/1.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var routers = require('./routers/cppServer');
var routers = require('./routers/nodeServer');
var colors = require('colors');
let log=require("./utils/log");

app.use(bodyParser.json()); // for parsing application/json

app.use(function(req,res,next){
    log.console(req,{});
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use(routers);

//在此配置端口号
var server = app.listen(8122, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('代理 Mock 已启动 , listening at http://%s:%s'.green, host, port);
    console.log("正在等待请求 ...\n".white.bgGreen);
});