import { render, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import PrivateRoutes from "../PrivateRoute";
import { useContext } from "react";
import routes from "../../../routes";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

describe("PrivateRoutes", () => {
    let mockNavigate: any;
  
    beforeEach(() => {
      mockNavigate = jest.fn();
      (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test("should navigate to login if not logged in", async () => {
      (useContext as jest.Mock).mockReturnValue({ logged: false });
  
      render(<PrivateRoutes />);
  
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(routes.LOGIN);
      });
    });
  
    test("should not navigate if logged in", async () => {
      (useContext as jest.Mock).mockReturnValue({ logged: true });
  
      render(<PrivateRoutes />);
  
      await waitFor(() => {
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
});
