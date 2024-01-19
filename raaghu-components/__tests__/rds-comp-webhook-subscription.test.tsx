import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RdsCompWebhookSubscription, { RdsCompWebhookSubscriptionProps } from "../src/rds-comp-webhook-subscriptions/rds-comp-webhook-subscriptions";

// Mock react-lottie-player to avoid useRef issues
jest.mock('react-lottie-player', () => {
    const React = jest.requireActual('react');
    return {
      ...jest.requireActual('react-lottie-player'),
      useRef: React.useRef,
    };
  });
  
// Mock react-lottie-player to avoid useRef issues
jest.mock('react-lottie-player', () => {
    return {
      ...jest.requireActual('react-lottie-player'),
      __esModule: true,
      default: jest.fn(),
    };
  });
  
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({ t: (key: any) => key }),
}));

describe("RdsCompWebhookSubscription", () => {

  const defaultProps: RdsCompWebhookSubscriptionProps = {
    webhookItem: jest.fn(),
  };

  beforeEach(() => {
    render(<RdsCompWebhookSubscription {...defaultProps} />);
  });

  test("renders all input fields", async () => {
    // Wait for the component to render
    await screen.findByText("Webhook Endpoint");
    expect(screen.getByText("Webhook Event")).toBeInTheDocument();
    // Add other expectations as needed
  });

  test("displays error message for invalid endpoint", () => {
    const endpointInput = screen.getByTestId("webhook-endpoint");
    fireEvent.change(endpointInput, { target: { value: "invalid-url" } });

    const errorMessage = screen.getByText("Enter valid url");
    expect(errorMessage).toBeInTheDocument();

    // Add an expectation for the error message to disappear with a valid input
    fireEvent.change(endpointInput, { target: { value: "https://example.com/valid-url" } });
    expect(errorMessage).not.toBeInTheDocument();
  });

  test("calls webhookItem with user data on form submission", async () => {
    render(<RdsCompWebhookSubscription {...defaultProps} />);
  
    const eventInput = screen.getAllByPlaceholderText("carolyn Carpenter")[0] as HTMLInputElement;
    const headerKeyInput = screen.getAllByPlaceholderText("Header key")[0] as HTMLInputElement;
    const headerValueInput = screen.getAllByPlaceholderText("Header Value")[0] as HTMLInputElement;
  
    fireEvent.change(eventInput, { target: { value: "some-event" } });
    fireEvent.change(headerKeyInput, { target: { value: "header-key" } });
    fireEvent.change(headerValueInput, { target: { value: "header-value" } });
  
    const saveButton = screen.getAllByText("Save")[0] as HTMLElement;
    fireEvent.click(saveButton);
  
  });
  
  
});
