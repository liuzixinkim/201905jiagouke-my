
//promise的链式调用

let fs = require('fs');
let Promise = require('./promise');

p = new Promise((resolve,reject)=>{
    resolve(123)
})


// p.finally(()=>{
//     setTimeout(()=>{
//         console.log(456)
//     },3000)
    
// }).then((data)=>{
//     console.log('成功',data)
// },(err)=>{
//     console.log('失败',err)
// })


// Promise.reject(1000).finally(()=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log(456)
//             resolve(2000)
//         },3000)
    
//     })

// }).then((data)=>{
//     console.log('成功',data)
// },(err)=>{
//     console.log('失败',err)
// })