
const http = require('http');
const url = require('url');

const queryString = require('querystring');

let port = 3001;

http.createServer((req,res)=>{
    //获取请求体
    let arr = [];
    req.on('data',function (chunk){
        arr.push(chunk)
    })
    req.on('end',function (){
        let buffer = Buffer.concat(arr);
        let r;
        //根据客户端发送过来的请求头类型的不同 做数据的判断
        if(req.headers['content-type'] === "application/x-www-form-urlencoded"){ 
            r = queryString.parse(buffer.toString(),'&','=').b; //a=1&b=2 --> {a:1,b:2}
        }else if(req.headers['content-type'] === "application/json"){
            r = JSON.parse(buffer.toString()).a;
        }else{
            r = buffer.toString()
        }

        res.setHeader('Content-Type',"text/plain;charset=utf-8");
        res.end(r+''); //end的时候只能放字符串
    })
    
}).listen(port);





