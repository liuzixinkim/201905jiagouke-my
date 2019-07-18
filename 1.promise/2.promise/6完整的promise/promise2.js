const PENDING = 'PENDING';
const SUCCESS = 'FULFILLED';
const FAIL = 'REJECTED';

function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){
        return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
    }
    let called;
    if(typeof x === 'function' || (typeof x === 'object' && x !== null)){
        try{
            let then = x.then;
            if(typeof then === 'function'){
                then.call(x,y=>{
                    if(called) return;
                    called = true;
                    resolvePromise(promise2,y,resolve,reject)
                },r=>{
                    if(called) return;
                    called = true;
                    reject(r)
                })
            }else{
                resolve(x);
            }
        }catch(e){
            if(called) return;
            called = true;
            reject(e)
        }
    }else{
        resolve(x)
    }
}
class Promise{
    constructor(executor){
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = value => {
            if(value instanceof Promise){
                return value.then(resolve,reject);
            }
            if(this.status === PENDING){
                this.value = value;
                this.status = SUCCESS;
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }

        const reject = reason => {
            if(this.status === PENDING){
                this.reason = reason;
                this.status = FAIL;
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }
        
        try{
            executor(resolve,reject)
        }catch(e){
            reject(e)
        }
        
    }
    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err};
        let promise2;
        promise2 = new Promise((resolve,reject)=>{
            if(this.status === SUCCESS){
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                })
            }
            if(this.status === FAIL){
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason);
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                })
            }
            if(this.status === PENDING){
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e);
                        }
                    })
                })
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason);
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e);
                        }
                    })
                })
            }
        })
        return promise2;
    }
    catch(errCallback){
        return this.then(null,errCallback)
    }

    finally(callback){
        return this.then((data)=>{
            // return new Promise((resolve,reject)=>{
            //     resolve(callback())
            // }).then(()=>data);
            return Promise.resolve(callback()).then(()=>data)
            // return data;
        },(err)=>{
            // return new Promise((resolve,reject)=>{
            //     reject(callback())
            // }).then(()=>{throw err});
            return Promise.resolve(callback()).then(()=>{throw err})
            // throw err;
        })
    }
}

Promise.resolve = (value) => {
    return new Promise((resolve,reject)=>{
        resolve(value)
    })
}

Promise.reject = (value) => {
    return new Promise((resolve,reject)=>{
        reject(value)
    })
}

function isPromise(x){
    if(typeof x === 'function' || (typeof x === 'object' && x !== null)){
        if(typeof x.then === 'function'){
            return true;
        }
    }
    return false;
}



Promise.all = (values) => {
    return new Promise((resolve,reject)=>{
        let arr = [];
        let i = 0; //计数器

        let processData = (key,value) => {
            arr[key] = value;
            if(++i === values.length){
                resolve(arr) //存完值了 走resolve 并把值返回
            }
        }
        for(let i=0; i<values.length; i++){
            let current = values[i]; // current 有可能是promise或者普通值 写个方法
            if(isPromise(current)){//是promise 执行 成功:拿到返回的结果 存起来 失败:走reject
                current.then((y)=>{
                    processData(i,y);
                },reject)
            }else{ //是普通值 存起来 有序
                processData(i,current);
            }
        }
    })
}

Promise.race = (values) => {
    return new Promise((resolve,reject)=>{
        for(let i=0; i<values.length; i++){
            let current = values[i]; // current 有可能是promise或者普通值 写个方法
            if(isPromise(current)){//是promise 执行 
                current.then(resolve,reject)
            }else{ //是普通值 存起来 有序
                resolve(current);
            }
        }
    })
}





Promise.deferred = function (){
    let dfd = {};
    dfd.promise = new Promise((resolve, reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}


module.exports = Promise;










