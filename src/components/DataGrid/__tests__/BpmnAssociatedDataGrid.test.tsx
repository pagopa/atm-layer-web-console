import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import { bpmnAssociationTableMocked } from "../../Mock4Test/BpmnMocks";
import BpmnAssociatedDataGrid from "../BpmnAssociatedDataGrid";
import useColumns from "../../../hook/Grids/useColumns";

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

describe("BpmnAssociatedDataGrid test", () => {

    const { getColumnsGrid, getVisibleColumns } = useColumns();

    const abortController = new AbortController();


    test("BpmnAssociatedDataGrid Test with next page click", async () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: { ...bpmnAssociationTableMocked },
            }),
        });

        await act(async () => {
            render(
                <Ctx.Provider value={{ abortController }}>
                    <BrowserRouter>
                        <BpmnAssociatedDataGrid
                            buildColumnDefs={() => getColumnsGrid("BPMN_ASSOCIATED")}
                            visibleColumns={() => getVisibleColumns("BPMN_ASSOCIATED")}
                        />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });

        fireEvent.click(screen.getByTestId("KeyboardArrowRightIcon"));
    });


    test("BpmnAssociatedDataGrid Test with empty table", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: { page: 0, limit: 10, itemsFound: 0, totalPages: 0, results: [] },
            }),
        });
        await act(async () => {
            render(
                <Ctx.Provider value={{ abortController }}>
                    <BrowserRouter>
                        <BpmnAssociatedDataGrid
                            buildColumnDefs={() => getColumnsGrid("BPMN_ASSOCIATED")}
                            visibleColumns={() => getVisibleColumns("BPMN_ASSOCIATED")}
                        />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
        await waitFor(() => expect(screen.queryByText("Associazioni non presenti")).toBeInTheDocument());
    });

    test("BpmnAssociatedDataGrid Test without response", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                status: 403,
                success: false,
                valuesObj: { message: "Missing Authentication Token" },
            }),
        });
        await act(async () => {
            render(
                <Ctx.Provider value={{ abortController }}>
                    <BrowserRouter>
                        <BpmnAssociatedDataGrid
                            buildColumnDefs={() => getColumnsGrid("BPMN_ASSOCIATED")}
                            visibleColumns={() => getVisibleColumns("BPMN_ASSOCIATED")}
                        />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
        await waitFor(() => expect(screen.queryByText("Qualcosa è andato storto")).toBeInTheDocument());
    });

    test("BpmnAssociatedDataGrid Test with fetch error", async () => {
        global.fetch = jest.fn().mockImplementation(() => {
            throw new Error("Fetch error");
        });
        await act(async () => {
            render(
                <Ctx.Provider value={{ abortController }}>
                    <BrowserRouter>
                        <BpmnAssociatedDataGrid
                            buildColumnDefs={() => getColumnsGrid("BPMN_ASSOCIATED")}
                            visibleColumns={() => getVisibleColumns("BPMN_ASSOCIATED")}
                        />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
    });

});