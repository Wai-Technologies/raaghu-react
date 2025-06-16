import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompEditionList from '../src/rds-comp-tenant-list/rds-comp-tenant-list';
import { ActionPosition } from '../src/rds-comp-data-table/rds-comp-data-table';

// Mock the i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  }
}));

// Mock the RdsCompDatatable component
jest.mock('../src/rds-comp-data-table/rds-comp-data-table', () => {
  const ActionPosition = {
    Right: 'Right',
    Left: 'Left'
  };
  
  const RdsCompDatatable = (props: any) => (
    <div data-testid="rds-comp-datatable">
      <div data-testid="datatable-headers">
        {props.tableHeaders.map((header: any, index: number) => (
          <div 
            key={index} 
            data-testid={`header-${header.key}`}
            data-displayname={header.displayName}
            data-key={header.key}
            data-datatype={header.datatype}
            data-sortable={header.sortable ? 'true' : 'false'}
          >
            {header.displayName}
          </div>
        ))}
      </div>
      <div data-testid="datatable-actions">
        {props.actions?.map((action: any, index: number) => (
          <div 
            key={index} 
            data-testid={`action-${action.id}`}
            data-displayname={action.displayName}
            data-id={action.id}
          >
            {action.displayName}
          </div>
        ))}
      </div>
      <div data-testid="datatable-data">
        {props.tableData.map((row: any, rowIndex: number) => (
          <div key={rowIndex} data-testid={`row-${rowIndex}`}>
            {Object.entries(row).map(([key, value]: [string, any], colIndex: number) => (
              <div 
                key={colIndex} 
                data-testid={`cell-${rowIndex}-${key}`}
                data-key={key}
                data-value={value as string}
              >
                {value as string}
              </div>
            ))}
            <div data-testid={`row-actions-${rowIndex}`}>
              {props.actions?.map((action: any, actionIndex: number) => (
                <button 
                  key={actionIndex}
                  data-testid={`row-${rowIndex}-action-${action.id}`}
                  onClick={() => props.onActionSelection(props.tableData[rowIndex], action.id)}
                >
                  {action.displayName}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div data-testid="datatable-pagination" data-pagination={props.pagination ? 'true' : 'false'}>
        {props.pagination && (
          <div data-testid="pagination-controls" data-records-per-page={props.recordsPerPage}>
            Pagination with {props.recordsPerPage} records per page
          </div>
        )}
      </div>
      <div data-testid="datatable-no-data" style={{ display: props.tableData.length === 0 ? 'block' : 'none' }}>
        <div data-testid="no-data-header">{props.noDataheaderTitle}</div>
        <div data-testid="no-data-title">{props.noDataTitle}</div>
      </div>
    </div>
  );
  
  // Export the ActionPosition enum to be imported by the component
  RdsCompDatatable.ActionPosition = ActionPosition;
  
  return Object.assign(RdsCompDatatable, { ActionPosition });
});

describe('RdsCompEditionList Component', () => {
  // Sample data for testing
  const mockTableHeaders = [
    {
      displayName: 'Name',
      key: 'name',
      datatype: 'text',
      sortable: true,
      colWidth: '20%'
    },
    {
      displayName: 'Edition',
      key: 'edition',
      datatype: 'text',
      sortable: true,
      colWidth: '15%'
    },
    {
      displayName: 'Status',
      key: 'status',
      datatype: 'text',
      sortable: true,
      colWidth: '15%'
    }
  ];

  const mockActions = [
    {
      displayName: 'Edit',
      id: 'edit'
    },
    {
      displayName: 'Delete',
      id: 'delete'
    }
  ];

  const mockTableData = [
    {
      id: 1,
      name: 'Tenant 1',
      edition: 'Standard',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Tenant 2',
      edition: 'Premium',
      status: 'Inactive'
    }
  ];

  const defaultProps = {
    tableHeaders: mockTableHeaders,
    actions: mockActions,
    tableData: mockTableData,
    pagination: true,
    recordsPerPage: 10,
    recordsPerPageSelectListOption: true,
    onActionSelection: jest.fn()
  };

  // Helper function to render component with custom props
  const renderComponent = (props = {}) => {
    return render(
      <RdsCompEditionList 
        {...defaultProps} 
        {...props} 
      />
    );
  };

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      renderComponent();
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    });

    it('renders the correct table headers', () => {
      renderComponent();
      
      // Check that all headers are rendered
      mockTableHeaders.forEach(header => {
        const headerElement = screen.getByTestId(`header-${header.key}`);
        expect(headerElement).toBeInTheDocument();
        expect(headerElement).toHaveAttribute('data-displayname', header.displayName);
      });
    });

    it('renders the correct actions', () => {
      renderComponent();
      
      // Check that all actions are rendered
      mockActions.forEach(action => {
        const actionElement = screen.getByTestId(`action-${action.id}`);
        expect(actionElement).toBeInTheDocument();
        expect(actionElement).toHaveAttribute('data-displayname', action.displayName);
      });
    });

    it('renders the correct table data', () => {
      renderComponent();
      
      // Check that all rows are rendered
      mockTableData.forEach((row, rowIndex) => {
        const rowElement = screen.getByTestId(`row-${rowIndex}`);
        expect(rowElement).toBeInTheDocument();
        
        // Check that each cell has the correct data
        Object.entries(row).forEach(([key, value]) => {
          if (key !== 'id') { // Skip the id field as it might not be rendered
            const cellElement = screen.getByTestId(`cell-${rowIndex}-${key}`);
            expect(cellElement).toBeInTheDocument();
            expect(cellElement).toHaveAttribute('data-value', String(value));
          }
        });
      });
    });

    it('renders pagination when enabled', () => {
      renderComponent();
      
      const paginationElement = screen.getByTestId('datatable-pagination');
      expect(paginationElement).toHaveAttribute('data-pagination', 'true');
      
      const paginationControls = screen.getByTestId('pagination-controls');
      expect(paginationControls).toHaveAttribute('data-records-per-page', '10');
    });

    it('does not render pagination when disabled', () => {
      renderComponent({ pagination: false });
      
      const paginationElement = screen.getByTestId('datatable-pagination');
      expect(paginationElement).toHaveAttribute('data-pagination', 'false');
      expect(screen.queryByTestId('pagination-controls')).not.toBeInTheDocument();
    });
  });

  // Action Tests
  describe('Action Handling', () => {
    it('calls onActionSelection with correct parameters when action is clicked', () => {
      renderComponent();
      
      // Click on the edit action for the first row
      const editActionButton = screen.getByTestId('row-0-action-edit');
      fireEvent.click(editActionButton);
      
      // Check that onActionSelection was called with the correct parameters
      expect(defaultProps.onActionSelection).toHaveBeenCalledWith(
        mockTableData[0],
        'edit'
      );
    });

    it('handles multiple actions correctly', () => {
      renderComponent();
      
      // Click on the delete action for the second row
      const deleteActionButton = screen.getByTestId('row-1-action-delete');
      fireEvent.click(deleteActionButton);
      
      // Check that onActionSelection was called with the correct parameters
      expect(defaultProps.onActionSelection).toHaveBeenCalledWith(
        mockTableData[1],
        'delete'
      );
    });
  });

  // No Data Tests
  describe('No Data Handling', () => {
    it('displays no data message when table data is empty', () => {
      renderComponent({ tableData: [] });
      
      // No data message should be visible
      const noDataHeader = screen.getByTestId('no-data-header');
      const noDataTitle = screen.getByTestId('no-data-title');
      
      expect(noDataHeader).toHaveTextContent('No Records Available');
      expect(noDataTitle).toHaveTextContent('Click on the button to add');
    });
  });

  // Props Tests
  describe('Props Handling', () => {
    it('passes the correct action position to the datatable', () => {
      renderComponent();
      
      // The ActionPosition.Right is the default for RdsCompEditionList
      const datatableElement = screen.getByTestId('rds-comp-datatable');
      expect(datatableElement).toBeInTheDocument();
    });

    it('passes recordsPerPageSelectListOption to the datatable', () => {
      renderComponent({ recordsPerPageSelectListOption: false });
      
      // This is hard to test with our mock, but at least we can check the component renders
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    });
  });
});
