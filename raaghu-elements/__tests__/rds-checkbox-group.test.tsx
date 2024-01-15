import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCheckboxGroup, { RdsCheckboxGroupProps } from "../src/rds-checkbox-group/rds-checkbox-group";

describe("RdsCheckboxGroup", () => {
    const props: RdsCheckboxGroupProps = {
        itemList: [
            {
                id: "checkbox1",
                label: "Checkbox 1",
                name: "checkbox1",
                checked: false,
                disabled: false,
            },
            {
                id: "checkbox2",
                label: "Checkbox 2",
                name: "checkbox2",
                checked: false,
                disabled: false,
            },
        ],
    };

    it("renders without error", () => {
        render(<RdsCheckboxGroup {...props} />);
    });

    it("renders the correct number of checkboxes", () => {
        render(<RdsCheckboxGroup {...props} />);
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(props.itemList.length);
    });

    it("calls the onClick prop when a checkbox is clicked", () => {
        const onClick = jest.fn();
        render(<RdsCheckboxGroup {...props} onClick={onClick} />);
        const checkbox = screen.getByLabelText(props.itemList[0].label);
        fireEvent.click(checkbox);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
