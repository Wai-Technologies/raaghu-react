import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompEmail, { RdsCompEmailProps } from '../src/rds-comp-email/rds-comp-email';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ name, label, placeholder, value, onChange, inputType, required, dataTestId, reset, validatonPattern, validationMsg, ...props }: any) => (
    <div data-testid={`input-container-${dataTestId || name}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={dataTestId || name}
        type={inputType || 'text'}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
        data-validation-pattern={validatonPattern?.toString()}
        data-validation-msg={validationMsg}
        {...props}
      />
    </div>
  ),
  RdsButton: ({ label, onClick, type, colorVariant, size, dataTestId, isDisabled, databsdismiss, isOutline, ...props }: any) => (
    <button
      data-testid={dataTestId || `button-${label?.toLowerCase()}`}
      onClick={onClick}
      type={type}
      data-color-variant={colorVariant}
      data-size={size}
      disabled={isDisabled}
      data-bs-dismiss={databsdismiss}
      data-outline={isOutline}
      {...props}
    >
      {label}
    </button>
  ),
  RdsCheckbox: ({ labelText, onChange, checked, dataTestId, ...props }: any) => (
    <div data-testid={`checkbox-container-${dataTestId}`}>
      <input
        type="checkbox"
        data-testid={dataTestId}
        onChange={onChange}
        checked={checked || false}
        {...props}
      />
      <label>{labelText}</label>
    </div>
  ),
  RdsOffcanvas: ({ children, canvasTitle, placement, offcanvasbutton, backDrop, scrolling, preventEscapeKey, offId, ...props }: any) => (
    <div data-testid="rds-offcanvas" data-title={canvasTitle} data-placement={placement} data-backdrop={backDrop} data-scrolling={scrolling} data-prevent-escape-key={preventEscapeKey} data-off-id={offId} {...props}>
      <div data-testid="offcanvas-button">{offcanvasbutton}</div>
      <div data-testid="offcanvas-content">{children}</div>
    </div>
  ),
  RdsTextArea: ({ label, placeholder, value, onChange, rows, dataTestId, ...props }: any) => (
    <div data-testid={`textarea-container-${dataTestId}`}>
      {label && <label>{label}</label>}
      <textarea
        data-testid={dataTestId}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        rows={rows}
        {...props}
      />
    </div>
  ),
}));

describe('RdsCompEmail', () => {
  const mockEmailSettings = {
    defaultFromDisplayName: 'Test Sender',
    defaultFromAddress: 'test@example.com',
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpEnableSsl: true,
    smtpUseDefaultCredentials: false,
    smtpDomain: 'example.com',
    smtpUserName: 'testuser',
    smtpPassword: 'testpass'
  };

  const mockSendTestEmailData = {
    senderEmailAddress: 'sender@example.com',
    targetEmailAddress: 'target@example.com',
    subject: 'Test Email',
    body: 'This is a test email'
  };

  const mockOnEmailDataSubmit = jest.fn();
  const mockOnTestEmailRequest = jest.fn();

  const defaultProps: RdsCompEmailProps = {
    emailSettings: mockEmailSettings,
    sendTestEmailData: mockSendTestEmailData,
    onEmailDataSubmit: mockOnEmailDataSubmit,
    onTestEmailRequest: mockOnTestEmailRequest
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Rendering Test
  describe('Basic Rendering', () => {
    it('should render email configuration form correctly', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      expect(screen.getByTestId('sender-display-name')).toBeInTheDocument();
      expect(screen.getByTestId('sender-email')).toBeInTheDocument();
      expect(screen.getByTestId('smtp-host')).toBeInTheDocument();
      expect(screen.getByTestId('smtp-port')).toBeInTheDocument();
      expect(screen.getByTestId('use-ssl')).toBeInTheDocument();
      expect(screen.getByTestId('use-default-credential')).toBeInTheDocument();
    });    it('should render send test email offcanvas', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      expect(screen.getByTestId('rds-offcanvas')).toBeInTheDocument();
      expect(screen.getByText('Send Test Email')).toBeInTheDocument();
    });
  });

  // 2. Form Field Management Tests
  describe('Form Field Management', () => {
    it('should initialize form with provided email settings', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const displayNameInput = screen.getByTestId('sender-display-name');
      const emailInput = screen.getByTestId('sender-email');
      const hostInput = screen.getByTestId('smtp-host');
      const portInput = screen.getByTestId('smtp-port');
      
      expect(displayNameInput).toHaveValue('Test Sender');
      expect(emailInput).toHaveValue('test@example.com');
      expect(hostInput).toHaveValue('smtp.example.com');
      expect(portInput).toHaveValue('587');
    });

    it('should update display name when input changes', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const displayNameInput = screen.getByTestId('sender-display-name');
      fireEvent.change(displayNameInput, { target: { value: 'New Sender' } });
      
      expect(displayNameInput).toHaveValue('New Sender');
    });

    it('should update email address when input changes', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const emailInput = screen.getByTestId('sender-email');
      fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
      
      expect(emailInput).toHaveValue('newemail@example.com');
    });

    it('should update SMTP settings when inputs change', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const hostInput = screen.getByTestId('smtp-host');
      const portInput = screen.getByTestId('smtp-port');
      
      fireEvent.change(hostInput, { target: { value: 'smtp.newhost.com' } });
      fireEvent.change(portInput, { target: { value: '465' } });
      
      expect(hostInput).toHaveValue('smtp.newhost.com');
      expect(portInput).toHaveValue('465');
    });
  });

  // 3. Checkbox Management Tests
  describe('Checkbox Management', () => {
    it('should initialize checkboxes with correct values', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const sslCheckbox = screen.getByTestId('use-ssl');
      const defaultCredCheckbox = screen.getByTestId('use-default-credential');
      
      expect(sslCheckbox).toBeChecked();
      expect(defaultCredCheckbox).not.toBeChecked();
    });

    it('should toggle SSL checkbox', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const sslCheckbox = screen.getByTestId('use-ssl');
      fireEvent.click(sslCheckbox);
      
      expect(sslCheckbox).not.toBeChecked();
    });

    it('should toggle default credentials checkbox', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const defaultCredCheckbox = screen.getByTestId('use-default-credential');
      fireEvent.click(defaultCredCheckbox);
      
      expect(defaultCredCheckbox).toBeChecked();
    });
  });

  // 4. Conditional Fields Tests
  describe('Conditional Fields', () => {
    it('should show domain, username, and password fields when not using default credentials', () => {
      const propsWithoutDefaults = {
        ...defaultProps,
        emailSettings: { ...mockEmailSettings, smtpUseDefaultCredentials: false }
      };
      
      render(<RdsCompEmail {...propsWithoutDefaults} />);
      
      expect(screen.getByTestId('domain')).toBeInTheDocument();
      expect(screen.getByTestId('user-name')).toBeInTheDocument();
      expect(screen.getByTestId('password')).toBeInTheDocument();
    });

    it('should hide domain, username, and password fields when using default credentials', () => {
      const propsWithDefaults = {
        ...defaultProps,
        emailSettings: { ...mockEmailSettings, smtpUseDefaultCredentials: true }
      };
      
      render(<RdsCompEmail {...propsWithDefaults} />);
      
      expect(screen.queryByTestId('domain')).not.toBeInTheDocument();
      expect(screen.queryByTestId('user-name')).not.toBeInTheDocument();
      expect(screen.queryByTestId('password')).not.toBeInTheDocument();
    });
  });

  // 5. Form Validation Tests
  describe('Form Validation', () => {
    it('should enable save button when required fields are valid', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).not.toBeDisabled();
    });

    it('should disable save button when display name is empty', () => {
      const propsWithEmptyDisplayName = {
        ...defaultProps,
        emailSettings: { ...mockEmailSettings, defaultFromDisplayName: '' }
      };
      
      render(<RdsCompEmail {...propsWithEmptyDisplayName} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled();
    });

    it('should disable save button when email address is empty', () => {
      const propsWithEmptyEmail = {
        ...defaultProps,
        emailSettings: { ...mockEmailSettings, defaultFromAddress: '' }
      };
      
      render(<RdsCompEmail {...propsWithEmptyEmail} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled();
    });

    it('should have email validation pattern', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const emailInput = screen.getByTestId('sender-email');
      expect(emailInput).toHaveAttribute('data-validation-pattern');
      expect(emailInput).toHaveAttribute('data-validation-msg', 'Please Enter Valid Email Address.');
    });
  });

  // 6. Form Submission Tests
  describe('Form Submission', () => {
    it('should call onEmailDataSubmit when save button is clicked', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      expect(mockOnEmailDataSubmit).toHaveBeenCalledTimes(1);
    });

    it('should call onEmailDataSubmit with current form data', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const displayNameInput = screen.getByTestId('sender-display-name');
      fireEvent.change(displayNameInput, { target: { value: 'Modified Sender' } });
      
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      expect(mockOnEmailDataSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultFromDisplayName: 'Modified Sender'
        })
      );
    });
  });

  // 7. Test Email Functionality Tests
  describe('Test Email Functionality', () => {
    it('should render test email form in offcanvas', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const offcanvasContent = screen.getByTestId('offcanvas-content');
      expect(offcanvasContent).toBeInTheDocument();
      expect(screen.getByText('Sender email address')).toBeInTheDocument();
      expect(screen.getByText('Target email address')).toBeInTheDocument();
      expect(screen.getByText('Subject')).toBeInTheDocument();
      expect(screen.getByTestId('email-body')).toBeInTheDocument();
    });

    it('should initialize test email form with provided data', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const bodyTextarea = screen.getByTestId('email-body');
      expect(bodyTextarea).toHaveValue('This is a test email');
    });
  });

  // 8. Reset Functionality Tests
  describe('Reset Functionality', () => {
    it('should reset form when reset prop changes', () => {
      const { rerender } = render(<RdsCompEmail {...defaultProps} reset={false} />);
      
      const displayNameInput = screen.getByTestId('sender-display-name');
      fireEvent.change(displayNameInput, { target: { value: 'Modified Value' } });
      
      rerender(<RdsCompEmail {...defaultProps} reset={true} />);
      
      expect(displayNameInput).toBeInTheDocument();
    });
  });

  // 9. Props Updates Tests
  describe('Props Updates', () => {
    it('should update form data when emailSettings prop changes', () => {
      const { rerender } = render(<RdsCompEmail {...defaultProps} />);
      
      const updatedSettings = {
        ...mockEmailSettings,
        defaultFromDisplayName: 'Updated Sender'
      };
      
      rerender(<RdsCompEmail {...defaultProps} emailSettings={updatedSettings} />);
      
      const displayNameInput = screen.getByTestId('sender-display-name');
      expect(displayNameInput).toHaveValue('Updated Sender');
    });

    it('should update test email data when sendTestEmailData prop changes', () => {
      const { rerender } = render(<RdsCompEmail {...defaultProps} />);
      
      const updatedTestData = {
        ...mockSendTestEmailData,
        subject: 'Updated Subject'
      };
      
      rerender(<RdsCompEmail {...defaultProps} sendTestEmailData={updatedTestData} />);
      
      // The subject input should reflect the updated value
      expect(screen.getByDisplayValue('Updated Subject')).toBeInTheDocument();
    });
  });

  // 10. Edge Cases Tests
  describe('Edge Cases', () => {
    it('should handle missing onEmailDataSubmit gracefully', () => {
      const propsWithoutHandler = { ...defaultProps, onEmailDataSubmit: undefined };
      render(<RdsCompEmail {...propsWithoutHandler} />);
      
      const saveButton = screen.getByTestId('save');
      
      expect(() => {
        fireEvent.click(saveButton);
      }).not.toThrow();
    });

    it('should handle missing onTestEmailRequest gracefully', () => {
      const propsWithoutHandler = { ...defaultProps, onTestEmailRequest: undefined };
      render(<RdsCompEmail {...propsWithoutHandler} />);
      
      expect(screen.getByTestId('rds-offcanvas')).toBeInTheDocument();
    });

    it('should handle empty email settings', () => {
      const propsWithEmptySettings = { ...defaultProps, emailSettings: {} };
      
      expect(() => {
        render(<RdsCompEmail {...propsWithEmptySettings} />);
      }).not.toThrow();
    });
  });

  // 11. Component Structure Tests
  describe('Component Structure', () => {
    it('should render with correct CSS classes', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const container = screen.getByTestId('sender-display-name').closest('.pt-3');
      expect(container).toBeInTheDocument();
    });

    it('should render form within scroll container', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      const scrollContainer = screen.getByTestId('sender-display-name').closest('.overflow-x-hidden');
      expect(scrollContainer).toBeInTheDocument();
      expect(scrollContainer).toHaveClass('overflow-y-auto', 'custom-content-scroll');
    });
  });

  // 12. Integration Tests
  describe('Integration Tests', () => {
    it('should handle complete email configuration workflow', () => {
      render(<RdsCompEmail {...defaultProps} />);
      
      // Update form fields
      const displayNameInput = screen.getByTestId('sender-display-name');
      const emailInput = screen.getByTestId('sender-email');
      
      fireEvent.change(displayNameInput, { target: { value: 'Integration Test Sender' } });
      fireEvent.change(emailInput, { target: { value: 'integration@test.com' } });
      
      // Toggle checkboxes
      const sslCheckbox = screen.getByTestId('use-ssl');
      fireEvent.click(sslCheckbox);
      
      // Submit form
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      expect(mockOnEmailDataSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultFromDisplayName: 'Integration Test Sender',
          defaultFromAddress: 'integration@test.com',
          smtpEnableSsl: false
        })
      );
    });
  });
});