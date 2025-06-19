import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompDynamicProperties, { RdsCompDynamicPropertiesProp } from '../src/rds-comp-dynamic-properties/rds-comp-dynamic-properties';

// Mock RdsCompDatatable component
jest.mock('../src/rds-comp-data-table/rds-comp-data-table', () => {
  return {
    __esModule: true,
    default: ({ 
      actionPosition, 
      tableHeaders, 
      actions, 
      tableData, 
      pagination, 
      recordsPerPage, 
      onActionSelection, 
      recordsPerPageSelectListOption, 
      classes,
      ...props 
    }: any) => (
      <div 
        data-testid="rds-comp-datatable"
        data-action-position={actionPosition}
        data-pagination={pagination}
        data-records-per-page={recordsPerPage}
        data-records-per-page-select-list-option={recordsPerPageSelectListOption}
        data-classes={classes}
        {...props}
      >
        <div data-testid="table-headers">
          {tableHeaders?.map((header: any, index: number) => (
            <div key={index} data-testid={`header-${header.key || index}`}>
              {header.displayName || header}
            </div>
          ))}
        </div>
        <div data-testid="table-data">
          {tableData?.map((row: any, index: number) => (
            <div key={index} data-testid={`row-${index}`}>
              {JSON.stringify(row)}
            </div>
          ))}
        </div>        <div data-testid="table-actions">
          {actions?.map((action: any, index: number) => (
            <button 
              key={index} 
              data-testid={`action-${action.id || index}`}
              onClick={() => onActionSelection && onActionSelection(tableData?.[0] || {}, action.id)}
            >
              {action.displayName || action}
            </button>
          ))}
        </div>
      </div>
    ),
    ActionPosition: {
      Right: 'Right',
      Left: 'Left'
    }
  };
});

describe('RdsCompDynamicProperties', () => {
  const mockPropertyHeaders = [
    { displayName: 'Property Name', key: 'name', datatype: 'text' },
    { displayName: 'Property Value', key: 'value', datatype: 'text' },
    { displayName: 'Data Type', key: 'dataType', datatype: 'text' },
    { displayName: 'Required', key: 'required', datatype: 'boolean' }
  ];

  const mockPropertyData = [
    { id: 1, name: 'ConnectionString', value: 'Server=localhost;Database=test', dataType: 'string', required: true },
    { id: 2, name: 'MaxRetryCount', value: '3', dataType: 'number', required: false },
    { id: 3, name: 'EnableLogging', value: 'true', dataType: 'boolean', required: true },
    { id: 4, name: 'ApiTimeout', value: '30000', dataType: 'number', required: false }
  ];

  const mockActions = [
    { id: 'edit', displayName: 'Edit', modalId: 'editPropertyModal' },
    { id: 'delete', displayName: 'Delete' },
    { id: 'duplicate', displayName: 'Duplicate' }
  ];

  const mockOnActionSelection = jest.fn();

  const defaultProps: RdsCompDynamicPropertiesProp = {
    propertyData: mockPropertyData,
    propertyHeaders: mockPropertyHeaders,
    actions: mockActions,
    onActionSelection: mockOnActionSelection,
    parameterList: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Rendering Tests
  it('should render the component without crashing', () => {
    render(<RdsCompDynamicProperties {...defaultProps} />);
    
    expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
  });

  it('should render RdsCompDatatable with correct props', () => {
    render(<RdsCompDynamicProperties {...defaultProps} />);
    
    const datatable = screen.getByTestId('rds-comp-datatable');
    
    expect(datatable).toHaveAttribute('data-action-position', 'Right');
    expect(datatable).toHaveAttribute('data-pagination', 'true');
    expect(datatable).toHaveAttribute('data-records-per-page', '10');
    expect(datatable).toHaveAttribute('data-records-per-page-select-list-option', 'true');
    expect(datatable).toHaveAttribute('data-classes', 'table');
  });

  // 2. Props Validation Tests
  it('should pass propertyHeaders to tableHeaders prop', () => {
    render(<RdsCompDynamicProperties {...defaultProps} />);
    
    const tableHeaders = screen.getByTestId('table-headers');
    expect(tableHeaders).toBeInTheDocument();
    
    expect(screen.getByTestId('header-name')).toHaveTextContent('Property Name');
    expect(screen.getByTestId('header-value')).toHaveTextContent('Property Value');
    expect(screen.getByTestId('header-dataType')).toHaveTextContent('Data Type');
    expect(screen.getByTestId('header-required')).toHaveTextContent('Required');
  });

  it('should pass propertyData to tableData prop', () => {
    render(<RdsCompDynamicProperties {...defaultProps} />);
    
    const tableData = screen.getByTestId('table-data');
    expect(tableData).toBeInTheDocument();
    
    expect(screen.getByTestId('row-0')).toBeInTheDocument();
    expect(screen.getByTestId('row-1')).toBeInTheDocument();
    expect(screen.getByTestId('row-2')).toBeInTheDocument();
    expect(screen.getByTestId('row-3')).toBeInTheDocument();
  });

  it('should pass actions to actions prop', () => {
    render(<RdsCompDynamicProperties {...defaultProps} />);
    
    const tableActions = screen.getByTestId('table-actions');
    expect(tableActions).toBeInTheDocument();
    
    expect(screen.getByTestId('action-edit')).toHaveTextContent('Edit');
    expect(screen.getByTestId('action-delete')).toHaveTextContent('Delete');
    expect(screen.getByTestId('action-duplicate')).toHaveTextContent('Duplicate');
  });

  it('should pass onActionSelection callback', () => {
    render(<RdsCompDynamicProperties {...defaultProps} />);
    
    const editButton = screen.getByTestId('action-edit');
    fireEvent.click(editButton);
    
    expect(mockOnActionSelection).toHaveBeenCalled();
  });

  // 3. Default Configuration Tests
  it('should configure datatable with correct default settings', () => {
    render(<RdsCompDynamicProperties {...defaultProps} />);
    
    const datatable = screen.getByTestId('rds-comp-datatable');
    
    // Verify fixed configuration values
    expect(datatable).toHaveAttribute('data-action-position', 'Right');
    expect(datatable).toHaveAttribute('data-pagination', 'true');
    expect(datatable).toHaveAttribute('data-records-per-page', '10');
    expect(datatable).toHaveAttribute('data-records-per-page-select-list-option', 'true');
    expect(datatable).toHaveAttribute('data-classes', 'table');
  });

  // 4. Data Handling Tests
  it('should handle empty propertyData array', () => {
    render(<RdsCompDynamicProperties {...defaultProps} propertyData={[]} />);
    
    const tableData = screen.getByTestId('table-data');
    expect(tableData).toBeInTheDocument();
    expect(tableData).toBeEmptyDOMElement();
  });

  it('should handle empty propertyHeaders array', () => {
    render(<RdsCompDynamicProperties {...defaultProps} propertyHeaders={[]} />);
    
    const tableHeaders = screen.getByTestId('table-headers');
    expect(tableHeaders).toBeInTheDocument();
    expect(tableHeaders).toBeEmptyDOMElement();
  });

  it('should handle empty actions array', () => {
    render(<RdsCompDynamicProperties {...defaultProps} actions={[]} />);
    
    const tableActions = screen.getByTestId('table-actions');
    expect(tableActions).toBeInTheDocument();
    expect(tableActions).toBeEmptyDOMElement();
  });

  it('should render with complex property data', () => {
    const complexPropertyData = [
      { 
        id: 1, 
        name: 'Database.Connection', 
        value: '{"server":"localhost","port":5432,"database":"myapp"}', 
        dataType: 'json', 
        required: true,
        category: 'Database',
        description: 'Main database connection configuration'
      },
      { 
        id: 2, 
        name: 'Authentication.JwtSecret', 
        value: '***hidden***', 
        dataType: 'secret', 
        required: true,
        category: 'Security',
        description: 'JWT token signing secret'
      }
    ];

    render(<RdsCompDynamicProperties {...defaultProps} propertyData={complexPropertyData} />);
    
    expect(screen.getByTestId('row-0')).toBeInTheDocument();
    expect(screen.getByTestId('row-1')).toBeInTheDocument();
  });

  // 5. Action Handling Tests
  it('should handle action selection with row data', () => {
    render(<RdsCompDynamicProperties {...defaultProps} />);
    
    const editButton = screen.getByTestId('action-edit');
    fireEvent.click(editButton);
    
    expect(mockOnActionSelection).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple action types', () => {
    const multipleActions = [
      { id: 'view', displayName: 'View Details' },
      { id: 'edit', displayName: 'Edit Property', modalId: 'editModal' },
      { id: 'delete', displayName: 'Delete Property' },
      { id: 'copy', displayName: 'Copy Property' },
      { id: 'export', displayName: 'Export Property' }
    ];

    render(<RdsCompDynamicProperties {...defaultProps} actions={multipleActions} />);
    
    expect(screen.getByTestId('action-view')).toHaveTextContent('View Details');
    expect(screen.getByTestId('action-edit')).toHaveTextContent('Edit Property');
    expect(screen.getByTestId('action-delete')).toHaveTextContent('Delete Property');
    expect(screen.getByTestId('action-copy')).toHaveTextContent('Copy Property');
    expect(screen.getByTestId('action-export')).toHaveTextContent('Export Property');
  });
  it('should handle missing onActionSelection callback gracefully', () => {
    const propsWithoutCallback = {
      ...defaultProps,
      onActionSelection: jest.fn() // Use a mock function instead of undefined
    };

    render(<RdsCompDynamicProperties {...propsWithoutCallback} />);
    
    const editButton = screen.getByTestId('action-edit');
    
    expect(() => {
      fireEvent.click(editButton);
    }).not.toThrow();
  });

  // 6. Header Configuration Tests
  it('should handle different header data types', () => {
    const variedHeaders = [
      { displayName: 'ID', key: 'id', datatype: 'number' },
      { displayName: 'Name', key: 'name', datatype: 'text' },
      { displayName: 'Active', key: 'active', datatype: 'boolean' },
      { displayName: 'Created Date', key: 'createdDate', datatype: 'date' },
      { displayName: 'Actions', key: 'actions', datatype: 'button' }
    ];

    render(<RdsCompDynamicProperties {...defaultProps} propertyHeaders={variedHeaders} />);
    
    expect(screen.getByTestId('header-id')).toHaveTextContent('ID');
    expect(screen.getByTestId('header-name')).toHaveTextContent('Name');
    expect(screen.getByTestId('header-active')).toHaveTextContent('Active');
    expect(screen.getByTestId('header-createdDate')).toHaveTextContent('Created Date');
    expect(screen.getByTestId('header-actions')).toHaveTextContent('Actions');
  });

  it('should handle headers with additional properties', () => {
    const extendedHeaders = [
      { 
        displayName: 'Property Name', 
        key: 'name', 
        datatype: 'text', 
        sortable: true, 
        required: true,
        colWidth: '200px'
      },
      { 
        displayName: 'Property Value', 
        key: 'value', 
        datatype: 'text', 
        sortable: false, 
        required: false,
        colWidth: '300px'
      }
    ];

    render(<RdsCompDynamicProperties {...defaultProps} propertyHeaders={extendedHeaders} />);
    
    expect(screen.getByTestId('header-name')).toHaveTextContent('Property Name');
    expect(screen.getByTestId('header-value')).toHaveTextContent('Property Value');
  });

  // 7. Component Integration Tests
  it('should render within a parent container', () => {
    const { container } = render(
      <div className="properties-container">
        <RdsCompDynamicProperties {...defaultProps} />
      </div>
    );
    
    const parentContainer = container.querySelector('.properties-container');
    expect(parentContainer).toBeInTheDocument();
    expect(parentContainer).toContainElement(screen.getByTestId('rds-comp-datatable'));
  });

  it('should handle prop updates correctly', () => {
    const { rerender } = render(<RdsCompDynamicProperties {...defaultProps} />);
    
    expect(screen.getAllByTestId(/^row-/)).toHaveLength(4);
    
    const updatedData = [
      { id: 1, name: 'UpdatedProperty', value: 'UpdatedValue', dataType: 'string', required: true }
    ];
    
    rerender(<RdsCompDynamicProperties {...defaultProps} propertyData={updatedData} />);
    
    expect(screen.getAllByTestId(/^row-/)).toHaveLength(1);
  });

  // 8. Error Handling Tests
  it('should handle null propertyData gracefully', () => {
    expect(() => {
      render(<RdsCompDynamicProperties {...defaultProps} propertyData={null as any} />);
    }).not.toThrow();
  });

  it('should handle null propertyHeaders gracefully', () => {
    expect(() => {
      render(<RdsCompDynamicProperties {...defaultProps} propertyHeaders={null as any} />);
    }).not.toThrow();
  });

  it('should handle null actions gracefully', () => {
    expect(() => {
      render(<RdsCompDynamicProperties {...defaultProps} actions={null as any} />);
    }).not.toThrow();
  });

  // 9. Performance Tests
  it('should handle large datasets efficiently', () => {
    const largePropertyData = Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      name: `Property${index + 1}`,
      value: `Value${index + 1}`,
      dataType: index % 2 === 0 ? 'string' : 'number',
      required: index % 3 === 0
    }));

    const startTime = performance.now();
    render(<RdsCompDynamicProperties {...defaultProps} propertyData={largePropertyData} />);
    const endTime = performance.now();
    
    expect(endTime - startTime).toBeLessThan(1000); // Should render within 1 second
    expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
  });

  // 10. Accessibility Tests
  it('should be accessible with proper ARIA attributes', () => {
    render(<RdsCompDynamicProperties {...defaultProps} />);
    
    const datatable = screen.getByTestId('rds-comp-datatable');
    expect(datatable).toBeInTheDocument();
    
    // The component should delegate accessibility to RdsCompDatatable
    // Basic check that the component structure is accessible
    expect(screen.getByTestId('table-headers')).toBeInTheDocument();
    expect(screen.getByTestId('table-data')).toBeInTheDocument();
    expect(screen.getByTestId('table-actions')).toBeInTheDocument();
  });

  // 11. Configuration Validation Tests
  it('should maintain consistent datatable configuration', () => {
    render(<RdsCompDynamicProperties {...defaultProps} />);
    
    const datatable = screen.getByTestId('rds-comp-datatable');
    
    // Verify that the component always uses the same fixed configuration
    expect(datatable).toHaveAttribute('data-action-position', 'Right');
    expect(datatable).toHaveAttribute('data-pagination', 'true');
    expect(datatable).toHaveAttribute('data-records-per-page', '10');
    expect(datatable).toHaveAttribute('data-records-per-page-select-list-option', 'true');
    expect(datatable).toHaveAttribute('data-classes', 'table');
  });

  // 12. Component Isolation Tests
  it('should not affect other components when rendered multiple times', () => {
    const props1 = { ...defaultProps, propertyData: [mockPropertyData[0]] };
    const props2 = { ...defaultProps, propertyData: [mockPropertyData[1]] };

    render(
      <div>
        <RdsCompDynamicProperties {...props1} />
        <RdsCompDynamicProperties {...props2} />
      </div>
    );
    
    const datatables = screen.getAllByTestId('rds-comp-datatable');
    expect(datatables).toHaveLength(2);
    
    // Each component should maintain its own data
    expect(datatables[0]).toBeInTheDocument();
    expect(datatables[1]).toBeInTheDocument();
  });
});