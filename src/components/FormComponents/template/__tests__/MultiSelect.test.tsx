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

    const renderComponent = (isFirstUser = false) =>
        render(
            <Ctx.Provider value={mockContextValue}>
                <MultiSelect
                    handleChange={mockHandleChange}
                    errors={mockErrors}
                    value={mockValue}
                    names={mockNames}
                    isFirstUser={isFirstUser}
                />
            </Ctx.Provider>
        );

    test("calls handleChangeWrapper with correct values when a new value is selected", () => {
        renderComponent();

        const dropdownButton = screen.getByRole("button", { name: /Open/i });
        fireEvent.click(dropdownButton);

        const userOption = screen.getByText("User");
        fireEvent.click(userOption);

        expect(addDependentProfilesSpy).toHaveBeenCalledWith(["Admin", "User"], mockProfilesAvailable);
     
        expect(mockHandleChange).toHaveBeenCalledTimes(1);
    });
});
