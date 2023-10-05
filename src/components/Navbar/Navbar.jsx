import "./Navbar.scss";
import { useNavigate } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
function Navbar(allMovies) {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <h1>Movie<span>Find</span> </h1>
      </div>

      <ul className="navbar__list">
        <li
          onClick={() => {
            navigate("/movie-app");
          }}
        >
          HOME
        </li>
        <br />
        <li
          onClick={() => {
            navigate("/movie-app/categories");
          }}
        >
          CATEGORIES
        </li>
        <br />
        <li
          onClick={() => {
            navigate("/movie-app/bookmarks");
          }}
        >
          {" "}
          FAVORITES
        </li>
      </ul>
      <SearchBar allMovies={allMovies}/>
    </div>
  );
}

export default Navbar;
