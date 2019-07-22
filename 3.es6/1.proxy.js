//拦截

//proxy实现一个深度代理
let obj = {
    name:'liu',
    age:{
        n:2
    }
}

let handler = {
    get(target,key){
        if(typeof target[key] === 'object'){
            return new Proxy(target[key],handler)
        }
        return Reflect.get(target,key); //反射
        // return target[key]+'haha'
    },
    set(target,key,value){
        // target[key] = value;
        return Reflect.set(target,key,value)
    }
}
let proxy = new Proxy(obj,handler)

proxy.age.n = 10;

console.log(obj)

//--------------------------------------------------------------------------------------

let arr = [];

let proxy2 = new Proxy(arr,{
    get(target,key){
        return Reflect.get(target,key); //反射
        // return target[key]+'haha'
    },
    set(target,key,value){
        // console.log('updata',key)
        if(key === 'length') return true;
        // target[key] = value;
        return Reflect.set(target,key,value)
    }
})

proxy2.push('123');

console.log(arr)