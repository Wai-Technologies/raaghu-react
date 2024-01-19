import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import RdsRange, { RdsRangeProps } from "../src/rds-range/rds-range";


describe("RdsRange", () => {
    const defaultProps: RdsRangeProps = {
        min: 0,
        max: 100,
        rangeType: "default",
    };

    it("renders a different type of range when the rangeType prop is set", () => {
        const { container } = render(<RdsRange {...defaultProps} rangeType="type1" />);

        const rangeTwo = container.querySelector(".slider_two");
        expect(rangeTwo).toBeInTheDocument();
    });

    it("renders the component", () => {
        const { container } = render(<RdsRange {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("updates the value on change", () => {
        const { getByRole, getByText } = render(<RdsRange {...defaultProps} />);
        const input = getByRole("slider");
        fireEvent.change(input, { target: { value: "50" } });
        expect(input).toHaveValue("50");
        expect(getByText("50")).toBeInTheDocument();
    });

    it("displays the correct range values", () => {
        const { getAllByText } = render(<RdsRange {...defaultProps} />);
        const rangeValues = getAllByText("0");
        expect(rangeValues).toHaveLength(2);
        expect(getAllByText("100")).toHaveLength(1);
    });
});


