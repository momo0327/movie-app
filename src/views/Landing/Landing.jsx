import "./Landing.scss";
import { useState, useEffect } from "react";
import DisplayCarousel from "../../components/DisplayCarousel/DisplayCarousel";
import moviesData from "../../../movies.json";
import Footer from "../../components/Footer/Footer";
import poster from '../../assets/midway-poster.jpg'
import Navbar from "../../components/Navbar/Navbar";

function Landing() {
  const [allMovies, setAllMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  console.log("Vi är i Landing!");
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
    const filteredMovies = allMovies.filter((movie) => !movie.isTrending);
    const randomMovies = getRandomMovies(filteredMovies, 7);
    setRecommendedMovies(randomMovies);

    const trendingMoviesData = getTrendingMovies(allMovies);
    setTrendingMovies(trendingMoviesData);
  }, [allMovies]);
  
  function getRandomMovies(movieArray, numberOfMovies) {
    const shuffledMovieArray = movieArray.sort(() => Math.random() - 0.5);
    return shuffledMovieArray.slice(0, numberOfMovies);
  }


  return (
    <div className="landing">
      
      <Navbar allMovies={allMovies} />
      <div className="header-body">
        <img className="poster-img " src={poster} alt="" />
      </div>
      <h3>TRENDING</h3>
      <DisplayCarousel genreMovies={trendingMovies} />
      <h3> RECOMMENDED </h3>
      <DisplayCarousel genreMovies={recommendedMovies}/>
      <Footer />
    </div>
  );
}

export default Landing;
