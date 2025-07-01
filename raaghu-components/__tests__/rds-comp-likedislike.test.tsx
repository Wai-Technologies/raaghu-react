import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
//import RdsCompLikeDislike from "./rds-comp-like-dislike";
import RdsCompInputGroup from "../src/rds-comp-input-group/rds-comp-input-group";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));

describe("RdsCompInputGroup", () => {
    it("should render input group label if provided", async () => {
        const inputGroupLabel = "Test Input Group Label";
        render(
          <RdsCompInputGroup
            inputGroupLabel={inputGroupLabel}
            colorVariant={""}
            inputValue={(arg: string) => {
              throw new Error("Function not implemented.");
            }}
          />
        );
    });

    it("should render placeholder text in input field if provided", () => {
        const placeholderText = "Test Placeholder Text";
        const { getByPlaceholderText } = render(
            <RdsCompInputGroup placeholder={placeholderText} colorVariant={""} inputValue={function (arg: string) {
                throw new Error("Function not implemented.");
            }} />
        );
        const inputElement = getByPlaceholderText(placeholderText);
        expect(inputElement).toBeInTheDocument();
    });

    it("should set initial value of input field if provided", () => {
        const initialValue = "Test Initial Value";
        const { getByDisplayValue } = render(
            <RdsCompInputGroup value={initialValue} colorVariant={""} inputValue={function (arg: string) {
                throw new Error("Function not implemented.");
            }} />
        );
        const inputElement = getByDisplayValue(initialValue);
        expect(inputElement).toBeInTheDocument();
    });

    it("should call inputValue with input value when button is clicked", () => {
        const mockInputValue = jest.fn();
        const { getByRole } = render(<RdsCompInputGroup inputValue={mockInputValue} colorVariant={""} />);
        const inputElement = getByRole("textbox");
        const submitButton = getByRole("button");
        const testInputValue = "Test Input Value";
        fireEvent.change(inputElement, { target: { value: testInputValue } });
        fireEvent.click(submitButton);
        expect(mockInputValue).toHaveBeenCalledTimes(1);
        expect(mockInputValue).toHaveBeenCalledWith(testInputValue);
    });
    const mockInputValue = jest.fn();

    it("renders without crashing", () => {
        render(<RdsCompInputGroup colorVariant={""} inputValue={function (arg: string) {
            throw new Error("Function not implemented.");
        }} />);
    });

    const inputValueMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });


    it("Should render correctly with default props", () => {
        const { getByRole } = render(<RdsCompInputGroup colorVariant="primary" inputValue={inputValueMock} />);
        expect(getByRole("textbox")).toBeInTheDocument();
        const button = getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("type", "submit");
        expect(button.textContent).toBe("");
    });
});