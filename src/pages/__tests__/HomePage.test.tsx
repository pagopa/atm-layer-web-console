import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("HomePage test", () => {
	test("First render", () => {
		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);
		const titleElement=screen.getByText("Console management");
		expect(titleElement).toBeInTheDocument();
		const subTitleElement=screen.getByText("Console per la gestione delle risorse");
		expect(subTitleElement).toBeInTheDocument();
	});
});