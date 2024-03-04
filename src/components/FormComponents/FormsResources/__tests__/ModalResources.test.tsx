import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import ModalResources from "../ModalResources";
import { useState } from "react";

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

describe("ModalResources Test", () => {

    const recordParams = '{ "resourceId":"47d07cc0-ddc8-41f7-985c-772c5fb0ecfe", "cdnUrl":"https://d2xduy7tbgu2d3.cloudfront.net/files/OTHER/test.bpmn"}';
    const setOpen = jest.fn();
    const setOpenSnackBar = jest.fn();
    const setSeverity = jest.fn();
    const setMessage = jest.fn();
    const setTitle = jest.fn();
    localStorage.setItem("recordParams", JSON.stringify(recordParams));
       
   
    const renderModalResources = (modalType : string) => {


        render(
            <Ctx.Provider value={{}}>
                <BrowserRouter>
                    <ModalResources 
                    type = {modalType}
                    open = {true}
                    setOpen={setOpen}
                    setOpenSnackBar={setOpenSnackBar}
                    setSeverity = {setSeverity}
                    setMessage={setMessage}
                    setTitle={setTitle}
                    detail='"cdnUrl":"https://d2xduy7tbgu2d3.cloudfront.net/files/OTHER/test.bpmn"'
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

        renderModalResources("deleteResources");

        fireEvent.click(screen.getByText("Conferma"));

        screen.debug(undefined, 9999999);
    });

    test("Test ModalResources with DOWNLOAD", () => {

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 204,
                success: true,
                valuesObj: {},
            }),
        });

        renderModalResources("downloadResources");

        fireEvent.click(screen.getByText("Conferma"));
        expect(setOpen).toHaveBeenCalled();
        screen.debug(undefined, 9999999);
    });

});