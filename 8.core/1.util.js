const fs = require('fs');
const path = require('path');


//node API所有的方法都是基于回调的 第一个参数永远都是err




const util = require('util');
// let read = util.promisify(fs.readFile); //将readFile异步方法变成promise
//实现原理
const promisify = (fn)=>{
    return (...args)=>{
        return new Promise((resolve,reject)=>{
            fn(...args,(err,data)=>{
                if(err){return reject(err)} 
                resolve(data)
            })
        })
    }
}
let read = promisify(fs.readFile);

// read(path.resolve(__dirname,'1.txt'),'utf8').then((data)=>{
//     console.log(data)
// })
//修改成async await格式
(async ()=>{
    let r = await read(path.resolve(__dirname,'1.txt'),'utf8');
    console.log(r)
})()






//将模块中的所有异步方法都promisifyAll转化成promise方法
const promisifyAll = (obj) =>{
    for(let key in obj){
        obj[key] = promisify(obj[key])
    }
}

promisifyAll(fs)
fs.readFile(path.resolve(__dirname,'1.txt'),'utf8').then((data)=>{
    console.log(data)
})



//继承 继承共有属性（原型上的属性）继承公共属性（原型链属性） 原理还是Object.setPrototypeOf




