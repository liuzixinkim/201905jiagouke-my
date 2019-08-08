
let fs = require('fs');

let rs = fs.createReadStream('./a.txt',{
    flags:'r', // 操作
    encoding:null,// 读取结果是buffer类型
    autoClose:true,// 读取完后自动关闭
    start:0,
    end:9,//包前又包后
    highWaterMark:1 //每次读文件 读多少个 默认是64*1024 node中最小单位是字节
});

// console.log(rs)
//默认叫非流动模式 需要监听个事件 rs.on('data',cb)
let arr = [];
rs.on('data',function (data){
    arr.push(data);
})


rs.on('end',function (){
    console.log(Buffer.concat(arr).toString())
  
})




