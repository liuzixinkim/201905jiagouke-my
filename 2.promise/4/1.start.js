
//promise的链式调用

let Promise = require('./promise');

let fs = require('fs');

function readFile(url){
    return new Promise((resolve,reject)=>{
        // reject(1000)
        fs.readFile(url,'utf8',function (err,data){
            reject(data)
        })
    })
}

var p2 = readFile('./name.txt').then((data)=>{
    return new Promise((resolve,reject)=>{
      
        reject(new Promise((resolve,reject)=>{

            reject(data)

        }))
      
    })
    // throw new Error('报错了')
})

p2.then().then().then((data)=>{
    console.log('成功',data)
},(err)=>{
    console.log('失败',err)
})
