import React from "react";
import { render, screen, getByRole } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "../Header";

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("Header test", () => {
	test("First render", () => {
		render(
			<BrowserRouter>
				<Header />
			</BrowserRouter>
		);
	});
});

