import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Ctx } from "../../../DataContext";
import BpmnDetailPage from "../BpmnDetailPage";


beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    Storage.prototype.getItem = jest.fn(() => JSON.stringify({
        "bpmnId":"4a381447-4dfb-4fb6-9171-a36130b46c57",
        "modelVersion":182,
        "deployedFileName":null,
        "definitionKey":"onboardingIniziativeIdpay",
        "functionType":"ONBOARDING_INIZIATIVE_IDPAY",
        "status":"DEPLOYED",
        "sha256":"422f02c2ddc03ff55fc6cdc4d622c3a047ce4d1f9b1d3a2146620e5858824763",
        "enabled":true,
        "definitionVersionCamunda":211,
        "camundaDefinitionId":"8c99e850-d648-11ee-8cf4-263fc9d7ebb7",
        "description":null,
        "resourceId":"01dcfe5b-88e7-4009-a114-c9c8424524bc",
        "resourceType":"BPMN",
        "storageKey":"BPMN/files/UUID/4a381447-4dfb-4fb6-9171-a36130b46c57/VERSION/182/onBoarding.bpmn",
        "fileName":"onBoarding",
        "extension":"bpmn",
        "resourceCreatedAt":"2024-02-28T14:49:12.272+00:00",
        "resourceLastUpdatedAt":"2024-02-28T14:49:12.272+00:00",
        "resourceCreatedBy":null,
        "resourceLastUpdatedBy":"2024-02-28T14:49:12.272Z",
        "resource":"82e579d1-ca29-4aca-9a2b-5a7edb5941a9.bpmn",
        "deploymentId":"8c8e016e-d648-11ee-8cf4-263fc9d7ebb7",
        "createdAt":"2024-02-28T14:49:12.269+00:00",
        "lastUpdatedAt":"2024-02-28T14:49:18.042+00:00",
        "createdBy":null,
        "lastUpdatedBy":null}));
  });
  

  describe("BpmnDetailPage", () => {

    const abortController = new AbortController();

    test("render", () => {
        
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <BpmnDetailPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        expect(screen.getAllByText("Dettaglio risorsa di processo")[0]).toBeInTheDocument();
    })
  })