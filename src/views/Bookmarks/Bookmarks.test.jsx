import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Bookmarks from "./Bookmarks";
import { BrowserRouter } from "react-router-dom";
import { FavoriteMoviesContext } from "../../components/LocalStorageContext/LocalStorageContext";

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

describe(Bookmarks, () => {
  it("should display header, footer and an empty favorites view", () => {
    render(
      <MockFavoriteMoviesProvider>
        <Bookmarks />
      </MockFavoriteMoviesProvider>,
      { wrapper: BrowserRouter }
    );
    screen.debug();
    const headerTitle = screen.getByText("moviefind", { exact: false });
    expect(headerTitle).toBeInTheDocument();

    const footerText = screen.getByText("SUBSCRIBE TO OUR NEWSLETTER!");
    expect(footerText).toBeInTheDocument();

    const bookmarksTitle = screen.getByText("favorites:", { exact: false });
    expect(bookmarksTitle).toBeInTheDocument();

    const emptyFavorites = screen.queryByRole("booksmarks__grid");
    expect(emptyFavorites).not.toBeInTheDocument();

    screen.debug();
  });
});
