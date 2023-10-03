import "./SearchBar.scss";

function SearchBar() {
  return (
    <div className="SearchBar">
      <input className="SearchBar__input" type="text" placeholder="Search movies here..." />
    </div>
  )
}

export default SearchBar;
