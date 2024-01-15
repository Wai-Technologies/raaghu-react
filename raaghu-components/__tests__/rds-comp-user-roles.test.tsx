import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompUserRoles from "../src/rds-comp-user-roles/rds-comp-user-roles";

describe("RdsCompUserRoles", () => {
    const usersRole = [
        { name: "Role 1", isChecked: false },
        { name: "Role 2", isChecked: true },
        { name: "Role 3", isChecked: false }
    ];
    const changedDataMock = jest.fn();

    it("renders checkbox list", () => {
        render(<RdsCompUserRoles usersRole={usersRole} changedData={changedDataMock} />);

        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes.length).toBe(usersRole.length);
    });

    it("handles checkbox change", () => {
        render(<RdsCompUserRoles usersRole={usersRole} changedData={changedDataMock} />);

        const checkbox = screen.getByTestId("Role 1");
        fireEvent.click(checkbox);

        expect(changedDataMock).toHaveBeenCalledWith([
            { name: "Role 1", isChecked: true },
            { name: "Role 2", isChecked: true },
            { name: "Role 3", isChecked: false }
        ]);
    });
});
