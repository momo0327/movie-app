import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Categories from "./Categories";
import { BrowserRouter } from "react-router-dom";
import { FavoriteMoviesProvider } from "../../components/LocalStorageContext/LocalStorageContext";

describe(Categories, () => {
  it("should display header and footer", () => {
    render(
      <FavoriteMoviesProvider>
        <Categories />
      </FavoriteMoviesProvider>,
      { wrapper: BrowserRouter }
    );

    const headerTitle = screen.getByText("moviefind", { exact: false });
    expect(headerTitle).toBeInTheDocument();

    const footerText = screen.getByText("SUBSCRIBE TO OUR NEWSLETTER!");
    expect(footerText).toBeInTheDocument();
  });
});

describe(Categories, () => {
  it("should display title Categories and sub headers", () => {
    render(
      <FavoriteMoviesProvider>
        <Categories />
      </FavoriteMoviesProvider>,
      { wrapper: BrowserRouter }
    );

    const categoriesTitle = screen.getByRole("header");
    expect(categoriesTitle).toBeInTheDocument();

    const subHeaders = screen.getAllByRole("categories__title");
    expect(subHeaders).toHaveLength(15);

    const moviesInCategories = screen.getAllByRole("movie-card");
    expect(moviesInCategories).toHaveLength(69);
  });
});
