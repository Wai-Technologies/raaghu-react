import React from "react";
import { render, screen } from "@testing-library/react";
import RdsCompTopNavigationWithSearch from "./rds-comp-top-navigation-with-search";
import "@testing-library/jest-dom";

// Mock child components and enums that use hooks or cause issues
jest.mock("../rds-elements", () => ({
  RdsIcon: () => <div data-testid="mock-rds-icon" />,
  RdsDropdownList: () => <div data-testid="mock-rds-dropdown-list" />,
  RdsOffcanvas: ({ children }: any) => <div data-testid="mock-rds-offcanvas">{children}</div>,
  RdsSearch: () => <input data-testid="mock-rds-search" placeholder="Search" />,
  RdsBreadcrumb: () => <nav data-testid="mock-rds-breadcrumb" />,
}));
jest.mock("../../../raaghu-elements/src/rds-offcanvas/rds-offcanvas", () => ({
  RdsOffcanvasPlacement: { Start: "start", End: "end", Top: "top", Bottom: "bottom" },
  RdsOffcanvasBackDrop: { True: "true", False: "false", Static: "static" },
}));
jest.mock("../rds-comp-profile", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="mock-rds-comp-profile">
      <div>{`Hi, ${props.userName}`}</div>
      <div>{props.userEmail}</div>
    </div>
  ),
}));
jest.mock("../rds-comp-linked-account", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-rds-comp-linked-account" />,
}));

describe("RdsCompTopNavigationWithSearch", () => {
  it("renders logo, search, and profile section", () => {
    render(
      <RdsCompTopNavigationWithSearch
        logo="logo.png"
        profileTitle="John Doe"
        profileEmail="john@example.com"
        themeItems={[]}
        toggleItems={[]}
        elementList={[]}
        componentsList={[]}
        languageLabel="Language"
        themeLabel="Theme"
        onForgotPassword={() => {}}
        onProfileLinkTopNav={() => {}}
        breacrumItem={[]}
      />
    );
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    // Use regex to match the greeting, ignore trailing space
    expect(screen.getByText(/Hi, John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
  });
});
