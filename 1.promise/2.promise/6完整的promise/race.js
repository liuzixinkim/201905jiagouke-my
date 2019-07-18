const Promise = require('./promise2');

const fs = require('fs').promises;

Promise.race(
    [fs.readFile('./name2.txt'),
    fs.readFile('./age.txt'),
    1
])
.then((data)=>{
    console.log(data)
},(err)=>{
    console.log(err)
})