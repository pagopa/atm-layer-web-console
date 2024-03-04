import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import FilterBar from "../FilterBar";
import { PROCESS_RESOURCES, RESOURCES, WORKFLOW_RESOURCE } from "../../../../commons/constants";

beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => { });
    jest.spyOn(console, "warn").mockImplementation(() => { });
});

describe("FilterBar test", () => {

    const renderComponent = (driver: string, loading: boolean, filterValues: any, newFilterValues: any) => {
        const mockSetLoading = jest.fn();
        const mockGetAllList = jest.fn();
        const mocksetTableList = jest.fn();
        return render(
            <BrowserRouter>
                <FilterBar
                    filterValues={filterValues}
                    setFilterValues={() => { }}
                    getAllList={mockGetAllList}
                    newFilterValues={newFilterValues}
                    driver={driver}
                    loadingButton={loading}
                    setLoadingButton={mockSetLoading}
                    setTableList={mocksetTableList}
                >
                
                </FilterBar>
            </BrowserRouter>
        );
    };

    test("Test FilterBar without driver", () => {

        const emptyFilterValues = {
            functionType: "",
            fileName: "",
            modelVersion: "",
            acquirerId: "",
            status: ""
        }

        renderComponent("", false, emptyFilterValues, emptyFilterValues);
    });

    test("Test FilterBar with PROCESS_RESOURCES and Click on Cancella Filtri and Crea Risorsa ", () => {

        const emptyFilterValues = {
            functionType: "",
            fileName: "",
            modelVersion: "",
            acquirerId: "",
            status: ""
        }

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
        }

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
        }

        renderComponent(PROCESS_RESOURCES, false, emptyFilterValues, emptyFilterValues);

        const status = screen.getByTestId("status-test") as HTMLInputElement;
        fireEvent.change(status, { target: { value: "" } });

        fireEvent.change(status, { target: { value: "CREATED" } });

        fireEvent.click(screen.getByText("Filtra"));
    });

    test("Test FilterBar with RESOURCES and Click on Cancella Filtri and Crea Risorsa ", () => {

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

        const fileName = screen.getByTestId("no-deploy-rsc-type-test") as HTMLInputElement;
        fireEvent.change(fileName, { target: { value: "" } });
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

    test("Test FilterBar with WORKFLOW_RESOURCE and Filter with noDeployableResourceType from some value to empty", () => {

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

        renderComponent(WORKFLOW_RESOURCE, false, emptyFilterValues, emptyFilterValues);

        const status = screen.getByTestId("status-test") as HTMLInputElement;
        fireEvent.change(status, { target: { value: "" } });
    });
});