
//promise的链式调用

let fs = require('fs');
let Promise = require('./promise');

function readFile(url){

    let defer = Promise.defer();
    fs.readFile(url,'utf8',function (err,data){

        if(err) defer.reject(err);
        defer.resolve(data);

    })
    return defer.promise;

}

let p2 = readFile('./name.txt').then((data)=>{
    return data
})

p2.then((data)=>{
    console.log('成功',data)
},(err)=>{
    console.log('失败',err)
})
