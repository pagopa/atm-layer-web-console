import { render, screen } from "@testing-library/react";
import { Ctx } from "../../../DataContext";
import { BrowserRouter } from "react-router-dom";
import UpgradeBpmnPage from "../UpgradeBpmnPage";

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });

    Storage.prototype.getItem = jest.fn(() => JSON.stringify({"bpmnId":"4a381447-4dfb-4fb6-9171-a36130b46c57","modelVersion":187,"deployedFileName":null,"definitionKey":"onboardingIniziativeIdpay","functionType":"ONBOARDING_INIZIATIVE_IDPAY","status":"DEPLOYED","sha256":"dab59cafe72fec85c6bf614fa63811712013971a31d42e5b715456457e56d66b","enabled":true,"definitionVersionCamunda":216,"camundaDefinitionId":"73804c94-d65b-11ee-8cf4-263fc9d7ebb7","description":null,"resourceId":"8951caed-789a-4777-8ece-e4d4aba25cd3","resourceType":"BPMN","storageKey":"BPMN/files/UUID/4a381447-4dfb-4fb6-9171-a36130b46c57/VERSION/187/onBoarding.bpmn","fileName":"onBoarding","extension":"bpmn","resourceCreatedAt":"2024-02-28T17:04:28.980+00:00","resourceLastUpdatedAt":"2024-02-28T17:04:28.980+00:00","resourceCreatedBy":null,"resourceLastUpdatedBy":"2024-02-28T17:04:28.980Z","resource":"cc33c256-a34f-40c8-91e6-0b926eeb2cd0.bpmn","deploymentId":"7376fdc2-d65b-11ee-8cf4-263fc9d7ebb7","createdAt":"2024-02-28T17:04:28.978+00:00","lastUpdatedAt":"2024-02-28T17:04:36.372+00:00","createdBy":null,"lastUpdatedBy":null}));
  });

describe("UpgradeBpmnPage", () => {
    const abortController = new AbortController();
    test("First render", () => {    
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <UpgradeBpmnPage />
                </BrowserRouter>
              </Ctx.Provider> 
        );
        expect(screen.getAllByText("Aggiornamento risorsa di processo")[0]).toBeInTheDocument();
    })

    test("Render with localStorage item 'recordParams' being null", () => {
      Storage.prototype.getItem = jest.fn(() => null);
      try {
          render(
              <Ctx.Provider value={{ abortController }}>
                  <BrowserRouter>
                      <UpgradeBpmnPage />
                  </BrowserRouter>
              </Ctx.Provider>
          );
      } catch (error) {
          expect(error).toBeInstanceOf(SyntaxError);
      }
  });
 });
