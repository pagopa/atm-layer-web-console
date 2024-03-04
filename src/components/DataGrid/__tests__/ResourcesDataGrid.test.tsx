import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ResourcesDataGrid from "../ResourcesDataGrid";
import { Ctx } from "../../../DataContext";
import { resourcesTableMocked } from "../../Mock4Test/BpmnMocks";

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

describe("ResourcesDataGrid test", () => {

    const abortController = new AbortController();


    test("ResourcesDataGrid.test Test", async () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: { ...resourcesTableMocked },
            }),
        });

        await act(async () => {
            render(
                <Ctx.Provider value={{ abortController }}>
                    <BrowserRouter>
                        <ResourcesDataGrid />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });

        fireEvent.click(screen.getByTestId("KeyboardArrowRightIcon"));

    });


    test("ResourcesDataGrid.test Test with empty table", async () => {
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
                        <ResourcesDataGrid />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
        await waitFor(() => expect(screen.queryByText("Risorse statiche non presenti")).toBeInTheDocument());
    });

    test("ResourcesDataGrid Test without response", async () => {
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
                        <ResourcesDataGrid />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
        await waitFor(() => expect(screen.queryByText("Qualcosa è andato storto")).toBeInTheDocument());
    });

    test("ResourcesDataGrid Test with fetch error", async () => {
        global.fetch = jest.fn().mockImplementation(() => {
            throw new Error("Fetch error");
        });
        await act(async () => {
            render(
                <Ctx.Provider value={{ abortController }}>
                    <BrowserRouter>
                        <ResourcesDataGrid />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        })
    });

});