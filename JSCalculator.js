const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("===== SIMPLE CALCULATOR =====");

rl.question("Enter first number: ", function(firstNumber) {

    rl.question("Enter operator (+, -, *, /): ", function(operator) {

        rl.question("Enter second number: ", function(secondNumber) {

            let num1 = parseFloat(firstNumber);
            let num2 = parseFloat(secondNumber);
            let result;

            switch (operator) {
                case "+":
                    result = num1 + num2;
                    break;

                case "-":
                    result = num1 - num2;
                    break;

                case "*":
                    result = num1 * num2;
                    break;

                case "/":
                    if (num2 === 0) {
                        console.log("Error: Cannot divide by zero.");
                        rl.close();
                        return;
                    }
                    result = num1 / num2;
                    break;

                default:
                    console.log("Invalid operator.");
                    rl.close();
                    return;
            }

            console.log("Result: " + result);

            rl.close();
        });
    });
});
