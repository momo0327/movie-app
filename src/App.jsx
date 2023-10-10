import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import FilmView from "./views/FilmView/FilmView";
import Categories from "./views/Categories/Categories";
import Bookmarks from "./views/Bookmarks/Bookmarks";
// import Header from "./components/Header/Header";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/movie-app/",
      element: <Landing />,
    },
    {
      path: "/movie-app/film-view",
      element: <FilmView />,
    },
    {
      path: "/movie-app/categories",
      element: <Categories />,
    },
    {
      path: "/movie-app/bookmarks",
      element: <Bookmarks />,
    },
    {
      path: "*",
      element: <Landing />,
    },
  ]);
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
