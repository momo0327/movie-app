import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Bookmarks from "./Bookmarks";
import { BrowserRouter } from "react-router-dom";
import { FavoriteMoviesProvider } from "../../components/LocalStorageContext/LocalStorageContext";

// const mockFavoriteMoviesProviderValue = {
//   addMovie: vi.fn(),
//   removeMovie: vi.fn(),
//   favoriteMovies: [""],
// };

// const MockFavoriteMoviesProvider = ({ children }) => {
//   return (
//     <FavoriteMoviesContext.Provider value={mockFavoriteMoviesProviderValue}>
//       {children}
//     </FavoriteMoviesContext.Provider>
//   );
// };

describe(Bookmarks, () => {
  it("should display header, footer and an empty favorites view", () => {
    render(
      <FavoriteMoviesProvider>
        <Bookmarks />
      </FavoriteMoviesProvider>,
      { wrapper: BrowserRouter }
    );

    const headerTitle = screen.getByText("moviefind", { exact: false });
    expect(headerTitle).toBeInTheDocument();

    const footerText = screen.getByText("SUBSCRIBE TO OUR NEWSLETTER!");
    expect(footerText).toBeInTheDocument();

    const bookmarksTitle = screen.getByText("favorites:", { exact: false });
    expect(bookmarksTitle).toBeInTheDocument();

    const emptyFavorites = screen.findByText("You have no favorites yet!");
    expect(emptyFavorites).toBeInTheDocument();

  });
});
