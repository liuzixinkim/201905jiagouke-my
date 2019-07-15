// let p = new Promise((resolve,reject)=>{
//     reject(100);
// })

// p.then((data)=>{
//     console.log(0)
//     // return data;
// },(err)=>{
//     console.log(1)
//     return 200;
// }).then((data)=>{
//     console.log(2)
//     return data
// }).then((data)=>{
//     console.log(3)
//     console.log(data)
// }).catch((data)=>{
//     console.log('失败',data)
// })


// 如何终止promise链？ 返回一个等待的promise

let p = new Promise((resolve, reject) => {
    reject(100);
})

p.then((data) => {
    console.log(0)
    return data;
}, (err) => {
    return new Promise((resolve, reject) => { }); //中断了 返回了一个等待的promise 终止了 不会继续了往下走了
}).then((data) => {
    console.log(data)
}).then((data) => {
    console.log(3)
}).catch((data) => {
    console.log('失败', data)
})




new Promise((resolve, reject) => {
    reject(100)
})
.finally(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('finally')
            // resolve(); //中断了
        }, 3000);
    });
})
.then(data => {
    console.log('data', data)
}, err => {
    console.log('err', err);
})










let p = new Promise((resolve, reject) => {
    // reject(100);
    throw new Error('报错了')
})

p.then((data) => {
    console.log(0)
    return data;
}, (err) => {
    return err
}).then((data) => {
    console.log(data)
}).then((data) => {
    console.log(3)
}).catch((data) => {
    console.log('失败', data)
})
