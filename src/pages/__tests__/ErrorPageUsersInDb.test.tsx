import { render, screen, fireEvent } from "@testing-library/react";
import ErrorPageUsersInDb from "../ErrorPageUsersInDb";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../DataContext";
import ROUTES from "../../routes";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ErrorPageUsersInDb", () => {
  test("renders correctly", () => {
    render(
      <Ctx.Provider value={{mockNavigate}}>
        <BrowserRouter>
          <ErrorPageUsersInDb />
        </BrowserRouter>
      </Ctx.Provider>
    );

    expect(screen.getByText("Nessun utente presente a Database")).toBeInTheDocument();
    expect(screen.getByText("Contattare l'amministratore del sistema")).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Torna alla Login/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.LOGIN);
  });
});
