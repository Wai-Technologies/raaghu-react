import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsSpinner, { RdsSpinnerProps } from "../src/rds-spinner/rds-spinner";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));

describe("RdsSpinner component", () => {
    const defaultProps: RdsSpinnerProps = {
        spinnerType: "border",
        colorVariant: "primary",
        width: "3rem",
        borderWidth: "2px",
        height: "3rem",
    };

    it("renders a element", () => {
        render(<RdsSpinner {...defaultProps} />);
    });


    it("applies custom styles", () => {
        const customProps: RdsSpinnerProps = {
            ...defaultProps,
            width: "5rem",
            borderWidth: "3px",
            height: "5rem",
        };
        render(<RdsSpinner {...customProps} />);
       
    });
});
