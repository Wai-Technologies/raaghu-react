import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RdsTextArea, { RdsTextAreaProps } from "../src/rds-text-area/rds-text-area";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));

describe("RdsTextArea component", () => {
    const defaultProps: RdsTextAreaProps = {
        placeholder: "Enter text here",
    };

    it("renders without errors", () => {
        render(<RdsTextArea {...defaultProps} />);
    });


    it("renders the correct number of rows", () => {
        const { getByPlaceholderText } = render(<RdsTextArea {...defaultProps} rows={5} />);
        expect(getByPlaceholderText("Enter text here")).toHaveAttribute("rows", "5");
    });

    it("calls the onChange function when text is entered", () => {
        const onChangeMock = jest.fn();
        const { getByPlaceholderText } = render(<RdsTextArea {...defaultProps} onChange={onChangeMock} />);
        fireEvent.change(getByPlaceholderText("Enter text here"), { target: { value: "New Text" } });
        expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    test("renders a textarea with the provided placeholder", () => {
        render(<RdsTextArea placeholder="Enter your text here" />);
        const textarea = screen.getByPlaceholderText("Enter your text here");
        expect(textarea).toBeInTheDocument();
    });

    test("renders a label if provided", () => {
        render(<RdsTextArea label="My Label" placeholder={""} />);
        const label = screen.getByText("My Label");
        expect(label).toBeInTheDocument();
    });

});
