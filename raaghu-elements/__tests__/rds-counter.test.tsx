import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import  RdsCounter, {RdsCounterProps} from "../src/rds-counter/rds-counter";
jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));

describe("RdsCounter", () => {
    const defaultProps: RdsCounterProps = {
        counterValue: 0,
        min: -5,
        max: 5,
        width: 100
    };

    it("renders label and counter", () => {
        render(<RdsCounter {...defaultProps} label="Counter Label" />);
    });

});
