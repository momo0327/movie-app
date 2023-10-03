import "./Categories.sass";
import { useNavigate } from "react-router";

function Categories() {
const navigate = useNavigate()
  return <div>Categories

    <button onClick={()=> {navigate("/movie-app/")}}>back</button>
  </div>;
}

export default Categories;
