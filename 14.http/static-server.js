const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs').promises;
const { createReadStream, readFileSync } = require('fs');
const mime = require('mime');
const ejs = require('ejs');

const template = readFileSync(path.resolve(__dirname, 'template.html'), 'utf8');

class Server {
    constructor(config) {
        this.port = config.port || 3000;
        this.cwd = config.cwd || process.cwd();
        this.template = template;
    }

    async handleRequest(req, res) {
        let { pathname } = url.parse(req.url);
        pathname = decodeURIComponent(pathname);
        let filepath = path.join(this.cwd, pathname);
        //判断文件是否存在
        try {
            let statObj = await fs.stat(filepath);
            if (statObj.isDirectory()) {
                //如果访问的是文件夹，展示目录中的内容（读取目录中的结构）
                let dirs = await fs.readdir(filepath);
                //如果路径是/ 那就不需要增加路径
                let str = ejs.render(this.template, { arr: dirs, currentpath: pathname === '/' ? '' : pathname });
                res.setHeader('Content-Type', "text/html;chartset=utf-8")
                return res.end(str);

            }
            this.sendFile(req, res, filepath)
        } catch (e) {
            this.sendError(req, res, e)
        }
    }
    sendFile(req, res, filepath) {
        res.setHeader('Content-Type', mime.getType(filepath) + ";chartset=utf-8")
        createReadStream(filepath).pipe(res)
    }
    sendError(req, res, e) {
        console.log(e)
        res.statusCode = 404;
        res.end('Not Found');
        return;
    }

    start() {
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(this.port, () => {
            console.log('server start' + this.port)
        });
    }
}

module.exports = Server;
