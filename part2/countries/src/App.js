import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <label>find countries </label>
        <input type="text" value={search} onChange={handleSearchChange} />
      </div>
      {filteredCountries.length > 10 ? (
        <p>too many matches, specify another filter</p>
      ) : filteredCountries.length > 1 ? (
        <ul>
          {filteredCountries.map((country) => (
            <p key={country.name.common}>{country.name.common}</p>
          ))}
        </ul>
      ) : filteredCountries.length === 1 ? (
        <div>
          <h2>{filteredCountries[0].name.common}</h2>
          <p>capital: {filteredCountries[0].capital}</p>
          <p>area: {filteredCountries[0].area} </p>
          <h4>languages: </h4>
          <ul>
            {Object.values(filteredCountries[0].languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img
            src={filteredCountries[0].flags.png}
            alt={`${filteredCountries[0].name.common} flag`}
            style={{ maxWidth: "200px" }}
          />
        </div>
      ) : (
        <p>No countries found.</p>
      )}
    </>
  );
}

export default App;
