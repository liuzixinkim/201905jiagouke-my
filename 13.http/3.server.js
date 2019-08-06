const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

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
            let fileContent = fs.readFileSync(abspath,'utf8');
            let md5 = crypto.createHash('md5').update(fileContent).digest('base64')//转化成md5作为唯一标识

            let clientHeader = req.headers['if-none-match']; //第二次访问才会有 请求头会携带

            if(clientHeader){ // 第二次来
                if(clientHeader == md5){
                    res.statusCode = 304;
                    res.end();
                    return;
                }
            }


            res.setHeader('Cache-Control','no-cache');
            res.setHeader('Etag',md5)

            fs.createReadStream(abspath).pipe(res)
        }
    })



}).listen(4000)




