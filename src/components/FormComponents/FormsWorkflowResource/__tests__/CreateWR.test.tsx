import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import CreateWR from "../CreateWR";

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

describe("CreateWR Test", () => {

    const abortController = new AbortController();
    const mockFormData = {
        file: new File(["file contents"], "test.bpmn", {
            type: "application/xml",
        }),
        filename: "test.bpmn",
        resourceType: "BPMN",
    };

    const renderCreateWR = () => {
        render(
            <Ctx.Provider value={{}}>
                <BrowserRouter>
                    <CreateWR />
                </BrowserRouter>
            </Ctx.Provider>
        );
    };

    test("Test CreateWR", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    workflowResourceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    deployedFileName: "test.bpmn",
                    definitionKey: "test_key",
                    status: "CREATED",
                    sha256: "b092268bd072423d78c30f8c160568b5f6d178fadf623104b35bf3baba76eb15",
                    enabled: true,
                    definitionVersionCamunda: null,
                    camundaDefinitionId: null,
                    description: null,
                    resourceFile: {
                      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                      resourceType: "BPMN",
                      storageKey: "WORKFLOW_RESOURCE/files/storageKey",
                      fileName: "testFileName",
                      extension: ".bpmn",
                      createdAt: "2023-11-03T14:18:36.635+00:00",
                      lastUpdatedAt: "2023-11-03T14:18:36.635+00:00",
                      createdBy: null,
                      lastUpdatedBy: null
                    },
                    resource: null,
                    resourceType: "BPMN",
                    deploymentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    createdAt: "2023-11-03T14:18:36.635+00:00",
                    lastUpdatedAt: "2023-11-03T14:18:36.635+00:00",
                    createdBy: null,
                    lastUpdatedBy: null
                  },
            }),
        });

        renderCreateWR();

        const fileInput = screen.getByTestId("hidden-input");
        fireEvent.change(fileInput, { target: { files: [mockFormData.file] } }); 

        const fileName = screen.getByTestId("file-name-test");
        fireEvent.change(fileName, { target: { value: "prova" } });

        const resourceType = screen.getByTestId("resource-type-test");
        fireEvent.change(resourceType, { target: { value: "BPMN" } });

        fireEvent.click(screen.getByText("Conferma"));

        fireEvent.click(screen.getByTestId("CloseIcon"));

        screen.debug(undefined, 9999999);
    });
});