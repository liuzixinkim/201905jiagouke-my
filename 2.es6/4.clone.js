


//递归拷贝 （类型判断）
function deepClone(value,hash = new WeakMap){
    if(value == null){ //null 等于 undefined
        return value;
    }
    if(value instanceof RegExp){
        return new RegExp(value)
    }
    if(value instanceof Date){
        return new Date(value)
    }
    if(typeof value != 'object'){
        return value;
    }

    //剩下的都是对象和数组了
    let obj = new value.constructor(); // [] 或者 {}

    //解决循环引用的问题 WeakMap弱引用 不要用map（不会销毁变量，有可能会造成内存泄露 ）
    if(hash.get(value)){
        return hash.get(value)
    }
    hash.set(value,obj)

    for(let key in value){
        if(value.hasOwnProperty(key)){
            obj[key] = deepClone(value[key],hash)
        }
    }

    return obj;
}



let obj = {
    name:'liu',
    age:{n:2},
    b:undefined,
    c:function(){},
    d:/\d+/
}

let obj1 = deepClone(obj); 

obj1.age.n = 3;
console.log(obj1)





// let o = {};
// o.x = o;
// console.log(o) //循环引用了
