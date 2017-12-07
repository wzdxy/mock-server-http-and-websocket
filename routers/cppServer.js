/**
 * Created by zc on 2017/8/1.
 */
let express = require('express');
router = express.Router();
let readJsonFile = require('../utils/read-json-file');
let log = require("../utils/log");

// 以下路由可自由配置, 随意删改

/* POST  */
router.post('/server/panel', function (req, res) {
    let resObject = { result: { code: 0, message: 'spare' } };
    log.console(req, resObject);
    res.send(JSON.stringify(resObject));
});

let resultFlag=true;
router.post('/server/panelapply', function (req, res) {    
    let resObject=readJsonFile.getObject('/server/panelapply',resultFlag?'ok':'error');
    resultFlag=!resultFlag;
    log.console(req, resObject);
    res.send(JSON.stringify(resObject));
});

module.exports = router;