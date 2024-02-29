import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import ResourcesPage from "../ResourcesPage";

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
});

describe("ResourcesPage test", () => {
    const clearStorage = jest.fn();
	test("First render", () => {
		render(
            <Ctx.Provider value={{ clearStorage }}>
			<BrowserRouter>
				<ResourcesPage />
			</BrowserRouter>   
            </Ctx.Provider>
		);
        expect(screen.getAllByText("Risorse statiche")[0]).toBeInTheDocument();
	});
});