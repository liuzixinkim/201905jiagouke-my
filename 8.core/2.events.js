//发布订阅
//订阅的时候 会把内容存放到数组里
//发布的时候 需要循环数组 依次执行

//维护一个列表

const EventEmitter = require('./events');

// const event = new EventEmitter();

const util = require('util');
function Girl(){

}
util.inherits(Girl,EventEmitter);
const girl = new Girl();

girl.on('newListener',(type)=>{
    process.nextTick(()=>{
        if(type == '吃饭'){
            girl.emit('吃饭',123)
        }
       
    })
})

girl.on('newListener',(type)=>{
    process.nextTick(()=>{
        if(type == '吃饭'){
            girl.emit('吃饭',123)
        }
       
    })
})

girl.once('吃饭',(arg)=>{
    console.log('吃饭前 喝水',arg)
})

let listener = (arg)=>{
    console.log('吃饭前 洗手',arg)
}
girl.once('吃饭',listener)
// girl.off('吃饭',listener) //去数组中删除掉

// girl.emit('吃饭',123)