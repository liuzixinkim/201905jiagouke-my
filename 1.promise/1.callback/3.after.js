//lodash after 在（调用）多少次之后执行


function after(timer,callback){
    return function (){
        if(--timer === 0){
            callback();
        }
    }
}

function say(){
    console.log('say')
}

let newSay = after(3,say);
newSay();
newSay();
newSay();