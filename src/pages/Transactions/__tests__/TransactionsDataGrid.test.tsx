import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import TransactionDataGrid from "../TransactionsDataGrid";

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

describe("TransactionDataGrid test", () => {

    test("TransactionDataGrid Test", async () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    
                        page: 0,
                        "limit": 10,
                        "itemsFound": 1970,
                        "totalPages": 197,
                        "results": [
                            {
                                "transactionId": "06789-0606-0001-03030303-1722845998000-4bd6f08f-b1",
                                "functionType": "SERVIZI_PAGOPA",
                                "acquirerId": "06789",
                                "branchId": "0606",
                                "terminalId": "03030303",
                                "transactionStatus": "SESSIONE_AVVIATA",
                                "createdAt": "2024-08-05T10:19:59.559+02:00",
                                "lastUpdatedAt": "2024-08-05T10:21:04.420+02:00"
                            },
                            {
                                "transactionId": "06789-12345-0001-64874412-1722845773000-e029d506-f",
                                "functionType": "SERVIZI_PAGOPA",
                                "acquirerId": "06789",
                                "branchId": "12345",
                                "terminalId": "64874412",
                                "transactionStatus": "SESSIONE_AVVIATA",
                                "createdAt": "2024-08-05T10:16:14.101+02:00",
                                "lastUpdatedAt": "2024-08-05T10:17:16.294+02:00"
                            },
                            {
                                "transactionId": "06789-12345-0001-64874412-1722845717000-4384fda5-2",
                                "functionType": "PAGAMENTO_AVVISI",
                                "acquirerId": "06789",
                                "branchId": "12345",
                                "terminalId": "64874412",
                                "transactionStatus": "VERIFICA_AVVISO_KO",
                                "createdAt": "2024-08-05T10:15:17.767+02:00",
                                "lastUpdatedAt": "2024-08-05T10:15:48.566+02:00"
                            },
                            {
                                "transactionId": "06789-12345-0001-64874412-1722606528000-3534f7f2-9",
                                "functionType": "GESTIONE_IDPAY",
                                "acquirerId": "06789",
                                "branchId": "12345",
                                "terminalId": "64874412",
                                "transactionStatus": "SESSIONE_AVVIATA",
                                "createdAt": "2024-08-02T15:48:48.357+02:00",
                                "lastUpdatedAt": "2024-08-02T15:50:03.524+02:00"
                            },
                            {
                                "transactionId": "06789-12345-0001-64874412-1722605120000-0d8d2b37-e",
                                "functionType": "GESTIONE_IDPAY",
                                "acquirerId": "06789",
                                "branchId": "12345",
                                "terminalId": "64874412",
                                "transactionStatus": "SESSIONE_AVVIATA",
                                "createdAt": "2024-08-02T15:25:20.329+02:00",
                                "lastUpdatedAt": "2024-08-02T15:26:31.656+02:00"
                            },
                            {
                                "transactionId": "06789-12345-0001-64874412-1722605053000-4764504e-8",
                                "functionType": "ONBOARDING_IDPAY",
                                "acquirerId": "06789",
                                "branchId": "12345",
                                "terminalId": "64874412",
                                "transactionStatus": "SESSIONE_AVVIATA",
                                "createdAt": "2024-08-02T15:24:13.394+02:00",
                                "lastUpdatedAt": "2024-08-02T15:25:14.761+02:00"
                            },
                            {
                                "transactionId": "06789-12345-0001-64874412-1722604550000-52d03a3f-2",
                                "functionType": "PAGAMENTO_AVVISI",
                                "acquirerId": "06789",
                                "branchId": "12345",
                                "terminalId": "64874412",
                                "transactionStatus": "VERIFICA_AVVISO_KO",
                                "createdAt": "2024-08-02T15:15:50.992+02:00",
                                "lastUpdatedAt": "2024-08-02T15:16:14.085+02:00"
                            },
                            {
                                "transactionId": "06789-12345-0001-64874412-1698769800000-5bc2b66e-6",
                                "functionType": "SPONTANEOUS_PAYMENT",
                                "acquirerId": "06789",
                                "branchId": "12345",
                                "terminalId": "64874412",
                                "transactionStatus": "SESSIONE_AVVIATA",
                                "createdAt": "2024-08-02T14:49:06.221+02:00",
                                "lastUpdatedAt": "2024-08-02T14:52:11.235+02:00"
                            },
                            {
                                "transactionId": "06789-12345-0001-64874412-1722603089000-7fedce17-b",
                                "functionType": "PAGAMENTO_AVVISI",
                                "acquirerId": "06789",
                                "branchId": "12345",
                                "terminalId": "64874412",
                                "transactionStatus": "SESSIONE_AVVIATA",
                                "createdAt": "2024-08-02T14:51:30.603+02:00",
                                "lastUpdatedAt": "2024-08-02T14:51:53.723+02:00"
                            },
                            {
                                "transactionId": "06789-12345-0001-64874412-1698769800000-02a682b0-a",
                                "functionType": "SERVIZI_PAGOPA",
                                "acquirerId": "06789",
                                "branchId": "12345",
                                "terminalId": "64874412",
                                "transactionStatus": "SESSIONE_AVVIATA",
                                "createdAt": "2024-08-02T14:47:08.075+02:00",
                                "lastUpdatedAt": "2024-08-02T14:47:08.434+02:00"
                            }
                        ]
                    
                 },
            }),
        });

        await act(async () => {
            render(
                <Ctx.Provider value={mockContextValue}>
                    <BrowserRouter>
                        <TransactionDataGrid />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });

        fireEvent.click(screen.getByTestId("KeyboardArrowRightIcon"));

    });

    test("TransactionDataGrid Test with empty table", async () => {
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
                        <TransactionDataGrid />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
        await waitFor(() => expect(screen.queryByText("Transazioni non presenti")).toBeInTheDocument());
    });

    test("TransactionDataGrid Test without response", async () => {
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
                        <TransactionDataGrid />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
        await waitFor(() => expect(screen.queryByText("Qualcosa è andato storto")).toBeInTheDocument());
    });

    test("TransactionDataGrid Test with fetch error", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: () => Promise.resolve({
                status: 200,
                success: true
            }),
        });
        await act(async () => {
            render(
                <Ctx.Provider value={mockContextValue}>
                    <BrowserRouter>
                        <TransactionDataGrid />
                    </BrowserRouter>
                </Ctx.Provider>
            );
        });
    });

});
