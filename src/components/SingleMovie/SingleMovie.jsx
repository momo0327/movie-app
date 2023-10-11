import "./SingleMovie.scss";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import missingImage from "../../assets/noimage.jpeg";

function SingleMovie({ title, year, thumbnail, genre, actors, synopsis }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleViewFilm = () => {
    const movieData = {
      title,
      year,
      thumbnail: imageError ? missingImage : thumbnail,
      genre,
      actors,
      synopsis,
    };
    localStorage.setItem("selectedMovie", JSON.stringify(movieData));
    navigate("/movie-app/film-view");
  };

  const handleFavoriteMovie = () => {
    const storedMovieData = {
      title,
      thumbnail: imageError ? missingImage : thumbnail,
    }; //filmen man klickat på
    const storedMovies =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    let movieAlreadyInList = false;

    storedMovies.forEach((movie) => {
      if (movie.title === storedMovieData.title) {
        movieAlreadyInList = true;
        return;
      }
    });

    if (movieAlreadyInList == false) {
      storedMovies.push(storedMovieData); //lägger till filmen i listan
      localStorage.setItem("favoriteMovies", JSON.stringify(storedMovies)); //sparar den uppdaterade listan i localstorage
      setIsFavorite(true);
    }
  };

  return (
    <div>
      <article className="movie-card" role="movie-card">
        <div className="movie-card__image-container">
          {imageError ? (
            <img
              className="movie-card__image"
              src={missingImage}
              onClick={handleViewFilm}
            />
          ) : (
            <img
              className="movie-card__image"
              src={thumbnail}
              alt="movie-img"
              onClick={handleViewFilm}
              onError={handleImageError}
              data-testid="SingleMovie"
            />
          )}
          <div className="movie-card__info">
            <h4 className="movie-card__title">{title}</h4>
            <h4 className="movie-card__year">{year}</h4>
            <FontAwesomeIcon
              data-testid="bookmark"
              icon={faBookmark}
              onClick={handleFavoriteMovie}
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
