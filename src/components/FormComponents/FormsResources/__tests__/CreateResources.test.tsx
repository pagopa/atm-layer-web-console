import { fireEvent, getByRole, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import CreateResources from "../CreateResources";
import userEvent from '@testing-library/user-event';
import exp from "constants";

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

describe("CreateResources Test", () => {

    const abortController = new AbortController();
    const mockFormData = {
        file: new File(["file contents"], "test.html", {
            type: "text/html",
        }),
        filename: "test.html",
        resourceType: "HTML",
        path: "",
		description:""
    };
    const mockFiles = [
        new File(["file contents"], "test1.html", { type: "text/html", }),
        new File(["file contents"], "test2.html", { type: "text/html", }),
        new File(["file contents"], "test3.html", { type: "text/html", }),
        new File(["file contents"], "test 4.html", { type: "text/html", }),
    ];

    const renderCreateResources = () => {
        render(
            <Ctx.Provider value={{abortController}}>
                <BrowserRouter>
                    <CreateResources />
                </BrowserRouter>
            </Ctx.Provider>
        );
    };

    test("Test CreateResources Single Upload", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    resourceId: "47d07cc0-ddc8-41f7-985c-772c5fb0ecfe",
                    sha256: "0e8929c9532c1664e9b8d624ab00c33ce4a60d95d65b038a12c9acb68d82d802",
                    enabled: true,
                    noDeployableResourceType: "HTML",
                    createdAt: "2024-03-01T15:16:25.546+00:00",
                    lastUpdatedAt: "2024-03-01T15:16:25.546+00:00",
                    createdBy: null,
                    lastUpdatedBy: null,
                    cdnUrl: "https://d2xduy7tbgu2d3.cloudfront.net/files/HTML/test_24.html",
                    resourceFile: {
                        id: "552f45a6-fe49-4a8a-a7e2-b63e1ff5196a",
                        resourceType: "HTML",
                        storageKey: "RESOURCE/files/HTML/test_24.html",
                        fileName: "test_24",
                        extension: "html",
                        createdAt: "2024-03-01T15:16:25.551+00:00",
                        lastUpdatedAt: "2024-03-01T15:16:25.551+00:00",
                        createdBy: null,
                        lastUpdatedBy: null
                    },
                    "description": null
                },
            }),
        });

        renderCreateResources();

        const fileInput = screen.getByTestId("hidden-input");
        fireEvent.change(fileInput, { target: { files: [mockFormData.file] } }); 

        const fileName = screen.getByTestId("file-name-test");
        fireEvent.change(fileName, { target: { value: "prova.html" } });

        const resourceType = screen.getByTestId("resource-type-test");
        fireEvent.change(resourceType, { target: { value: "HTML" } });

        const path = screen.getByTestId("path-test");
        fireEvent.change(path, { target: { value: "prova" } });

        fireEvent.click(screen.getByText("Conferma"));

        fireEvent.click(screen.getByTestId("CloseIcon"));

    });

    test("Test CreateResources Multi Upload: switch to multiupload form", async () => {

        renderCreateResources();

        const fileName = screen.getByTestId("file-name-test");
        expect(fileName).toBeInTheDocument();
        screen.getByRole('checkbox').click();
        await waitFor(() => {
            expect(fileName).not.toBeInTheDocument()
          });
    });


    test("Test CreateResources Multi Upload: upload and delete files", async () => {
        renderCreateResources();
        screen.getByRole('checkbox').click();
        
        const confirmButton = screen.getByText("Conferma");
        fireEvent.click(confirmButton);
        expect(screen.getByText("Campo obbligatorio")).toBeInTheDocument();

        const resourceType = screen.getByTestId("resource-type-test");
        fireEvent.change(resourceType, { target: { value: "HTML" } });

        const fileInput = screen.getByTestId("hidden-input");
        userEvent.upload(fileInput, [mockFiles[0], mockFiles[1], mockFiles[2]]);
        await waitFor(() => {
            expect(screen.getByText("test1.html")).toBeInTheDocument();
            expect(screen.getByText("test2.html")).toBeInTheDocument();
            expect(screen.getByText("test3.html")).toBeInTheDocument();
          });

        const singleDeleteButtons = screen.getAllByTestId("clear-single-upload-button");
        fireEvent.click(singleDeleteButtons[0]);
        expect(screen.queryByText("test1.html")).toBeNull();

        fireEvent.click(screen.getByTestId("clear-all-upload-button"));
        expect(screen.queryByText("test2.html")).toBeNull();
        expect(screen.queryByText("test3.html")).toBeNull();
    });

    test("Test CreateResources Multi Upload: upload files 200 OK", async () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
            }),
        });

        renderCreateResources();
        screen.getByRole('checkbox').click();

        const resourceType = screen.getByTestId("resource-type-test");
        fireEvent.change(resourceType, { target: { value: "HTML" } });

        const fileInput = screen.getByTestId("hidden-input");

        userEvent.upload(fileInput, [mockFiles[0]]);
        await waitFor(() => {
            expect(screen.getByText("test1.html")).toBeInTheDocument();
        });
        fireEvent.click(screen.getByText("Conferma"));
    });


    test("Test CReateResources Multi Upload: validate filenames on submit", async() => {
        renderCreateResources();
        screen.getByRole('checkbox').click();

        userEvent.upload(screen.getByTestId("hidden-input"), [mockFiles[3]]);
        fireEvent.click(screen.getByText("Conferma"));
        expect(screen.queryByText("Il nome del file deve essere nel formato nome.estensione; gli unici caratteri speciali ammessi sono _ e -")).toBeVisible();

    })


    // test("Test CreateResources Multi Upload: duplicate files are not uploaded", async () => {

    //     global.fetch = jest.fn().mockResolvedValueOnce({
    //         json: () => Promise.resolve({
    //             status: 200,
    //             success: true,
    //         }),
    //     });

    //     renderCreateResources();
    //     screen.getByRole('checkbox').click();
    //     const confirmButton = screen.getByText("Conferma");

    //     const resourceType = screen.getByTestId("resource-type-test");
    //     fireEvent.change(resourceType, { target: { value: "HTML" } });

    //     const fileInput = screen.getByTestId("hidden-input");
    //     userEvent.upload(fileInput, [mockFiles[0], mockFiles[1], mockFiles[2]]);
    //     await waitFor(() => {
    //         expect(screen.getByText("test1.html")).toBeInTheDocument();
    //         expect(screen.getByText("test2.html")).toBeInTheDocument();
    //         expect(screen.getByText("test3.html")).toBeInTheDocument();
    //       });

    //     const alert = screen.queryByTestId("action-alert");
    //     expect(alert).toBeNull();
    //     userEvent.upload(fileInput, [mockFiles[0]]);
    //     await waitFor(() => {
    //         expect(screen.getByTestId("action-alert")).toBeInTheDocument();
    //     });
    // });

});