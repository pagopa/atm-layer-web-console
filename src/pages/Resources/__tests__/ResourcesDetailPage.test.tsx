import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ResourcesDetailPage from "../ResourcesDetailPage";
import { Ctx } from "../../../DataContext";

beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});

const mockContextValue = {
    loggedUserInfo: {
        userId: 'mario.rossi@pagopa.com',
        name: 'Mario',
        surname: 'Rossi',
        createdAt: '2024-05-27',
        lastUpdatedAt: '2024-05-27',
        profiles: [
            {
                description: "Gestione flussi in lettura",
                profileId: 1,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            },
            {
                description: "Gestione flussi in scrittura",
                profileId: 2,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            },
            {
                description: "Rilascio BPMN",
                profileId: 3,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            },
            {
                description: "Emulator",
                profileId: 4,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            },
            {
                description: "Gestione utenti",
                profileId: 5,
                createdAt: "2024-05-27",
                lastUpdatedAt: "2024-05-27"
            }
        ]
    },
    abortController: new AbortController()
};


describe("ResourcesDetailPage test", () => {

    const resourceDetail = {
        "resourceId": "fc70307e-45eb-4cb1-880e-76c20da0c5be",
        "sha256": "179201042a9c29f39ad0528245cfd230019086e94006081868b0888f660f7a12",
        "enabled": true,
        "noDeployableResourceType": "OTHER",
        "createdAt": "2024-02-28T09:57:56.604+00:00",
        "lastUpdatedAt": "2024-02-28T09:57:56.604+00:00",
        "createdBy": null,
        "lastUpdatedBy": null,
        "cdnUrl": "https://d2xduy7tbgu2d3.cloudfront.net/files/OTHER/form.form",
        "resourceFileId": "f7dc2976-7235-4bbb-b5bc-0547dfadf4ad",
        "resourceType": "OTHER",
        "storageKey": "RESOURCE/files/OTHER/form.form",
        "fileName": "form",
        "extension": "other",
        "resourceFileCreatedAt": "2024-02-28T09:57:56.607+00:00",
        "resourceFileLastUpdatedAt": "2024-02-28T09:57:56.607+00:00",
        "resourceFileCreatedBy": null,
        "resourceFileLastUpdatedBy": null
    }

    test("Test ResourcesDetailPage with sessionStorage", () => {
        sessionStorage.setItem("recordParams", JSON.stringify(resourceDetail))
        render(
            <Ctx.Provider value={ mockContextValue }>
                <BrowserRouter>
                    <ResourcesDetailPage />
                </BrowserRouter>
            </Ctx.Provider>
        );

        expect(screen.getAllByText("Dettaglio risorsa statica")[0]).toBeInTheDocument();
    });

    test("Test ResourcesDetailPage without sessionStorage", () => {
        sessionStorage.removeItem("recordParams")
        render(
            <Ctx.Provider value={ mockContextValue }>
                <BrowserRouter>
                    <ResourcesDetailPage />
                </BrowserRouter>
            </Ctx.Provider>
        );
    });

});