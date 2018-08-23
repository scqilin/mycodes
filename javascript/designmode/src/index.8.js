//观察者模式  发布订阅
//主题 保存状态，状态变化 触发
class Subject{
    constructor(){
        this.state = 0
        this.observers = []
    }
    getState(){
        return this.state
    }
    setState(state){
        this.state = state
        this.notifyAllObserves()
    }
    notifyAllObserves(){
        this.observers.forEach(observer => {
            observer.update()
        })
    }
    attact(observer){
        this.observers.push(observer)
    }
}
//观察者
class Observer{
    constructor(name,subject){
        this.name = name
        this.subject = subject
        this.subject.attact(this)
    }
    update(){
        console.log(`${this.name} update,state:${this.subject.getState()}`)
    }
}

let s = new Subject()
let o1 = new Observer('o1',s)
let o2 = new Observer('o2',s) 
let o3 = new Observer('o3',s)
s.setState(1)
s.setState(2)
console.log(s.observers)