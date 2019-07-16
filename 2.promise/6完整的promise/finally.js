
// const Promise = require('./promise2');

let p = new Promise((resolve,reject)=>{
    reject(100)
})

p.finally(()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(2000);
        },3000)
    })
}).then((data)=>{
    console.log('data',data)
},(err)=>{
    console.log('err',err)
})

// const Promise = require('./promise2');
// let p2 = new Promise((resolve,reject)=>{
//     resolve(new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve(199)
//         },2000)
//     }))
// })

// p2.then((data)=>{
//     console.log(data)
// })