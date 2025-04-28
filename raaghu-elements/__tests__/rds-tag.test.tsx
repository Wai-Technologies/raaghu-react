import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import RdsTag, { ColorVariant, Role, TagType } from "../src/rds-tag/rds-tag";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));
  
describe("RdsTag component", () => {
    it("renders without errors", () => {
        render(<RdsTag tagType={TagType.Square} role={Role.Basic} colorVariant={ColorVariant.Primary} />);
    });

    it("adds a tag when Enter key is pressed and input is not empty", () => {
        const { getByPlaceholderText, getByText } = render(<RdsTag tagType={TagType.Square} role={Role.Basic} colorVariant={ColorVariant.Primary} />);

        const inputElement = getByPlaceholderText("+ Add Tag");
        fireEvent.keyUp(inputElement, { key: "Enter", target: { value: "Tag 1" } });

        expect(getByText("Tag 1")).toBeInTheDocument();
    });


});
