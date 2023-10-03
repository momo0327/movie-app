import "./Landing.sass";
import { useState, useEffect } from "react";
import DisplayCarousel from "../../components/DisplayCarousel/DisplayCarousel";
import Header from "../../components/Header/Header";
import moviesData from "../../../movies.json";

function Landing() {
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

  return (
    <div>
      <Header allMovies={allMovies} />
      <DisplayCarousel />
    </div>
  );
}

export default Landing;
