import React, { useState, useEffect } from "react";
import personService from "./services/person";
import Persons from "./Persons";
import Notification from "./components/Notification";
const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      filter shown with
      <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input type="text" value={newName} onChange={handleNameChange} />
      </div>
      <div>
        <br />
        number:{" "}
        <input type="text" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (person) => person?.name.toLowerCase() === newName?.toLowerCase()
    );

    if (existingPerson) {
      const confirmed = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with the new one?`
      );
      if (confirmed) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .updatePerson(existingPerson.id, updatedPerson)
          .then((res) => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === existingPerson.id ? res : person
              )
            );
            showNotification(`Updated ${res.name}`, "success");
          })
          .catch((error) => {
            showNotification(
              `Failed to update ${existingPerson.name}`,
              "error"
            );
          });
      }
      setNewName("");
      setNewNumber("");
    } else {
      const personToAdd = {
        name: newName,
        number: newNumber,
      };

      personService
        .addPerson(personToAdd)
        .then((res) => {
          setPersons(persons.concat(res.data));
          setNewName("");
          setNewNumber("");
          showNotification(`Added ${res.data.name}`, "success");
        })
        .catch((error) => {
          showNotification(error.response.data.error, "error");
        });
    }
  };

  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`Delete ${name} ?`);
    if (confirmed) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Deleted ${name}`, "success");
        })
        .catch((error) => {
          showNotification(
            `Information of ${name} has already been removed from server`,
            "error"
          );
        });
    }
  };

  const filteredPersons = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification?.message} type={notification?.type} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
