import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RdsCompApplicationWorkflows from "../src/rds-comp-application-workflows/rds-comp-application-workflows";

// Mock the child components
jest.mock("../src/rds-elements", () => ({
  RdsButton: (props: any) => (
    <button 
      onClick={props.onClick} 
      data-testid={props.dataTestId}
    >
      {props.label}
    </button>
  ),
  RdsCheckbox: (props: any) => (
    <div>
      <input 
        type="checkbox" 
        checked={props.checked} 
        onChange={props.onChange} 
        disabled={props.isDisabled}
        data-testid={props.dataTestId}
      />
      <label>{props.labelText}</label>
    </div>
  ),
  RdsDropdownList: (props: any) => (
    <div>
      <select onChange={(e) => props.onClick({ value: e.target.value })}>
        <option value="">{props.placeholder}</option>
        {props.listItems.map((item: any) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  ),
  RdsInput: (props: any) => (
    <div>
      {props.label && <label>{props.name}</label>}
      <input 
        type={props.inputType} 
        placeholder={props.placeholder} 
        value={props.value || ""}
        onChange={props.onChange}
      />
    </div>
  ),
  RdsTextArea: (props: any) => (
    <div>
      <label>{props.label}</label>
      <textarea 
        placeholder={props.placeholder}
        value={props.value || ""}
        onChange={props.onChange}
        disabled={props.isDisabled}
        data-testid={props.dataTestId}
        rows={props.rows}
      />
    </div>
  ),
  RdsCompSelectList: (props: any) => <div>{props.label}</div>,
}));

// Mock the i18n functionality
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

describe("RdsCompApplicationWorkflows Component", () => {
  // Mock data setup
  const mockTypeList = [
    { value: "public", label: "Public" },
    { value: "confidential", label: "Confidential" },
  ];

  const mockConsentType = [
    { value: "explicit", label: "Explicit Consent" },
    { value: "implicit", label: "Implicit Consent" },
  ];

  const mockBasicData = {
    type: "",
    clientSecret: "",
    allowAuthorizationCodeFlow: false,
    allowImplicitFlow: false,
    allowHybridFlow: false,
    allowPasswordFlow: false,
    allowRefreshTokenFlow: false,
    allowClientCredentialsFlow: false,
    allowDeviceEndpoint: false,
    redirectUris: "",
    allowLogoutEndpoint: false,
    postLogoutRedirectUris: "",
    consentType: "",
    enabled: false,
  };

  const mockHandleSubmit = jest.fn();
  const mockEditApplicationData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    const { container } = render(
      <RdsCompApplicationWorkflows
        typeList={mockTypeList}
        consentType={mockConsentType}
        handleSubmit={mockHandleSubmit}
      />
    );
    expect(container).toBeTruthy();
  });

  it("should render with provided basic data", () => {
    render(
      <RdsCompApplicationWorkflows
        basicData={mockBasicData}
        typeList={mockTypeList}
        consentType={mockConsentType}
        handleSubmit={mockHandleSubmit}
      />
    );
    
    // Verify dropdown for type is rendered
    expect(screen.getByText("Type")).toBeInTheDocument();
    
    // Verify checkboxes are rendered
    expect(screen.getByText("Allow Authorization Code Flow")).toBeInTheDocument();
    expect(screen.getByText("Allow Implicit Flow")).toBeInTheDocument();
    expect(screen.getByText("Allow Hybrid Flow")).toBeInTheDocument();
    expect(screen.getByText("Allow Password Flow")).toBeInTheDocument();
    expect(screen.getByText("Allow Refresh Token Flow")).toBeInTheDocument();
    expect(screen.getByText("Allow Client Credentials Flow")).toBeInTheDocument();
    expect(screen.getByText("Allow Device End point")).toBeInTheDocument();
    
    // Verify buttons are rendered
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("should show client secret input when type is confidential", () => {
    const customBasicData = {
      ...mockBasicData,
      type: "confidential",
    };

    render(
      <RdsCompApplicationWorkflows
        basicData={customBasicData}
        typeList={mockTypeList}
        consentType={mockConsentType}
        handleSubmit={mockHandleSubmit}
      />
    );
    
    // Check if client secret input is displayed
    expect(screen.getByText("Client Secret")).toBeInTheDocument();
  });

  it("should call handleSubmit when save button is clicked", () => {
    render(
      <RdsCompApplicationWorkflows
        basicData={mockBasicData}
        typeList={mockTypeList}
        consentType={mockConsentType}
        handleSubmit={mockHandleSubmit}
      />
    );
    
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    
    // Verify that handleSubmit was called
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it("should call editApplicationData when a checkbox is changed", () => {
    render(
      <RdsCompApplicationWorkflows
        basicData={mockBasicData}
        typeList={mockTypeList}
        consentType={mockConsentType}
        handleSubmit={mockHandleSubmit}
        editApplicationData={mockEditApplicationData}
      />
    );
    
    // Find and click the authorization code flow checkbox
    const authCodeFlowCheckbox = screen.getByTestId("authorization-flow");
    fireEvent.click(authCodeFlowCheckbox);
    
    // Verify that editApplicationData was called with updated data
    expect(mockEditApplicationData).toHaveBeenCalled();
    expect(mockEditApplicationData).toHaveBeenCalledWith(expect.objectContaining({
      allowAuthorizationCodeFlow: true
    }));
  });

  it("should enable Redirect URIs when authorization flow is enabled", () => {
    const customBasicData = {
      ...mockBasicData,
      allowAuthorizationCodeFlow: true,
    };

    render(
      <RdsCompApplicationWorkflows
        basicData={customBasicData}
        typeList={mockTypeList}
        consentType={mockConsentType}
        handleSubmit={mockHandleSubmit}
      />
    );
    
    // Get the redirect uris textarea and verify it's enabled
    const redirectUrisTextarea = screen.getByTestId("redirect-uri");
    expect(redirectUrisTextarea).not.toBeDisabled();
  });

  it("should disable client credentials flow checkbox when type is public", () => {
    const customBasicData = {
      ...mockBasicData,
      type: "public",
    };

    render(
      <RdsCompApplicationWorkflows
        basicData={customBasicData}
        typeList={mockTypeList}
        consentType={mockConsentType}
        handleSubmit={mockHandleSubmit}
      />
    );
    
    // Get the client credentials flow checkbox and verify it's disabled
    const clientCredentialsCheckbox = screen.getByTestId("client-credential-flow");
    expect(clientCredentialsCheckbox).toBeDisabled();
  });

  it("should disable refresh token flow checkbox when no other flows are enabled", () => {
    render(
      <RdsCompApplicationWorkflows
        basicData={mockBasicData}
        typeList={mockTypeList}
        consentType={mockConsentType}
        handleSubmit={mockHandleSubmit}
      />
    );
    
    // Get the refresh token flow checkbox and verify it's disabled
    const refreshTokenCheckbox = screen.getByTestId("refresh-flow");
    expect(refreshTokenCheckbox).toBeDisabled();
  });

  it("should enable post logout redirect uris when logout endpoint is enabled", () => {
    const customBasicData = {
      ...mockBasicData,
      allowAuthorizationCodeFlow: true, // This enables the logout endpoint checkbox
      allowLogoutEndpoint: true,
    };

    render(
      <RdsCompApplicationWorkflows
        basicData={customBasicData}
        typeList={mockTypeList}
        consentType={mockConsentType}
        handleSubmit={mockHandleSubmit}
      />
    );
    
    // Get the post logout redirect uris textarea and verify it's enabled
    const postLogoutRedirectUrisTextarea = screen.getByTestId("logout-redirect-uri");
    expect(postLogoutRedirectUrisTextarea).not.toBeDisabled();
  });
});