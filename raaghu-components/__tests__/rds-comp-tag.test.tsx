import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import RdsCompTag, { ColorVariant, Role, TagType } from "../src/rds-comp-tag/rds-comp-tag";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

// Mock fetch to prevent icon loading errors in tests
beforeAll(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            text: () => Promise.resolve(''),
            json: () => Promise.resolve({}),
            blob: () => Promise.resolve(new Blob()),
            clone: () => this,
            headers: { get: () => null },
            redirected: false,
            status: 200,
            statusText: 'OK',
            type: 'basic',
            url: '',
            body: null,
            bodyUsed: false,
            arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
            formData: () => Promise.resolve(new FormData()),
        })
    ) as jest.Mock;
});

describe("RdsCompTag component", () => {
    it("renders without errors", () => {
        render(<RdsCompTag tagType={TagType.Square} role={Role.Basic} colorVariant={ColorVariant.Primary} />);
    });

    it("adds a tag when Enter key is pressed and input is not empty", () => {
        const { getByPlaceholderText, getByText } = render(<RdsCompTag tagType={TagType.Square} role={Role.Basic} colorVariant={ColorVariant.Primary} />);

        const inputElement = getByPlaceholderText("+ Add Tag");
        fireEvent.keyUp(inputElement, { key: "Enter", target: { value: "Tag 1" } });

        expect(getByText("Tag 1")).toBeInTheDocument();
    });


});
