//set map不能放重复类型  数据结构

let s = new Set([1,[2,3],4])
s.add([2,3])

console.log(s)
console.log(s.entries())


s.forEach((s)=>{
    console.log(s)
})

console.log('size',s.size)




//交集 并集 差集
let arr1 = [1,2,3,1,2];
let arr2 = [4,5,6,3,2,4];

//交集
function intersection(){
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);

    return [...s1].filter(item=>{
        return s2.has(item);
    })
}
console.log('交集',intersection())

//并集
function union(){
    let s = new Set([...arr1,...arr2]);
    return [...s]
}
console.log('并集',union())

//差集
function differenc(){
    let s1 = new Set(arr1);
    let s2 = new Set(arr2);

    return [...s1].filter(item=>{
        return !s2.has(item);
    })
}
console.log('差集',differenc())




let map = new Map([['name',2]])
map.set('age',10)
map.set('name',123)
console.log(map,map.get('name'))
//weakMap弱引用
//v8垃圾回收机制
