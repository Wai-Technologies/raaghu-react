import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import RdsIllustration from "../src/rds-illustration/rds-illustration";
import { RdsIcon } from "../src";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

// Import the jest-dom library
import '@testing-library/jest-dom';

describe("RdsIllustration", () => {
    test("Should render the label ", () => {
        render(<RdsIllustration label='label' subLabel='subLabel' />);
        const rdsIllustrationlabelElement = screen.getByTestId("labelElement");
        expect(rdsIllustrationlabelElement).toBeInTheDocument();
    });

    test("Should render the sublabel", () => {
        render(<RdsIllustration label='label' subLabel='subLabel' />);
        const rdsIllustrationsubElement = screen.getByTestId("sublabelElement");
        expect(rdsIllustrationsubElement).toBeInTheDocument();
    });
});
