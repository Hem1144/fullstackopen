import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null); // Reset the selected country when searching
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <label>find countries: </label>
        <input type="text" value={search} onChange={handleSearchChange} />
      </div>
      {selectedCountry ? (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <h4>Languages: </h4>
          <ul>
            {Object.values(selectedCountry.languages).map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
          <img
            src={selectedCountry.flags.png}
            alt={`${selectedCountry.name.common} flag`}
            style={{ maxWidth: "200px" }}
          />
          <button onClick={() => setSelectedCountry(null)}>Back</button>
        </div>
      ) : (
        <>
          {filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : filteredCountries.length > 1 ? (
            <ul>
              {filteredCountries.map((country) => (
                <div key={country.name.common}>
                  <p>
                    {country.name.common}
                    <button onClick={() => handleShowCountry(country)}>
                      Show
                    </button>
                  </p>
                </div>
              ))}
            </ul>
          ) : filteredCountries.length === 1 ? (
            <div>
              <h2>{filteredCountries[0].name.common}</h2>
              <p>Capital: {filteredCountries[0].capital}</p>
              <p>Area: {filteredCountries[0].area} </p>
              <h4>Languages: </h4>
              <ul>
                {Object.values(filteredCountries[0].languages).map(
                  (lang, index) => (
                    <li key={index}>{lang}</li>
                  )
                )}
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
      )}
    </>
  );
}

export default App;
