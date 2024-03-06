import { BrowserRouter } from "react-router-dom";
import WorkflowResourceDetailPage from "../WorkflowResourceDetailPage";
import { fireEvent, render, screen } from "@testing-library/react";
import { Ctx } from "../../../DataContext";


beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});


describe("Test WorkflowResourceDetailPage", () => {
    const abortController = new AbortController();
    const wrDetail = {
        "workflowResourceId": "7cee82f9-b94e-4602-8827-5cc61cd01c15",
        "deployedFileName": "Decision 1",
        "definitionKey": "Decision_01tn3hb",
        "status": "DEPLOYED",
        "sha256": "2942de9c3de2711b2e2195de034d8acf7b8cb0c035b6cc897c58b4a44d8c5bb3",
        "definitionVersionCamunda": 2,
        "camundaDefinitionId": "Decision_01tn3hb:2:06e45ce4-d624-11ee-8cf4-263fc9d7ebb7",
        "description": null,
        "resourceId": "84c202ce-1412-4a13-bb37-248b6c13e8fc",
        "resourceS3Type": "DMN",
        "storageKey": "WORKFLOW_RESOURCE/DMN/files/UUID/7cee82f9-b94e-4602-8827-5cc61cd01c15/TEST_121.dmn",
        "fileName": "TEST_121",
        "extension": "dmn",
        "resourceCreatedAt": "2024-02-28T10:24:11.006+00:00",
        "resourceLastUpdatedAt": "2024-02-28T10:27:44.225+00:00",
        "resourceCreatedBy": null,
        "resourceLastUpdatedBy": "2024-02-28T10:27:44.225Z",
        "resource": "b088f124-ee15-42b3-9574-a15fb972b845.dmn",
        "resourceType": "DMN",
        "deploymentId": "06e176b1-d624-11ee-8cf4-263fc9d7ebb7",
        "createdAt": "2024-02-28T10:24:11.004+00:00",
        "lastUpdatedAt": "2024-02-28T10:27:51.809+00:00",
        "createdBy": null,
        "lastUpdatedBy": null
    }

    test("Test WorkflowResourceDetailPage with sessionStorage", () => {
        sessionStorage.setItem("recordParams", JSON.stringify(wrDetail))
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <WorkflowResourceDetailPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        expect(screen.getAllByText("Dettaglio risorsa aggiuntiva per processo")[0]).toBeInTheDocument();
        fireEvent.click(screen.getByText("Cancella"))
    })

    test("Test WorkflowResourceDetailPage without sessionStorage", () => {
        sessionStorage.removeItem("recordParams")
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <WorkflowResourceDetailPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
    })
})