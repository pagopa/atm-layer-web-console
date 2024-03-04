import { fireEvent, render, screen } from "@testing-library/react";
import { bpmnTableMocked } from "../../../Mock4Test/BpmnMocks";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import UpgradeBpmn from "../UpgradeBpmn";

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

describe("UpgradeBpmn", () => {

    const abortController = new AbortController();
    const mockFormData = {
        uuid: "fda9832c-a101-400b-8a04-8fb31c1cb215",
        file: new File(["file contents"], "test.bpmn", {
            type: "application/xml",
        }),
        filename: "test.bpmn",
        functionType: "MENU",
    };


    const renderUpgradeBpmn = () => {
        return render(
            <Ctx.Provider value={abortController}>
                <BrowserRouter>
                    <UpgradeBpmn />
                </BrowserRouter>
            </Ctx.Provider>
        );
    }

    test("Test UpgradeBpmn", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    bpmnId: "fda9832c-a101-400b-8a04-8fb31c1cb215",
                    modelVersion: 2,
                    deployedFileName: "prova_per_test.bpmn",
                    definitionKey: "Process_1ssgcmw",
                    functionType: "TEST",
                    status: "CREATED",
                    sha256: "b092268bd072423d78c30f8c160568b5f6d178fadf623104b35bf3baba76eb15",
                    enabled: true,
                    definitionVersionCamunda: null,
                    camundaDefinitionId: null,
                    description: null,
                    resourceFile: {
                        id: "346311f6-e0fa-40ff-aa8e-6ba506687401",
                        resourceType: "BPMN",
                        storageKey: "BPMN/files/UUID/fda9832c-a101-400b-8a04-8fb31c1cb215/VERSION/1/prova_per_test.bpmn",
                        fileName: "prova_per_test",
                        extension: "bpmn",
                        createdAt: "2024-03-01T12:07:46.687+00:00",
                        lastUpdatedAt: "2024-03-01T12:07:46.687+00:00",
                        createdBy: null,
                        lastUpdatedBy: null
                    },
                    resource: null,
                    deploymentId: null,
                    createdAt: "2024-03-01T12:07:46.684+00:00",
                    lastUpdatedAt: "2024-03-01T12:07:46.684+00:00",
                    createdBy: null,
                    lastUpdatedBy: null
                },
            }),
        });

        renderUpgradeBpmn();

        const fileInput = screen.getByTestId("hidden-input");
        fireEvent.change(fileInput, { target: { files: [mockFormData.file] } }); 

        const fileName = screen.getByTestId("file-name-test");
        fireEvent.change(fileName, { target: { value: "prova" } });

        const functionType = screen.getByTestId("function-type-test");
        fireEvent.change(functionType, { target: { value: "prova" } });

        fireEvent.click(screen.getByText("Conferma"));

        fireEvent.click(screen.getByTestId("CloseIcon"));

        screen.debug(undefined, 9999999);
    });

    test("Test UpgradeBpmn fetch failed", async () => {
        
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 400,
                success: false,
                valuesObj: {
                    type: "NOT_UPGRADABLE",
                    errorCode: "ATMLM_4000011",
                    message: "Definition keys differ, BPMN upgrade refused",
                    statusCode: 400
                },
            }),
        });

        renderUpgradeBpmn();

    });
});