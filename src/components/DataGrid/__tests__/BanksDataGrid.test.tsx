import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BankDataGrid from "../BanksDataGrid";
import { Ctx } from "../../../DataContext";
import { BANKS } from "../../../commons/constants";

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

describe("BankDataGrid test", () => {
    const abortController = new AbortController();

    const mockBankData = {
        page: 0,
        limit: 10,
        itemsFound: 1,
        totalPages: 1,
        results: [{ acquirerId: '1', denomination: 'Test Bank', clientId: '123', rateMin: '0.5', rateMax: '1.5' }]
    };

    test("BankDataGrid fetches and displays data on load", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: { ...mockBankData },
            }),
        });

        await act(async () => {
            render(
                <Ctx.Provider value={{ abortController }}>
                    <BrowserRouter>
                        <BankDataGrid
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

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(screen.getByText('Test Bank')).toBeInTheDocument());
    });

    test("BankDataGrid shows no rows overlay when there are no results", async () => {
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
                        <BankDataGrid
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

        await waitFor(() => expect(screen.queryByText("Banche non presenti non presenti")).toBeInTheDocument());
    });

    test("BankDataGrid handles fetch error gracefully", async () => {
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
                        <BankDataGrid
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

    test("BankDataGrid handles empty response", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                status: 200,
                success: true
            }),
        });

        await act(async () => {
            render(
                <Ctx.Provider value={{ abortController }}>
                    <BrowserRouter>
                        <BankDataGrid
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
    });

    test("BankDataGrid can apply filters and fetch filtered data", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: { ...mockBankData },
            }),
        }).mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    page: 0,
                    limit: 10,
                    itemsFound: 1,
                    totalPages: 1,
                    results: [{ acquirerId: '1', denomination: 'Filtered Bank', clientId: '123', rateMin: '0.5', rateMax: '1.5' }]
                },
            }),
        });

        await act(async () => {
            render(
                <Ctx.Provider value={{ abortController }}>
                    <BrowserRouter>
                        <BankDataGrid
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

        fireEvent.change(screen.getByTestId('bank-acquirerId-test'), { target: { value: '1' } });
        fireEvent.click(screen.getByText('Filtra'));

        await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
        await waitFor(() => expect(screen.getByText('Filtered Bank')).toBeInTheDocument());
    });
});
