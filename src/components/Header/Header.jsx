import "./Header.scss";
import Navbar from "../Navbar/Navbar";
import Searchbar from "../SearchBar/SearchBar";
import poster from '../../assets/midway-poster.jpg'

function Header({ allMovies }) {
  return (
    <div>
      <Navbar />
      <Searchbar allMovies={allMovies} />
      <div className="header-body">
        <img src={poster} alt="" />
      </div>
    </div>
  );
}

export default Header;
