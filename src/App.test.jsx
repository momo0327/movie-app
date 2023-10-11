import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import userEvent from "@testing-library/user-event";
import SingleMovie from "./components/SingleMovie/SingleMovie";
import Bookmarks from "./views/Bookmarks/Bookmarks";
import Categories from "./views/Categories/Categories";
import FilmView from "./views/FilmView/FilmView";

// testar navigering till categorie view
describe("App", () => {
  it("should navigate to categories view", async () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );

    const categoriesLink = await screen.getByTestId("categories"); // hämtar LI taggen ifrån navbar, där det ligger en onclick i

    await userEvent.click(categoriesLink); // clickar på den li taggen
    expect(await window.location.pathname).toBe("/movie-app/categories"); // kollar om url stämmer över categories menyn
  });
});

// testar navigering från categories till film-view
describe("App", () => {
  it("should click on a movie and check the url film-view", async () => {
    render(
      <BrowserRouter>
        <SingleMovie />
      </BrowserRouter>
    );

    const singleMovieClick = await screen.getByTestId("SingleMovie"); // hämtar img taggen ifrån singlemovie, där det ligger en onclick i

    await userEvent.click(singleMovieClick); // clickar på den img taggen, eftersom att användaren kommer att klicka på bilen för att komma till film-view
    expect(await window.location.pathname).toBe("/movie-app/film-view"); // kollar om url stämmer över film-view
  });
  it("should add a movie by clicking bookmark, go to favorites and see the favorite there", async () => {
    const entries = "/movie-app/";
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[entries]}>
        <Routes>
          <Route path="/movie-app/" element={<Landing />} />
          <Route path="/movie-app/bookmarks" element={<Bookmarks />} />
        </Routes>
      </MemoryRouter>
    );
    const bookmark = screen.getAllByTestId("bookmark");
    user.click(bookmark[0]);
    const navigationToBookMark = screen.getAllByText("FAVORITES");
    await user.click(navigationToBookMark[0]);
    const favoriteMovie = screen.getByText(/The Godfather: Part II/i);
    expect(favoriteMovie).toBeInTheDocument();
  });
  it("should add a movie by clicking bookmark, go to favorites and click the bookmark to remove the favorite movie", async () => {
    const entries = "/movie-app/";
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[entries]}>
        <Routes>
          <Route path="/movie-app/" element={<Landing />} />
          <Route path="/movie-app/bookmarks" element={<Bookmarks />} />
        </Routes>
      </MemoryRouter>
    );
    const bookmark = screen.getAllByTestId("bookmark");
    user.click(bookmark[0]);
    const navigationToBookMark = screen.getAllByText("FAVORITES");
    await user.click(navigationToBookMark[0]);
    const favoriteMovie = screen.getByText(/The Godfather: Part II/i);
    expect(favoriteMovie).toBeInTheDocument();
    const removeBookMark = screen.getByTestId("remove-bookmark");
    await user.click(removeBookMark);
    expect(favoriteMovie).not.toBeInTheDocument();
  });
  it("should not add the same movie multiple times when clicking more than once on bookmark", async () => {
    const entries = "/movie-app/";
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[entries]}>
        <Routes>
          <Route path="/movie-app/" element={<Landing />} />
          <Route path="/movie-app/bookmarks" element={<Bookmarks />} />
        </Routes>
      </MemoryRouter>
    );
    const bookmark = screen.getAllByTestId("bookmark");
    await user.click(bookmark[0]);
    await user.click(bookmark[0]);
    const navigationToBookMark = screen.getAllByText("FAVORITES");
    await user.click(navigationToBookMark[0]);
    const favoriteMovie = screen.queryAllByText(/The Godfather: Part II/i);
    expect(favoriteMovie.length).toBe(1);
  });
  it("should display image on every movie", async () => {
    const entries = "/movie-app/";
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[entries]}>
        <Routes>
          <Route path="/movie-app/" element={<Landing />} />
          <Route path="/movie-app/categories" element={<Categories />} />
        </Routes>
      </MemoryRouter>
    );
    const navigationToCategories = screen.getAllByText("CATEGORIES");
    await user.click(navigationToCategories[0]);

    const images = await screen.findAllByAltText("movie-img");
    expect(images).toHaveLength(69);
    // render error img?
  });
  it("should be able to mark movie as a bookmark from filmView", async () => {
    const entries = "/movie-app/";
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[entries]}>
        <Routes>
          <Route path="/movie-app/" element={<Landing />} />
          <Route path="/movie-app/film-view" element={<FilmView />} />
          <Route path="/movie-app/bookmarks" element={<Bookmarks />} />
        </Routes>
      </MemoryRouter>
    );
    const image = screen.getAllByAltText("movie-img");
    await user.click(image[0]);
    const filmViewBookmark = screen.getByTestId("filmview-bookmark");
    await user.click(filmViewBookmark);
    const navigationToFavorites = screen.getAllByText("FAVORITES");
    await user.click(navigationToFavorites[0]);
    const favoriteMovie = screen.getByText(/The Godfather: Part II/i);
    expect(favoriteMovie).toBeInTheDocument();
  });
});
