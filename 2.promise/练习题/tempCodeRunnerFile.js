new Promise((resolve, reject) => {
    reject(100)
})
.then(data => {
    console.log('data', data)
}, err => {
    console.log('err', err);
})
.finally(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('finally')
            // resolve(); //中断了
        }, 3000);
    });
}).then(()=>{
    console.log('000');
})

