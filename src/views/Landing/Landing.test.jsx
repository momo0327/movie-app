import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Landing from "./Landing";
import { BrowserRouter } from "react-router-dom";

describe(Landing, () => {
  it("should render components landing view", () => {
    render(<Landing />, { wrapper: BrowserRouter });
    expect(screen.getByText(/Movie-find/i)).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });
});
