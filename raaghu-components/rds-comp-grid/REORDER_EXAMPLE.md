# Row and Column Reorder Example

The RdsCompGrid component now supports row and column reordering via drag and drop functionality.

## Features Added

### New Props
- `enableRowReorder?: boolean` - Enable row reordering via drag and drop
- `enableColumnReorder?: boolean` - Enable column reordering via drag and drop
- `onRowReorder?: (newData: any[], fromIndex: number, toIndex: number) => void` - Callback when rows are reordered
- `onColumnReorder?: (newColumnOrder: string[], fromIndex: number, toIndex: number) => void` - Callback when columns are reordered

### New Grid Ref Methods
- `moveRow(fromIndex: number, toIndex: number)` - Programmatically move a row
- `reorderRows(newOrder: number[])` - Programmatically reorder all rows
- `getRowOrder()` - Get current row order
- `moveColumn(fromIndex: number, toIndex: number)` - Programmatically move a column
- `reorderColumns(newOrder: string[])` - Programmatically reorder all columns
- `getColumnOrder()` - Get current column order

## Usage Example

```tsx
import React, { useRef } from 'react';
import RdsCompGrid, { RdsCompGridRef, RdsCompGridColumn } from './rds-comp-grid';

const MyComponent = () => {
  const gridRef = useRef<RdsCompGridRef>(null);

  const handleRowReorder = (newData: any[], fromIndex: number, toIndex: number) => {
    console.log('Rows reordered:', { newData, fromIndex, toIndex });
    // Update your data source here
  };

  const handleColumnReorder = (newColumnOrder: string[], fromIndex: number, toIndex: number) => {
    console.log('Columns reordered:', { newColumnOrder, fromIndex, toIndex });
    // Update your column configuration here
  };

  const handleProgrammaticReorder = () => {
    if (gridRef.current) {
      // Move first row to last position
      gridRef.current.moveRow(0, data.length - 1);
      
      // Reorder columns
      const newColumnOrder = ['name', 'email', 'age', 'status'];
      gridRef.current.reorderColumns(newColumnOrder);
    }
  };

  return (
    <div>
      <button onClick={handleProgrammaticReorder}>
        Reorder Programmatically
      </button>
      
      <RdsCompGrid
        ref={gridRef}
        tableHeaders={headers}
        tableData={data}
        enableRowReorder={true}
        enableColumnReorder={true}
        onRowReorder={handleRowReorder}
        onColumnReorder={handleColumnReorder}
        // ... other props
      />
    </div>
  );
};
```

## Implementation Details

- Uses `@dnd-kit` library for drag and drop functionality
- Rows can be reordered by dragging them vertically
- Columns can be reordered by dragging them horizontally
- Visual feedback during drag operations (opacity change)
- Maintains all existing grid functionality (sorting, filtering, editing, etc.)
- Reorder state is managed internally and can be accessed via grid ref methods

## Dependencies

The following packages are required (already included in package.json):
- `@dnd-kit/core`
- `@dnd-kit/sortable`
- `@dnd-kit/utilities`
