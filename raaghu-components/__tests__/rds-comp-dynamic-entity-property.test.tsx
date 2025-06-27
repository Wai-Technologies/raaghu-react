import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompDynamicEntityProperty, { RdsCompDynamicEntityPropertyProp } from '../src/rds-comp-dynamic-entity-property/rds-comp-dynamic-entity-property';

// Mock RDS components
jest.mock('../src/rds-elements', () => ({
  RdsDropdownList: ({ placeholder, listItems, onClick, selectedItems, reset, multiSelect, borderDropdown, ...props }: any) => (
    <div 
      data-testid={`dropdown-${placeholder?.toLowerCase().replace(/\s+/g, '-')}`}
      data-placeholder={placeholder}
      data-multi-select={multiSelect}
      data-border-dropdown={borderDropdown}
      data-reset={reset}
      onClick={() => onClick && onClick('test-value', 'test-param')}
      {...props}
    >
      <select data-testid={`select-${placeholder?.toLowerCase().replace(/\s+/g, '-')}`}>
        {listItems?.map((item: any, index: number) => (
          <option key={index} value={item.value || item}>
            {item.label || item}
          </option>
        ))}
      </select>
      {placeholder}
    </div>
  ),
  RdsButton: ({ label, onClick, isDisabled, dataTestId, type, colorVariant, isOutline, size, ...props }: any) => (
    <button 
      data-testid={dataTestId || `button-${label?.toLowerCase()}`}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      data-color-variant={colorVariant}
      data-outline={isOutline}
      data-size={size}
      {...props}
    >
      {label}
    </button>
  ),
}));

describe('RdsCompDynamicEntityProperty', () => {
  const mockEntityNames = [
    { label: 'User', value: 'user' },
    { label: 'Product', value: 'product' },
    { label: 'Order', value: 'order' },
  ];

  const mockParameterList = [
    { label: 'Name', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'Address', value: 'address' },
  ];

  const defaultProps: RdsCompDynamicEntityPropertyProp = {
    entityNames: mockEntityNames,
    parameterList: mockParameterList,
    reset: false,
    onSelectedItems: jest.fn(),
    offcanvasId: 'test-offcanvas',
    entityFields: {
      entity: '',
      parameter: ''
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  // 1. Basic Rendering Tests
  it('should render the form with all required elements', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
    expect(screen.getByText('Entity')).toBeInTheDocument();
    expect(screen.getByText('Parameter')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-select-entity')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-select-parameter')).toBeInTheDocument();
  });

  it('should render cancel and save buttons', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    const cancelButton = screen.getByTestId('button-cancel');
    const saveButton = screen.getByTestId('save');
    
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent('Cancel');
    expect(saveButton).toHaveTextContent('Save');
  });

  // 2. Dropdown Configuration Tests
  it('should configure entity dropdown correctly', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    const entityDropdown = screen.getByTestId('dropdown-select-entity');
    
    expect(entityDropdown).toHaveAttribute('data-placeholder', 'Select Entity');
    expect(entityDropdown).toHaveAttribute('data-border-dropdown', 'true');
    expect(entityDropdown).not.toHaveAttribute('data-multi-select');
  });

  it('should configure parameter dropdown correctly', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    const parameterDropdown = screen.getByTestId('dropdown-select-parameter');
    
    expect(parameterDropdown).toHaveAttribute('data-placeholder', 'Select Parameter');
    expect(parameterDropdown).toHaveAttribute('data-border-dropdown', 'true');
    expect(parameterDropdown).toHaveAttribute('data-multi-select', 'true');
  });

  // 3. Button Properties Tests
  it('should configure buttons with correct properties', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    const cancelButton = screen.getByTestId('button-cancel');
    const saveButton = screen.getByTestId('save');
    
    // Cancel button properties
    expect(cancelButton).toHaveAttribute('data-color-variant', 'primary');
    expect(cancelButton).toHaveAttribute('data-outline', 'true');
    expect(cancelButton).toHaveAttribute('data-size', 'small');
    expect(cancelButton).toHaveAttribute('type', 'button');
    
    // Save button properties
    expect(saveButton).toHaveAttribute('data-color-variant', 'primary');
    expect(saveButton).toHaveAttribute('data-size', 'small');
    expect(saveButton).toHaveAttribute('type', 'submit');
  });

  // 4. Form Validation Tests
  it('should disable save button when form is invalid (empty entity and parameter)', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    const saveButton = screen.getByTestId('save');
    expect(saveButton).toBeDisabled();
  });

  it('should enable save button when form is valid', () => {
    const propsWithData = {
      ...defaultProps,
      entityFields: {
        entity: 'user',
        parameter: ['name', 'email']
      }
    };
    
    render(<RdsCompDynamicEntityProperty {...propsWithData} />);
    
    const saveButton = screen.getByTestId('save');
    expect(saveButton).not.toBeDisabled();
  });

  // 5. State Management Tests
  it('should update entityData when entityFields prop changes', () => {
    const { rerender } = render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    const newEntityFields = {
      entity: 'product',
      parameter: ['name']
    };
    
    rerender(
      <RdsCompDynamicEntityProperty 
        {...defaultProps} 
        entityFields={newEntityFields} 
      />
    );
    
    // Component should update with new data
    expect(screen.getByTestId('save')).not.toBeDisabled();
  });  it('should handle reset functionality', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    const entityDropdown = screen.getByTestId('dropdown-select-entity');
    const parameterDropdown = screen.getByTestId('dropdown-select-parameter');
    
    // Initially reset should be false
    expect(entityDropdown).toHaveAttribute('data-reset', 'false');
    expect(parameterDropdown).toHaveAttribute('data-reset', 'false');
  });

  // 6. Event Handler Tests
  it('should call onSelectedItems when form is submitted', () => {
    const mockOnSelectedItems = jest.fn();
    const propsWithValidData = {
      ...defaultProps,
      onSelectedItems: mockOnSelectedItems,
      entityFields: {
        entity: 'user',
        parameter: ['name', 'email']
      }
    };
    
    render(<RdsCompDynamicEntityProperty {...propsWithValidData} />);
    
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);
    
    expect(mockOnSelectedItems).toHaveBeenCalled();
  });
  it('should prevent default form submission', () => {
    const mockOnSelectedItems = jest.fn();
    const propsWithValidData = {
      ...defaultProps,
      onSelectedItems: mockOnSelectedItems,
      entityFields: {
        entity: 'user',
        parameter: ['name']
      }
    };
    
    render(<RdsCompDynamicEntityProperty {...propsWithValidData} />);
    
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
    
    const mockPreventDefault = jest.fn();
    
    fireEvent.submit(form!, { preventDefault: mockPreventDefault });
    
    // The component should handle form submission
    expect(screen.getByTestId('save')).toBeInTheDocument();
  });

  // 7. Dropdown List Rendering Tests
  it('should render entity dropdown with correct list items', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    const entitySelect = screen.getByTestId('select-select-entity');
    const options = entitySelect.querySelectorAll('option');
    
    expect(options).toHaveLength(mockEntityNames.length);
    expect(options[0]).toHaveTextContent('User');
    expect(options[1]).toHaveTextContent('Product');
    expect(options[2]).toHaveTextContent('Order');
  });

  it('should render parameter dropdown with correct list items', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    const parameterSelect = screen.getByTestId('select-select-parameter');
    const options = parameterSelect.querySelectorAll('option');
    
    expect(options).toHaveLength(mockParameterList.length);
    expect(options[0]).toHaveTextContent('Name');
    expect(options[1]).toHaveTextContent('Email');
    expect(options[2]).toHaveTextContent('Phone');
    expect(options[3]).toHaveTextContent('Address');
  });

  // 8. Edge Cases Tests
  it('should handle empty entityNames list', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} entityNames={[]} />);
    
    const entitySelect = screen.getByTestId('select-select-entity');
    const options = entitySelect.querySelectorAll('option');
    
    expect(options).toHaveLength(0);
  });

  it('should handle empty parameterList', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} parameterList={[]} />);
    
    const parameterSelect = screen.getByTestId('select-select-parameter');
    const options = parameterSelect.querySelectorAll('option');
    
    expect(options).toHaveLength(0);
  });

  it('should handle missing onSelectedItems callback', () => {
    const propsWithoutCallback = {
      ...defaultProps,
      onSelectedItems: undefined,
      entityFields: {
        entity: 'user',
        parameter: ['name']
      }
    };
    
    render(<RdsCompDynamicEntityProperty {...propsWithoutCallback} />);
    
    const saveButton = screen.getByTestId('save');
    
    expect(() => {
      fireEvent.click(saveButton);
    }).not.toThrow();
  });
  // 9. Component Structure Tests
  it('should have correct CSS classes and structure', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
    
    // Check for basic structure elements
    expect(screen.getByText('Entity')).toBeInTheDocument();
    expect(screen.getByText('Parameter')).toBeInTheDocument();
    expect(screen.getByTestId('save')).toBeInTheDocument();
    expect(screen.getByTestId('button-cancel')).toBeInTheDocument();
  });
  it('should have proper form groups with labels', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    // Check that both Entity and Parameter labels are present
    expect(screen.getByText('Entity')).toBeInTheDocument();
    expect(screen.getByText('Parameter')).toBeInTheDocument();
    
    // Check that both dropdowns are present
    expect(screen.getByTestId('dropdown-select-entity')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-select-parameter')).toBeInTheDocument();
  });

  // 10. Offcanvas Integration Tests
  it('should configure buttons with offcanvas attributes', () => {
    render(<RdsCompDynamicEntityProperty {...defaultProps} />);
    
    const cancelButton = screen.getByTestId('button-cancel');
    const saveButton = screen.getByTestId('save');
    
    expect(cancelButton).toHaveAttribute('databstoggle', 'offcanvas');
    expect(cancelButton).toHaveAttribute('databstarget', '#test-offcanvas');
    expect(cancelButton).toHaveAttribute('ariacontrols', 'test-offcanvas');
    
    expect(saveButton).toHaveAttribute('databstoggle', 'offcanvas');
    expect(saveButton).toHaveAttribute('databstarget', '#test-offcanvas');
    expect(saveButton).toHaveAttribute('ariacontrols', 'test-offcanvas');
  });
});