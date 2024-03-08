import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import ModalResources from "../ModalResources";
import { useState } from "react";
import { DELETE_RES, DOWNLOAD_RES } from "../../../../commons/constants";

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

const inputDetail = {
    cdnUrl:"https://d2xduy7tbgu2d3.cloudfront.net/files/OTHER/test.jpg"
}

const failDetail = {}

describe("ModalResources Test", () => {

    const recordParams = {
        resourceId:"47d07cc0-ddc8-41f7-985c-772c5fb0ecfe",
        cdnUrl:"https://d2xduy7tbgu2d3.cloudfront.net/files/OTHER/test.jpg"};
    let setOpen = jest.fn();
    const setOpenSnackBar = jest.fn();
    const setSeverity = jest.fn();
    const setMessage = jest.fn();
    const setTitle = jest.fn();
    const abortController = new AbortController();
    sessionStorage.setItem("recordParams", JSON.stringify(recordParams));
       

   
    const renderModalResources = (modalType : string) => {
        render(
            <Ctx.Provider value={{abortController}}>
                <BrowserRouter>
                    <ModalResources 
                        type = {modalType}
                        open = {true}
                        setOpen={setOpen}
                        setOpenSnackBar={setOpenSnackBar}
                        setSeverity = {setSeverity}
                        setMessage={setMessage}
                        setTitle={setTitle}
                        detail = {inputDetail}
                    />
                </BrowserRouter>
            </Ctx.Provider>
        );
    };
    
    test("Test ModalResources with DELETE", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 204,
                success: true,
                valuesObj: {},
            }),
        });

        renderModalResources(DELETE_RES);

        fireEvent.click(screen.getByText("Conferma"));
    });

    test("Test ModalResources with DOWNLOAD", async () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 204,
                success: true,
                valuesObj: {},
            }),
        });

        renderModalResources(DOWNLOAD_RES);

        fireEvent.click(screen.getByText("Conferma"));
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
        });
 
        expect(setOpenSnackBar).toHaveBeenCalledWith(false);
        expect(setOpen).toHaveBeenCalled();
    });

    test("Test Catch Error during DELETE", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 500,
                success: false,
                valuesObj: {},
            }),
        });
        setOpen = jest.fn(() => {throw new Error()});
        renderModalResources(DELETE_RES);
        fireEvent.click(screen.getByText("Conferma"));
    });



    test("Test Error during DOWNLOAD", () => {
        render(
            <Ctx.Provider value={{abortController}}>
                <BrowserRouter>
                    <ModalResources 
                        type = {DOWNLOAD_RES}
                        open = {true}
                        setOpen={setOpen}
                        setOpenSnackBar={setOpenSnackBar}
                        setSeverity = {setSeverity}
                        setMessage={setMessage}
                        setTitle={setTitle}
                        detail = {failDetail}
                    />
                </BrowserRouter>
            </Ctx.Provider>
        );
        fireEvent.click(screen.getByText("Conferma"));
    });

   

   });