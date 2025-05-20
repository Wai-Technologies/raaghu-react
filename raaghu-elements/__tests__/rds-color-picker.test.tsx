import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsColorPicker, { ColorPickerType } from "../src/rds-color-picker/rds-color-picker";

describe("RdsColorPicker", () => {
    const label = "Pick a color";
    const value = "#ff0000";
    const onChange = jest.fn();

    beforeEach(() => {
        onChange.mockClear();
    });

    it("renders label and color input with initial value", () => {
        render(
            <RdsColorPicker
                value={value}
                label={label} type={ColorPickerType.Default}            />
        );

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByTitle("Choose your color")).toHaveValue(value);
    });

    it("disables color input when isDisabled is true", () => {
        render(
            <RdsColorPicker
                value={value}
                label={label}
                isDisabled={true} type={ColorPickerType.Default}            />
        );

        const input = screen.getByTitle("Choose your color");
        expect(input).toBeDisabled();
    });

    it("should update color on color input change", () => {
        render(<RdsColorPicker value="#ffffff" label="Pick a color" type={ColorPickerType.Default} />);
        const colorInput = screen.getByTestId("colorPicker");
        fireEvent.change(colorInput, { target: { value: "#000000" } });
        expect(colorInput).toHaveValue("#000000");
    });
});
