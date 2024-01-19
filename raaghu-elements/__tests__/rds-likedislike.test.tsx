import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
//import RdsLikeDislike from "./rds-like-dislike";
import { RdsLikeDislike } from "../src";
import RdsInputGroup, { RdsInputGroupProps } from "../src/rds-input-group/rds-input-group";

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));

describe("RdsInputGroup", () => {
    it("should render input group label if provided", async () => {
        const inputGroupLabel = "Test Input Group Label";
        render(
          <RdsInputGroup
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
            <RdsInputGroup placeholder={placeholderText} colorVariant={""} inputValue={function (arg: string) {
                throw new Error("Function not implemented.");
            }} />
        );
        const inputElement = getByPlaceholderText(placeholderText);
        expect(inputElement).toBeInTheDocument();
    });

    it("should set initial value of input field if provided", () => {
        const initialValue = "Test Initial Value";
        const { getByDisplayValue } = render(
            <RdsInputGroup value={initialValue} colorVariant={""} inputValue={function (arg: string) {
                throw new Error("Function not implemented.");
            }} />
        );
        const inputElement = getByDisplayValue(initialValue);
        expect(inputElement).toBeInTheDocument();
    });

    it("should call inputValue with input value when button is clicked", () => {
        const mockInputValue = jest.fn();
        const { getByRole } = render(<RdsInputGroup inputValue={mockInputValue} colorVariant={""} />);
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
        render(<RdsInputGroup colorVariant={""} inputValue={function (arg: string) {
            throw new Error("Function not implemented.");
        }} />);
    });

    const inputValueMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });


    it("Should render correctly with default props", () => {
        const { getByRole } = render(<RdsInputGroup colorVariant="primary" inputValue={inputValueMock} />);
        expect(getByRole("textbox")).toBeInTheDocument();
        const button = getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("type", "submit");
        expect(button.textContent).toBe("");
    });
});