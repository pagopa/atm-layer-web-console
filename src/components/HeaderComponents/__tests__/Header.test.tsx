import React, { useContext } from "react";
import { render, screen, getByRole } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "../Header";
import { Ctx } from "../../../DataContext";

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("Header test", () => {
	test("Test render Header component with login false", () => {
		render(
			<Ctx.Provider value={{ logged: false }}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Ctx.Provider>
		);
	});

	test("Test render Header component with login true", () => {
		render(
			<Ctx.Provider value={{ logged: true }}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Ctx.Provider>
		);
	});
});

