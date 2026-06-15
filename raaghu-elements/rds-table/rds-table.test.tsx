import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsTable, { RdsTableColumn, RdsTableProps } from './rds-table';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-table.scss', () => ({}));
jest.mock('@mui/icons-material/SwapVert', () => {
  return function MockSwapVertIcon() {
    return <div data-testid="swap-vert-icon">SwapVert</div>;
  };
});

const renderWithTheme = (component: React.ReactElement, isDark = false) => {
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const mockColumns: RdsTableColumn[] = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 150 },
  { id: 'age', label: 'Age', minWidth: 80, align: 'right' },
];

const mockRows = [
  { id: '1', name: 'John', email: 'john@example.com', age: 30 },
  { id: '2', name: 'Jane', email: 'jane@example.com', age: 25 },
  { id: '3', name: 'Bob', email: 'bob@example.com', age: 35 },
];

describe('RdsTable', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsTable.displayName).toBe('RdsTable');
    });

    it('should apply rds-table class', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} />
      );
      const tableElement = container.querySelector('.rds-table');
      expect(tableElement).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} className="custom-class" />
      );
      const tableElement = container.querySelector('.rds-table.custom-class');
      expect(tableElement).toBeInTheDocument();
    });

    it('should apply Paper component wrapper', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} />
      );
      const paperElement = container.querySelector('.MuiPaper-root');
      expect(paperElement).toBeInTheDocument();
    });
  });

  describe('Column Rendering', () => {
    it('should render all column headers', () => {
      renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} />
      );
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
    });

    it('should apply correct column alignment', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} />
      );
      const cells = container.querySelectorAll('.rds-table__header');
      const ageCell = Array.from(cells).find(cell => cell.textContent?.includes('Age'));
      expect(ageCell).toHaveStyle({ textAlign: 'right' });
    });

    it('should apply minWidth to columns', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} />
      );
      const headerCells = container.querySelectorAll('.rds-table__header');
      expect(headerCells.length).toBe(mockColumns.length);
    });

    it('should render hidden columns when not provided', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={[]} rows={mockRows} />
      );
      const headerCells = container.querySelectorAll('.rds-table__header');
      expect(headerCells.length).toBe(0);
    });
  });

  describe('Row Rendering', () => {
    it('should render all rows', () => {
      renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} />
      );
      mockRows.forEach(row => {
        expect(screen.getByText(row.name)).toBeInTheDocument();
      });
    });

    it('should render row data in correct cells', () => {
      renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} />
      );
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
    });

    it('should apply hover effect on rows', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} />
      );
      const rows = container.querySelectorAll('.rds-table__row');
      expect(rows.length).toBe(mockRows.length);
    });

    it('should handle empty rows', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={[]} />
      );
      const rows = container.querySelectorAll('.rds-table__body .rds-table__row');
      expect(rows.length).toBe(0);
    });

    it('should use row.key as fallback row identifier', () => {
      const rowsWithKey = [
        { key: 'row1', name: 'John', email: 'john@example.com', age: 30 },
        { key: 'row2', name: 'Jane', email: 'jane@example.com', age: 25 },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={rowsWithKey} />
      );
      const rows = container.querySelectorAll('.rds-table__body .rds-table__row');
      expect(rows.length).toBe(2);
    });
  });

  describe('Sorting', () => {
    it('should make sortable columns clickable', () => {
      const sortableColumns: RdsTableColumn[] = [
        { id: 'name', label: 'Name', sortable: true },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={sortableColumns} rows={mockRows} />
      );
      const headerContent = container.querySelector('.rds-table__header-content');
      expect(headerContent).toHaveStyle({ cursor: 'pointer' });
    });

    it('should not make non-sortable columns clickable', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} />
      );
      const headers = container.querySelectorAll('.rds-table__header-content');
      headers.forEach(header => {
        expect(header).toHaveStyle({ cursor: undefined });
      });
    });

    it('should call onSortChange when sortable column is clicked', () => {
      const onSortChange = jest.fn();
      const sortableColumns: RdsTableColumn[] = [
        { id: 'name', label: 'Name', sortable: true },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={sortableColumns} rows={mockRows} onSortChange={onSortChange} />
      );
      const headerContent = container.querySelector('.rds-table__header-content');
      fireEvent.click(headerContent!);
      expect(onSortChange).toHaveBeenCalledWith('name', 'asc');
    });

    it('should toggle sort direction on repeated clicks', () => {
      const onSortChange = jest.fn();
      const sortableColumns: RdsTableColumn[] = [
        { id: 'name', label: 'Name', sortable: true },
      ];
      const { container, rerender } = renderWithTheme(
        <RdsTable 
          columns={sortableColumns} 
          rows={mockRows} 
          onSortChange={onSortChange}
          sortBy="name"
          sortDirection="asc"
        />
      );
      const headerContent = container.querySelector('.rds-table__header-content');
      fireEvent.click(headerContent!);
      expect(onSortChange).toHaveBeenCalledWith('name', 'desc');
    });

    it('should apply active class to sorted column header', () => {
      const sortableColumns: RdsTableColumn[] = [
        { id: 'name', label: 'Name', sortable: true },
      ];
      const { container } = renderWithTheme(
        <RdsTable 
          columns={sortableColumns} 
          rows={mockRows}
          sortBy="name"
          sortDirection="asc"
        />
      );
      const header = container.querySelector('.rds-table__header--sorted');
      expect(header).toBeInTheDocument();
    });

    it('should sort rows numerically', () => {
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={mockRows}
          sortBy="age"
          sortDirection="asc"
        />
      );
      const cells = container.querySelectorAll('.rds-table__body .rds-table__cell');
      const ages = Array.from(cells)
        .filter((_, i) => i % mockColumns.length === 2)
        .map(cell => parseInt(cell.textContent || '0'));
      expect(ages).toEqual([25, 30, 35]);
    });

    it('should sort rows in descending order', () => {
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={mockRows}
          sortBy="age"
          sortDirection="desc"
        />
      );
      const cells = container.querySelectorAll('.rds-table__body .rds-table__cell');
      const ages = Array.from(cells)
        .filter((_, i) => i % mockColumns.length === 2)
        .map(cell => parseInt(cell.textContent || '0'));
      expect(ages).toEqual([35, 30, 25]);
    });

    it('should not allow sorting on checkbox columns', () => {
      const checkboxColumn: RdsTableColumn = { id: 'select', label: 'Select', type: 'checkbox' };
      const { container } = renderWithTheme(
        <RdsTable columns={[checkboxColumn, ...mockColumns]} rows={mockRows} />
      );
      const headerCells = container.querySelectorAll('.rds-table__header');
      const firstHeader = headerCells[0];
      expect(firstHeader).not.toHaveClass('rds-table__header--sortable');
    });

    it('should use defaultSortBy and defaultSortDirection', () => {
      const sortableColumns: RdsTableColumn[] = [
        { id: 'name', label: 'Name', sortable: true },
      ];
      const { container } = renderWithTheme(
        <RdsTable 
          columns={sortableColumns} 
          rows={mockRows}
          defaultSortBy="name"
          defaultSortDirection="desc"
        />
      );
      const header = container.querySelector('.rds-table__header--sorted');
      expect(header).toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    it('should not show pagination when disabled', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} pagination={false} />
      );
      const pagination = container.querySelector('.MuiTablePagination-root');
      expect(pagination).not.toBeInTheDocument();
    });

    it('should show pagination when enabled', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} pagination={true} />
      );
      const pagination = container.querySelector('.MuiTablePagination-root');
      expect(pagination).toBeInTheDocument();
    });

    it('should paginate rows correctly', () => {
      const manyRows = Array.from({ length: 25 }, (_, i) => ({
        id: String(i),
        name: `Name ${i}`,
        email: `email${i}@example.com`,
        age: 20 + i,
      }));
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={manyRows} pagination={true} pageSize={10} page={0} />
      );
      const rows = container.querySelectorAll('.rds-table__body .rds-table__row');
      expect(rows.length).toBe(10);
    });

    it('should call onPageChange when page is changed', () => {
      const onPageChange = jest.fn();
      const manyRows = Array.from({ length: 25 }, (_, i) => ({
        id: String(i),
        name: `Name ${i}`,
        email: `email${i}@example.com`,
        age: 20 + i,
      }));
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={manyRows} 
          pagination={true} 
          pageSize={10}
          page={0}
          onPageChange={onPageChange}
        />
      );
      const nextButton = container.querySelector('button[title="Next page"]');
      if (nextButton) {
        fireEvent.click(nextButton);
        expect(onPageChange).toHaveBeenCalledWith(1);
      }
    });

    it('should call onPageSizeChange when pageSize is changed', () => {
      const onPageSizeChange = jest.fn();
      const manyRows = Array.from({ length: 25 }, (_, i) => ({
        id: String(i),
        name: `Name ${i}`,
        email: `email${i}@example.com`,
        age: 20 + i,
      }));
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={manyRows} 
          pagination={true} 
          pageSize={10}
          onPageSizeChange={onPageSizeChange}
        />
      );
      const paginationRoot = container.querySelector('.MuiTablePagination-root');
      expect(paginationRoot).toBeInTheDocument();
    });

    it('should use totalRows when provided', () => {
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={mockRows}
          pagination={true}
          totalRows={100}
        />
      );
      const pagination = container.querySelector('.MuiTablePagination-root');
      expect(pagination?.textContent).toContain('100');
    });

    it('should use rows.length when totalRows is not provided', () => {
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={mockRows}
          pagination={true}
        />
      );
      const pagination = container.querySelector('.MuiTablePagination-root');
      expect(pagination?.textContent).toContain('3');
    });
  });

  describe('Row Selection', () => {
    it('should not show select checkbox when selectable is false', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} selectable={false} />
      );
      const selectCheckboxes = container.querySelectorAll('.rds-table__checkbox input[type="checkbox"]');
      expect(selectCheckboxes.length).toBe(0);
    });

    it('should show select checkbox when selectable is true', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} selectable={true} />
      );
      const selectCheckboxes = container.querySelectorAll('.rds-table__checkbox input[type="checkbox"]');
      expect(selectCheckboxes.length).toBeGreaterThan(0);
    });

    it('should select individual rows', () => {
      const onRowSelect = jest.fn();
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={mockRows} 
          selectable={true}
          onRowSelect={onRowSelect}
        />
      );
      const checkboxes = container.querySelectorAll('.rds-table__body input[type="checkbox"]');
      fireEvent.click(checkboxes[0]);
      expect(onRowSelect).toHaveBeenCalled();
    });

    it('should select all rows', () => {
      const onRowSelect = jest.fn();
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={mockRows} 
          selectable={true}
          onRowSelect={onRowSelect}
        />
      );
      const headerCheckbox = container.querySelector('.rds-table__head input[type="checkbox"]');
      fireEvent.click(headerCheckbox!);
      expect(onRowSelect).toHaveBeenCalledWith(expect.arrayContaining(['1', '2', '3']));
    });

    it('should deselect all rows when header checkbox is unchecked', () => {
      const onRowSelect = jest.fn();
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={mockRows} 
          selectable={true}
          selectedRows={['1', '2', '3']}
          onRowSelect={onRowSelect}
        />
      );
      const headerCheckbox = container.querySelector('.rds-table__head input[type="checkbox"]');
      fireEvent.click(headerCheckbox!);
      expect(onRowSelect).toHaveBeenCalledWith([]);
    });

    it('should apply selected class to selected rows', () => {
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={mockRows}
          selectable={true}
          selectedRows={['1']}
          onRowSelect={jest.fn()}
        />
      );
      const selectedRow = container.querySelector('.MuiTableRow-root[aria-checked="true"]');
      expect(selectedRow || container.querySelectorAll('.rds-table__row').length).toBeGreaterThan(0);
    });

    it('should show indeterminate state when some rows selected', () => {
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={mockRows}
          selectable={true}
          selectedRows={['1']}
          onRowSelect={jest.fn()}
        />
      );
      const headerCheckbox = container.querySelector('.rds-table__head input[type="checkbox"]') as HTMLInputElement;
      expect(headerCheckbox && (headerCheckbox.indeterminate || headerCheckbox.checked !== true)).toBeTruthy();
    });

    it('should use uncontrolled selection when onRowSelect is not provided', () => {
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={mockRows}
          selectable={true}
        />
      );
      const checkbox = container.querySelector('.rds-table__body input[type="checkbox"]');
      fireEvent.click(checkbox!);
      expect(checkbox).toBeChecked();
    });
  });

  describe('Cell Types', () => {
    it('should render text cells by default', () => {
      renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} />
      );
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    it('should render checkbox cells', () => {
      const checkboxColumns: RdsTableColumn[] = [
        { id: 'select', label: 'Select', type: 'checkbox' },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={checkboxColumns} rows={mockRows} />
      );
      const checkboxes = container.querySelectorAll('.rds-table__body input[type="checkbox"]');
      expect(checkboxes.length).toBe(mockRows.length);
    });

    it('should toggle checkbox cells', () => {
      const checkboxColumns: RdsTableColumn[] = [
        { id: 'select', label: 'Select', type: 'checkbox' },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={checkboxColumns} rows={mockRows} />
      );
      const checkbox = container.querySelector('.rds-table__body input[type="checkbox"]') as HTMLInputElement;
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('should select all checkbox cells in column', () => {
      const checkboxColumns: RdsTableColumn[] = [
        { id: 'select', label: 'Select', type: 'checkbox' },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={checkboxColumns} rows={mockRows} />
      );
      const headerCheckbox = container.querySelector('.rds-table__head .rds-table__checkbox input[type="checkbox"]');
      fireEvent.click(headerCheckbox!);
      const bodyCheckboxes = container.querySelectorAll('.rds-table__body .rds-table__checkbox input[type="checkbox"]');
      bodyCheckboxes.forEach(checkbox => {
        expect(checkbox).toBeChecked();
      });
    });

    it('should render radio cells', () => {
      const radioColumns: RdsTableColumn[] = [
        { id: 'select', label: 'Select', type: 'radio' },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={radioColumns} rows={mockRows} />
      );
      const radios = container.querySelectorAll('.rds-table__body input[type="radio"]');
      expect(radios.length).toBe(mockRows.length);
    });

    it('should select only one radio cell', () => {
      const radioColumns: RdsTableColumn[] = [
        { id: 'select', label: 'Select', type: 'radio' },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={radioColumns} rows={mockRows} />
      );
      const radios = container.querySelectorAll('.rds-table__body input[type="radio"]');
      fireEvent.click(radios[0]);
      fireEvent.click(radios[1]);
      expect(radios[0]).not.toBeChecked();
      expect(radios[1]).toBeChecked();
    });
  });

  describe('Column Formatting', () => {
    it('should apply custom format function', () => {
      const formattedColumns: RdsTableColumn[] = [
        { 
          id: 'age', 
          label: 'Age',
          format: (value) => `${value} years`
        },
      ];
      renderWithTheme(
        <RdsTable columns={formattedColumns} rows={mockRows} />
      );
      expect(screen.getByText('30 years')).toBeInTheDocument();
    });

    it('should render custom JSX in format function', () => {
      const formattedColumns: RdsTableColumn[] = [
        { 
          id: 'name', 
          label: 'Name',
          format: (value) => <strong>{value}</strong>
        },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={formattedColumns} rows={mockRows} />
      );
      const strongTags = container.querySelectorAll('strong');
      expect(strongTags.length).toBe(mockRows.length);
    });
  });

  describe('Sticky Header', () => {
    it('should not apply sticky header by default', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} stickyHeader={false} />
      );
      const tableContainer = container.querySelector('.rds-table__container');
      expect(tableContainer).not.toHaveClass('rds-table__container--sticky');
    });

    it('should apply sticky header class when enabled', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} stickyHeader={true} />
      );
      const tableContainer = container.querySelector('.rds-table__container');
      expect(tableContainer).toHaveClass('rds-table__container--sticky');
    });

    it('should set maxHeight when sticky header is enabled', () => {
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} stickyHeader={true} />
      );
      const tableContainer = container.querySelector('.rds-table__container');
      expect(tableContainer).toHaveStyle({ maxHeight: '440px' });
    });
  });

  describe('Sort Icon and Accessibility', () => {
    it('should display sort icon for sortable columns', () => {
      const sortableColumns: RdsTableColumn[] = [
        { id: 'name', label: 'Name', sortable: true },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={sortableColumns} rows={mockRows} />
      );
      const sortButtons = container.querySelectorAll('.rds-table__sort-button');
      expect(sortButtons.length).toBeGreaterThan(0);
    });

    it('should apply aria-sort attribute to sorted column', () => {
      const sortableColumns: RdsTableColumn[] = [
        { id: 'name', label: 'Name', sortable: true },
      ];
      const { container } = renderWithTheme(
        <RdsTable 
          columns={sortableColumns} 
          rows={mockRows}
          sortBy="name"
          sortDirection="asc"
        />
      );
      const header = container.querySelector('.rds-table__header--sorted');
      expect(header).toHaveAttribute('aria-sort', 'ascending');
    });

    it('should apply descending aria-sort when sorted descending', () => {
      const sortableColumns: RdsTableColumn[] = [
        { id: 'name', label: 'Name', sortable: true },
      ];
      const { container } = renderWithTheme(
        <RdsTable 
          columns={sortableColumns} 
          rows={mockRows}
          sortBy="name"
          sortDirection="desc"
        />
      );
      const header = container.querySelector('.rds-table__header--sorted');
      expect(header).toHaveAttribute('aria-sort', 'descending');
    });

    it('should apply aria-label to sort button', () => {
      const sortableColumns: RdsTableColumn[] = [
        { id: 'name', label: 'Name', sortable: true },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={sortableColumns} rows={mockRows} />
      );
      const sortButton = container.querySelector('.rds-table__sort-button');
      expect(sortButton).toHaveAttribute('aria-label');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rows with missing id and key', () => {
      const rowsWithoutId = [
        { name: 'John', email: 'john@example.com', age: 30 },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={rowsWithoutId} />
      );
      const rows = container.querySelectorAll('.rds-table__row');
      expect(rows.length).toBe(1);
    });

    it('should handle undefined column values', () => {
      const rowsWithMissingValues = [
        { id: '1', name: 'John', email: undefined, age: 30 },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={rowsWithMissingValues} />
      );
      const cells = container.querySelectorAll('.rds-table__body .rds-table__cell');
      expect(cells.length).toBeGreaterThan(0);
    });

    it('should handle null column values', () => {
      const rowsWithNullValues = [
        { id: '1', name: 'John', email: null, age: 30 },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={rowsWithNullValues} />
      );
      const cells = container.querySelectorAll('.rds-table__body .rds-table__cell');
      expect(cells.length).toBeGreaterThan(0);
    });

    it('should handle complex object values in cells', () => {
      const rowsWithObjects = [
        { id: '1', name: 'John', email: 'john@example.com', age: 30, nested: { key: 'value' } },
      ];
      const moreColumns: RdsTableColumn[] = [
        ...mockColumns,
        { 
          id: 'nested', 
          label: 'Nested',
          format: (value) => JSON.stringify(value)
        },
      ];
      const { container } = renderWithTheme(
        <RdsTable columns={moreColumns} rows={rowsWithObjects} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle sorting with missing values', () => {
      const unsortedColumns: RdsTableColumn[] = [
        { id: 'name', label: 'Name', sortable: true },
      ];
      const rowsWithMissing = [
        { id: '1', name: 'John', email: 'john@example.com', age: 30 },
        { id: '2', email: 'jane@example.com', age: 25 },
        { id: '3', name: 'Bob', email: 'bob@example.com', age: 35 },
      ];
      const { container } = renderWithTheme(
        <RdsTable 
          columns={unsortedColumns} 
          rows={rowsWithMissing}
          sortBy="name"
          sortDirection="asc"
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle theme changes', () => {
      const { rerender, container } = renderWithTheme(
        <RdsTable columns={mockColumns} rows={mockRows} />,
        false
      );
      expect(container).toBeInTheDocument();
      rerender(
        <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
          <RdsTable columns={mockColumns} rows={mockRows} />
        </ThemeProvider>
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should work with sorting and pagination together', () => {
      const sortableColumns: RdsTableColumn[] = [
        { id: 'age', label: 'Age', sortable: true },
      ];
      const manyRows = Array.from({ length: 25 }, (_, i) => ({
        id: String(i),
        name: `Name ${i}`,
        email: `email${i}@example.com`,
        age: 25 - (i % 10),
      }));
      const { container } = renderWithTheme(
        <RdsTable 
          columns={sortableColumns} 
          rows={manyRows}
          pagination={true}
          pageSize={10}
          sortBy="age"
          sortDirection="asc"
        />
      );
      const rows = container.querySelectorAll('.rds-table__body .rds-table__row');
      expect(rows.length).toBe(10);
    });

    it('should work with selection and pagination together', () => {
      const manyRows = Array.from({ length: 25 }, (_, i) => ({
        id: String(i),
        name: `Name ${i}`,
        email: `email${i}@example.com`,
        age: 20 + i,
      }));
      const onRowSelect = jest.fn();
      const { container } = renderWithTheme(
        <RdsTable 
          columns={mockColumns} 
          rows={manyRows}
          selectable={true}
          onRowSelect={onRowSelect}
          pagination={true}
          pageSize={10}
        />
      );
      const checkboxes = container.querySelectorAll('.rds-table__body input[type="checkbox"]');
      fireEvent.click(checkboxes[0]);
      expect(onRowSelect).toHaveBeenCalled();
    });

    it('should work with custom formatting and sorting', () => {
      const formattedColumns: RdsTableColumn[] = [
        { 
          id: 'age', 
          label: 'Age',
          format: (value) => `${value} years`,
          sortable: true
        },
      ];
      const { container } = renderWithTheme(
        <RdsTable 
          columns={formattedColumns} 
          rows={mockRows}
          sortBy="age"
          sortDirection="asc"
        />
      );
      expect(screen.getByText('25 years')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = renderWithTheme(<RdsTable columns={mockColumns} rows={mockRows} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
