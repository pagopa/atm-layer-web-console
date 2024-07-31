import { render, screen, fireEvent } from "@testing-library/react";
import EmulatorButton from "../EmulatorButton";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Ctx } from "../../../DataContext";
import { EMULATOR } from "../../../commons/constants";

const renderWithProviders = (contextValue: any) => {
  const theme = createTheme();
  return render(
    <Ctx.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <EmulatorButton />
      </ThemeProvider>
    </Ctx.Provider>
  );
};

describe("EmulatorButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.open = jest.fn();
    sessionStorage.setItem("jwt_console", "mock-jwt-token");
    process.env.REACT_APP_EMULATOR_URL = "http://example.com/emulator";
  });

  test("renders the button when user has EMULATOR profile", () => {
    const contextValue = {
      loggedUserInfo: {
        userId: "user1",
        profiles: [{ profileId: EMULATOR, description: "emulator" }],
      },
    };

    renderWithProviders(contextValue);

    expect(screen.getByText("Emulator")).toBeInTheDocument();
  });

  test("does not render the button when user does not have EMULATOR profile", () => {
    const contextValue = {
      loggedUserInfo: {
        userId: "user1",
        profiles: [{ profileId: 2, description: "another-profile" }],
      },
    };

    renderWithProviders(contextValue);

    expect(screen.queryByText("Emulator")).not.toBeInTheDocument();
  });

  test("opens the emulator URL in a new tab when clicked", () => {
    const contextValue = {
      loggedUserInfo: {
        userId: "user1",
        profiles: [{ profileId: EMULATOR, description: "emulator" }],
      },
    };

    renderWithProviders(contextValue);

    const button = screen.getByText("Emulator");
    fireEvent.click(button);

    expect(window.open).toHaveBeenCalledWith("http://example.com/emulator#jwt_console=mock-jwt-token", "_blank");
  });

  test("opens the emulator URL without JWT in a new tab when JWT is not available", () => {
    sessionStorage.removeItem("jwt_console");

    const contextValue = {
      loggedUserInfo: {
        userId: "user1",
        profiles: [{ profileId: EMULATOR, description: "emulator" }],
      },
    };

    renderWithProviders(contextValue);

    const button = screen.getByText("Emulator");
    fireEvent.click(button);

    expect(window.open).toHaveBeenCalledWith("http://example.com/emulator", "_blank");
  });
});
