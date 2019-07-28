let fs = require('fs');
let rs = fs.createReadStream('./a.txt',{
    flags:'r',
    encoding:null,//读取结果是buffer类型
    autoClose:true,//读取完后自动关闭
    start:0,
    end:9,//包前包后
    highWaterMark:64*1024
});
//默认叫非流动模式
rs.on('data',function (data){
    console.log(data)
})