import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../DataContext";
import BankPage from "../BankPage";


describe("BankPage test", () => {
	const clearStorage = jest.fn();
	test("First render", () => {
		render(
			<Ctx.Provider value={{ clearStorage }}>
				<BrowserRouter>
					<BankPage />
				</BrowserRouter>   
			</Ctx.Provider>
		);
		expect(screen.getAllByText("Gestione banche")[0]).toBeInTheDocument();
		expect(clearStorage).toHaveBeenCalled();
	});
});