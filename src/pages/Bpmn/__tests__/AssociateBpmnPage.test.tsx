import { render, screen } from "@testing-library/react";
import { Ctx } from "../../../DataContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AssociateBpmnPage from "../AssociateBpmnPage";
import { bpmnTableMocked } from "../../../components/Mock4Test/BpmnMocks";

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

describe("AssociateBpmnPage", () => {
    const abortController = new AbortController();

    test("getItem recordParams case", () => {
        sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));

        render(
            <Ctx.Provider value={{ abortController }}>
                <MemoryRouter initialEntries={['/associate-bpmn/123']}>
                    <Routes>
                        <Route path="/associate-bpmn/:bpmnId" element={<AssociateBpmnPage />} />
                    </Routes>
                </MemoryRouter>
            </Ctx.Provider>
        );
        expect(screen.getAllByText("Associazione risorsa di processo")[0]).toBeInTheDocument();
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
                <MemoryRouter initialEntries={['/associate-bpmn/123']}>
                    <Routes>
                        <Route path="/associate-bpmn/:bpmnId" element={<AssociateBpmnPage />} />
                    </Routes>
                </MemoryRouter>
            </Ctx.Provider>
        );

        expect(sessionStorage.getItem).toHaveBeenCalledWith("recordParams");
    });
});
