import { readonly } from 'core-decorators'
import { deprecate } from 'core-decorators'
//引用类库 就不需要自己再定义了 装饰器模式
class Person {
    @readonly
    name() {
        return '张三'
    }
}
let p = new Person
console.log(p.name())
//p.name = function(){} //会报错 只读模式

class People {
    // 打印默认提示内容：DEPRECATION People#name: This function will be removed in future versions.
    // @deprecate() 
    //  也打印自定义的内容：DEPRECATION People#name: 该方法即将弃用
    //  See https://github.com/jayphelps/core-decorators for more details.
    @deprecate('该方法即将弃用',{url:'https://github.com/jayphelps/core-decorators'})
    name() {
        return '李四'
    }
}
let peo = new People();
peo.name()