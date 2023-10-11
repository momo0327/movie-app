import "./Bookmarks.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FavoriteMoviesContext } from "../../components/LocalStorageContext/LocalStorageContext";

function Bookmarks() {
  const { favoriteMovies, removeMovie } = useContext(FavoriteMoviesContext); // hämtar remove funktion och favorieMovies array från context.

  function handleDelete(indexToDelete) {
    // Skicka med index från klicket för att ta bort filmen.
    const movieToRemove = favoriteMovies[indexToDelete];
    removeMovie(movieToRemove); // Använd removeMovie-funktionen från kontexten för att ta bort filmen.
  }
  return (
    <div className="booksmarks">
      <Header />
      <h3>FAVORITES: </h3>
      <br />
      <div className="booksmarks__grid">
        {favoriteMovies.length > 0
          ? favoriteMovies.map((movie, index) => (
              <div className="booksmarks__container" key={index}>
                <img
                  src={movie.thumbnail}
                  alt="movie-img"
                  className="booksmarks__img"
                />
                <aside className="booksmarks__text-container">
                  <h3 className="booksmarks__title">{movie.title}</h3>
                  <FontAwesomeIcon
                    data-testid="remove-booksmark"
                    icon={faBookmark}
                    className={`booksmarks__icon`}
                    onClick={() => handleDelete(index)}
                  />
                </aside>
              </div>
            ))
          : null}
      </div>
      <Footer />
    </div>
  );
}

export default Bookmarks;
