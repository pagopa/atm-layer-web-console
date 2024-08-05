import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import ModalBank from "../ModalBank";
import { CREATE_BANK, DELETE_BANK, UPDATE_BANK } from "../../../../commons/constants";
import { BANKS_CREATE, BANKS_DELETE, BANKS_UPDATE } from "../../../../commons/endpoints";

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
    const setOpen = jest.fn();
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

    test("Test ModalBank with CREATE_BANK", async () => {
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
        fireEvent.change(screen.getByLabelText("Tasso"), { target: { value: "123" } });
        fireEvent.click(screen.getByText("Conferma"));

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("/banks/insert"),
            expect.anything()
        );
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);
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
  
      expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining("/banks/disable/testAcquirerId"),
          expect.anything()
      );
      expect(setOpenSnackBar).toHaveBeenCalledWith(true);
  });
    test("Test ModalBank with UPDATE_BANK", async () => {
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

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("/banks/update"),
            expect.anything()
        );
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);
    });

    test("Test API Error during CREATE_BANK", () => {
        global.fetch = jest.fn().mockRejectedValueOnce(new Error("API error"));
        renderModalBank(CREATE_BANK);
        fireEvent.click(screen.getByText("Conferma"));
    });

    test("Test API Error during DELETE_BANK", () => {
        global.fetch = jest.fn().mockRejectedValueOnce(new Error("API error"));
        renderModalBank(DELETE_BANK);
        fireEvent.click(screen.getByText("Conferma"));
    });

    test("Test API Error during UPDATE_BANK", () => {
        global.fetch = jest.fn().mockRejectedValueOnce(new Error("API error"));
        renderModalBank(UPDATE_BANK);
        fireEvent.click(screen.getByText("Conferma"));
    });

    test("Test ModalBank without type", async () => {
        renderModalBank("");

        fireEvent.click(screen.getByText("Conferma"));
    });
});
