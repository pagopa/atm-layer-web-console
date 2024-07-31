import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MultiSelect from "../MultiSelect";
import { Ctx } from "../../../DataContext";

const mockProfilesAvailable = [
    { description: "Profile 1", profileId: 1, createdAt: "", lastUpdatedAt: "" },
    { description: "Profile 2", profileId: 2, createdAt: "", lastUpdatedAt: "" },
];

const mockContextValue = {
    profilesAvailable: mockProfilesAvailable,
};

const mockHandleChange = jest.fn();
const mockErrors = { profileIds: "" };
const mockValue = ["Profile 1"];
const mockNames = ["Profile 1", "Profile 2"];

describe("MultiSelect component", () => {
    beforeEach(() => {
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
    });

    test("renders the checkbox with correct icon", async () => {

        const dropdownButton = screen.getByRole('button', { name: /Open/i });
        userEvent.click(dropdownButton);

        const option = await screen.findByRole('option', { name: /Profile 1/i });
        const checkbox = option.querySelector('input[type="checkbox"]');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeChecked();
    });

    test("renders selected checkbox with correct icon", async () => {

        const dropdownButton = screen.getByRole('button', { name: /Open/i });
        userEvent.click(dropdownButton);

        const option = await screen.findByRole('option', { name: /Profile 1/i });
        const checkbox = option.querySelector('input[type="checkbox"]');
        expect(checkbox).toBeChecked();
    });

    test("calls handleChange with completeProfiles on change", async () => {

        const dropdownButton = screen.getByRole('button', { name: /Open/i });
        userEvent.click(dropdownButton);

        const option = await screen.findByRole('option', { name: /Profile 2/i });
        userEvent.click(option);

        expect(mockHandleChange).toHaveBeenCalledWith(expect.anything(), expect.arrayContaining(["Profile 1", "Profile 2"]));
    });
});
