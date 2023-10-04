import "./SingleMovie.scss";
import Landing from "../../views/Landing/Landing";


function SingleMovie( {title, thumbnail} ) {


   return (
    <div>
      <article className="movie-card">
        <img className="movie-card__image" src={thumbnail} alt="" />
        <div className="movie-card__info">
        <h4 className="movie-card__title">{title}</h4>
        <button className="movie-card__button">add</button>
        </div>
      </article>
    </div>
  )
}

export default SingleMovie;
