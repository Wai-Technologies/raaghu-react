import React from 'react';
import RdsFluentGrid, { FluentGridColumn } from './rds-comp-fluent-grid';

// Test data
const testHeaders: FluentGridColumn[] = [
  {
    key: 'id',
    name: 'ID',
    isSort: true,
    isFilter: true,
    minWidth: 80,
  },
  {
    key: 'name',
    name: 'Name',
    isSort: true,
    isFilter: true,
    minWidth: 150,
  },
  {
    key: 'email',
    name: 'Email',
    isSort: true,
    isFilter: true,
    minWidth: 200,
  },
];

const testData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

const TestFluentGrid: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Fluent Grid Test</h2>
      <RdsFluentGrid
        tableHeaders={testHeaders}
        tableData={testData}
        pagination={true}
        recordsPerPage={2}
        showRecordsPerPage={true}
        pageSizeOptions={[2, 5, 10]}
        isSort={true}
        isFilter={true}
        enableCheckboxSelection={true}
        showHeader={true}
        showSubHeader={true}
        noDataHeaderTitle="Test Grid"
      />
    </div>
  );
};

export default TestFluentGrid;
