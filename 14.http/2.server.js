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
            let currentFileCtime = statObj.ctime.toGMTString();
            let clientHeader = req.headers['if-modified-since'];
            if(clientHeader){ 
                
                if(clientHeader === currentFileCtime){
                    res.statusCode = 304;
                    res.end();
                    return;
                }
            }
            res.setHeader('Cache-Control','no-cache')
            res.setHeader('Last-Modified',currentFileCtime)
           
            fs.createReadStream(abspath).pipe(res)
        }
    })



}).listen(4000)




