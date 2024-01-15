import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import { RdsWidget } from "../src";
import { RdsWidgetProps } from "../src/rds-widget/rds-widget";
import "@testing-library/jest-dom";
import { RenderResult } from "@testing-library/react";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));


describe("RdsWidget", () => {
    const defaultProps: RdsWidgetProps = {
        headerTitle: "My Widget",
    };

    it("should render without crashing", () => {
        render(<RdsWidget {...defaultProps} />);
    });

    it("should render the header title", () => {
        const { getByText } = render(<RdsWidget {...defaultProps} />);
        expect(getByText("My Widget")).toBeInTheDocument();
    });
});