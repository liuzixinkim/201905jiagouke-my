
//promise的链式调用
let fs = require('fs');

function readFile(url){
    return new Promise((resolve,reject)=>{
        fs.readFile(url,'utf8',function (err,data){
            resolve(data)
        })
    })
}

readFile('./name.txt')
.then((data)=>{
    return readFile(data);
})
.then((data)=>{
    console.log(data)
})
.catch((err)=>{
    console.log(err)
})


/**
 * promise 实现链式调用 靠的是返回一个新的promise,因为promise的状态一旦确定就不能重新更改
 */
let p = new Promise((resolve,reject)=>{
    resolve(1000)
})
let p2 = p.then(()=>{
    throw new Error();
})

p2.then(()=>{

})

