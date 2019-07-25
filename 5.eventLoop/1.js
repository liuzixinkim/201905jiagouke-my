// 浏览器的事件环
// js是一个单线程的 在同一之间内只能执行一件事（指的是主线程）
// 其他方法能开辟一些线程 setTimeout ajax click(不属于主线程之内的)

// 线程是在进程之中的 进程中包含着线程

// 浏览器就是一个单独的大进程 每个tab页都是一个进程
// 进程里可以开辟一条主线程 主线程可以跑js代码

// 主线程执行的时候 有两条常用的线程 UI和JS（互斥的，不能同时执行）

// 默认代码执行的时候 会在执行栈中执行 

// function a(){
//     function b(){
//         function c(){
//             debugger;
//         }
//         c();
//     }   
//     b();
// }
// a();

//栈 先进后出
//队列 [].push 先进先出 [].shift()


setTimeout(() => {
    console.log(1)
})
setTimeout(() => {
    console.log(2)
})
setTimeout(() => {
    console.log(3)
})

// while(true){ //主栈不执行完 不会走setTimeout

// }

Promise.resolve().then(() => {
    console.log('then')
})

console.log('logger');






// ------------------------------练习题

setTimeout(() => {
    console.log('setTimeout1');
    Promise.resolve().then(() => {
        console.log('then1')
    })
})

setTimeout(() => {
    console.log('setTimeout2');
})


Promise.resolve().then(() => {
    console.log('then2')
})

//then2 setTimeout1 then1 setTimeout2


//主栈 当主栈执行完后 会清空then的队列 依次清空 取出一个回调执行
//定时器 可能存放着then的方法 再去执行then的方法
//then


//浏览器在执行script脚本的时候 就是一个宏任务
//宏任务：ui渲染 script 事件 ajax setTime
//微任务：promise.then




// ------------------------------练习题

const p = Promise.resolve();
; (() => {

    const implicit_promise = new Promise(resolve => {

        const promise = new Promise(res => res(p));
        // 执行顺序  promise 需要等到 内部的resolve(p)
        promise.then(() => {
            console.log('after:await');
            resolve()
        })

    });

    return implicit_promise
})();
p.then(() => {
    console.log('tick:a');
}).then(() => {
    console.log('tick:b');
}).then(() => {
    console.log('tick:c');
});


//tick:a  tick:b  after:await  tick:c



// ------------------------------练习题

async function async1() { //考点 async 是怎么执行的
    console.log('async1 start')
    await async2() //编译出两个then
    console.log('async1 end')
    // node 10 版本以下 会编译出一个then
}

async function async2() {
    console.log('async2')
}

console.log('script start')

setTimeout(function () {
    console.log('setTimeout')
}, 0)

async1();

new Promise(function (resolve) {
    console.log('promise1')
    resolve();
}).then(function () {
    console.log('promise2')
})

console.log('script end');

/**
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * promise2
 * async1 end
 * setTimeout
 */


