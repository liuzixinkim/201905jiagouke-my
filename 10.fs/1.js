
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
fs.open(resolve('./a.txt'),'r',function (err,rfd){ //fd当前对应的这个文件的r操作
    //读取 = 往内存中写入内容
    //写入 = 就是从内存中拿出来内容
    // console.log(fd) //fd window下面是3
    fs.open(resolve('./c.txt'),'w',438,function (err,wfd){//0o666 权限 读:2 写:4 执行:1
        let buffer = Buffer.alloc(3);

        let roffset = 0;
        let woffset = 0;
        //递归
        let next = ()=>{
            fs.read(rfd,buffer,0,3,roffset,function (err,bytesRead){ //bytesRead 真实读到的个数
                if(bytesRead === 0){
                    fs.close(rfd,()=>{});
                    fs.close(wfd,()=>{});
                    console.log('文件拷贝完毕');
                }else{
                    roffset += bytesRead
                    fs.write(wfd,buffer,0,3,woffset,function (err,bytesWrite){
                        woffset += bytesWrite;
                        next()
                    })  
                }
            })
        }

        next()
    })
    
})