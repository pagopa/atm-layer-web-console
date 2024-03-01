import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import AssociateBpmn from "../AssociateBpmn";
import { bpmnTableMocked } from "../../../Mock4Test/BpmnMocks";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";

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

    test("Test AssociateBpmn With only acquirerId positive case", () => {
        localStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));

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



        const acquirerId = screen.getByTestId("acquirer-id-test") as HTMLInputElement;

        fireEvent.change(acquirerId, { target: { value: "12345" } });
        expect(acquirerId.value).toBe("12345");

        fireEvent.click(screen.getByText("Conferma"));
    })

    test("Test AssociateBpmn With only acquirerId negative case with already an association on another BPMN", () => {
        localStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));

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

        renderAssociateBpmn()

        const acquirerId = screen.getByTestId("acquirer-id-test") as HTMLInputElement;

        fireEvent.change(acquirerId, { target: { value: "12345" } });
        expect(acquirerId.value).toBe("12345");

        fireEvent.click(screen.getByText("Conferma"));
    });

    test("Test AssociateBpmn on switch of branchId", () => {
        localStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));

        renderAssociateBpmn()

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
        localStorage.setItem("recordParams", JSON.stringify(bpmnTableMocked.results[0]));

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

        renderAssociateBpmn()

    });
});