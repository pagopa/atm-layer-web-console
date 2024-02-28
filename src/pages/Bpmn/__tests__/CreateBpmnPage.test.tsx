import { render, screen } from "@testing-library/react";
import { Ctx } from "../../../DataContext";
import { BrowserRouter } from "react-router-dom";
import CreateBpmnPage from "../CreateBpmnPage";

describe("CreateBpmnPage", () => {

    const abortController = new AbortController();

    test("render", () => {
        
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <CreateBpmnPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        expect(screen.getAllByText("Creazione risorsa di processo")[0]).toBeInTheDocument();
    })
  })