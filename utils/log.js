var colors = require('colors');
function logToConsole(req, resBody) {
    let timeStr=new Date().toLocaleString();
    let methodStr=req.method;
    let urlStr=req.originalUrl;
    let ipStr=req.ip;
    console.log(methodStr.red.bold + " " + urlStr.magenta + " from " + ipStr.cyan + " at "+timeStr.gray + "\nrequest body >>>\n".yellow, JSON.stringify(req.body, null, 4));
    console.log("response body >>> \n".green, JSON.stringify(resBody, null, 4)+"\n");
}

exports.console = logToConsole;