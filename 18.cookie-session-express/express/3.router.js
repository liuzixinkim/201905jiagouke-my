const express = require('express');
const app = express();


app.use((req,res,next)=>{
    console.log('use')
    next();
})
app.get('/:id/:name/adress',function (req,res,next){
    console.log(req.params)
    next();
    console.log(3)
})

app.get('/',function (req,res,next){
    console.log(2)
})

app.listen(3000);


