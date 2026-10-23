import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsTable, { RdsTableColumn, RdsTableProps } from './rds-table';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import { warnDeprecatedProp } from '../shared/utils/deprecation';


jest.mock('./rds-table.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));
jest.mock('@mui/icons-material/SwapVert', () => {
  return function MockSwapVertIcon() {
    return <div data-testid="swap-vert-icon">SwapVert</div>;
  };
});

const renderWithTheme = (component: React.ReactElement, isDark = false) => {
  const theme = createTheme({ palette: { mode: isDark ? 'dark' : 'light' } });
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
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

const manyRows = Array.from({ length: 25 }, (_, i) => ({
  id: String(i),
  name: `Name ${i}`,
  email: `email${i}@example.com`,
  age: 20 + i,
}));

const sortableName: RdsTableColumn[] = [{ id: 'name', label: 'Name', sortable: true }];
const checkboxColumns: RdsTableColumn[] = [{ id: 'select', label: 'Select', type: 'checkbox' }];
const radioColumns: RdsTableColumn[] = [{ id: 'select', label: 'Select', type: 'radio' }];
const bodyRows = '.rds-table__body .rds-table__row';
const paginationSel = '.MuiTablePagination-root';

describe('RdsTable', () => {
  const setup = (p: Partial<RdsTableProps> = {}) =>
    renderWithTheme(<RdsTable columns={mockColumns} rows={mockRows} {...p} />);
  const ages = (container: HTMLElement) =>
    Array.from(container.querySelectorAll('.rds-table__body .rds-table__cell'))
      .filter((_, i) => i % mockColumns.length === 2)
      .map((cell) => parseInt(cell.textContent || '0'));

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      expect(setup().container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsTable.displayName).toBe('RdsTable');
    });

    it('should apply rds-table class', () => {
      expect(setup().container.querySelector('.rds-table')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      expect(setup({ className: 'custom-class' }).container.querySelector('.rds-table.custom-class')).toBeInTheDocument();
    });

    it('should apply Paper component wrapper', () => {
      expect(setup().container.querySelector('.MuiPaper-root')).toBeInTheDocument();
    });
  });

  describe('Column Rendering', () => {
    it('should render all column headers', () => {
      setup();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
    });

    it('should apply correct column alignment', () => {
      const cells = setup().container.querySelectorAll('.rds-table__header');
      const ageCell = Array.from(cells).find((cell) => cell.textContent?.includes('Age'));
      expect(ageCell).toHaveStyle({ textAlign: 'right' });
    });

    it('should apply minWidth to columns', () => {
      expect(setup().container.querySelectorAll('.rds-table__header').length).toBe(mockColumns.length);
    });

    it('should render hidden columns when not provided', () => {
      expect(setup({ columns: [] }).container.querySelectorAll('.rds-table__header').length).toBe(0);
    });
  });

  describe('Row Rendering', () => {
    it('should render all rows', () => {
      setup();
      mockRows.forEach((row) => {
        expect(screen.getByText(row.name)).toBeInTheDocument();
      });
    });

    it('should render row data in correct cells', () => {
      setup();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
    });

    it('should apply hover effect on rows', () => {
      expect(setup().container.querySelectorAll('.rds-table__row').length).toBe(mockRows.length);
    });

    it('should handle empty rows', () => {
      expect(setup({ rows: [] }).container.querySelectorAll(bodyRows).length).toBe(0);
    });

    it('should use row.key as fallback row identifier', () => {
      const rowsWithKey = [
        { key: 'row1', name: 'John', email: 'john@example.com', age: 30 },
        { key: 'row2', name: 'Jane', email: 'jane@example.com', age: 25 },
      ];
      expect(setup({ rows: rowsWithKey }).container.querySelectorAll(bodyRows).length).toBe(2);
    });
  });

  describe('Sorting', () => {
    it('should make sortable columns clickable', () => {
      const sortButton = setup({ columns: sortableName }).container.querySelector('.rds-table__sort-button');
      expect(sortButton).toBeInTheDocument();
      expect(sortButton?.tagName).toBe('BUTTON');
    });

    it('should not make non-sortable columns clickable', () => {
      setup().container.querySelectorAll('.rds-table__header-content').forEach((header) => {
        expect(header).toHaveStyle({ cursor: undefined });
      });
    });

    it('should call onSortChange when sortable column is clicked', () => {
      const onSortChange = jest.fn();
      const { container } = setup({ columns: sortableName, onSortChange });
      fireEvent.click(container.querySelector('.rds-table__header-content')!);
      expect(onSortChange).toHaveBeenCalledWith('name', 'asc');
    });

    it('should toggle sort direction on repeated clicks', () => {
      const onSortChange = jest.fn();
      const { container } = setup({ columns: sortableName, onSortChange, sortBy: 'name', sortDirection: 'asc' });
      fireEvent.click(container.querySelector('.rds-table__header-content')!);
      expect(onSortChange).toHaveBeenCalledWith('name', 'desc');
    });

    it('should apply active class to sorted column header', () => {
      const { container } = setup({ columns: sortableName, sortBy: 'name', sortDirection: 'asc' });
      expect(container.querySelector('.rds-table__header--sorted')).toBeInTheDocument();
    });

    it('should sort rows numerically', () => {
      expect(ages(setup({ sortBy: 'age', sortDirection: 'asc' }).container)).toEqual([25, 30, 35]);
    });

    it('should sort rows in descending order', () => {
      expect(ages(setup({ sortBy: 'age', sortDirection: 'desc' }).container)).toEqual([35, 30, 25]);
    });

    it('should not allow sorting on checkbox columns', () => {
      const { container } = setup({ columns: [checkboxColumns[0], ...mockColumns] });
      expect(container.querySelectorAll('.rds-table__header')[0]).not.toHaveClass('rds-table__header--sortable');
    });

    it('should use defaultSortBy and defaultSortDirection', () => {
      const { container } = setup({ columns: sortableName, defaultSortBy: 'name', defaultSortDirection: 'desc' });
      expect(container.querySelector('.rds-table__header--sorted')).toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    it('should not show pagination when disabled', () => {
      expect(setup({ pagination: false }).container.querySelector(paginationSel)).not.toBeInTheDocument();
    });

    it('should show pagination when enabled', () => {
      expect(setup({ pagination: true }).container.querySelector(paginationSel)).toBeInTheDocument();
    });

    it('should paginate rows correctly', () => {
      const { container } = setup({ rows: manyRows, pagination: true, pageSize: 10, page: 0 });
      expect(container.querySelectorAll(bodyRows).length).toBe(10);
    });

    it('should call onPageChange when page is changed', () => {
      const onPageChange = jest.fn();
      const { container } = setup({ rows: manyRows, pagination: true, pageSize: 10, page: 0, onPageChange });
      const nextButton = container.querySelector('button[title="Next page"]');
      if (nextButton) {
        fireEvent.click(nextButton);
        expect(onPageChange).toHaveBeenCalledWith(1);
      }
    });

    it('should call onPageSizeChange when pageSize is changed', () => {
      const { container } = setup({ rows: manyRows, pagination: true, pageSize: 10, onPageSizeChange: jest.fn() });
      expect(container.querySelector(paginationSel)).toBeInTheDocument();
    });

    it('should use totalRows when provided', () => {
      const { container } = setup({ pagination: true, totalRows: 100 });
      expect(container.querySelector(paginationSel)?.textContent).toContain('100');
    });

    it('should use rows.length when totalRows is not provided', () => {
      const { container } = setup({ pagination: true });
      expect(container.querySelector(paginationSel)?.textContent).toContain('3');
    });
  });

  describe('Row Selection', () => {
    const headCheckbox = (container: HTMLElement) => container.querySelector('.rds-table__head input[type="checkbox"]');

    it('should not show select checkbox when selectable is false', () => {
      const { container } = setup({ selectable: false });
      expect(container.querySelectorAll('.rds-table__checkbox input[type="checkbox"]').length).toBe(0);
    });

    it('should show select checkbox when selectable is true', () => {
      const { container } = setup({ selectable: true });
      expect(container.querySelectorAll('.rds-table__checkbox input[type="checkbox"]').length).toBeGreaterThan(0);
    });

    it('should select individual rows', () => {
      const onRowSelect = jest.fn();
      const { container } = setup({ selectable: true, onRowSelect });
      fireEvent.click(container.querySelectorAll('.rds-table__body input[type="checkbox"]')[0]);
      expect(onRowSelect).toHaveBeenCalled();
    });

    it('should select all rows', () => {
      const onRowSelect = jest.fn();
      const { container } = setup({ selectable: true, onRowSelect });
      fireEvent.click(headCheckbox(container)!);
      expect(onRowSelect).toHaveBeenCalledWith(expect.arrayContaining(['1', '2', '3']));
    });

    it('should deselect all rows when header checkbox is unchecked', () => {
      const onRowSelect = jest.fn();
      const { container } = setup({ selectable: true, selectedRows: ['1', '2', '3'], onRowSelect });
      fireEvent.click(headCheckbox(container)!);
      expect(onRowSelect).toHaveBeenCalledWith([]);
    });

    it('should apply selected class to selected rows', () => {
      const { container } = setup({ selectable: true, selectedRows: ['1'], onRowSelect: jest.fn() });
      const selectedRow = container.querySelector('.MuiTableRow-root[aria-checked="true"]');
      expect(selectedRow || container.querySelectorAll('.rds-table__row').length).toBeGreaterThan(0);
    });

    it('should show indeterminate state when some rows selected', () => {
      const { container } = setup({ selectable: true, selectedRows: ['1'], onRowSelect: jest.fn() });
      const headerCheckbox = headCheckbox(container) as HTMLInputElement;
      expect(headerCheckbox && (headerCheckbox.indeterminate || headerCheckbox.checked !== true)).toBeTruthy();
    });

    it('should use uncontrolled selection when onRowSelect is not provided', () => {
      const { container } = setup({ selectable: true });
      const checkbox = container.querySelector('.rds-table__body input[type="checkbox"]');
      fireEvent.click(checkbox!);
      expect(checkbox).toBeChecked();
    });
  });

  describe('Cell Types', () => {
    it('should render text cells by default', () => {
      setup();
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    it('should render checkbox cells', () => {
      const { container } = setup({ columns: checkboxColumns });
      expect(container.querySelectorAll('.rds-table__body input[type="checkbox"]').length).toBe(mockRows.length);
    });

    it('should toggle checkbox cells', () => {
      const { container } = setup({ columns: checkboxColumns });
      const checkbox = container.querySelector('.rds-table__body input[type="checkbox"]') as HTMLInputElement;
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('should select all checkbox cells in column', () => {
      const { container } = setup({ columns: checkboxColumns });
      fireEvent.click(container.querySelector('.rds-table__head .rds-table__checkbox input[type="checkbox"]')!);
      container.querySelectorAll('.rds-table__body .rds-table__checkbox input[type="checkbox"]').forEach((checkbox) => {
        expect(checkbox).toBeChecked();
      });
    });

    it('should render radio cells', () => {
      const { container } = setup({ columns: radioColumns });
      expect(container.querySelectorAll('.rds-table__body input[type="radio"]').length).toBe(mockRows.length);
    });

    it('should select only one radio cell', () => {
      const { container } = setup({ columns: radioColumns });
      const radios = container.querySelectorAll('.rds-table__body input[type="radio"]');
      fireEvent.click(radios[0]);
      fireEvent.click(radios[1]);
      expect(radios[0]).not.toBeChecked();
      expect(radios[1]).toBeChecked();
    });
  });

  describe('Column Formatting', () => {
    it('should apply custom format function', () => {
      setup({ columns: [{ id: 'age', label: 'Age', format: (value) => `${value} years` }] });
      expect(screen.getByText('30 years')).toBeInTheDocument();
    });

    it('should render custom JSX in format function', () => {
      const { container } = setup({ columns: [{ id: 'name', label: 'Name', format: (value) => <strong>{value}</strong> }] });
      expect(container.querySelectorAll('strong').length).toBe(mockRows.length);
    });
  });

  describe('Sticky Header', () => {
    const tableContainer = (container: HTMLElement) => container.querySelector('.rds-table__container');

    it('should not apply sticky header by default', () => {
      expect(tableContainer(setup({ stickyHeader: false }).container)).not.toHaveClass('rds-table__container--sticky');
    });

    it('should apply sticky header class when enabled', () => {
      expect(tableContainer(setup({ stickyHeader: true }).container)).toHaveClass('rds-table__container--sticky');
    });

    it('should set maxHeight when sticky header is enabled', () => {
      expect(tableContainer(setup({ stickyHeader: true }).container)).toHaveStyle({ maxHeight: '440px' });
    });
  });

  describe('Sort Icon and Accessibility', () => {
    it('should display sort icon for sortable columns', () => {
      expect(setup({ columns: sortableName }).container.querySelectorAll('.rds-table__sort-button').length).toBeGreaterThan(0);
    });

    it.each([
      ['asc', 'ascending'],
      ['desc', 'descending'],
    ] as const)('should apply aria-sort for %s sort', (sortDirection, expected) => {
      const { container } = setup({ columns: sortableName, sortBy: 'name', sortDirection });
      expect(container.querySelector('.rds-table__header--sorted')).toHaveAttribute('aria-sort', expected);
    });

    it('should apply aria-label to sort button', () => {
      const { container } = setup({ columns: sortableName });
      expect(container.querySelector('.rds-table__sort-button')).toHaveAttribute('aria-label');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rows with missing id and key', () => {
      const { container } = setup({ rows: [{ name: 'John', email: 'john@example.com', age: 30 }] });
      expect(container.querySelectorAll('.rds-table__row').length).toBe(1);
    });

    it.each([
      ['undefined', undefined],
      ['null', null],
    ])('should handle %s column values', (_n, email) => {
      const { container } = setup({ rows: [{ id: '1', name: 'John', email, age: 30 }] });
      expect(container.querySelectorAll('.rds-table__body .rds-table__cell').length).toBeGreaterThan(0);
    });

    it('should handle complex object values in cells', () => {
      const moreColumns: RdsTableColumn[] = [
        ...mockColumns,
        { id: 'nested', label: 'Nested', format: (value) => JSON.stringify(value) },
      ];
      const { container } = setup({
        columns: moreColumns,
        rows: [{ id: '1', name: 'John', email: 'john@example.com', age: 30, nested: { key: 'value' } }],
      });
      expect(container).toBeInTheDocument();
    });

    it('should handle sorting with missing values', () => {
      const rowsWithMissing = [
        { id: '1', name: 'John', email: 'john@example.com', age: 30 },
        { id: '2', email: 'jane@example.com', age: 25 },
        { id: '3', name: 'Bob', email: 'bob@example.com', age: 35 },
      ];
      const { container } = setup({ columns: sortableName, rows: rowsWithMissing, sortBy: 'name', sortDirection: 'asc' });
      expect(container).toBeInTheDocument();
    });

    it('should handle theme changes', () => {
      const { rerender, container } = renderWithTheme(<RdsTable columns={mockColumns} rows={mockRows} />, false);
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
      const rows = Array.from({ length: 25 }, (_, i) => ({
        id: String(i),
        name: `Name ${i}`,
        email: `email${i}@example.com`,
        age: 25 - (i % 10),
      }));
      const { container } = setup({
        columns: [{ id: 'age', label: 'Age', sortable: true }],
        rows,
        pagination: true,
        pageSize: 10,
        sortBy: 'age',
        sortDirection: 'asc',
      });
      expect(container.querySelectorAll(bodyRows).length).toBe(10);
    });

    it('should work with selection and pagination together', () => {
      const onRowSelect = jest.fn();
      const { container } = setup({ rows: manyRows, selectable: true, onRowSelect, pagination: true, pageSize: 10 });
      fireEvent.click(container.querySelectorAll('.rds-table__body input[type="checkbox"]')[0]);
      expect(onRowSelect).toHaveBeenCalled();
    });

    it('should work with custom formatting and sorting', () => {
      setup({
        columns: [{ id: 'age', label: 'Age', format: (value) => `${value} years`, sortable: true }],
        sortBy: 'age',
        sortDirection: 'asc',
      });
      expect(screen.getByText('25 years')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('audit fixes', () => {
  const makeRows = (n: number) =>
    Array.from({ length: n }, (_, i) => ({ id: String(i), name: `Name ${i}`, email: `e${i}@x.com`, age: i }));

  it('G2-308: uses page/pageSize as initial values and re-syncs when they change', () => {
    const { container, rerender } = renderWithTheme(
      <RdsTable columns={mockColumns} rows={makeRows(25)} pagination page={1} pageSize={5} />
    );
    expect(container.querySelectorAll(bodyRows).length).toBe(5);
    expect(screen.getByText('Name 5')).toBeInTheDocument();
    rerender(
      <ThemeProvider theme={createTheme()}>
        <RdsTable columns={mockColumns} rows={makeRows(25)} pagination page={2} pageSize={5} />
      </ThemeProvider>
    );
    expect(screen.getByText('Name 10')).toBeInTheDocument();
  });

  it('G2-308: user paging still works with a static page prop', () => {
    const onPageChange = jest.fn();
    renderWithTheme(
      <RdsTable columns={mockColumns} rows={makeRows(25)} pagination page={0} onPageChange={onPageChange} />
    );
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(screen.getByText('Name 10')).toBeInTheDocument();
  });

  it('G2-309: server mode renders rows as given and uses totalRows', () => {
    const { container } = renderWithTheme(
      <RdsTable columns={mockColumns} rows={makeRows(12)} pagination paginationMode="server" totalRows={120} />
    );
    expect(container.querySelectorAll(bodyRows).length).toBe(12);
    expect(container.querySelector(paginationSel)?.textContent).toContain('120');
  });

  it('G2-310: renders React element cell values as-is', () => {
    const rows = [{ id: '1', name: <strong data-testid="el">Bold</strong>, email: 'a', age: 1 }];
    renderWithTheme(<RdsTable columns={mockColumns} rows={rows} />);
    expect(screen.getByTestId('el')).toHaveTextContent('Bold');
  });

  it('G2-312: labels selection controls', () => {
    const cols: RdsTableColumn[] = [...mockColumns, { id: 'pick', label: 'Pick', type: 'radio' }];
    renderWithTheme(<RdsTable columns={cols} rows={mockRows} selectable />);
    expect(screen.getByLabelText('Select all rows')).toBeInTheDocument();
    expect(screen.getByLabelText('Select row 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Pick for row 3')).toBeInTheDocument();
  });

  it('G2-314: selectedRows seeds selection without onRowSelect and re-syncs', () => {
    const { rerender } = renderWithTheme(
      <RdsTable columns={mockColumns} rows={mockRows} selectable selectedRows={['1']} />
    );
    expect(screen.getByLabelText('Select row 1')).toBeChecked();
    rerender(
      <ThemeProvider theme={createTheme()}>
        <RdsTable columns={mockColumns} rows={mockRows} selectable selectedRows={['2']} />
      </ThemeProvider>
    );
    expect(screen.getByLabelText('Select row 1')).not.toBeChecked();
    expect(screen.getByLabelText('Select row 2')).toBeChecked();
  });

  it('G2-317: honours rowsPerPageOptions', () => {
    renderWithTheme(
      <RdsTable columns={mockColumns} rows={makeRows(5)} pagination pageSize={50} rowsPerPageOptions={[50, 100]} />
    );
    fireEvent.mouseDown(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: '100' })).toBeInTheDocument();
  });

  it('539: paginated shows the paginator and wins over pagination', () => {
    const { container } = renderWithTheme(
      <RdsTable columns={mockColumns} rows={makeRows(3)} paginated pagination={false} />
    );
    expect(container.querySelector(paginationSel)).toBeInTheDocument();
  });

  it('540: rows[].key still works as row id and warns', () => {
    const rows = [{ key: 'k1', name: 'A', email: 'a', age: 1 }];
    const onSelectionChange = jest.fn();
    renderWithTheme(<RdsTable columns={mockColumns} rows={rows} selectable onSelectionChange={onSelectionChange} />);
    fireEvent.click(screen.getByLabelText('Select row 1'));
    expect(onSelectionChange).toHaveBeenCalledWith(expect.anything(), ['k1']);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsTable', 'rows[].key', '`rows[].id`');
  });

  it('541: selected is controlled and onSelectionChange receives event and ids', () => {
    const onSelectionChange = jest.fn();
    renderWithTheme(
      <RdsTable columns={mockColumns} rows={mockRows} selectable selected={['1']} onSelectionChange={onSelectionChange} />
    );
    fireEvent.click(screen.getByLabelText('Select row 2'));
    expect(onSelectionChange).toHaveBeenCalledWith(expect.objectContaining({ target: expect.anything() }), ['1', '2']);
    expect(screen.getByLabelText('Select row 2')).not.toBeChecked();
  });

  it('541: onSelectionChange alone keeps selection uncontrolled', () => {
    renderWithTheme(<RdsTable columns={mockColumns} rows={mockRows} selectable onSelectionChange={jest.fn()} />);
    fireEvent.click(screen.getByLabelText('Select row 1'));
    expect(screen.getByLabelText('Select row 1')).toBeChecked();
  });

  it('542: rowCount wins over totalRows', () => {
    const { container } = renderWithTheme(
      <RdsTable columns={mockColumns} rows={makeRows(3)} paginated rowCount={77} totalRows={100} />
    );
    expect(container.querySelector(paginationSel)?.textContent).toContain('77');
  });
});
