import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import PageLayout from "../PageLayout";
import { Ctx } from "../../../DataContext";
import { themeApp } from "../../../assets/jss/themeApp";
import { ThemeProvider } from "@mui/material";


beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => { });
	jest.spyOn(console, "warn").mockImplementation(() => { });
});

describe("PageLayout test", () => {

	test("Test render PageLayout component with loading false", () => {
		render(
			<Ctx.Provider value={{ loading: false }}>
				<BrowserRouter>
					<ThemeProvider theme={themeApp}>
						<PageLayout children={<React.Fragment />} />
					</ThemeProvider>
				</BrowserRouter>
			</Ctx.Provider>
		);
	});

	test("Test render PageLayout component with loading true", () => {
		render(
			<Ctx.Provider value={{ loading: true }}>
				<BrowserRouter>
					<ThemeProvider theme={themeApp}>
						<PageLayout children={<React.Fragment />} />
					</ThemeProvider>
				</BrowserRouter>
			</Ctx.Provider>
		);
	});
});
