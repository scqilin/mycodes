//状态模式
//状态
class State{
    constructor(color){
        this.color = color
    }
    handle(context){
        console.log(`trun to ${this.color} light`)
        context.setState(this)
    }
}
//主体
class Context{
    constructor(){
        this.state = null
    }
    getState(){
        return this.state
    }
    setState(state){
        this.state = state
    }
}

let context = new Context()
let red= new State('red')
let green = new State('green')
let yello = new State('yello')

green.handle(context)
console.log(context.getState())

red.handle(context)
console.log(context.getState())

yello.handle(context)
console.log(context.getState())
