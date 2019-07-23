//继承

//实例的属性 公共属性

function Animal(){ 
    this.type = '哺乳类'; //实例的属性
}
Animal.prototype.eat = function (){ //公共方法
    console.log('吃饭')
}

function Tiger(){
    Animal.call(this); //继承实例上的属性
}

Tiger.prototype.__proto__ = Animal.prototype; //继承公共方法

// tiger找公共方法是tiger.__proto__ = Tiger.prototype 
// Tiger.prototype上没有这个方法 就会向上找 Tiger.prototype.__proto__默认指向Object.prototype 
// 这时候改成Animal.prototype

let tiger = new Tiger();

console.log(tiger.type) 
console.log(tiger.eat()) 
