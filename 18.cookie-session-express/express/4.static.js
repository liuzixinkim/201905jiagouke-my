const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(__dirname));

app.get('/',function (req,res){
    res.sendFile(path.resolve(__dirname,'4.static.js'))
    res.send({name:'zf'})
    res.json({name:'123'})
})

app.listen(3000);