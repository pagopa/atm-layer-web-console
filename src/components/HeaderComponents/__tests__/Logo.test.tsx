import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HeaderAccountCustom } from "../HeaderAccountCustom";
import { LogoPagoPACompany } from "@pagopa/mui-italia";


beforeEach(() => {
	jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(console, "warn").mockImplementation(() => {});
});

describe("HeaderAccountCustom test", () => {
	test("First render", () => {
		render(
			<BrowserRouter>
				<HeaderAccountCustom 
				rootLink={{
					element: <LogoPagoPACompany color="default" variant="default" />,
					href: undefined,
					ariaLabel: "",
					title: ""
				}} />
			</BrowserRouter>
		);
	});
});