import "./Bookmarks.scss";
import SingleMovie from "../../components/SingleMovie/SingleMovie";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function Bookmarks() {
  const [storedMovies, setStoredMovies] = useState();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("favoriteMovies")) || []; // hämtar data fråm arrayen i localStorage och lägger i en variabel.
    setStoredMovies(movies);
  }, []);

  function handleDelete(indexToDelete) {
    // skickar med index från klicket för att kunna deletea filmen.
    const updatedMovies = storedMovies.filter(
      (movie, index) => index !== indexToDelete
    );
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedMovies)); // uppdaterar
    setStoredMovies(updatedMovies);
  }
  function handleDelete(indexToDelete) {
    const updatedMovies = storedMovies.filter(
      (movie, index) => index !== indexToDelete
    );
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedMovies));
    setStoredMovies(updatedMovies);

    // Set isFavorite to false
    setIsFavorite(true);
  }

  return (
    <div className="booksmarks">
      <Header />
      <h3>FAVORITES: </h3>
      <br />
      <div className="booksmarks__grid">
        {storedMovies
          ? storedMovies.map((movie, index) => (
              <div className="booksmarks__container" key={index}>
                <img
                  src={movie.thumbnail}
                  alt="movie-img"
                  className="booksmarks__img"
                />
                <aside className="booksmarks__text-container">
                  <h3 className="booksmarks__title">{movie.title}</h3>
                  <FontAwesomeIcon
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
