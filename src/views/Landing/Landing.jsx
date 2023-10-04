import "./Landing.scss";
import { useState, useEffect } from "react";
import DisplayCarousel from "../../components/DisplayCarousel/DisplayCarousel";
import Header from "../../components/Header/Header";
import moviesData from "../../../movies.json";
import Footer from "../../components/Footer/Footer";
import SingleMovie from "../../components/SingleMovie/SingleMovie";

function Landing() {
  const [allMovies, setAllMovies] = useState([]);

  // const content = allMovies?.map((trend)=> {   // mappar ut allMovies för att få ut all trending movies
  //   if(trend.isTrending){   // om is trending finns så ska den returna titeln på trending filmen
  //     console.log(trend);
  //     return <DisplayCarousel  trendMovies={trend}   />
    
  //   }
    
  // })

function getTrendingMovies(movies){
  return movies.filter((movie) => movie.isTrending)
}

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

  return (
    <div className="landing">
      
      <Header allMovies={allMovies} />
      <DisplayCarousel genreMovies={trendingMovies} />
      <Footer />
    </div>
  );
}

export default Landing;
