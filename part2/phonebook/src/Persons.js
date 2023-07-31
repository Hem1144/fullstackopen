import fromService from "./services/person";

const Persons = ({ persons, setPersons }) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      fromService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.log("Error deleting the person:", error);
        });
    }
  };

  return (
    <>
      {persons.map((person) => (
        <div key={person.id}>
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
