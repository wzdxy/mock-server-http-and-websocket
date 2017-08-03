/**
 * Created by zc on 2017/8/1.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routers = require('./routers/index');

app.use(bodyParser.json()); // for parsing application/json

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use(routers);


var server = app.listen(8122, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('代理 Mock 已启动 , listening at http://%s:%s', host, port);
    console.log('正在等待请求');
});