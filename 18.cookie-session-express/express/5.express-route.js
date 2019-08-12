const express = require('express');
const path = require('path');
const app = express(); //app默认就是一个路由系统


const router = express.Router();

router.get('/add',(req,res,next)=>{
    res.send('add')
})

router.get('/delete',(req,res,next)=>{
    res.send('delete')
})

app.use('/user',router)

app.listen(3000)


