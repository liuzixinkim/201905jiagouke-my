//node api 有异步api readFile

/**
 * 异步api的特点：
 *  获取结果 需要通过回调
 *  错误处理 只能通过回调函数的参数来处理
 */

//需求：处理并发的异步将结果进行同步 -> 页面中需要通过ajax获取两端数据 渲染模板

// !!! 解决多个异步并发的问题 !!!
var fs = require('fs');


function after(times,callback){
    let data = {};
    return function (key,value){ 
        data[key] = value; //每次成功都把数据储存到对象中
        //如果次数 和 数据的个数相等
        if(times === Object.keys(data).length){ //核心：计数器
            //调用渲染方法
            callback(data);
        }
    }
}

function render(obj){
    console.log(obj)
}

let newReader = after(2,render)

fs.readFile('./name.txt','utf8',function (err,name) {
    console.log(name)
    newReader('name',name)
})

fs.readFile('./age.txt','utf8',function (err,age) {
    newReader('age',age)
})

