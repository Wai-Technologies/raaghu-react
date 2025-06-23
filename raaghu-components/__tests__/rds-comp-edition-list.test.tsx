import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompEditionList, { RdsCompEditionListProps } from '../src/rds-comp-edition-list/rds-comp-edition-list';

// Mock RdsCompDatatable
jest.mock('../src/rds-comp-data-table/rds-comp-data-table', () => {
  return {
    __esModule: true,
    ActionPosition: {
      Right: 'right',
      Left: 'left'
    },
    default: ({ tableHeaders, tableData, actions, pagination, recordsPerPage, onActionSelection, enablecheckboxselection, recordsPerPageSelectListOption, actionPosition, ...props }: any) => (
      <div data-testid="rds-comp-datatable" data-action-position={actionPosition} data-pagination={pagination} data-records-per-page={recordsPerPage} data-enable-checkbox={enablecheckboxselection} data-records-per-page-select={recordsPerPageSelectListOption}>
        <table>
          <thead>
            <tr>
              {tableHeaders?.map((header: any, index: number) => (
                <th key={index} data-testid={`header-${header.key}`}>
                  {header.displayName}
                </th>
              ))}
              {actions && actions.length > 0 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((row: any, rowIndex: number) => (
              <tr key={rowIndex} data-testid={`row-${rowIndex}`}>
                {tableHeaders?.map((header: any, colIndex: number) => (
                  <td key={colIndex} data-testid={`cell-${rowIndex}-${header.key}`}>
                    {row[header.key]}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td>
                    {actions.map((action: any, actionIndex: number) => (
                      <button
                        key={actionIndex}
                        data-testid={`action-${action.id}-${rowIndex}`}
                        onClick={() => onActionSelection && onActionSelection({ action, rowData: row })}
                      >
                        {action.displayName}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  };
});

describe('RdsCompEditionList', () => {
  const mockTableHeaders = [
    {
      displayName: 'Edition Name',
      key: 'editionName',
      datatype: 'text',
      sortable: true,
      colWidth: '200px'
    },
    {
      displayName: 'Price',
      key: 'price',
      datatype: 'number',
      sortable: true,
      colWidth: '150px'
    },
    {
      displayName: 'Status',
      key: 'status',
      datatype: 'text',
      sortable: false,
      colWidth: '100px'
    }
  ];

  const mockTableData = [
    { editionName: 'Basic', price: 99.99, status: 'Active' },
    { editionName: 'Standard', price: 199.99, status: 'Active' },
    { editionName: 'Premium', price: 299.99, status: 'Inactive' }
  ];

  const mockActions = [
    { displayName: 'Edit', id: 'edit' },
    { displayName: 'Delete', id: 'delete' }
  ];

  const mockOnActionSelection = jest.fn();
  const mockOnNewTenantClick = jest.fn();

  const defaultProps: RdsCompEditionListProps = {
    tableHeaders: mockTableHeaders,
    tableData: mockTableData,
    actions: mockActions,
    pagination: true,
    recordsPerPage: 10,
    onActionSelection: mockOnActionSelection,
    onNewTenantClick: mockOnNewTenantClick
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Rendering Test
  describe('Basic Rendering', () => {
    it('should render edition list with datatable correctly', () => {
      render(<RdsCompEditionList {...defaultProps} />);
      
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
      expect(screen.getByText('Edition Name')).toBeInTheDocument();
      expect(screen.getByText('Price')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });
  });

  // 2. Table Data Rendering Test
  describe('Table Data Display', () => {
    it('should display all edition data correctly', () => {
      render(<RdsCompEditionList {...defaultProps} />);
      
      expect(screen.getByText('Basic')).toBeInTheDocument();
      expect(screen.getByText('Standard')).toBeInTheDocument();
      expect(screen.getByText('Premium')).toBeInTheDocument();
      expect(screen.getByText('99.99')).toBeInTheDocument();
      expect(screen.getByText('199.99')).toBeInTheDocument();
      expect(screen.getByText('299.99')).toBeInTheDocument();
    });
  });

  // 3. Actions Functionality Test
  describe('Actions Functionality', () => {
    it('should render action buttons for each row', () => {
      render(<RdsCompEditionList {...defaultProps} />);
      
      expect(screen.getByTestId('action-edit-0')).toBeInTheDocument();
      expect(screen.getByTestId('action-delete-0')).toBeInTheDocument();
      expect(screen.getByTestId('action-edit-1')).toBeInTheDocument();
      expect(screen.getByTestId('action-delete-1')).toBeInTheDocument();
    });

    it('should call onActionSelection when action button is clicked', () => {
      render(<RdsCompEditionList {...defaultProps} />);
      
      const editButton = screen.getByTestId('action-edit-0');
      fireEvent.click(editButton);
      
      expect(mockOnActionSelection).toHaveBeenCalledWith({
        action: { displayName: 'Edit', id: 'edit' },
        rowData: { editionName: 'Basic', price: 99.99, status: 'Active' }
      });
    });
  });

  // 4. Pagination Configuration Test
  describe('Pagination Configuration', () => {
    it('should configure datatable with pagination enabled', () => {
      render(<RdsCompEditionList {...defaultProps} />);
      
      const datatable = screen.getByTestId('rds-comp-datatable');
      expect(datatable).toHaveAttribute('data-pagination', 'true');
      expect(datatable).toHaveAttribute('data-records-per-page', '10');
    });

    it('should handle pagination disabled', () => {
      const propsWithoutPagination = { ...defaultProps, pagination: false };
      render(<RdsCompEditionList {...propsWithoutPagination} />);
      
      const datatable = screen.getByTestId('rds-comp-datatable');
      expect(datatable).toHaveAttribute('data-pagination', 'false');
    });
  });

  // 5. Checkbox Selection Test
  describe('Checkbox Selection', () => {
    it('should enable checkbox selection when prop is true', () => {
      const propsWithCheckbox = { ...defaultProps, enablecheckboxselection: true };
      render(<RdsCompEditionList {...propsWithCheckbox} />);
      
      const datatable = screen.getByTestId('rds-comp-datatable');
      expect(datatable).toHaveAttribute('data-enable-checkbox', 'true');
    });

    it('should disable checkbox selection when prop is false', () => {
      const propsWithoutCheckbox = { ...defaultProps, enablecheckboxselection: false };
      render(<RdsCompEditionList {...propsWithoutCheckbox} />);
      
      const datatable = screen.getByTestId('rds-comp-datatable');
      expect(datatable).toHaveAttribute('data-enable-checkbox', 'false');
    });
  });

  // 6. Records Per Page Configuration Test
  describe('Records Per Page Configuration', () => {
    it('should configure records per page correctly', () => {
      const propsWithCustomRecords = { ...defaultProps, recordsPerPage: 25 };
      render(<RdsCompEditionList {...propsWithCustomRecords} />);
      
      const datatable = screen.getByTestId('rds-comp-datatable');
      expect(datatable).toHaveAttribute('data-records-per-page', '25');
    });

    it('should handle records per page select list option', () => {
      const propsWithSelectList = { ...defaultProps, recordsPerPageSelectListOption: true };
      render(<RdsCompEditionList {...propsWithSelectList} />);
      
      const datatable = screen.getByTestId('rds-comp-datatable');
      expect(datatable).toHaveAttribute('data-records-per-page-select', 'true');
    });
  });

  // 7. Empty Data Handling Test
  describe('Empty Data Handling', () => {
    it('should handle empty table data gracefully', () => {
      const propsWithEmptyData = { ...defaultProps, tableData: [] };
      render(<RdsCompEditionList {...propsWithEmptyData} />);
      
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
      expect(screen.getByText('Edition Name')).toBeInTheDocument();
    });
  });

  // 8. Table Headers Configuration Test
  describe('Table Headers Configuration', () => {
    it('should render all table headers correctly', () => {
      render(<RdsCompEditionList {...defaultProps} />);
      
      expect(screen.getByTestId('header-editionName')).toBeInTheDocument();
      expect(screen.getByTestId('header-price')).toBeInTheDocument();
      expect(screen.getByTestId('header-status')).toBeInTheDocument();
    });

    it('should handle custom table headers', () => {
      const customHeaders = [
        { displayName: 'Name', key: 'name', datatype: 'text' },
        { displayName: 'Cost', key: 'cost', datatype: 'number' }
      ];
      const propsWithCustomHeaders = { ...defaultProps, tableHeaders: customHeaders };
      
      render(<RdsCompEditionList {...propsWithCustomHeaders} />);
      
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Cost')).toBeInTheDocument();
    });
  });

  // 9. Action Position Configuration Test
  describe('Action Position Configuration', () => {
    it('should configure action position to right by default', () => {
      render(<RdsCompEditionList {...defaultProps} />);
      
      const datatable = screen.getByTestId('rds-comp-datatable');
      expect(datatable).toHaveAttribute('data-action-position', 'right');
    });
  });

  // 10. Props Validation Test
  describe('Props Validation', () => {
    it('should handle missing optional props gracefully', () => {
      const minimalProps: RdsCompEditionListProps = {
        tableHeaders: mockTableHeaders,
        tableData: mockTableData,
        actions: mockActions,
        pagination: false,
        onActionSelection: mockOnActionSelection,
        onNewTenantClick: mockOnNewTenantClick
      };
      
      expect(() => {
        render(<RdsCompEditionList {...minimalProps} />);
      }).not.toThrow();
    });
  });

  // 11. Component Structure Test
  describe('Component Structure', () => {
    it('should render with correct container structure', () => {
      render(<RdsCompEditionList {...defaultProps} />);
      
      const container = screen.getByTestId('rds-comp-datatable').closest('.row');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('row');
    });
  });

  // 12. Integration Test
  describe('Integration Test', () => {
    it('should handle complete edition list workflow', () => {
      render(<RdsCompEditionList {...defaultProps} />);
      
      // Verify table structure
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
      
      // Verify data display
      expect(screen.getByText('Basic')).toBeInTheDocument();
      expect(screen.getByText('Standard')).toBeInTheDocument();
      
      // Verify actions functionality
      const deleteButton = screen.getByTestId('action-delete-1');
      fireEvent.click(deleteButton);
      
      expect(mockOnActionSelection).toHaveBeenCalledWith({
        action: { displayName: 'Delete', id: 'delete' },
        rowData: { editionName: 'Standard', price: 199.99, status: 'Active' }
      });
    });
  });
});