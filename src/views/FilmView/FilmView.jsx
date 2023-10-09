import "./FilmView.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";

function FilmView() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const storedMovie = localStorage.getItem("selectedMovie");
    if (storedMovie) {
      setMovie(JSON.parse(storedMovie));
    }
  }, []);

  // "title": "The Shawshank Redemption",
  // "year": 1994,
  // "rating": "R",
  // "actors": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
  // "genre": "Drama",
  // "synopsis": "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
  // "thumbnail": "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX380_CR0,4,380,562_.jpg"

  return (
    <div className="filmview__big-container">
      <Header />
      <div className="filmview">
        <img className="filmview__image" src={movie.thumbnail} alt="" />
        <section className="filmview__container">
          <article className="filmview__left">
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
