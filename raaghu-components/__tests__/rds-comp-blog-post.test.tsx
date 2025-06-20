import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompBlogPost from '../src/rds-comp-blog-post/rds-comp-blog-post';
import { ActionPosition } from '../src/rds-comp-data-table/rds-comp-data-table';

// Define interfaces for type checking
interface TableHeader {
  displayName: string;
  key: string;
  datatype: string;
  dataLength?: number;
  required?: boolean;
  sortable?: boolean;
  colWidth?: string;
  disabled?: boolean;
  isEndUserEditing?: boolean;
}

interface Action {
  displayName: string;
  id: string;
}

interface TableRow {
  [key: string]: any;
  id: number;
}

// Mock the RdsCompDatatable component
jest.mock('../src/rds-comp-data-table', () => ({
  __esModule: true,
  default: ({ 
    tableHeaders, 
    tableData, 
    actions, 
    pagination, 
    recordsPerPage, 
    illustration, 
    noDataheaderTitle, 
    noDataTitle 
  }: { 
    tableHeaders: TableHeader[];
    tableData: TableRow[];
    actions?: Action[];
    pagination?: boolean;
    recordsPerPage?: number;
    illustration?: boolean;
    noDataheaderTitle?: string;
    noDataTitle?: string;
  }) => (
    <div data-testid="rds-comp-datatable">
      <div data-testid="table-headers">
        {tableHeaders.map((header: TableHeader, index: number) => (
          <div key={index} data-testid={`header-${header.key}`}>
            {header.displayName}
          </div>
        ))}
      </div>
      
      {tableData && tableData.length > 0 ? (
        <div data-testid="table-data">
          {tableData.map((row: TableRow, rowIndex: number) => (
            <div key={rowIndex} data-testid={`row-${rowIndex}`}>
              {tableHeaders.map((header: TableHeader, cellIndex: number) => (
                <div key={cellIndex} data-testid={`cell-${rowIndex}-${header.key}`}>
                  {row[header.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div data-testid="no-data">
          <div data-testid="no-data-header">{noDataheaderTitle}</div>
          <div data-testid="no-data-title">{noDataTitle}</div>
          {illustration && <div data-testid="illustration">Illustration</div>}
        </div>
      )}
      
      {pagination && <div data-testid="pagination">Pagination with {recordsPerPage} records per page</div>}
      
      {actions && actions.length > 0 && (
        <div data-testid="actions">
          {actions.map((action: Action, index: number) => (
            <button key={index} data-testid={`action-${action.id}`}>
              {action.displayName}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}));

describe('RdsCompBlogPost', () => {
  // Sample data for testing
  const mockTableHeaders = [
    { displayName: 'Title', key: 'title', datatype: 'text', sortable: true },
    { displayName: 'Author', key: 'author', datatype: 'text', sortable: true },
    { displayName: 'Date', key: 'date', datatype: 'date', sortable: true },
    { displayName: 'Category', key: 'category', datatype: 'text', sortable: true }
  ];

  const mockTableData = [
    { 
      id: 1, 
      title: 'Getting Started with React', 
      author: 'John Doe', 
      date: '2023-05-15', 
      category: 'Development' 
    },
    { 
      id: 2, 
      title: 'Advanced TypeScript Tips', 
      author: 'Jane Smith', 
      date: '2023-06-22', 
      category: 'Programming' 
    },
    { 
      id: 3, 
      title: 'UI/UX Best Practices', 
      author: 'Alex Johnson', 
      date: '2023-07-10', 
      category: 'Design' 
    }
  ];

  const mockActions = [
    { displayName: 'Edit', id: 'edit' },
    { displayName: 'Delete', id: 'delete' },
    { displayName: 'View', id: 'view' }
  ];

  it('renders without crashing', () => {
    const { container } = render(
      <RdsCompBlogPost 
        tableHeaders={mockTableHeaders}
        tableData={mockTableData}
        actions={mockActions}
        pagination={true}
        recordsPerPage={10}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders with the bloglist class', () => {
    render(
      <RdsCompBlogPost 
        tableHeaders={mockTableHeaders}
        tableData={mockTableData}
        actions={mockActions}
        pagination={true}
        recordsPerPage={10}
      />
    );
    const blogListElement = screen.getByTestId('rds-comp-datatable').parentElement;
    expect(blogListElement).toHaveClass('bloglist');
  });

  it('passes table headers correctly to datatable', () => {
    render(
      <RdsCompBlogPost 
        tableHeaders={mockTableHeaders}
        tableData={mockTableData}
        actions={mockActions}
        pagination={true}
        recordsPerPage={10}
      />
    );
    
    mockTableHeaders.forEach(header => {
      expect(screen.getByTestId(`header-${header.key}`)).toHaveTextContent(header.displayName);
    });
  });

  it('passes table data correctly to datatable', () => {
    render(
      <RdsCompBlogPost 
        tableHeaders={mockTableHeaders}
        tableData={mockTableData}
        actions={mockActions}
        pagination={true}
        recordsPerPage={10}
      />
    );
    
    // Check if all rows are rendered
    expect(screen.getAllByTestId(/^row-\d+$/)).toHaveLength(mockTableData.length);
    
    // Check specific cell content
    expect(screen.getByTestId('cell-0-title')).toHaveTextContent('Getting Started with React');
    expect(screen.getByTestId('cell-1-author')).toHaveTextContent('Jane Smith');
    expect(screen.getByTestId('cell-2-category')).toHaveTextContent('Design');
  });

  it('passes actions correctly to datatable', () => {
    render(
      <RdsCompBlogPost 
        tableHeaders={mockTableHeaders}
        tableData={mockTableData}
        actions={mockActions}
        pagination={true}
        recordsPerPage={10}
      />
    );
    
    mockActions.forEach(action => {
      expect(screen.getByTestId(`action-${action.id}`)).toHaveTextContent(action.displayName);
    });
  });

  it('passes pagination settings correctly to datatable', () => {
    render(
      <RdsCompBlogPost 
        tableHeaders={mockTableHeaders}
        tableData={mockTableData}
        actions={mockActions}
        pagination={true}
        recordsPerPage={10}
      />
    );
    
    expect(screen.getByTestId('pagination')).toHaveTextContent('Pagination with 10 records per page');
  });

  it('shows no data message when table data is empty', () => {
    render(
      <RdsCompBlogPost 
        tableHeaders={mockTableHeaders}
        tableData={[]}
        actions={mockActions}
        pagination={true}
        recordsPerPage={10}
      />
    );
    
    expect(screen.getByTestId('no-data')).toBeInTheDocument();
    expect(screen.getByTestId('no-data-header')).toHaveTextContent('No Records Available');
    expect(screen.getByTestId('no-data-title')).toHaveTextContent('Click on the button to add');
    expect(screen.getByTestId('illustration')).toBeInTheDocument();
  });

  it('renders without pagination when pagination is false', () => {
    render(
      <RdsCompBlogPost 
        tableHeaders={mockTableHeaders}
        tableData={mockTableData}
        actions={mockActions}
        pagination={false}
      />
    );
    
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });
});
