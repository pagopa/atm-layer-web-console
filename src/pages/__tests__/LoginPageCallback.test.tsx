import { render, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Ctx } from "../../DataContext";
import LoginPageCallback from "../LoginPageCallback";


describe("LoginPageCallback", () => {
  test("should navigate to HOME if token exists", () => {
    const setLogged = jest.fn();
    window.location.hash = "#access_token=12345&token_type=Bearer&expires_in=5184000&state=";

    act(() => {
      render(
        <Router>
          <Ctx.Provider value={{ setLogged }}>
            <LoginPageCallback />
          </Ctx.Provider>
        </Router>
      );
    });

    expect(setLogged).toHaveBeenCalledWith(true);
    expect(localStorage.getItem("jwt")).toBe("Bearer");
    expect(window.location.pathname).toBe("/");
  });

  test("should navigate to LOGIN if token does not exist", () => {
    const setLogged = jest.fn();
    window.location.hash = "";

    act(() => {
      render(
        <Router>
          <Ctx.Provider value={{ setLogged }}>
            <LoginPageCallback />
          </Ctx.Provider>
        </Router>
      );
    });

    expect(window.location.pathname).toBe("/login");
  });
});
