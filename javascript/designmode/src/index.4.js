//工厂模式
class Product{
    constructor(name){
        this.name = name
    }
    init(){
        console.log('init')
    }
    fn1(){
        console.log('fn1')
    }
    fn2(){
        console.log('fn2')
    }
}
class Creator{
    creater(name){
        return new Product(name)
    }
}

let creater = new Creator()
let p = creater.creater('apple')
p.init()
p.fn1()
p.fn2()

//单例模式
class SingleObject{
    login(){
        console.log('login...')
    }
}
//定义的静态方法。
SingleObject.getInstance = (function(){
    let instance
    return function(){
        if(!instance){
            instance = new SingleObject()
        }
        return instance
    }
}())

let obj1 = SingleObject.getInstance()
obj1.login()
console.log(obj1)
let obj2 = SingleObject.getInstance()
obj2.login()
console.log('obj1 === obj2',obj1 === obj2)
//直接使用SingleObject，则不属于单例模式。在ES6中无法避免该错误用法。
let obj3 = new SingleObject()
obj3.login()
console.log('obj3 === obj2',obj3 === obj2)
console.log(obj3)

//适配器模式
class Adaptee{
    specificRequest(){
        return '德国标准插头'
    }
}
class Target{
    constructor(){
        this.adapteee = new Adaptee()
    }
    request(){
        let info = this.adapteee.specificRequest()
        return `${info}--转换器--中国标准插头`
    }
}

let target = new Target()
let res = target.request()
console.log(res)
