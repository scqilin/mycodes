// 迭代器模式
class Iterator {
    constructor(container) {
        this.list = container.list
        this.index = 0
    }
    next() {
        if (this.hasNext()) {
            return this.list[this.index++]
        }
        return null
    }
    hasNext() {
        if (this.index >= this.list.length) {
            return false
        }
        return true
    }
}
class Container {
    constructor(list) {
        this.list = list
    }
    //生成迭代器
    getIterator() {
        return new Iterator(this)
    }
}

let arr = [1, 10]
let container = new Container(arr)
let iterator = container.getIterator()
while (iterator.hasNext()) {
    console.log(iterator.next())
}

let arr2 = [2, 20] 
let object1 = {    //object
    name:'lili',
    number:1111
}
let setA = new Set() //集合
setA.add('a')
setA.add('c')
let map1 = new Map() //字典
map1.set('name','jack')
map1.set('num',1234)

function each(data) {
    let iter = data[Symbol.iterator]()
    // console.log(iter.next())
    // console.log(iter.next())
    // console.log(iter.next().value)
    // console.log(iter.next().value)
    // console.log(iter.next())
    // console.log(iter.next())
    let item = {done:false}
    while(!item.done){
        item = iter.next()
        if(!item.done){
            console.log('symbol-iterator',item.value)
        }
    }
}
each(arr2)    //输出value 2 20 200
//each(object1) //错误
each(setA)    //输出 value a b c
each(map1)    //输出 数组 键值对

for(let val of arr2){
    console.log('arr-for-of',val) //输出value 2 20 200
}
for(let val in arr2){
    console.log('arr-for-in',val) // 输出key 0 1 2
}

// TypeError: object1[Symbol.iterator] is not a function
// for(let val of object1){
//     console.log('for-of',val) //错误
// }
for(let val in object1){
    console.log('obj-for-in',val) //输出 name age number
}
// object1.forEach(function(k){  
//     console.log(k)    //错误
// })

for(let val of setA){
    console.log('set-for-of',val) //输出 value a b c
}
for(let val in setA){
    console.log('set-for-in',val) //无输出值
}
setA.forEach(function(v,k){
    console.log(v,k)   //输出 值 值 
})

for(let val of map1){
    console.log('map-for-of',val) //输出 键值对数组
}
for(let val in map1){
    console.log('map-for-in',val) //无输出值
}
map1.forEach(function(v,k){
    console.log(v,k)  //输出 键值对
})
console.log(setA)
console.log(map1)