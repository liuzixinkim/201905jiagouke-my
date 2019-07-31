
let fs= require('fs');
let path = require('path');

let resolve = (filename)=>{
    return path.resolve(__dirname,filename)
}

//读完再写
// fs.readFile(resolve('a.txt'),function (err,data){ 
    
//     fs.writeFile(resolve('c.txt'),data,function(err){
//         console.log('拷贝成功')
//     })
// }) 

//边读边写
fs.open(resolve('./a.txt'),'r',function (err,fd){
    //读取 = 往内存中写入内容
    //写入 = 就是从内存中拿出来内容

    // fs.read(fd,)
})