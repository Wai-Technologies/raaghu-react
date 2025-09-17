# RdsCompGrid Ref Usage

The RdsCompGrid component now supports a comprehensive ref API that provides programmatic control over the grid, similar to major grid libraries like Kendo, DevExtreme, and PrimeNG.

## Basic Usage

```tsx
import React, { useRef, useEffect } from 'react';
import RdsCompGrid, { RdsCompGridRef, RdsCompGridColumn } from './rds-comp-grid';

const MyComponent = () => {
  const gridRef = useRef<RdsCompGridRef>(null);

  useEffect(() => {
    // Access grid methods after component mounts
    if (gridRef.current) {
      console.log('Total rows:', gridRef.current.getRowCount());
      console.log('Visible columns:', gridRef.current.getVisibleColumns());
    }
  }, []);

  const handleAddRow = () => {
    if (gridRef.current) {
      gridRef.current.addRow({
        id: Date.now(),
        name: 'New Item',
        value: 100
      });
    }
  };

  const handleFilter = () => {
    if (gridRef.current) {
      gridRef.current.applyFilter('name', 'New', 'contains');
    }
  };

  return (
    <div>
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={handleFilter}>Filter</button>
      
      <RdsCompGrid
        ref={gridRef}
        tableHeaders={headers}
        tableData={data}
        // ... other props
      />
    </div>
  );
};
```

## Available Methods

### Data Management
- `getData()` - Get all data
- `setData(data)` - Set all data
- `addRow(row)` - Add a new row
- `updateRow(rowId, rowData)` - Update a specific row
- `deleteRow(rowId)` - Delete a specific row
- `getRow(rowId)` - Get a specific row by ID
- `getSelectedRows()` - Get all selected rows
- `clearSelection()` - Clear all selections
- `selectAll()` - Select all rows

### Filtering
- `getFilters()` - Get current filter state
- `setFilters(filters)` - Set filter state
- `clearFilters()` - Clear all filters
- `applyFilter(columnKey, value, operator)` - Apply a filter
- `removeFilter(columnKey)` - Remove a specific filter

### Sorting
- `getSortState()` - Get current sort state
- `setSort(column, direction)` - Set sort order
- `clearSort()` - Clear sorting

### Search
- `getSearchValue()` - Get current search value
- `setSearchValue(value)` - Set search value
- `clearSearch()` - Clear search

### Pagination
- `getCurrentPage()` - Get current page
- `setCurrentPage(page)` - Set current page
- `getPageSize()` - Get page size
- `setPageSize(size)` - Set page size
- `getTotalPages()` - Get total pages

### Column Management
- `getVisibleColumns()` - Get visible column keys
- `setColumnVisibility(columnKey, visible)` - Show/hide column
- `showAllColumns()` - Show all columns
- `hideAllColumns()` - Hide all columns
- `getColumnWidth(columnKey)` - Get column width
- `setColumnWidth(columnKey, width)` - Set column width
- `resetColumnWidths()` - Reset all column widths

### Grid State
- `isCollapsed()` - Check if grid is collapsed
- `toggleCollapse()` - Toggle collapse state
- `expand()` - Expand grid
- `collapse()` - Collapse grid

### Editing
- `startEdit(rowId, columnKey?)` - Start editing
- `stopEdit()` - Stop editing
- `isEditing()` - Check if currently editing
- `getEditingRow()` - Get currently editing row ID

### Export/Utility
- `exportData(format?)` - Export data (JSON or CSV)
- `refresh()` - Refresh grid
- `scrollToRow(rowId)` - Scroll to specific row
- `scrollToTop()` - Scroll to top
- `scrollToBottom()` - Scroll to bottom

### Grid Information
- `getRowCount()` - Get total row count
- `getColumnCount()` - Get total column count
- `getFilteredRowCount()` - Get filtered row count
- `getSelectedRowCount()` - Get selected row count

## Advanced Example

```tsx
const AdvancedGridExample = () => {
  const gridRef = useRef<RdsCompGridRef>(null);

  const handleComplexOperation = () => {
    if (gridRef.current) {
      // Get current state
      const currentData = gridRef.current.getData();
      const selectedRows = gridRef.current.getSelectedRows();
      
      // Apply complex filtering
      gridRef.current.applyFilter('status', 'Active', 'equals');
      gridRef.current.setSort('name', 'asc');
      
      // Hide some columns
      gridRef.current.setColumnVisibility('id', false);
      gridRef.current.setColumnVisibility('internal', false);
      
      // Export filtered data
      const csvData = gridRef.current.exportData('csv');
      console.log('Exported data:', csvData);
      
      // Get updated info
      console.log('Filtered rows:', gridRef.current.getFilteredRowCount());
      console.log('Visible columns:', gridRef.current.getVisibleColumns());
    }
  };

  return (
    <RdsCompGrid
      ref={gridRef}
      tableHeaders={headers}
      tableData={data}
      enableCheckboxSelection={true}
      enableInlineEdit={true}
      isSort={true}
      isFilter={true}
      // ... other props
    />
  );
};
```

## TypeScript Support

The ref is fully typed with the `RdsCompGridRef` interface, providing excellent IntelliSense support and type safety.

```tsx
const gridRef = useRef<RdsCompGridRef>(null);

// TypeScript will provide autocomplete and type checking
gridRef.current?.addRow({ id: 1, name: 'Test' });
gridRef.current?.applyFilter('name', 'Test', 'contains');
```

This comprehensive ref API makes the RdsCompGrid highly programmable and suitable for complex applications where you need to control the grid state from external components or business logic.
