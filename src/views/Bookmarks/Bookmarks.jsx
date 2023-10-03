import "./Bookmarks.sass";
import { useNavigate } from "react-router";

function Bookmarks() {
  const navigate = useNavigate()
  return <div>Bookmarks

    <button onClick={()=>{navigate("/movie-app/")}}>back</button>
  </div>;
}

export default Bookmarks;
