import React from "react";

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person, index) => (
        <div key={person.id || index}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </>
  );
};

export default Persons;
