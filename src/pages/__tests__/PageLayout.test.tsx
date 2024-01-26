import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import PageLayout from "../Layout/PageLayout";


beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "warn").mockImplementation(() => {});
});

jest.mock("../../DataContext");

describe("PageLayout test", () => {
	test("First render", () => {
		const mockedChildren: React.ReactNode = <div></div>;
		jest.spyOn(React,"useContext").mockReturnValue({loading: true });
		render(
			<BrowserRouter>
				<Route><PageLayout><div></div></PageLayout></Route>
			</BrowserRouter>
		);
		const headerElement = screen.getByTestId("header-id");
		const customAppBarElement = screen.getByTestId("customAppBar-id");
		expect(headerElement).toBeInTheDocument();
		expect(customAppBarElement).toBeInTheDocument();
	});
});
