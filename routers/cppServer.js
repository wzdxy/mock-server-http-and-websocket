/**
 * Created by zc on 2017/8/1.
 */
let express=require('express');
router=express.Router();
let readJsonFile=require('../utils/read-json-file');
let log=require("../utils/log");

/* POST  */
router.post('/server/panel', function (req, res) {    
    // for(let i=0;i<100000;i++){
    //     console.log(i);
    // }
    let resObject={result:{code:0,message:'spare'}};
    log.console(req,resObject);
    res.send(JSON.stringify(resObject));
});

module.exports = router;