import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompUserTable from '../src/rds-comp-user-table/rds-comp-user-table';
import { ActionPosition } from '../src/rds-comp-data-table/rds-comp-data-table';

// Mock the dependencies
jest.mock('../src/rds-comp-data-table', () => {
  return jest.fn(({ tableHeaders, tableData, actions, pagination, recordsPerPage, onActionSelection, actionPosition, classes, recordsPerPageSelectListOption }) => (
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
  ));
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('RdsCompUserTable', () => {
  const mockTableHeaders = [
    {
      displayName: 'Name',
      key: 'name',
      datatype: 'text',
      dataLength: 50,
      required: true,
      sortable: true,
      colWidth: '200px',
      disabled: false,
      isEndUserEditing: false,
    },
    {
      displayName: 'Email',
      key: 'email',
      datatype: 'email',
      dataLength: 100,
      required: true,
      sortable: true,
      colWidth: '250px',
      disabled: false,
      isEndUserEditing: false,
    },
    {
      displayName: 'Role',
      key: 'role',
      datatype: 'text',
      dataLength: 30,
      required: false,
      sortable: false,
      colWidth: '150px',
      disabled: false,
      isEndUserEditing: true,
    },
  ];

  const mockTableData = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
  ];

  const mockActions = [
    { displayName: 'Edit', id: 'edit' },
    { displayName: 'Delete', id: 'delete' },
    { displayName: 'View', id: 'view' },
  ];

  const mockOnActionSelection = jest.fn();

  const defaultProps = {
    tableHeaders: mockTableHeaders,
    tableData: mockTableData,
    actions: mockActions,
    pagination: true,
    recordsPerPage: 10,
    recordsPerPageSelectListOption: true,
    onActionSelection: mockOnActionSelection,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<RdsCompUserTable {...defaultProps} />);
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    });

    it('renders the main container with correct structure', () => {
      const { container } = render(<RdsCompUserTable {...defaultProps} />);
      
      const mainDiv = container.querySelector('div');
      expect(mainDiv).toBeInTheDocument();
      
      const datatable = screen.getByTestId('rds-comp-datatable');
      expect(datatable).toBeInTheDocument();
    });

    it('passes all required props to RdsCompDatatable', () => {
      render(<RdsCompUserTable {...defaultProps} />);
      
      expect(screen.getByTestId('action-position')).toHaveTextContent('Right');
      expect(screen.getByTestId('table-classes')).toHaveTextContent('table__userTable');
      expect(screen.getByTestId('pagination')).toHaveTextContent('enabled');
      expect(screen.getByTestId('records-per-page')).toHaveTextContent('10');
      expect(screen.getByTestId('records-per-page-select')).toHaveTextContent('enabled');
    });
  });

  // Table Headers Tests
  describe('Table Headers', () => {
    it('renders all table headers correctly', () => {
      render(<RdsCompUserTable {...defaultProps} />);
      
      expect(screen.getByTestId('header-name')).toHaveTextContent('Name');
      expect(screen.getByTestId('header-email')).toHaveTextContent('Email');
      expect(screen.getByTestId('header-role')).toHaveTextContent('Role');
    });

    it('handles empty table headers array', () => {
      const propsWithEmptyHeaders = { ...defaultProps, tableHeaders: [] };
      expect(() => render(<RdsCompUserTable {...propsWithEmptyHeaders} />)).not.toThrow();
    });

    it('handles table headers with minimal properties', () => {
      const minimalHeaders = [
        { displayName: 'ID', key: 'id', datatype: 'number' },
        { displayName: 'Status', key: 'status', datatype: 'text' },
      ];
      
      const propsWithMinimalHeaders = { ...defaultProps, tableHeaders: minimalHeaders };
      render(<RdsCompUserTable {...propsWithMinimalHeaders} />);
      
      expect(screen.getByTestId('header-id')).toHaveTextContent('ID');
      expect(screen.getByTestId('header-status')).toHaveTextContent('Status');
    });

    it('handles table headers with all optional properties', () => {
      const completeHeaders = [
        {
          displayName: 'Complete Header',
          key: 'complete',
          datatype: 'text',
          dataLength: 100,
          required: true,
          sortable: true,
          colWidth: '300px',
          disabled: false,
          isEndUserEditing: true,
        },
      ];
      
      const propsWithCompleteHeaders = { ...defaultProps, tableHeaders: completeHeaders };
      expect(() => render(<RdsCompUserTable {...propsWithCompleteHeaders} />)).not.toThrow();
      
      expect(screen.getByTestId('header-complete')).toHaveTextContent('Complete Header');
    });
  });

  // Table Data Tests
  describe('Table Data', () => {
    it('renders all table data correctly', () => {
      render(<RdsCompUserTable {...defaultProps} />);
      
      expect(screen.getByTestId('row-0')).toHaveTextContent('John Doe');
      expect(screen.getByTestId('row-1')).toHaveTextContent('Jane Smith');
      expect(screen.getByTestId('row-2')).toHaveTextContent('Bob Johnson');
    });

    it('handles empty table data array', () => {
      const propsWithEmptyData = { ...defaultProps, tableData: [] };
      expect(() => render(<RdsCompUserTable {...propsWithEmptyData} />)).not.toThrow();
    });

    it('handles single row of data', () => {
      const singleRowData = [{ name: 'Single User', email: 'single@example.com', role: 'Admin' }];
      const propsWithSingleRow = { ...defaultProps, tableData: singleRowData };
      
      render(<RdsCompUserTable {...propsWithSingleRow} />);
      expect(screen.getByTestId('row-0')).toHaveTextContent('Single User');
    });

    it('handles large dataset', () => {
      const largeDataset = Array.from({ length: 100 }, (_, i) => ({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        role: i % 2 === 0 ? 'Admin' : 'User',
      }));
      
      const propsWithLargeData = { ...defaultProps, tableData: largeDataset };
      expect(() => render(<RdsCompUserTable {...propsWithLargeData} />)).not.toThrow();
    });

    it('handles data with additional properties', () => {
      const extendedData = [
        { 
          name: 'Extended User', 
          email: 'extended@example.com', 
          role: 'Admin',
          id: 1,
          createdAt: '2023-01-01',
          isActive: true 
        },
      ];
      
      const propsWithExtendedData = { ...defaultProps, tableData: extendedData };
      expect(() => render(<RdsCompUserTable {...propsWithExtendedData} />)).not.toThrow();
    });
  });

  // Actions Tests
  describe('Actions', () => {
    it('renders all action buttons correctly', () => {
      render(<RdsCompUserTable {...defaultProps} />);
      
      expect(screen.getByTestId('action-edit')).toHaveTextContent('Edit');
      expect(screen.getByTestId('action-delete')).toHaveTextContent('Delete');
      expect(screen.getByTestId('action-view')).toHaveTextContent('View');
    });

    it('handles empty actions array', () => {
      const propsWithEmptyActions = { ...defaultProps, actions: [] };
      expect(() => render(<RdsCompUserTable {...propsWithEmptyActions} />)).not.toThrow();
    });

    it('handles single action', () => {
      const singleAction = [{ displayName: 'Edit Only', id: 'edit' }];
      const propsWithSingleAction = { ...defaultProps, actions: singleAction };
      
      render(<RdsCompUserTable {...propsWithSingleAction} />);
      expect(screen.getByTestId('action-edit')).toHaveTextContent('Edit Only');
    });

    it('handles actions with special characters in names', () => {
      const specialActions = [
        { displayName: 'Edit & Save', id: 'edit-save' },
        { displayName: 'Delete/Remove', id: 'delete-remove' },
        { displayName: 'View Details', id: 'view-details' },
      ];
      
      const propsWithSpecialActions = { ...defaultProps, actions: specialActions };
      render(<RdsCompUserTable {...propsWithSpecialActions} />);
      
      expect(screen.getByTestId('action-edit-save')).toHaveTextContent('Edit & Save');
      expect(screen.getByTestId('action-delete-remove')).toHaveTextContent('Delete/Remove');
      expect(screen.getByTestId('action-view-details')).toHaveTextContent('View Details');
    });
  });

  // Pagination Tests
  describe('Pagination', () => {
    it('enables pagination when pagination prop is true', () => {
      render(<RdsCompUserTable {...defaultProps} />);
      expect(screen.getByTestId('pagination')).toHaveTextContent('enabled');
    });

    it('disables pagination when pagination prop is false', () => {
      const propsWithoutPagination = { ...defaultProps, pagination: false };
      render(<RdsCompUserTable {...propsWithoutPagination} />);
      expect(screen.getByTestId('pagination')).toHaveTextContent('disabled');
    });

    it('sets correct records per page', () => {
      render(<RdsCompUserTable {...defaultProps} />);
      expect(screen.getByTestId('records-per-page')).toHaveTextContent('10');
    });

    it('handles different records per page values', () => {
      const propsWithDifferentRecords = { ...defaultProps, recordsPerPage: 25 };
      render(<RdsCompUserTable {...propsWithDifferentRecords} />);
      expect(screen.getByTestId('records-per-page')).toHaveTextContent('25');
    });

    it('enables records per page select when recordsPerPageSelectListOption is true', () => {
      render(<RdsCompUserTable {...defaultProps} />);
      expect(screen.getByTestId('records-per-page-select')).toHaveTextContent('enabled');
    });

    it('disables records per page select when recordsPerPageSelectListOption is false', () => {
      const propsWithoutSelect = { ...defaultProps, recordsPerPageSelectListOption: false };
      render(<RdsCompUserTable {...propsWithoutSelect} />);
      expect(screen.getByTestId('records-per-page-select')).toHaveTextContent('disabled');
    });
  });

  // Props Validation Tests
  describe('Props Validation', () => {
    it('handles missing onActionSelection callback gracefully', () => {
      const propsWithoutCallback = { ...defaultProps };
      delete (propsWithoutCallback as any).onActionSelection;
      
      expect(() => render(<RdsCompUserTable {...propsWithoutCallback} />)).not.toThrow();
    });

    it('handles undefined props gracefully', () => {
      const propsWithUndefined = {
        tableHeaders: mockTableHeaders,
        tableData: undefined as any,
        actions: mockActions,
        pagination: true,
        recordsPerPage: 10,
        recordsPerPageSelectListOption: true,
        onActionSelection: mockOnActionSelection,
      };
      
      expect(() => render(<RdsCompUserTable {...propsWithUndefined} />)).not.toThrow();
    });

    it('handles null props gracefully', () => {
      const propsWithNull = {
        tableHeaders: mockTableHeaders,
        tableData: null as any,
        actions: mockActions,
        pagination: true,
        recordsPerPage: 10,
        recordsPerPageSelectListOption: true,
        onActionSelection: mockOnActionSelection,
      };
      
      expect(() => render(<RdsCompUserTable {...propsWithNull} />)).not.toThrow();
    });
  });

  // CSS Classes Tests
  describe('CSS Classes', () => {
    it('applies correct CSS class to datatable', () => {
      render(<RdsCompUserTable {...defaultProps} />);
      expect(screen.getByTestId('table-classes')).toHaveTextContent('table__userTable');
    });

    it('sets action position to Right', () => {
      render(<RdsCompUserTable {...defaultProps} />);
      expect(screen.getByTestId('action-position')).toHaveTextContent('Right');
    });
  });

  // Integration Tests
  describe('Integration with RdsCompDatatable', () => {
    it('passes all props correctly to RdsCompDatatable', () => {
      const RdsCompDatatable = require('../src/rds-comp-data-table');
      render(<RdsCompUserTable {...defaultProps} />);
      
      expect(RdsCompDatatable).toHaveBeenCalledWith(
        expect.objectContaining({
          actionPosition: ActionPosition.Right,
          classes: 'table__userTable',
          tableHeaders: mockTableHeaders,
          actions: mockActions,
          tableData: mockTableData,
          pagination: true,
          recordsPerPage: 10,
          onActionSelection: mockOnActionSelection,
          recordsPerPageSelectListOption: true,
        }),
        expect.anything()
      );
    });

    it('maintains proper component hierarchy', () => {
      const { container } = render(<RdsCompUserTable {...defaultProps} />);
      
      const outerDiv = container.firstChild;
      expect(outerDiv).toBeInTheDocument();
      expect(outerDiv).toContainElement(screen.getByTestId('rds-comp-datatable'));
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles extremely large recordsPerPage value', () => {
      const propsWithLargeRecords = { ...defaultProps, recordsPerPage: 999999 };
      expect(() => render(<RdsCompUserTable {...propsWithLargeRecords} />)).not.toThrow();
      expect(screen.getByTestId('records-per-page')).toHaveTextContent('999999');
    });

    it('handles zero recordsPerPage value', () => {
      const propsWithZeroRecords = { ...defaultProps, recordsPerPage: 0 };
      expect(() => render(<RdsCompUserTable {...propsWithZeroRecords} />)).not.toThrow();
      expect(screen.getByTestId('records-per-page')).toHaveTextContent('0');
    });

    it('handles negative recordsPerPage value', () => {
      const propsWithNegativeRecords = { ...defaultProps, recordsPerPage: -5 };
      expect(() => render(<RdsCompUserTable {...propsWithNegativeRecords} />)).not.toThrow();
      expect(screen.getByTestId('records-per-page')).toHaveTextContent('-5');
    });

    it('handles table headers with empty strings', () => {
      const headersWithEmptyStrings = [
        { displayName: '', key: '', datatype: '' },
        { displayName: 'Valid Header', key: 'valid', datatype: 'text' },
      ];
      
      const propsWithEmptyHeaders = { ...defaultProps, tableHeaders: headersWithEmptyStrings };
      expect(() => render(<RdsCompUserTable {...propsWithEmptyHeaders} />)).not.toThrow();
    });

    it('handles actions with empty strings', () => {
      const actionsWithEmptyStrings = [
        { displayName: '', id: '' },
        { displayName: 'Valid Action', id: 'valid' },
      ];
      
      const propsWithEmptyActions = { ...defaultProps, actions: actionsWithEmptyStrings };
      expect(() => render(<RdsCompUserTable {...propsWithEmptyActions} />)).not.toThrow();
    });
  });

  // Component Structure Tests
  describe('Component Structure', () => {
    it('maintains consistent DOM structure', () => {
      const { container } = render(<RdsCompUserTable {...defaultProps} />);
      
      expect(container.children).toHaveLength(1);
      expect(container.firstChild).toHaveProperty('tagName', 'DIV');
    });

    it('renders datatable as direct child', () => {
      const { container } = render(<RdsCompUserTable {...defaultProps} />);
      
      const outerDiv = container.firstChild as HTMLElement;
      const datatable = screen.getByTestId('rds-comp-datatable');
      
      expect(outerDiv).toContainElement(datatable);
    });
  });
});
