import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Ctx } from "./DataContext";
import { bpmnAssociationTableMocked, bpmnTableMocked } from "./components/Mock4Test/BpmnMocks";

test("Test App without jwt in sessionStorage", () => {
	sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));
	sessionStorage.setItem("recordParamsAssociated", JSON.stringify(bpmnAssociationTableMocked.results[0]));

	render(
		// eslint-disable-next-line react/jsx-no-undef
		<Ctx.Provider value={{ 
			warningCodeValue: "prova",
			setWarningCodeValue: jest.fn(),
			clearAll: () => jest.fn(),
			setTokenExpired: () => jest.fn(),
			logged: true, 
			setLogged: jest.fn(),
			abortController: new AbortController(),
			debugOn: "debugOn",
			clearStorage: jest.fn()
		}}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Ctx.Provider>
	);
});

test("Test App with jwt in localStorage", () => {
	sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));
	sessionStorage.setItem("recordParamsAssociated", JSON.stringify(bpmnAssociationTableMocked.results[0]));
	localStorage.setItem("jwt_console", "prova");
	localStorage.setItem("debugOn", "prova");

	render(
		// eslint-disable-next-line react/jsx-no-undef
		<Ctx.Provider value={{ 
			warningCodeValue: "prova",
			setWarningCodeValue: jest.fn(),
			clearAll: () => jest.fn(),
			setTokenExpired: () => jest.fn(),
			logged: true, 
			setLogged: jest.fn(),
			abortController: new AbortController(),
			debugOn: "debugOn",
			clearStorage: jest.fn()
		}}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Ctx.Provider>
	);
});

