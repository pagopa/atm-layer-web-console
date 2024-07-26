import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import ResourcesPage from "../ResourcesPage";

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
});

const clearStorage = jest.fn();

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
	clearStorage
};

describe("ResourcesPage test", () => {
    
	test("First render", () => {
		render(
            <Ctx.Provider value={ mockContextValue }>
			<BrowserRouter>
				<ResourcesPage />
			</BrowserRouter>   
            </Ctx.Provider>
		);
        expect(screen.getAllByText("Risorse statiche")[0]).toBeInTheDocument();
	});
});