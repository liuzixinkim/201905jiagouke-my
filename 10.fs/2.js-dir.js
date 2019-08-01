//fs
// 文件操作 目录操作


const fs = require('fs');

//同步创建
let pathUrl = 'a/b/c/d/e';
const mkdirSync = (pathUrl)=>{
    let pathArr = pathUrl.split('/');

    for(let i = 0; i<pathArr.length; i++){
        let current = pathArr.slice(0,i+1).join('/');
        try{
            fs.accessSync(current) 
        }catch(e){
            fs.mkdirSync(current)
        }
    }
}
mkdirSync(pathUrl)

//异步创建
let pathUrl2 = ' c/b/c/d/e';
const mkdir = (pathUrl,cb)=>{
    let pathArr = pathUrl.split('/');
    let next = (index)=>{
        if(index === pathArr.length){
            return cb();
        }
        let current = pathArr.slice(0,++index).join('/');
        fs.access(current,function(err){
            if(err){ //不能访问 报错 就要创建当前层
                fs.mkdir(current,function (){
                    next(index)
                })
            }else{//能访问 不报错 创建下一层
                next(index)
            }
        })
    }
    next(0)

}
mkdir(pathUrl2,function (){
    console.log('创建成功')
})

