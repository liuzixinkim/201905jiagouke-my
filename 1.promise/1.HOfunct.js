//高阶函数 回调函数 将一个函数传入到另一个函数中，在这个函数内部会调用此函数。一个函数返回一个函数。

// 1.
// function a(b){

// }
// a(function (){})
// 2.
// function a(b){
//     return function (){}
// }
// a()

//高阶函数的定义： 参数是函数 || 返回值是一个函数

// AOP 面向切片编程 把代码二次封装，不破坏原有的逻辑，插入自己的逻辑

//装饰模式
Function.prototype.before = function (fn){
    let that = this;
    return function (){
        fn();
        that(...arguments);
    }
}

function say(a,b){
    console.log('say~~~',a,b);
}

let newSay = say.before(function (){
    console.log('你好');
});


newSay(1,2);


