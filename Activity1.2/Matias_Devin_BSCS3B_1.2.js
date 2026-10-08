// 1. LET VARIABLES
let studentName = "Devin Matias";
let age = 19;
let yearLevel = "3rd Year";
let program = "BSCS";
let section = "B";
let school = "NWSSU";
let city = "Calbayog City";
let allowance = 1500;
let campus = "Main Campus";
let passingGrade = 75;

// 2. CONST VARIABLES
const teacher = "Sir Yuri Ortiz";
const subject = "Mobile programming";
const room = "Lab 1";
const semester = "1st Semester";
const term = "Midterm";
const department = "CCIS";
const grades = [90, 85, 70];
const subjects = ["Mobile Programming", "Database", "Networking"];
const schoolYear = "2026 - 2027";
const students = ["Maria", "Leonora", "Teressa",];

// 3. DESTRUCTURED ARRAYS
const [firstStudent, secondStudent, thirdStudent] = students;
const [firstGrade, secondGrade, thirdGrade] = grades;
const [firstSubject, secondSubject, thirdSubject] = subjects;

// Object Literals for Destructuring
const student = { name: studentName, age: age, program: program };
const akonSchool = { school: school, city: city };
const akonTeacher = { name: teacher, subject: subject, room: room };

// 4. DESTRUCTURED OBJECT LITERALS
const { name, age: studentAge, program: studentProgram } = student;
const { school: schoolName, city: schoolCity } = akonSchool;
const { name: teacherName, subject: teacherSubject } = akonTeacher;

// 5. ARROW FUNCTIONS
const Greet = (name) => `Hello ${name}! Welcome to ${school}.`;
const calcAve = (gradesArr) => gradesArr.reduce((a, b) => a + b, 0) / gradesArr.length;
const Pasa = (grade) => grade >= passingGrade;
const doubleGrade = (grade) => grade * 2;
const Pinili = (prog) => `You chose the ${prog} program.`;

// 6. ARRAYS USING SPREAD OPERATORS
const allStudents = [...students, "Mark", "Zacker", "Berg"];
const allGrades = [...grades, 95, 89, 87, 93];

// 7. OBJECT LITERALS USING SPREAD OPERATOR
const updatedStudent = { ...student, status: "Active" };
const completeTeacherInfo = { ...akonTeacher, semester: semester, department: department};

// 8. ARRAYS USING .map()
const doubledGrades = grades.map((grade) => grade * 2);
const greet = students.map((student) => `Welcome, ${student}!`);

// 9. ARRAYS USING .filter()
const passedGrades = grades.filter((grade) => grade >= passingGrade);
const evens = grades.filter((grade) => grade % 2 === 0);

// 10. OBJECT LITERALS USING OPTIONAL CHAINING
const studentContact = { contact: { email: "devzsaitam@gmail.com" } };
const studentAddress = { address: { city: "Calbayog City" } };

// Optional Chaining Expressions
const contactEmail = studentContact?.contact?.email;
const studentCity = studentAddress?.address?.city;

// 11. TEMPLATE LITERALS
console.log("\n===== STUDENT INFO =====");
console.log(`Student Name: ${studentName}`);
console.log(`Age: ${age}`);
console.log(`Year Level: ${yearLevel}`);
console.log(`Program & Section: ${program} - ${section}`);
console.log(`School: ${school}, ${city}, ${campus}`);
console.log(`Semester: ${semester}`);

// DISPLAY FOR DISTRUCTURED ARRAYS
console.log("\n===== DISPLAY FOR DISTRUCTURED ARRAYS =====");
console.log(`\nFirst Student: ${firstStudent}`);
console.log(`Second Grade: ${secondGrade}`);
console.log(`Third Subject: ${thirdSubject}`);

// DISPLAY FOR DISTRUCTURED OBJECTS
console.log("\n===== DESTRUCTURED OBJECTS =====");
console.log(`Name: ${name}`);
console.log(`Student Age: ${studentAge}`);
console.log(`Program: ${studentProgram}`);
console.log(`School: ${schoolName}`);
console.log(`Location: ${schoolCity}`);
console.log(`Teacher: ${teacherName}`);
console.log(`Subject: ${teacherSubject}`);

// ARROW FUNCTION OUTPUT
console.log(`\n===== ARROW FUNCTIONS =====`);
console.log(Greet(studentName));
console.log(`Average Grade: ${calcAve(grades)}`);
console.log(`Is Devin Passed? ${Pasa(firstGrade)}`);
console.log(`Double of First Grade: ${doubleGrade(firstGrade)}`);
console.log(Pinili(program));

// SPREAD OPERATOR OUTPUT
console.log(`\n===== SPREAD OPERATOR =====`);
console.log(`All Students: ${allStudents.join(", ")}`);
console.log(`All Grades: ${allGrades.join(", ")}`);
console.log(`Updated Student: ${updatedStudent.name}, Status: ${updatedStudent.status}`);
console.log(`
    Teacher: ${completeTeacherInfo.name}
    Subject: ${completeTeacherInfo.subject}
    Department: ${completeTeacherInfo.department}`
);

// MAP OUTPUT
console.log(`\n===== MAP RESULTS =====`);
console.log(`Doubled Grades: ${doubledGrades.join(", ")}`);
console.log(`Student Greetings: ${greet.join(" | ")}`);

// FILTER OUTPUT
console.log(`\n===== FILTER RESULTS =====`);
console.log(`Passed Grades: ${passedGrades}`);
console.log(`Even Grades: ${evens}`);

// OPTIONAL CHAINING OUTPUT
console.log(`\n===== OPTIONAL CHAINING =====`);
console.log(`Student Email: ${contactEmail}`);
console.log(`Student Location: ${studentCity}`);