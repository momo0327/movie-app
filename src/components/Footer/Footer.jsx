import "./Footer.scss";
import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <li
        className="footer__li"
        onClick={() => {
          navigate("/movie-app");
        }}
      >
        HOME
      </li>
      <li
        className="footer__li"
        onClick={() => {
          navigate("/movie-app/categories");
        }}
      >
        CATEGORIES
      </li>
      <li
        className="footer__li"
        onClick={() => {
          navigate("/movie-app/bookmarks");
        }}
      >
        FAVORITES
      </li>
    </footer>
  );
}

export default Footer;
