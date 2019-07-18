/**
 * Promise 承诺
 * pending 等待状 fulfilled成功态 rejected失败态
 * 状态不可改变 状态变成fulfilled后 不能再变成rejected 反之一样
 */


let Promise = require('./promise');

let p = new Promise((resolve,reject)=>{
    resolve('成功了');
    reject('失败了');

    throw new Error('报错了'); //一旦发生错误 就是执行失败
})
p.then((data)=>{ //成功函数
    console.log(data);
},(err)=>{ // 失败函数
    console.log(err);
})

