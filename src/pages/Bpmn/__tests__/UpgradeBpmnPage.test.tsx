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
    const abortController = new AbortController();

    test("Test UpgradeBpmnPage", () => {
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'recordParams') {
                return JSON.stringify(bpmnTableMocked.results[0]);
            }
            return null;
        });

        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <UpgradeBpmnPage />
                </BrowserRouter>
            </Ctx.Provider>
        );

        expect(screen.getAllByText("Aggiornamento risorsa di processo")[0]).toBeInTheDocument();
    });

    test("populates recordParams correctly when recordParamsString is present in sessionStorage", () => {
        const mockRecordParams = bpmnTableMocked.results[0];
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'recordParams') {
                return JSON.stringify(mockRecordParams);
            }
            return null;
        });

        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <UpgradeBpmnPage />
                </BrowserRouter>
            </Ctx.Provider>
        );

        expect(sessionStorage.getItem).toHaveBeenCalledWith("recordParams");
    });
});
