//map reduce filter some every forEach
//map和forEach的区别
//   forEach没有返回值 不能中断 


// reduce 收敛 求和 

//求平均数
let avg = [1,2,3,4,5,6].reduce((prev,current,index,arr)=>{
    if(index === arr.length-1){
        return (prev+current)/arr.length
    }
    return prev+current
})

// console.log(avg)

//--------------------------------------------------------------------------------
//compose 组合 将多个函数进行组合
function sum(a,b,c){
    return a + b + c
}

function len(str){
    return str.length
}

function addTag(str){
    return '$' + str
}
// let r = addTag(len(sum('a','b','c'))) //这样不好

//两种方法
function compose(...fns){
    return function (...args){
        let lastFn = fns.pop();
        return fns.reduceRight((prev,current)=>{
            return current(prev)
        },lastFn(...args))
        
    }
}
function compose(...fns){
    return fns.reduce((a,b)=>{
        return function (...args){
            return a(b(...args))
        }
    })
}
let r = compose(addTag,len,sum)('a','b','c')

console.log(r)

