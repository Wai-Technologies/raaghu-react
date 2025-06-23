import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RdsWebsiteMatrix } from "../src";

// Mock the RdsIcon component properly to prevent fetch issues
jest.mock("../src/rds-icon/rds-icon", () => ({
  __esModule: true,
  default: jest.fn(({ name, colorVariant }) => (
    <div data-testid={`icon-${name}`} className={colorVariant ? `text-${colorVariant}` : ''}>
      <img 
        src="test-icon.svg" 
        alt={name} 
        role="img"
      />
    </div>
  ))
}));

jest.mock('lottie-web');

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('react-lottie-player', () => ({
  __esModule: true,
  default: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const defaultItem = {
  title: "John Doe",
  subtitle: "This is a subtitle",
  icon: "right",
  iconHeight: 18,
  iconWidth: 18,
  link: "https://example.com/link",
};

describe("RdsWebsiteMatrix", () => {  
  it("should render default display type with correct props", () => {
    const { getByText, container } = render(
      <RdsWebsiteMatrix item={defaultItem} colorVariant="primary" />
    );
    
    // Check text content
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("This is a subtitle")).toBeInTheDocument();
    expect(getByText("https://example.com/link")).toBeInTheDocument();
    
    // Check border color based on colorVariant
    const borderElement = container.querySelector('.border-primary');
    expect(borderElement).toBeInTheDocument();
  });

  it("should render leftAligned display type correctly", () => {
    const { getByText, container } = render(
      <RdsWebsiteMatrix 
        item={defaultItem} 
        colorVariant="danger" 
        displayType="leftAligned" 
      />
    );
    
    // Check text content
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("This is a subtitle")).toBeInTheDocument();
    
    // Check for button with proper color class
    const button = container.querySelector('.btn-danger');
    expect(button).toBeInTheDocument();
  });

  it("should render centerAligned display type correctly", () => {
    const itemWithDescription = {
      ...defaultItem,
      description: "This is a description"
    };
    
    const { getByText, container } = render(
      <RdsWebsiteMatrix 
        item={itemWithDescription} 
        colorVariant="info" 
        displayType="centerAligned" 
      />
    );
    
    // Check text content
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("This is a subtitle")).toBeInTheDocument();
    expect(getByText("This is a description")).toBeInTheDocument();
    
    // Check for center alignment
    const centerDiv = container.querySelector('.text-center');
    expect(centerDiv).toBeInTheDocument();
  });

  it("should render withTopBorder display type correctly", () => {
    const { getByText, container } = render(
      <RdsWebsiteMatrix 
        item={defaultItem} 
        colorVariant="success" 
        displayType="withTopBorder" 
      />
    );
    
    // Check text content
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("This is a subtitle")).toBeInTheDocument();
    
    // Check for border with proper color class
    const borderElement = container.querySelector('.border-success');
    expect(borderElement).toBeInTheDocument();
    
    // Check for top border
    const borderTopElement = container.querySelector('.border-top');
    expect(borderTopElement).toBeInTheDocument();
  });

  it("should render withCenterAlignedIcon display type correctly", () => {
    const { getByText, container } = render(
      <RdsWebsiteMatrix 
        item={defaultItem} 
        colorVariant="warning" 
        displayType="withCenterAlignedIcon" 
      />
    );
    
    // Check text content
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("This is a subtitle")).toBeInTheDocument();
    
    // Check for button with proper color class
    const button = container.querySelector('.btn-warning');
    expect(button).toBeInTheDocument();
    
    // Check for center alignment
    const centerDiv = container.querySelector('.text-center');
    expect(centerDiv).toBeInTheDocument();
  });

  it("should render withLeftAlignedIcon display type correctly", () => {
    const { getByText, container } = render(
      <RdsWebsiteMatrix 
        item={defaultItem} 
        colorVariant="secondary" 
        displayType="withLeftAlignedIcon" 
      />
    );
    
    // Check text content
    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("This is a subtitle")).toBeInTheDocument();
    
    // Check for flex layout
    const flexDiv = container.querySelector('.d-flex');
    expect(flexDiv).toBeInTheDocument();
    
    // Check for button with proper color class
    const button = container.querySelector('.btn-secondary');
    expect(button).toBeInTheDocument();
  });
  it("should call onClickLink when link is clicked", () => {
    const onClickLinkMock = jest.fn();
    
    const { container } = render(
      <RdsWebsiteMatrix 
        item={defaultItem} 
        onClickLink={onClickLinkMock} 
      />
    );
    
    // Find the anchor element directly
    const anchorElement = container.querySelector('a');
    expect(anchorElement).not.toBeNull();
    
    // Click on the anchor element
    fireEvent.click(anchorElement!);
    
    // Verify the callback was called with correct parameters
    expect(onClickLinkMock).toHaveBeenCalledTimes(1);
    expect(onClickLinkMock).toHaveBeenCalledWith(expect.anything(), true);
  });

  it("should handle missing link property correctly", () => {
    const itemWithoutLink = {
      title: "No Link Item",
      subtitle: "This is a subtitle without link",
      icon: "right",
      iconHeight: 18,
      iconWidth: 18,
    };
    
    const { getByText, queryByText } = render(
      <RdsWebsiteMatrix item={itemWithoutLink} />
    );
    
    expect(getByText("No Link Item")).toBeInTheDocument();
    expect(getByText("This is a subtitle without link")).toBeInTheDocument();
    expect(queryByText("https://example.com/link")).not.toBeInTheDocument();
  });
});
