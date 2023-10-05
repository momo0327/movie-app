import "./Categories.scss";
import moviesData from "../../../movies.json";
import { useState, useEffect } from "react";
import DisplayCarousel from "../../components/DisplayCarousel/DisplayCarousel";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Categories() {
  const [allMovies, setAllMovies] = useState([]);

  console.log(allMovies);

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
    const uniqueGenres = new Set(); // set är en datatyp som bara kan lagra unika värden, går inte få dubbelt av något

    movies.forEach((movie) => {
      const genres = movie.genre.split(", ").map((genre) => genre); //Delar upp genresträngen i varje movie.genre så att den kan söka igenom sträng för sträng(vissa genre har fler än 1 och då ligger dom i en gemensam sträng)
      genres.forEach((genre) => uniqueGenres.add(genre)); // Lägger till alla genres i uniqueGenres
    });

    return Array.from(uniqueGenres); // Gör om Set till en vanlig js-array
  }

  const uniqueGenres = getGenres(allMovies);
  console.log(uniqueGenres);

  return (
    <div className="categories">
      <Header />
      <br />
      <h1 className="h1-categories">CATEGORIES</h1>
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
