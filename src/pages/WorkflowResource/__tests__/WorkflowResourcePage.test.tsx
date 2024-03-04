import { render, screen, waitFor } from "@testing-library/react";
import { Ctx } from "../../../DataContext";
import { BrowserRouter } from "react-router-dom";
import WorkflowResourcePage from "../WorkflowResourcePage";

describe("WorkflowResourcePage", () => {

    

    test("render", async () => {
        const clearStorage = jest.fn();
        render(
            <Ctx.Provider value={{ clearStorage }}>
                <BrowserRouter>
                    <WorkflowResourcePage />
                </BrowserRouter>
            </Ctx.Provider>
        );

        expect(clearStorage).toBeCalled();
    })
  })