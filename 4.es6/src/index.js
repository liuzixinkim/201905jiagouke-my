
//装饰器 AOP 高阶函数
//装饰模式

// 1 包装类 包装类中的属性 类中的方法
//装饰类 可以在类上扩展一些方法


@add  // 等价于add(my) 就是一个语法糖
class My{
    @readonly PI = 3.14
    @enumerable r = 3.14
}

//修饰类
function add(target){
    target.type = 'my'
}
console.log(My.type);

//修饰实例属性
function readonly(target,key,descriptor){ 
    //descriptor属性描述器 类似Object.defineProperty(obj,pi,{})的第三个参数
    descriptor.writable = false; //只读
    // setTimeout(()=>{
    //     console.log(My.prototype == target)
    // })
}   
function enumerable(target,key,descriptor){  
    descriptor.enumerable = false; //不可枚举
}   
let my = new My();
my.PI = 3.15
console.log(my)






class Animal {
    @enumerable
    @readonly
    PI = 3.14
    @beforeSay
    say(){
        console.log('say')
    }
}
//修饰函数
function beforeSay(target,key,descriptor){
    let oldSay = descriptor.value;
    descriptor.value = function (){
        console.log('before')
        oldSay.call(this)
    }
}

let animal = new Animal();
animal.say()
animal.PI = 123
console.log(animal.PI)
console.log(animal)
for(let key in animal){
    console.log(key)
}



//多个装饰器怎么执行
@logger2()
@logger1()
class Logger{

}
function logger1(){
    console.log('outter1')
    return function(){
        console.log('logger1')
    }
}
function logger2(){
    console.log('outter2')
    return function (){
        console.log('logger2')
    }
    
}

//logger2(logger1()) 多级装饰
//洋葱模型 一层包一层
//outter2  outter1   logger1  logger2 如果装饰器是函数式 从上自下执行 执行到里面后 从内依次接受装饰到外部去



//mixin 混合 vue中的vue.mixin() - vue中常考的
//怎么实现 类的混合 和 属性的混合
//比如说有两个类 希望子类一直调父类的before 一直调




