import "./FilmView.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function FilmView() {
  const [movie, setMovie] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
    if (storedMovie) {
      setMovie(storedMovie);
      const storedMovies =
        JSON.parse(localStorage.getItem("favoriteMovies")) || [];
      const isFav = storedMovies.some(
        (storedMovie) => storedMovie.title === movie.title
      );
      setIsFavorite(isFav);
    }
  }, []);

  const handleFavoriteMovie = () => {
    const storedMovies =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    let movieAlreadyInList = false;

    storedMovies.forEach((storedMovie) => {
      if (storedMovie.title === movie.title) {
        movieAlreadyInList = true;
        return;
      }
    });

    if (!movieAlreadyInList) {
      storedMovies.push(movie);
      localStorage.setItem("favoriteMovies", JSON.stringify(storedMovies));
      setIsFavorite(true);
    }
  };

  return (
    <div className="filmview__big-container">
      <Header />
      <div className="filmview">
        <img className="filmview__image" src={movie.thumbnail} alt="" />
        <section className="filmview__container">
          <article className="filmview__left">
            <FontAwesomeIcon
              icon={faBookmark}
              className={`filmview__icon ${isFavorite ? "active" : ""}`}
              onClick={handleFavoriteMovie}
            />
            <h3 className="filmview__title">{movie.title}</h3>

            <h4>Year: {movie.year}</h4>
            <p>{movie.synopsis}</p>
          </article>
          <article className="filmview__right">
            <h4>Actors: </h4>
            {movie.actors &&
              movie.actors.map((actor, index) => <p key={index}>{actor}</p>)}
            <h4>Genre: {movie.genre}</h4>
          </article>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default FilmView;
