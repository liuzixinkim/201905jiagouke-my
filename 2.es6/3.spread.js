

//展开运算符  解构运算 剩余运算
// function ajax(){
//     // console.log([...arguments])
//     console.log(Array.from(arguments))
// }
// ajax('url','age')





//Array.form是根据length去遍历每一项，把每一项的key的作为数组的下标，value作为数组中的每一项；
// function ajax2(){
//     // console.log(Array.from({user:'liu',age:10,length:2})) 
//     console.log(Array.from({0:1,3:10,length:5}))
// }

// ajax2('url','age')




//...是通过迭代器来实现的
function ajax3(){
    // console.log(Array.from({user:'liu',age:10,length:2}))
    console.log([...{0:1,3:10,length:5,[Symbol.iterator]:function* (){
        //模拟一个生成器
        // let i = 0;
        // return {
        //     next(){
        //         return {
        //             value:1,
        //             done:i++ == 5
        //         }
        //     }
        // }

        //生成器
        let i = 0;
        while (this.length !== i){
            yield this[i++]; //{value:0,done:false}
        }
         
    }}])
}

ajax3('url','age');





let obj = {name:'liu',age:{n:2},b:undefined,c:function(){},d:/\d+/}
// let obj1 = {...obj}
// obj1.age.n = 200
// console.log(obj)
let obj3 = JSON.parse(JSON.stringify(obj));
// obj3.age.n = 1
console.log(obj3)




