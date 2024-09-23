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
        fireEvent.change(screen.getByLabelText("Burst"), { target: { value: "123" } });
        fireEvent.change(screen.getByLabelText("Rate"), { target: { value: "123" } });
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
  
      fireEvent.change(screen.getByLabelText("Limite chiamate"), { target: { value: "100" } });
      fireEvent.click(screen.getByText("Conferma"));
  
      const errorMessage = screen.queryAllByText(/Indicare sia una quota che il periodo a cui si applica/i)[0];
  
      expect(errorMessage).toBeInTheDocument();
  });

    test("Test form fields rendering for CREATE_BANK and UPDATE_BANK", () => {
        renderModalBank(CREATE_BANK);

        expect(screen.getByLabelText("ID Banca")).toBeInTheDocument();
        expect(screen.getByLabelText("Nome Banca")).toBeInTheDocument();
        expect(screen.getByLabelText("Burst")).toBeInTheDocument();
        expect(screen.getByLabelText("Rate")).toBeInTheDocument();

        renderModalBank(UPDATE_BANK);

        expect(screen.getByLabelText("ID Banca")).toBeInTheDocument();
        expect(screen.getByLabelText("Nome Banca")).toBeInTheDocument();
        expect(screen.getByLabelText("Burst")).toBeInTheDocument();
        expect(screen.getByLabelText("Rate")).toBeInTheDocument();
    });

    test("Test onChange only numbers allowed in numeric fields", () => {
        renderModalBank(CREATE_BANK);
        fireEvent.keyDown(screen.getByLabelText("Limite chiamate"), {key: 'Z', code: 'KeyZ'});
        fireEvent.keyDown(screen.getByLabelText("Burst"), {key: 'Z', code: 'KeyZ'});
        fireEvent.keyDown(screen.getByLabelText("Rate"), {key: 'Z', code: 'KeyZ'});
    });

    test("should allow empty limit and period", () => {
        renderModalBank(CREATE_BANK);
      
        fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "newAcquirerId" } });
        fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "newDenomination" } });
        fireEvent.change(screen.getByLabelText("Limite chiamate"), { target: { value: "" } });
        // fireEvent.change(screen.getByLabelText("NON DEFINITO"), { target: { value: "NON DEFINITO" } });
      
        fireEvent.click(screen.getByText("Conferma"));
      
        const errorMessage = screen.queryByText(/Indicare sia una quota che il periodo a cui si applica/i);
        expect(errorMessage).not.toBeInTheDocument();
      });

      test("should display error when burstLimit or rateLimit is zero", () => {
        renderModalBank(CREATE_BANK);
      
        fireEvent.change(screen.getByLabelText("Burst"), { target: { value: "0" } });
        fireEvent.change(screen.getByLabelText("Rate"), { target: { value: "0" } });
      
        fireEvent.click(screen.getByText("Conferma"));
      
        expect(screen.getAllByText(/Il valore deve essere maggiore di 0/i)).toHaveLength(2);
      });

      test("should reset form and close modal when Annulla is clicked", () => {
        renderModalBank(CREATE_BANK);
      
        fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "testAcquirerId" } });
        fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "testDenomination" } });
      
        fireEvent.click(screen.getByText("Annulla"));
      
        const idInput = screen.getByLabelText("ID Banca") as HTMLInputElement;
        const denominationInput = screen.getByLabelText("Nome Banca") as HTMLInputElement;
      
        expect(idInput.value).toBe("");
        expect(denominationInput.value).toBe("");
        expect(setOpen).toHaveBeenCalledWith(false);
      });
      
      
      test("should update form data on input change", () => {
        renderModalBank(CREATE_BANK);
      
        fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "newAcquirerId" } });
        fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "newDenomination" } });
      
        const idInput = screen.getByLabelText("ID Banca") as HTMLInputElement;
        const denominationInput = screen.getByLabelText("Nome Banca") as HTMLInputElement;
      
        expect(idInput.value).toBe("newAcquirerId");
        expect(denominationInput.value).toBe("newDenomination");
      });
      

      test("should prevent non-numeric input in numeric fields", () => {
        renderModalBank(CREATE_BANK);
      
        const limitInput = screen.getByLabelText("Limite chiamate") as HTMLInputElement;
        const burstInput = screen.getByLabelText("Burst") as HTMLInputElement;
        const rateInput = screen.getByLabelText("Rate") as HTMLInputElement;

        fireEvent.keyDown(limitInput, { key: 'a', code: 'KeyA', charCode: 65 });
        fireEvent.keyDown(burstInput, { key: 'a', code: 'KeyA', charCode: 65 });
        fireEvent.keyDown(rateInput, { key: 'a', code: 'KeyA', charCode: 65 });
      
        expect(limitInput.value).toBe("");
        expect(burstInput.value).toBe("");
        expect(rateInput.value).toBe("");
      });
      
      

      test("should display error message when server returns an error during CREATE_BANK", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
          json: () => Promise.resolve({
            success: false,
            valuesObj: {
              message: "Errore di creazione banca",
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
      
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);
        expect(setMessage).toHaveBeenCalledWith("Errore di creazione banca");
      });

      test("should render all form fields correctly", () => {
        renderModalBank(CREATE_BANK);
      
        expect(screen.getByLabelText("ID Banca")).toBeInTheDocument();
        expect(screen.getByLabelText("Nome Banca")).toBeInTheDocument();
        expect(screen.getByLabelText("Limite chiamate")).toBeInTheDocument();
        expect(screen.getByLabelText("Burst")).toBeInTheDocument();
        expect(screen.getByLabelText("Rate")).toBeInTheDocument();
      });
      
      test("should validate form when required fields are missing", () => {
        renderModalBank(CREATE_BANK);
      
        fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "" } });
        fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "" } });
      
        fireEvent.click(screen.getByText("Conferma"));
      
        expect(screen.getAllByText("Campo obbligatorio")).toHaveLength(2);
      });
      
      test("should handle error during form submission", async () => {
        global.fetch = jest.fn().mockRejectedValueOnce(new Error("API error"));
      
        renderModalBank(CREATE_BANK);
      
        fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "testAcquirerId" } });
        fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "testDenomination" } });
      
        fireEvent.click(screen.getByText("Conferma"));
      
        await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
        });
      
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);
        expect(setSeverity).toHaveBeenCalledWith("error");
      });

      test("should handle submission error", async () => {
        global.fetch = jest.fn().mockRejectedValueOnce(new Error("Submission failed"));
      
        renderModalBank(CREATE_BANK);
      
        fireEvent.change(screen.getByLabelText("ID Banca"), { target: { value: "testAcquirerId" } });
        fireEvent.change(screen.getByLabelText("Nome Banca"), { target: { value: "testDenomination" } });
      
        fireEvent.click(screen.getByText("Conferma"));
      
        await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
        });
      
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);
        expect(setSeverity).toHaveBeenCalledWith("error");
      });

      test("should reset form and close modal when submission is cancelled", () => {
        renderModalBank(CREATE_BANK);

        fireEvent.click(screen.getByText("Annulla"));

        expect(setOpen).toHaveBeenCalledWith(false);
    });
      
});
