import { render, screen } from "@testing-library/react";
import ErrorPage from "../ErrorPage";

describe("ErrorPage", () => {
  test("render", () => {
    render(
    <ErrorPage />
    );
    
    expect(screen.getByText("404 - Qualcosa è andato storto")).toBeInTheDocument();
  });
});
