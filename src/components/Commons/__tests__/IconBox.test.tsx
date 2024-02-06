import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { click } from "@testing-library/user-event/dist/click";
import IconBox from "../IconBox";


beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("ActionIcon test", () => {
	test("First render", () => {
		const {getByTestId} = render(
			<IconBox icon={"icon"} />
		);
		expect(getByTestId("icon-box")).toBeInTheDocument();
	});
});