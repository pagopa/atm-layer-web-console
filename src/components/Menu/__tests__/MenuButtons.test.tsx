import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MenuButtons from "../MenuButtons"; // Adjust the import path as necessary
import { ThemeProvider } from "@mui/material/styles";
import { themeApp } from "../../../assets/jss/themeApp"; // Adjust the import path as necessary

// Mocking the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: () => ({
    palette: {
      primary: {
        contrastText: "#fff",
      },
      error: {
        main: "#FE6666",
      },
    },
  }),
}));

describe("MenuButtons", () => {
  const mockNavigate = jest.fn();
  const useNavigateMock = require("react-router-dom").useNavigate;
  useNavigateMock.mockImplementation(() => mockNavigate);

  const renderComponent = (props = {}) => {
    render(
      <ThemeProvider theme={themeApp}>
        <BrowserRouter>
          <MenuButtons name="Test Button" {...props} />
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  test("renders button with the provided name", () => {
    renderComponent();
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  test("renders icon when iconButton prop is provided", () => {
    renderComponent({ iconButton: "test-icon" });
    expect(screen.getByTestId("icon-box")).toBeInTheDocument();
  });

  test("does not call navigate when route prop is not provided", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Test Button"));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("sets anchorEl state when clicked", () => {
    renderComponent();
    const button = screen.getByText("Test Button");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});
