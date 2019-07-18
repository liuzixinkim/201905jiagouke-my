// function * read(){

//     try{

//         console.log(1)
//         yield 1;
//         console.log(2)
//         yield 2;
//         console.log(3)
//         return undefined;
//     }catch(err){
//         console.log(err)
//     }
// }

// let it = read();
// console.log(it.next())

// it.throw('出错了') //抛出错误 让try捕获


//-----------------------------------------------
// function * buy(){
//     let a = yield 1;
//     console.log(a);
//     let b = yield 2;
//     console.log(b);
//     return b;
// }

// let it = buy();
// it.next() //第一次的next是无效的
// it.next('world')
// // it.next('zf');
// console.log(it.next('zf'))


//-----------------------------------------------
//promise 要通过then generator可以省略then方法
// let fs = require('fs').promises;
// function* read() {
//     try{
//         let content = yield fs.readFile('./name.txt','utf8')
//         let age = yield fs.readFile(content,'utf8');
//         return age
//     }catch(err){
//         console.log(err)
//     }
// }

// // let it = read();
// // let {value,done} = it.next()
// // value.then((data)=>{
// //     let {value,done} = it.next(data)
// //     value.then((data)=>{
// //         let {value,done} = it.next(data)
// //         console.log(value)
// //     },(err)=>{
// //         it.throw(err)
// //     })
// // },(err)=>{
// //     it.throw(err)
// // })

// //co库
// function co(it){
//     return new Promise((resolve,reject) => {
//         //异步迭代 next
//         function next(data){
//             let {value,done} = it.next(data);
//             if(!done){
//                 Promise.resolve(value).then(data=>{
//                     next(data);
//                 },reject)
//             }else{
//                 resolve(value)
//             }
//         }
//         next();
//     })
// }

// co(read()).then((data)=>{
//     console.log(data)
// })



//-----------------------------------------------
//async + await 就是generator + co库
//语法糖
let fs = require('fs').promises;
async function read() {
    try{
        let content = await fs.readFile('./name.txt','utf8')
        console.log(content)
        let age = await fs.readFile(content,'utf8');
        return age
    }catch(err){
        console.log(err)
    }
}

read().then((data)=>{
    console.log(data)
})