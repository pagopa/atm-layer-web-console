import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HeaderAccountCustom } from "../HeaderAccountCustom";
import { LogoPagoPACompany } from "@pagopa/mui-italia";
import { Ctx } from "../../../DataContext";


beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => { });
	jest.spyOn(console, "warn").mockImplementation(() => { });
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
    abortController: new AbortController(),
	userEmail: "prova@test.it"
};

describe("HeaderAccountCustom test", () => {
	test("First render", () => {
		render(
			<Ctx.Provider value={ mockContextValue }>
				<BrowserRouter>
					<HeaderAccountCustom
						rootLink={{
							element: <LogoPagoPACompany color="default" variant="default" />,
							href: undefined,
							ariaLabel: "",
							title: ""
						}} />
				</BrowserRouter>
			</Ctx.Provider>
		);
	});
});