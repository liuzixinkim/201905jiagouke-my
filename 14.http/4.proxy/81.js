const http = require('http');
const proxy = require('http-proxy').createProxy();

let map = {
    'a.zhufeng.cn:81':'http://localhost:3000',
    'b.zhufeng.cn:81':'http://localhost:4000'
}

http.createServer((req,res)=>{
    proxy.web(req,res,{
        target:map[req.headers.host]
    })
}).listen(81)