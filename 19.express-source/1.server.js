const express = require('./express/index.js');
const app = express();


app.get('/',function (req,res,next){
    res.end('index');
})

app.get('/hello',function (req,res,next){
    res.end('hello3');
})


app.listen(3000)

