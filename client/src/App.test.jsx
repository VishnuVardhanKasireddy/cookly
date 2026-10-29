
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Cookly App", () => {
  it("renders the Cookly heading", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Cookly" })
    ).toBeInTheDocument();
  });

  it("renders the introductory tagline", () => {
    render(<App />);

    expect(
      screen.getByText("Your ingredients, your next meal.")
    ).toBeInTheDocument();
  });
});
