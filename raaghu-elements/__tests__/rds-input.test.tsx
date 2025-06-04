import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import RdsInput from "../src/rds-input/rds-input";

// Polyfill fetch for icon loading in tests
import 'whatwg-fetch';

// Robust global fetch mock to prevent icon loading errors
beforeAll(() => {
  if (!global.fetch) {
    global.fetch = jest.fn((...args) =>
      Promise.resolve(new Response('<svg></svg>', { status: 200, headers: { 'Content-Type': 'image/svg+xml' } }))
    );
  }
});

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));

describe("RdsInput", () => {
    it("renders input element with placeholder", () => {
        const onChange = jest.fn();
        render(
            <RdsInput placeholder="Enter your name" value="test" onChange={onChange} name={""} />
        );
        expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
    });

    it("calls onChange function when input value changes", () => {
        const onChange = jest.fn();
        render(<RdsInput placeholder="Enter your name" value="test" onChange={onChange} name={""} />);
        fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
            target: { value: "John Doe" },
        });
        expect(onChange).toHaveBeenCalled();
    });

    it("toggles password visibility on eye icon click", async () => {
        const onChange = jest.fn();
        const { container } = render(
            <RdsInput
                name="Password"
                label={true}
                id="password"
                value="test"
                inputType="password"
                onChange={onChange}
                showIcon={true}
            />
        );
        const passwordInput = screen.getByLabelText("Password");
        // Select the icon by class since SVG fallback may render a div
        const eyeIcon = container.querySelector('.password-toggle');
        expect(eyeIcon).toBeTruthy();
        // First click: should show text
        fireEvent.click(eyeIcon!);
        await waitFor(() => {
            expect(screen.getByLabelText("Password")).toHaveAttribute("type", "text");
        });
        // Second click: should show password
        fireEvent.click(eyeIcon!);
        await waitFor(() => {
            expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
        });
    });

    it("input disabled", () => {
        const onChange = jest.fn();
        render(<RdsInput onChange={onChange} value="test" isDisabled={true} name="testInput" />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeDisabled();
    });

    it("read Only", () => {
        const onChange = jest.fn();
        render(<RdsInput onChange={onChange} value="test" readonly={true} name="testInput" />);
        const inputElement = screen.getByRole("textbox") as HTMLInputElement;
        expect(inputElement.readOnly).toBeTruthy();
    });
});
