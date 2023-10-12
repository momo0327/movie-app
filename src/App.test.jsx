import { it, expect } from "vitest"; //describe
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import userEvent from "@testing-library/user-event";
import SingleMovie from "./components/SingleMovie/SingleMovie";
import Bookmarks from "./views/Bookmarks/Bookmarks";
import Categories from "./views/Categories/Categories";
import FilmView from "./views/FilmView/FilmView";
import { FavoriteMoviesProvider } from "./components/LocalStorageContext/LocalStorageContext";

it("should click on a movie and check the url film-view", async () => {
  render(
    <FavoriteMoviesProvider>
      <BrowserRouter>
        <SingleMovie />
      </BrowserRouter>
    </FavoriteMoviesProvider>
  );

  const singleMovieClick = screen.getByTestId("SingleMovie");

  await userEvent.click(singleMovieClick);
  expect(window.location.pathname).toBe("/movie-app/film-view");
});

it("should add a movie by clicking bookmark, go to favorites and see the favorite there", async () => {
  const entries = "/movie-app/";
  const user = userEvent.setup();

  render(
    <FavoriteMoviesProvider>
      <MemoryRouter initialEntries={[entries]}>
        <Routes>
          <Route path="/movie-app/" element={<Landing />} />
          <Route path="/movie-app/bookmarks" element={<Bookmarks />} />
        </Routes>
      </MemoryRouter>
    </FavoriteMoviesProvider>
  );

  const bookmark = screen.getAllByTestId("bookmark");
  user.click(bookmark[0]);

  const navigationToBookMark = screen.getAllByText("FAVORITES");
  await user.click(navigationToBookMark[0]);

  const favoriteMovie = screen.getByText(/The Godfather: Part II/i);
  expect(favoriteMovie).toBeInTheDocument();
});

it("should add a movie to favorites by clicking on the bookmark on the Landing-page, then remove it from favorites by clicking on it again", async () => {
  const entries = "/movie-app/";
  const user = userEvent.setup();
  render(
    <FavoriteMoviesProvider>
      <MemoryRouter initialEntries={[entries]}>
        <Routes>
          <Route path="/movie-app/" element={<Landing />} />
          <Route path="/movie-app/bookmarks" element={<Bookmarks />} />
        </Routes>
      </MemoryRouter>
    </FavoriteMoviesProvider>
  );
  const bookmark = screen.getAllByTestId("bookmark");

  await user.click(bookmark[0]);
  const navigationToBookMarks = screen.getAllByText("FAVORITES");

  await user.click(navigationToBookMarks[0]);

  await waitFor(() => {
    screen.findByText("The Godfather: Part II");
  });

  const navigationToLanding = screen.getAllByText("HOME");
  await user.click(navigationToLanding[0]);

  await user.click(bookmark[0]);

  const secondNavigationToBookMarks = screen.getAllByText("FAVORITES");
  await user.click(secondNavigationToBookMarks[0]);

  await waitFor(() => {
    screen.findByText("You have no favorites yet!");
  });
});

it("should display image on every movie", async () => {
  const entries = "/movie-app/";
  const user = userEvent.setup();

  render(
    <FavoriteMoviesProvider>
      <MemoryRouter initialEntries={[entries]}>
        <Routes>
          <Route path="/movie-app/" element={<Landing />} />
          <Route path="/movie-app/categories" element={<Categories />} />
        </Routes>
      </MemoryRouter>
    </FavoriteMoviesProvider>
  );
  const navigationToCategories = screen.getAllByText("CATEGORIES");
  await user.click(navigationToCategories[0]);

  const images = await screen.findAllByAltText("movie-img");
  expect(images).toHaveLength(69);
});

it("should be able to mark movie as a bookmark from filmView", async () => {
  const entries = "/movie-app/";
  const user = userEvent.setup();
  render(
    <FavoriteMoviesProvider>
      <MemoryRouter initialEntries={[entries]}>
        <Routes>
          <Route path="/movie-app/" element={<Landing />} />
          <Route path="/movie-app/film-view" element={<FilmView />} />
          <Route path="/movie-app/bookmarks" element={<Bookmarks />} />
        </Routes>
      </MemoryRouter>
    </FavoriteMoviesProvider>
  );

  const image = screen.getAllByAltText("movie-img");
  await user.click(image[0]);

  const filmViewBookmark = screen.getByTestId("filmview-bookmark");
  await user.click(filmViewBookmark);

  const navigationToFavorites = screen.getAllByText("FAVORITES");
  await user.click(navigationToFavorites[0]);

  await waitFor(() => {
    screen.findByText("The Godfather: Part II");
  });
});
it("should display all information about a movie in filmview", async () => {
  const entries = "/movie-app/";
  const user = userEvent.setup();

  render(
    <FavoriteMoviesProvider>
      <MemoryRouter initialEntries={[entries]}>
        <Routes>
          <Route path="/movie-app/" element={<Landing />} />
          <Route path="/movie-app/film-view" element={<FilmView />} />
          <Route path="/movie-app/categories" element={<Categories />} />
        </Routes>
      </MemoryRouter>
    </FavoriteMoviesProvider>
  );

  const image = screen.getAllByAltText("movie-img");
  await user.click(image[2]);

  const bookmark = screen.getByTestId("filmview-bookmark");
  const errorImg = screen.getByAltText("");

  expect(bookmark).toBeInTheDocument();
  expect(errorImg).toBeInTheDocument();
  expect(screen.getByText("Fight Club")).toBeInTheDocument();
  expect(screen.getByText("Year: 1999")).toBeInTheDocument();

  expect(
    screen.getByText(
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more."
    )
  ).toBeInTheDocument();
  expect(screen.getByText("Genre: Drama")).toBeInTheDocument();
});

it("should add a movie by clicking bookmark, and check if it is added to localStorage", async () => {
  const entries = "/movie-app/";

  localStorage.clear();

  const user = userEvent.setup();
  render(
    <FavoriteMoviesProvider>
      <MemoryRouter initialEntries={[entries]}>
        <Routes>
          <Route path="/movie-app/" element={<Landing />} />
          <Route path="/movie-app/bookmarks" element={<Bookmarks />} />
        </Routes>
      </MemoryRouter>
    </FavoriteMoviesProvider>
  );
  const bookmark = screen.getAllByTestId("bookmark");
  await user.click(bookmark[0]);

  const navigationToBookMark = screen.getAllByText("FAVORITES");
  await user.click(navigationToBookMark[0]);

  const favoriteMovies = localStorage.getItem("favoriteMovies");
  const favoriteMoviesArray = JSON.parse(favoriteMovies);

  expect(favoriteMoviesArray).not.toBeNull();

  expect(Array.isArray(favoriteMoviesArray)).toBe(true);
  expect(favoriteMoviesArray).toContainEqual(
    expect.objectContaining({ title: "The Godfather: Part II" })
  );
});
it("should delete movie in localstorage when pressing a bookmark twice", async () => {
  const user = userEvent.setup();
  const entries = "/movie-app/";

  localStorage.clear();

  render(
    <FavoriteMoviesProvider>
      <MemoryRouter initialEntries={[entries]}>
        <Routes>
          <Route path="/movie-app/" element={<Landing />} />
          <Route path="/movie-app/bookmarks" element={<Bookmarks />} />
        </Routes>
      </MemoryRouter>
    </FavoriteMoviesProvider>
  );
  const bookmark = screen.getAllByTestId("bookmark");
  await user.click(bookmark[0]);
  await user.click(bookmark[0]);

  const favoriteMovies = localStorage.getItem("favoriteMovies");
  const favoriteMoviesArray = JSON.parse(favoriteMovies);

  expect(Array.isArray(favoriteMoviesArray)).toBe(true);
  expect(favoriteMoviesArray).toHaveLength(0);
  screen.debug();
});
