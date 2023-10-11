import SingleMovie from "./SingleMovie";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { it, expect } from "vitest";
import { FavoriteMoviesContext } from "../LocalStorageContext/LocalStorageContext";

const mockFavoriteMoviesProviderValue = {
  addMovie: vi.fn(),
  removeMovie: vi.fn(),
  favoriteMovies: [""],
};

const MockFavoriteMoviesProvider = ({ children }) => {
  return (
    <FavoriteMoviesContext.Provider value={mockFavoriteMoviesProviderValue}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
};

it("should render singleMovie component with props", () => {
  const movie = {
    title: "Movie Title",
    thumbnail: "image-url.jpg",
  };

  render(
    <MockFavoriteMoviesProvider>
      <SingleMovie title={movie.title} thumbnail={movie.thumbnail} />
    </MockFavoriteMoviesProvider>,
    { wrapper: BrowserRouter }
  );

  const title = screen.queryByText("Movie Title");
  const image = screen.queryByAltText("movie-img");

  expect(title).toBeInTheDocument();
  expect(image).toBeInTheDocument();
});

// it('should call handleViewFilm when image is clicked', async () => {
//   const handleViewFilm = vi.fn();
//   render(<SingleMovie handleViewFilm={handleViewFilm} />, { wrapper: BrowserRouter });
//   const image = screen.queryByAltText('movie-img');

//   await userEvent.click(image);
//   expect(handleViewFilm).toHaveBeenCalled();
// });
