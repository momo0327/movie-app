import "./FilmView.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import missingImage from "../../assets/noimage.jpeg";
import { FavoriteMoviesContext } from "../../components/LocalStorageContext/LocalStorageContext";

function FilmView() {
  const [movie, setMovie] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const { addMovie, removeMovie } = useContext(FavoriteMoviesContext);

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
  }, [movie.title]);

  const handleFavoriteMovie = () => {
    if (isFavorite) {
      removeMovie(movie);
      setIsFavorite(false);
    } else {
      addMovie(movie);
      setIsFavorite(true);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = missingImage;
  };

  return (
    <div className="filmview__big-container">
      <Header />
      <div className="filmview">
        <img
          className="filmview__image"
          src={movie.thumbnail}
          alt=""
          onError={handleImageError}
        />
        <section className="filmview__container">
          <article className="filmview__left">
            <h3 className="filmview__title">{movie.title}</h3>
            <FontAwesomeIcon
              data-testid="filmview-bookmark"
              icon={faBookmark}
              className={`filmview__icon ${isFavorite ? "active" : ""}`}
              onClick={handleFavoriteMovie}
            />
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
