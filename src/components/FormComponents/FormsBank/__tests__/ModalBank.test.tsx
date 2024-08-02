import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { fetchRequest } from "../../../../hook/fetch/fetchRequest";
import { Ctx } from "../../../../DataContext";
import { BrowserRouter, generatePath } from "react-router-dom";
import ModalBank from "../ModalBank";
import { CREATE_BANK, DELETE_BANK, UPDATE_BANK } from "../../../../commons/constants";
import { BANKS_CREATE, BANKS_DELETE, BANKS_UPDATE } from "../../../../commons/endpoints";

jest.mock("../../../../hook/fetch/fetchRequest", () => ({
  fetchRequest: jest.fn(),
}));

const mockFetchRequest = fetchRequest as jest.Mock;
const abortController = new AbortController();
const mockSetOpen = jest.fn();
const mockSetOpenSnackBar = jest.fn();
const mockSetSeverity = jest.fn();
const mockSetMessage = jest.fn();
const mockSetTitle = jest.fn();

const renderComponent = (type: string) => {
  return render(
    <Ctx.Provider value={{ abortController }}>
      <BrowserRouter>
      <ModalBank
        type={type}
        open={true}
        setOpen={mockSetOpen}
        openSnackBar={false}
        setOpenSnackBar={mockSetOpenSnackBar}
        severity=""
        setSeverity={mockSetSeverity}
        message=""
        setMessage={mockSetMessage}
        title=""
        setTitle={mockSetTitle}
      />
      </BrowserRouter>
    </Ctx.Provider>
  );
};

const setBankInSessionStorage = () => {
  sessionStorage.setItem("recordParamsBank", JSON.stringify({
    acquirerId: "testAcquirerId",
    denomination: "testDenomination",
    rateLimit: "456",
    burstLimit: "456",
    limit: "456",
    period: "DAY"
  }));
};

describe("ModalBank component", () => {
  beforeEach(() => {
    sessionStorage.clear();
    mockSetOpen.mockClear();
    mockSetOpenSnackBar.mockClear();
    mockSetSeverity.mockClear();
    mockSetMessage.mockClear();
    mockSetTitle.mockClear();
  });

  test("renders correctly for CREATE_BANK", () => {
    renderComponent(CREATE_BANK);

    expect(screen.getByLabelText("ID Banca")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome Banca")).toBeInTheDocument();
    expect(screen.getByLabelText("Quota")).toBeInTheDocument();
    expect(screen.getByLabelText("Burst")).toBeInTheDocument();
    expect(screen.getByLabelText("Tasso")).toBeInTheDocument();
  });

  test("renders correctly for UPDATE_BANK", () => {
    setBankInSessionStorage();
    renderComponent(UPDATE_BANK);

    expect(screen.getByLabelText("ID Banca")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome Banca")).toBeInTheDocument();
    expect(screen.getByLabelText("Quota")).toBeInTheDocument();
    expect(screen.getByLabelText("Burst")).toBeInTheDocument();
    expect(screen.getByLabelText("Tasso")).toBeInTheDocument();
  });

  test("renders correctly for DELETE_BANK", () => {
    setBankInSessionStorage();
    renderComponent(DELETE_BANK);

    expect(screen.getByText("Sei sicuro di voler cancellare questo istituto bancario dal registro degli aderenti?")).toBeInTheDocument();
  });

  test("handles form submission for DELETE_BANK", async () => {
    mockFetchRequest.mockResolvedValue({ success: true, valuesObj: {} });
    setBankInSessionStorage();

    renderComponent(DELETE_BANK);

    fireEvent.click(screen.getByText("Conferma"));

    await waitFor(() => {
      expect(mockFetchRequest).toHaveBeenCalledWith({
        urlEndpoint: generatePath(BANKS_DELETE, { acquirerId: "testAcquirerId" }),
        method: "POST",
        abortController
      });
    });
  });

  test("handles form submission for CREATE_BANK with valid data", async () => {
    renderComponent(CREATE_BANK);
    mockFetchRequest.mockResolvedValue({ success: true, valuesObj: { message: "Bank created successfully" } });

    fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "newAcquirerId" } });
    fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "newDenomination" } });
    fireEvent.change(screen.getByLabelText("Burst"), { target: { value: "123" } });
    fireEvent.change(screen.getByLabelText("Tasso"), { target: { value: "123" } });
    fireEvent.click(screen.getByText("Conferma"));

    await waitFor(() => {
      expect(mockFetchRequest).toHaveBeenCalledWith({
        urlEndpoint: BANKS_CREATE,
        method: "POST",
        abortController,
        body: {
          acquirerId: "newAcquirerId",
          burstLimit: "123",
          denomination: "newDenomination",
          limit: "",
          period: null,
          rateLimit: "123"
        },
        headers: {
     "Content-Type": "application/json",
    },
      });
    });
  });

  test("handles form submission for UPDATE_BANK with valid data", async () => {
    setBankInSessionStorage();
    renderComponent(UPDATE_BANK);
    mockFetchRequest.mockResolvedValue({ success: true, valuesObj: { message: "Bank updated successfully" } });

    fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "updatedDenomination" } });
    fireEvent.change(screen.getByLabelText("Tasso"), { target: { value: "123" } });
    fireEvent.click(screen.getByText("Conferma"));

    await waitFor(() => {
      expect(mockFetchRequest).toHaveBeenCalledWith({
        urlEndpoint: generatePath(BANKS_UPDATE, { acquirerId: "testAcquirerId" }),
        method: "PUT",
        abortController,
        body: {
          acquirerId: "testAcquirerId",
          burstLimit: "456",
          denomination: "updatedDenomination",
          limit: "456",
          period: "DAY",
          rateLimit: "123"
        },
        headers: {
               "Content-Type": "application/json",
             },
      });
    });
  });

  test("handles close modal", () => {
    renderComponent(CREATE_BANK);

    fireEvent.click(screen.getByText("Annulla"));

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  test("handles validation errors for CREATE_BANK", async () => {
    renderComponent(CREATE_BANK);

    fireEvent.click(screen.getByText("Conferma"));

    await waitFor(() => {
      expect(screen.getAllByText("Campo obbligatorio").length).toBe(2);
      expect(mockFetchRequest).not.toHaveBeenCalled();
    });
  });

  test("handles validation errors for UPDATE_BANK", async () => {
    setBankInSessionStorage();

    renderComponent(UPDATE_BANK);

    fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "" } });
    fireEvent.click(screen.getByText("Conferma"));

    await waitFor(() => {
      expect(screen.getAllByText("Campo obbligatorio").length).toBe(1);
      expect(mockFetchRequest).not.toHaveBeenCalled();
    });
  });
});
