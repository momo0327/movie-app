import "./Bookmarks.sass";
import SingleMovie from "../../components/SingleMovie/SingleMovie";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Bookmarks() {
  const storedMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  return (
    <div>
      <Header />
      {storedMovies.map((movie, index) => (
        <SingleMovie
          key={index}
          title={movie.title}
          thumbnail={movie.thumbnail}
        />
      ))}
      <Footer />
    </div>
  );
}

export default Bookmarks;
