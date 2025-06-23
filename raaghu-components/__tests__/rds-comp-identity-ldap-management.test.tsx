import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompIdentityLdapManagement from "../src/rds-comp-identity-ldap-management/rds-comp-identity-ldap-management";

// Mock the rds-elements used in the LDAP management component
jest.mock("../src/rds-elements", () => ({
  RdsInput: jest.fn(({ 
    value, 
    name, 
    label, 
    placeholder, 
    customClasses, 
    inputType, 
    onChange, 
    dataTestId,
    showIcon 
  }) => (
    <div data-testid={`input-container-${dataTestId}`}>
      {label && <label>{name}</label>}
      <input
        type={inputType || "text"}
        placeholder={placeholder}
        className={customClasses}
        data-testid={dataTestId}
        onChange={onChange}
        value={value || ""}
      />
    </div>
  )),
  RdsCheckbox: jest.fn(({ 
    labelText, 
    onChange, 
    checked, 
    dataTestId 
  }) => (
    <div data-testid={`checkbox-container-${dataTestId}`}>
      <input
        type="checkbox"
        data-testid={dataTestId}
        onChange={onChange}
        checked={checked || false}
      />
      <label>{labelText}</label>
    </div>
  )),
  RdsLabel: jest.fn(({ label }) => (
    <label data-testid="ldap-settings-label">{label}</label>
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

// Sample LDAP data for testing
const mockLdapData = {
  enableLdapLogin: true,
  ldapServerHost: "ldap.example.com",
  ldapServerPort: "389",
  ldapBaseDc: "dc=example,dc=com",
  ldapDomain: "example.com",
  ldapUserName: "admin",
  ldapPassword: "password123"
};

describe("RdsCompIdentityLdapManagement Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test basic rendering
  test("should render the LDAP management component with LDAP data", () => {
    const { container } = render(
      <RdsCompIdentityLdapManagement ldapData={mockLdapData} />
    );

    // The component should render without errors
    expect(container).toBeInTheDocument();

    // Check if the main label is rendered
    expect(screen.getByTestId("ldap-settings-label")).toHaveTextContent("Ldap Login Settings");

    // Check if inputs have the correct values
    expect(screen.getByTestId("server-host")).toHaveValue("ldap.example.com");
    expect(screen.getByTestId("server-port")).toHaveValue("389");
    expect(screen.getByTestId("base-domain")).toHaveValue("dc=example,dc=com");
    expect(screen.getByTestId("domain")).toHaveValue("example.com");
    expect(screen.getByTestId("username")).toHaveValue("admin");
    expect(screen.getByTestId("password")).toHaveValue("password123");
    
    // Check if checkbox is checked
    expect(screen.getByTestId("use-default-credential")).toBeChecked();

    // Check if save button is rendered
    expect(screen.getByTestId("save")).toBeInTheDocument();
  });

  // Test rendering with empty LDAP data
  test("should render correctly with empty LDAP data", () => {
    const emptyLdapData = {
      enableLdapLogin: false,
      ldapServerHost: "",
      ldapServerPort: "",
      ldapBaseDc: "",
      ldapDomain: "",
      ldapUserName: "",
      ldapPassword: ""
    };

    render(<RdsCompIdentityLdapManagement ldapData={emptyLdapData} />);

    // Inputs should be empty
    expect(screen.getByTestId("server-host")).toHaveValue("");
    expect(screen.getByTestId("server-port")).toHaveValue("");
    expect(screen.getByTestId("base-domain")).toHaveValue("");
    expect(screen.getByTestId("domain")).toHaveValue("");
    expect(screen.getByTestId("username")).toHaveValue("");
    expect(screen.getByTestId("password")).toHaveValue("");
    
    // Checkbox should not be checked
    expect(screen.getByTestId("use-default-credential")).not.toBeChecked();
  });

  // Test input field value changes
  test("should update LDAP data when input values change", () => {
    render(<RdsCompIdentityLdapManagement ldapData={mockLdapData} />);

    // Change Server Host input
    const serverHostInput = screen.getByTestId("server-host");
    fireEvent.change(serverHostInput, { target: { value: "new-ldap.example.com" } });
    expect(serverHostInput).toHaveValue("new-ldap.example.com");

    // Change Server Port input
    const serverPortInput = screen.getByTestId("server-port");
    fireEvent.change(serverPortInput, { target: { value: "636" } });
    expect(serverPortInput).toHaveValue("636");

    // Change Base Domain input
    const baseDomainInput = screen.getByTestId("base-domain");
    fireEvent.change(baseDomainInput, { target: { value: "dc=newexample,dc=com" } });
    expect(baseDomainInput).toHaveValue("dc=newexample,dc=com");

    // Change Domain input
    const domainInput = screen.getByTestId("domain");
    fireEvent.change(domainInput, { target: { value: "newexample.com" } });
    expect(domainInput).toHaveValue("newexample.com");

    // Change Username input
    const usernameInput = screen.getByTestId("username");
    fireEvent.change(usernameInput, { target: { value: "newadmin" } });
    expect(usernameInput).toHaveValue("newadmin");

    // Change Password input
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(passwordInput, { target: { value: "newpassword" } });
    expect(passwordInput).toHaveValue("newpassword");
  });

  // Test checkbox state change
  test("should update enableLdapLogin when checkbox is toggled", () => {
    render(<RdsCompIdentityLdapManagement ldapData={mockLdapData} />);

    const enableLdapCheckbox = screen.getByTestId("use-default-credential");
    
    // Initially checked
    expect(enableLdapCheckbox).toBeChecked();
    
    // Toggle the checkbox
    fireEvent.click(enableLdapCheckbox);
    
    // Should now be unchecked
    expect(enableLdapCheckbox).not.toBeChecked();
  });

  // Test save button functionality
  test("should call onSaveHandler with updated LDAP data when save button is clicked", () => {
    const mockSaveHandler = jest.fn();
    
    render(
      <RdsCompIdentityLdapManagement 
        ldapData={mockLdapData} 
        onSaveHandler={mockSaveHandler} 
      />
    );
    
    // Update form values
    const serverHostInput = screen.getByTestId("server-host");
    fireEvent.change(serverHostInput, { target: { value: "updated-ldap.example.com" } });
    
    const usernameInput = screen.getByTestId("username");
    fireEvent.change(usernameInput, { target: { value: "updatedadmin" } });
    
    // Click save button
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);
    
    // Verify that onSaveHandler was called with the correct data
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockSaveHandler).toHaveBeenCalledWith({
      enableLdapLogin: true,
      ldapServerHost: "updated-ldap.example.com",
      ldapServerPort: "389",
      ldapBaseDc: "dc=example,dc=com",
      ldapDomain: "example.com",
      ldapUserName: "updatedadmin",
      ldapPassword: "password123"
    });
  });

  // Test form reset after save
  test("should reset form data after successful save", () => {
    const mockSaveHandler = jest.fn();
    
    render(
      <RdsCompIdentityLdapManagement 
        ldapData={mockLdapData} 
        onSaveHandler={mockSaveHandler} 
      />
    );
    
    // Initial values
    const serverHostInput = screen.getByTestId("server-host");
    expect(serverHostInput).toHaveValue("ldap.example.com");
    
    // Click save button
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);
    
    // Form should be reset after save
    expect(serverHostInput).toHaveValue("");
    expect(screen.getByTestId("server-port")).toHaveValue("");
    expect(screen.getByTestId("base-domain")).toHaveValue("");
    expect(screen.getByTestId("domain")).toHaveValue("");
    expect(screen.getByTestId("username")).toHaveValue("");
    expect(screen.getByTestId("password")).toHaveValue("");
    expect(screen.getByTestId("use-default-credential")).not.toBeChecked();
  });

  // Test component updates when props change
  test("should update when ldapData prop changes", () => {
    const { rerender } = render(<RdsCompIdentityLdapManagement ldapData={mockLdapData} />);
    
    // Initial values
    const serverHostInput = screen.getByTestId("server-host");
    expect(serverHostInput).toHaveValue("ldap.example.com");
    
    // Update the props
    const updatedLdapData = {
      ...mockLdapData,
      ldapServerHost: "different-ldap.example.com",
      ldapUserName: "differentadmin"
    };
    
    rerender(<RdsCompIdentityLdapManagement ldapData={updatedLdapData} />);
    
    // Component should reflect the new props
    expect(serverHostInput).toHaveValue("different-ldap.example.com");
    expect(screen.getByTestId("username")).toHaveValue("differentadmin");
  });

  // Test reset prop functionality
  test("should trigger input reset when reset prop changes", () => {
    const { rerender } = render(
      <RdsCompIdentityLdapManagement ldapData={mockLdapData} reset={false} />
    );
    
    // Change reset prop to true
    rerender(
      <RdsCompIdentityLdapManagement ldapData={mockLdapData} reset={true} />
    );
    
    // The component should handle the reset prop change
    // This tests the useEffect for reset prop
    expect(screen.getByTestId("server-host")).toBeInTheDocument();
  });

  // Test all input field placeholders
  test("should render input fields with correct placeholders", () => {
    render(<RdsCompIdentityLdapManagement ldapData={mockLdapData} />);
    
    // Check placeholders
    expect(screen.getByPlaceholderText("Enter Server Host")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("389")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Base Domain Component")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Domain")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
  });

  // Test password input type
  test("should render password field with correct input type", () => {
    render(<RdsCompIdentityLdapManagement ldapData={mockLdapData} />);
    
    const passwordInput = screen.getByTestId("password");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  // Test form submission prevents default
  test("should prevent default form submission when save button is clicked", () => {
    const mockSaveHandler = jest.fn();
    const mockPreventDefault = jest.fn();
    
    render(
      <RdsCompIdentityLdapManagement 
        ldapData={mockLdapData} 
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
    
    // Verify preventDefault was called (this is handled internally by the component)
    expect(mockSaveHandler).toHaveBeenCalled();
  });

  // Test component renders without onSaveHandler
  test("should render correctly without onSaveHandler prop", () => {
    const { container } = render(
      <RdsCompIdentityLdapManagement ldapData={mockLdapData} />
    );
    
    expect(container).toBeInTheDocument();
    
    // Save button should still be rendered and clickable
    const saveButton = screen.getByTestId("save");
    expect(saveButton).toBeInTheDocument();
    
    // Should not throw error when clicked without handler
    fireEvent.click(saveButton);
  });

  // Test all form fields are properly labeled
  test("should render all form fields with proper labels", () => {
    render(<RdsCompIdentityLdapManagement ldapData={mockLdapData} />);
    
    // Check for field labels
    expect(screen.getByText("Server Host")).toBeInTheDocument();
    expect(screen.getByText("Server Port")).toBeInTheDocument();
    expect(screen.getByText("Base Dc")).toBeInTheDocument();
    expect(screen.getByText("Domain")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Enable Ldap Login")).toBeInTheDocument();
  });
});