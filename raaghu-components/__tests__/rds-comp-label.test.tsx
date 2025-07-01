import RdsCompLabel, { RdsCompLabelProps } from "../src/rds-comp-label/rds-comp-label";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));


describe("RdsCompLabel component", () => {
    const defaultProps = {
        label: "Test Label",
        id: "test-id",
        required: false,
        multiline: false,
        style: { fontSize: "12px", fontWeight: "bold", color: "#ff0000" },
    };

    it("should render the label text", () => {
        render(<RdsCompLabel {...defaultProps} />);
        expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    });

    it("should render a required span if required prop is passed", () => {
        const testProps = {
            ...defaultProps,
            required: true,
        };
        render(<RdsCompLabel {...testProps} />);
        expect(screen.getByText("*")).toBeInTheDocument();
    });


    it("should render the children prop", () => {
        const testText = "test";
        render(<RdsCompLabel {...defaultProps}>{testText}</RdsCompLabel>);
    });

});