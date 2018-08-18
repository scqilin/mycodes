class Car{
    constructor(number,name){
        this.number = number
        this.name = name
    }
    
}

class Kuaiche extends Car{
    constructor(number,name){
        super(number,name)
        this.price = 1
    }
}

class Zhuance extends Car{
    constructor(number,name){
        super(number,name)
        this.price = 2
    }
}

class Traver{
    constructor(car){
        this.car = car
    }
    start(){
        console.log(`行程开始：车牌号：${this.car.number},名称：${this.car.name}。`)
    }
    stop(){
        console.log(`行程结束：金额：${this.car.price*5}元。`)
    }
}

let c1 = new Zhuance(12345,"宝马")
let c2 = new Kuaiche(11111,"大众")
let traver1 = new Traver(c1)
let traver2 = new Traver(c2)
traver1.start()
traver1.stop()
traver2.start()
traver2.stop()