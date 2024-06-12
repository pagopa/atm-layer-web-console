import { render, screen } from "@testing-library/react";
import { Ctx } from "../../../DataContext";
import { BrowserRouter } from "react-router-dom";
import UpgradeBpmnPage from "../UpgradeBpmnPage";
import { bpmnTableMocked } from "../../../components/Mock4Test/BpmnMocks";

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

describe("UpgradeBpmnPage", () => {
    sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]))

    const abortController = new AbortController();

    test("Test UpgradeBpmnPage", () => {
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <UpgradeBpmnPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        expect(screen.getAllByText("Aggiornamento risorsa di processo")[0]).toBeInTheDocument();
    })

});
