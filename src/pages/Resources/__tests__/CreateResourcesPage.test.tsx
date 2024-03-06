import { render} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CreateResourcesPage from "../CreateResourcesPage";
import { Ctx } from "../../../DataContext";

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
});

describe("CreateResourcesPage test", () => {
    const abortController = new AbortController();
	test("First render", () => {
		render(
            <Ctx.Provider value={{ abortController}}>
			<BrowserRouter>
				<CreateResourcesPage />
			</BrowserRouter>   
            </Ctx.Provider>
		);
	});
});