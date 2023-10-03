import "./DisplayCarousel.scss";
import { useRef } from "react";
import arrowRight from "../../assets/arrowRight.svg";
import arrowLeft from "../../assets/arrowLeft.svg";
import SingleMovie from "../SingleMovie/SingleMovie";

function DisplayCarousel() {
  const gridRef = useRef(null);

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollLeft -= 500; // Anpassa detta värde efter dina behov
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollLeft += 500; // Anpassa detta värde efter dina behov
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
        <SingleMovie className="grid__item"/>
        <SingleMovie className="grid__item"/>
        <SingleMovie className="grid__item"/>
        <SingleMovie className="grid__item"/>
        <SingleMovie className="grid__item"/>
        <SingleMovie className="grid__item"/>
        <SingleMovie className="grid__item"/>
        <SingleMovie className="grid__item"/>
        <SingleMovie className="grid__item"/>
        <SingleMovie className="grid__item"/>
        <SingleMovie className="grid__item"/>
        <SingleMovie className="grid__item"/>
        <SingleMovie className="grid__item"/>
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
