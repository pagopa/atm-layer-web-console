import { fireEvent, render, screen } from "@testing-library/react";
import TableColumn from "../TableColumn";
import { GridColumnHeaderParams } from "@mui/x-data-grid";
import { GridStateColDef } from "@mui/x-data-grid/internals";
import { BrowserRouter } from "react-router-dom";
import { themeApp } from "../../../assets/jss/themeApp";
import { ThemeProvider } from "@mui/material/styles";
import { BANKS, BPMN, DELETE_BANK, UPDATE_BANK, DELETE_ASSOCIATION, DELETE_USER } from "../../../commons/constants";
import { bpmnTableMocked } from "../../Mock4Test/BpmnMocks";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
}));

jest.mock("@mui/material", () => ({
    ...jest.requireActual("@mui/material"),
    useTheme: () => ({
        palette: {
            primary: {
                contrastText: "#fff",
                main: "#1976d2"
            },
            error: {
                main: "#FE6666"
            }
        },
    }),
}));

describe("TableColumn test", () => {

    const colDefMocked: GridStateColDef<any, any, any> = {
        computedWidth: 0,
        field: 'functionType',
        type: 'string',
        headerName: 'Tipo funzione',
    };

    const profileMock = {
        userId: "mario.rossi@pagopa.com",
        name: "Mario",
        surname: "Rossi",
        createdAt: "2024-05-27",
        lastUpdatedAt: "2024-05-27",
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
    };

    beforeEach(() => {
        sessionStorage.setItem("loggedUserInfo", JSON.stringify(profileMock));
    });

    test("Test showCustomHeader", () => {
        const { buildColumnDefs, showCustomHeader, visibleColumns } = TableColumn();

        buildColumnDefs(BPMN);
        visibleColumns(BPMN);

        const headerMocked: GridColumnHeaderParams = {
            field: 'functionType',
            colDef: colDefMocked,
        };

        render(
            <BrowserRouter>
                <ThemeProvider theme={themeApp}>
                    {showCustomHeader(headerMocked)}
                </ThemeProvider>
            </BrowserRouter>
        );

        expect(screen.getByText("Tipo funzione")).toBeInTheDocument();
    });

    test("Test renderCell", () => {
        const { renderCell } = TableColumn();

        const params = { value: bpmnTableMocked.results[0].bpmnId };

        render(
            <BrowserRouter>
                <ThemeProvider theme={themeApp}>
                    {renderCell(params)}
                </ThemeProvider>
            </BrowserRouter>
        );

        expect(screen.getByText(bpmnTableMocked.results[0].bpmnId)).toBeInTheDocument();
    });

    test("Test actionColumn", () => {
        const { actionColumn } = TableColumn(jest.fn(), jest.fn());

        const params = { ...bpmnTableMocked.results[0] };

        render(
            <BrowserRouter>
                <ThemeProvider theme={themeApp}>
                    {actionColumn(params, BPMN)}
                </ThemeProvider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId("action-column-test"));
    });

    test("Test deleteColumn", () => {
        const setOpen = jest.fn();
        const setType = jest.fn();

        const { deleteColumn } = TableColumn(setOpen, setType);

        const param = { ...bpmnTableMocked.results[0] };

        render(
            <BrowserRouter>
                <ThemeProvider theme={themeApp}>
                    {deleteColumn(param)}
                </ThemeProvider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId("delete-column-test"));
    });

    test("Test deleteColumnBank", () => {
        const setOpen = jest.fn();
        const setType = jest.fn();
        const { deleteColumnBank } = TableColumn(setOpen, setType);
        const param = { ...bpmnTableMocked.results[0] };

        render(
            <BrowserRouter>
                <ThemeProvider theme={themeApp}>
                    {deleteColumnBank(param)}
                    </ThemeProvider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId("delete-column-test"));
        expect(setOpen).toHaveBeenCalledWith(true);
        expect(setType).toHaveBeenCalledWith(DELETE_BANK);
    });

    test("Test editColumnBank", () => {
        const setOpen = jest.fn();
        const setType = jest.fn();

        const { editColumnBank } = TableColumn(setOpen, setType);

        const param = { ...bpmnTableMocked.results[0] };

        render(
            <BrowserRouter>
                <ThemeProvider theme={themeApp}>
                    {editColumnBank(param)}
                </ThemeProvider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId("edit-column-test"));

        expect(setOpen).toHaveBeenCalledWith(true);
        expect(setType).toHaveBeenCalledWith(UPDATE_BANK);
    });

    
    test("Test deleteColumnUsers", () => {

        const setOpen = jest.fn();
        const setType = jest.fn();
        const { deleteColumnUsers } = TableColumn(setOpen, setType);
        const param = { ...bpmnTableMocked.results[0] };

        render(
            <BrowserRouter>
                <ThemeProvider theme={themeApp}>
                    {deleteColumnUsers(param)}
                </ThemeProvider>
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId("delete-column-test"));
    });
});
