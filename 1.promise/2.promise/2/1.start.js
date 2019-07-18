

//发布订阅
let Promise = require('./promise');

let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject('失败了'); //发布
    },2000)

})


//订阅 订阅的时候 将函数存起来
p.then((data)=>{ //成功函数
    console.log(data);
},(err)=>{ // 失败函数
    console.log(err);
})

p.then((data)=>{ //成功函数
    console.log(data);
},(err)=>{ // 失败函数
    console.log(err);
})
