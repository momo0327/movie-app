import "./SingleMovie.scss";
import { useNavigate } from "react-router";
import bookmark from "./../../assets/bookmark.svg";

function SingleMovie({ title, thumbnail }) {
  const navigate = useNavigate();

  const handleViewFilm = () => {
    const movieData = { title, thumbnail };
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
  };

  return (
    <div>
      <article className="movie-card" onClick={handleViewFilm}>
        <img className="movie-card__image" src={thumbnail} alt="" />
        <div className="movie-card__info">
          <h4 className="movie-card__title">{title}</h4>
          <button className="movie-card__button" onClick={handleFavoriteWord}>
            add
          </button>
        </div>
      </article>
    </div>
  );
}

export default SingleMovie;
