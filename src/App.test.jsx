import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import userEvent from "@testing-library/user-event";
import SingleMovie from "./components/SingleMovie/SingleMovie";
import Bookmarks from "./views/Bookmarks/Bookmarks";
import Categories from "./views/Categories/Categories";
import FilmView from "./views/FilmView/FilmView";
import { FavoriteMoviesProvider } from "./components/LocalStorageContext/LocalStorageContext"; 
//FavoriteMoviesContext från samma som FavoriteMoviesProvider
// import { vi } from "vitest";


//behövs mockfavoritegrejerna nu?
// const mockFavoriteMoviesProviderValue = {
//   // gör funktionerna + arrayen till en variabel ifrån localStorageContext.
//   addMovie: vi.fn(),
//   removeMovie: vi.fn(),
//   favoriteMovies: [""],
// };

// skapar en egen provider med de mockade värderna som man måste wrappa i testerna för att contexten finns över hela sidan.
// const MockFavoriteMoviesProvider = ({ children }) => {
//         // skickar med variabeln som props här nedan tillsammans med providern.
//   return (
//     <FavoriteMoviesContext.Provider value={mockFavoriteMoviesProviderValue}>
//       {" "}
//       {children}
//     </FavoriteMoviesContext.Provider>
//   );
// };

// testar navigering till categories view
describe("App", () => {
  it("should navigate to categories view", async () => { //failar
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
      <FavoriteMoviesProvider>
        <BrowserRouter>
          <SingleMovie />
        </BrowserRouter>
      </FavoriteMoviesProvider>
    );

    const singleMovieClick = await screen.getByTestId("SingleMovie"); // hämtar img taggen ifrån singlemovie

    await userEvent.click(singleMovieClick); //klickar på img
    expect(window.location.pathname).toBe("/movie-app/film-view"); // kollar om url stämmer över film-view
  });

  it("should add a movie by clicking bookmark, go to favorites and see the favorite there", async () => { //failar
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

  it("should add a movie by clicking bookmark, go to favorites and click the bookmark to remove the favorite movie", async () => { //failar
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
    )

    const bookmark = screen.getAllByTestId("bookmark");
    user.click(bookmark[0]);

    const navigationToBookMark = screen.getAllByText("FAVORITES");
    await user.click(navigationToBookMark[0]);

    const favoriteMovie = await screen.findByText(/The Godfather: Part II/i);
    expect(favoriteMovie).toBeInTheDocument();

    const removeBookMark = screen.getByTestId("remove-bookmark");
    await user.click(removeBookMark);

    expect(favoriteMovie).not.toBeInTheDocument();
  });

  it("should not add the same movie multiple times when clicking more than once on bookmark", async () => { //failar
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
    // render error img?
    // const errorImages = await screen.findAllByAltText("movie-img"); vi har ingen alt för errorbild
    // expect(errorImages).toHaveLength(2);
  });

  it("should be able to mark movie as a bookmark from filmView", async () => { //failar
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
    const favoriteMovie = await screen.findByText(/The Godfather: Part II/i);
    expect(favoriteMovie).toBeInTheDocument();
  });
});


{/* <FavoriteMoviesContext.Provider
      value={{
        [{title:}], //om vi vill starta testet med en existerande film i contexten
        addMovie,
        removeMovie,
      }}
    >
      {children}
    </FavoriteMoviesContext.Provider> */}
// lägger till film i bookmark laddar om hemsidan för att se om filmen är fortfarande kvar
it("should add a movie by clicking bookmark, go to favorites and see the favorite there refresh the page and see if the movie is still there", async () => {
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

  const reloadFn = () => {
    window.location.reload();    // refreshar sidan
  }
  reloadFn()

  expect(favoriteMovie).toBeInTheDocument();

});