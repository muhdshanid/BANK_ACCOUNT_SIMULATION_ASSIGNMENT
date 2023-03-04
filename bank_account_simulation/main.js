class BankAccount {
  constructor(
    name,
    gender,
    dob,
    email,
    mobile,
    address,
    initialBalance,
    adharNo,
    panNo
  ) {
    this.accountDetails = {
      name,
      gender,
      dob,
      email,
      mobile,
      address,
      initialBalance,
      adharNo,
      panNo,
      accountOpened: true,
      balance: initialBalance,
      transactionLedger: [],
    };
    console.log(`Account created successfully for ${name}`);
  }

  updateKYC(name, dob, email, mobile, adharNo, panNo) {
    if (this.accountDetails.accountOpened) {
      this.accountDetails.name = name;
      this.accountDetails.dob = dob;
      this.accountDetails.email = email;
      this.accountDetails.mobile = mobile;
      this.accountDetails.adharNo = adharNo;
      this.accountDetails.panNo = panNo;
      console.log("KYC information updated successfully");
    } else {
      console.log("Cannot update KYC information on a closed account");
    }
  }

  depositMoney(amount) {
    if (this.accountDetails.accountOpened) {
      this.accountDetails.balance += amount;
      const transaction = {
        date: new Date(),
        type: "Deposit",
        amount,
        balance: this.accountDetails.balance,
      };
      this.accountDetails.transactionLedger.push(transaction);
      console.log(`Successfully deposited ${amount} into your account`);
    } else {
      console.log("Cannot deposit money into a closed account");
    }
  }

  withdrawMoney(amount) {
    if (this.accountDetails.accountOpened) {
      if (amount > this.accountDetails.balance) {
        console.log("No balance");
      } else {
        this.accountDetails.balance -= amount;
        const transaction = {
          date: new Date(),
          type: "Withdrawal",
          amount,
          balance: this.accountDetails.balance,
        };
        this.accountDetails.transactionLedger.push(transaction);
        console.log(`Successfully withdrew ${amount} from your account`);
      }
    } else {
      console.log("Cannot withdraw money from a closed account");
    }
  }

  transferMoney(toName, amount) {
    if (this.accountDetails.accountOpened) {
      if (amount > this.accountDetails.balance) {
        console.log("No balance");
      } else {
        this.accountDetails.balance -= amount;
        const transaction = {
          date: new Date(),
          type: "transfer",
          amount,
          to: toName,
          balance: this.accountDetails.balance,
        };
        this.accountDetails.transactionLedger.push(transaction);
        console.log(`Successfully transferred ${amount} to ${toName}`);
      }
    } else {
      console.log("Cannot transfer money from a closed account");
    }
  }

  receiveMoney(fromName, amount) {
    if (this.accountDetails.accountOpened) {
      this.accountDetails.balance += amount;
      const transaction = {
        date: new Date(),
        type: "receive",
        amount,
        from: fromName,
        balance: this.accountDetails.balance,
      };
      this.accountDetails.transactionLedger.push(transaction);
      console.log(`Successfully received ${amount} from ${fromName}`);
    } else {
      console.log("Cannot receive money on a closed account");
    }
  }

  printStatement() {
    console.log(`${this.accountDetails.name} Account Details`);
    console.log(`Name: ${this.accountDetails.name}`);
    console.log(`Gender: ${this.accountDetails.gender}`);
    console.log(`DOB: ${this.accountDetails.dob}`);
    console.log(`Email: ${this.accountDetails.email}`);
    console.log(`Mobile: ${this.accountDetails.mobile}`);
    console.log(`Address: ${this.accountDetails.address}`);
    console.log(`Adhar No: ${this.accountDetails.adharNo}`);
    console.log(`Pan No: ${this.accountDetails.panNo}`);
    console.log(`Balance: ${this.accountDetails.balance}`);
    console.log(`${this.accountDetails.name}  Transactions`);
    this.accountDetails.transactionLedger.map((ledger) => {
      const date = ledger.date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      if (ledger.type === "Deposit") {
        console.log(
          `${this.accountDetails.name} Deposited ${ledger.amount} on ${date}`
        );
      }
      else if(ledger.type === "Withdrawal"){
        console.log(
            `${this.accountDetails.name} withdrawn ${ledger.amount} on ${date}`
          );
      }
      else if(ledger.type === "transfer"){
        console.log(
            `${this.accountDetails.name} transferred ${ledger.amount} to ${ledger.to} on ${date}`
          );
      }
      else{
        console.log(
            `${this.accountDetails.name} received ${ledger.amount} from ${ledger.from} on ${date}`
          );
      }
    });
  }
  closeAccount() {
    this.accountDetails = null;
    console.log("Account closed");
  }
}

const myAccount = new BankAccount(
  "John Smith",
  "Male",
  "01/01/1990",
  "john.smith@example.com",
  "1234567890",
  "123 Main St",
  1000,
  "123456789012",
  "ABCDE1234F"
);


myAccount.updateKYC(
  "John Doe",
  "02/01/1990",
  "johndoe@example.com",
  "0987654321",
  "098765432109",
  "ABCDE1234G"
);


myAccount.depositMoney(500);


myAccount.withdrawMoney(200);


myAccount.transferMoney("Jane Smith", 300);


myAccount.receiveMoney("Jane Doe", 400);


myAccount.printStatement();
