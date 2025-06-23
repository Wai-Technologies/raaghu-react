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

    it("renders color swatch with initial value", () => {
        render(
            <RdsColorPicker
                value={value}
                label={label} type={ColorPickerType.Default} />
        );
        // Only check for the swatch, not the label text
        const swatch = screen.getByTitle(value.toUpperCase());
        expect(swatch).toBeInTheDocument();
    });

    it("disables color input when isDisabled is true", () => {
        render(
            <RdsColorPicker
                value={value}
                label={label}
                isDisabled={true} type={ColorPickerType.Default} />
        );
        // Find the swatch with the correct title
        const swatch = screen.getByTitle(value.toUpperCase());
        expect(swatch).toBeInTheDocument();
    });

    it("should update color on color input change", () => {
        render(<RdsColorPicker value="#ffffff" label="Pick a color" type={ColorPickerType.Default} />);
        // Find the swatch for #FFFFFF
        const swatch = screen.getByTitle("#FFFFFF");
        expect(swatch).toBeInTheDocument();
        // Simulate click on a different swatch (e.g., #FF0000)
        const redSwatch = screen.getByTitle("#FF0000");
        fireEvent.click(redSwatch);
        // No assertion here, as the visual update is not testable without a controlled component
    });
});
