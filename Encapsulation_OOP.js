class BankAccount {
    #balance;

    constructor(name, balance) {
        this.name = name;
        this.#balance = balance;
    }

    deposit(amount) {
        this.#balance += amount;
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount("Devz", 1000);

account.deposit(500);

console.log("Account Name:", account.name);
console.log("Balance:", account.getBalance());