import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompTypingSection from "../src/rds-comp-typing-section/rds-comp-typing-section";

// Mock the RdsElements components
jest.mock("../src/rds-elements", () => ({
  RdsIcon: ({ name, onClick, classes, height, width, isCursorPointer, style, ...props }: any) => {
    const { style: _, ...restProps } = props; // Remove style from spreading
    return (
      <span
        data-testid={`icon-${name}`}
        onClick={onClick}
        className={classes}
        style={{ 
          cursor: isCursorPointer ? 'pointer' : 'default',
          height,
          width 
        }}
        {...restProps}
      >
        {name}
      </span>
    );
  },
  RdsButton: ({ label, onClick, icon, tooltipTitle, style, ...props }: any) => {
    const { style: _, ...restProps } = props; // Remove style from spreading
    return (
      <button
        onClick={onClick}
        data-testid={`button-${label || icon}`}
        title={tooltipTitle}
        {...restProps}
      >
        {icon && <span data-testid={`icon-${icon}`}>{icon}</span>}
        {label}
      </button>
    );
  },
  RdsAttachement: ({ onFileSelect, badgeLabel, showBadge, menuIcon, handleAddComment, onFigmaSubmit, style, ...props }: any) => {
    const { style: _, ...restProps } = props; // Remove style from spreading
    return (
      <div data-testid="rds-attachment" {...restProps}>
        <button
          data-testid="attachment-button"
          onClick={() => {
            const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
            onFileSelect && onFileSelect(mockFile);
          }}
        >
          {menuIcon || 'attach'}
        </button>
        {showBadge && badgeLabel && (
          <span data-testid="attachment-badge">{badgeLabel}</span>
        )}
      </div>
    );
  },
  RdsDropdown: ({ id, label, listItems, buttonIcon, showChevron, style, ...props }: any) => {
    const { style: _, ...restProps } = props; // Remove style from spreading
    return (
      <div data-testid={`dropdown-${id}`} {...restProps}>
        <button data-testid={`dropdown-button-${id}`}>
          {buttonIcon && <span data-testid={`icon-${buttonIcon}`}>{buttonIcon}</span>}
          {label}
          {showChevron && <span data-testid="chevron">⌄</span>}
        </button>
        <ul data-testid={`dropdown-list-${id}`}>
          {listItems?.map((item: any) => (
            <li key={item.id} data-testid={`dropdown-item-${item.id}`}>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    );
  },
  RdsSelectList: ({ id, label, placeholder, selectedValue, selectItems, onChange, style, ...props }: any) => {
    const { style: _, ...restProps } = props; // Remove style from spreading
    return (
      <div data-testid={`select-list-${id}`} {...restProps}>
        <label>{label}</label>
        <select
          value={selectedValue || ""}
          onChange={(e) => onChange && onChange({ value: e.target.value })}
        >
          <option value="">{placeholder}</option>
          {selectItems?.map((item: any) => (
            <option key={item.id} value={item.value}>
              {item.option}
            </option>
          ))}
        </select>
      </div>
    );
  },
}));

// Mock window resize and speech recognition
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(window, 'webkitSpeechRecognition', {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation(() => ({
    continuous: false,
    interimResults: false,
    lang: '',
    onstart: null,
    onresult: null,
    start: jest.fn(),
  })),
});

// Mock FileReader
global.FileReader = jest.fn().mockImplementation(() => ({
  readAsDataURL: jest.fn(),
  onloadend: null,
  result: 'data:image/jpeg;base64,mock-base64-data',
})) as any;

describe("RdsCompTypingSection", () => {
  const defaultProps = {
    icon_name: "send",
    placeholderText: "Enter your message here",
    colorVariant: "primary",
    type: "default",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Test 1: Basic rendering
  it("renders without crashing", () => {
    render(<RdsCompTypingSection {...defaultProps} />);
    
    // Check if main elements are rendered
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByTestId("icon-sparkle")).toBeInTheDocument();
    expect(screen.getByTestId("rds-attachment")).toBeInTheDocument();
    expect(screen.getByTestId("button-send")).toBeInTheDocument();
  });

  // Test 2: Textarea functionality
  it("handles textarea input correctly", () => {
    render(<RdsCompTypingSection {...defaultProps} />);
    
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Hello, this is a test message" } });
    
    expect(textarea).toHaveValue("Hello, this is a test message");
  });
  // Test 3: Send button functionality
  it("calls onSend callback when send button is clicked with text", () => {
    const mockOnSend = jest.fn();
    render(<RdsCompTypingSection {...defaultProps} onSend={mockOnSend} />);
    
    const textarea = screen.getByRole("textbox");
    const sendButton = screen.getByTestId("button-send");
    
    fireEvent.change(textarea, { target: { value: "Test message" } });
    fireEvent.click(sendButton);
    
    expect(mockOnSend).toHaveBeenCalledWith("Test message", undefined);
  });

  // Test 4: Advanced type rendering
  it("renders advanced type correctly", () => {
    const advancedProps = {
      ...defaultProps,
      type: "advanced",
      warningMsg: true,
      warningText: "Test warning message",
    };
    
    render(<RdsCompTypingSection {...advancedProps} />);
    
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    
    const warningMessage = screen.getByText("Test warning message");
    expect(warningMessage).toBeInTheDocument();
  });

  // Test 5: Placeholder text
  it("shows correct placeholder text", () => {
    render(<RdsCompTypingSection {...defaultProps} />);
    
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("placeholder", "Enter your message here");
  });
});
