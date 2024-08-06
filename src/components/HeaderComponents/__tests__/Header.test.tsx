import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "../Header";
import { Ctx } from "../../../DataContext";

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "warn").mockImplementation(() => {});
});

const onLogoutMocked = jest.fn();

const mockContextValueNotLogged = {
    loggedUserInfo: {
        userId: '',
        name: '',
        surname: '',
        profiles: [],
    },
    abortController: new AbortController(),
	logged: false,
	clearAll: jest.fn(),
	userEmail: ""
};

const mockContextValueLogged = {
    loggedUserInfo: {
        userId: 'mario.rossi@pagopa.com',
        name: 'Mario',
        surname: 'Rossi',
        profiles: [
            {
                description: "Gestione flussi in lettura",
                profileId: 1,
            },
            {
                description: "Gestione flussi in scrittura",
                profileId: 2,
            },
            {
                description: "Rilascio BPMN",
                profileId: 3,
            },
            {
                description: "Emulator",
                profileId: 4,
            },
            {
                description: "Gestione utenti",
                profileId: 5,
            }
        ]
    },
    abortController: new AbortController(),
	logged: true,
	clearAll: onLogoutMocked,
	userEmail: "utente@prova.it"
};

describe("Header test", () => {
	test("renders Header component with logged out state", () => {
		render(
			<Ctx.Provider value={mockContextValueNotLogged}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Ctx.Provider>
		);

		expect(screen.queryByText("Esci")).not.toBeInTheDocument();
	});

	test("renders Header component with logged in state and handles logout", () => {
		render(
			<Ctx.Provider value={mockContextValueLogged}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Ctx.Provider>
		);

		expect(screen.getByText("Mario Rossi")).toBeInTheDocument();

		const exitButton = screen.getByTestId("exit-button-test");
		fireEvent.click(exitButton);

		expect(onLogoutMocked).toHaveBeenCalledTimes(1);
	});
});
