import "./FilmView.scss";

function FilmView() {

 // "title": "The Shawshank Redemption",
  // "year": 1994,
  // "rating": "R",
  // "actors": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
  // "genre": "Drama",
  // "synopsis": "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
  // "thumbnail": "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_QL75_UX380_CR0,4,380,562_.jpg"


return (
  <div className="filmview">
    <div className="filmview__image"> IMAGE</div>
  <section className="filmview__container">
    <article className="filmview__left">
      <h3>The Shawshank Redemption</h3>
      <h4>Year: 1994</h4>
      <p>Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.</p>
    </article>
    <article className="filmview__right">
      <h4>Actors: Tim Robbins, Morgan Freeman, Bob Gunton</h4>
      <h4>Genre: Drama</h4>
      <button className="filmview__button">Add/Remove</button>
    </article>
  </section>
</div>
)
}

export default FilmView;
