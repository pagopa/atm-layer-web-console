import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import WorkflowResourceDataGrid from "../WorkflowResourceDataGrid";
import { Ctx } from "../../../DataContext";
import { workFlowResourceTableMocked } from "../../Mock4Test/BpmnMocks";

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

const mockContextValue = {
    loggedUserInfo: {
        userId: 'mario.rossi@pagopa.com',
        name: 'Mario',
        surname: 'Rossi',
        createdAt: '2024-05-27',
        lastUpdatedAt: '2024-05-27',
        profiles: [
            {
                description: "Gestione flussi in lettura",
                profileId: 1,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            },
            {
                description: "Gestione flussi in scrittura",
                profileId: 2,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            },
            {
                description: "Rilascio BPMN",
                profileId: 3,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            },
            {
                description: "Emulator",
                profileId: 4,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            },
            {
                description: "Gestione utenti",
                profileId: 5,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            }
        ]
    },
    abortController: new AbortController()
};

describe("WorkflowResourceDataGrid test", () => {

    const abortController = new AbortController();


    test("WorkflowResourceDataGrid.test Test", async () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: { ...workFlowResourceTableMocked },
            }),
        });

        await act(async () => {
            render(
                <Ctx.Provider value={ mockContextValue }>
                    <BrowserRouter>
                        <WorkflowResourceDataGrid />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });

        fireEvent.click(screen.getByTestId("KeyboardArrowRightIcon"));

    });


    test("WorkflowResourceDataGrid.test Test with empty table", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: { page: 0, limit: 10, itemsFound: 0, totalPages: 0, results: [] },
            }),
        });
        await act(async () => {
            render(
                <Ctx.Provider value={ mockContextValue }>
                    <BrowserRouter>
                        <WorkflowResourceDataGrid />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
        await waitFor(() => expect(screen.queryByText("Risorse aggiuntive per processi non presenti")).toBeInTheDocument());
    });

    test("WorkflowResourceDataGrid Test without response", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                status: 403,
                success: false,
                valuesObj: { message: "Missing Authentication Token" },
            }),
        });
        await act(async () => {
            render(
                <Ctx.Provider value={ mockContextValue }>
                    <BrowserRouter>
                        <WorkflowResourceDataGrid />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
        await waitFor(() => expect(screen.queryByText("Qualcosa è andato storto")).toBeInTheDocument());
    });

    test("WorkflowResourceDataGrid Catch Error", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                status: 200,
                success: true
            }),
        });
        await act(async () => {
            render(
                <Ctx.Provider value={ mockContextValue }>
                    <BrowserRouter>
                        <WorkflowResourceDataGrid />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
    });

});