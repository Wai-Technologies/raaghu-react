import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsNotification, { 
  RdsNotificationProps, 
  NotificationLayout,
  NotificationStyle 
} from "../src/rds-notification/rds-notification";

// Mock RdsIcon to prevent fetch errors
jest.mock("../src/rds-icon/rds-icon", () => ({
  __esModule: true,
  default: jest.fn(({ name, onClick }) => (
    <div data-testid={`icon-${name}`} onClick={onClick}>
      <img src="test-icon.svg" alt={name} />
    </div>
  ))
}));

jest.mock('react-lottie-player', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock RdsButton
jest.mock("../src/rds-button", () => ({
  __esModule: true,
  default: jest.fn(({ label, onClick }) => (
    <button onClick={onClick} data-testid={`button-${label}`}>
      {label}
    </button>
  ))
}));

describe("RdsNotification", () => {
  const defaultProps: RdsNotificationProps = {
    notifications: [
      {
        userNotificationId: "1",
        title: "Notification 1",
        description: "This is notification 1",
        status: "info",
        time: "2022-01-01T00:00:00.000Z",
      },
      {
        userNotificationId: "2",
        title: "Notification 2",
        description: "This is notification 2",
        status: "warn",
        time: "2022-01-02T00:00:00.000Z",
      },
    ],
    layout: NotificationLayout.Vertical,
    style: NotificationStyle.Default,
  };

  it("renders notifications with correct titles and timestamps", () => {
    render(<RdsNotification {...defaultProps} />);

    // Check that notification titles are displayed
    expect(screen.getByText("Notification 1")).toBeInTheDocument();
    expect(screen.getByText("Notification 2")).toBeInTheDocument();
    
    // Check timestamps
    expect(screen.getByText("2022-01-01T00:00:00.000Z")).toBeInTheDocument();
    expect(screen.getByText("2022-01-02T00:00:00.000Z")).toBeInTheDocument();
  });

  it("renders notification descriptions when provided", () => {
    render(<RdsNotification {...defaultProps} />);
    
    // Check descriptions
    expect(screen.getByText("This is notification 1")).toBeInTheDocument();
    expect(screen.getByText("This is notification 2")).toBeInTheDocument();
  });

  it("renders buttons when showButton is true", () => {
    const onDismiss = jest.fn();
    const onAccept = jest.fn();
    
    render(
      <RdsNotification 
        {...defaultProps} 
        showButton={true}
        showPrimaryButton={true}
        showSecondaryButton={true}
        onDismiss={onDismiss}
        onAccept={onAccept}
      />
    );
    
    // Check that buttons are rendered
    const dismissButtons = screen.getAllByTestId("button-DISMISS");
    const acceptButtons = screen.getAllByTestId("button-ACCEPT");
    
    expect(dismissButtons.length).toBe(2);
    expect(acceptButtons.length).toBe(2);
    
    // Test clicking the buttons
    fireEvent.click(dismissButtons[0]);
    expect(onDismiss).toHaveBeenCalledWith(
      expect.anything(),
      defaultProps.notifications[0]
    );
    
    fireEvent.click(acceptButtons[1]);
    expect(onAccept).toHaveBeenCalledWith(
      expect.anything(),
      defaultProps.notifications[1]
    );
  });

  it("renders dismiss icon when showDismissIcon is true", () => {
    const onDismiss = jest.fn();
    
    render(
      <RdsNotification 
        {...defaultProps} 
        showDismissIcon={true}
        onDismiss={onDismiss}
      />
    );
    
    // Check that dismiss icons are rendered
    const dismissIcons = screen.getAllByTestId("icon-close");
    expect(dismissIcons.length).toBe(2);
    
    // Test clicking the dismiss icon
    fireEvent.click(dismissIcons[0]);
    expect(onDismiss).toHaveBeenCalledWith(
      expect.anything(),
      defaultProps.notifications[0]
    );
  });
});
