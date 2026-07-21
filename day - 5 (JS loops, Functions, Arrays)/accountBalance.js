const account = {
 owner: "Cordelia",
 balance: 1000,

 deposit(amount) {
 if (amount > 0) {
 this.balance += amount;
 console.log(`Deposited ${amount}rs.`);
 console.log(`New balance: ${this.balance}rs`);
 } else {
 console.log("Deposit amount must be positive.");
 }
 },

 withdraw(amount) {
 if (amount > 0 && amount <= this.balance) {
 this.balance -= amount;
 console.log(`Withdrew ${amount}rs. New balance: ${this.balance}rs`);
 } else if (amount > this.balance) {
 console.log("Insufficient funds.");
 } else {
 console.log("Withdrawal amount must be positive.");
 }
 },

 checkBalance() {
 console.log(`Current balance: ${this.balance}rs`);
  }
};


account.deposit(1000);    
account.withdraw(300);    
account.withdraw(3000);   
account.checkBalance();   