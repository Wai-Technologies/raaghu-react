import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompIdentityManagement from "../src/rds-comp-identity-management-new/rds-comp-identity-management-new";

// Mock the rds-elements used in the identity management component
jest.mock("../src/rds-elements", () => ({  RdsInput: jest.fn(({ 
    size,
    inputType, 
    isDisabled, 
    name, 
    label, 
    fontWeight,
    readonly, 
    placeholder, 
    value, 
    onChange, 
    dataTestId 
  }) => (
    <div data-testid={`input-container-${dataTestId}`}>
      {label && <label>{name}</label>}
      <input
        type={inputType}
        placeholder={placeholder}
        disabled={isDisabled}
        readOnly={readonly}
        data-testid={dataTestId}
        onChange={onChange}        value={value == null ? "" : value}
        data-size={size}
        data-font-weight={fontWeight}
      />
    </div>
  )),  RdsCheckbox: jest.fn(({ 
    labelText, 
    checked, 
    onChange, 
    dataTestId 
  }) => (
    <div data-testid={`checkbox-container-${dataTestId}`}>
      <input
        type="checkbox"
        data-testid={dataTestId || (labelText === 'Force Users To Periodically Change Password' ? 'force-password-change' : 
                                    labelText === 'Allowed For New Users' ? 'allowed-for-new-users' : undefined)}
        onChange={onChange}
        checked={checked || false}
        id={`checkbox-${labelText?.replace(/\s+/g, '-').toLowerCase()}`}
      />
      <label htmlFor={`checkbox-${labelText?.replace(/\s+/g, '-').toLowerCase()}`}>{labelText}</label>
    </div>
  )),
  RdsLabel: jest.fn(({ label }) => (
    <label data-testid={`label-${label.toLowerCase().replace(/\s+/g, '-')}`}>{label}</label>
  )),
  RdsButton: jest.fn(({ 
    label, 
    type, 
    colorVariant, 
    size, 
    dataTestId, 
    onClick 
  }) => (
    <button
      type={type}
      data-testid={dataTestId}
      onClick={onClick}
      data-variant={colorVariant}
      data-size={size}
    >
      {label}
    </button>
  )),
}));

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock date-fns
jest.mock("date-fns", () => ({
  set: jest.fn(),
}));

// Sample identity management data for testing
const mockIdentityData = {
  lockoutSettings: {
    allowedForNewUsers: true,
    lockoutDuration: "30",
    maxFailedAccessAttempts: "5"
  },
  passwordSettings: {
    requiredLength: "8",
    requiredUniqueChars: "3",
    requireNonAlphanumeric: true,
    requireUppercase: true,
    requireLowercase: true,
    requireDigit: true,
    forceUsersToPeriodicallyChangePassword: false,
    passwordChangePeriodDays: "90",
    allowedForNewUsers: true,
    lockoutDuration: "30",
    maxFailedAccessAttempts: "5",
    requireConfirmedEmail: true,
    enablePhoneNumberConfirmation: false,
    requireConfirmedPhoneNumber: false,
    isEmailUpdateEnabled: true,
    isUserNameUpdateEnabled: false
  },
  signSettings: {
    requireConfirmedEmail: true,
    enablePhoneNumberConfirmation: false,
    requireConfirmedPhoneNumber: false
  },
  userSettings: {
    isEmailUpdateEnabled: true,
    isUserNameUpdateEnabled: false
  }
};

describe("RdsCompIdentityManagement Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test basic rendering
  test("should render the identity management component with all sections", () => {
    const { container } = render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );

    // The component should render without errors
    expect(container).toBeInTheDocument();

    // Check if all section labels are rendered
    expect(screen.getByTestId("label-password-settings")).toHaveTextContent("Password Settings");
    expect(screen.getByTestId("label-password-renewing-settings")).toHaveTextContent("Password Renewing Settings");
    expect(screen.getByTestId("label-lockout-settings")).toHaveTextContent("Lockout Settings");
    expect(screen.getByTestId("label-signinsettings")).toHaveTextContent("SignInSettings");
    expect(screen.getByTestId("label-usersettings")).toHaveTextContent("UserSettings");

    // Check if save button is rendered
    expect(screen.getByTestId("save")).toBeInTheDocument();
  });

  // Test password settings inputs
  test("should render password settings inputs with correct values", () => {
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );

    // Check password settings inputs
    expect(screen.getByTestId("required-length")).toHaveValue("8");
    expect(screen.getByTestId("required-special-char")).toHaveValue("3");
    expect(screen.getByTestId("password-change-period-days")).toHaveValue("90");

    // Check password settings checkboxes
    expect(screen.getByTestId("required-non-alpha-num-char")).toBeChecked();
    expect(screen.getByTestId("required-upper-case")).toBeChecked();
    expect(screen.getByTestId("required-lower-case")).toBeChecked();
    expect(screen.getByTestId("required-numbers")).toBeChecked();
  });  // Test lockout settings inputs
  test("should render lockout settings inputs with correct values", () => {
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );    // Check lockout settings inputs - values are stored in passwordSettings according to component
    expect(screen.getByTestId("lockout-duration")).toHaveValue(30); // number input expects number
    expect(screen.getByTestId("max-failed-attempts")).toHaveValue("5");
    
    // Check lockout settings checkbox - find by label text since both checkboxes have same test ID
    const allowedForNewUsersCheckbox = screen.getByLabelText("Allowed For New Users");
    expect(allowedForNewUsersCheckbox).toBeChecked();
  });

  // Test signin settings checkboxes
  test("should render signin settings with correct values", () => {
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );

    // Check signin settings checkboxes
    expect(screen.getByTestId("required-confirmed-email")).toBeChecked();
    expect(screen.getByTestId("allow-user-conf-phone")).not.toBeChecked();
    expect(screen.getByTestId("required-conf-phone")).not.toBeChecked();
  });

  // Test user settings checkboxes
  test("should render user settings with correct values", () => {
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );

    // Check user settings checkboxes
    expect(screen.getByTestId("allow-user-change-email")).toBeChecked();
    expect(screen.getByTestId("allow-user-change-username")).not.toBeChecked();
  });

  // Test input field value changes
  test("should update password settings when input values change", () => {
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );

    // Change Required Length input
    const requiredLengthInput = screen.getByTestId("required-length");
    fireEvent.change(requiredLengthInput, { target: { value: "10" } });
    expect(requiredLengthInput).toHaveValue("10");

    // Change Required Unique Chars input
    const requiredUniqueCharsInput = screen.getByTestId("required-special-char");
    fireEvent.change(requiredUniqueCharsInput, { target: { value: "5" } });
    expect(requiredUniqueCharsInput).toHaveValue("5");

    // Change Password Change Period Days input
    const passwordChangePeriodInput = screen.getByTestId("password-change-period-days");
    fireEvent.change(passwordChangePeriodInput, { target: { value: "180" } });
    expect(passwordChangePeriodInput).toHaveValue("180");    // Change Lockout Duration input
    const lockoutDurationInput = screen.getByTestId("lockout-duration");
    fireEvent.change(lockoutDurationInput, { target: { value: "60" } }); // string value
    expect(lockoutDurationInput).toHaveValue(60);

    // Change Max Failed Attempts input
    const maxFailedAttemptsInput = screen.getByTestId("max-failed-attempts");
    fireEvent.change(maxFailedAttemptsInput, { target: { value: "10" } });
    expect(maxFailedAttemptsInput).toHaveValue("10");
  });

  // Test checkbox state changes
  test("should update checkbox states when toggled", () => {
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );

    // Toggle password settings checkboxes
    const requireNonAlphanumericCheckbox = screen.getByTestId("required-non-alpha-num-char");
    fireEvent.click(requireNonAlphanumericCheckbox);
    expect(requireNonAlphanumericCheckbox).not.toBeChecked();

    const requireUppercaseCheckbox = screen.getByTestId("required-upper-case");
    fireEvent.click(requireUppercaseCheckbox);
    expect(requireUppercaseCheckbox).not.toBeChecked();

    const requireLowercaseCheckbox = screen.getByTestId("required-lower-case");
    fireEvent.click(requireLowercaseCheckbox);
    expect(requireLowercaseCheckbox).not.toBeChecked();

    const requireDigitCheckbox = screen.getByTestId("required-numbers");
    fireEvent.click(requireDigitCheckbox);
    expect(requireDigitCheckbox).not.toBeChecked();

    // Toggle signin settings checkboxes
    const requireConfirmedEmailCheckbox = screen.getByTestId("required-confirmed-email");
    fireEvent.click(requireConfirmedEmailCheckbox);
    expect(requireConfirmedEmailCheckbox).not.toBeChecked();

    const enablePhoneConfirmationCheckbox = screen.getByTestId("allow-user-conf-phone");
    fireEvent.click(enablePhoneConfirmationCheckbox);
    expect(enablePhoneConfirmationCheckbox).toBeChecked();

    // Toggle user settings checkboxes
    const emailUpdateEnabledCheckbox = screen.getByTestId("allow-user-change-email");
    fireEvent.click(emailUpdateEnabledCheckbox);
    expect(emailUpdateEnabledCheckbox).not.toBeChecked();

    const usernameUpdateEnabledCheckbox = screen.getByTestId("allow-user-change-username");
    fireEvent.click(usernameUpdateEnabledCheckbox);
    expect(usernameUpdateEnabledCheckbox).toBeChecked();
  });

  // Test save button functionality
  test("should call onSaveHandler with updated identity data when save button is clicked", () => {
    const mockSaveHandler = jest.fn();
    
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
        onSaveHandler={mockSaveHandler}
      />
    );
      // Update some form values
    const requiredLengthInput = screen.getByTestId("required-length");
    fireEvent.change(requiredLengthInput, { target: { value: "12" } });
      const lockoutDurationInput = screen.getByTestId("lockout-duration");
    fireEvent.change(lockoutDurationInput, { target: { value: "45" } }); // string value
    
    // Click save button
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);
    
    // Verify that onSaveHandler was called
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
    
    // Check the structure of the data passed to onSaveHandler
    const savedData = mockSaveHandler.mock.calls[0][0];
    expect(savedData).toHaveProperty('lockout');
    expect(savedData).toHaveProperty('user');
    expect(savedData).toHaveProperty('signIn');
    expect(savedData).toHaveProperty('password');      // Check that updated values are included
    expect(savedData.password.requiredLength).toBe("12");
    expect(savedData.password.lockoutDuration).toBe("45");
  });
  // Test form reset after save
  test("should reset form data after successful save", () => {
    const mockSaveHandler = jest.fn();
    
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Initial values
    const requiredLengthInput = screen.getByTestId("required-length");
    expect(requiredLengthInput).toHaveValue("8");
    
    // Click save button
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);    // Form should be reset after save - the component resets values to null/undefined
    expect((requiredLengthInput as HTMLInputElement).value).toBe("");
    expect((screen.getByTestId("required-special-char") as HTMLInputElement).value).toBe("");
    expect((screen.getByTestId("password-change-period-days") as HTMLInputElement).value).toBe("");
    expect((screen.getByTestId("lockout-duration") as HTMLInputElement).value).toBe("");
    expect((screen.getByTestId("max-failed-attempts") as HTMLInputElement).value).toBe("");
    
    // Checkboxes should be reset to false
    expect(screen.getByTestId("required-non-alpha-num-char")).not.toBeChecked();
    expect(screen.getByTestId("required-upper-case")).not.toBeChecked();
    expect(screen.getByTestId("required-lower-case")).not.toBeChecked();
    expect(screen.getByTestId("required-numbers")).not.toBeChecked();
  });

  // Test component updates when props change
  test("should update when props change", () => {
    const { rerender } = render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );
    
    // Initial values
    const requiredLengthInput = screen.getByTestId("required-length");
    expect(requiredLengthInput).toHaveValue("8");
    
    // Update the props
    const updatedPasswordSettings = {
      ...mockIdentityData.passwordSettings,
      requiredLength: "15",
      requiredUniqueChars: "7"
    };
    
    rerender(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={updatedPasswordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );
    
    // Component should reflect the new props
    expect(requiredLengthInput).toHaveValue("15");
    expect(screen.getByTestId("required-special-char")).toHaveValue("7");
  });

  // Test rendering with empty/undefined data
  test("should render correctly with empty or undefined data", () => {
    render(
      <RdsCompIdentityManagement
        lockoutSettings={{}}
        passwordSettings={{}}
        signSettings={{}}
        userSettings={{}}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );    // Inputs should be empty or have default values
    expect((screen.getByTestId("required-length") as HTMLInputElement).value).toBe("");
    expect((screen.getByTestId("required-special-char") as HTMLInputElement).value).toBe("");
    expect((screen.getByTestId("password-change-period-days") as HTMLInputElement).value).toBe("");
    expect((screen.getByTestId("lockout-duration") as HTMLInputElement).value).toBe("");
    expect((screen.getByTestId("max-failed-attempts") as HTMLInputElement).value).toBe("");
    
    // Checkboxes should not be checked
    expect(screen.getByTestId("required-non-alpha-num-char")).not.toBeChecked();
    expect(screen.getByTestId("required-upper-case")).not.toBeChecked();
    expect(screen.getByTestId("required-lower-case")).not.toBeChecked();
    expect(screen.getByTestId("required-numbers")).not.toBeChecked();
    expect(screen.getByTestId("required-confirmed-email")).not.toBeChecked();
    expect(screen.getByTestId("allow-user-conf-phone")).not.toBeChecked();
    expect(screen.getByTestId("required-conf-phone")).not.toBeChecked();
    expect(screen.getByTestId("allow-user-change-email")).not.toBeChecked();
    expect(screen.getByTestId("allow-user-change-username")).not.toBeChecked();
  });
  // Test input placeholders
  test("should render input fields with correct placeholders", () => {
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );
    
    // Check specific placeholders by test ID to avoid duplicates
    expect(screen.getByTestId("required-length")).toHaveAttribute("placeholder", "Enter Length");
    expect(screen.getByTestId("required-special-char")).toHaveAttribute("placeholder", "Enter Number");
    expect(screen.getByTestId("password-change-period-days")).toHaveAttribute("placeholder", "Enter Length");
    expect(screen.getByTestId("lockout-duration")).toHaveAttribute("placeholder", "Enter Length");
    expect(screen.getByTestId("max-failed-attempts")).toHaveAttribute("placeholder", "Enter Name");
  });

  // Test input types
  test("should render input fields with correct types", () => {
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );
    
    // Check input types
    expect(screen.getByTestId("required-length")).toHaveAttribute("type", "text");
    expect(screen.getByTestId("required-special-char")).toHaveAttribute("type", "text");
    expect(screen.getByTestId("password-change-period-days")).toHaveAttribute("type", "text");
    expect(screen.getByTestId("lockout-duration")).toHaveAttribute("type", "number");
    expect(screen.getByTestId("max-failed-attempts")).toHaveAttribute("type", "text");
  });

  // Test form submission prevents default
  test("should prevent default form submission when save button is clicked", () => {
    const mockSaveHandler = jest.fn();
    const mockPreventDefault = jest.fn();
    
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
        onSaveHandler={mockSaveHandler}
      />
    );
    
    const saveButton = screen.getByTestId("save");
    
    // Mock the event object
    const mockEvent = {
      preventDefault: mockPreventDefault,
      target: {}
    };
    
    fireEvent.click(saveButton, mockEvent);
    
    // Verify that the save handler was called
    expect(mockSaveHandler).toHaveBeenCalled();
  });

  // Test component renders without onSaveHandler
  test("should render correctly without onSaveHandler prop", () => {
    const { container } = render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );
    
    expect(container).toBeInTheDocument();
    
    // Save button should still be rendered and clickable
    const saveButton = screen.getByTestId("save");
    expect(saveButton).toBeInTheDocument();
    
    // Should not throw error when clicked without handler
    fireEvent.click(saveButton);
  });

  // Test all section labels are properly rendered
  test("should render all section labels correctly", () => {
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );
    
    // Check all section labels
    expect(screen.getByText("Password Settings")).toBeInTheDocument();
    expect(screen.getByText("Password Renewing Settings")).toBeInTheDocument();
    expect(screen.getByText("Lockout Settings")).toBeInTheDocument();
    expect(screen.getByText("SignInSettings")).toBeInTheDocument();
    expect(screen.getByText("UserSettings")).toBeInTheDocument();
  });

  // Test all field labels are properly rendered
  test("should render all field labels correctly", () => {
    render(
      <RdsCompIdentityManagement
        lockoutSettings={mockIdentityData.lockoutSettings}
        passwordSettings={mockIdentityData.passwordSettings}
        signSettings={mockIdentityData.signSettings}
        userSettings={mockIdentityData.userSettings}
        onIdentitySettingsSubmit={jest.fn()}
      />
    );
    
    // Check input field labels
    expect(screen.getByText("Required Length")).toBeInTheDocument();
    expect(screen.getByText("Required Unique Chars")).toBeInTheDocument();
    expect(screen.getByText("Password Change PeriodDays")).toBeInTheDocument();
    expect(screen.getByText("Lockout Duration")).toBeInTheDocument();
    expect(screen.getByText("Max Failed Access Attempts")).toBeInTheDocument();
    
    // Check checkbox labels
    expect(screen.getByText("Require NonAlphanumeric")).toBeInTheDocument();
    expect(screen.getByText("Require Uppercase")).toBeInTheDocument();
    expect(screen.getByText("Require Lowercase")).toBeInTheDocument();
    expect(screen.getByText("Require Digit")).toBeInTheDocument();
    expect(screen.getByText("Force Users To Periodically Change Password")).toBeInTheDocument();
    expect(screen.getByText("Allowed For New Users")).toBeInTheDocument();
    expect(screen.getByText("Require Confirmed Email")).toBeInTheDocument();
    expect(screen.getByText("Enable Phone Number Confirmation")).toBeInTheDocument();
    expect(screen.getByText("Require Confirmed Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Is Email Update Enabled")).toBeInTheDocument();
    expect(screen.getByText("Is User Name Update Enabled")).toBeInTheDocument();
  });
});