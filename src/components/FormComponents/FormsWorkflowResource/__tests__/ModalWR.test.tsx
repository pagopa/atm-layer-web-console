import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import { useState } from "react";
import ModalWR from "../ModalWR";
import { BPMN, DELETE_WR, DEPLOY_WR, DMN, DOWNLOAD_WR, FORM, PROCESS_RESOURCES, ROLLBACK_WR } from "../../../../commons/constants";

const originalFetch = global.fetch;
let recordParams = {
    workflowResourceId: "47d07cc0-ddc8-41f7-985c-772c5fb0ecfe",
    cdnUrl: "https://d2xduy7tbgu2d3.cloudfront.net/files/OTHER/test.dmn",
    resourceType: DMN,
    filename: "test"
};

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
    sessionStorage.setItem("recordParams", JSON.stringify(recordParams));
});

afterEach(() => {
    global.fetch = originalFetch;
})

describe("ModalResources Test", () => {

    let setOpen = jest.fn();
    const setOpenSnackBar = jest.fn();
    const setSeverity = jest.fn();
    const setMessage = jest.fn();
    const setTitle = jest.fn();
    const abortController = new AbortController();
    
    const renderModalWR = (modalType: string) => {


        render(
            <Ctx.Provider value={{abortController}}>
                <BrowserRouter>
                    <ModalWR
                        type={modalType}
                        open={true}
                        setOpen={setOpen}
                        setOpenSnackBar={setOpenSnackBar}
                        setSeverity={setSeverity}
                        setMessage={setMessage}
                        setTitle={setTitle}
                    />
                </BrowserRouter>
            </Ctx.Provider>
        );
    };

    test("Test ModalWR with ROLLBACK", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    workflowResourceId: "ad5c2186-dd0a-4bc9-b109-9cf34c8648ad",
                    deployedFileName: "Decision 1",
                    definitionKey: "Decision_11veif5",
                    status: "DEPLOYED",
                    sha256: "bebc0af3de2f2441add7872035795d93d4d43f331801afcda81178ce4b05987e",
                    enabled: true,
                    definitionVersionCamunda: 2,
                    camundaDefinitionId: "Decision_11veif5:2:1e750d34-d4c4-11ee-8cf4-263fc9d7ebb7",
                    description: null,
                    resourceFile: {
                        id: "286fe578-55e8-4b1d-9b69-89efbd15f410",
                        resourceType: "DMN",
                        storageKey: "WORKFLOW_RESOURCE/DMN/files/UUID/ad5c2186-dd0a-4bc9-b109-9cf34c8648ad/TEST_FETCH.dmn",
                        fileName: "TEST_FETCH",
                        extension: "dmn",
                        createdAt: "2024-02-26T16:26:40.880+00:00",
                        lastUpdatedAt: "2024-03-04T09:38:55.587+00:00",
                        createdBy: null,
                        lastUpdatedBy: null
                    },
                    resource: "2ae8e44c-de5b-4e55-805b-531132176f46.dmn",
                    resourceType: "DMN",
                    deploymentId: "1e7163b1-d4c4-11ee-8cf4-263fc9d7ebb7",
                    createdAt: "2024-02-26T16:26:40.878+00:00",
                    lastUpdatedAt: "2024-03-04T09:38:55.593+00:00",
                    createdBy: null,
                    lastUpdatedBy: null
                },
            }),
        });

        renderModalWR(ROLLBACK_WR);
        fireEvent.click(screen.getByText("Conferma"));
    });

    test("Test Catch Error during ROLLBACK", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {},
            }),
        });
        setOpen = jest.fn(() => {throw new Error()});
        renderModalWR(ROLLBACK_WR);
        fireEvent.click(screen.getByText("Conferma"));
    });


    test("Test ModalWR with DEPLOY", async () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    workflowResourceId: "c6fa8251-3ce8-41c7-88dd-d42f023eebef",
                    deployedFileName: null,
                    definitionKey: "Form1jan",
                    status: "DEPLOYED",
                    sha256: "c9593e78dc0f653fc311d70bab0d3904d154c2472df36f6cb7a4c92aaeec8c7f",
                    enabled: true,
                    definitionVersionCamunda: null,
                    camundaDefinitionId: null,
                    description: null,
                    resourceFile: {
                        id: "408e7490-1121-47ef-91c5-694bd47b2294",
                        resourceType: "FORM",
                        storageKey: "WORKFLOW_RESOURCE/FORM/files/UUID/c6fa8251-3ce8-41c7-88dd-d42f023eebef/test_form_1.json",
                        fileName: "test_form_1",
                        extension: "json",
                        createdAt: "2024-02-01T10:33:43.247+00:00",
                        lastUpdatedAt: "2024-02-01T10:33:43.247+00:00",
                        createdBy: null,
                        lastUpdatedBy: null
                    },
                    resource: null,
                    resourceType: "FORM",
                    deploymentId: "2d8174bf-da0e-11ee-ab0a-7a311865b58c",
                    createdAt: "2024-02-01T10:33:43.245+00:00",
                    lastUpdatedAt: "2024-03-04T10:01:32.387+00:00",
                    createdBy: null,
                    lastUpdatedBy: null
                },
            }),
        });

        renderModalWR(DEPLOY_WR);
        fireEvent.click(screen.getByText("Conferma"));
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });
 
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);

    });


    test("Test Catch Error during DEPLOY", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {},
            }),
        });
        setOpen = jest.fn(() => {throw new Error()});
        renderModalWR(DEPLOY_WR);
        fireEvent.click(screen.getByText("Conferma"));
    });


    test("Test ModalWR with DELETE", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 204,
                success: true,
                valuesObj: {},
            }),
        });
        renderModalWR(DELETE_WR);
        fireEvent.click(screen.getByText("Conferma"));
    });


    test("Test Catch Error during DELETE", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 204,
                success: true,
                valuesObj: {},
            }),
        });
        setOpen = jest.fn(() => {throw new Error()});
        renderModalWR(DELETE_WR);
        fireEvent.click(screen.getByText("Conferma"));
    });


    test("Test ModalWR with DOWNLOAD DMN", async () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    fileContent: "ewogICJjb21wb25lbnRzIjogWwogICAgewogICAgICAibGFiZWwiOiAiTnVtYmVyIiwKICAgICAgInR5cGUiOiAibnVtYmVyIiwKICAgICAgImxheW91dCI6IHsKICAgICAgICAicm93IjogIlJvd18xcmh4NXl2IiwKICAgICAgICAiY29sdW1ucyI6IG51bGwKICAgICAgfSwKICAgICAgImlkIjogIkZpZWxkXzEwYXpuNm0iLAogICAgICAia2V5IjogImZpZWxkXzBsd2VrcTYiCiAgICB9CiAgXSwKICAidHlwZSI6ICJkZWZhdWx0IiwKICAiaWQiOiAiRm9ybTFqYW4iLAogICJleHBvcnRlciI6IHsKICAgICJuYW1lIjogIkNhbXVuZGEgTW9kZWxlciIsCiAgICAidmVyc2lvbiI6ICI1LjE1LjIiCiAgfSwKICAiZXhlY3V0aW9uUGxhdGZvcm0iOiAiQ2FtdW5kYSBQbGF0Zm9ybSIsCiAgImV4ZWN1dGlvblBsYXRmb3JtVmVyc2lvbiI6ICI3LjE5LjAiLAogICJzY2hlbWFWZXJzaW9uIjogMTAKfQ=="
                },
            }),
        });

        renderModalWR(DOWNLOAD_WR);
        fireEvent.click(screen.getByText("Conferma"));
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });
 
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);

    });

    test("Test ModalWR with DOWNLOAD BPMN", async () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    fileContent: "ewogICJjb21wb25lbnRzIjogWwogICAgewogICAgICAibGFiZWwiOiAiTnVtYmVyIiwKICAgICAgInR5cGUiOiAibnVtYmVyIiwKICAgICAgImxheW91dCI6IHsKICAgICAgICAicm93IjogIlJvd18xcmh4NXl2IiwKICAgICAgICAiY29sdW1ucyI6IG51bGwKICAgICAgfSwKICAgICAgImlkIjogIkZpZWxkXzEwYXpuNm0iLAogICAgICAia2V5IjogImZpZWxkXzBsd2VrcTYiCiAgICB9CiAgXSwKICAidHlwZSI6ICJkZWZhdWx0IiwKICAiaWQiOiAiRm9ybTFqYW4iLAogICJleHBvcnRlciI6IHsKICAgICJuYW1lIjogIkNhbXVuZGEgTW9kZWxlciIsCiAgICAidmVyc2lvbiI6ICI1LjE1LjIiCiAgfSwKICAiZXhlY3V0aW9uUGxhdGZvcm0iOiAiQ2FtdW5kYSBQbGF0Zm9ybSIsCiAgImV4ZWN1dGlvblBsYXRmb3JtVmVyc2lvbiI6ICI3LjE5LjAiLAogICJzY2hlbWFWZXJzaW9uIjogMTAKfQ=="
                },
            }),
        });

        recordParams.resourceType=BPMN;
        sessionStorage.setItem("recordParams", JSON.stringify(recordParams));
        renderModalWR(DOWNLOAD_WR);
        fireEvent.click(screen.getByText("Conferma"));
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });
 
        expect(setOpenSnackBar).toHaveBeenCalledWith(true);

    });

    test("Test ModalWR with DOWNLOAD FORM", async () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    fileContent: "ewogICJjb21wb25lbnRzIjogWwogICAgewogICAgICAibGFiZWwiOiAiTnVtYmVyIiwKICAgICAgInR5cGUiOiAibnVtYmVyIiwKICAgICAgImxheW91dCI6IHsKICAgICAgICAicm93IjogIlJvd18xcmh4NXl2IiwKICAgICAgICAiY29sdW1ucyI6IG51bGwKICAgICAgfSwKICAgICAgImlkIjogIkZpZWxkXzEwYXpuNm0iLAogICAgICAia2V5IjogImZpZWxkXzBsd2VrcTYiCiAgICB9CiAgXSwKICAidHlwZSI6ICJkZWZhdWx0IiwKICAiaWQiOiAiRm9ybTFqYW4iLAogICJleHBvcnRlciI6IHsKICAgICJuYW1lIjogIkNhbXVuZGEgTW9kZWxlciIsCiAgICAidmVyc2lvbiI6ICI1LjE1LjIiCiAgfSwKICAiZXhlY3V0aW9uUGxhdGZvcm0iOiAiQ2FtdW5kYSBQbGF0Zm9ybSIsCiAgImV4ZWN1dGlvblBsYXRmb3JtVmVyc2lvbiI6ICI3LjE5LjAiLAogICJzY2hlbWFWZXJzaW9uIjogMTAKfQ=="
                },
            }),
        });
        recordParams.resourceType=FORM;
        sessionStorage.setItem("recordParams", JSON.stringify(recordParams));
        renderModalWR(DOWNLOAD_WR);
        fireEvent.click(screen.getByText("Conferma"));
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });

        expect(setOpenSnackBar).toHaveBeenCalledWith(true);

    });


    test("Test Catch Error during DOWNLOAD", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {},
            }),
        });

        setOpen = jest.fn(() => {throw new Error()});
        renderModalWR(DOWNLOAD_WR);
        fireEvent.click(screen.getByText("Conferma"));
    });

});