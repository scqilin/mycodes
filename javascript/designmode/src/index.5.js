
//装饰器模式
class Circle{
    draw(){
        console.log('绘制一个圆形')
    }
}
class Decorator{
    constructor(circle){
        this.circle = circle
    }
    draw(){
        this.circle.draw()
        this.setRedBouder(circle)
    }
    setRedBouder(circle){
        console.log('设置红色边框')
    }
}

let circle = new Circle()
circle.draw()
let dec = new Decorator(circle)
dec.draw()

//演示1  ES7的语法 这里使用了babel插件演示的
@testDec
class Demo{

}
function testDec(target){
    target.isDec = true
}
console.log(Demo.isDec)

//演示二  把属性变成只读
function readonly(target, name, descriptor){
    descriptor.writable = false
    return descriptor
}

class Person {
    constructor(){
        this.first = '张'
        this.last = '三'
    }
    @readonly
    name(){
        return `${this.first} ${this.last}`
    }
}
let p = new Person()
console.log(p.name())
// p.name = function(){
//     return `AABB`
// }
//console.log(p.name()) //修改name会报错，提示name属性只读

//演示三 装饰方法 在前面先打印一下日志 再执行加法
function log(target,name,descriptor){
    let oldValue = descriptor.value
    descriptor.value = function(){
        console.log(`calling ${name} with `,arguments)
        return oldValue.apply(this.arguments)
    }
    return descriptor
}
class Math{
    @log
    add(a,b){
        return a+b 
    }
}
let math = new Math()
const result = math.add(2,3)
console.log('result',result)