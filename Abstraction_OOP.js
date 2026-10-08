class Vehicle {
    constructor(brand) {
        this.brand = brand;
    }

    start() {
        console.log(`${this.brand} is starting.`);
    }
}

class Car extends Vehicle {
    drive() {
        console.log(`${this.brand} is driving.`);
    }
}

const car = new Car("Toyota");

car.start();
car.drive();