var colors = require('colors');
function logToConsole(req, resBody) {
    let timeStr=new Date().toLocaleString();
    let methodStr=req.method;
    let urlStr=req.originalUrl;
    let ipStr=req.ip;
    
    // 打印请求信息
    console.log(methodStr.bgCyan.white.bold + " " + urlStr.magenta + " from " + ipStr.cyan + " at "+timeStr.gray + "\nrequest body >>>\n".yellow, JSON.stringify(req.body, null, 4).white);
    
    // 打印返回值信息
    console.log("response body >>> \n".green, JSON.stringify(resBody, null, 4).white+"\n");
}

exports.console = logToConsole;