import "./SearchBar.scss";
import { useState } from "react";
import movies from "../../../movies.json";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  let filteredMovies = []
  
    filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().startsWith(inputValue)
});

  return (
    <div className="SearchBar">
      <input
        className="SearchBar__input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Search movies here..."
      />
        {(filteredMovies.length > 0 && inputValue) ? (
         <aside className="SearchBar__aside">
        {filteredMovies.map((movie) => {
          return (
            <div className="SearchBar__movie">
              <img
                className="SearchBar__movie__img"
                src={movie.thumbnail}
                alt={movie.title}
              />
                <h2 className="SearchBar__movie__title">{movie.title}</h2>
                <p className="SearchBar__movie__year">{movie.year}</p>
            </div>
          );
        })}
        </aside> 
        ) : inputValue && (
          <aside className="SearchBar__error">
          <p className="SearchBar__error--text">No movies found</p>
          </aside>
        ) }
      </div>
  );
  
}

export default SearchBar;
