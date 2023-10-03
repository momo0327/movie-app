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
    <section>
      <article>
        <h3>Title</h3>
        <h4>year</h4>
        <h4>handling</h4>
      </article>
      <article>
        <h4>Actors</h4>
        <h4>Genre</h4>
      </article>
    </section>
  </div>)
}




export default FilmView;
