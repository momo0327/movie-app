import "./Navbar.scss";
import { useNavigate } from "react-router";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar(allMovies) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <h1
          onClick={() => {
            navigate("/movie-app");
          }}
        >
          Movie<span>Find</span>{" "}
        </h1>
      </div>

      <div className="navbar__menu-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <ul className={`navbar__list ${isOpen ? "is-open" : ""}`}>
        <li
          className="navbar__li"
          onClick={() => {
            navigate("/movie-app");
            setIsOpen(false);
          }}
        >
          HOME
        </li>
        <br />
        <li
          className="navbar__li"
          onClick={() => {
            navigate("/movie-app/categories");
            setIsOpen(false);
          }}
        >
          CATEGORIES
        </li>
        <br />
        <li
          className="navbar__li"
          onClick={() => {
            navigate("/movie-app/bookmarks");
            setIsOpen(false);
          }}
        >
          {" "}
          FAVORITES
        </li>
      </ul>
      <SearchBar allMovies={allMovies} />
    </div>
  );
}

export default Navbar;
