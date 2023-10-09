import "./Footer.scss";
import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className="links-footer">LINKS</h2>

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
      </div>
      <div className="footer-copywrite">
        <p>moviefind@loremipsum.com</p>
      </div>
      <div className="footer-mewsletter">
        <b className="footer__subscribe-text">
          SUBSCRIBE TO OUR <br />
          NEWSLETTER!
        </b>
      </div>
    </footer>
  );
}

export default Footer;
