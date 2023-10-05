import "./SingleMovie.scss";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function SingleMovie({ title, year, thumbnail, genre, actors, synopsis }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleViewFilm = () => {
    const movieData = { title, year, thumbnail, genre, actors, synopsis };
    localStorage.setItem("selectedMovie", JSON.stringify(movieData));
    console.log(movieData);
    navigate("/movie-app/film-view");
  };

  const handleFavoriteWord = () => {
    const storedMovieData = { title, thumbnail };
    const storedMovies =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    storedMovies.push(storedMovieData);
    localStorage.setItem("favoriteMovies", JSON.stringify(storedMovies));

    setIsFavorite(true);
  };

  return (
    <div>
      <article className="movie-card">
        <div className="movie-card__image-container">
          <img
            className="movie-card__image"
            src={thumbnail}
            alt="movie-img"
            onClick={handleViewFilm}
          />
          <div className="movie-card__info">
            <h4 className="movie-card__title">{title}</h4>
            <FontAwesomeIcon
              icon={faBookmark}
              onClick={handleFavoriteWord}
              className={`movie-card__bookmark-icon ${
                isFavorite ? "movie-card__bookmark-icon--active" : ""
              }`}
            />
          </div>
        </div>
      </article>
    </div>
  );
}

export default SingleMovie;
