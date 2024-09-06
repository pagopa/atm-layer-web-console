import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ModalUsers from "../ModalUsers";
import { CREATE_USER, DELETE_USER, UPDATE_USER, UPDATE_FIRST_USER } from "../../../../commons/constants";
import { fetchRequest } from "../../../../hook/fetch/fetchRequest";
import { Ctx } from "../../../../DataContext";
import { CREATE_USERS, DELETE_USERS, UPDATE_USERS } from "../../../../commons/endpoints";
import { generatePath } from "react-router-dom";
import * as commons from "../../../Commons/Commons";

jest.mock("../../../../hook/fetch/fetchRequest", () => ({
  fetchRequest: jest.fn(),
}));

const mockFetchRequest = fetchRequest as jest.Mock;

const mockContextValue = {
  abortController: new AbortController(),
  profilesAvailable: [
    { description: "Admin", profileId: 1, createdAt: "", lastUpdatedAt: "" },
    { description: "User", profileId: 2, createdAt: "", lastUpdatedAt: "" },
  ],
};

const mockSetOpen = jest.fn();
const mockSetOpenSnackBar = jest.fn();
const mockSetSeverity = jest.fn();
const mockSetMessage = jest.fn();
const mockSetTitle = jest.fn();

const renderComponent = (type: string) => {
  return render(
    <Ctx.Provider value={mockContextValue}>
      <ModalUsers
        type={type}
        open={true}
        setOpen={mockSetOpen}
        setOpenSnackBar={mockSetOpenSnackBar}
        setSeverity={mockSetSeverity}
        setMessage={mockSetMessage}
        setTitle={mockSetTitle}
      />
    </Ctx.Provider>
  );
};

describe("ModalUsers component", () => {
  beforeEach(() => {
    sessionStorage.clear();
    mockSetOpen.mockClear();
    mockSetOpenSnackBar.mockClear();
    mockSetSeverity.mockClear();
    mockSetMessage.mockClear();
    mockSetTitle.mockClear();
  });

  test("renders correctly for CREATE_USER", () => {
    renderComponent(CREATE_USER);

    expect(screen.getByLabelText("Email utente")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Cognome")).toBeInTheDocument();
  });

  test("renders correctly for UPDATE_USER", () => {
    sessionStorage.setItem("recordParamsUser", JSON.stringify({
      userId: "user@example.com",
      name: "Mario",
      surname: "Rossi",
      profiles: [{ description: "User", profileId: 2 }],
    }));
    
    renderComponent(UPDATE_USER);

    expect(screen.getByLabelText("Email utente")).toHaveValue("user@example.com");
    expect(screen.getByLabelText("Nome")).toHaveValue("Mario");
    expect(screen.getByLabelText("Cognome")).toHaveValue("Rossi");
  });

  test("renders correctly for DELETE_USER", () => {
    sessionStorage.setItem("recordParamsUser", JSON.stringify({
      userId: "user@example.com",
      name: "Mario",
      surname: "Rossi",
      profiles: [{ description: "User", profileId: 2 }],
    }));
    
    renderComponent(DELETE_USER);

    expect(screen.getByText("Sei sicuro di voler cancellare questo utente?")).toBeInTheDocument();
  });

  // test("renders correctly for UPDATE_FIRST_USER", () => {
  //   sessionStorage.setItem("recordParamsUser", JSON.stringify({
  //     userId: "user@example.com",
  //     name: "Mario",
  //     surname: "Rossi",
  //     profiles: [{ description: "User", profileId: 2 }],
  //   }));
    
  //   renderComponent(UPDATE_FIRST_USER);

  //   expect(screen.getByLabelText("Email utente")).toHaveValue("user@example.com");
  //   expect(screen.getByLabelText("Nome")).toHaveValue("Mario");
  //   expect(screen.getByLabelText("Cognome")).toHaveValue("Rossi");
  // });

  test("handles multi-select change correctly", () => {
    renderComponent(CREATE_USER);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Admin" } });
    fireEvent.click(screen.getByText("Admin"));
    fireEvent.click(screen.getByText("User"));

    expect(mockSetOpen).not.toHaveBeenCalled();
    expect(mockSetMessage).not.toHaveBeenCalled();
    expect(mockFetchRequest).not.toHaveBeenCalled();
  });

  test("sets initial formData and errors when modal opens for CREATE_USER", () => {
    renderComponent(CREATE_USER);

    expect(screen.getByLabelText("Email utente")).toHaveValue("");
    expect(screen.getByLabelText("Nome")).toHaveValue("");
    expect(screen.getByLabelText("Cognome")).toHaveValue("");
    expect(screen.getByLabelText("Email utente")).not.toHaveAttribute("readonly");
  });

  test("handles form submission for DELETE_USER", async () => {
    mockFetchRequest.mockResolvedValue({ success: true, valuesObj: { message: "User deleted successfully" } });
    
    sessionStorage.setItem("recordParamsUser", JSON.stringify({
      userId: "user@example.com",
      name: "Mario",
      surname: "Rossi",
      profiles: [{ description: "User", profileId: 2 }],
    }));

    renderComponent(DELETE_USER);

    fireEvent.click(screen.getByText("Conferma"));

    await waitFor(() => {
      expect(mockFetchRequest).toHaveBeenCalledWith({
        urlEndpoint: generatePath(DELETE_USERS, { userId: "user@example.com" }),
        method: "DELETE",
        abortController: mockContextValue.abortController,
      });
    });
  });

  test("handles form submission for CREATE_USER", async () => {
    mockFetchRequest.mockResolvedValue({ success: true, valuesObj: { message: "User created successfully" } });

    renderComponent(CREATE_USER);

    fireEvent.change(screen.getByLabelText("Email utente"), { target: { value: "newuser@example.com" } });
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Luigi" } });
    fireEvent.change(screen.getByLabelText("Cognome"), { target: { value: "Verdi" } });

    const profileSelect = screen.getByRole("combobox");
    fireEvent.mouseDown(profileSelect);
    fireEvent.click(screen.getByText("Admin"));
    fireEvent.click(screen.getByText("User"));

    fireEvent.click(screen.getByText("Conferma"));

    await waitFor(() => {
      expect(mockFetchRequest).toHaveBeenCalledWith({
        urlEndpoint: CREATE_USERS,
        method: "POST",
        abortController: mockContextValue.abortController,
        headers: { "Content-Type": "application/json" },
        body: {
          userId: "newuser@example.com",
          name: "Luigi",
          surname: "Verdi",
          profileIds: [1, 2],
        },
      });
    });
  });

  test("handles form submission for UPDATE_USER", async () => {
    mockFetchRequest.mockResolvedValue({ success: true, valuesObj: { message: "User updated successfully" } });

    sessionStorage.setItem("recordParamsUser", JSON.stringify({
      userId: "user@example.com",
      name: "Mario",
      surname: "Rossi",
      profiles: [{ description: "User", profileId: 2 }],
    }));

    renderComponent(UPDATE_USER);

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Luigi" } });

    fireEvent.click(screen.getByText("Conferma"));

    await waitFor(() => {
      expect(mockFetchRequest).toHaveBeenCalledWith({
        urlEndpoint: UPDATE_USERS,
        method: "PUT",
        abortController: mockContextValue.abortController,
        headers: {
          "Content-Type": "application/json"
        },
        body: {
          userId: "user@example.com",
          name: "Luigi",
          surname: "Rossi",
          profileIds: [2],
        },
      });
    });
  });

  test("handles default case in handleSubmit", async () => {
    renderComponent("UNKNOWN_TYPE");

    fireEvent.click(screen.getByText("Conferma"));

    expect(mockFetchRequest).not.toHaveBeenCalled();
    expect(mockSetOpen).not.toHaveBeenCalled(); 
    expect(mockSetMessage).not.toHaveBeenCalled(); 
  });

  // 1. Test for resetErrors (62-64)
  test("calls resetErrors when handleChange is triggered", () => {
    const mockResetErrors = jest.spyOn(commons, "resetErrors");
    renderComponent(CREATE_USER);

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Luigi" } });

    expect(mockResetErrors).toHaveBeenCalledWith(expect.any(Object), expect.any(Function), "name");
  });

  // 2. Test for useEffect (110-113) handling UPDATE_USER/UPDATE_FIRST_USER and CREATE_USER
  test("sets formData and errors correctly when modal opens for UPDATE_USER", () => {
    sessionStorage.setItem("recordParamsUser", JSON.stringify({
      userId: "user@example.com",
      name: "Mario",
      surname: "Rossi",
      profiles: [{ description: "User", profileId: 2 }],
    }));

    renderComponent(UPDATE_USER);

    expect(screen.getByLabelText("Email utente")).toHaveValue("user@example.com");
    expect(screen.getByLabelText("Nome")).toHaveValue("Mario");
    expect(screen.getByLabelText("Cognome")).toHaveValue("Rossi");
    expect(screen.getByLabelText("Email utente")).toHaveAttribute("readonly");
  });

  // 3. Test for validateForm returning false (131-134)
  test("does not submit form when validation fails for CREATE_USER", async () => {
    renderComponent(CREATE_USER);

    fireEvent.click(screen.getByText("Conferma"));

    await waitFor(() => {
      expect(mockFetchRequest).not.toHaveBeenCalled();
    });
  });

  // 4. Test for UPDATE_FIRST_USER case (141)
  // test("renders correctly for UPDATE_FIRST_USER and calls handleSubmit", async () => {
  //   mockFetchRequest.mockResolvedValue({ success: true, valuesObj: { message: "User updated successfully" } });

  //   sessionStorage.setItem("recordParamsUser", JSON.stringify({
  //     userId: "user@example.com",
  //     name: "Mario",
  //     surname: "Rossi",
  //     profiles: [{ description: "User", profileId: 2 }],
  //   }));

  //   renderComponent(UPDATE_FIRST_USER);

  //   expect(screen.getByLabelText("Email utente")).toHaveValue("user@example.com");
  //   expect(screen.getByLabelText("Nome")).toHaveValue("Mario");
  //   expect(screen.getByLabelText("Cognome")).toHaveValue("Rossi");

  //   fireEvent.click(screen.getByText("Conferma"));

  //   await waitFor(() => {
  //     expect(mockFetchRequest).toHaveBeenCalledWith({
  //       urlEndpoint: UPDATE_USERS,
  //       method: "PUT",
  //       abortController: mockContextValue.abortController,
  //       headers: { "Content-Type": "application/json" },
  //       body: {
  //         userId: "user@example.com",
  //         name: "Mario",
  //         surname: "Rossi",
  //         profileIds: [2],
  //       },
  //     });
  //   });
  // });

  // 5. Test for handleSubmit in UPDATE_USER or UPDATE_FIRST_USER mode (157-164)
  // test("handles form submission for UPDATE_FIRST_USER", async () => {
  //   mockFetchRequest.mockResolvedValue({ success: true, valuesObj: { message: "User updated successfully" } });

  //   sessionStorage.setItem("recordParamsUser", JSON.stringify({
  //     userId: "user@example.com",
  //     name: "Mario",
  //     surname: "Rossi",
  //     profiles: [{ description: "User", profileId: 2 }],
  //   }));

  //   renderComponent(UPDATE_FIRST_USER);

  //   fireEvent.click(screen.getByText("Conferma"));

  //   await waitFor(() => {
  //     expect(mockFetchRequest).toHaveBeenCalledWith({
  //       urlEndpoint: UPDATE_USERS,
  //       method: "PUT",
  //       abortController: mockContextValue.abortController,
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: {
  //         userId: "user@example.com",
  //         name: "Mario",
  //         surname: "Rossi",
  //         profileIds: [2],
  //       },
  //     });
  //   });
  // });

  // 6. Test for default case in handleSubmit (173)
  test("does nothing when an unknown type is provided", () => {
    renderComponent("UNKNOWN_TYPE");

    fireEvent.click(screen.getByText("Conferma"));

    expect(mockFetchRequest).not.toHaveBeenCalled();
  });
});
