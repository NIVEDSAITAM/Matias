// VARIABLES
let ngaran = "Devin";
let edad = 19;
let year = "3rd year";
let program = "BSCS";

// ARRAYS
let nagutang = ["Maria", "Leonora", "Terresa"];
let pira = [80, 1000, 750];
let adlaw = ["Lunes", "Martes", "Miyerkules", "Huwebes", "Biyernes", "Sabado", "Linggo"];
let grado = [70, 75, 80, 85, 90, 95];


// OBJECT LITERALS
const mayutang = {
    Ngaran: nagutang[1],
    Pira: pira[0],
    DueDate: adlaw[2],
    Nagbayad: false
};

const ako = {
    Ngaran: ngaran,
    Program: program,
    Grado: grado[0]
};

// CONDITIONALS

if(edad >= 19) {
    console.log(`${ngaran} is legal na!!`);
} else {
    console.log(`${ngaran} is minor pa!!`);
}

if (ako.Grado >= 75) {
    console.log("PASSED!!");
} else {
    console.log("FAILED!!");
}

if(mayutang.Nagbayad == true) {
   console.log("Bayad Na!!"); 
} else {
    console.log("San o ka magbayad timeroy!!");
}

// LOOPS
console.log("\nMga adlaw:");
for(let adlaws of adlaw) {
    console.log(adlaws);
}

console.log("\nMga kamotangan san akon grado:");
for(let grades of grado)
    if (grades >= 75) {
        console.log(grades + " is PASSED!!");
    } else {
        console.log(grades + " is FAILED!!");
    }

console.log("\nMga nangutang:");
for (let i = 0; i < nagutang.length; i++) {
    console.log(nagutang[i]);
}

// CLASS 1: Studyante
class Studyante {
    // CONSTRUCTOR 1
    constructor(ngaran, edad, year, program) {
        this.ngaran = ngaran;
        this.edad = edad;

        // ENCAPSULATION 1
        this._year = year;

        // ENCAPSULATION 2
        this._program = program;
    }

    // METHOD 1
    pakilala() {
        console.log(
            `Hello, my name is ${this.ngaran}. I am ${this.edad} years old.`
        );
    }

    // METHOD 2
    akonCourse() {
        console.log(`Year: ${this._year}, Program: ${this._program}`);
    }

    // Getter for encapsulated year
    get year() {
        return this._year;
    }

    // Setter for encapsulated year
    set year(taon) {
        this._year = taon;
    }
}

// CLASS 2: CollegeNaak
// INHERITANCE 1
class CollegeNaak extends Studyante {

    // METHOD 3
    study() {
        console.log(`${this.ngaran} is studying ${this._program}.`);
    }
}

// CLASS 3: Naghuram
class Naghuram {
    // CONSTRUCTOR 2
    constructor(ngaran, pira) {
        this.ngaran = ngaran;
        this.pira = pira;
    }

    // METHOD 4
    AnUtang() {
        console.log(`${this.ngaran} borrowed ₱${this.pira}.`);
    }

    // METHOD 5
    Bayad(bayad) {
        this.pira -= bayad;

        if (this.pira <= 0) {
            console.log(`${this.ngaran} is bayad na!!.`);
        } else {
            console.log(`Hi ${this.ngaran} may utang pa na ₱${this.pira}.`);
        }
    }
}

// CLASS 4: Grade

class Grade {

    // INHERITANCE 2
    constructor(ngaran, edad, year, program, grade) {
        this.ngaran = ngaran;
        this.edad = edad;
        this._year = year;
        this._program = program;
        this.grades = grade;
    }

    // POLYMORPHISM
    pakilala() {
        console.log(
            `${this.ngaran} is a ${this._year} ${this._program} student.`
        );
    }

    // ABSTRACTION
    getAverage() {
        let total = 0;

        for (let g of this.grades) {
            total += g;
        }

        return total / this.grades.length;
    }
}

// OBJECTS
// Object 1
let student1 = new Studyante(ngaran, edad, year, program);

// Object 2
let student2 = new CollegeNaak(
    "Mark",
    20,
    "2nd Year",
    "BSCS"
);

// Object 3
let borrower1 = new Naghuram(
    nagutang[2],
    pira[1]
);

// Object 4
let grade1 = new Grade(
    ngaran,
    edad,
    year,
    program,
    grado
);

// OUTPUT
console.log("\n===== OBJECT 1 =====");
student1.pakilala();
student1.akonCourse();

console.log("\n===== OBJECT 2 =====");
student2.pakilala();
student2.akonCourse();
student2.study();

console.log("\n===== OBJECT 3 =====");
borrower1.AnUtang();
borrower1.Bayad(30);

console.log("\n===== OBJECT 4 =====");
grade1.pakilala();

// ABSTRACTION
console.log(`\nAverage Grade: ${grade1.getAverage()}`);
