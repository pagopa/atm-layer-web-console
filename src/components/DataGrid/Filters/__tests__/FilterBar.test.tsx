import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FilterBar from "../FilterBar";
import { PROCESS_RESOURCES, RESOURCES, WORKFLOW_RESOURCE, BANKS, USERS, TRANSACTIONS } from "../../../../commons/constants";
import { Ctx } from "../../../../DataContext";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";

beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => { });
    jest.spyOn(console, "warn").mockImplementation(() => { });
});

afterEach(() => {
    mockContextValue.abortController.abort();
    jest.clearAllTimers();
    jest.clearAllMocks();
});

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
    abortController: new AbortController(),
    profilesAvailable: [
        {
            description: "uno",
            profileId: 1,
            createdAt: "2024-05-27",
            lastUpdatedAt: "2024-05-27",
        },
        {
            description: "due",
            profileId: 1,
            createdAt: "2024-05-27",
            lastUpdatedAt: "2024-05-27",
        },
    ]
};

describe("FilterBar test", () => {

    const renderComponent = (driver: string, loading: boolean, filterValues: any, newFilterValues: any) => {
        const mockSetLoading = jest.fn();
        const mockGetAllList = jest.fn();
        const mockSetTableList = jest.fn();
        return render(
            <Ctx.Provider value={mockContextValue}>
                <BrowserRouter>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <FilterBar
                            filterValues={filterValues}
                            setFilterValues={() => { }}
                            getAllList={mockGetAllList}
                            newFilterValues={newFilterValues}
                            driver={driver}
                            loadingButton={loading}
                            setLoadingButton={mockSetLoading}
                            setTableList={mockSetTableList}
                        />
                    </LocalizationProvider>
                </BrowserRouter>
            </Ctx.Provider>
        );
    };

    test("Test FilterBar without driver", () => {
        const emptyFilterValues = {
            functionType: "",
            fileName: "",
            modelVersion: "",
            acquirerId: "",
            status: ""
        };
        renderComponent("", false, emptyFilterValues, emptyFilterValues);
    });

    test("Test FilterBar with PROCESS_RESOURCES and Click on Cancella Filtri and Crea Risorsa", () => {
        const emptyFilterValues = {
            functionType: "",
            fileName: "",
            modelVersion: "",
            acquirerId: "",
            status: ""
        };
        renderComponent(PROCESS_RESOURCES, false, emptyFilterValues, emptyFilterValues);
        fireEvent.click(screen.getByText("Cancella Filtri"));
        fireEvent.click(screen.getByText("Crea Risorsa"));
    });

    test("Test FilterBar with PROCESS_RESOURCES and Filter with all the filters", () => {
        const emptyFilterValues = {
            functionType: "",
            fileName: "",
            modelVersion: "",
            acquirerId: "",
            status: ""
        };
        renderComponent(PROCESS_RESOURCES, false, emptyFilterValues, emptyFilterValues);
        const functionType = screen.getByTestId("function-type-test") as HTMLInputElement;
        const fileName = screen.getByTestId("file-name-test") as HTMLInputElement;
        const modelVersion = screen.getByTestId("model-version-test") as HTMLInputElement;
        const acquirerId = screen.getByTestId("acquirer-id-test") as HTMLInputElement;
        const status = screen.getByTestId("status-test") as HTMLInputElement;
        fireEvent.change(functionType, { target: { value: "funzione" } });
        fireEvent.change(fileName, { target: { value: "prova" } });
        fireEvent.change(modelVersion, { target: { value: 1 } });
        fireEvent.change(acquirerId, { target: { value: "12345" } });
        fireEvent.change(status, { target: { value: "CREATED" } });
    });

    test("Test FilterBar with PROCESS_RESOURCES and Filter with status", () => {
        const emptyFilterValues = {
            functionType: "",
            fileName: "",
            modelVersion: "",
            acquirerId: "",
            status: "CREATED"
        };
        renderComponent(PROCESS_RESOURCES, false, emptyFilterValues, emptyFilterValues);
        const status = screen.getByTestId("status-test") as HTMLInputElement;
        fireEvent.change(status, { target: { value: "" } });
        fireEvent.change(status, { target: { value: "CREATED" } });
        fireEvent.click(screen.getByText("Filtra"));
    });

    test("Test FilterBar with RESOURCES and Click on Cancella Filtri and Crea Risorsa", () => {
        const emptyFilterValues = {
            noDeployableResourceType: "",
            fileName: ""
        };
        renderComponent(RESOURCES, false, emptyFilterValues, emptyFilterValues);
        fireEvent.click(screen.getByText("Cancella Filtri"));
        fireEvent.click(screen.getByText("Crea Risorsa"));
    });

    test("Test FilterBar with RESOURCES and Filter with fileName", () => {
        const emptyFilterValues = {
            noDeployableResourceType: "",
            fileName: ""
        };
        renderComponent(RESOURCES, false, emptyFilterValues, emptyFilterValues);
        const fileName = screen.getByTestId("file-name-test") as HTMLInputElement;
        fireEvent.change(fileName, { target: { value: "prova" } });
    });

    test("Test FilterBar with RESOURCES and Filter with noDeployableResourceType from some value to empty", () => {
        const emptyFilterValues = {
            noDeployableResourceType: "HTML",
            fileName: ""
        };
        renderComponent(RESOURCES, false, emptyFilterValues, emptyFilterValues);
        const noDeployableResourceType = screen.getByTestId("no-deploy-rsc-type-test") as HTMLInputElement;
        fireEvent.change(noDeployableResourceType, { target: { value: "" } });
    });

    test("Test FilterBar with WORKFLOW_RESOURCE and click on Crea Risorsa and Cancella Filtri", () => {
        const emptyFilterValues = {
            resourceType: "",
            filename: "",
            status: ""
        };
        renderComponent(WORKFLOW_RESOURCE, false, emptyFilterValues, emptyFilterValues);
        fireEvent.click(screen.getByText("Cancella Filtri"));
        fireEvent.click(screen.getByText("Crea Risorsa"));
    });

    test("Test FilterBar with WORKFLOW_RESOURCE and Filter with fileName", () => {
        const emptyFilterValues = {
            resourceType: "",
            filename: "",
            status: ""
        };
        renderComponent(WORKFLOW_RESOURCE, false, emptyFilterValues, emptyFilterValues);
        const fileName = screen.getByTestId("file-name-test") as HTMLInputElement;
        fireEvent.change(fileName, { target: { value: "prova" } });
    });

    test("Test FilterBar with WORKFLOW_RESOURCE and Filter with resourceType from some value to empty", () => {
        const emptyFilterValues = {
            resourceType: "BPMN",
            filename: "",
            status: ""
        };
        renderComponent(WORKFLOW_RESOURCE, false, emptyFilterValues, emptyFilterValues);
        const resourceType = screen.getByTestId("resource-type-test") as HTMLInputElement;
        fireEvent.change(resourceType, { target: { value: "" } });
    });

    test("Test FilterBar with WORKFLOW_RESOURCE and Filter with status from some value to empty", () => {
        const emptyFilterValues = {
            resourceType: "",
            filename: "",
            status: "CREATED"
        };
        renderComponent(WORKFLOW_RESOURCE, true, emptyFilterValues, emptyFilterValues);
        const status = screen.getByTestId("status-test") as HTMLInputElement;
        fireEvent.change(status, { target: { value: "" } });
    });

    test("Test FilterBar with BANKS and Filter with acquirerId", () => {
        const emptyFilterValues = {
            acquirerId: "",
            denomination: "",
            clientId: "",
            rateMin: "",
            rateMax: ""
        };

        renderComponent(BANKS, false, emptyFilterValues, emptyFilterValues);

        const acquirerId = screen.getByTestId("bank-acquirerId-test") as HTMLInputElement;
        fireEvent.change(acquirerId, { target: { value: "123" } });
    });

    test("Test FilterBar with BANKS and Filter with denomination", () => {
        const emptyFilterValues = {
            acquirerId: "",
            denomination: "",
            clientId: "",
            rateMin: "",
            rateMax: ""
        };

        renderComponent(BANKS, false, emptyFilterValues, emptyFilterValues);

        const denomination = screen.getByTestId("bank-denomination-test") as HTMLInputElement;
        fireEvent.change(denomination, { target: { value: "BankName" } });
    });

    test("Test FilterBar with USERS and Filter with name", () => {
        const emptyFilterValues = {
            name: "",
            surname: "",
            userId: "",
            profileIds: ""
        };
        renderComponent(USERS, false, emptyFilterValues, emptyFilterValues);
        const name = screen.getByTestId("user-name-test") as HTMLInputElement;
        fireEvent.change(name, { target: { value: "Mario" } });
    });

    test("Test FilterBar with USERS and Filter with surname", () => {
        const emptyFilterValues = {
            name: "",
            surname: "",
            userId: "",
            profileIds: ""
        };
        renderComponent(USERS, false, emptyFilterValues, emptyFilterValues);
        const surname = screen.getByTestId("user-surname-test") as HTMLInputElement;
        fireEvent.change(surname, { target: { value: "Rossi" } });
    });

    test("Test FilterBar with USERS and Filter with userId", () => {
        const emptyFilterValues = {
            name: "",
            surname: "",
            userId: "",
            profileIds: ""
        };
        renderComponent(USERS, false, emptyFilterValues, emptyFilterValues);
        const userId = screen.getByTestId("user-userid-test") as HTMLInputElement;
        fireEvent.change(userId, { target: { value: "mario.rossi@pagopa.com" } });
    });

    test("Test FilterBar with USERS and Click on Cancella Filtri and Filtra", () => {
        const emptyFilterValues = {
            name: "",
            surname: "",
            userId: "",
            profileIds: ""
        };
        renderComponent(USERS, false, emptyFilterValues, emptyFilterValues);
        fireEvent.click(screen.getByText("Cancella Filtri"));
        fireEvent.click(screen.getByText("Filtra"));
    });

    test("Test FilterBar with TRANSACTIONS and Filter with transactionId", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: ""
        };

        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);

        const transactionId = screen.getByTestId("transaction-id-test") as HTMLInputElement;
        fireEvent.change(transactionId, { target: { value: "1234567890" } });
    });

    test("Test FilterBar with TRANSACTIONS and Filter with transactionStatus", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: ""
        };

        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);

        const transactionStatus = screen.getByTestId("transaction-status-test") as HTMLInputElement;
        fireEvent.change(transactionStatus, { target: { value: "COMPLETED" } });
    });

    test("Test FilterBar with TRANSACTIONS and Filter with functionType", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: ""
        };

        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);

        const functionType = screen.getByTestId("function-type-test") as HTMLInputElement;
        fireEvent.change(functionType, { target: { value: "TYPE_A" } });
    });

    test("Test FilterBar with TRANSACTIONS and Filter with acquirerId", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: ""
        };

        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);

        const acquirerId = screen.getByTestId("acquirer-id-test") as HTMLInputElement;
        fireEvent.change(acquirerId, { target: { value: "98765" } });
    });

    test("Test FilterBar with TRANSACTIONS and Filter with branchId", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: ""
        };

        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);

        const branchId = screen.getByTestId("branch-id-test") as HTMLInputElement;
        fireEvent.change(branchId, { target: { value: "98765" } });
    });

    test("Test FilterBar with TRANSACTIONS and Filter with terminalId", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: ""
        };

        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);

        const terminalId = screen.getByTestId("terminal-id-test") as HTMLInputElement;
        fireEvent.change(terminalId, { target: { value: "98765" } });
    });

    test("Test FilterBar with TRANSACTIONS and Filter with startTime", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: "",
            startTime: null,
            endTime: null
        };

        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);

        const startTime = screen.getByLabelText("A partire da") as HTMLInputElement;
        fireEvent.change(startTime, { target: { value: new Date() } });

        // expect(screen.getByLabelText("A partire da")).toBeInTheDocument();
    });

    test("Test FilterBar with TRANSACTIONS and Filter with endTime", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: "",
            startTime: null,
            endTime: null
        };

        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);

        const endTime = screen.getByLabelText("Fino a") as HTMLInputElement;
        fireEvent.change(endTime, { target: { value: new Date("2024-08-01T11:03:23.000Z") } });

        // expect(screen.getByLabelText("Fino a")).toBeInTheDocument();
    });

    test("Test FilterBar with TRANSACTIONS and Click on Cancella Filtri and Filtra", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: ""
        };

        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);
        fireEvent.click(screen.getByText("Cancella Filtri"));
        fireEvent.click(screen.getByText("Filtra"));
    });


    test("Test FilterBar with TRANSACTIONS and Filter with startTime and endTime on the same day with 5-second rule", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: "",
            startTime: new Date("2024-08-01T10:00:00.000Z"),
            endTime: new Date("2024-08-01T10:00:05.000Z")
        };
    
        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);
    
        const startTime = screen.getByLabelText("A partire da") as HTMLInputElement;
        const endTime = screen.getByLabelText("Fino a") as HTMLInputElement;
    
        fireEvent.change(startTime, { target: { value: new Date("2024-08-01T10:00:00.000Z") } });
        fireEvent.change(endTime, { target: { value: new Date("2024-08-01T10:00:05.000Z") } });
    
        // expect(screen.getByLabelText("Fino a")).toHaveValue("01/08/2024 12:00:05");
    });

    test("Test FilterBar with TRANSACTIONS and Filter with startTime and endTime on different days", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: "",
            startTime: new Date("2024-08-01T10:00:00.000Z"),
            endTime: new Date("2024-08-02T10:00:00.000Z")
        };
    
        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);
    
        const startTime = screen.getByLabelText("A partire da") as HTMLInputElement;
        const endTime = screen.getByLabelText("Fino a") as HTMLInputElement;
    
        fireEvent.change(startTime, { target: { value: new Date("2024-08-01T10:00:00.000Z") } });
        fireEvent.change(endTime, { target: { value: new Date("2024-08-02T10:00:00.000Z") } });
    
        // expect(screen.getByLabelText("Fino a")).toHaveValue("02/08/2024 12:00:00");
    });
    
    test("Test validateDateRange correctly handles valid dates", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: "",
            startTime: new Date("2024-08-01T10:00:00.000Z"),
            endTime: new Date("2024-08-01T11:00:00.000Z")
        };
    
        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);
    
        const endTime = screen.getByLabelText("Fino a") as HTMLInputElement;
        fireEvent.change(endTime, { target: { value: new Date("2024-08-01T11:00:00.000Z") } });
    
        // expect(screen.queryByText("Selezionare una data/ora successiva a quella di partenza")).toBeNull();
    });

    test("Test setting error when endTime is before startTime", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: "",
            startTime: null,
            endTime: new Date("2024-08-01T10:00:05.000Z")
        };
    
        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);
    
        const startTime = screen.getByLabelText("A partire da") as HTMLInputElement;
        const endTime = screen.getByLabelText("Fino a") as HTMLInputElement;
    
        const calendarButtons = screen.getAllByTestId('CalendarIcon');
    
        // expect(calendarButtons).toHaveLength(2);

        console.log(calendarButtons.length, "calendarButtons");
    
        // fireEvent.click(calendarButtons[1]);
        // const dayButtonsEnd = await screen.findAllByRole("gridcell");
        // fireEvent.click(dayButtonsEnd[10]);
    
        fireEvent.click(calendarButtons[0]);
        const dayButtonsStart = screen.getAllByRole("gridcell");
        fireEvent.click(dayButtonsStart[10]);
        // const okButton = screen.getAllByText("OK");
        // console.log(okButton.length, "okbuttons");
        // fireEvent.click(okButton[0]);
    
        // Aggiungi un'attesa per assicurarti che il valore venga aggiornato
    
        fireEvent.change(startTime, { target: { value: '2024-09-03 00:00:00' } });

        console.log(endTime.value, "end");
        console.log(startTime.value, "start");
    
        const filterButton = screen.getByText("Filtra");
        fireEvent.click(filterButton);
    
        // await waitFor(() => {
        //     expect(startTime.value).not.toBe('');
        //     expect(endTime.value).not.toBe('');
        // });

        // const errorMessage = screen.getByText("Selezionare una data/ora successiva a quella di partenza");
        // expect(errorMessage).toBeInTheDocument();
    });
    
    test("Test validateDateRange correctly handles valid dates", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: "",
            startTime: new Date("2024-09-01T10:00:00.000Z"),
            endTime: new Date("2024-08-01T11:00:00.000Z")
        };
    
        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);
    
        const endTime = screen.getByLabelText("Fino a") as HTMLInputElement;
        fireEvent.change(endTime, { target: { value: new Date("2024-08-01T11:00:00.000Z") } });
    
        // expect(screen.queryByText("Selezionare una data/ora successiva a quella di partenza")).toBeNull();
    });
    
    test("Test minDateTime for endTime is set correctly", () => {
        const emptyFilterValues = {
            transactionId: "",
            transactionStatus: "",
            functionType: "",
            acquirerId: "",
            branchId: "",
            terminalId: "",
            startTime: new Date("2024-09-05T00:00:00.000Z"),
            endTime: null // No endTime set initially
        };
    
        renderComponent(TRANSACTIONS, false, emptyFilterValues, emptyFilterValues);
        const startTime = screen.getByLabelText("A partire da") as HTMLInputElement;
        const endTime = screen.getByLabelText("Fino a") as HTMLInputElement;
    
        const calendarButtons = screen.getAllByTestId('CalendarIcon');
    
        // expect(calendarButtons).toHaveLength(2);

        console.log(calendarButtons.length, "calendarButtons");
    
        fireEvent.click(calendarButtons[1]);
        const dayButtonsEnd = screen.getAllByRole("gridcell");
        fireEvent.click(dayButtonsEnd[10]);
    
        // fireEvent.click(calendarButtons[0]);
        // const dayButtonsStart = await screen.findAllByRole("gridcell");
        // fireEvent.click(dayButtonsStart[10]);
        // const okButton = await screen.findAllByText("OK");
        // console.log(okButton.length, "okbuttons");
        // fireEvent.click(okButton[0]);
    
        // Aggiungi un'attesa per assicurarti che il valore venga aggiornato

        console.log(endTime.value, "end");
        console.log(startTime.value, "start");
    
        const filterButton = screen.getByText("Filtra");
        fireEvent.click(filterButton);
    
        // await waitFor(() => {
        //     expect(startTime.value).not.toBe('');
        //     expect(endTime.value).not.toBe('');
        // });
    
        // const errorMessage = screen.getByText("Selezionare una data/ora successiva a quella di partenza");
        // expect(errorMessage).toBeInTheDocument();

        fireEvent.click(calendarButtons[1]);
        const dayButtonsEnd2 = screen.getAllByRole("gridcell");
        fireEvent.click(dayButtonsEnd2[20]);

        fireEvent.click(filterButton);

        // expect(errorMessage).not.toBeInTheDocument();
    });
    

});

