
// const Promise = require('./promise');
const fs = require('fs');

function read(url){
    
    return new Promise((resolve,reject)=>{
        fs.readFile(url,'utf8',function (err,data){
            // throw new Error('报错了')
            resolve(new Promise((resolve,reject)=>{
                resolve(200)
            }))

        })
    })
    
}

read('./name.txt').then((data)=>{
    
},(err)=>{
    console.log('err',err)
}).catch(()=>{
    
})


