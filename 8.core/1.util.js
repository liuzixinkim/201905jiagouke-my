const fs = require('fs');
const path = require('path');
const util = require('util');

//node API所有的方法都是基于回调的 第一个参数永远都是err
let read = util.promisify(fs.readFile);

read(path.resolve(__dirname,'1.txt'),'utf8').then((data)=>{
    console.log(data)
})
