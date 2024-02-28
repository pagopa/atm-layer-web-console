

import { fireEvent, render, screen } from "@testing-library/react";
import TableColumn from "../TableColumn";
import { GridColumnHeaderParams } from "@mui/x-data-grid";
import { GridStateColDef } from "@mui/x-data-grid/internals";
import { BrowserRouter } from "react-router-dom";
import { themeApp } from "../../../assets/jss/themeApp";
import { Ctx } from "../../../DataContext";
import { ThemeProvider } from "@mui/material/styles";
import { BPMN } from "../../../commons/constants";
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

    test("Test showCustomHeader", () => {

        const { buildColumnDefs, showCustomHeader, visibleColumns } = TableColumn();

        buildColumnDefs(BPMN);
        visibleColumns(BPMN);

        const headerMocked: GridColumnHeaderParams = {
            field: 'functionType',
            colDef: colDefMocked,
        };

        render(
            <Ctx.Provider value={{}}>
                <BrowserRouter>
                    <ThemeProvider theme={themeApp}>
                        {showCustomHeader(headerMocked)}
                    </ThemeProvider>
                </BrowserRouter>
            </Ctx.Provider>
        );

        expect(screen.getByText("Tipo funzione")).toBeInTheDocument();
    });

    test("Test renderCell", () => {

        const { renderCell } = TableColumn();

        const params = { value: bpmnTableMocked.results[0].bpmnId };

        render(
            <Ctx.Provider value={{}}>
                <BrowserRouter>
                    <ThemeProvider theme={themeApp}>
                        {renderCell(params)}
                    </ThemeProvider>
                </BrowserRouter>
            </Ctx.Provider>
        );

        expect(screen.getByText(bpmnTableMocked.results[0].bpmnId)).toBeInTheDocument();
    });

    test("Test actionColumn", () => {

        const { actionColumn } = TableColumn(jest.fn(), jest.fn());

        const params = { ...bpmnTableMocked.results[0] };

        render(
            <Ctx.Provider value={{}}>
                <BrowserRouter>
                    <ThemeProvider theme={themeApp}>
                        {actionColumn(params, BPMN)}
                    </ThemeProvider>
                </BrowserRouter>
            </Ctx.Provider>
        );

        fireEvent.click(screen.getByTestId("action-column-test"));
    });

    test("Test deleteColumn", () => {

        const setOpen = jest.fn();
        const setType = jest.fn();

        const { deleteColumn } = TableColumn(setOpen, setType);

        const param = { ...bpmnTableMocked.results[0] };

        render(
            <Ctx.Provider value={{}}>
                <BrowserRouter>
                    <ThemeProvider theme={themeApp}>
                        {deleteColumn(param)}
                    </ThemeProvider>
                </BrowserRouter>
            </Ctx.Provider>
        );

        fireEvent.click(screen.getByTestId("delete-column-test"));
    });
});