const Promise = require('./promise2');

const fs = require('fs').promises;

Promise.race(
    [fs.readFile('./name2.txt'),
    fs.readFile('./age.txt')
])
.then((data)=>{
    console.log(data)
},(err)=>{
    console.log(err)
})