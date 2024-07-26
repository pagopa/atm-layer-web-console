import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UsersDataGrid from "../UsersDataGrid";
import { Ctx } from "../../../DataContext";
import { userTableMocked } from "../../Mock4Test/BpmnMocks"
import { CREATE_USER } from "../../../commons/constants";

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

describe("UsersDataGrid test", () => {

    test("renders UsersDataGrid and loads data", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: { page: 0, limit: 10, itemsFound: 0, totalPages: 0, results: [] },
            }),
        });

        await act(async () => {
            render(
                <Ctx.Provider value={mockContextValue}>
                    <BrowserRouter>
                        <UsersDataGrid 
                            type="" 
                            setType={jest.fn()} 
                            open={false} 
                            setOpen={jest.fn()} 
                            setOpenSnackBar={jest.fn()} 
                            setSeverity={jest.fn()} 
                            setMessage={jest.fn()} 
                            setTitle={jest.fn()} 
                        />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });

        expect(screen.getByText("Utenti non presenti")).toBeInTheDocument();
    });

    test("opens ModalUsers on create user click", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: { ...userTableMocked },
            }),
        });

        const mockSetOpen = jest.fn();
        const mockSetType = jest.fn();

        await act(async () => {
            render(
                <Ctx.Provider value={mockContextValue}>
                    <BrowserRouter>
                        <UsersDataGrid 
                            type="" 
                            setType={mockSetType} 
                            open={false} 
                            setOpen={mockSetOpen} 
                            setOpenSnackBar={jest.fn()} 
                            setSeverity={jest.fn()} 
                            setMessage={jest.fn()} 
                            setTitle={jest.fn()} 
                        />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });

        fireEvent.click(screen.getByRole('button', { name: /Crea nuovo/i }));

        await waitFor(() => {
            expect(mockSetOpen).toHaveBeenCalledWith(true);
            expect(mockSetType).toHaveBeenCalledWith(CREATE_USER);
        });
    });

    test("UsersDataGrid Test with empty table", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: { page: 0, limit: 10, itemsFound: 0, totalPages: 0, results: [] },
            }),
        });
        
        await act(async () => {
            render(
                <Ctx.Provider value={mockContextValue}>
                    <BrowserRouter>
                        <UsersDataGrid 
                            type="" 
                            setType={jest.fn()} 
                            open={false} 
                            setOpen={jest.fn()} 
                            setOpenSnackBar={jest.fn()} 
                            setSeverity={jest.fn()} 
                            setMessage={jest.fn()} 
                            setTitle={jest.fn()} 
                        />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
        
        await waitFor(() => expect(screen.queryByText("Utenti non presenti")).toBeInTheDocument());
    });

    test("UsersDataGrid Test without response", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                status: 403,
                success: false,
                valuesObj: { message: "Missing Authentication Token" },
            }),
        });
        
        await act(async () => {
            render(
                <Ctx.Provider value={mockContextValue}>
                    <BrowserRouter>
                        <UsersDataGrid 
                            type="" 
                            setType={jest.fn()} 
                            open={false} 
                            setOpen={jest.fn()} 
                            setOpenSnackBar={jest.fn()} 
                            setSeverity={jest.fn()} 
                            setMessage={jest.fn()} 
                            setTitle={jest.fn()} 
                        />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
        
        await waitFor(() => expect(screen.queryByText("Qualcosa è andato storto")).toBeInTheDocument());
    });

    test("UsersDataGrid Test Catch Error", async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

        await act(async () => {
            render(
                <Ctx.Provider value={mockContextValue}>
                    <BrowserRouter>
                        <UsersDataGrid 
                            type="" 
                            setType={jest.fn()} 
                            open={false} 
                            setOpen={jest.fn()} 
                            setOpenSnackBar={jest.fn()} 
                            setSeverity={jest.fn()} 
                            setMessage={jest.fn()} 
                            setTitle={jest.fn()} 
                        />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });

        await waitFor(() => expect(screen.queryByText("Qualcosa è andato storto")).toBeInTheDocument());
    });
});
