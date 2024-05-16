import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { Ctx } from "../../DataContext";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
});

describe("LoginPage", () => {
  test("renders without crashing", () => {
    const clearAll = jest.fn();

    const debugOn = true;
    render(
      <Ctx.Provider value={{ clearAll, debugOn }}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Ctx.Provider>
    );
    expect(screen.getByText("Accedi alla console")).toBeInTheDocument();
    const titleElement=screen.getByText("Accedi alla console");
    expect(titleElement).toBeInTheDocument();
    const subTitleElement=screen.getByText("Lo spazio dedicato alla gestione dei processi ATM Layer");
    expect(subTitleElement).toBeInTheDocument();
    expect(screen.getByText("Accedi")).toBeInTheDocument();
  });

  test("Test render and click Accedi no debug", () => {
    const clearAll = jest.fn();
    const debugOn = false;
    const mockWindowOpen = jest.fn();
    global.window.open = mockWindowOpen;
    render(
      <Ctx.Provider value={{ clearAll, debugOn }}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Ctx.Provider>
    );
    const accediButton = screen.getByTestId("accedi-button-test");

    fireEvent.click(accediButton);

    expect(mockWindowOpen).toHaveBeenCalled();
  });

  test("Test render and click Accedi with debug", () => {
    const clearAll = jest.fn();
    const debugOn = true;
    const mockWindowOpen = jest.fn();
    global.window.open = mockWindowOpen;
    render(
      <Ctx.Provider value={{ clearAll, debugOn }}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Ctx.Provider>
    );
    const accediButton = screen.getByTestId("accedi-button-test");

    fireEvent.click(accediButton);

    expect(mockWindowOpen).toHaveBeenCalled();
  })
});
