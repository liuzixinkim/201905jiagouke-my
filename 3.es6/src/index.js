import { DH_CHECK_P_NOT_SAFE_PRIME } from "constants";

//es6
class Animal {
    constructor(type){
        this.type = type //实例属性
    }
    // a = 7 //实例属性 es7
    eat(){//公共方法
        console.log('eat')
    }

    // static b = 2; //静态方法 es7

    static get b(){//静态方法 es6
        return 1
    }

    get a(){ //公共属性 get-属性访问器 get set可以操作一个属性
        return 100
    }

}
let animal = new Animal('哺乳类');
// animal.eat()
// console.log(Animal.b)

//1.会做this判断

//如果是公共方法 直接写即可 
//如果是公共属性 需要通过get/set
//静态的属性和方法 static get/fn



//---------------------------------------------


class Animal2 {
    constructor (type){
        this.type = type;
    }

    static flag = 'animal';
    
    static fn (){
        return 'fn'
    }

    eat(){
        console.log('eat')
    }
}

//super 在构造函数和静态方法中 指代的是父类
//在原型方法中指代的是父类的原型
class Tiger2 extends Animal2{
    constructor(type){
        super(type) //super 指的是父类
        console.log(this)
    }
    static fn(){
        return super.fn(); //super 指的是父类
    }
    eat(){
        super.eat(); //super 指的是父类的原型
        console.log('吃肉')
    }
}


let tiger2 = new Tiger2('哺乳类');
console.log(Tiger2.fn())
console.log(tiger2.eat())
















