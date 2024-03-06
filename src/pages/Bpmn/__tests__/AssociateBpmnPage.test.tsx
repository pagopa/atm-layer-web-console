import { render, screen } from "@testing-library/react";
import { Ctx } from "../../../DataContext";
import { BrowserRouter } from "react-router-dom";
import AssociateBpmnPage from "../AssociateBpmnPage";
import { bpmnTableMocked } from "../../../components/Mock4Test/BpmnMocks";

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
  });

describe("AssociateBpmnPage", () => {
    const abortController = new AbortController();

    test(" getItem recordParams case", () => {
        sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]))
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <AssociateBpmnPage />
                </BrowserRouter>
              </Ctx.Provider> 
        );
        expect(screen.getAllByText("Associazione risorsa di processo")[0]).toBeInTheDocument();
    })
  })