//代理模式 演示通过代理模式访问外网图片
class ReadImg{
    constructor(fileName){
        this.fileName = fileName
        this.loadFromDisk()
    }
    display(){
        console.log('display....'+this.fileName)
    }
    loadFromDisk(){
        console.log('loading...'+this.fileName)
    }
}

class ProxyImg{
    constructor(fileName){
        this.realImg = new ReadImg(fileName)
    }
    display(){
        this.realImg.display()
    }
}

let proxy = new ProxyImg('cat.jpg')
proxy.display()

//ES6中 proxy
//明星
let star = {
    name: '李寻欢',
    age:28,
    phone:'15296002163'
}
//经纪人
let agent = new Proxy(star,{
    get:function(target,key){
        if(key === 'phone'){
            return '152-1233-9087' //返回经纪人电话
        }
        if(key === 'price'){
            return 120000
        }
        return target[key]
    },
    set:function(target,key,val){
        if(key === 'customPrice'){
            if(val < 100000){
                throw new Error('价格太低，免谈')
            }else{
                target[key] = val
                return true
            }
        }
    }
})

console.log(agent.name)
console.log(agent.age)
console.log(agent.phone)
console.log(agent.price)
console.log(agent.high)

agent.customPrice = 150000
console.log('agent.customPrice',agent.customPrice)
agent.customPrice = 90000
console.log('agent.customPrice',agent.customPrice)