import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompDynamicProperties, { RdsCompDynamicPropertiesProp } from '../src/rds-comp-dynamic-properties/rds-comp-dynamic-properties';

// Mock RdsDatatable component
jest.mock('../src/rds-data-table/rds-data-table', () => {
  return {
    __esModule: true,
    default: ({ 
      tableHeaders, 
      actions, 
      tableData, 
      onActionSelection,
      ...props 
    }: any) => (
      <div data-testid="rds-comp-datatable" {...props}>
        {tableHeaders?.map((header: any, index: number) => (
          <div key={index} data-testid={`header-${header.key || index}`}>
            {header.displayName || header}
          </div>
        ))}
        {tableData?.map((row: any, index: number) => (
          <div key={index} data-testid={`row-${index}`}>
            {JSON.stringify(row)}
          </div>
        ))}
        {actions?.map((action: any, index: number) => (
          <button 
            key={index} 
            data-testid={`action-${action.id || index}`}
            onClick={() => onActionSelection && onActionSelection(action)}
          >
            {action.displayName || action}
          </button>
        ))}
      </div>
    ),
    ActionPosition: {
      Right: 'Right',
      Left: 'Left'
    }
  };
});

// Mock rds-elements
jest.mock('../src/rds-elements', () => ({
  RdsDropdownList: ({ placeholder, onClick, selectedItems, listItems, ...props }: any) => (
    <div data-testid="rds-dropdown-list" {...props}>
      <input 
        placeholder={placeholder}
        onClick={() => onClick && onClick('test-value', 'test-field')}
        data-testid="dropdown-input"
      />
      {listItems?.map((item: any, index: number) => (
        <div key={index} data-testid={`dropdown-item-${index}`}>
          {item.label || item}
        </div>
      ))}
    </div>
  ),
  RdsButton: ({ label, onClick, isDisabled, dataTestId, ...props }: any) => (
    <button 
      onClick={onClick}
      disabled={isDisabled}
      data-testid={dataTestId || 'rds-button'}
      {...props}
    >
      {label}
    </button>
  )
}));

describe('RdsCompDynamicProperties', () => {
  const mockPropertyHeaders = [
    { displayName: 'Property Name', key: 'name', datatype: 'text' },
    { displayName: 'Property Value', key: 'value', datatype: 'text' }
  ];

  const mockPropertyData = [
    { id: 1, name: 'ConnectionString', value: 'Server=localhost;Database=test' },
    { id: 2, name: 'MaxRetryCount', value: '3' }
  ];

  const mockActions = [
    { id: 'edit', displayName: 'Edit' },
    { id: 'delete', displayName: 'Delete' }
  ];

  const mockOnActionSelection = jest.fn();
  const mockOnSelectedItems = jest.fn();

  const baseProps: RdsCompDynamicPropertiesProp = {
    propertyData: mockPropertyData,
    propertyHeaders: mockPropertyHeaders,
    actions: mockActions,
    onActionSelection: mockOnActionSelection,
    parameterList: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Default mode (datatable)', () => {
    it('should render datatable when dynamic prop is "default"', () => {
      render(<RdsCompDynamicProperties {...baseProps} dynamic="default" />);
      
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    });

    it('should pass correct props to datatable', () => {
      render(<RdsCompDynamicProperties {...baseProps} dynamic="default" />);
      
      expect(screen.getByTestId('header-name')).toHaveTextContent('Property Name');
      expect(screen.getByTestId('header-value')).toHaveTextContent('Property Value');
      expect(screen.getByTestId('row-0')).toBeInTheDocument();
      expect(screen.getByTestId('row-1')).toBeInTheDocument();
    });

    it('should handle action selection in datatable', () => {
      render(<RdsCompDynamicProperties {...baseProps} dynamic="default" />);
      
      const editButton = screen.getByTestId('action-edit');
      fireEvent.click(editButton);
      
      expect(mockOnActionSelection).toHaveBeenCalled();
    });
  });

  describe('Advanced mode (form)', () => {
    const advancedProps = {
      ...baseProps,
      dynamic: 'advanced',
      entityNames: [
        { label: 'User', value: 'user' },
        { label: 'Product', value: 'product' }
      ],
      parameterList: [
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' }
      ],
      onSelectedItems: mockOnSelectedItems,
      offcanvasId: 'test-offcanvas'
    };

    it('should render form when dynamic prop is "advanced"', () => {
      render(<RdsCompDynamicProperties {...advancedProps} />);
      
      expect(screen.getByText('Entity')).toBeInTheDocument();
      expect(screen.getByText('Parameter')).toBeInTheDocument();
      expect(screen.getByTestId('save')).toBeInTheDocument();
    });

    it('should render entity dropdown', () => {
      render(<RdsCompDynamicProperties {...advancedProps} />);
      
      const dropdowns = screen.getAllByTestId('rds-dropdown-list');
      expect(dropdowns).toHaveLength(2); // Entity and Parameter dropdowns
    });    it('should render save button', () => {
      render(<RdsCompDynamicProperties {...advancedProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeInTheDocument();
    });

    it('should render cancel and save buttons', () => {
      render(<RdsCompDynamicProperties {...advancedProps} />);
      
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });
  describe('No dynamic prop', () => {
    it('should render nothing when dynamic prop is not provided', () => {
      const { container } = render(<RdsCompDynamicProperties {...baseProps} />);
      
      expect(container).toBeEmptyDOMElement();
    });

    it('should render nothing when dynamic prop is neither "default" nor "advanced"', () => {
      const { container } = render(<RdsCompDynamicProperties {...baseProps} dynamic="other" />);
      
      expect(container).toBeEmptyDOMElement();
    });
  });
});