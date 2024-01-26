import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ActionIcon from "../ActionIcon";


beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("ActionIcon test", () => {
	test("First render", () => {
		render(
			<BrowserRouter>
				<ActionIcon icon={""} />
			</BrowserRouter>
		);
		const iconButtonElement = screen.getByTestId("iconButton-id");
		fireEvent.click(iconButtonElement);
	});
});