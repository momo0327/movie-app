import "./DisplayCarousel.scss";
import { useRef } from "react";
import arrowRight from "../../assets/arrowRight.svg";
import arrowLeft from "../../assets/arrowLeft.svg";
import SingleMovie from "../SingleMovie/SingleMovie";

function DisplayCarousel({ genreMovies }) {
  const gridRef = useRef(null);
  console.log(genreMovies);

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollLeft -= 200; // Anpassa detta värde efter dina behov
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollLeft += 200; // Anpassa detta värde efter dina behov
    }
  };

  return (
    <div className="display-carousel">
      <img
        className="arrow arrow-left"
        onClick={scrollLeft}
        src={arrowLeft}
        alt="arrow-right-icon"
      />
      <div className="grid" ref={gridRef}>
        {genreMovies ? (
          genreMovies.map((movie, index) => (
            <SingleMovie
              key={index}
              className="grid__item"
              title={movie.title}
              year={movie.year}
              thumbnail={movie.thumbnail}
              genre={movie.genre}
              actors={movie.actors}
              synopsis={movie.synopsis}
            />
          ))
        ) : (
          <p>error</p>
        )}
      </div>
      <img
        className="arrow arrow-right"
        onClick={scrollRight}
        src={arrowRight}
        alt="arrow-right-icon"
      />
    </div>
  );
}

export default DisplayCarousel;
