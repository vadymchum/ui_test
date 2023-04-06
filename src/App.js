import { useState, useEffect } from "react";

import "./App.css";

const countries = [
  "Afghanistan",
  "Algeria",
  "Angola",
  "Andorra",
  "Albania",
  "Argentina",
  "Brazil",
  "Canada",
  "Denmark",
  "France",
  "Swened",
  "Turkey",
  "USA",
];

function App() {
  const [countries, setCountries] = useState([]);
  const [checkedCountries, setCheckedCountries] = useState([]);
  const [showCheckedOnly, setShowCheckedOnly] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleCheck = (event) => {
    const country = event.target.name;
    if (event.target.checked) {
      setCheckedCountries([...checkedCountries, country]);
    } else {
      setCheckedCountries(checkedCountries.filter((c) => c !== country));
    }
  };

  const handleClearChecked = () => {
    setCheckedCountries([]);
  };

  const handleShowCheckedOnly = () => {
    setShowCheckedOnly(!showCheckedOnly);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredCountries = countries.filter((c) =>
    c.toLowerCase().includes(searchText.toLowerCase())
  );

  const countryCheckboxes = filteredCountries.map((country) => (
    <label key={country} className="form-control">
      <input
        type="checkbox"
        name={country}
        checked={checkedCountries.includes(country)}
        onChange={handleCheck}
      />
      {country}
    </label>
  ));

  const checkedOnly = countryCheckboxes.filter((checkbox) =>
    checkedCountries.includes(checkbox.key)
  );

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name);
        setCountries(countryNames);
      });
  }, []);

  return (
    <div className="container">
      <form>
        <input
          type="text"
          className="search"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
        />
        <div className="input-wrapper">
          <label className="switch">
            <input
              type="checkbox"
              checked={showCheckedOnly}
              onChange={handleShowCheckedOnly}
            />
            <span className="slider round"></span>
            <span className="toggle-text">Show selected only</span>
          </label>
          <button type="button" onClick={handleClearChecked}>
            Clear all
          </button>
        </div>

        {showCheckedOnly ? (
          checkedOnly
        ) : (
          <div className="countries-list">{countryCheckboxes}</div>
        )}

        <div className="submit-wrapper">
          <button type="submit" className="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
