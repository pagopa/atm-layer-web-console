import { fireEvent, render, screen } from "@testing-library/react";
import { bpmnTableMocked } from "../../../Mock4Test/BpmnMocks";
import { BrowserRouter } from "react-router-dom";
import { Ctx } from "../../../../DataContext";
import FormTemplate from "../FormTemplate";
import AssociateBpmn from "../../FormsBpmn/AssociateBpmn";
import formOption from "../../../../hook/formOption";
import { ASSOCIATE_BPMN } from "../../../../commons/constants";

const originalFetch = global.fetch;

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterEach(() => {
    global.fetch = originalFetch;
})

describe("Test FormTemplate", () => {

    const abortController = new AbortController();
    const { getFormOptions } = formOption();

    test("Test FormTemplate with children AssociateBpmn", () => {
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

        const handleSwitchAssociationFetch = jest.fn()

        render(
            <Ctx.Provider value={abortController}>
                <BrowserRouter>
                    <FormTemplate
                        handleSubmit={jest.fn()}
                        children={<AssociateBpmn />}
                        getFormOptions={getFormOptions(ASSOCIATE_BPMN)}
                        openSnackBar={true}
                        severity={"error"}
                        message={"La banca/filiale/terminale indicata è già associata al processo con ID: 4a381447-4dfb-4fb6-9171-a36130b46c57 , versione: 196"}
                        errorCode={"ATMLM_4000047"}
                        handleSwitchAssociationFetch={handleSwitchAssociationFetch}
                        loading={false}
                    />
                </BrowserRouter>
            </Ctx.Provider>
        );

        fireEvent.click(screen.getByText("Sostituisci"));

       expect(handleSwitchAssociationFetch).toHaveBeenCalledTimes(1);
    })
});