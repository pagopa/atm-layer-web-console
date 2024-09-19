import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import ModalUsers from "../ModalUsers";
import { CREATE_USER, DELETE_USER, UPDATE_USER, UPDATE_FIRST_USER, ALERT_SUCCESS } from "../../../../commons/constants";
import { fetchRequest } from "../../../../hook/fetch/fetchRequest";
import { Ctx } from "../../../../DataContext";
import { CREATE_USERS, DELETE_USERS, UPDATE_USERS } from "../../../../commons/endpoints";
import { BrowserRouter, generatePath } from "react-router-dom";
import * as commons from "../../../Commons/Commons";

const originalFetch = global.fetch;

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
      <BrowserRouter>
      <ModalUsers
        type={type}
        open={true}
        setOpen={mockSetOpen}
        openSnackBar={false}
        setOpenSnackBar={mockSetOpenSnackBar}
        severity={ALERT_SUCCESS}
        setSeverity={mockSetSeverity}
        message={""}
        setMessage={mockSetMessage}
        title={""}
        setTitle={mockSetTitle}
      />
      </BrowserRouter>
    </Ctx.Provider>
  );
};

afterEach(() => {
    global.fetch = originalFetch;
});

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
    global.fetch = jest.fn();
    renderComponent(CREATE_USER);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Admin" } });
    fireEvent.click(screen.getByText("Admin"));
    fireEvent.click(screen.getByText("User"));

    expect(mockSetOpen).not.toHaveBeenCalled();
    expect(mockSetMessage).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("sets initial formData and errors when modal opens for CREATE_USER", () => {
    renderComponent(CREATE_USER);

    expect(screen.getByLabelText("Email utente")).toHaveValue("");
    expect(screen.getByLabelText("Nome")).toHaveValue("");
    expect(screen.getByLabelText("Cognome")).toHaveValue("");
    expect(screen.getByLabelText("Email utente")).not.toHaveAttribute("readonly");
  });

  test("handles form submission for DELETE_USER", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({
          success: true,
          status: 204,
          valuesObj: {
              message: "User deleted successfully",
          },
      }),
  });
    
    sessionStorage.setItem("recordParamsUser", JSON.stringify({
      userId: "user@example.com",
      name: "Mario",
      surname: "Rossi",
      profiles: [{ description: "User", profileId: 2 }],
    }));

    renderComponent(DELETE_USER);

    fireEvent.click(screen.getByText("Conferma"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  test("catches error from form submission for DELETE_USER", async () => {
    global.fetch = jest.fn(() => {throw new Error()});
    
    sessionStorage.setItem("recordParamsUser", JSON.stringify({
      userId: "user@example.com",
      name: "Mario",
      surname: "Rossi",
      profiles: [{ description: "User", profileId: 2 }],
    }));

    renderComponent(DELETE_USER);

    fireEvent.click(screen.getByText("Conferma"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  test("handles form submission for CREATE_USER response success", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({
          success: true,
          status: 200,
          valuesObj: {
              message: "User created successfully",
          },
      }),
  });

    renderComponent(CREATE_USER);

    fireEvent.change(screen.getByLabelText("Email utente"), { target: { value: "newuser@example.com" } });
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Luigi" } });
    fireEvent.change(screen.getByLabelText("Cognome"), { target: { value: "Verdi" } });

    const profileSelect = screen.getByRole("combobox");
    fireEvent.mouseDown(profileSelect);
    fireEvent.click(screen.getByText("Admin"));
    fireEvent.click(screen.getByText("User"));

    fireEvent.click(screen.getByText("Conferma"));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      expect(global.fetch).toHaveBeenCalled();
      expect(mockSetOpen).toHaveBeenCalled();
      expect(mockSetOpenSnackBar).toHaveBeenCalled();
  });
  });

  test("handles form submission for CREATE_USER response NOT success", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({
          success: false,
          status: 400,
          valuesObj: {
              message: "Error creating user",
          },
      }),
  });

    renderComponent(CREATE_USER);

    fireEvent.change(screen.getByLabelText("Email utente"), { target: { value: "newuser@example.com" } });
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Luigi" } });
    fireEvent.change(screen.getByLabelText("Cognome"), { target: { value: "Verdi" } });

    const profileSelect = screen.getByRole("combobox");
    fireEvent.mouseDown(profileSelect);
    fireEvent.click(screen.getByText("Admin"));
    fireEvent.click(screen.getByText("User"));

    fireEvent.click(screen.getByText("Conferma"));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      expect(global.fetch).toHaveBeenCalled();
  });
  });

  test("catches error from form submission for CREATE_USER", async () => {
    global.fetch = jest.fn(() => {throw new Error()});

    renderComponent(CREATE_USER);

    fireEvent.change(screen.getByLabelText("Email utente"), { target: { value: "newuser@example.com" } });
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Luigi" } });
    fireEvent.change(screen.getByLabelText("Cognome"), { target: { value: "Verdi" } });

    const profileSelect = screen.getByRole("combobox");
    fireEvent.mouseDown(profileSelect);
    fireEvent.click(screen.getByText("Admin"));
    fireEvent.click(screen.getByText("User"));

    fireEvent.click(screen.getByText("Conferma"));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
  });
  });

  test("handles form submission for UPDATE_USER", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({
          success: true,
          status: 200,
          valuesObj: {
              message: "User updated successfully",
          },
      }),
  });

    sessionStorage.setItem("recordParamsUser", JSON.stringify({
      userId: "user@example.com",
      name: "Mario",
      surname: "Rossi",
      profiles: [{ description: "User", profileId: 2 }],
    }));

    renderComponent(UPDATE_USER);

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Luigi" } });

    fireEvent.click(screen.getByText("Conferma"));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      expect(global.fetch).toHaveBeenCalled();
  });
  });

  test("catches error from form submission for UPDATE_USER", async () => {
    global.fetch = jest.fn(() => {throw new Error()});

    sessionStorage.setItem("recordParamsUser", JSON.stringify({
      userId: "user@example.com",
      name: "Mario",
      surname: "Rossi",
      profiles: [{ description: "User", profileId: 2 }],
    }));

    renderComponent(UPDATE_USER);

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Luigi" } });

    fireEvent.click(screen.getByText("Conferma"));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
  });
  });

  test("handles default case in handleSubmit", async () => {
    global.fetch = jest.fn();
    renderComponent("UNKNOWN_TYPE");

    fireEvent.click(screen.getByText("Conferma"));

    expect(global.fetch).not.toHaveBeenCalled();
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
    global.fetch = jest.fn();
    renderComponent(CREATE_USER);

    fireEvent.click(screen.getByText("Conferma"));

    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled();
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
    global.fetch = jest.fn();
    renderComponent("UNKNOWN_TYPE");

    fireEvent.click(screen.getByText("Conferma"));

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
