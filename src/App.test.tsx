import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Ctx } from "./DataContext";
import { bpmnAssociationTableMocked, bpmnTableMocked } from "./components/Mock4Test/BpmnMocks";
import { Profile, User } from "./model/UserModel";

beforeAll(() => {
	jest.spyOn(global.console, "log").mockImplementation(() => {});
});

const mockUser: User = {
	userId: "user1",
	name: "Mario",
	surname: "Rossi",
	createdAt: "2023-01-01",
	lastUpdatedAt: "2023-01-01",
	profiles: [
		{
			description: "profile1",
			profileId: 1,
			createdAt: "2023-01-01",
			lastUpdatedAt: "2023-01-01",
		},
	],
};

const mockProfile: Profile = {
	description: "profile1",
	profileId: 1,
	createdAt: "2023-01-01",
	lastUpdatedAt: "2023-01-01",
};

const mockContextValue = {
	warningCodeValue: "prova",
	setWarningCodeValue: jest.fn(),
	clearAll: jest.fn(),
	setTokenExpired: jest.fn(),
	logged: true,
	setLogged: jest.fn(),
	abortController: new AbortController(),
	debugOn: true,
	clearStorage: jest.fn(),
	loggedUserInfo: mockUser,
	setLoggedUserInfo: jest.fn(),
	profilesAvailable: [mockProfile],
	setProfilesAvailable: jest.fn(),
};

describe("App component", () => {
	afterAll(() => {
		jest.restoreAllMocks();
	});

	beforeEach(() => {
		sessionStorage.clear();
		localStorage.clear();
		jest.clearAllMocks();
	});

	test("Test App without jwt in sessionStorage", () => {
		sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));
		sessionStorage.setItem("recordParamsAssociated", JSON.stringify(bpmnAssociationTableMocked.results[0]));

		render(
			<Ctx.Provider value={mockContextValue}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Ctx.Provider>
		);
	});

	test("Test App with jwt in sessionStorage", () => {
		sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));
		sessionStorage.setItem("recordParamsAssociated", JSON.stringify(bpmnAssociationTableMocked.results[0]));
		sessionStorage.setItem("jwt_console", "prova");
		localStorage.setItem("debugOn", "prova");

		render(
			<Ctx.Provider value={mockContextValue}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Ctx.Provider>
		);
	});

	test("clearStorage function removes recordParamsUser from sessionStorage", () => {
		render(
			<Ctx.Provider value={mockContextValue}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Ctx.Provider>
		);

		mockContextValue.clearStorage();

		expect(sessionStorage.getItem("recordParamsUser")).toBeNull();
	});

	test("clearStorage function removes specified items from sessionStorage", () => {
		
		sessionStorage.setItem("recordParams", "some-value");
		sessionStorage.setItem("recordParamsAssociated", "some-value");
		sessionStorage.setItem("recordParamsUser", "some-value");
		sessionStorage.setItem("recordParamsBank", "some-value");

		render(
			<Ctx.Provider value={mockContextValue}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Ctx.Provider>
		);

		mockContextValue.clearStorage();

		expect(sessionStorage.getItem("recordParams")).toBeNull();
		expect(sessionStorage.getItem("recordParamsAssociated")).toBeNull();
		expect(sessionStorage.getItem("recordParamsUser")).toBeNull();
		expect(sessionStorage.getItem("recordParamsBank")).toBeNull();
	});
});
