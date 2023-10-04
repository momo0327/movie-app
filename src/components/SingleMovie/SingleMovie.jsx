import "./SingleMovie.scss";
import { useNavigate } from "react-router";

function SingleMovie({ title, thumbnail }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const movieData = { title, thumbnail };
    localStorage.setItem("selectedMovie", JSON.stringify(movieData));
    console.log(movieData);
    navigate("/movie-app/film-view");
  };

  return (
    <div>
      <article className="movie-card" onClick={handleClick}>
        <img className="movie-card__image" src={thumbnail} alt="" />
        <div className="movie-card__info">
          <h4 className="movie-card__title">{title}</h4>
          <button className="movie-card__button">add</button>
        </div>
      </article>
    </div>
  );
}

export default SingleMovie;
