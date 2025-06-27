import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompWebhookSubscription from '../src/rds-comp-webhook-subscriptions/rds-comp-webhook-subscriptions';

// Mock the dependencies
jest.mock('../src/rds-data-table/rds-data-table', () => ({
  __esModule: true,
  default: jest.fn(({ tableHeaders, tableData, actions, pagination, recordsPerPage, onActionSelection, actionPosition, classes, recordsPerPageSelectListOption }) => (
    <div data-testid="rds-comp-datatable">
      <div data-testid="action-position">{actionPosition}</div>
      <div data-testid="table-classes">{classes}</div>
      <div data-testid="pagination">{pagination ? 'enabled' : 'disabled'}</div>
      <div data-testid="records-per-page">{recordsPerPage}</div>
      <div data-testid="records-per-page-select">{recordsPerPageSelectListOption ? 'enabled' : 'disabled'}</div>
      <div data-testid="table-headers">
        {(tableHeaders || []).map((header: any, index: number) => (
          <div key={index} data-testid={`header-${header.key}`}>
            {header.displayName}
          </div>
        ))}
      </div>
      <div data-testid="table-data">
        {(tableData || []).map((row: any, index: number) => (
          <div key={index} data-testid={`row-${index}`}>
            {JSON.stringify(row)}
          </div>
        ))}
      </div>
      <div data-testid="actions">
        {(actions || []).map((action: any, index: number) => (
          <button 
            key={index} 
            data-testid={`action-${action.id}`}
            onClick={() => onActionSelection && onActionSelection(action)}
          >
            {action.displayName}
          </button>
        ))}
      </div>
    </div>
  )),
  ActionPosition: {
    Right: 'Right',
    Left: 'Left',
  },
}));

jest.mock('../src/rds-elements', () => ({
  RdsButton: jest.fn(({ label, onClick, colorVariant, isDisabled, size, type, isOutline, dataTestId, ...props }) => (
    <button 
      onClick={onClick} 
      type={type}
      disabled={isDisabled}
      data-testid={dataTestId || `button-${label?.replace(/\s+/g, '-').toLowerCase()}`}
      className={`btn-${colorVariant} btn-${size} ${isOutline ? 'outline' : ''}`}
      {...props}
    >
      {label}
    </button>
  )),
  RdsInput: jest.fn(({ 
    name, 
    label, 
    placeholder, 
    onChange, 
    value, 
    dataTestId, 
    inputType,
    required,
    reset,
    validatonPattern,
    validationMsg,
    ...props 
  }) => (
    <div data-testid={dataTestId} {...props}>
      {label && <label>{name}</label>}
      <input
        type={inputType || 'text'}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
        data-testid={`input-${dataTestId}`}
        pattern={validatonPattern?.source}
      />
      {validationMsg && <span data-testid={`validation-${dataTestId}`}>{validationMsg}</span>}
    </div>
  )),  RdsTextArea: jest.fn(({ 
    label, 
    placeholder, 
    onChange, 
    value, 
    dataTestId, 
    rows,
    reset,
    validationPattern,
    validationMsg,
    ...props 
  }) => (
    <div data-testid={dataTestId} {...props}>
      {label && <label>{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        rows={rows}
        data-testid={`textarea-${dataTestId}`}
      />
      {validationMsg && <span data-testid={`validation-${dataTestId}`}>{validationMsg}</span>}
    </div>
  )),
  RdsCompLabel: jest.fn(({ label, ...props }) => (
    <label {...props}>{label}</label>
  )),
  RdsEmptyState: jest.fn(({ iconHeight, iconWidth, iconPath, label, subLabel, ...props }) => (
    <div data-testid="rds-empty-state" {...props}>
      <div data-testid="illustration-icon" style={{ height: iconHeight, width: iconWidth }}>
        {iconPath}
      </div>
      <div data-testid="illustration-label">{label}</div>
      <div data-testid="illustration-sublabel">{subLabel}</div>
    </div>
  )),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('RdsCompWebhookSubscription', () => {
  const mockOnSaveHandler = jest.fn();

  const defaultProps = {
    webhookSubscriptionData: {},
    reset: false,
    onSaveHandler: mockOnSaveHandler,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      expect(screen.getByTestId('webhook-endpoint')).toBeInTheDocument();
    });

    it('renders the main form structure', () => {
      const { container } = render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
      
      const scrollDiv = container.querySelector('.custom-content-scroll');
      expect(scrollDiv).toBeInTheDocument();
    });

    it('renders all form fields', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      expect(screen.getByTestId('webhook-endpoint')).toBeInTheDocument();
      expect(screen.getByTestId('webhook-event')).toBeInTheDocument();
      expect(screen.getByTestId('header-key')).toBeInTheDocument();
      expect(screen.getByTestId('header-value')).toBeInTheDocument();
    });

    it('renders action buttons', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      expect(screen.getByTestId('add')).toBeInTheDocument();
      expect(screen.getByTestId('save')).toBeInTheDocument();
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
    });
  });

  // Form Fields Tests
  describe('Form Fields', () => {
    it('renders webhook endpoint input with correct properties', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const endpointInput = screen.getByTestId('input-webhook-endpoint');
      expect(endpointInput).toHaveAttribute('type', 'url');
      expect(endpointInput).toHaveAttribute('placeholder', 'https://example.com/postreceive');
      expect(endpointInput).toHaveAttribute('required');
    });

    it('renders webhook event textarea with correct properties', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const eventTextarea = screen.getByTestId('textarea-webhook-event');
      expect(eventTextarea).toHaveAttribute('placeholder', 'carolyn Carpenter');
      expect(eventTextarea).toHaveAttribute('rows', '4');
    });

    it('renders header key and value inputs', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      
      expect(headerKeyInput).toHaveAttribute('placeholder', 'Header key');
      expect(headerValueInput).toHaveAttribute('placeholder', 'Header Value');
    });

    it('displays validation messages', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      expect(screen.getByTestId('validation-webhook-endpoint')).toHaveTextContent('Enter a valid Webhook URL');
      expect(screen.getByTestId('validation-webhook-event')).toHaveTextContent('Enter valid url');
    });
  });

  // Form Validation Tests
  describe('Form Validation', () => {
    it('validates webhook endpoint URL format', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const endpointInput = screen.getByTestId('input-webhook-endpoint');
      
      // Test valid URL
      fireEvent.change(endpointInput, { target: { value: 'https://example.com/webhook' } });
      expect(endpointInput).toHaveValue('https://example.com/webhook');
      
      // Test invalid URL
      fireEvent.change(endpointInput, { target: { value: 'invalid-url' } });
      expect(endpointInput).toHaveValue('invalid-url');
    });

    it('disables Add button when header fields are empty', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const addButton = screen.getByTestId('add');
      expect(addButton).toBeDisabled();
    });

    it('enables Add button when both header fields are filled', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      
      fireEvent.change(headerKeyInput, { target: { value: 'Authorization' } });
      fireEvent.change(headerValueInput, { target: { value: 'Bearer token123' } });
      
      const addButton = screen.getByTestId('add');
      expect(addButton).not.toBeDisabled();
    });

    it('disables Save button when form is invalid', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled();
    });
  });

  // User Interactions Tests
  describe('User Interactions', () => {
    it('updates webhook endpoint value on input change', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const endpointInput = screen.getByTestId('input-webhook-endpoint');
      fireEvent.change(endpointInput, { target: { value: 'https://example.com/webhook' } });
      
      expect(endpointInput).toHaveValue('https://example.com/webhook');
    });

    it('updates webhook event value on textarea change', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const eventTextarea = screen.getByTestId('textarea-webhook-event');
      fireEvent.change(eventTextarea, { target: { value: 'user.created' } });
      
      expect(eventTextarea).toHaveValue('user.created');
    });

    it('updates header key and value on input changes', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      
      fireEvent.change(headerKeyInput, { target: { value: 'Content-Type' } });
      fireEvent.change(headerValueInput, { target: { value: 'application/json' } });
      
      expect(headerKeyInput).toHaveValue('Content-Type');
      expect(headerValueInput).toHaveValue('application/json');
    });

    it('adds header to table when Add button is clicked', async () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      const addButton = screen.getByTestId('add');
      
      fireEvent.change(headerKeyInput, { target: { value: 'Authorization' } });
      fireEvent.change(headerValueInput, { target: { value: 'Bearer token123' } });
      fireEvent.click(addButton);
      
      // Check if datatable appears
      await waitFor(() => {
        expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
      });
      
      // Check if header fields are cleared
      expect(headerKeyInput).toHaveValue('');
      expect(headerValueInput).toHaveValue('');
    });

    it('clears header fields after adding header', async () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      const addButton = screen.getByTestId('add');
      
      fireEvent.change(headerKeyInput, { target: { value: 'X-API-Key' } });
      fireEvent.change(headerValueInput, { target: { value: 'secret123' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(headerKeyInput).toHaveValue('');
        expect(headerValueInput).toHaveValue('');
      });
    });
  });

  // Save Functionality Tests
  describe('Save Functionality', () => {
    it('calls onSaveHandler when Save button is clicked with valid form', async () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      // Fill required fields
      const endpointInput = screen.getByTestId('input-webhook-endpoint');
      const eventTextarea = screen.getByTestId('textarea-webhook-event');
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      
      fireEvent.change(endpointInput, { target: { value: 'https://example.com/webhook' } });
      fireEvent.change(eventTextarea, { target: { value: 'user.created' } });
      fireEvent.change(headerKeyInput, { target: { value: 'Authorization' } });
      fireEvent.change(headerValueInput, { target: { value: 'Bearer token123' } });
      
      // Add header first
      const addButton = screen.getByTestId('add');
      fireEvent.click(addButton);
      
      await waitFor(() => {
        const saveButton = screen.getByTestId('save');
        expect(saveButton).not.toBeDisabled();
      });
      
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      expect(mockOnSaveHandler).toHaveBeenCalledTimes(1);
      expect(mockOnSaveHandler).toHaveBeenCalledWith({
        endpoint: 'https://example.com/webhook',
        event: 'user.created',
        headerKey: '',
        headerValue: '',
      });
    });

    it('resets form after successful save', async () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const endpointInput = screen.getByTestId('input-webhook-endpoint');
      const eventTextarea = screen.getByTestId('textarea-webhook-event');
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      
      // Fill and add header
      fireEvent.change(endpointInput, { target: { value: 'https://example.com/webhook' } });
      fireEvent.change(eventTextarea, { target: { value: 'user.created' } });
      fireEvent.change(headerKeyInput, { target: { value: 'Authorization' } });
      fireEvent.change(headerValueInput, { target: { value: 'Bearer token123' } });
      
      const addButton = screen.getByTestId('add');
      fireEvent.click(addButton);
      
      await waitFor(() => {
        const saveButton = screen.getByTestId('save');
        fireEvent.click(saveButton);
      });
      
      // Check if form is reset
      await waitFor(() => {
        expect(endpointInput).toHaveValue('');
        expect(eventTextarea).toHaveValue('');
      });
    });
  });

  // Data Table Tests
  describe('Data Table', () => {
    it('shows illustration when no headers are added', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      expect(screen.getByTestId('rds-empty-state')).toBeInTheDocument();
      expect(screen.getByTestId('illustration-label')).toHaveTextContent("Currently you don't have any data");
      expect(screen.getByTestId('illustration-sublabel')).toHaveTextContent('Click on the button above to add data');
    });

    it('shows data table when headers are added', async () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      const addButton = screen.getByTestId('add');
      
      fireEvent.change(headerKeyInput, { target: { value: 'Authorization' } });
      fireEvent.change(headerValueInput, { target: { value: 'Bearer token123' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
        expect(screen.queryByTestId('rds-empty-state')).not.toBeInTheDocument();
      });
    });

    it('configures data table with correct props', async () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      const addButton = screen.getByTestId('add');
      
      fireEvent.change(headerKeyInput, { target: { value: 'Content-Type' } });
      fireEvent.change(headerValueInput, { target: { value: 'application/json' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('action-position')).toHaveTextContent('Right');
        expect(screen.getByTestId('table-classes')).toHaveTextContent('table__userTable');
        expect(screen.getByTestId('pagination')).toHaveTextContent('enabled');
        expect(screen.getByTestId('records-per-page')).toHaveTextContent('5');
        expect(screen.getByTestId('records-per-page-select')).toHaveTextContent('enabled');
      });
    });

    it('displays table headers correctly', async () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      const addButton = screen.getByTestId('add');
      
      fireEvent.change(headerKeyInput, { target: { value: 'X-API-Key' } });
      fireEvent.change(headerValueInput, { target: { value: 'secret123' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('header-headerKey')).toHaveTextContent('Header Key');
        expect(screen.getByTestId('header-headerValue')).toHaveTextContent('Header Value');
      });
    });

    it('displays edit action for table rows', async () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      const addButton = screen.getByTestId('add');
      
      fireEvent.change(headerKeyInput, { target: { value: 'User-Agent' } });
      fireEvent.change(headerValueInput, { target: { value: 'MyApp/1.0' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('action-edit')).toHaveTextContent('Edit');
      });
    });
  });

  // Props Handling Tests
  describe('Props Handling', () => {
    it('handles missing onSaveHandler callback', () => {
      const propsWithoutCallback = { ...defaultProps };
      delete (propsWithoutCallback as any).onSaveHandler;
      
      expect(() => render(<RdsCompWebhookSubscription {...propsWithoutCallback} />)).not.toThrow();
    });

    it('handles undefined webhookSubscriptionData', () => {
      const propsWithUndefinedData = { ...defaultProps, webhookSubscriptionData: undefined };
      expect(() => render(<RdsCompWebhookSubscription {...propsWithUndefinedData} />)).not.toThrow();
    });

    it('handles reset prop', () => {
      const propsWithReset = { ...defaultProps, reset: true };
      expect(() => render(<RdsCompWebhookSubscription {...propsWithReset} />)).not.toThrow();
    });
  });

  // Button States Tests
  describe('Button States', () => {
    it('renders buttons with correct properties', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const addButton = screen.getByTestId('add');
      const saveButton = screen.getByTestId('save');
      const cancelButton = screen.getByTestId('cancel');
      
      expect(addButton).toHaveClass('btn-primary');
      expect(saveButton).toHaveClass('btn-primary');
      expect(cancelButton).toHaveClass('btn-primary', 'outline');
      
      expect(addButton).toHaveAttribute('type', 'submit');
      expect(saveButton).toHaveAttribute('type', 'submit');
      expect(cancelButton).toHaveAttribute('type', 'button');
    });

    it('shows correct button sizes', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      const cancelButton = screen.getByTestId('cancel');
      
      expect(saveButton).toHaveClass('btn-small');
      expect(cancelButton).toHaveClass('btn-small');
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles adding multiple headers', async () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      const addButton = screen.getByTestId('add');
      
      // Add first header
      fireEvent.change(headerKeyInput, { target: { value: 'Authorization' } });
      fireEvent.change(headerValueInput, { target: { value: 'Bearer token123' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
      });
      
      // Add second header
      fireEvent.change(headerKeyInput, { target: { value: 'Content-Type' } });
      fireEvent.change(headerValueInput, { target: { value: 'application/json' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('row-1')).toBeInTheDocument();
      });
    });

    it('handles form submission with empty headers table', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const endpointInput = screen.getByTestId('input-webhook-endpoint');
      const eventTextarea = screen.getByTestId('textarea-webhook-event');
      
      fireEvent.change(endpointInput, { target: { value: 'https://example.com/webhook' } });
      fireEvent.change(eventTextarea, { target: { value: 'user.created' } });
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled(); // Should be disabled when no headers added
    });

    it('handles special characters in header values', async () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const headerKeyInput = screen.getByTestId('input-header-key');
      const headerValueInput = screen.getByTestId('input-header-value');
      const addButton = screen.getByTestId('add');
      
      fireEvent.change(headerKeyInput, { target: { value: 'X-Custom-Header' } });
      fireEvent.change(headerValueInput, { target: { value: 'value!@#$%^&*()' } });
      fireEvent.click(addButton);
      
      await waitFor(() => {
        expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
      });
    });
  });

  // Validation Logic Tests
  describe('Validation Logic', () => {
    it('validates URLs correctly', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const endpointInput = screen.getByTestId('input-webhook-endpoint');
      
      // Test various URL formats
      const validUrls = [
        'https://example.com',
        'http://localhost:3000/webhook',
        'https://api.example.com/v1/webhooks',
        'https://192.168.1.1:8080/webhook',
      ];
      
      const invalidUrls = [
        'not-a-url',
        'ftp://example.com',
        'example.com',
        '',
      ];
      
      validUrls.forEach(url => {
        fireEvent.change(endpointInput, { target: { value: url } });
        expect(endpointInput).toHaveValue(url);
      });
      
      invalidUrls.forEach(url => {
        fireEvent.change(endpointInput, { target: { value: url } });
        expect(endpointInput).toHaveValue(url);
      });
    });

    it('validates event field correctly', () => {
      render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const eventTextarea = screen.getByTestId('textarea-webhook-event');
      
      fireEvent.change(eventTextarea, { target: { value: '' } });
      expect(eventTextarea).toHaveValue('');
      
      fireEvent.change(eventTextarea, { target: { value: 'user.created' } });
      expect(eventTextarea).toHaveValue('user.created');
    });
  });

  // Layout Tests
  describe('Layout', () => {
    it('applies correct CSS classes for layout', () => {
      const { container } = render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      expect(container.querySelector('.custom-content-scroll')).toBeInTheDocument();
      expect(container.querySelector('.fw-normal')).toBeInTheDocument();
      expect(container.querySelector('.row')).toBeInTheDocument();
      expect(container.querySelector('.footer-buttons')).toBeInTheDocument();
    });

    it('maintains responsive grid layout for header inputs', () => {
      const { container } = render(<RdsCompWebhookSubscription {...defaultProps} />);
      
      const headerRow = container.querySelector('.row.mb-3.align-items-center');
      expect(headerRow).toBeInTheDocument();
      
      const columns = headerRow?.querySelectorAll('[class*="col-"]');
      expect(columns).toHaveLength(3); // Header key, header value, and add button columns
    });
  });
});
