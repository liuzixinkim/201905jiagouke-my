let s1 = Symbol('liu');
let s2 = Symbol();

let obj = {
    [s1]:1
}

// console.log(obj[s1])

//Symbol属性不可被枚举
for(let key in obj){
    console.log(key,obj)
}

