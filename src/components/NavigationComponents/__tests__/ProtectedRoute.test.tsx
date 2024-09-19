import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { Ctx } from "../../../DataContext";
import routes from "../../../routes";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (contextValue: any, initialEntries: string[] = ["/"]) => {
  return render(
    <Ctx.Provider value={contextValue}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route element={<ProtectedRoute profileRequired={1} />}>
            <Route path="/" element={<div>Protected Content</div>} />
            <Route path={routes.UNAUTHORIZED_PAGE} element={<div>Unauthorized</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Ctx.Provider>
  );
};

describe("ProtectedRoute", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  test("renders protected content when user has the required profile", () => {
    const contextValue = {
      loggedUserInfo: {
        userId: "user1",
        profiles: [{ profileId: 1, description: "profile1" }],
      },
    };

    const { getByText } = renderWithProviders(contextValue);

    expect(getByText("Protected Content")).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("redirects to unauthorized page when user does not have the required profile", () => {
    const contextValue = {
      loggedUserInfo: {
        userId: "user1",
        profiles: [{ profileId: 2, description: "profile2" }],
      },
    };

    renderWithProviders(contextValue);

    expect(mockNavigate).toHaveBeenCalledWith(routes.UNAUTHORIZED_PAGE);
  });
});
