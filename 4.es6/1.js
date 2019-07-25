//函数kelihua 把函数拆分成小的部分 方便组合
function add(a,b,c,d){
    return a+b+c+d
}


function currying(fn,args=[]){
    let len = fn.length;
    return (..._)=>{
        args.push(..._)
        if(args.length < len){
            return currying(fn,args)
        }
        return fn(...args)
    }
}

let r = currying(add)(1)(2,3)(4)
console.log(r)
