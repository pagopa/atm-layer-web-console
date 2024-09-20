import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import CreateBpmn from "../CreateBpmn";

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
});

describe("CreateBpmn Test", () => {

    const abortController = new AbortController();
    const mockFormData = {
        file: new File(["file contents"], "test.bpmn", {
            type: "application/xml",
        }),
        filename: "test.bpmn",
        functionType: "MENU",
    };

    const renderCreateBpmn = () => {
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <CreateBpmn />
                </BrowserRouter>
            </Ctx.Provider>
        );
    };

    test("should close the snackbar when CloseIcon is clicked", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    bpmnId: "fda9832c-a101-400b-8a04-8fb31c1cb215",
                    modelVersion: 1,
                    deployedFileName: "prova_per_test.bpmn",
                    definitionKey: "Process_1ssgcmw",
                    functionType: "PROVA",
                    status: "CREATED",
                },
            }),
        });

        renderCreateBpmn();

        const fileInput = screen.getByTestId("hidden-input");
        fireEvent.change(fileInput, { target: { files: [mockFormData.file] } }); 

        const fileName = screen.getByTestId("file-name-test");
        fireEvent.change(fileName, { target: { value: "prova" } });

        const functionType = screen.getByTestId("function-type-test");
        fireEvent.change(functionType, { target: { value: "prova" } });

        fireEvent.click(screen.getByText("Conferma"));

        const snackbar = await waitFor(() => screen.getByRole("alert"));
        expect(snackbar).toBeInTheDocument();

        const closeIcon = screen.getAllByTestId("CloseIcon")[1];
        fireEvent.click(closeIcon);

        await waitFor(() => {
            expect(snackbar).not.toBeInTheDocument();
        });
    });

    test("should handle fetch error and close snackbar", async () => {

        global.fetch = jest.fn().mockImplementation(() => {
            throw new Error("errore");
        });

        renderCreateBpmn();

        const fileInput = screen.getByTestId("hidden-input");
        fireEvent.change(fileInput, { target: { files: [mockFormData.file] } }); 

        const fileName = screen.getByTestId("file-name-test");
        fireEvent.change(fileName, { target: { value: "prova" } });

        const functionType = screen.getByTestId("function-type-test");
        fireEvent.change(functionType, { target: { value: "prova" } });

        fireEvent.click(screen.getByText("Conferma"));

        const snackbar = await waitFor(() => screen.getByRole("alert"));
        expect(snackbar).toBeInTheDocument();

        const closeIcon = screen.getAllByTestId("CloseIcon")[1];
        fireEvent.click(closeIcon);

        await waitFor(() => {
            expect(snackbar).not.toBeInTheDocument();
        });
    });

    test("should validate form and display errors when required fields are missing", async () => {
        renderCreateBpmn();

        fireEvent.click(screen.getByText("Conferma"));

        await waitFor(() => {
            expect(screen.getAllByText("Campo obbligatorio")).toHaveLength(2);
        });
    });
});
