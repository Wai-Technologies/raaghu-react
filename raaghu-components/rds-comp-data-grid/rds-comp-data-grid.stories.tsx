import { StoryObj, Meta } from '@storybook/react-vite';
import React, { useState } from 'react';
import RdsCompDataGrid, { RdsCompDataGridProps } from './rds-comp-data-grid';
import { GridColDef, GridRowSelectionModel, GridRowId, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

// Sample columns
const mockColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 100, type: 'number' },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'department', headerName: 'Department', width: 150 },
  { field: 'salary', headerName: 'Salary', width: 120, type: 'number' },
  { field: 'status', headerName: 'Status', width: 120 },
];

// Sample data
const mockRows = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 30, email: 'john@example.com', department: 'Engineering', salary: 120000, status: 'Active' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 25, email: 'jane@example.com', department: 'Design', salary: 95000, status: 'Active' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 35, email: 'bob@example.com', department: 'Sales', salary: 85000, status: 'Active' },
  { id: 4, firstName: 'Alice', lastName: 'Williams', age: 28, email: 'alice@example.com', department: 'Engineering', salary: 110000, status: 'Active' },
  { id: 5, firstName: 'Charlie', lastName: 'Brown', age: 32, email: 'charlie@example.com', department: 'Marketing', salary: 90000, status: 'Inactive' },
  { id: 6, firstName: 'David', lastName: 'Miller', age: 40, email: 'david@example.com', department: 'Engineering', salary: 130000, status: 'Active' },
  { id: 7, firstName: 'Emma', lastName: 'Davis', age: 26, email: 'emma@example.com', department: 'Design', salary: 92000, status: 'Active' },
  { id: 8, firstName: 'Frank', lastName: 'Garcia', age: 45, email: 'frank@example.com', department: 'Sales', salary: 95000, status: 'Active' },
  { id: 9, firstName: 'Grace', lastName: 'Rodriguez', age: 29, email: 'grace@example.com', department: 'Engineering', salary: 115000, status: 'Active' },
  { id: 10, firstName: 'Henry', lastName: 'Martinez', age: 33, email: 'henry@example.com', department: 'Operations', salary: 88000, status: 'Active' },
];

const meta: Meta<typeof RdsCompDataGrid> = {
  title: 'Components/DataGrid',
  component: RdsCompDataGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'DataGrid displays tabular data with support for sorting, filtering, pagination, and row selection. Fully theme-aware with light and dark mode support.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    columns: {
      description: 'Array of column definitions',
      table: { disable: true },
    },
    rows: {
      description: 'Array of row data',
      table: { disable: true },
    },
    variant: {
      control: 'select',
      options: ['standard', 'elevated', 'outlined'],
      description: 'Display variant - standard (bordered), elevated (shadow), or outlined',
    },
    striped: {
      control: 'boolean',
      description: 'If true, displays alternating row background colors',
    },
    hoverable: {
      control: 'boolean',
      description: 'If true, rows highlight on hover',
    },
    compact: {
      control: 'boolean',
      description: 'If true, uses compact row density (smaller rows)',
    },
    bordered: {
      control: 'boolean',
      description: 'If true, displays borders around all cells',
    },
    pagination: {
      control: 'boolean',
      description: 'If true, enables pagination',
    },
    pageSizeOptions: {
      control: 'object',
      description: 'Array of page size options for the pagination selector (e.g. [5, 10, 25, 50])',
    },
    checkboxSelection: {
      control: 'boolean',
      description: 'If true, displays a checkbox column for row selection',
    },
    disableColumnFilter: {
      control: 'boolean',
      description: 'If true, disables column filtering',
    },
    disableColumnMenu: {
      control: 'boolean',
      description: 'If true, disables the column menu',
    },
    disableColumnSorting: {
      control: 'boolean',
      description: 'If true, disables column sorting',
    },
    autoHeight: {
      control: 'boolean',
      description: 'If true, the grid auto-sizes its height to fit the rows',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RdsCompDataGrid>;

// ─── Default Story ─────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    columns: mockColumns,
    rows: mockRows,
    variant: 'standard',
    striped: false,
    hoverable: true,
    compact: false,
    bordered: true,
    pagination: true,
    pageSizeOptions: [5, 10, 25, 50],
    checkboxSelection: false,
  },
  render: (args) => (
    <div style={{ padding: '20px', height: '600px' }}>
      <RdsCompDataGrid {...args} />
    </div>
  ),
};

// ─── Variants Showcase ──────────────────────────────────────────────────────
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
      <section>
        <h3 style={{ marginBottom: '16px', color: 'var(--rds-text-primary, #212121)' }}>Standard Variant</h3>
        <div style={{ height: '400px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
          <RdsCompDataGrid columns={mockColumns} rows={mockRows.slice(0, 5)} variant="standard" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', color: 'var(--rds-text-primary, #212121)' }}>Elevated Variant</h3>
        <div style={{ height: '400px', borderRadius: '8px' }}>
          <RdsCompDataGrid columns={mockColumns} rows={mockRows.slice(0, 5)} variant="elevated" />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', color: 'var(--rds-text-primary, #212121)' }}>Outlined Variant</h3>
        <div style={{ height: '400px', border: '2px solid #e0e0e0', borderRadius: '4px' }}>
          <RdsCompDataGrid columns={mockColumns} rows={mockRows.slice(0, 5)} variant="outlined" />
        </div>
      </section>
    </div>
  ),
};

// ─── Display Options ───────────────────────────────────────────────────────
export const DisplayOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
      <section>
        <h3 style={{ marginBottom: '16px', color: 'var(--rds-text-primary, #212121)' }}>Default (Hoverable)</h3>
        <div style={{ height: '400px' }}>
          <RdsCompDataGrid columns={mockColumns} rows={mockRows.slice(0, 5)} hoverable={true} />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', color: 'var(--rds-text-primary, #212121)' }}>Striped Rows</h3>
        <div style={{ height: '400px' }}>
          <RdsCompDataGrid columns={mockColumns} rows={mockRows.slice(0, 5)} striped={true} />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', color: 'var(--rds-text-primary, #212121)' }}>Compact Density</h3>
        <div style={{ height: '400px' }}>
          <RdsCompDataGrid columns={mockColumns} rows={mockRows.slice(0, 5)} compact={true} />
        </div>
      </section>

      <section>
        <h3 style={{ marginBottom: '16px', color: 'var(--rds-text-primary, #212121)' }}>Striped + Compact</h3>
        <div style={{ height: '400px' }}>
          <RdsCompDataGrid columns={mockColumns} rows={mockRows.slice(0, 5)} striped={true} compact={true} />
        </div>
      </section>
    </div>
  ),
};

// ─── Row Selection ──────────────────────────────────────────────────────────
export const WithRowSelection: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set<GridRowId>() });

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p style={{ margin: '0', color: 'var(--rds-text-primary, #212121)' }}>
            Selected rows: <strong>{Array.from(selectedRows.ids).join(', ') || 'None'}</strong>
          </p>
        </div>
        <div style={{ height: '400px' }}>
          <RdsCompDataGrid
            {...args}
            columns={mockColumns}
            rows={mockRows.slice(0, 8)}
            selectedRowIds={selectedRows}
            onRowSelectionChange={setSelectedRows}
            checkboxSelection
          />
        </div>
      </div>
    );
  },
};

// ─── Pagination ────────────────────────────────────────────────────────────
export const WithPagination: Story = {
  render: (args) => {
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
      pageSize: 5,
      page: 0,
    });

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p style={{ margin: '0', color: 'var(--rds-text-primary, #212121)' }}>
            Page: <strong>{paginationModel.page + 1}</strong> | Page Size: <strong>{paginationModel.pageSize}</strong>
          </p>
        </div>
        <div style={{ height: '400px' }}>
          <RdsCompDataGrid
            {...args}
            columns={mockColumns}
            rows={mockRows}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </div>
      </div>
    );
  },
};

// ─── Sorting & Filtering ───────────────────────────────────────────────────
export const WithSorting: Story = {
  render: (args) => {
    const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'firstName', sort: 'asc' }]);

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <p style={{ margin: '0', color: 'var(--rds-text-primary, #212121)' }}>
            Sorted by: <strong>{sortModel[0]?.field || 'None'}</strong> (
            {sortModel[0]?.sort?.toUpperCase() || 'N/A'})
          </p>
        </div>
        <div style={{ height: '400px' }}>
          <RdsCompDataGrid
            {...args}
            columns={mockColumns}
            rows={mockRows}
            sortModel={sortModel}
            onSortModelChange={setSortModel}
          />
        </div>
      </div>
    );
  },
};

// ─── Complex Showcase ──────────────────────────────────────────────────────
export const CompleteExample: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>({ type: 'include', ids: new Set<GridRowId>([1, 2]) });
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
      pageSize: 10,
      page: 0,
    });
    const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'firstName', sort: 'asc' }]);

    return (
      <div style={{ padding: '20px' }}>
        <div
          style={{
            marginBottom: '20px',
            padding: '16px',
            backgroundColor: 'var(--rds-background-hover, #f5f5f5)',
            borderRadius: '4px',
            color: 'var(--rds-text-primary, #212121)',
          }}
        >
          <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Status</h3>
          <p style={{ margin: '4px 0' }}>
            Selected Rows: <strong>{Array.from(selectedRows.ids).join(', ') || 'None'}</strong>
          </p>
          <p style={{ margin: '4px 0' }}>
            Page: <strong>{paginationModel.page + 1}</strong> of{' '}
            <strong>{Math.ceil(mockRows.length / paginationModel.pageSize)}</strong>
          </p>
          <p style={{ margin: '4px 0' }}>
            Sorted by: <strong>{sortModel[0]?.field || 'None'}</strong>
          </p>
        </div>

        <div style={{ height: '500px' }}>
          <RdsCompDataGrid
            columns={mockColumns}
            rows={mockRows}
            selectedRowIds={selectedRows}
            onRowSelectionChange={setSelectedRows}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            checkboxSelection
            variant="elevated"
            striped={true}
            compact={false}
          />
        </div>
      </div>
    );
  },
};

// ─── Interactive Playground ────────────────────────────────────────────────
export const InteractivePlayground: Story = {
  render: (args) => {
    const [variant, setVariant] = useState<'standard' | 'elevated' | 'outlined'>('standard');
    const [striped, setStriped] = useState(false);
    const [hoverable, setHoverable] = useState(true);
    const [compact, setCompact] = useState(false);
    const [bordered, setBordered] = useState(true);
    const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });

    return (
      <div style={{ padding: '20px' }}>
        <div
          style={{
            marginBottom: '20px',
            padding: '16px',
            backgroundColor: 'var(--rds-background-hover, #f5f5f5)',
            borderRadius: '4px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--rds-text-primary, #212121)' }}>
              Variant:
            </label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as any)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid var(--rds-border-default, #e0e0e0)',
                backgroundColor: 'var(--rds-background-surface, #ffffff)',
                color: 'var(--rds-text-primary, #212121)',
              }}
            >
              <option value="standard">Standard</option>
              <option value="elevated">Elevated</option>
              <option value="outlined">Outlined</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 600, color: 'var(--rds-text-primary, #212121)' }}>
              Page Size:
            </label>
            <select
              value={paginationModel.pageSize}
              onChange={(e) => setPaginationModel({ ...paginationModel, pageSize: parseInt(e.target.value), page: 0 })}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid var(--rds-border-default, #e0e0e0)',
                backgroundColor: 'var(--rds-background-surface, #ffffff)',
                color: 'var(--rds-text-primary, #212121)',
              }}
            >
              <option value={5}>5 rows</option>
              <option value={10}>10 rows</option>
              <option value={25}>25 rows</option>
              <option value={50}>50 rows</option>
            </select>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--rds-text-primary, #212121)' }}>
            <input type="checkbox" checked={striped} onChange={(e) => setStriped(e.target.checked)} />
            Striped Rows
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--rds-text-primary, #212121)' }}>
            <input type="checkbox" checked={hoverable} onChange={(e) => setHoverable(e.target.checked)} />
            Hoverable
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--rds-text-primary, #212121)' }}>
            <input type="checkbox" checked={compact} onChange={(e) => setCompact(e.target.checked)} />
            Compact
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--rds-text-primary, #212121)' }}>
            <input type="checkbox" checked={bordered} onChange={(e) => setBordered(e.target.checked)} />
            Bordered
          </label>

          <div style={{ gridColumn: '1 / -1', paddingTop: '8px', fontSize: '12px', color: 'var(--rds-text-secondary, #757575)' }}>
            📊 Page {paginationModel.page + 1} | Page Size: {paginationModel.pageSize}
          </div>
        </div>

        <div style={{ height: '500px' }}>
          <RdsCompDataGrid
            columns={mockColumns}
            rows={mockRows}
            variant={variant}
            striped={striped}
            hoverable={hoverable}
            compact={compact}
            bordered={bordered}
            checkboxSelection
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </div>
      </div>
    );
  },
};

// ─── Large Dataset ─────────────────────────────────────────────────────────
export const LargeDataset: Story = {
  render: (args) => {
    // Generate 500 rows
    const largeDataset = Array.from({ length: 500 }, (_, i) => ({
      id: i + 1,
      firstName: `User${i + 1}`,
      lastName: `Last${i + 1}`,
      age: Math.floor(Math.random() * 50) + 20,
      email: `user${i + 1}@example.com`,
      department: ['Engineering', 'Design', 'Sales', 'Marketing', 'Operations'][Math.floor(Math.random() * 5)],
      salary: Math.floor(Math.random() * 100000) + 50000,
      status: Math.random() > 0.2 ? 'Active' : 'Inactive',
    }));

    return (
      <div style={{ padding: '20px', height: '600px' }}>
        <RdsCompDataGrid
          columns={mockColumns}
          rows={largeDataset}
          variant="elevated"
          striped={true}
          compact={false}
          checkboxSelection
        />
      </div>
    );
  },
};

// ─── Dark Mode Example ─────────────────────────────────────────────────────
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => (
    <div style={{ padding: '20px', height: '600px', backgroundColor: '#121212' }} data-theme="dark">
      <RdsCompDataGrid
        columns={mockColumns}
        rows={mockRows}
        variant="elevated"
        striped={true}
        checkboxSelection
      />
    </div>
  ),
};
