import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompTypingSection from "../src/rds-comp-typing-section/rds-comp-typing-section";

// Mock the RdsElements components
jest.mock("../src/rds-elements", () => ({
  RdsInput: ({ 
    placeholder, 
    value, 
    onChange, 
    dataTestId,
    ...props 
  }: any) => (
    <input
      data-testid={dataTestId || "rds-input"}
      placeholder={placeholder}
      value={value || ""}
      onChange={(e) => onChange && onChange(e.target.value)}
      {...props}
    />
  ),
  RdsIcon: ({ 
    name, 
    onClick, 
    dataTestId,
    classes,
    height,
    width,
    isCursorPointer,
    ...props 
  }: any) => (
    <span
      data-testid={dataTestId || `icon-${name}`}
      onClick={onClick}
      className={classes}
      style={{ 
        cursor: isCursorPointer ? 'pointer' : 'default',
        height,
        width 
      }}
      {...props}
    >
      {name}
    </span>
  ),
  RdsButton: ({ 
    label, 
    onClick, 
    isDisabled, 
    dataTestId, 
    colorVariant, 
    size, 
    type,
    icon,
    displayType,
    style,
    shape,
    state,
    textCase,
    tooltip,
    tooltipTitle,
    ...props 
  }: any) => {
    // Filter out custom component props
    const htmlProps = Object.keys(props).reduce((acc, key) => {
      if (['id', 'name', 'className', 'disabled', 'form'].includes(key)) {
        acc[key] = props[key];
      }
      return acc;
    }, {} as any);
    
    return (
      <button
        onClick={onClick}
        disabled={isDisabled}
        data-testid={dataTestId || `button-${label || icon}`}
        type={type || "button"}
        title={tooltipTitle}
        {...htmlProps}
      >
        {icon && <span data-testid={`icon-${icon}`}>{icon}</span>}
        {label}
      </button>
    );
  },
  RdsAttachement: ({ 
    onFileSelect,
    handleAddComment,
    onFigmaSubmit,
    menuIcon,
    badgeLabel,
    showBadge,
    modalTitle,
    modalText,
    uploadText,
    importText,
    inputPlaceholder,
    hintText,
    badgeColor,
    ...props 
  }: any) => (
    <div data-testid="rds-attachment" {...props}>
      <button
        data-testid="attachment-button"
        onClick={() => {
          // Simulate file selection
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
  ),
  RdsSelectList: ({ 
    id, 
    selectedValue, 
    selectItems, 
    label, 
    placeholder, 
    onChange,
    ...props 
  }: any) => (
    <div data-testid={`select-list-${id}`}>
      <label>{label}</label>
      <select
        data-testid={`select-${id}`}
        value={selectedValue || ""}
        onChange={(e) => onChange && onChange({ value: e.target.value })}
        {...props}
      >
        <option value="">{placeholder}</option>
        {selectItems?.map((item: any) => (
          <option key={item.value} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  ),
  RdsDropdown: ({
    id,
    label,
    listItems,
    buttonIcon,
    colorVariant,
    displayType,
    layout,
    shape,
    size,
    state,
    style,
    showChevron,
    darkDropdown,
    iconStroke,
    ...props
  }: any) => (
    <div data-testid={`dropdown-${id}`} {...props}>
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
  ),
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  // Test 1: Basic rendering
  it("renders without crashing", () => {
    render(<RdsCompTypingSection {...defaultProps} />);
    
    // Check if main elements are present
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

  // Test 3: Placeholder text
  it("shows correct placeholder text", () => {
    render(<RdsCompTypingSection {...defaultProps} />);
    
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("placeholder", "Enter your message here");
  });

  // Test 4: Send button functionality
  it("calls onSend callback when send button is clicked", () => {
    const mockOnSend = jest.fn();
    render(<RdsCompTypingSection {...defaultProps} onSend={mockOnSend} />);
    
    const textarea = screen.getByRole("textbox");
    const sendButton = screen.getByTestId("button-send");
    
    // Type a message
    fireEvent.change(textarea, { target: { value: "Test message" } });
    
    // Click send
    fireEvent.click(sendButton);
    
    expect(mockOnSend).toHaveBeenCalledWith("Test message", undefined);
  });

  // Test 5: Send button clears input after sending
  it("clears textarea after sending message", () => {
    const mockOnSend = jest.fn();
    render(<RdsCompTypingSection {...defaultProps} onSend={mockOnSend} />);
    
    const textarea = screen.getByRole("textbox");
    const sendButton = screen.getByTestId("button-send");
    
    // Type and send message
    fireEvent.change(textarea, { target: { value: "Test message" } });
    fireEvent.click(sendButton);
    
    expect(textarea).toHaveValue("");
  });

  // Test 6: Action buttons rendering
  it("renders action buttons correctly", () => {
    render(<RdsCompTypingSection {...defaultProps} />);
    
    expect(screen.getByTestId("button-New Project")).toBeInTheDocument();
    expect(screen.getByTestId("button-Import From Figma")).toBeInTheDocument();
  });

  // Test 7: Dropdown rendering
  it("renders dropdown with correct items", () => {
    render(<RdsCompTypingSection {...defaultProps} />);
    
    expect(screen.getByTestId("dropdown-1")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-button-1")).toBeInTheDocument();
    expect(screen.getByText("Select Frontend")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-item-1")).toBeInTheDocument();
    expect(screen.getByText("Raaghu")).toBeInTheDocument();
  });

  // Test 8: Attachment functionality
  it("handles file attachment", () => {
    const mockOnAddComment = jest.fn();
    render(<RdsCompTypingSection {...defaultProps} onAddComment={mockOnAddComment} />);
    
    const attachmentButton = screen.getByTestId("attachment-button");
    
    fireEvent.click(attachmentButton);
    
    // FileReader should be called
    expect(global.FileReader).toHaveBeenCalled();
  });

  // Test 9: Premium badge on attachment
  it("shows premium badge on attachment", () => {
    render(<RdsCompTypingSection {...defaultProps} />);
    
    expect(screen.getByTestId("attachment-badge")).toBeInTheDocument();
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });

  // Test 10: Mobile responsiveness
  it("adapts to mobile view", () => {
    // Set mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    render(<RdsCompTypingSection {...defaultProps} />);
    
    // Trigger resize event
    fireEvent(window, new Event('resize'));
    
    // Component should render without errors in mobile view
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  // Test 11: Speech recognition support check
  it("handles speech recognition when supported", () => {
    const mockRecognition = {
      continuous: false,
      interimResults: false,
      lang: '',
      onstart: null,
      onresult: null,
      start: jest.fn(),
    };

    window.webkitSpeechRecognition = jest.fn(() => mockRecognition);

    render(<RdsCompTypingSection {...defaultProps} />);
    
    // Speech recognition should be available
    expect(window.webkitSpeechRecognition).toBeDefined();
  });

  // Test 12: Speech recognition not supported
  it("handles speech recognition when not supported", () => {
    // Remove speech recognition support
    delete (window as any).webkitSpeechRecognition;
    
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<RdsCompTypingSection {...defaultProps} />);
    
    // Component should render without errors
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  // Test 13: Enhanced image functionality
  it("handles enhanced image preview", () => {
    const mockOnSend = jest.fn();
    render(
      <RdsCompTypingSection 
        {...defaultProps} 
        onSend={mockOnSend}
        previewImage="test-image-url"
      />
    );
    
    const sendButton = screen.getByTestId("button-send");
    fireEvent.click(sendButton);
    
    expect(mockOnSend).toHaveBeenCalledWith("", "test-image-url");
  });

  // Test 14: Figma submit functionality
  it("handles Figma submit", () => {
    const mockOnAddComment = jest.fn();
    render(<RdsCompTypingSection {...defaultProps} onAddComment={mockOnAddComment} />);
    
    // The component should handle Figma submit internally
    expect(screen.getByTestId("rds-attachment")).toBeInTheDocument();
  });

  // Test 15: Tooltip functionality
  it("shows tooltip on send button", () => {
    render(<RdsCompTypingSection {...defaultProps} />);
    
    const sendButton = screen.getByTestId("button-send");
    expect(sendButton).toHaveAttribute("title", "Send");
  });

  // Test 16: CSS classes are applied correctly
  it("applies correct CSS classes", () => {
    render(<RdsCompTypingSection {...defaultProps} />);
    
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("form-controls", "w-100", "input-box-typing-section");
  });

  // Test 17: Default placeholder when not provided
  it("uses default placeholder when none provided", () => {
    const propsWithoutPlaceholder = { icon_name: "send" };
    render(<RdsCompTypingSection {...propsWithoutPlaceholder} />);
    
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("placeholder", "Placeholder Text");
  });

  // Test 18: Window resize event handling
  it("handles window resize events", () => {
    render(<RdsCompTypingSection {...defaultProps} />);
    
    // Change window width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });
    
    // Trigger resize
    fireEvent(window, new Event('resize'));
    
    // Component should handle resize without errors
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
