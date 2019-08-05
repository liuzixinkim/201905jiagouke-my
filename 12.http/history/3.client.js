
const http = require('http');

let client = http.request({
    hostname:"localhost",
    port:3001,
    headers:{
        a:1, // 可以自定义,
        'Content-Type':"application/json"
        // 'Content-Type':"application/x-www-form-urlencoded"
    },
    method:"post" //发送post请求 肯定有响应体
},function (res){ //响应结果 res是个双攻流
    res.on('data',function (chunk){
        console.log(chunk.toString())
    })
})

client.write(`{"a":1}`); //为了能发送请求体
// client.write("a=1&b=2"); //传的数据有可能是查询字符串（表单格式）的 在服务端响应数据的时候要修改类型
client.end();


