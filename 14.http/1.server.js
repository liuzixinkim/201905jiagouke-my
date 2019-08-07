const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

http.createServer((req,res)=>{
    let {pathname} = url.parse(req.url);
    console.log(pathname)
    let abspath = path.join(__dirname,pathname);

    fs.stat(abspath,(err,statObj)=>{
        if(err){
            res.statusCode = 404;
            res.end();
            return;
        }
        if(statObj.isFile()){
            //10s内发起同样的请求 就别再来找我了
            res.setHeader('Cache-Control','max-age=10')
            
            res.setHeader('Expires',new Date(Date.now()+20*1000).toGMTString())
            fs.createReadStream(abspath).pipe(res)
        }
    })



}).listen(4000)




