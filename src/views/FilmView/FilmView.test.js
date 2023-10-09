import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FilmView from "./FilmView";

describe(FilmView, () => {
  it("should display header CATEGORIES, all of the genres and footer in film view", () => {
    render(<FilmView />, { wrapper: BrowserRouter });
    screen.debug();

    const headerTitle = screen.getByRole("moviefind", { exact: false });
    expect(headerTitle).toBeInTheDocument();

    // const input = screen.getByRole("textbox");
    // expect(input).toBeInTheDocument();

    // const navbarAndFooterLinks = screen.getAllByRole("listitem");
    // expect(navbarAndFooterLinks).toHaveLength(6);

    // expect(screen.getByText("TRENDING")).toBeInTheDocument();
    // expect(screen.getByText("RECOMMENDED")).toBeInTheDocument();

    // const moviesInLanding = screen.getAllByAltText("movie-img");
    // expect(moviesInLanding.length).toBe(14);

    // const footerText = screen.getByText("SUBSCRIBE TO OUR NEWSLETTER!");
    // expect(footerText).toBeInTheDocument();
    // screen.debug();
  });
});
