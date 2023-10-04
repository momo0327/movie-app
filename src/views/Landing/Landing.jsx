import "./Landing.scss";
import { useState, useEffect } from "react";
import DisplayCarousel from "../../components/DisplayCarousel/DisplayCarousel";
import Header from "../../components/Header/Header";
import moviesData from "../../../movies.json";
import Footer from "../../components/Footer/Footer";

function Landing() {
  const [allMovies, setAllMovies] = useState([]);

  const content = allMovies?.map((trend)=> {   // mappar ut allMovies för att få ut all trending movies
    if(trend.isTrending){   // om is trending finns så ska den returna titeln på trending filmen
      console.log(trend);

     return <div> {trend.title}   </div>
    }
    
  })
  
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
      {content}
      <Header allMovies={allMovies} />
      <DisplayCarousel />
      <Footer />
    </div>
  );
}

export default Landing;
