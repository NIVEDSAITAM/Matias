class Animal {
  eat() {
    console.log("Animal is eating");
  }

  sleep() {
    console.log("Animal is sleeping");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Dog is barking");
  }

  run() {
    console.log("Dog is running");
  }
}

const dog = new Dog();
dog.eat();
dog.sleep();
dog.bark();
dog.run();
