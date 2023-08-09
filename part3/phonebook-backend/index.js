const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const url = process.env.MONGODB1_URI;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Note = mongoose.model("Note", noteSchema);

app.get("/api/persons", (req, res) => {
  Note.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Note.findById(id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).send(`Person with ID ${id} not found.`);
    }
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name and number are required" });
  }

  Note.findOne({ name: body.name }).then((existingPerson) => {
    if (existingPerson) {
      return res.status(400).json({ error: "name must be unique" });
    }

    const newEntry = new Note({
      name: body.name,
      number: body.number,
    });

    newEntry.save().then((savedNote) => {
      res.json(savedNote);
    });
  });
});

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const updatedNote = {
    name: body.name,
    number: body.number,
  };

  Note.findByIdAndUpdate(id, updatedNote, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => {
      console.error("Error updating person:", error.message);
      res.status(500).send("Error updating person.");
    });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Note.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end();
    })

    .catch((error) => {
      console.error("Error deleting person:", error.message);
      res.status(500).send("Error deleting person.");
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
