import "./Landing.scss";
import { useState, useEffect } from "react";
import DisplayCarousel from "../../components/DisplayCarousel/DisplayCarousel";
import Header from "../../components/Header/Header";
import moviesData from "../../../movies.json";
import Footer from "../../components/Footer/Footer";
import SingleMovie from "../../components/SingleMovie/SingleMovie";

function Landing() {
  const [allMovies, setAllMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([])
  console.log(recommendedMovies)
  const trendingMovies = getTrendingMovies(allMovies)

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

  function getTrendingMovies(movies){
    return movies.filter((movie) => movie.isTrending)
  }

  useEffect(() => {
    const filteredMovies = allMovies.filter((movie) => !movie.isTrending); //filtrerar bort filmer som är IsTrending
    const randomMovies = getRandomMovies(filteredMovies, 7);
    setRecommendedMovies(randomMovies);
  }, [allMovies]);
  
  function getRandomMovies(movieArray, numberOfMovies) { // tar emot filteredMovies och siffran på hur många filmer vi vill slumpa ut
    const shuffledMovieArray = movieArray.sort(() => Math.random() - 0.5); // här blandas movieArray om slumpmässigt med hjälp av metoden sort().
    return shuffledMovieArray.slice(0, numberOfMovies); // tar de första filmerna, hur många det är styrs av numberOfMovies
  }


  return (
    <div className="landing">
      
      <Header allMovies={allMovies} />
      <DisplayCarousel genreMovies={trendingMovies} />
      <DisplayCarousel genreMovies={recommendedMovies}/>
      <Footer />
    </div>
  );
}

export default Landing;
