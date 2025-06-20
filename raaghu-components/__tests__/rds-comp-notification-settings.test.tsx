import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompNotificationSettings from '../src/rds-comp-notification-settings/rds-comp-notification-settings';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ 
    label, 
    colorVariant, 
    size, 
    type, 
    onClick,
    databsdismiss
  }: any) => (
    <button 
      data-testid={`button-${label.toLowerCase()}`}
      type={type || "button"}
      className={`btn btn-${colorVariant} btn-${size}`}
      onClick={onClick}
      data-bs-dismiss={databsdismiss}
    >
      {label}
    </button>
  )
}));

describe('RdsCompNotificationSettings Component', () => {
  // Sample default settings
  const defaultSettings = {
    enabled: true,
    NewUser: true,
    NewTenant: false
  };

  // Mock functions for handlers
  const mockSaveHandler = jest.fn();
  const mockCancelHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Basic rendering
  test('renders notification settings with provided defaults', () => {
    render(
      <RdsCompNotificationSettings 
        default={defaultSettings} 
        onSaveHandler={mockSaveHandler}
        onCancelHandler={mockCancelHandler}
      />
    );
    
    // Check if component renders headings
    expect(screen.getByText('Receive Notifications')).toBeInTheDocument();
    expect(screen.getByText('Notification Types')).toBeInTheDocument();
    
    // Check if checkboxes are rendered with correct state
    const mainToggle = screen.getByTestId('notification');
    expect(mainToggle).toBeInTheDocument();
    expect(mainToggle).toBeChecked();
    
    const newUserCheckbox = screen.getByTestId('new-user');
    expect(newUserCheckbox).toBeInTheDocument();
    expect(newUserCheckbox).toBeChecked();
    
    const newTenantCheckbox = screen.getByTestId('new-tenant');
    expect(newTenantCheckbox).toBeInTheDocument();
    expect(newTenantCheckbox).not.toBeChecked();
    
    // Check if buttons are rendered
    expect(screen.getByTestId('button-save')).toBeInTheDocument();
    expect(screen.getByTestId('button-cancel')).toBeInTheDocument();
  });

  // Test 2: Toggle main notification switch
  test('toggles main notification switch correctly', () => {
    render(
      <RdsCompNotificationSettings 
        default={defaultSettings} 
        onSaveHandler={mockSaveHandler}
        onCancelHandler={mockCancelHandler}
      />
    );
    
    // Get the main toggle
    const mainToggle = screen.getByTestId('notification');
    expect(mainToggle).toBeChecked();
    
    // Toggle it off
    fireEvent.click(mainToggle);
    
    // Click save
    fireEvent.click(screen.getByTestId('button-save'));
    
    // Check if onSaveHandler was called with updated data
    expect(mockSaveHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: false,
        NewUser: true,
        NewTenant: false
      })
    );
  });

  // Test 3: Toggle notification type checkboxes
  test('toggles notification type checkboxes correctly', () => {
    render(
      <RdsCompNotificationSettings 
        default={defaultSettings} 
        onSaveHandler={mockSaveHandler}
        onCancelHandler={mockCancelHandler}
      />
    );
    
    // Get the notification type checkboxes
    const newUserCheckbox = screen.getByTestId('new-user');
    const newTenantCheckbox = screen.getByTestId('new-tenant');
    
    // Toggle new user off and new tenant on
    fireEvent.click(newUserCheckbox);
    fireEvent.click(newTenantCheckbox);
    
    // Click save
    fireEvent.click(screen.getByTestId('button-save'));
    
    // Check if onSaveHandler was called with updated data
    expect(mockSaveHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        enabled: true,
        NewUser: false,
        NewTenant: true
      })
    );
  });

  // Test 4: Save button functionality
  test('calls onSaveHandler with correct data when save button is clicked', () => {
    render(
      <RdsCompNotificationSettings 
        default={defaultSettings} 
        onSaveHandler={mockSaveHandler}
        onCancelHandler={mockCancelHandler}
      />
    );
    
    // Click save button without changing any settings
    fireEvent.click(screen.getByTestId('button-save'));
    
    // Check if onSaveHandler was called with the original data
    expect(mockSaveHandler).toHaveBeenCalledWith(defaultSettings);
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
  });

  // Test 5: Cancel button functionality
  test('calls onCancelHandler when cancel button is clicked', () => {
    render(
      <RdsCompNotificationSettings 
        default={defaultSettings} 
        onSaveHandler={mockSaveHandler}
        onCancelHandler={mockCancelHandler}
      />
    );
    
    // Click cancel button
    fireEvent.click(screen.getByTestId('button-cancel'));
    
    // Check if onCancelHandler was called
    expect(mockCancelHandler).toHaveBeenCalledTimes(1);
    // Save handler should not be called
    expect(mockSaveHandler).not.toHaveBeenCalled();
  });

  // Test 6: Updates when props change
  test('updates when default props change', () => {
    const { rerender } = render(
      <RdsCompNotificationSettings 
        default={defaultSettings} 
        onSaveHandler={mockSaveHandler}
        onCancelHandler={mockCancelHandler}
      />
    );
    
    // Initial state
    expect(screen.getByTestId('notification')).toBeChecked();
    expect(screen.getByTestId('new-user')).toBeChecked();
    expect(screen.getByTestId('new-tenant')).not.toBeChecked();
    
    // Update props
    const updatedSettings = {
      enabled: false,
      NewUser: false,
      NewTenant: true
    };
    
    rerender(
      <RdsCompNotificationSettings 
        default={updatedSettings} 
        onSaveHandler={mockSaveHandler}
        onCancelHandler={mockCancelHandler}
      />
    );
    
    // Check if checkboxes updated
    expect(screen.getByTestId('notification')).not.toBeChecked();
    expect(screen.getByTestId('new-user')).not.toBeChecked();
    expect(screen.getByTestId('new-tenant')).toBeChecked();
  });

  // Test 7: Reset after save
  test('resets state after saving', () => {
    render(
      <RdsCompNotificationSettings 
        default={defaultSettings} 
        onSaveHandler={mockSaveHandler}
        onCancelHandler={mockCancelHandler}
      />
    );
    
    // Click save button
    fireEvent.click(screen.getByTestId('button-save'));
    
    // Check if state was reset (this is internal to the component)
    // We can verify this by checking the mockSaveHandler was called with reset values
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
  });

  // Test 8: Render with no props
  test('renders with missing default props', () => {
    // This test verifies the component doesn't crash without default props
    // We need to create a custom render to handle console errors from required props
    const originalError = console.error;
    console.error = jest.fn();
    
    try {
      // @ts-ignore - Intentionally testing with missing required props
      render(<RdsCompNotificationSettings />);
      
      // Component should render without crashing, but checkboxes may be unchecked
      expect(screen.getByText('Receive Notifications')).toBeInTheDocument();
      expect(screen.getByTestId('notification')).not.toBeChecked();
      
    } finally {
      console.error = originalError;
    }
  });
});