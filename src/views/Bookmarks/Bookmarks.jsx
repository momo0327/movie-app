import "./Bookmarks.scss";
import SingleMovie from "../../components/SingleMovie/SingleMovie";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";

function Bookmarks() {
  const [storedMovies, setStoredMovies] = useState();

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

  return (
    <div className="booksmarks">
      <Header />
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
                  <h3 className="bookmarks__title">{movie.title}</h3>
                  <button
                    className="booksmarks__button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
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
