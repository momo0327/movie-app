import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Landing from "./Landing";
import { BrowserRouter } from "react-router-dom";

describe(Landing, () => {
  it.only("should render components landing view", () => {
    render(<Landing />, { wrapper: BrowserRouter });
    screen.debug();

    const headerTitle = screen.getByText(/Movie/i, { exact: false });
    expect(headerTitle).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const navbarAndFooterLinks = screen.getAllByRole("listitem");
    expect(navbarAndFooterLinks).toHaveLength(6);
    screen.debug();

    expect(screen.getByText("TRENDING")).toBeInTheDocument();
    expect(screen.getByText("RECOMMENDED")).toBeInTheDocument();

    const moviesInLanding = screen.getAllByAltText("movie-img");
    expect(moviesInLanding.length).toBe(14);

    const footerText = screen.getByText("SUBSCRIBE TO OUR NEWSLETTER!");
    expect(footerText).toBeInTheDocument();
  });
});
