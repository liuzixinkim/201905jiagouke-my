

let s1 = Symbol({name:'liu'}); //内部会将描述符toString
let s2 = Symbol();
//永远不相等
console.log(s1 === s2);
console.log(s1);


let obj = {
    [s1]:1,
    [s2]:2
}
console.log(obj[s1])



//Symbol属性不可被枚举
for(let key in obj){
    console.log(key,obj)
}
console.log(Object.getOwnPropertySymbols(obj))



let s3 = Symbol.for('liu'); 
let s4 = Symbol.for('liu'); 

console.log(s3 === s4);
console.log(Symbol.keyFor(s4))


