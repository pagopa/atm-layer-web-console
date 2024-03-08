import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import BpmnPage from "../BpmnPage";

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
});

describe("BpmnPage test", () => {
    const clearStorage = jest.fn();
	test("First render", () => {
		render(
            <Ctx.Provider value={{ clearStorage }}>
			<BrowserRouter>
				<BpmnPage />
			</BrowserRouter>   
            </Ctx.Provider>
		);
        expect(screen.getAllByText("Risorse di processo")[0]).toBeInTheDocument();
	});
});