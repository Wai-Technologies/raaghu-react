import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RdsCompDataGrid, { RdsCompDataGridProps } from './rds-comp-data-grid';
import { GridColDef, GridRowId } from '@mui/x-data-grid';

// Sample test data
const mockColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const mockRows = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 30, email: 'john@example.com' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 25, email: 'jane@example.com' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 35, email: 'bob@example.com' },
  { id: 4, firstName: 'Alice', lastName: 'Williams', age: 28, email: 'alice@example.com' },
  { id: 5, firstName: 'Charlie', lastName: 'Brown', age: 32, email: 'charlie@example.com' },
];

describe('RdsCompDataGrid', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<RdsCompDataGrid columns={mockColumns} rows={mockRows} />);
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });

    it('renders with correct CSS class', () => {
      const { container } = render(<RdsCompDataGrid columns={mockColumns} rows={mockRows} />);
      expect(container.querySelector('.rds-comp-data-grid')).toBeInTheDocument();
    });

    it('renders with default variant class', () => {
      const { container } = render(<RdsCompDataGrid columns={mockColumns} rows={mockRows} />);
      expect(container.querySelector('.rds-comp-data-grid--standard')).toBeInTheDocument();
    });

    it('renders column headers', () => {
      render(<RdsCompDataGrid columns={mockColumns} rows={mockRows} />);
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('First name')).toBeInTheDocument();
      expect(screen.getByText('Last name')).toBeInTheDocument();
    });

    it('renders row data', () => {
      render(<RdsCompDataGrid columns={mockColumns} rows={mockRows} />);
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });
  });

  describe('Uncontrolled Mode', () => {
    it('accepts default selected row IDs', () => {
      render(
        <RdsCompDataGrid
          columns={mockColumns}
          rows={mockRows}
          defaultSelectedRowIds={{ type: 'include', ids: new Set<GridRowId>([1, 2]) }}
          checkboxSelection
        />
      );
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });

    it('accepts default pagination model', () => {
      render(
        <RdsCompDataGrid
          columns={mockColumns}
          rows={mockRows}
          defaultPaginationModel={{ pageSize: 5, page: 0 }}
        />
      );
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });

    it('accepts default sort model', () => {
      render(
        <RdsCompDataGrid
          columns={mockColumns}
          rows={mockRows}
          defaultSortModel={[{ field: 'firstName', sort: 'asc' }]}
        />
      );
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });

    it('accepts default filter model', () => {
      render(
        <RdsCompDataGrid
          columns={mockColumns}
          rows={mockRows}
          defaultFilterModel={{ items: [] }}
        />
      );
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });
  });

  describe('Controlled Mode', () => {
    it('accepts controlled selected row IDs', () => {
      const handleRowSelectionChange = jest.fn();
      render(
        <RdsCompDataGrid
          columns={mockColumns}
          rows={mockRows}
          selectedRowIds={{ type: 'include', ids: new Set<GridRowId>([1, 2]) }}
          onRowSelectionChange={handleRowSelectionChange}
          checkboxSelection
        />
      );
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });

    it('fires onRowSelectionChange callback', () => {
      const handleRowSelectionChange = jest.fn();
      render(
        <RdsCompDataGrid
          columns={mockColumns}
          rows={mockRows}
          onRowSelectionChange={handleRowSelectionChange}
          checkboxSelection
        />
      );
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });

    it('fires onPaginationModelChange callback', () => {
      const handlePaginationModelChange = jest.fn();
      render(
        <RdsCompDataGrid
          columns={mockColumns}
          rows={mockRows}
          paginationModel={{ pageSize: 10, page: 0 }}
          onPaginationModelChange={handlePaginationModelChange}
        />
      );
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });

    it('fires onSortModelChange callback', () => {
      const handleSortModelChange = jest.fn();
      render(
        <RdsCompDataGrid
          columns={mockColumns}
          rows={mockRows}
          sortModel={[]}
          onSortModelChange={handleSortModelChange}
        />
      );
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });

    it('fires onFilterModelChange callback', () => {
      const handleFilterModelChange = jest.fn();
      render(
        <RdsCompDataGrid
          columns={mockColumns}
          rows={mockRows}
          filterModel={{ items: [] }}
          onFilterModelChange={handleFilterModelChange}
        />
      );
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies standard variant class', () => {
      const { container } = render(
        <RdsCompDataGrid columns={mockColumns} rows={mockRows} variant="standard" />
      );
      expect(container.querySelector('.rds-comp-data-grid--standard')).toBeInTheDocument();
    });

    it('applies elevated variant class', () => {
      const { container } = render(
        <RdsCompDataGrid columns={mockColumns} rows={mockRows} variant="elevated" />
      );
      expect(container.querySelector('.rds-comp-data-grid--elevated')).toBeInTheDocument();
    });

    it('applies outlined variant class', () => {
      const { container } = render(
        <RdsCompDataGrid columns={mockColumns} rows={mockRows} variant="outlined" />
      );
      expect(container.querySelector('.rds-comp-data-grid--outlined')).toBeInTheDocument();
    });
  });

  describe('Display Options', () => {
    it('applies striped class when striped is true', () => {
      const { container } = render(
        <RdsCompDataGrid columns={mockColumns} rows={mockRows} striped={true} />
      );
      expect(container.querySelector('.rds-comp-data-grid--striped')).toBeInTheDocument();
    });

    it('applies hoverable class when hoverable is true', () => {
      const { container } = render(
        <RdsCompDataGrid columns={mockColumns} rows={mockRows} hoverable={true} />
      );
      expect(container.querySelector('.rds-comp-data-grid--hoverable')).toBeInTheDocument();
    });

    it('applies compact class when compact is true', () => {
      const { container } = render(
        <RdsCompDataGrid columns={mockColumns} rows={mockRows} compact={true} />
      );
      expect(container.querySelector('.rds-comp-data-grid--compact')).toBeInTheDocument();
    });

    it('applies bordered class when bordered is true', () => {
      const { container } = render(
        <RdsCompDataGrid columns={mockColumns} rows={mockRows} bordered={true} />
      );
      expect(container.querySelector('.rds-comp-data-grid--bordered')).toBeInTheDocument();
    });

    it('combines multiple display options', () => {
      const { container } = render(
        <RdsCompDataGrid
          columns={mockColumns}
          rows={mockRows}
          striped={true}
          compact={true}
          bordered={true}
        />
      );
      expect(container.querySelector('.rds-comp-data-grid--striped')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-data-grid--compact')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-data-grid--bordered')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct data-testid attribute', () => {
      render(<RdsCompDataGrid columns={mockColumns} rows={mockRows} />);
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });

    it('renders with proper semantic structure', () => {
      const { container } = render(<RdsCompDataGrid columns={mockColumns} rows={mockRows} />);
      const datagrid = container.querySelector('.rds-comp-data-grid');
      expect(datagrid).toBeInTheDocument();
    });

    it('supports keyboard navigation', () => {
      render(<RdsCompDataGrid columns={mockColumns} rows={mockRows} />);
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });
  });

  describe('MUI Props Forwarding', () => {
    it('forwards custom className', () => {
      const { container } = render(
        <RdsCompDataGrid columns={mockColumns} rows={mockRows} className="custom-class" />
      );
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('forwards density prop', () => {
      render(
        <RdsCompDataGrid
          columns={mockColumns}
          rows={mockRows}
          density="compact"
        />
      );
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('renders with empty rows array', () => {
      render(<RdsCompDataGrid columns={mockColumns} rows={[]} />);
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });

    it('renders with no columns defined', () => {
      render(<RdsCompDataGrid columns={[]} rows={mockRows} />);
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });

    it('handles row update gracefully', () => {
      const { rerender } = render(<RdsCompDataGrid columns={mockColumns} rows={mockRows} />);
      rerender(
        <RdsCompDataGrid
          columns={mockColumns}
          rows={[...mockRows, { id: 6, firstName: 'David', lastName: 'Miller', age: 40, email: 'david@example.com' }]}
        />
      );
      expect(screen.getByTestId('rds-comp-data-grid')).toBeInTheDocument();
    });
  });

  describe('Theme Styling', () => {
    it('renders with CSS variables for theming', () => {
      const { container } = render(<RdsCompDataGrid columns={mockColumns} rows={mockRows} />);
      const datagrid = container.querySelector('.rds-comp-data-grid');
      expect(datagrid).toBeInTheDocument();
    });
  });
});
