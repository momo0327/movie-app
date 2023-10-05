import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Landing from "./Landing";
import { BrowserRouter } from "react-router-dom";

describe(Landing, () => {
  it.only("should render components landing view", () => {
    render(<Landing />, { wrapper: BrowserRouter });
    // expect(screen.getByText(/Movie-find/i)).toBeInTheDocument();
    screen.debug();
    const headerTitle = screen.getByText(/Movie/i, { exact: false });
    expect(headerTitle).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });
});
