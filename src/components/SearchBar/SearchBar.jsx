import "./SearchBar.scss";
import { useState, useRef } from "react";

function SearchBar({ allMovies }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const Grid__aside = useRef(null);
  console.log(allMovies);

  function handleKeyPress(e) {

    if (Grid__aside.current) {
      Grid__aside.current.style.display = "block";
    }

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

  function closePopup() {
    addEventListener("click", (e) => {
    Grid__aside.current.style.display = "none";
  });
}
closePopup();

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
      <aside className="SearchBar__aside" ref={Grid__aside}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
        </aside>
    </div>
  );
}

export default SearchBar;
