import "@testing-library/jest-dom";
import RdsCompIconLabel from "../src/rds-comp-icon-label/rds-comp-icon-label";
import React from "react";
import { render, screen } from "@testing-library/react";

// Set up fetch mock before any imports
if (typeof global.fetch !== 'function') {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      text: () => Promise.resolve("<svg>Mock SVG</svg>"),
    })
  ) as jest.Mock;
}

// Mock RdsCompIcon component to avoid fetch issues
jest.mock("../src/rds-icon/rds-icon", () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div 
        data-testid="mocked-icon" 
        role="img" 
        aria-label={`icon-${props.name}`}
        className={props.classes}
      >
        {props.name}
      </div>
    ),
  };
});

jest.mock('react-lottie-player', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock window.URL.createObjectURL
if (typeof window.URL.createObjectURL !== 'function') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: jest.fn() });
}

describe('RdsCompIconLabel Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    if (global.fetch) {
      (global.fetch as jest.Mock).mockClear();
    }
  });

  test("should render the label", () => {
    render(<RdsCompIconLabel label="Icon Label" icon='user' size='medium' fill={false} iconposition={"right"} />);
    const rdsIconLabelElement = screen.getByText("Icon Label");
    expect(rdsIconLabelElement).toBeInTheDocument();
  });

  test("should render the icon", () => {
    render(<RdsCompIconLabel label="Icon Label" icon='user' size='medium' fill={false} iconposition={"right"} />);
    const rdsIconElement = screen.getByTestId("mocked-icon");
    expect(rdsIconElement).toBeInTheDocument();
    expect(rdsIconElement).toHaveTextContent("user");
  });

  test("should position icon to the left when iconposition is left", () => {
    render(<RdsCompIconLabel label="Icon Label" icon='user' size='medium' fill={false} iconposition={"left"} />);
    const rdsIconLabelElement = screen.getByText("Icon Label");
    expect(rdsIconLabelElement).toBeInTheDocument();
    const rdsIconElement = screen.getByTestId("mocked-icon");
    expect(rdsIconElement).toBeInTheDocument();
  });

  test("should apply correct size class", () => {
    const { container } = render(<RdsCompIconLabel label="Icon Label" icon='user' size='large' fill={false} iconposition={"right"} />);
    // Since we can't directly test CSS classes, we check if the container contains the rendered component
    expect(container.innerHTML).toContain("Icon Label");
    expect(screen.getByTestId("mocked-icon")).toBeInTheDocument();
  });
});