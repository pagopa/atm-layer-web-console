import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AssociateBpmn from "../AssociateBpmn";
import { bpmnTableMocked } from "../../../Mock4Test/BpmnMocks";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import { handleSnackbar } from "../../../Commons/Commons";

jest.mock("../../../Commons/Commons");

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

describe("AssociateBpmn", () => {

    const abortController = new AbortController();

    const renderAssociateBpmn = () => {
        return render(
            <Ctx.Provider value={abortController}>
                <BrowserRouter>
                    <AssociateBpmn />
                </BrowserRouter>
            </Ctx.Provider>
        );
    }

    test("Test AssociateBpmn with invalid form", async () => {
        renderAssociateBpmn();

        fireEvent.click(screen.getByText("Conferma"));
    });

    test("Test AssociateBpmn With only acquirerId positive case", () => {
        sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 200,
                success: true,
                valuesObj: {
                    bpmnId: "4a381447-4dfb-4fb6-9171-a36130b46c57",
                    bpmnModelVersion: 196,
                    acquirerId: "123456",
                    branchId: "ALL",
                    terminalId: "ALL",
                    functionType: "ONBOARDING_INIZIATIVE_IDPAY",
                    createdAt: "2024-02-29T15:19:52.746+00:00",
                    lastUpdatedAt: "2024-02-29T15:19:52.746+00:00",
                    createdBy: null,
                    lastUpdatedBy: null
                },
            }),
        });

        renderAssociateBpmn();

        const acquirerId = screen.getByTestId("acquirer-id-test") as HTMLInputElement;

        fireEvent.change(acquirerId, { target: { value: "12345" } });
        expect(acquirerId.value).toBe("12345");

        fireEvent.click(screen.getByText("Conferma"));
    })

    test("Test AssociateBpmn With only acquirerId negative case with already an association on another BPMN", async () => {
        sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));

        global.fetch =
            jest.fn().mockResolvedValue({
                json: () => Promise.resolve({
                    status: 400,
                    success: false,
                    valuesObj: {
                        type: "CANNOT_ASSOCIATE",
                        errorCode: "ATMLM_4000047",
                        message: "La banca/filiale/terminale indicata è già associata al processo con ID: 4a381447-4dfb-4fb6-9171-a36130b46c57 , versione: 196",
                        statusCode: 400
                    },
                }),
            }).mockResolvedValueOnce({
                json: () => Promise.resolve({
                    status: 200,
                    success: true,
                    message: "done",
                    valuesObj: {
                        bpmnId: "4a381447-4dfb-4fb6-9171-a36130b46c57",
                        bpmnModelVersion: 196,
                        acquirerId: "123456",
                        branchId: "ALL",
                        terminalId: "ALL",
                        functionType: "ONBOARDING_INIZIATIVE_IDPAY",
                        createdAt: "2024-02-29T15:19:52.746+00:00",
                        lastUpdatedAt: "2024-02-29T15:19:52.746+00:00",
                        createdBy: null,
                        lastUpdatedBy: null
                    },
                }),
            });

        renderAssociateBpmn();

        const acquirerId = screen.getByTestId("acquirer-id-test") as HTMLInputElement;

        fireEvent.change(acquirerId, { target: { value: "12345" } });
        expect(acquirerId.value).toBe("12345");

        fireEvent.click(screen.getByText("Conferma"));

        // TO FIX: resolve this error and test the switch of association with the click on botton "Sostituisci"

        // await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        // await waitFor(() => expect(screen.getByText("Sostituisci")).toBeInTheDocument());
        // fireEvent.click(screen.getByText("Sostituisci"));
    });

    test("Test AssociateBpmn With only acquirerId negative case with already an association on another BPMN catch case", async () => {
        sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 400,
                success: false,
                valuesObj: {
                    type: "CANNOT_ASSOCIATE",
                    errorCode: "ATMLM_4000047",
                    message: "La banca/filiale/terminale indicata è già associata al processo con ID: 4a381447-4dfb-4fb6-9171-a36130b46c57 , versione: 196",
                    statusCode: 400
                },
            }),
        }).mockImplementation(() => {
            throw new Error("errore");
        });

        renderAssociateBpmn();

        const acquirerId = screen.getByTestId("acquirer-id-test") as HTMLInputElement;

        fireEvent.change(acquirerId, { target: { value: "12345" } });
        expect(acquirerId.value).toBe("12345");

        fireEvent.click(screen.getByText("Conferma"));

        // TO FIX: resolve this error and test the switch of association with the click on botton "Sostituisci"

        // await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
        // await waitFor(() => expect(screen.getByText("Sostituisci")).toBeInTheDocument());
        // fireEvent.click(screen.getByText("Sostituisci"));
    });

    test("Test AssociateBpmn on switch of branchId", () => {

        renderAssociateBpmn();

        const acquirerId = screen.getByTestId("acquirer-id-test") as HTMLInputElement;
        const branchId = screen.getByTestId("branch-id-test") as HTMLInputElement;
        const terminalId = screen.getByTestId("terminal-id-test") as HTMLInputElement;
        const switchBranchId = screen.getAllByRole("checkbox");
        const switchTerminalId = screen.getAllByRole("checkbox");

        fireEvent.change(acquirerId, { target: { value: "12345" } });
        expect(acquirerId.value).toBe("12345");

        fireEvent.click(switchBranchId[0]);
        fireEvent.click(switchTerminalId[1]);

        expect(branchId.value).toBe("");
        expect(terminalId.value).toBe("");

        fireEvent.change(branchId, { target: { value: "098" } });
        expect(branchId.value).toBe("098");

        fireEvent.change(terminalId, { target: { value: "56" } });
        expect(terminalId.value).toBe("56");

        fireEvent.click(screen.getByText("Conferma"));
    })

    test("Test AssociateBpmn fetch failed", async () => {
        sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));

        global.fetch = jest.fn().mockImplementation(() => {
            throw new Error("errore");
        });

        renderAssociateBpmn();

        const acquirerId = screen.getByTestId("acquirer-id-test") as HTMLInputElement;

        fireEvent.change(acquirerId, { target: { value: "12345" } });
        expect(acquirerId.value).toBe("12345");

        fireEvent.click(screen.getByText("Conferma"));
    });


    // test("Test AssociateBpmn con errore di rete", async () => {
    //     sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));

    //     global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));

    //     renderAssociateBpmn();

    //     // CHECK_TEST: handleSnackBar is never called
    //     await waitFor(() => expect(handleSnackbar).toHaveBeenCalled());

    //     expect(handleSnackbar).toHaveBeenCalledWith(false, expect.any(Function), expect.any(Function), expect.any(Function), expect.any(Function));

    // });


    test("Test handleSwitchAssociationFetch indirectly by simulating button click", async () => {
        sessionStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: () => Promise.resolve({
                status: 400,
                success: false,
                valuesObj: {
                    type: "CANNOT_ASSOCIATE",
                    errorCode: "ATMLM_4000047",
                    message: "La banca/filiale/terminale indicata è già associata al processo con ID: 4a381447-4dfb-4fb6-9171-a36130b46c57 , versione: 196",
                    statusCode: 400
                },
            }),
        });

        renderAssociateBpmn();

        fireEvent.click(screen.getByText("Conferma"));

        const actionAlert = await screen.findByTestId("action-alert");
        expect(actionAlert).toBeInTheDocument();
    });
});