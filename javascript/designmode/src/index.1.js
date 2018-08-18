class Person{
    constructor(name,age){
        this.name = name
        this.age = age
    }
    speak(){
        console.log(`My name is${this.name},age ${this.age}.`)
    }
}
var li = new Person('李二四',23)
li.speak()
let div1 = document.getElementById('div1')
div1.innerHTML = li.name