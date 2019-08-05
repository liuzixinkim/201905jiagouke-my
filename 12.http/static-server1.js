const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

http.createServer((req,res)=>{

    

    let {pathname} = url.parse(req.url,true); // /static/1.html

    //__dirname 当前启动的文件夹的绝对路径 //E:\wamp\www\mystore\2019第五期架构课\201905jiagouke-my\12.http
    let absPath = path.join(__dirname,pathname); //将路径进行拼接 E:\wamp\www\mystore\2019第五期架构课\201905jiagouke-my\12.http\static\1.html

    
    //判断路径存不存在
    fs.stat(absPath,(err,statObj)=>{
        if(err){
            res.statusCode = 404;
            return res.end();
        }
        if(!statObj.isFile()){
            //是文件夹 读文件夹下的index.html
            absPath = path.join(absPath,"index.html"); // E:\wamp\www\mystore\2019第五期架构课\201905jiagouke-my\12.http\history\index.html
            fs.access(absPath,(err)=>{
                if(err){
                    // 不存在
                    res.statusCode = 404;
                    return res.end();
                }
            })
        }
        //是文件 并且 存在
        res.setHeader('Content-Type', mime.getType(absPath) + ";chartset=utf-8");
        fs.createReadStream(absPath).pipe(res);
        
    })
    
}).listen(3000)