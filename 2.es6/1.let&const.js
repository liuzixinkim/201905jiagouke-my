let a = 1;
{
    //暂时性死区
    console.log(a)
    let a = 2;

}
console.log(a)