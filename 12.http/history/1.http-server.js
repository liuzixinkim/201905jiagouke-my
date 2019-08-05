const http = require('http');
const url = require('url');
// 服务器要求必须监听端口和ip地址
// 两个服务不能监听同一个端口，可能导致端口占用
//http://localhost:8080/123?a=1&b=2#123

const server = http.createServer((req,res)=>{
    //req是一个可读流 on('data')
    //res是一个可写流 write end

    //请求相关的
    //服务端获取到客户端请求行中的信息
    const method  = req.method; //请求方法 大写的

    //路由 根据不同的路径返回不同的内同 url需要分割成路径和查询参数 
    const {pathname,query} = url.parse(req.url,true); // 请求路径 完整的路径 8080之后 到 #(哈希)之前
    const version = req.httpVersion; //版本号
    // ---------------以上 请求行信息---------------

    console.log(res.headers)// 所有的请求头中的key都是小写的
    // ---------------以上 请求头信息---------------

    let arr = []; //用字符串的话有可能会乱码
    req.on('data',function (data){ //读流中的数据 如果是get请求 请求体是没东西的 会push(null) 所以一定会触发end事件
        arr.push(data) //读取请求体中的数据
    })
    req.on('end',function (){ //读流中的数据
        console.log(Buffer.concat(arr).toString())
    })
    // ---------------以上 请求体信息---------------


    //响应相关的
    res.statusCode = 404; //响应行 状态码
    res.setHeader('a',1); //响应头
    res.setHeader("Content-Type","text/plain;charset=utf-8");
    res.write('hello'); //响应体 设置响应的内容
    res.end('你好'); //end 不调用 请求响应不结束
    //res.write('123'); //流end后，不能再write。会触发write after end

    
});

let port = 8080;
server.listen(port,()=>{
    console.log('server start'+port) 
});

//如果端口号占用了 要+1
