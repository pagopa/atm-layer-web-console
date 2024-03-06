import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import CreateResources from "../CreateResources";

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

    const renderCreateResources = () => {
        render(
            <Ctx.Provider value={{abortController}}>
                <BrowserRouter>
                    <CreateResources />
                </BrowserRouter>
            </Ctx.Provider>
        );
    };

    test("Test CreateResources", () => {

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

        const description = screen.getByTestId("description-test");
        fireEvent.change(description, { target: { value: "prova" } });

        fireEvent.click(screen.getByText("Conferma"));

        fireEvent.click(screen.getByTestId("CloseIcon"));

    });

});