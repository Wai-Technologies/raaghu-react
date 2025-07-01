import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompPages from '../src/rds-comp-pages/rds-comp-pages';

// Mock the RdsDatatable component
jest.mock('../src/rds-data-table', () => {
  return function MockRdsCompDatatable({ 
    tableHeaders, 
    tableData, 
    actions, 
    pagination, 
    recordsPerPage,
    onActionSelection,
    actionPosition,
    recordsPerPageSelectListOption 
  }: any) {
    return (
      <div data-testid="rds-comp-datatable">
        <div data-testid="action-position">{actionPosition}</div>
        <div data-testid="records-per-page-select">{recordsPerPageSelectListOption ? 'true' : 'false'}</div>
        <div data-testid="pagination">{pagination ? 'enabled' : 'disabled'}</div>
        <div data-testid="records-per-page">{recordsPerPage}</div>
        
        {/* Mock table headers */}
        <div data-testid="table-headers">
          {tableHeaders?.map((header: any, index: number) => (
            <div key={index} data-testid={`header-${header.key}`}>
              {header.displayName}
            </div>
          ))}
        </div>
        
        {/* Mock table data */}
        <div data-testid="table-data">
          {tableData?.map((row: any, rowIndex: number) => (
            <div key={rowIndex} data-testid={`row-${rowIndex}`}>
              {Object.entries(row).map(([key, value]) => (
                <span key={key} data-testid={`cell-${rowIndex}-${key}`}>
                  {String(value)}
                </span>
              ))}
            </div>
          ))}
        </div>
        
        {/* Mock actions */}
        <div data-testid="table-actions">
          {actions?.map((action: any, index: number) => (
            <button
              key={index}
              data-testid={`action-${action.id}`}
              onClick={() => onActionSelection && onActionSelection({}, action.id)}
            >
              {action.displayName}
            </button>
          ))}
        </div>
      </div>
    );
  };
});

// Mock ActionPosition enum
jest.mock('../src/rds-data-table/rds-data-table', () => ({
  ActionPosition: {
    Right: 'Right',
    Left: 'Left',
  },
}));

describe('RdsCompPages', () => {
  const mockTableHeaders = [
    {
      displayName: 'Page Title',
      key: 'title',
      datatype: 'string',
      dataLength: 100,
      required: true,
      sortable: true,
      colWidth: '30%',
    },
    {
      displayName: 'Slug',
      key: 'slug',
      datatype: 'string',
      dataLength: 50,
      required: true,
      sortable: true,
      colWidth: '25%',
    },
    {
      displayName: 'Status',
      key: 'status',
      datatype: 'string',
      dataLength: 20,
      required: false,
      sortable: false,
      colWidth: '15%',
    },
    {
      displayName: 'Created Date',
      key: 'createdDate',
      datatype: 'date',
      required: false,
      sortable: true,
      colWidth: '30%',
    },
  ];

  const mockTableData = [
    {
      id: 1,
      title: 'Home Page',
      slug: 'home',
      status: 'Published',
      createdDate: '2023-01-15',
    },
    {
      id: 2,
      title: 'About Us',
      slug: 'about-us',
      status: 'Draft',
      createdDate: '2023-02-20',
    },
    {
      id: 3,
      title: 'Contact Page',
      slug: 'contact',
      status: 'Published',
      createdDate: '2023-03-10',
    },
  ];

  const mockActions = [
    {
      displayName: 'Edit',
      id: 'edit',
    },
    {
      displayName: 'Delete',
      id: 'delete',
    },
    {
      displayName: 'View',
      id: 'view',
    },
  ];

  const defaultProps = {
    tableHeaders: mockTableHeaders,
    tableData: mockTableData,
    actions: mockActions,
    pagination: true,
    recordsPerPage: 10,
    onActionSelection: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompPages {...defaultProps} />);
      }).not.toThrow();
    });

    it('should render RdsDatatable component', () => {
      render(<RdsCompPages {...defaultProps} />);
      
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
    });

    it('should render with minimal required props', () => {
      const minimalProps = {
        tableHeaders: mockTableHeaders,
      };
      
      expect(() => {
        render(<RdsCompPages {...minimalProps} />);
      }).not.toThrow();
    });
  });

  describe('Table Headers', () => {
    it('should pass table headers to datatable component', () => {
      render(<RdsCompPages {...defaultProps} />);
      
      expect(screen.getByTestId('header-title')).toHaveTextContent('Page Title');
      expect(screen.getByTestId('header-slug')).toHaveTextContent('Slug');
      expect(screen.getByTestId('header-status')).toHaveTextContent('Status');
      expect(screen.getByTestId('header-createdDate')).toHaveTextContent('Created Date');
    });

    it('should handle headers with all properties', () => {
      const headerWithAllProps = [
        {
          displayName: 'Test Header',
          key: 'test',
          datatype: 'string',
          dataLength: 50,
          required: true,
          sortable: true,
          colWidth: '20%',
          disabled: false,
          isEndUserEditing: true,
        },
      ];

      render(<RdsCompPages {...defaultProps} tableHeaders={headerWithAllProps} />);
      
      expect(screen.getByTestId('header-test')).toHaveTextContent('Test Header');
    });

    it('should handle empty table headers', () => {
      render(<RdsCompPages {...defaultProps} tableHeaders={[]} />);
      
      expect(screen.getByTestId('table-headers')).toBeInTheDocument();
    });
  });

  describe('Table Data', () => {
    it('should pass table data to datatable component', () => {
      render(<RdsCompPages {...defaultProps} />);
      
      expect(screen.getByTestId('row-0')).toBeInTheDocument();
      expect(screen.getByTestId('row-1')).toBeInTheDocument();
      expect(screen.getByTestId('row-2')).toBeInTheDocument();
      
      expect(screen.getByTestId('cell-0-title')).toHaveTextContent('Home Page');
      expect(screen.getByTestId('cell-1-title')).toHaveTextContent('About Us');
      expect(screen.getByTestId('cell-2-title')).toHaveTextContent('Contact Page');
    });

    it('should handle empty table data', () => {
      render(<RdsCompPages {...defaultProps} tableData={[]} />);
      
      expect(screen.getByTestId('table-data')).toBeInTheDocument();
    });

    it('should handle undefined table data', () => {
      render(<RdsCompPages {...defaultProps} tableData={undefined} />);
      
      expect(screen.getByTestId('table-data')).toBeInTheDocument();
    });
  });

  describe('Actions', () => {
    it('should pass actions to datatable component', () => {
      render(<RdsCompPages {...defaultProps} />);
      
      expect(screen.getByTestId('action-edit')).toHaveTextContent('Edit');
      expect(screen.getByTestId('action-delete')).toHaveTextContent('Delete');
      expect(screen.getByTestId('action-view')).toHaveTextContent('View');
    });

    it('should handle action selection', () => {
      render(<RdsCompPages {...defaultProps} />);
      
      const editButton = screen.getByTestId('action-edit');
      fireEvent.click(editButton);
      
      expect(defaultProps.onActionSelection).toHaveBeenCalledWith({}, 'edit');
    });

    it('should handle empty actions array', () => {
      render(<RdsCompPages {...defaultProps} actions={[]} />);
      
      expect(screen.getByTestId('table-actions')).toBeInTheDocument();
    });

    it('should handle undefined actions', () => {
      render(<RdsCompPages {...defaultProps} actions={undefined} />);
      
      expect(screen.getByTestId('table-actions')).toBeInTheDocument();
    });
  });

  describe('Pagination and Records', () => {
    it('should pass pagination prop to datatable', () => {
      render(<RdsCompPages {...defaultProps} pagination={true} />);
      
      expect(screen.getByTestId('pagination')).toHaveTextContent('enabled');
    });

    it('should pass recordsPerPage prop to datatable', () => {
      render(<RdsCompPages {...defaultProps} recordsPerPage={25} />);
      
      expect(screen.getByTestId('records-per-page')).toHaveTextContent('25');
    });

    it('should handle pagination disabled', () => {
      render(<RdsCompPages {...defaultProps} pagination={false} />);
      
      expect(screen.getByTestId('pagination')).toHaveTextContent('disabled');
    });

    it('should handle undefined pagination', () => {
      render(<RdsCompPages {...defaultProps} pagination={undefined} />);
      
      expect(screen.getByTestId('pagination')).toHaveTextContent('disabled');
    });
  });

  describe('Datatable Configuration', () => {
    it('should set action position to Right', () => {
      render(<RdsCompPages {...defaultProps} />);
      
      expect(screen.getByTestId('action-position')).toHaveTextContent('Right');
    });

    it('should enable records per page select list option', () => {
      render(<RdsCompPages {...defaultProps} />);
      
      expect(screen.getByTestId('records-per-page-select')).toHaveTextContent('true');
    });
  });

  describe('Props Handling', () => {
    it('should handle all optional props being undefined', () => {
      const minimalProps = {
        tableHeaders: mockTableHeaders,
        tableData: undefined,
        actions: undefined,
        pagination: undefined,
        recordsPerPage: undefined,
        onActionSelection: undefined,
      };

      expect(() => {
        render(<RdsCompPages {...minimalProps} />);
      }).not.toThrow();
    });

    it('should handle props updates', () => {
      const { rerender } = render(<RdsCompPages {...defaultProps} />);
      
      const updatedProps = {
        ...defaultProps,
        recordsPerPage: 20,
        pagination: false,
      };
      
      rerender(<RdsCompPages {...updatedProps} />);
      
      expect(screen.getByTestId('records-per-page')).toHaveTextContent('20');
      expect(screen.getByTestId('pagination')).toHaveTextContent('disabled');
    });

    it('should pass through onActionSelection callback', () => {
      const mockCallback = jest.fn();
      render(<RdsCompPages {...defaultProps} onActionSelection={mockCallback} />);
      
      const editButton = screen.getByTestId('action-edit');
      fireEvent.click(editButton);
      
      expect(mockCallback).toHaveBeenCalledWith({}, 'edit');
    });
  });

  describe('Component Integration', () => {
    it('should properly integrate with RdsDatatable', () => {
      render(<RdsCompPages {...defaultProps} />);
      
      // Verify all props are passed correctly
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
      expect(screen.getByTestId('action-position')).toHaveTextContent('Right');
      expect(screen.getByTestId('records-per-page-select')).toHaveTextContent('true');
      expect(screen.getByTestId('pagination')).toHaveTextContent('enabled');
      expect(screen.getByTestId('records-per-page')).toHaveTextContent('10');
    });

    it('should handle complex table data structures', () => {
      const complexData = [
        {
          id: 1,
          title: 'Complex Page',
          slug: 'complex-page',
          status: 'Published',
          metadata: { author: 'John Doe', views: 1000 },
          tags: ['important', 'featured'],
        },
      ];

      render(<RdsCompPages {...defaultProps} tableData={complexData} />);
      
      expect(screen.getByTestId('cell-0-title')).toHaveTextContent('Complex Page');
      expect(screen.getByTestId('cell-0-metadata')).toBeInTheDocument();
    });
  });

  describe('Component Stability', () => {
    it('should not crash on multiple renders', () => {
      const { rerender } = render(<RdsCompPages {...defaultProps} />);
      
      expect(() => {
        rerender(<RdsCompPages {...defaultProps} />);
        rerender(<RdsCompPages {...defaultProps} tableData={[]} />);
        rerender(<RdsCompPages {...defaultProps} actions={[]} />);
      }).not.toThrow();
    });

    it('should maintain stable rendering with changing data', () => {
      const { rerender } = render(<RdsCompPages {...defaultProps} />);
      
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
      
      const newData = [
        {
          id: 4,
          title: 'New Page',
          slug: 'new-page',
          status: 'Draft',
          createdDate: '2023-04-01',
        },
      ];
      
      rerender(<RdsCompPages {...defaultProps} tableData={newData} />);
      
      expect(screen.getByTestId('rds-comp-datatable')).toBeInTheDocument();
      expect(screen.getByTestId('cell-0-title')).toHaveTextContent('New Page');
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed table headers gracefully', () => {
      const malformedHeaders = [
        {
          displayName: 'Valid Header',
          key: 'valid',
          datatype: 'string',
        },
        // Missing required properties
        {
          displayName: 'Invalid Header',
        } as any,
      ];

      expect(() => {
        render(<RdsCompPages {...defaultProps} tableHeaders={malformedHeaders} />);
      }).not.toThrow();
    });

    it('should handle null tableData', () => {
      expect(() => {
        render(<RdsCompPages {...defaultProps} tableData={null as any} />);
      }).not.toThrow();
    });
  });
});