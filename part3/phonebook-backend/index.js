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

const phoneNumberValidator = (number) => {
  // Regular expression for validating phone number format
  const phoneNumberRegex = /^[0-9]{2,3}-[0-9]{6,}$/;
  return phoneNumberRegex.test(number);
};

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: phoneNumberValidator,
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
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

  Note.findOne({ name: body.name })
    .then(() => {
      const newEntry = new Note({
        name: body.name,
        number: body.number,
      });

      newEntry
        .save()
        .then((savedNote) => {
          res.json({ data: savedNote, status: "ok" });
        })
        .catch((error) => {
          // Send the Mongoose error response to the client
          return res.status(400).json({ error: error.message });
        });
    })
    .catch((error) => {
      // Send the Mongoose error response to the client
      return res.status(400).json(error);
    });
});

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const updatedNote = {
    name: body.name,
    number: body.number,
  };

  Note.findByIdAndUpdate(id, updatedNote, { new: true, runValidators: true })
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
      res.status(204).end("Item is deleted");
    })

    .catch((error) => {
      console.error("Error deleting person:", error.message);
      res.status(500).send("Error deleting person.");
    });
});

// Defining a middleware function for handling errors in the code
const errorHandler = (error, req, res, next) => {
  console.error("Error:", error.message);

  if (error.name === "CastError" && error.kind === "ObjectId") {
    return res.status(400).send("Malformatted ID");
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
// Add the error handler middleware to the app
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
