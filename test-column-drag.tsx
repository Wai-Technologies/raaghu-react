import React, { useState } from 'react';
import RdsFluentGridNoScss from './raaghu-components/rds-comp-fluent-grid/rds-comp-fluent-grid-no-scss';

// Test data and columns for the grid
const testColumns = [
  { key: 'name', name: 'Name', isSort: true },
  { key: 'age', name: 'Age', isSort: true },
  { key: 'email', name: 'Email', isSort: true },
  { key: 'department', name: 'Department', isSort: true },
];

const testData = [
  { name: 'John Doe', age: 30, email: 'john@example.com', department: 'Engineering' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com', department: 'Marketing' },
  { name: 'Bob Johnson', age: 35, email: 'bob@example.com', department: 'Sales' },
];

const TestColumnDrag: React.FC = () => {
  const [columns, setColumns] = useState(testColumns);

  const handleColumnReorder = (fromIndex: number, toIndex: number, newHeaders: any[]) => {
    setColumns(newHeaders);
    console.log('Columns reordered:', { fromIndex, toIndex, newHeaders });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Column Drag Test</h2>
      <p>Try dragging the column headers to reorder them. The original column should remain visible during drag.</p>
      
      <RdsFluentGridNoScss
        tableHeaders={columns}
        tableData={testData}
        enableColumnSwapping={true}
        onColumnSwap={handleColumnReorder}
        // Additional props that might be needed
        enableCheckboxSelection={false}
        enableRowSwapping={false}
        isSort={true}
      />
      
      <div style={{ marginTop: '20px' }}>
        <h3>Current Column Order:</h3>
        <ol>
          {columns.map(col => (
            <li key={col.key}>{col.name} ({col.key})</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TestColumnDrag;