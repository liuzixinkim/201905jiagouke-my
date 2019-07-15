let fs = require('fs');
let Promise = require('./promise');

p = new Promise((resolve,reject)=>{
    resolve(123)
})


p.finally(()=>{
    setTimeout(()=>{
        console.log(456)
    },3000)
    
}).then((data)=>{
    console.log('成功',data)
},(err)=>{
    console.log('失败',err)
})