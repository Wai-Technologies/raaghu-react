import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompTheme from '../src/rds-comp-theme/rds-comp-theme';

// Mock the RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsButton: (props: any) => (
    <button
      data-testid={props.dataTestId || props['data-testId'] || 'rds-button'}
      onClick={props.onClick}
      className={props.class}
      type={props.type}
      disabled={props.isDisabled}
    >
      {props.label}
    </button>
  ),
  RdsCompSelectList: (props: any) => (
    <div data-testid={`rds-select-${props.id}`}>
      <label>{props.label}</label>
      <select
        id={props.id}
        value={props.selectedValue || ''}
        onChange={(e) => {
          const selectedItem = props.selectItems?.find((item: any) => item.value === e.target.value);
          if (selectedItem && props.onChange) {
            props.onChange(selectedItem);
          }
        }}
        data-testid={`select-${props.id}`}
      >
        <option value="">{props.placeholder}</option>
        {props.selectItems?.map((item: any, index: number) => (
          <option key={index} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  )
}));

describe('RdsCompTheme Component', () => {
  // Sample data for testing
  const mockStyleList = [
    { option: 'Default Style', value: 'default' },
    { option: 'Dark Style', value: 'dark' },
    { option: 'Light Style', value: 'light' }
  ];

  const mockWebList = [
    { option: 'Modern Website', value: 'modern' },
    { option: 'Classic Website', value: 'classic' },
    { option: 'Minimal Website', value: 'minimal' }
  ];

  const mockMenuList = [
    { option: 'Top Menu', value: 'top' },
    { option: 'Side Menu', value: 'side' },
    { option: 'Bottom Menu', value: 'bottom' }
  ];

  const mockStatusList = [
    { option: 'Enabled', value: 'enabled' },
    { option: 'Disabled', value: 'disabled' },
    { option: 'Hidden', value: 'hidden' }
  ];

  const defaultProps = {
    StyleList: mockStyleList,
    WebList: mockWebList,
    MenuList: mockMenuList,
    StatusList: mockStatusList,
    onSaveHandler: jest.fn()
  };

  // Helper function to render component with custom props
  const renderComponent = (props = {}) => {
    return render(
      <RdsCompTheme 
        {...defaultProps} 
        {...props} 
      />
    );
  };

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderComponent();
      expect(screen.getByText('Style')).toBeInTheDocument();
    });

    it('renders all form elements', () => {
      renderComponent();
      
      // Check all select lists are rendered
      expect(screen.getByText('Style')).toBeInTheDocument();
      expect(screen.getByText('Public Website Style')).toBeInTheDocument();
      expect(screen.getByText('Menu Placement')).toBeInTheDocument();
      expect(screen.getByText('Menu Status')).toBeInTheDocument();
      
      // Check buttons are rendered
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('renders select lists with correct placeholders', () => {
      renderComponent();
      
      expect(screen.getByText('Select Style')).toBeInTheDocument();
      expect(screen.getByText('Select Public Website Style')).toBeInTheDocument();
      expect(screen.getByText('Select Menu Placement')).toBeInTheDocument();
      expect(screen.getByText('Select Menu Status')).toBeInTheDocument();
    });

    it('renders all select options correctly', () => {
      renderComponent();
      
      // Check Style options
      expect(screen.getByText('Default Style')).toBeInTheDocument();
      expect(screen.getByText('Dark Style')).toBeInTheDocument();
      expect(screen.getByText('Light Style')).toBeInTheDocument();
      
      // Check Web options
      expect(screen.getByText('Modern Website')).toBeInTheDocument();
      expect(screen.getByText('Classic Website')).toBeInTheDocument();
      expect(screen.getByText('Minimal Website')).toBeInTheDocument();
      
      // Check Menu options
      expect(screen.getByText('Top Menu')).toBeInTheDocument();
      expect(screen.getByText('Side Menu')).toBeInTheDocument();
      expect(screen.getByText('Bottom Menu')).toBeInTheDocument();
      
      // Check Status options
      expect(screen.getByText('Enabled')).toBeInTheDocument();
      expect(screen.getByText('Disabled')).toBeInTheDocument();
      expect(screen.getByText('Hidden')).toBeInTheDocument();
    });
  });

  // Form Interaction Tests
  describe('Form Interactions', () => {
    it('updates Style selection when changed', () => {
      renderComponent();
      
      const styleSelect = screen.getByTestId('select-style');
      fireEvent.change(styleSelect, { target: { value: 'dark' } });
      
      expect(styleSelect).toHaveValue('dark');
    });

    it('updates Public Website Style selection when changed', () => {
      renderComponent();
      
      const webSelect = screen.getByTestId('select-webL');
      fireEvent.change(webSelect, { target: { value: 'modern' } });
      
      expect(webSelect).toHaveValue('modern');
    });

    it('updates Menu Placement selection when changed', () => {
      renderComponent();
      
      const menuSelect = screen.getByTestId('select-menuL');
      fireEvent.change(menuSelect, { target: { value: 'side' } });
      
      expect(menuSelect).toHaveValue('side');
    });

    it('updates Menu Status selection when changed', () => {
      renderComponent();
      
      const statusSelect = screen.getByTestId('select-statl');
      fireEvent.change(statusSelect, { target: { value: 'enabled' } });
      
      expect(statusSelect).toHaveValue('enabled');
    });

    it('handles multiple selection changes correctly', () => {
      renderComponent();
      
      const styleSelect = screen.getByTestId('select-style');
      const webSelect = screen.getByTestId('select-webL');
      const menuSelect = screen.getByTestId('select-menuL');
      const statusSelect = screen.getByTestId('select-statl');
      
      fireEvent.change(styleSelect, { target: { value: 'dark' } });
      fireEvent.change(webSelect, { target: { value: 'modern' } });
      fireEvent.change(menuSelect, { target: { value: 'side' } });
      fireEvent.change(statusSelect, { target: { value: 'enabled' } });
      
      expect(styleSelect).toHaveValue('dark');
      expect(webSelect).toHaveValue('modern');
      expect(menuSelect).toHaveValue('side');
      expect(statusSelect).toHaveValue('enabled');
    });
  });

  // Form Submission Tests
  describe('Form Submission', () => {
    it('calls onSaveHandler when save button is clicked', () => {
      const mockSaveHandler = jest.fn();
      renderComponent({ onSaveHandler: mockSaveHandler });
      
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
      
      expect(mockSaveHandler).toHaveBeenCalledTimes(1);
    });

    it('submits form with selected values', () => {
      const mockSaveHandler = jest.fn();
      renderComponent({ onSaveHandler: mockSaveHandler });
      
      // Make selections
      const styleSelect = screen.getByTestId('select-style');
      const webSelect = screen.getByTestId('select-webL');
      const menuSelect = screen.getByTestId('select-menuL');
      const statusSelect = screen.getByTestId('select-statl');
      
      fireEvent.change(styleSelect, { target: { value: 'dark' } });
      fireEvent.change(webSelect, { target: { value: 'modern' } });
      fireEvent.change(menuSelect, { target: { value: 'side' } });
      fireEvent.change(statusSelect, { target: { value: 'enabled' } });
      
      // Submit form
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
      
      expect(mockSaveHandler).toHaveBeenCalledWith({
        StyleList: 'dark',
        WebList: 'modern',
        MenuList: 'side',
        StatusList: 'enabled'
      });
    });

    it('submits form with empty values when no selections made', () => {
      const mockSaveHandler = jest.fn();
      renderComponent({ onSaveHandler: mockSaveHandler });
      
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
      
      expect(mockSaveHandler).toHaveBeenCalledWith({
        StyleList: '',
        WebList: '',
        MenuList: '',
        StatusList: ''
      });
    });
  });

  // Button Tests
  describe('Button Functionality', () => {
    it('renders cancel button with correct properties', () => {
      renderComponent();
      
      const cancelButton = screen.getByTestId('cancel');
      expect(cancelButton).toHaveAttribute('type', 'button');
      expect(cancelButton).toHaveTextContent('Cancel');
    });

    it('renders save button with correct properties', () => {
      renderComponent();
      
      const saveButton = screen.getByText('Save');
      expect(saveButton).toHaveAttribute('type', 'submit');
      expect(saveButton).toHaveTextContent('Save');
    });

    it('cancel button does not trigger form submission', () => {
      const mockSaveHandler = jest.fn();
      renderComponent({ onSaveHandler: mockSaveHandler });
      
      const cancelButton = screen.getByTestId('cancel');
      fireEvent.click(cancelButton);
      
      expect(mockSaveHandler).not.toHaveBeenCalled();
    });
  });

  // Props Handling Tests
  describe('Props Handling', () => {
    it('handles empty select lists gracefully', () => {
      renderComponent({
        StyleList: [],
        WebList: [],
        MenuList: [],
        StatusList: []
      });
      
      expect(screen.getByText('Style')).toBeInTheDocument();
      expect(screen.getByText('Public Website Style')).toBeInTheDocument();
      expect(screen.getByText('Menu Placement')).toBeInTheDocument();
      expect(screen.getByText('Menu Status')).toBeInTheDocument();
    });

    it('handles missing onSaveHandler prop', () => {
      const { onSaveHandler, ...propsWithoutHandler } = defaultProps;
      renderComponent(propsWithoutHandler);
      
      const saveButton = screen.getByText('Save');
      expect(() => fireEvent.click(saveButton)).not.toThrow();
    });

    it('renders with custom select list data', () => {
      const customStyleList = [
        { option: 'Custom Style 1', value: 'custom1' },
        { option: 'Custom Style 2', value: 'custom2' }
      ];
      
      renderComponent({ StyleList: customStyleList });
      
      expect(screen.getByText('Custom Style 1')).toBeInTheDocument();
      expect(screen.getByText('Custom Style 2')).toBeInTheDocument();
    });

    it('handles select lists with duplicate values', () => {
      const duplicateStyleList = [
        { option: 'Style A', value: 'duplicate' },
        { option: 'Style B', value: 'duplicate' }
      ];
      
      renderComponent({ StyleList: duplicateStyleList });
      
      expect(screen.getByText('Style A')).toBeInTheDocument();
      expect(screen.getByText('Style B')).toBeInTheDocument();
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles null/undefined values in select lists', () => {
      const styleListWithNulls = [
        { option: 'Valid Style', value: 'valid' },
        { option: null, value: null },
        { option: undefined, value: undefined }
      ];
      
      expect(() => renderComponent({ StyleList: styleListWithNulls })).not.toThrow();
    });

    it('handles very long option names', () => {
      const longNamesList = [
        { 
          option: 'This is a very long option name that might cause layout issues if not handled properly', 
          value: 'long' 
        }
      ];
      
      renderComponent({ StyleList: longNamesList });
      
      expect(screen.getByText('This is a very long option name that might cause layout issues if not handled properly')).toBeInTheDocument();
    });

    it('handles special characters in option values', () => {
      const specialCharsList = [
        { option: 'Style with @#$%', value: 'special@#$%' },
        { option: 'Style with spaces', value: 'value with spaces' }
      ];
      
      renderComponent({ StyleList: specialCharsList });
      
      expect(screen.getByText('Style with @#$%')).toBeInTheDocument();
      expect(screen.getByText('Style with spaces')).toBeInTheDocument();
    });

    it('handles rapid selection changes', () => {
      renderComponent();
      
      const styleSelect = screen.getByTestId('select-style');
      
      // Rapidly change selections
      fireEvent.change(styleSelect, { target: { value: 'dark' } });
      fireEvent.change(styleSelect, { target: { value: 'light' } });
      fireEvent.change(styleSelect, { target: { value: 'default' } });
      
      expect(styleSelect).toHaveValue('default');
    });
  });

  // Layout and Structure Tests
  describe('Layout and Structure', () => {
    it('renders form with correct structure', () => {
      renderComponent();
      
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
      
      const rows = document.querySelectorAll('.row');
      expect(rows).toHaveLength(2); // Two rows for select lists
    });

    it('renders select lists in correct grid layout', () => {
      renderComponent();
      
      const columns = document.querySelectorAll('.col-lg-6');
      expect(columns).toHaveLength(4); // Four select lists in columns
    });

    it('renders footer buttons section', () => {
      renderComponent();
      
      const footerSection = document.querySelector('.footer-buttons');
      expect(footerSection).toBeInTheDocument();
    });

    it('applies correct CSS classes', () => {
      renderComponent();
      
      const scrollContainer = document.querySelector('.custom-content-scroll');
      expect(scrollContainer).toBeInTheDocument();
      
      const footerButtons = document.querySelector('.footer-buttons');
      expect(footerButtons).toHaveClass('d-flex', 'flex-column-reverse', 'ps-4');
    });
  });

  // Integration Tests
  describe('Integration Tests', () => {
    it('handles complete form workflow', async () => {
      const mockSaveHandler = jest.fn();
      renderComponent({ onSaveHandler: mockSaveHandler });
      
      // Select values from all dropdowns
      fireEvent.change(screen.getByTestId('select-style'), { target: { value: 'dark' } });
      fireEvent.change(screen.getByTestId('select-webL'), { target: { value: 'modern' } });
      fireEvent.change(screen.getByTestId('select-menuL'), { target: { value: 'side' } });
      fireEvent.change(screen.getByTestId('select-statl'), { target: { value: 'enabled' } });
      
      // Submit form
      fireEvent.click(screen.getByText('Save'));
      
      // Verify submission
      expect(mockSaveHandler).toHaveBeenCalledWith({
        StyleList: 'dark',
        WebList: 'modern',
        MenuList: 'side',
        StatusList: 'enabled'
      });
      
      // Verify form reset
      await waitFor(() => {
        expect(screen.getByTestId('select-style')).toHaveValue('');
        expect(screen.getByTestId('select-webL')).toHaveValue('');
        expect(screen.getByTestId('select-menuL')).toHaveValue('');
        expect(screen.getByTestId('select-statl')).toHaveValue('');
      });
    });

    it('handles multiple submissions correctly', () => {
      const mockSaveHandler = jest.fn();
      renderComponent({ onSaveHandler: mockSaveHandler });
      
      // First submission
      fireEvent.change(screen.getByTestId('select-style'), { target: { value: 'dark' } });
      fireEvent.click(screen.getByText('Save'));
      
      // Second submission
      fireEvent.change(screen.getByTestId('select-style'), { target: { value: 'light' } });
      fireEvent.click(screen.getByText('Save'));
      
      expect(mockSaveHandler).toHaveBeenCalledTimes(2);
      expect(mockSaveHandler).toHaveBeenNthCalledWith(1, expect.objectContaining({ StyleList: 'dark' }));
      expect(mockSaveHandler).toHaveBeenNthCalledWith(2, expect.objectContaining({ StyleList: 'light' }));
    });
  });
  // Accessibility Tests
  describe('Accessibility', () => {
    it('provides appropriate data-testid attributes for testing', () => {
      renderComponent();
      
      expect(screen.getByTestId('rds-select-style')).toBeInTheDocument();
      expect(screen.getByTestId('rds-select-webL')).toBeInTheDocument();
      expect(screen.getByTestId('rds-select-menuL')).toBeInTheDocument();
      expect(screen.getByTestId('rds-select-statl')).toBeInTheDocument();
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
    });

    it('renders buttons with proper types', () => {
      renderComponent();
      
      const cancelButton = screen.getByTestId('cancel');
      const saveButton = screen.getByText('Save');
      
      expect(cancelButton).toHaveAttribute('type', 'button');
      expect(saveButton).toHaveAttribute('type', 'submit');
    });
  });
});
