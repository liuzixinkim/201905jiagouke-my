const http = require('http');
const url = require('url');

function Application(){ //提供一个创建应用的类。
    this.routes = [
        {path:'*',method:'*',handler(){
            res.end(`Cannot ${req.method} ${req.url}`)
        }} //默认路由 如果都找不到 走这一条
    ];
    
}
Application.prototype.get = function (path,handler){
    this.routes.push({
        path,
        method:'get',
        handler
    })
}
Application.prototype.listen = function (){
    http.createServer((req,res)=>{
        let {pathname} = url.parse(req.url);
        let method = req.method.toLocaleLowerCase();

        for(let i = 1; i<this.routes.length; i++){
            let {path,method:m,handler} = this.routes[i];
            if(path === pathname && m === method){
                return handler(req,res)
            }
        }

        this.routes[0].handler(req,res);
    }).listen(...arguments)
}

module.exports = Application;