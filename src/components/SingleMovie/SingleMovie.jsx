import "./SingleMovie.scss";

function SingleMovie() {

   return (
    <div>
      <article className="movie-card">
        <div className="movie-card__image">IMAGE</div>
        <div className="movie-card__info">
        <h4 className="movie-card__title">The Shawshank Redemption</h4>
        <button className="movie-card__button">add</button>
        </div>
      </article>
    </div>
  )
}

export default SingleMovie;
