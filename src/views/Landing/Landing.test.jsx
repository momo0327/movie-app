import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Landing from "./Landing";
import { BrowserRouter } from "react-router-dom";
import { FavoriteMoviesProvider } from "../../components/LocalStorageContext/LocalStorageContext";

describe(Landing, () => {
  it("should display header, trending, recommended and footer in landing view", () => {
    render(
      <FavoriteMoviesProvider>
        <Landing />
      </FavoriteMoviesProvider>,
      { wrapper: BrowserRouter }
    );

    const headerTitle = screen.getByText("moviefind", { exact: false });
    expect(headerTitle).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const navbarAndFooterLinks = screen.getAllByRole("listitem");
    expect(navbarAndFooterLinks).toHaveLength(6);

    expect(screen.getByText("TRENDING")).toBeInTheDocument();
    expect(screen.getByText("RECOMMENDED")).toBeInTheDocument();

    const moviesInLanding = screen.getAllByAltText("movie-img");
    expect(moviesInLanding).toHaveLength(14);

    const footerText = screen.getByText("SUBSCRIBE TO OUR NEWSLETTER!");
    expect(footerText).toBeInTheDocument();
  });
});
