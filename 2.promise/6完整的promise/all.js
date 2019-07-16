const Promise = require('./promise2');

const fs = require('fs').promises;

Promise.all(
    [fs.readFile('./name.txt'),
    fs.readFile('./age.txt'),
    1,
    2
])
.then((data)=>{console.log(data)})