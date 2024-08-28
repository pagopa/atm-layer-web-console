import { act, fireEvent, queryAllByAltText, queryAllByText, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import ModalBank from "../ModalBank";
import { CREATE_BANK, DELETE_BANK, UPDATE_BANK } from "../../../../commons/constants";

const originalFetch = global.fetch;
const abortController = new AbortController();

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
});

describe("ModalBank Test", () => {
    const recordParams = {
        acquirerId: "testAcquirerId",
        denomination: "testDenomination",
        rateLimit: "123",
        burstLimit: "456",
        limit: "789",
        period: "DAY"
    };
    let setOpen = jest.fn();
    const setOpenSnackBar = jest.fn();
    const setSeverity = jest.fn();
    const setMessage = jest.fn();
    const setTitle = jest.fn();
    sessionStorage.setItem("recordParamsBank", JSON.stringify(recordParams));

    const renderModalBank = (modalType: string) => {
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <ModalBank
                        type={modalType}
                        open={true}
                        setOpen={setOpen}
                        setOpenSnackBar={setOpenSnackBar}
                        setSeverity={setSeverity}
                        setMessage={setMessage}
                        setTitle={setTitle}
                        severity=""
                        message=""
                        title="" 
                        openSnackBar={false}                    
                    />
                </BrowserRouter>
            </Ctx.Provider>
        );
    };

    test("Test ModalBank with CREATE_BANK fetch success", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                valuesObj: {
                    message: "Bank created successfully",
                },
            }),
        });

        renderModalBank(CREATE_BANK);

        fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "newAcquirerId" } });
        fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "newDenomination" } });
        fireEvent.click(screen.getByText("Conferma"));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });

        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/banks/insert"), expect.anything());
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);
    });


    test("Test ModalBank with CREATE_BANK fetch not success", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: false,
                valuesObj: {
                    message: "Failed to create bank",
                },
            }),
        });

        renderModalBank(CREATE_BANK);

        fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "newAcquirerId" } });
        fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "newDenomination" } });
        fireEvent.click(screen.getByText("Conferma"));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });

        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/banks/insert"), expect.anything());
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);
    });

    test("Test ModalBank with CREATE_BANK catch error", async () => {
        global.fetch = jest.fn(() => {throw new Error()});

        renderModalBank(CREATE_BANK);

        fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "newAcquirerId" } });
        fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "newDenomination" } });
        fireEvent.click(screen.getByText("Conferma"));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });
    });

    test("Test ModalBank with DELETE_BANK", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                status: 204,
                valuesObj: {},
            }),
        });

        renderModalBank(DELETE_BANK);
        fireEvent.click(screen.getByText("Conferma"));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });

        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/banks/disable/"), expect.anything());
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);
    });

    test("Test ModalBank with UPDATE_BANK fetch not success", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: false,
                valuesObj: {
                    message: "Failed to update Bank",
                },
            }),
        });

        renderModalBank(UPDATE_BANK);

        fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "updatedDenomination" } });
        fireEvent.click(screen.getByText("Conferma"));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });

        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/banks/update"), expect.anything());
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);
    });

    test("Test ModalBank with UPDATE_BANK catch error", async () => {
        global.fetch = jest.fn(() => {throw new Error()});

        renderModalBank(UPDATE_BANK);

        fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "updatedDenomination" } });
        fireEvent.click(screen.getByText("Conferma"));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });
    });

    test("Test ModalBank with UPDATE_BANK fetch success", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                success: true,
                valuesObj: {
                    message: "Bank updated successfully",
                },
            }),
        });

        renderModalBank(UPDATE_BANK);

        fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "updatedDenomination" } });
        fireEvent.click(screen.getByText("Conferma"));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });

        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/banks/update"), expect.anything());
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);
    });

    test("Test API Error during CREATE_BANK", async () => {
      global.fetch = jest.fn().mockRejectedValueOnce(new Error("API error"));
      
      renderModalBank(CREATE_BANK);
      
      fireEvent.click(screen.getByText("Conferma"));
  
      await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 3000));
      });
    });
  

    test("Test API Error during DELETE_BANK", async () => {
        global.fetch = jest.fn().mockRejectedValueOnce(new Error("API error"));
        renderModalBank(DELETE_BANK);
        fireEvent.click(screen.getByText("Conferma"));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });

        expect(setOpenSnackBar).toHaveBeenCalledWith(true);
        expect(setSeverity).toHaveBeenCalledWith("error");
    });

    test("Test API Error during UPDATE_BANK", async () => {
        global.fetch = jest.fn().mockRejectedValueOnce(new Error("API error"));
        renderModalBank(UPDATE_BANK);
        fireEvent.click(screen.getByText("Conferma"));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });

    });

    test("Test ModalBank without type", () => {
        renderModalBank("");

        fireEvent.click(screen.getByText("Conferma"));

        expect(setOpenSnackBar).not.toHaveBeenCalled();
    });

    test("Test resetErrors when changing input", () => {
        renderModalBank(CREATE_BANK);

        fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "" } });
        fireEvent.click(screen.getByText("Conferma"));

        fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "newAcquirerId" } });


        expect(screen.getByLabelText("ID Banca")).not.toHaveClass("Mui-error");
    });

    test("Test handleClose resets form and errors", () => {
    renderModalBank(CREATE_BANK);

    fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "newAcquirerId" } });
    fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "newDenomination" } });

    fireEvent.click(screen.getByText("Annulla"));

    expect((screen.getByLabelText("ID Banca") as HTMLInputElement).value).toBe("");
    expect((screen.getByLabelText("Nome Banca") as HTMLInputElement).value).toBe("");
});

    test("Test validateForm with only limit or period set", () => {
      renderModalBank(CREATE_BANK);
  
      fireEvent.change(screen.getByLabelText("Quota"), { target: { value: "100" } });
      fireEvent.click(screen.getByText("Conferma"));
  
      const errorMessage = screen.queryAllByText(/Indicare sia una quota che il periodo a cui si applica/i)[0];
  
      expect(errorMessage).toBeInTheDocument();
  });

    test("Test form fields rendering for CREATE_BANK and UPDATE_BANK", () => {
        renderModalBank(CREATE_BANK);

        expect(screen.getByLabelText("ID Banca")).toBeInTheDocument();
        expect(screen.getByLabelText("Nome Banca")).toBeInTheDocument();
        expect(screen.getByLabelText("Tasso")).toBeInTheDocument();

        renderModalBank(UPDATE_BANK);

        expect(screen.getByLabelText("ID Banca")).toBeInTheDocument();
        expect(screen.getByLabelText("Nome Banca")).toBeInTheDocument();
        expect(screen.getByLabelText("Tasso")).toBeInTheDocument();
    });

    test("Test onChange only numbers allowed in numeric fields", () => {
        renderModalBank(CREATE_BANK);
        fireEvent.keyDown(screen.getByLabelText("Quota"), {key: 'Z', code: 'KeyZ'});
        fireEvent.keyDown(screen.getByLabelText("Tasso"), {key: 'Z', code: 'KeyZ'});
    });

});
