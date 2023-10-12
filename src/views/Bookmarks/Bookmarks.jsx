import "./Bookmarks.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useContext } from "react";
import { FavoriteMoviesContext } from "../../components/LocalStorageContext/LocalStorageContext";
import SingleMovie from "../../components/SingleMovie/SingleMovie";
import { useNavigate } from "react-router";

function Bookmarks() {
  const { favoriteMovies, removeMovie } = useContext(FavoriteMoviesContext);

  const navigate = useNavigate();
  function handleDelete(titleToDelete) {
    const movieToRemove = favoriteMovies.find(
      (movie) => movie.title === titleToDelete
    );
    removeMovie(movieToRemove);
  }

  function sendFilmInfoToFilmView(movie) {
    const movieData = {
      title: movie.title,
      year: movie.year,
      thumbnail: movie.thumbnail,
      genre: movie.genre,
      actors: movie.actors,
      synopsis: movie.synopsis,
    };
    localStorage.setItem("selectedMovie", JSON.stringify(movieData));
    navigate("/movie-app/film-view");
  }

  return (
    <div className="booksmarks">
      <Header />
      <h3>FAVORITES: </h3>
      <br />
      <div className="booksmarks__grid">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie, index) => (
            <SingleMovie
              onClick={() => sendFilmInfoToFilmView(movie)}
              key={movie.title}
              title={movie.title}
              year={movie.year}
              thumbnail={movie.thumbnail}
              genre={movie.genre}
              actors={movie.actors}
              synopsis={movie.synopsis}
              handleFavoriteMovie={() => handleDelete(index)}
            />
          ))
        ) : (
          <p className="booksmarks__empty">You have no favorites yet!</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Bookmarks;
