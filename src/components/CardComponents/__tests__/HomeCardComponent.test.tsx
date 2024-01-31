import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomeCardComponent from "../HomeCardComponent";

beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("HomeCardComponent test", () => {
	test("First render", () => {
		render(
			<BrowserRouter>
				<HomeCardComponent title={""} description={""} icon={""} pageLink={""} />
			</BrowserRouter>
		);
		const buttonElement = screen.getByTestId("section-id");
		fireEvent.click(buttonElement);
	});
});
