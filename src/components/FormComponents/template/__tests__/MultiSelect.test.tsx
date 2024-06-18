import { render, screen, fireEvent } from "@testing-library/react";
import MultiSelect from "../../MultiSelect";
import { Ctx } from "../../../../DataContext";
import { Profile } from "../../../../model/UserModel";
import * as commons from "../../../Commons/Commons";

const mockProfilesAvailable: Array<Profile> = [
    {
        profileId: 1, description: "Admin",
        createdAt: "",
        lastUpdatedAt: ""
    },
    {
        profileId: 2, description: "User",
        createdAt: "",
        lastUpdatedAt: ""
    },
];

const mockContextValue = {
    profilesAvailable: mockProfilesAvailable,
};

const mockHandleChange = jest.fn();

const mockErrors = {
    profileIds: "",
};

const mockValue = ["Admin"];
const mockNames = ["Admin", "User"];

describe("MultiSelect component", () => {
    let addDependentProfilesSpy: jest.SpyInstance;

    beforeAll(() => {
        addDependentProfilesSpy = jest.spyOn(commons, "addDependentProfiles").mockImplementation((value, profilesAvailable) => value);
    });

    afterAll(() => {
        addDependentProfilesSpy.mockRestore();
    });

    const renderComponent = () =>
        render(
            <Ctx.Provider value={mockContextValue}>
                <MultiSelect
                    handleChange={mockHandleChange}
                    errors={mockErrors}
                    value={mockValue}
                    names={mockNames}
                />
            </Ctx.Provider>
        );

    test("renders MultiSelect component correctly", () => {
        renderComponent();

        expect(screen.getByLabelText("Ruoli assegnati")).toBeInTheDocument();
        expect(screen.getByText("Admin")).toBeInTheDocument();
    });

    test("shows error when there are errors", () => {
        render(
            <Ctx.Provider value={mockContextValue}>
                <MultiSelect
                    handleChange={mockHandleChange}
                    errors={{ profileIds: "Errore di test" }}
                    value={mockValue}
                    names={mockNames}
                />
            </Ctx.Provider>
        );

        expect(screen.getByText("Errore di test")).toBeInTheDocument();
    });
});
