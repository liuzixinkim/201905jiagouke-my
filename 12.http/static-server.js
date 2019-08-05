const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs').promises;
const { createReadStream } = require('fs');
const mime = require('mime');


class Server {
    constructor(config){
        this.port = config.port || 3000;
        this.cwd = config.cwd || process.cwd();
    }

    async handleRequest(req,res){
        let { pathname } = url.parse(req.url);
        let filepath = path.join(this.cwd,pathname);
        //判断文件是否存在
        try{
            let statObj = await fs.stat(filepath);
            if(statObj.isDirectory()){
                //是目录的话 在当前目录上加一个index.html 默认去访问index.html
                filepath = path.join(filepath,"index.html")
                await fs.access(filepath)
            }
            this.sendFile(req,res,filepath)
        }catch(e){
            this.sendError(req,res,e)
        }
    }
    sendFile(req,res,filepath){
        res.setHeader('Content-Type',mime.getType(filepath) + ";chartset=utf-8")
        createReadStream(filepath).pipe(res)
    }
    sendError(req,res,e){
        console.log(e)
        res.statusCode = 404;
        res.end('Not Found');
    }   

    start(){
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port,()=>{
            console.log('server start'+this.port)
        });
    }
}



module.exports = Server;
