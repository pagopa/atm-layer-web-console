import { getByRole, render, screen } from "@testing-library/react";
import { Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Logo from "../Logo";


beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("Logo test", () => {
	test("First render", () => {
		render(
			<BrowserRouter>
				<Logo />
			</BrowserRouter>
		);
	});
});