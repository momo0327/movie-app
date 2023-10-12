import { createContext, useState, useEffect } from "react";

//skapar en context med createContext.
export const FavoriteMoviesContext = createContext();

// Skapa en provider-komponent för vår kontext som tar emot "children" som props.
export const FavoriteMoviesProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Använd useEffect-hooken för att hämta tidigare sparade favoritfilmer från localStorage när komponenten renderas.
  useEffect(() => {
    // Hämta data från localStorage eller en tom array om det inte finns några sparade favoritfilmer.
    const storedMovies =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavoriteMovies(storedMovies);
  }, []);

  // Funktion som  lägger till en ny favoritfilm i listan.
  function addMovie(newMovie) {
    // Kontrollera om filmen redan finns i listan.
    const existingMovie = favoriteMovies.find(
      (currentMovie) => currentMovie.title === newMovie.title
    );

    if (!existingMovie) {
      // Om filmen inte redan finns, kopiera den befintliga listan och lägg till den nya filmen.
      const updatedMovies = structuredClone([...favoriteMovies, newMovie]);
      
      // Spara den uppdaterade listan i localStorage som JSON.
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedMovies));
      setFavoriteMovies(updatedMovies);
    }
  }

  // Funktion som tar bort en favoritfilm från listan.
  function removeMovie(movieToRemove) {
    // Filtrera bort filmen som ska tas bort från listan.
    const updatedMovies = favoriteMovies.filter(
      (movie) => movie.title !== movieToRemove.title
    );

    // Spara den uppdaterade listan i localStorage som JSON.
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedMovies));
    setFavoriteMovies(updatedMovies);
  }

  // Returnera vår provider med våran context och de värden och funktioner vi behöver. (favoriteMovies, addMovie, removeMovie).
  return (
    <FavoriteMoviesContext.Provider
      value={{
        favoriteMovies,
        addMovie,
        removeMovie,
      }}
    >
      {children}
    </FavoriteMoviesContext.Provider>
  );
};
