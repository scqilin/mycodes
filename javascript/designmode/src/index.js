class Car{
    constructor(number){
        this.number = number
    }    
}
class Display{
    constructor(car){
        this.car = car
    }
    inShow(){

    }
    outShow(){

    }
}
class Storey{
    constructor(){
        this.empnumber = 5
    }
}
class Camera{
    constructor(){
    }
    carIn(car,storey){
        car.intime = new Date().getTime()
        console.log(`剩余车位${storey.empnumber}个,进入时间${car.intime}。`)
        
        storey.empnumber -= 1
        
    }
    carOut(car){
        car.outtime = new Date().getTime()
        this.time = car.outtime - car.intime
        console.log(`车牌号：${car.number},停留时间${this.time}秒。`)
    }
}
let stor1 = new Storey()
let car1 = new Car('001')
let car2 = new Car('002')
let car3 = new Car('002')
let car4 = new Car('002')
let camera = new Camera()
camera.carIn(car1,stor1)
camera.carIn(car2,stor1)
camera.carIn(car3,stor1)
camera.carOut(car4)
console.log(camera)
console.log(stor1)
console.log(car4)