function start(wsPort){
    var WebSocket=require('ws')
    var wsArray=[];
    var socket=new WebSocket.Server({
        port:wsPort
    },function(){
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
    return wsArray;
}
module.exports={start:start};