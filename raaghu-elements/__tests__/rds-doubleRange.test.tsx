import { fireEvent, render } from "@testing-library/react";
import React from "react";
//import { RdsDoubleRange } from "../src";import "@testing-library/jest-dom"

import RdsDoubleRange, { RdsDoubleRangeProps } from "../src/rds-double-range/rds-double-range";

test("RdsDoubleRange component renders without crashing", () => {
    render(<RdsDoubleRange min={0} max={100} doubleRangeType="default" />);
});

describe("RdsDoubleRange", () => {
    const props: RdsDoubleRangeProps = {
        min: 0,
        max: 100,
        doubleRangeType: "default",
    };

    test("renders without error", () => {
        render(<RdsDoubleRange {...props} />);
    });

    test("handles range input changes", () => {
        const { container } = render(<RdsDoubleRange {...props} />);

        const minRangeInput = container.querySelector(
            "input[type=\"range\"].thumb--zindex-4.slider_1"
        ) as HTMLInputElement;
        const maxRangeInput = container.querySelector(
            "input[type=\"range\"].thumb--zindex-5.slider_2"
        ) as HTMLInputElement;

        fireEvent.change(minRangeInput, { target: { value: "20" } });
        fireEvent.change(maxRangeInput, { target: { value: "80" } });

        expect(minRangeInput.value).toBe("20");
        expect(maxRangeInput.value).toBe("80");
    });


    test("displays correct tooltip values", () => {
        const { container } = render(<RdsDoubleRange {...props} />);

        const minRangeInput = container.querySelector(
            "input[type=\"range\"].thumb--zindex-4.slider_1"
        ) as HTMLInputElement;
        const maxRangeInput = container.querySelector(
            "input[type=\"range\"].thumb--zindex-5.slider_2"
        ) as HTMLInputElement;

        fireEvent.change(minRangeInput, { target: { value: "30" } });
        fireEvent.change(maxRangeInput, { target: { value: "70" } });

        const tooltip1 = container.querySelector("#range1") as HTMLSpanElement;
        const tooltip2 = container.querySelector("#range2") as HTMLSpanElement;

        expect(tooltip1.textContent).toBe("30");
        expect(tooltip2.textContent).toBe("70");
    });
});
