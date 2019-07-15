
/*
    判断类型的方式
        tpyeof 不能判断复杂类型 typeof null也是object 
        instanceof 判断__proto__ 原型链 判断谁是谁的实例
        constructor 当前的元素的构造函数是谁 谁构造的它
        Object.prototype.toString.call()
*/

function isType(type){ //函数柯里化(可以组合) -> 偏函数
    return function (obj){
        return Object.prototype.toString.call(obj) === `[object ${type}]`;
    }
}

//批量生产方法 number boolean ...
let objs = {}; //objs.isString = fn ...
['Number','Boolean','String','Null'].forEach(type => {
    objs['is'+type] = isType(type);
})

let obj = 'abc';

console.log(objs.isString(obj));

