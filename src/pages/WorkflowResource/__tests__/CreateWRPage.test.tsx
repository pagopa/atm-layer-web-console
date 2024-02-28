import { render, screen } from "@testing-library/react";
import { Ctx } from "../../../DataContext";
import { BrowserRouter } from "react-router-dom";
import CreateWRPage from "../CreateWRPage";

describe("CreateBpmnPage", () => {

    const abortController = new AbortController();

    test("render", () => {
        
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <CreateWRPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        expect(screen.getAllByText("Creazione risorsa aggiuntiva")[0]).toBeInTheDocument();
    })
  })