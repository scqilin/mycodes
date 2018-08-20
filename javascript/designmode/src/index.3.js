class Car {
    constructor(num) {
        this.num = num
    }
}
class Camera {
    shot(car) {
        return {
            num: car.num,
            inTime: Date.now()
        }
    }
}
class Display {
    showout(car, inTime) {
        console.log(`车辆离开：车牌号：${car.num}。停车时间：${Date.now() - inTime}`)
    }
}
class Park {
    constructor(floors) {
        this.floors = floors || []
        this.camera = new Camera()
        this.display = new Display()
        this.carList = {}
        this.carNumber = 0
    }
    in(car) {
       
        if (this.isin(car)) {
            console.log(`车辆进入失败：车牌号${car.num}已在车库中`)
        } else {
            let info = this.camera.shot(car)
            if (this.carNumber == 15) {
                console.log('车位已满！')
            }
            else {
                console.log('-----------------------')
                console.log(this.emptyNum())
                contem:
                for (let i = 0; i < 3; i++) {
                    for (let k = 0; k < 5; k++) {
                        if (this.floors[i].places[k].empty) {
                            let place = this.floors[i].places[k]
                            place.in()
                            info.place = place
                            this.carList[car.num] = info
                            this.carNumber += 1
                            console.log(`车辆进入，车牌号${car.num}。车库中目前车辆数量${this.carNumber}。`)
                            console.log('-----------------------')
                            break contem
                        }
                    }
                }
            }
        }



    }
    out(car) {
        if (!this.isin(car)) {
            console.log(`车辆离开失败：车牌号${car.num}不在车库中`)
        } else {
            let info = this.carList[car.num]
            let place = info.place
            place.out()
            this.display.showout(car, info.inTime)
            this.carNumber -= 1
            delete this.carList[car.num]
        }
        
    }
    emptyNum() {
        return this.floors.map(floor => {
            return `第${floor.index} 层还有 ${floor.emptyPlaceNum()} 个车位`
        }).join('--')
    }
    //车是否已经在车库中
    isin(car) {        
        if(this.carNumber == 0){
            return false
        }else{
            for(let keys in this.carList){
                if (keys == car.num){
                    return true
                }else{
                    return false
                }
            }           
        }        
    }

}
class Floor {
    constructor(index, places) {
        this.index = index
        this.places = places || []
    }
    emptyPlaceNum() {
        let num = 0
        this.places.forEach(p => {
            if (p.empty) {
                num = num + 1
            }
        })
        return num
    }
}
class Place {
    constructor() {
        this.empty = true
    }
    in() {
        this.empty = false
    }
    out() {
        this.empty = true
    }
}

let floors = []
let cars = []
for (let i = 0; i < 3; i++) {
    let places = []
    for (let j = 0; j < 5; j++) {
        places[j] = new Place()
    }
    floors[i] = new Floor(i + 1, places)
}
let park = new Park(floors)

for (let i = 0; i < 20; i++) {
    cars[i] = new Car('A' + i)
}
console.log(park)
for (let i = 0; i < 18; i++) {
    park.in(cars[i])
}

park.in(cars[1])
park.in(cars[2])
park.out(cars[1])
park.out(cars[1])

park.in(cars[2])
park.in(cars[3])
park.in(cars[2])
park.out(cars[0])
park.in(cars[2])
// console.log(park)