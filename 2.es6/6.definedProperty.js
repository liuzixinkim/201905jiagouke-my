// let obj = {
//     _body:'',
//     get url(){
//         return this._body
//     },
//     set url(value){
//         this._body = value
//     }   
// }
// obj.url = 2000
// console.log(obj.url )



let obj = {};

let other = '';

Object.defineProperty(obj,'name',{
    enumerable:true,// 是否可枚举
    // value:100
    get(){
        return other
    },
    set(val){
        other = val;
    }
})
obj.name = '100';
console.log(obj)


