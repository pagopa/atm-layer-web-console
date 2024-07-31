import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Ctx } from "../../../DataContext";

import BankDetailPage from "../BankDetailPage";


beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
  });
  

  describe("BankDetailPage", () => {

    const abortController = new AbortController();

    test("Test BankDetailPage with sessionStorage", () => {
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <BankDetailPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        expect(screen.getAllByText("Dettaglio banca")[0]).toBeInTheDocument();
    })
  })