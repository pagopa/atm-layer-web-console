import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import CreateWR from "../CreateWR";

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
});

describe("CreateWR Test", () => {

    const abortController = new AbortController();

    const renderCreateWR = () => {
        render(
            <Ctx.Provider value={{ abortController }}>
                <BrowserRouter>
                    <CreateWR />
                </BrowserRouter>
            </Ctx.Provider>
        );
    };

    test("should successfully submit the form and display snackbar", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    workflowResourceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    deployedFileName: "test.bpmn",
                    status: "CREATED",
                    resourceType: "BPMN",
                },
            }),
        });

        renderCreateWR();

        const fileInput = screen.getByTestId("hidden-input");
        fireEvent.change(fileInput, { target: { files: [new File(["file contents"], "test.bpmn", { type: "application/xml" })] } });

        const fileName = screen.getByTestId("file-name-test");
        fireEvent.change(fileName, { target: { value: "prova" } });

        const resourceType = screen.getByTestId("resource-type-test");
        fireEvent.change(resourceType, { target: { value: "BPMN" } });

        fireEvent.click(screen.getByText("Conferma"));

        const snackbar = await waitFor(() => screen.getByRole("alert"));
        expect(snackbar).toBeInTheDocument();
        expect(snackbar).toHaveTextContent("Success");

        const closeIcons = screen.getAllByTestId("CloseIcon");

        const closeSnackbarIcon = closeIcons[1];
        fireEvent.click(closeSnackbarIcon);

        await waitFor(() => {
            expect(snackbar).not.toBeInTheDocument();
        });
    });

    test("should display validation errors when form is incomplete", () => {
        renderCreateWR();

        fireEvent.click(screen.getByText("Conferma"));

        const errorMessages = screen.getAllByText("Campo obbligatorio");

        expect(errorMessages).toHaveLength(2);

        expect(errorMessages[0]).toBeInTheDocument();
        expect(errorMessages[1]).toBeInTheDocument();
    });

    test("should close the snackbar when CloseIcon is clicked", async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    workflowResourceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    deployedFileName: "test.bpmn",
                    status: "CREATED",
                    resourceType: "BPMN",
                },
            }),
        });

        renderCreateWR();

        const fileInput = screen.getByTestId("hidden-input");
        fireEvent.change(fileInput, { target: { files: [new File(["file contents"], "test.bpmn", { type: "application/xml" })] } });

        const fileName = screen.getByTestId("file-name-test");
        fireEvent.change(fileName, { target: { value: "prova" } });

        const resourceType = screen.getByTestId("resource-type-test");
        fireEvent.change(resourceType, { target: { value: "BPMN" } });

        fireEvent.click(screen.getByText("Conferma"));

        const snackbar = await waitFor(() => screen.getByRole("alert"));
        expect(snackbar).toBeInTheDocument();

        const closeIcons = screen.getAllByTestId("CloseIcon");

        const closeSnackbarIcon = closeIcons[1];
        fireEvent.click(closeSnackbarIcon);

        await waitFor(() => {
            expect(snackbar).not.toBeInTheDocument();
        });
    });
});
