import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";

// beforeEach(() => {
// 	jest.spyOn(console, "error").mockImplementation(() => {});
// 	jest.spyOn(console, "warn").mockImplementation(() => {});
// });

describe("HomePage test", () => {
	test("First render", () => {
		render(
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		);
	});
});