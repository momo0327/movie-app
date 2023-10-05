import "./SearchBar.scss";
import { useState, useRef } from "react";

function SearchBar({ allMovies }) {
  const [inputValue, setInputValue] = useState("");
  const [displayMovies, setDisplayMovies] = useState(null);
  let filteredMovies = []
      
    filteredMovies = allMovies.filter((movie) => {
    return movie.title.toLowerCase().startsWith(inputValue)

    });
    if (filteredMovies.length > 0 && inputValue.length > 0) {
    }
  console.log(filteredMovies)
  return (
    <div className="SearchBar">
      <input
        className="SearchBar__input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Search movies here..."
      />
      
        {(filteredMovies.length > 0 && inputValue) && <aside className="SearchBar__aside">
        {filteredMovies.map((movie) => {
          return (
            <div className="SearchBar__movie">
              <img
                className="SearchBar__img"
                src={movie.thumbnail}
                alt={movie.title}
              />
              <div className="SearchBar__movie__info">
                <h3 className="SearchBar__movie__title">{movie.title}</h3>
                <p className="SearchBar__movie__year">{movie.year}</p>
              </div>
            </div>
          );
        })}
        </aside>  }
      {displayMovies}
        
    </div>
  );
}

export default SearchBar;
