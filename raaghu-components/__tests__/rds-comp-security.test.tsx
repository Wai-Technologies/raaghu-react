import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompSecurity, { RdsCompSecurityProps } from '../src/rds-comp-security/rds-comp-security';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ name, label, inputType, placeholder, onChange, value, dataTestId }: any) => (
    <div data-testid={dataTestId || 'rds-input'}>
      {label && <label>{name}</label>}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        data-name={name}
      />
    </div>
  ),
  RdsCheckbox: ({ labelText, checked, onChange, dataTestId }: any) => (
    <div data-testid={dataTestId || `checkbox-${labelText?.replace(/\s+/g, '-').toLowerCase()}`} className="rds-checkbox">
      <input
        type="checkbox"
        checked={checked || false}
        onChange={onChange}
        data-label={labelText}
      />
      <label>{labelText}</label>
    </div>
  ),
  RdsCheckboxGroup: ({ items, dataTestId }: any) => (
    <div data-testid={dataTestId || 'rds-checkbox-group'} className="rds-checkbox-group">
      {items?.map((item: any, index: number) => (
        <div key={index} data-label={item.label} data-checked={item.checked} />
      ))}
    </div>
  ),
  RdsCounter: ({ counterValue, label, min, max, width, type, colorVariant, dataTestId }: any) => (
    <div data-testid={dataTestId || 'rds-counter'} className="rds-counter">
      <span data-value={counterValue} data-min={min} data-max={max} data-width={width} data-type={type} data-color={colorVariant}>
        {label}
      </span>
      <button data-testid="decrement-button" onClick={() => {}}>-</button>
      <span data-testid="counter-value">{counterValue}</span>
      <button data-testid="increment-button" onClick={() => {}}>+</button>
    </div>
  )
}));

// Mock RdsCompDatatable
jest.mock('../src/rds-comp-data-table', () => {
  return function MockRdsCompDatatable(props: any) {
    return (
      <div data-testid="rds-comp-datatable">
        Mock Data Table
      </div>
    );
  };
});

describe('RdsCompSecurity Component', () => {
  const mockCheckgroupList = [
    { label: 'Require Digit', checked: false, onCheck: jest.fn() },
    { label: 'Require Lowercase', checked: false, onCheck: jest.fn() },
    { label: 'Require Non-Alphanumeric', checked: false, onCheck: jest.fn() },
    { label: 'Require Uppercase', checked: false, onCheck: jest.fn() }
  ];
  const defaultProps: RdsCompSecurityProps = {
    checkgroupList: [...mockCheckgroupList],
    tableHeaders: [],
    security: "default" // This is required for the component to render content
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      render(<RdsCompSecurity {...defaultProps} />);
      
      // Check for main sections
      expect(screen.getByText('Password Complexity')).toBeInTheDocument();
      expect(screen.getByText('User Lock Out')).toBeInTheDocument();
      expect(screen.getByText('Two Factor Login')).toBeInTheDocument();
      expect(screen.getByText('Only One Concurrent Login per user')).toBeInTheDocument();
    });

    it('should render all checkboxes from the checkgroupList prop', () => {
      render(<RdsCompSecurity {...defaultProps} />);
      
      // Check if all checkboxes are rendered
      mockCheckgroupList.forEach(item => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });

    it('should render default settings checkbox', () => {
      render(<RdsCompSecurity {...defaultProps} />);
      
      // Check for default settings checkbox
      expect(screen.getByText('Use Default Settings')).toBeInTheDocument();
    });

    it('should render counters and inputs', () => {
      render(<RdsCompSecurity {...defaultProps} />);
      
      // Check for counters
      const counters = screen.getAllByTestId('rds-counter');
      expect(counters.length).toBe(2);
      
      // Check for inputs
      expect(screen.getByTestId('rds-input')).toBeInTheDocument();
      expect(screen.getByText('Account Locking Duration(as seconds)')).toBeInTheDocument();
    });
  });

  describe('Component Interaction', () => {
    it('should update child checkbox and enable default settings when a checkbox is checked', () => {
      render(<RdsCompSecurity {...defaultProps} />);
      
      // Initially default settings checkbox should be unchecked
      const defaultSettingsCheckbox = screen.getByTestId('checkbox-use-default-settings');
      expect(defaultSettingsCheckbox.querySelector('input')).not.toBeChecked();
      
      // Find and click the first checkbox
      const firstCheckbox = screen.getByText('Require Digit').closest('div');
      fireEvent.click(firstCheckbox!.querySelector('input')!);
      
      // Now default settings checkbox should be checked
      expect(defaultSettingsCheckbox.querySelector('input')).toBeChecked();
    });
  });

  describe('Props Handling', () => {
    it('should apply the checkgroupList prop correctly', () => {
      const customCheckgroupList = [
        { label: 'Custom Option 1', checked: true, onCheck: jest.fn() },
        { label: 'Custom Option 2', checked: false, onCheck: jest.fn() }
      ];
      
      render(<RdsCompSecurity checkgroupList={customCheckgroupList} tableHeaders={[]} security="default" />);
      
      // Check if custom checkboxes are rendered
      expect(screen.getByText('Custom Option 1')).toBeInTheDocument();
      expect(screen.getByText('Custom Option 2')).toBeInTheDocument();
    });
  });
  describe('Edge Cases', () => {
    it('should handle empty checkgroupList', () => {
      expect(() => render(<RdsCompSecurity checkgroupList={[]} tableHeaders={[]} security="default" />)).not.toThrow();
    });

    it('should handle checkgroupList with missing properties', () => {
      const incompleteList = [
        { label: 'Missing onCheck' },
        { checked: true, label: 'Missing onCheck but checked' }
      ];
      
      expect(() => render(<RdsCompSecurity checkgroupList={incompleteList as any} tableHeaders={[]} security="default" />)).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have proper label associations', () => {
      render(<RdsCompSecurity {...defaultProps} />);
      
      // Check for main section labels
      expect(screen.getByText('Password Complexity')).toBeInTheDocument();
      expect(screen.getByText('User Lock Out')).toBeInTheDocument();
      expect(screen.getByText('Two Factor Login')).toBeInTheDocument();
      
      // Check for input label
      expect(screen.getByText('Account Locking Duration(as seconds)')).toBeInTheDocument();
    });

    it('should have properly labeled checkboxes', () => {
      render(<RdsCompSecurity {...defaultProps} />);
      
      // Check checkbox labels
      expect(screen.getByText('Use Default Settings')).toBeInTheDocument();
      expect(screen.getByText('Enable user Account Locking On Failed Login Attempts')).toBeInTheDocument();
      expect(screen.getByText('Enable Two Factor Login')).toBeInTheDocument();
    });
  });
});
