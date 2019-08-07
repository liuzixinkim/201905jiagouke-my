const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const whiteList = ['b.zhufeng.cn']

http.createServer((req,res)=>{
    
    let { pathname } = url.parse(req.url);
    let filePath = path.join(__dirname,pathname);

    fs.stat(filePath,(err,statObj)=>{
        if(err){
            res.statusCode = 404;
            res.end();
            return;
        }
        if(statObj.isFile()){
            //判断是否是图片
            if(/(\.jpg)|(\.png)$/.test(pathname)){
                //是图片
                let referer = req.headers['referer'] || req.headers['referrer'];//引用的来源 也就是当前的网址
                if(referer){
                    let refereHostName = url.parse(referer).hostname; //当前网址的hostname 
                    let imgHostName = req.headers.host.split(':')[0]; //req.headers.host 请求的图片的网址
                    
                    if(refereHostName === imgHostName || whiteList.includes(refereHostName)){
                        fs.createReadStream(filePath).pipe(res)
                    }else{
                        fs.createReadStream(path.resolve(__dirname,'0.jpg')).pipe(res)
                    }
                }else{
                    fs.createReadStream(filePath).pipe(res)
                }
                
                
            }else{
                // 是html 无所谓 返回内容就行
                fs.createReadStream(filePath).pipe(res)
            }
            return;
        }else{
            res.statusCode = 404;
            res.end();
            return;
        }
    })

}).listen(3000)