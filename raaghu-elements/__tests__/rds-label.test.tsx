import RdsLabel, { RdsLabelProps } from "../src/rds-label/rds-label";
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


describe("RdsLabel component", () => {
    const defaultProps = {
        label: "Test Label",
        id: "test-id",
        required: false,
        multiline: false,
        style: { fontSize: "12px", fontWeight: "bold", color: "#ff0000" },
    };

    it("should render the label text", () => {
        render(<RdsLabel {...defaultProps} />);
        expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    });

    it("should render a required span if required prop is passed", () => {
        const testProps = {
            ...defaultProps,
            required: true,
        };
        render(<RdsLabel {...testProps} />);
        expect(screen.getByText("*")).toBeInTheDocument();
    });


    it("should render the children prop", () => {
        const testText = "test";
        render(<RdsLabel {...defaultProps}>{testText}</RdsLabel>);
    });

});