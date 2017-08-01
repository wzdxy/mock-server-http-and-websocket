/**
 * Created by zc on 2017/8/1.
 */
let express=require('express');
router=express.Router();
let readJsonFile=require('../utils/read-json-file');

router.get('/control/set',function(req,res){
   res.send('setset!');
});

/* POST 设置参数 */
router.post('/control/set/:objectid', function (req, res) {
    res.send('set!');
});

/* POST 添加对象 */
router.post('/control/add/:objectid', function (req, res) {});

/* POST 删除对象 */
router.post('/control/del/:objectid', function (req, res) {
    res.send('delete');
});

/* POST 修改对象属性 */
router.post('/control/modify/:objectid', function (req, res) {});

/* POST 设置对象参数属性 */
router.post('/control/config/:objectid/:paramid', function (req, res) {});

/* GET 获取对象参数属性 */
router.get('/control/getconfig/:objectid/:paramid', function (req, res) {
    let object = readJsonFile.getObject('/control/getconfig',req.params.objectid);
    res.send(object[req.params.paramid]);
});

/* GET 获取子设备列表 */
router.get('/control/getsubobject/:objectid', function (req, res) {
    let json=require('../json/control/getsubobject/'+req.params.objectid+'.json');
    res.status(200).send(JSON.stringify(json));
});

/* GET 获取对象列表 */
router.get('/control/getobjectlist', function (req, res) {});

/*POST 添加上报URL地址 */
router.post('/control/addreporturl', function(req, res) {});

/*POST 删除上报URL地址 */
router.post('/control/delreporturl', function(req, res) {});

/*GET 获取上报URL地址列表 */
router.get('/control/getreporturl', function(req, res) {});

/*POST 获取odl的设备列表 */
router.post('/control/odlnodes', function(req, res) {});

/*GET 获取指定设备类型的参数列表 */
router.get('/control/typeparamlist/:company/:serial/:type', function(req, res) {
    let object=readJsonFile.getObject('/control/typeparamlist',req.params.company);
    console.log(object);
    res.send(object[req.params.serial][req.params.type]);
});

/*POST 获取指定设备的实际接口信息 */
router.post('/control/getiolists', function(req, res) {});

/*POST 设置指定设备的实际接口信息 */
router.post('/control/setiolists', function(req, res) {});

/*POST 代理程序返回设备的参数改变消息 */
router.post('/control/event/:objectid', function(req, res) {});

/*POST 获取指定设备的指定参数 */
router.post('/control/getparams/:objectid', function(req, res) {});

module.exports = router;