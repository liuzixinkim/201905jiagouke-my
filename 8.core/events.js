function EventEmitter(){
    this._events = Object.create(null)
}

//订阅 创建关系
EventEmitter.prototype.on = function (eventName,callback){
    if(!this._events){
        this._events = Object.create(null);
    }

    if(eventName !== 'newListener'){
        if(this._events['newListener']){
            this._events['newListener'].forEach(fn=>fn(eventName))
        }
        
    }
    //判断是否有 {'吃饭'：[]}
    let fnArr = this._events[eventName] || (this._events[eventName] = []);

    fnArr.push(callback)
}
//发布 让对应的函数依次执行
EventEmitter.prototype.emit = function (eventName,...args){
    if(!this._events){
        this._events = Object.create(null);
    }
    if(this._events[eventName]){
        this._events[eventName].forEach(fn=>fn(...args))
    }
}
EventEmitter.prototype.off = function (eventName,callback){
    if(this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter(item=>{
            return item !== callback && item.l !== callback
        })
    }
}

EventEmitter.prototype.once = function (eventName,callback){
    const once = (...args)=>{ //高阶函数
        callback(...args); //先执行原有的逻辑
        this.off(eventName,once); //再将这个函数移除掉
    }
    once.l =  callback;
    this.on(eventName,once);
}



module.exports = EventEmitter;


