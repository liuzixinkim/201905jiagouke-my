const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){
        return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
    }

    let called;
    if(typeof x === 'function' || (typeof x === 'object' && x !== null)){
        //是promise
        try{
            let then = x.then;
            if(typeof then === 'function'){
                //有then方法
                then.call(x,y=>{
                    if(called) return;
                    called = true;
                    resolvePromise(promise2,y,resolve,reject); 
                },r=>{
                    if(called) return;
                    called = true;
                    reject(r);
                })
            }else{
                //没有then方法 不是promise 有可能是是个对象{then:null}
                resolve(x);
            }
        }catch(e){
            if(called) return;
            called = true;
            reject(e)
        }
    }else{
        //不是promise
        resolve(x)
    }

}


class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (value) => {
            if(value instanceof Promise){
                return value.then(resolve,reject);
            }
            if(this.status === PENDING){
                this.value = value;
                this.status = FULFILLED;
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if(this.status === PENDING){
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try{
            executor(resolve, reject)
        }catch(e){
            reject(e)
        }
        
    }
    then(onFulfilled, onRejected) {

        onFulfilled = typeof onFulfilled==='function'?onFulfilled:val=>val;
        onRejected = typeof onRejected==='function'?onRejected:err=>{throw err}

        let promise2;
        promise2 = new Promise((resolve,reject)=>{

            if (this.status === FULFILLED) {
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if (this.status === REJECTED) {
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e)
                    }
                })
            }
    
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e)
                        }
                    })
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason);
                            resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
        })
        return promise2;


    }

    catch(errCallback){
        return this.then(null,errCallback);
    }
}


// 希望测试一下这个库是否符合我们的promise A+规范
// promises-aplus-tests
Promise.defer = Promise.deferred = function(){
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }

module.exports = Promise;
