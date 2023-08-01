import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    getWeatherData(country.capital);
  };

  const getWeatherData = (capital) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    console.log(apiKey);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`;
    console.log(apiUrl);

    axios.get(apiUrl).then((response) => {
      console.log(response);
      setWeatherData(response.data);
    });
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <label>Find countries: </label>
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
          {weatherData ? (
            <div>
              <h3>Weather in {selectedCountry.capital}</h3>
              <p>description: {weatherData.weather[0].description}</p>
              <p>
                temperature: {(weatherData.main.temp - 273.15).toFixed(1)} °C
              </p>
              <p>humidity: {weatherData.main.humidity}%</p>
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
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
