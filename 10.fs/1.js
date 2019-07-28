let fs= require('fs');
let path = require('path')

let resolve = (name)=>{
    return path.resolve('__dirname',name)
 
}

fs.open(resolve('a.txt'),'r',function (err,fd){ //fd 文件操作符
    console.log(fd)
  
})