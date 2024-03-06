import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Ctx } from "../../../DataContext";
import BpmnDetailPage from "../BpmnDetailPage";
import { bpmnTableMocked } from "../../../components/Mock4Test/BpmnMocks";


beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
  });
  

  describe("BpmnDetailPage", () => {

    const abortController = new AbortController();

    test("Test BpmnDetailPage with sessionStorage", () => {
        sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]))
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <BpmnDetailPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        expect(screen.getAllByText("Dettaglio risorsa di processo")[0]).toBeInTheDocument();
        fireEvent.click(screen.getByText("Aggiorna"))
    })

    test("Test BpmnDetailPage without sessionStorage", () => {
        sessionStorage.removeItem("recordParams")
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <BpmnDetailPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
    })
  })