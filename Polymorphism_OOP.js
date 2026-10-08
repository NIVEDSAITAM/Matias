class Animal {
    makeSound() {
        console.log("The animal makes a sound.");
    }
}

class Dog extends Animal {
    makeSound() {
        console.log("The dog barks.");
    }
}

class Cat extends Animal {
    makeSound() {
        console.log("The cat meows.");
    }
}

const animals = [
    new Dog(),
    new Cat()
];

for (const animal of animals) {
    animal.makeSound();
}