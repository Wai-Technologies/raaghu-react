// filepath: e:\OneDrive - WAi Technologies\Raaghu Design System Projects\docmentation\raaghu-react\raaghu-components\__tests__\rds-comp-integration.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompIntegration from "../src/rds-comp-integration/rds-comp-integration";

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

// Mock the rds-elements used in the integration component
jest.mock("../src/rds-elements", () => ({
  RdsAppDetail: jest.fn(({ appDetailsItem }) => (
    <div data-testid="app-detail" className="app-detail-mock">
      <div data-testid="app-name">{appDetailsItem.name}</div>
      <div data-testid="app-description">{appDetailsItem.description}</div>
      <div data-testid="app-installed">{appDetailsItem.installed ? "Installed" : "Not Installed"}</div>
      <div data-testid="app-type">{appDetailsItem.type}</div>
    </div>
  )),
  RdsButton: jest.fn(({ 
    class: buttonClass, 
    label, 
    colorVariant, 
    size, 
    dataTestId, 
    onClick 
  }) => (
    <button
      className={buttonClass}
      data-testid={dataTestId || label?.toLowerCase()}
      data-size={size}
      data-variant={colorVariant}
      onClick={onClick}
    >
      {label}
    </button>
  )),
  RdsSpinner: jest.fn(({ spinnerType, colorVariant, size }) => (
    <div 
      data-testid="spinner" 
      data-type={spinnerType} 
      data-color={colorVariant}
      data-size={size}
    />
  ))
}));

// Sample integration items for testing
const mockIntegrationList = [
  {
    id: "1",
    name: "Integration 1",
    description: "This is integration 1 description",
    installed: true,
    type: "API",
    icon: "integration1.png"
  },
  {
    id: "2",
    name: "Integration 2",
    description: "This is integration 2 description",
    installed: false,
    type: "Service",
    icon: "integration2.png"
  },
  {
    id: "3",
    name: "Integration 3",
    description: "This is integration 3 description",
    installed: true,
    type: "Extension",
    icon: "integration3.png"
  }
];

describe("RdsCompIntegration Component", () => {
  // Test basic rendering
  test("should render the integration component with data", () => {
    const { container } = render(
      <RdsCompIntegration integrationList={mockIntegrationList} />
    );

    // The component should render without errors
    expect(container).toBeInTheDocument();
    
    // Check if all app details are rendered
    const appDetails = screen.getAllByTestId("app-detail");
    expect(appDetails).toHaveLength(3);
  });

  // Test rendering with empty data
  test("should render correctly with empty integration list", () => {
    render(<RdsCompIntegration integrationList={[]} />);
    
    // No app details should be rendered
    const appDetails = screen.queryAllByTestId("app-detail");
    expect(appDetails).toHaveLength(0);
  });

  // Test rendering of individual items
  test("should display correct information for each integration item", () => {
    render(<RdsCompIntegration integrationList={mockIntegrationList} />);
    
    // Check if the first integration's data is correctly displayed
    const appNames = screen.getAllByTestId("app-name");
    expect(appNames[0]).toHaveTextContent("Integration 1");
    expect(appNames[1]).toHaveTextContent("Integration 2");
    expect(appNames[2]).toHaveTextContent("Integration 3");
    
    // Check descriptions
    const appDescriptions = screen.getAllByTestId("app-description");
    expect(appDescriptions[0]).toHaveTextContent("This is integration 1 description");
    expect(appDescriptions[1]).toHaveTextContent("This is integration 2 description");
    expect(appDescriptions[2]).toHaveTextContent("This is integration 3 description");
    
    // Check installed status
    const appInstalled = screen.getAllByTestId("app-installed");
    expect(appInstalled[0]).toHaveTextContent("Installed");
    expect(appInstalled[1]).toHaveTextContent("Not Installed");
    expect(appInstalled[2]).toHaveTextContent("Installed");
  });
  
  // Test responsive layout (row and column classes)
  test("should have proper responsive layout classes", () => {
    const { container } = render(
      <RdsCompIntegration integrationList={mockIntegrationList} />
    );
    
    // Check if row class is applied
    const rowElement = container.querySelector(".row");
    expect(rowElement).toBeInTheDocument();
    
    // Check if column classes are applied
    const columnElements = container.querySelectorAll(".col-md-4");
    expect(columnElements.length).toBe(3);
  });
});