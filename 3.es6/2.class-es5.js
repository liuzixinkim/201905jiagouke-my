

function Animal(){
    this.type = '哺乳类'; //实例上的属性
    this.a = {}
}

Animal.prototype.home = {};//公共属性
Animal.prototype.fn = function(){ //公共方法

}

Animal.a2 = {};//静态属性
Animal.fn2 = function (){ //静态方法
    return 123
}

let animal = new Animal();
let animal2 = new Animal();
// console.log(animal.home == animal2.home)

// console.log(animal.type) //拿不到静态属性或方法
//私有属性：外面拿不到的

//每个对象上都有一个__proto__属性  找所属类的原型x.__proto__ = X.protptype
// console.log(animal.__proto__==Animal.prototype)
// console.log(Animal.prototype.__proto__==Object.prototype)
// console.log(Object.prototype.__proto__) //到根了 null

//继承
//constructor

console.log(Animal.prototype.constructor == Animal);
console.log(animal.constructor) //获取的是类 无法拿到实例中的属性 可以拿到静态属性或者方法
console.log(Animal)