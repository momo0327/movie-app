import "./SingleMovie.scss";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import missingImage from "../../assets/noimage.jpeg";
import { FavoriteMoviesContext } from "../LocalStorageContext/LocalStorageContext";

function SingleMovie({ title, year, thumbnail, genre, actors, synopsis }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  // importerar funkttioner och array från context och localstorage.
  const { addMovie, removeMovie, favoriteMovies } = useContext(
    FavoriteMoviesContext
  );
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
    const movieToAdd = {
      title,
      thumbnail: imageError ? missingImage : thumbnail,
    };
    addMovie(movieToAdd); // Anropar funktionen addMovie från vår context och lägger till den nya filmen.

    // Kontrollera om filmen redan finns i favoritlistan
    const existingMovie = favoriteMovies.find(
      (movie) => movie.title === movieToAdd.title
    );
    if (isFavorite) {
      // Om filmen redan är en favorit, ta bort den från listan och uppdatera "isFavorite"-statet till false.
      removeMovie(movieToAdd);
      setIsFavorite(false);
    } else {
      // Om filmen inte redan är en favorit, kontrollera om "existingMovie" är definierad.
      // Om den är det, sätt "isFavorite" till true, annars är den false.
      setIsFavorite(existingMovie !== undefined);
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
