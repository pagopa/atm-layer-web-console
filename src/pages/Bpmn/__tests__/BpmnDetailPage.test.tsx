import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Ctx } from "../../../DataContext";
import BpmnDetailPage from "../BpmnDetailPage";
import { bpmnTableMocked } from "../../../components/Mock4Test/BpmnMocks";


beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
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
    abortController: new AbortController()
};

  

  describe("BpmnDetailPage", () => {

    test("Test BpmnDetailPage with sessionStorage", () => {
        sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]))
        render(
            <Ctx.Provider value={ mockContextValue }>
                <BrowserRouter>
                    <BpmnDetailPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
        expect(screen.getAllByText("Dettaglio risorsa di processo")[0]).toBeInTheDocument();
        fireEvent.click(screen.getByText("Aggiorna"))
    })

    test("Test BpmnDetailPage without sessionStorage", () => {
        sessionStorage.removeItem("recordParams")
        render(
            <Ctx.Provider value={ mockContextValue }>
                <BrowserRouter>
                    <BpmnDetailPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
    })
  })