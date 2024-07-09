import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { fetchRequest } from "../../../../hook/fetch/fetchRequest";
import { Ctx } from "../../../../DataContext";
import { generatePath } from "react-router-dom";
import ModalBank from "../ModalBank";
import { CREATE_BANK, DELETE_BANK, UPDATE_BANK } from "../../../../commons/constants";
import { BANKS_DELETE, BANKS_UPDATE } from "../../../../commons/endpoints";

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
    <Ctx.Provider value={ abortController}>
      <ModalBank
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

const setBankInSessionStorage = () => {
    sessionStorage.setItem("recordParams", JSON.stringify({
        acquirerId: "testAcquirerId",
		denomination: "testDenomination",
		rateLimit: "restRateLimit"
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
    expect(screen.getByLabelText("Rate Limite")).toBeInTheDocument();
  });

  test("renders correctly for UPDATE_BANK", () => {
    setBankInSessionStorage();
    renderComponent(UPDATE_BANK);
    expect(screen.getByLabelText("Update istituto bancario")).toBeInTheDocument();
  });

  test("renders correctly for DELETE_USER", () => {
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
        method: "DELETE",
      });
    });
  });


//   test("handles form submission for UPDATE_BANK", async () => {
//     setBankInSessionStorage();
//     renderComponent(UPDATE_BANK);
//     mockFetchRequest.mockResolvedValue({ success: true, valuesObj: { message: "User updated successfully" } });

//     fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "nuovo nome" } });
//     fireEvent.change(screen.getByLabelText("Rate Limite"), { target: { value: "nuovo rate" } });
//     fireEvent.click(screen.getByText("Conferma"));

//     await waitFor(() => {
//       expect(mockFetchRequest).toHaveBeenCalledWith({
//         urlEndpoint: generatePath(BANKS_UPDATE, { acquirerId: "testAcquirerId" }),
//         method: "PUT",
//         body: {
//             denomination: "nuovo nome",
//             rateLimit: "nuovo rate"
//         },
//       });
//     });
//   });

//   test("handles close modal", () => {
//     renderComponent(CREATE_BANK);

//     fireEvent.click(screen.getByText("Annulla"));

//     expect(mockSetOpen).toHaveBeenCalledWith(false);
//   });

//   test("handles validation errors for UPDATE_USER", async () => {
//     setBankInSessionStorage();

//     renderComponent(UPDATE_BANK);

//     fireEvent.click(screen.getByText("Conferma"));

//     await waitFor(() => {
//       expect(screen.getByText("Campo obbligatorio")).toBeInTheDocument();
//       expect(mockFetchRequest).not.toHaveBeenCalled();
//     });
//   });
});