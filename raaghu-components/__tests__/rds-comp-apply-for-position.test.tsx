import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import RdsCompApplyForPosition from "../src/rds-comp-apply-for-position/rds-comp-apply-for-position";

interface FileUploaderProps {
  label: string;
  multiple?: boolean;
  extensions?: string;
  onFileArray: (files: File[]) => void;
}

// Mock the rds-elements components
jest.mock("../src/rds-elements", () => ({
  RdsInput: ({
    label,
    name,
    inputType,
    placeholder,
    value,
    onChange,
    onKeyDown,
    dataTestId,
    required,
  }: any) => (
    <div className="form-group">
      {label && <label>{name}</label>}
      <input
        type={inputType}
        className="form-control"
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        onKeyDown={onKeyDown}
        data-testid={dataTestId}
        required={required}
      />
    </div>
  ),
  RdsButton: ({
    onClick,
    isDisabled,
    dataTestId,
    label,
    type = "button",
  }: any) => (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      data-testid={dataTestId}
      className="btn"
    >
      {label}
    </button>
  ),
  RdsTextArea: ({
    label,
    placeholder,
    value,
    onChange,
    rows,
    dataTestId,
  }: any) => (
    <div className="form-group">
      {label && <label>{label}</label>}
      <textarea
        className="form-control"
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        rows={rows}
        data-testid={dataTestId}
      />
    </div>
  ),
  RdsFileUploader: ({
    label,
    multiple,
    extensions,
    onFileArray,
  }: FileUploaderProps) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="file"
        className="form-control"
        data-testid="file-upload"
        multiple={multiple}
        accept={extensions?.split(',').map((ext: string) => `.${ext.trim()}`).join(',')}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
          onFileArray(Array.from(e.target.files || []))
        }
      />
    </div>
  ),
  RdsCompLabel: ({ label }: any) => <label>{label}</label>,
}));

// Mock i18n
jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("RdsCompApplyForPosition Component", () => {
  const mockApplyForPositionData = {
    email: "",
    fullName: "",
    contactNumber: "",
    position: "",
    period: "",
    coverLetter: "",
    file: [],
  };

  const mockOnSaveHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    const { container } = render(
      <RdsCompApplyForPosition
        applyForPositionData={mockApplyForPositionData}
        onSaveHandler={mockOnSaveHandler}
      />
    );
    expect(container).toBeTruthy();
  });

  it("should render all form fields", () => {
    render(
      <RdsCompApplyForPosition
        applyForPositionData={mockApplyForPositionData}
        onSaveHandler={mockOnSaveHandler}
      />
    );

    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("full-name")).toBeInTheDocument();
    expect(screen.getByTestId("contact-number")).toBeInTheDocument();
    expect(screen.getByTestId("position-name")).toBeInTheDocument();
    expect(screen.getByTestId("notice-period")).toBeInTheDocument();
    expect(screen.getByTestId("cover-letter")).toBeInTheDocument();
    expect(screen.getByText("Upload Resume")).toBeInTheDocument();
  });

  it("should update form data when fields are changed", () => {
    render(
      <RdsCompApplyForPosition
        applyForPositionData={mockApplyForPositionData}
        onSaveHandler={mockOnSaveHandler}
      />
    );

    const emailInput = screen.getByTestId("email");
    const fullNameInput = screen.getByTestId("full-name");
    const contactNumberInput = screen.getByTestId("contact-number");
    const positionInput = screen.getByTestId("position-name");
    const periodInput = screen.getByTestId("notice-period");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
    fireEvent.change(contactNumberInput, { target: { value: "+911234567890" } });
    fireEvent.change(positionInput, { target: { value: "Software Engineer" } });
    fireEvent.change(periodInput, { target: { value: "2 months" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(fullNameInput).toHaveValue("John Doe");
    expect(contactNumberInput).toHaveValue("+911234567890");
    expect(positionInput).toHaveValue("Software Engineer");
    expect(periodInput).toHaveValue("2 months");
  });  it("should handle file upload", async () => {
    render(
      <RdsCompApplyForPosition
        applyForPositionData={mockApplyForPositionData}
        onSaveHandler={mockOnSaveHandler}
      />
    );

    // Create a test file
    const file = new File(["test content"], "test.pdf", { type: "application/pdf" });
    const fileInput = screen.getByTestId("file-upload") as HTMLInputElement;

    // Fill required fields to enable submit button
    fireEvent.change(screen.getByTestId("email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByTestId("full-name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByTestId("contact-number"), { target: { value: "+911234567890" } });
    fireEvent.change(screen.getByTestId("position-name"), { target: { value: "Developer" } });
    fireEvent.change(screen.getByTestId("notice-period"), { target: { value: "2 months" } });

    // Upload file
    Object.defineProperty(fileInput, 'files', {
      value: [file]
    });
    fireEvent.change(fileInput);

    // Submit form
    const applyButton = screen.getByTestId("apply-now");
    expect(applyButton).not.toBeDisabled();
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(mockOnSaveHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          file: [file]
        })
      );
    });
  });
  it("should call onSaveHandler with form data when Apply Now is clicked", async () => {
    render(
      <RdsCompApplyForPosition
        applyForPositionData={mockApplyForPositionData}
        onSaveHandler={mockOnSaveHandler}
      />
    );

    const testData = {
      email: "test@example.com",
      fullName: "John Doe",
      contactNumber: "+911234567890",
      position: "Software Engineer",
      period: "2 months",
      coverLetter: "Test cover letter",
      file: []
    };

    // Fill in required fields
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: testData.email },
    });
    fireEvent.change(screen.getByTestId("full-name"), {
      target: { value: testData.fullName },
    });
    fireEvent.change(screen.getByTestId("contact-number"), {
      target: { value: testData.contactNumber },
    });
    fireEvent.change(screen.getByTestId("position-name"), {
      target: { value: testData.position },
    });
    fireEvent.change(screen.getByTestId("notice-period"), {
      target: { value: testData.period },
    });
    fireEvent.change(screen.getByTestId("cover-letter"), {
      target: { value: testData.coverLetter },
    });

    const applyButton = screen.getByTestId("apply-now");
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(mockOnSaveHandler).toHaveBeenCalledWith(expect.objectContaining({
        email: testData.email,
        fullName: testData.fullName,
        contactNumber: testData.contactNumber,
        position: testData.position,
        period: testData.period,
        coverLetter: testData.coverLetter
      }));
    });
  });
  it("should validate email format and enable submit button only with valid data", () => {
    render(
      <RdsCompApplyForPosition
        applyForPositionData={mockApplyForPositionData}
        onSaveHandler={mockOnSaveHandler}
      />
    );

    const emailInput = screen.getByTestId("email");
    const fullNameInput = screen.getByTestId("full-name");
    const contactInput = screen.getByTestId("contact-number");
    const positionInput = screen.getByTestId("position-name");
    const periodInput = screen.getByTestId("notice-period");
    
    // Initially disabled
    expect(screen.getByTestId("apply-now")).toBeDisabled();

    // Invalid email keeps button disabled
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
    fireEvent.change(contactInput, { target: { value: "+911234567890" } });
    fireEvent.change(positionInput, { target: { value: "Software Engineer" } });
    fireEvent.change(periodInput, { target: { value: "2 months" } });
    expect(screen.getByTestId("apply-now")).toBeDisabled();

    // Valid email and all required fields enables button
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(screen.getByTestId("apply-now")).not.toBeDisabled();
  });  it("should handle contact number input and validation", async () => {
    render(
      <RdsCompApplyForPosition
        applyForPositionData={mockApplyForPositionData}
        onSaveHandler={mockOnSaveHandler}
      />
    );

    const contactInput = screen.getByTestId("contact-number") as HTMLInputElement;
    
    // Fill other required fields first to isolate contact number validation
    fireEvent.change(screen.getByTestId("email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByTestId("full-name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByTestId("position-name"), { target: { value: "Developer" } });
    fireEvent.change(screen.getByTestId("notice-period"), { target: { value: "2 months" } });
    
    // Test input restrictions
    const simulateKeyDown = (key: string) => {
      fireEvent.keyDown(contactInput, { key });
    };

    // Should allow numbers
    simulateKeyDown("1");
    simulateKeyDown("2");
    simulateKeyDown("3");

    // Should allow plus at start
    simulateKeyDown("+");

    // Should not allow letters
    simulateKeyDown("a");
    simulateKeyDown("b");

    // Test length validation with a valid phone number
    fireEvent.change(contactInput, { target: { value: "+911234567890" } });
    expect(contactInput.value).toBe("+911234567890");

    // Verify form can be submitted with valid number
    const submitBtn = screen.getByTestId("apply-now");
    expect(submitBtn).not.toBeDisabled();

    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(mockOnSaveHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          contactNumber: "+911234567890"
        })
      );
    });

    // Final submission test with valid number
    fireEvent.change(contactInput, { target: { value: "+911234567890" } });
    const submitButton = screen.getByTestId("apply-now");
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSaveHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          contactNumber: "+911234567890"
        })
      );
    });
  });

  it("should reset form after successful submission", async () => {
    render(
      <RdsCompApplyForPosition
        applyForPositionData={mockApplyForPositionData}
        onSaveHandler={mockOnSaveHandler}
      />
    );

    // Fill form
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("full-name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("contact-number"), {
      target: { value: "+911234567890" },
    });
    fireEvent.change(screen.getByTestId("position-name"), {
      target: { value: "Software Engineer" },
    });
    fireEvent.change(screen.getByTestId("notice-period"), {
      target: { value: "2 months" },
    });

    // Submit form
    const applyButton = screen.getByTestId("apply-now");
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(screen.getByTestId("email")).toHaveValue("");
      expect(screen.getByTestId("full-name")).toHaveValue("");
      expect(screen.getByTestId("contact-number")).toHaveValue("");
      expect(screen.getByTestId("position-name")).toHaveValue("");
      expect(screen.getByTestId("notice-period")).toHaveValue("");
    });
  });
});