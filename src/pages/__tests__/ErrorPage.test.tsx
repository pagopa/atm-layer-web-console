import { render, screen } from "@testing-library/react";
import ErrorPage from "../ErrorPage";

describe("ErrorPage", () => {
  test("render", () => {
    render(<ErrorPage />);
    
    expect(screen.getByText("Non sei autorizzato ad accedere a questa sezione")).toBeInTheDocument();
    expect(screen.getByText("Contatta l'amministratore di utenze e permessi")).toBeInTheDocument();
    expect(screen.getByTestId("ReportIcon")).toBeInTheDocument();
  });
});
