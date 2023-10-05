import "./Footer.scss";
import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div>
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
        <p>copywrite@loremipsum.com</p>
      </div>
      <div className="footer-mewsletter">
        
       <b>SUBSCRIBE TO OUR <br />NEWSLETTER!</b> 
      </div>
    </footer>
  );
}

export default Footer;
