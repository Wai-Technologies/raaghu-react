import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import RdsInput from "../src/rds-input/rds-input";

// Polyfill fetch for icon loading in tests
import 'whatwg-fetch';

// Mock RdsCompIcon component since it may be causing issues
jest.mock("../src/rds-icon/rds-icon", () => ({
  __esModule: true,
  default: (props: any) => (
    <div
      className={props.classes}
      data-testid={`icon-${props.name}`}
      onClick={props.onClick}
      id={props.id}
    >
      {props.name}
    </div>
  ),
}));

// Robust global fetch mock to prevent icon loading errors
beforeAll(() => {
  if (!global.fetch) {
    global.fetch = jest.fn(() =>
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

  it("toggles password visibility when eye icon is clicked", async () => {
    const onChange = jest.fn();
    render(
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
    
    // Find the password input
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    expect(passwordInput).toHaveAttribute("type", "password");
    
    // Find the eye icon by test id (we've mocked it with data-testid="icon-eye_slash")
    const toggleIcon = screen.getByTestId("icon-eye_slash");
    expect(toggleIcon).toBeInTheDocument();
    
    // Simulate the click on the eye icon
    fireEvent.click(toggleIcon);
    
    // Wait for the state to update
    await waitFor(() => {
      // Now we should see the eye icon (not eye_slash)
      expect(screen.getByTestId("icon-eye")).toBeInTheDocument();
      // And the input type should be text
      expect(passwordInput).toHaveAttribute("type", "text");
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
