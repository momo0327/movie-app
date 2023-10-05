import "./Header.scss";
import Navbar from "../Navbar/Navbar";
import Searchbar from "../SearchBar/SearchBar";

function Header({ allMovies }) {
  return (
    <div>
      <Navbar />
      {/* <Searchbar allMovies={allMovies} /> */}
    
    </div>
  );
}

export default Header;
