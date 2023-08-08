require("dotenv").config();
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });
  ``;

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("Invalid number of arguments.");
  mongoose.connection.close();
}
