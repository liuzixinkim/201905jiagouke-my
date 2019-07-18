//我的代码可以保证 成功和失败不会同时触发
let resolvePromise = (promise2,x,resolve,reject) => { //统一处理结果
    /**
     * promise2 就是返回的promise
     * x 就是then的成功或失败的值
     * resolve 就是promise2的resolve
     * reject 就是promise2的reject
     */
    // console.log(promise2,'-----');
    if(promise2 === x){//不能自己等待着自己的完成
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }

    //如果调用了失败 就不能再调用成功 调用成功也不能载调用失败
    let called;
    //判断x是不是一个promise
    if(typeof x === 'function' || (typeof x === 'object' && x !== null)){
        //第一层判断 有可能是一个promise
        try{
            let then = x.then; //promise一定有then方法
            if(typeof then === 'function'){ //如果是函数 我就认为是一个promise
                then.call(x,(y)=>{ //用函数的返回的promise 采用他的状态
                    if(called) return;
                    called = true;
                    //y有可能解析出来还是一个promise
                    resolvePromise(promise2,y,resolve,reject); //总有y是普通值的时候
                },e=>{
                    if(called) return;
                    called = true;
                    reject(e);
                })
            }else{
                resolve(x); //普通值 直接抛出去就可以了
            }
        }catch(e){
            if(called) return;
            called = true 
            reject(e);
        }
    }else{
        //如果是一个常量 就直接成功即可
        resolve(x);  // '123'  123
    }
}



class Promise{
    constructor(executor){

        this.value = undefined;
        this.reason = undefined;
        this.status = 'pending';

        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = (value)=>{
            if(value instanceof Promise){
                return value.then(resolve,reject);
            }
            if(this.status === 'pending'){
                this.status = 'fulfilled';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }
        let reject = (reason)=>{
            if(this.status === 'pending'){
                this.status = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }

        try{
            executor(resolve,reject);
        }catch(e){
            reject(e)
        }

    }

    then(onFulfilled,onRejected){
        //可选参数的配置
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value=>value;
        onRejected = typeof onRejected === 'function' ? onRejected : err=>{throw err}
        //当then方法调用后需要返回一个新的promise
        //new promiscleare的时候 会让promise立即执行
        let promise2 = new Promise((resolve,reject)=>{
            if(this.status === 'fulfilled'){
                //如果执行函数的时候 报错了 promise2直接失败即可
                setTimeout(()=>{ //防止new promise的时候promise2还没有呢 在里面拿不到 为了保证promise2已经产生了
                    try{
                        let x = onFulfilled(this.value);
                        // resolve(x)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                })
            }
            if(this.status === 'rejected'){
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason);
                        // resolve(x)
                        //判断x是不是promise 是promise就采用他的状态
                        //不是promise 就用他的值直接调用resolve
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e);
                    }
                })
            }
            //————————————————————————————上面处理同步，下面处理异步
            if(this.status === 'pending'){
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value);
                            // resolve(x)
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e);
                        }
                    })
                });
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason);
                            // resolve(x)
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e);
                        }
                    })
                });
            }
        })
        return promise2;
    }

    catch(errCallback){ //catch是then的一个别名而已
        return this.then(null,errCallback)
    }

    static resolve(value){
        return new Promise((resolve,reject)=>{
            resolve(value);
        })
    }
    static reject(err){
        return new Promise((resolve,reject)=>{
            reject(err);
        })
    }
    
    
}

Promise.defer = Promise.deferred = () =>{
    let dfd = {};
    dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd; // 可以检测这个对象上的promise属性 resolve方法 reject方法
}

module.exports=Promise;

