import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import { useState } from "react";
import ModalBpmn from "../ModalBpmn";
import { DELETE_ASSOCIATION, DELETE_BPMN, DEPLOY_BPMN, DOWNLOAD_BPMN } from "../../../../commons/constants";

const originalFetch = global.fetch;
const abortController = new AbortController();

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

describe("ModalBpmn Test", () => {

    const recordParams = {
        bpmnId: "47d07cc0-ddc8-41f7-985c-772c5fb0ecfe",
        modelVersion: "1",
        fileName: "testFile"
    };
    const recordParamsAssociated = {
        acquirerId: "acquirer",
        branchId: "branch",
        terminalId: "terminal"
    };
    const setOpen = jest.fn();
    const setOpenSnackBar = jest.fn();
    const setSeverity = jest.fn();
    const setMessage = jest.fn();
    const setTitle = jest.fn();
    localStorage.setItem("recordParams", JSON.stringify(recordParams));
    localStorage.setItem("recordParamsAssociated", JSON.stringify(recordParamsAssociated));


    const renderModalBpmn = (modalType: string) => {


        render(
            <Ctx.Provider value={{abortController}}>
                <BrowserRouter>
                    <ModalBpmn
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

    test("Test ModalBpmn with DELETE", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 204,
                success: true,
                valuesObj: {},
            }),
        });

        renderModalBpmn(DELETE_BPMN);
        fireEvent.click(screen.getByText("Conferma"));
    });


    test("Test ModalBpmn with DEPLOY", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    bpmnId: "39294363-5907-436f-a575-3dc6e03ce422",
                    modelVersion: 1,
                    deployedFileName: null,
                    definitionKey: "Process_03d7avu",
                    functionType: "PROVA",
                    status: "DEPLOYED",
                    sha256: "f886c52975d3e7c608385fbd03c53b35ed17b7bf0ddae26beab9c52a8ec6a67f",
                    enabled: true,
                    definitionVersionCamunda: 2,
                    camundaDefinitionId: "Process_03d7avu:2:12c76bdb-da28-11ee-ab0a-7a311865b58c",
                    description: null,
                    resourceFile: {
                        id: "09018741-c116-407f-88b9-298434f31d07",
                        resourceType: "BPMN",
                        storageKey: "BPMN/files/UUID/39294363-5907-436f-a575-3dc6e03ce422/VERSION/1/prova.bpmn",
                        fileName: "prova",
                        extension: "bpmn",
                        createdAt: "2024-03-04T11:48:59.158+00:00",
                        lastUpdatedAt: "2024-03-04T11:48:59.158+00:00",
                        createdBy: null,
                        lastUpdatedBy: null
                    },
                    resource: "c2563f4b-97e4-4a71-b3eb-703ecc25cc14.bpmn",
                    deploymentId: "12c1ed99-da28-11ee-ab0a-7a311865b58c",
                    createdAt: "2024-03-04T11:48:59.155+00:00",
                    lastUpdatedAt: "2024-03-04T13:06:54.405+00:00",
                    createdBy: null,
                    lastUpdatedBy: null
                },
            }),
        });

        renderModalBpmn(DEPLOY_BPMN);
        fireEvent.click(screen.getByText("Conferma"));
    });


    test("Test ModalBpmn with DELETE ASSOCIATION", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 204,
                success: true,
                valuesObj: {},
            }),
        });

        renderModalBpmn(DELETE_ASSOCIATION);
        fireEvent.click(screen.getByText("Conferma"));
    });


    test("Test ModalBpmn with DOWNLOAD", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    fileContent: "ewogICJjb21wb25lbnRzIjogWwogICAgewogICAgICAibGFiZWwiOiAiTnVtYmVyIiwKICAgICAgInR5cGUiOiAibnVtYmVyIiwKICAgICAgImxheW91dCI6IHsKICAgICAgICAicm93IjogIlJvd18xcmh4NXl2IiwKICAgICAgICAiY29sdW1ucyI6IG51bGwKICAgICAgfSwKICAgICAgImlkIjogIkZpZWxkXzEwYXpuNm0iLAogICAgICAia2V5IjogImZpZWxkXzBsd2VrcTYiCiAgICB9CiAgXSwKICAidHlwZSI6ICJkZWZhdWx0IiwKICAiaWQiOiAiRm9ybTFqYW4iLAogICJleHBvcnRlciI6IHsKICAgICJuYW1lIjogIkNhbXVuZGEgTW9kZWxlciIsCiAgICAidmVyc2lvbiI6ICI1LjE1LjIiCiAgfSwKICAiZXhlY3V0aW9uUGxhdGZvcm0iOiAiQ2FtdW5kYSBQbGF0Zm9ybSIsCiAgImV4ZWN1dGlvblBsYXRmb3JtVmVyc2lvbiI6ICI3LjE5LjAiLAogICJzY2hlbWFWZXJzaW9uIjogMTAKfQ=="
                },
            }),
        });

        renderModalBpmn(DOWNLOAD_BPMN);
        fireEvent.click(screen.getByText("Conferma"));
    });


    test("Test Error during DELETE", () => {
        global.fetch = jest.fn().mockImplementation(() => {
            throw new Error("An error occured");
        });
        renderModalBpmn(DELETE_BPMN);
        fireEvent.click(screen.getByText("Conferma"));
    });

    test("Test Error during DEPLOY", () => {
        global.fetch = jest.fn().mockImplementation(() => {
            throw new Error("An error occured");
        });
        renderModalBpmn(DEPLOY_BPMN);
        fireEvent.click(screen.getByText("Conferma"));
    });

    test("Test Error during DELETE ASSOCIATION", () => {
        global.fetch = jest.fn().mockImplementation(() => {
            throw new Error("An error occured");
        });
        renderModalBpmn(DELETE_ASSOCIATION);
        fireEvent.click(screen.getByText("Conferma"));
    });

    test("Test Error during DOWNLOAD", () => {
        global.fetch = jest.fn().mockImplementation(() => {
            throw new Error("An error occured");
        });
        renderModalBpmn(DOWNLOAD_BPMN);
        fireEvent.click(screen.getByText("Conferma"));
    });   

});