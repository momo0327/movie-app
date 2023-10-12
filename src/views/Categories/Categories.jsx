import "./Categories.scss";
import moviesData from "../../../movies.json";
import { useState, useEffect } from "react";
import DisplayCarousel from "../../components/DisplayCarousel/DisplayCarousel";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Categories() {
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    function getMovies() {
      try {
        const data = moviesData;
        setAllMovies(data);
      } catch (error) {
        console.error("Couldnt find any movies", error);
      }
    }
    getMovies();
  }, []);

  function getGenres(movies) {
    const uniqueGenres = new Set();

    movies.forEach((movie) => {
      const genres = movie.genre.split(", ").map((genre) => genre);
      genres.forEach((genre) => uniqueGenres.add(genre));
    });

    return Array.from(uniqueGenres);
  }

  const uniqueGenres = getGenres(allMovies);

  return (
    <div className="categories">
      <Header />
      <br />
      <h1 className="h1-categories" role="header">
        CATEGORIES
      </h1>
      <br />
      {uniqueGenres.map((genre) => (
        <div key={genre}>
          <h2 className="categories__title">{genre}</h2>
          <DisplayCarousel
            genreMovies={allMovies.filter((movie) =>
              movie.genre.includes(genre)
            )}
          />
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default Categories;
