import "./SearchBar.scss";
import { useState } from "react";

function SearchBar({ allMovies }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log(allMovies);

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      const movieFound = allMovies.find(
        (movie) => movie.title.toLowerCase() === inputValue.toLowerCase()
      );

      if (!movieFound) {
        setErrorMessage("Movie not found. Please try another search.");
      } else {
        setErrorMessage("Movie is found");
        console.log("Enter is working as a click");
      }
    }
  }
  return (
    <div className="SearchBar">
      <input
        className="SearchBar__input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        type="text"
        placeholder="Search movies here..."
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default SearchBar;
