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





promise.deferred = function (){
    let dfd = {};
    dfd.promise = new Promise((resolve, reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}






module.exports = Promise;










