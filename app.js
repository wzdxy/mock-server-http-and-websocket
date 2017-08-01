/**
 * Created by zc on 2017/8/1.
 */
var express = require('express');
var app = express();
var routers = require('./routers/index');

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use(routers);

var server = app.listen(8122, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});