const express = require('express');
const app = express();


app.get('/',function (req,res,next){
    console.log('1');
    next();
    console.log('2');
})

app.get('/',function (req,res,next){
    console.log('3');
    next();
    console.log('4');
})


app.listen(3000)

