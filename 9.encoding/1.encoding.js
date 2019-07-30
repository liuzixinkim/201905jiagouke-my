const buffer = Buffer.alloc(3)
const buffer2 = Buffer.alloc(3,2)
const buffer3 = Buffer.allocUnsafe(3);
const buffer4 = Buffer.from([1,5,3]);
const buf5 = Buffer.from('珠峰培训');
buf5.fill(1);
console.log(buf5)

let buf1 = Buffer.from('珠峰')
let buf2 = Buffer.from('培训')
let buff = Buffer.alloc(12)
buf1.copy(buff,0,0,6)
buf2.copy(buff,6,0,6)
console.log(buff.toString())


let newBUffer = Buffer.concat([buf1,buf2],3)
console.log(newBUffer.toString())