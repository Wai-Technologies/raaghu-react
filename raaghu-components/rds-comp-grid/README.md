# RdsCompRdsCompGrid

A powerful data grid component built with Microsoft Fluent UI, featuring advanced sorting, filtering, resizing, and selection capabilities.

## Features

- ✅ **Sorting** - Column-based sorting with visual indicators
- ✅ **Filtering** - Built-in filtering with search functionality
- ✅ **Resizing** - Resizable columns with visual handles
- ✅ **Selection** - Checkbox and radio button selection modes
- ✅ **Actions** - Configurable row actions (dropdown or buttons)
- ✅ **Pagination** - Built-in pagination support
- ✅ **Theming** - Light and dark theme support
- ✅ **Responsive** - Mobile-friendly responsive design
- ✅ **Accessibility** - Full keyboard navigation and screen reader support

## Installation

The component is already included in the design system. Make sure you have the required Fluent UI dependencies:

```bash
npm install @fluentui/react-components @fluentui-contrib/react-data-grid-react-window
```

## Basic Usage

```tsx
import { RdsCompRdsCompGrid, RdsCompGridColumn } from '@waiin/raaghu-react';

const columns: RdsCompGridColumn[] = [
  {
    key: 'id',
    name: 'ID',
    isSort: true,
    isFilter: true,
    isResizable: true,
    minWidth: 80,
  },
  {
    key: 'name',
    name: 'Name',
    isSort: true,
    isFilter: true,
    isResizable: true,
    minWidth: 150,
    isBold: true,
  },
];

const data = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
];

<RdsCompRdsCompGrid
  tableHeaders={columns}
  tableData={data}
  isSort={true}
  isFilter={true}
  isResizable={true}
/>
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tableHeaders` | `RdsCompGridColumn[]` | - | Column definitions |
| `tableData` | `any[]` | - | Data to display |
| `isSort` | `boolean` | `true` | Enable sorting |
| `isFilter` | `boolean` | `true` | Enable filtering |
| `isResizable` | `boolean` | `true` | Enable column resizing |

### Selection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableCheckboxSelection` | `boolean` | `false` | Enable checkbox selection |
| `enableRadioButtonSelection` | `boolean` | `false` | Enable radio selection |

### UI Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHeader` | `boolean` | `true` | Show header with search |
| `showSubHeader` | `boolean` | `true` | Show subheader |
| `theme` | `'light' \| 'dark'` | `'light'` | Theme variant |
| `state` | `State` | `State.Default` | Initial state |

### Action Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `RdsCompGridAction[]` | `[]` | Row actions |
| `actionPosition` | `ActionPosition` | `ActionPosition.Right` | Action position |
| `actionColumnStyle` | `ActionColumnStyle` | `ActionColumnStyle.ShowDots` | Action style |

### Pagination Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pagination` | `boolean` | `false` | Enable pagination |
| `recordsPerPage` | `number` | `10` | Records per page |
| `totalRecords` | `number` | - | Total records count |

### Callback Props

| Prop | Type | Description |
|------|------|-------------|
| `onRowSelect` | `(data: any) => void` | Row selection callback |
| `onActionSelection` | `(rowData: any, actionId: string) => void` | Action selection callback |
| `onPaginationHandler` | `(page: number, recordsPerPage: number) => void` | Pagination callback |
| `onSortChange` | `(sortState: TableSortState) => void` | Sort change callback |
| `onFilterChange` | `(filterState: TableFilterState) => void` | Filter change callback |

## Column Definition

```tsx
interface RdsCompGridColumn {
  key: string;                    // Unique column key
  name: string;                   // Display name
  dataType?: string;              // Data type (string, number, date)
  isSort?: boolean;               // Enable sorting
  isFilter?: boolean;             // Enable filtering
  isResizable?: boolean;          // Enable resizing
  minWidth?: number;              // Minimum column width
  maxWidth?: number;              // Maximum column width
  isBold?: boolean;               // Bold text
  required?: boolean;             // Required field indicator
  disabled?: boolean;             // Disabled state
}
```

## Action Definition

```tsx
interface RdsCompGridAction {
  id: string;                     // Unique action ID
  displayName: string;            // Display name
  offId?: string;                 // Optional off ID
  modalId?: string;               // Optional modal ID
}
```

## Examples

### Basic Grid with Sorting and Filtering

```tsx
<RdsCompRdsCompGrid
  tableHeaders={columns}
  tableData={data}
  isSort={true}
  isFilter={true}
  isResizable={true}
/>
```

### Grid with Checkbox Selection

```tsx
<RdsCompRdsCompGrid
  tableHeaders={columns}
  tableData={data}
  enableCheckboxSelection={true}
  onRowSelect={(rowData) => console.log('Selected:', rowData)}
/>
```

### Grid with Actions

```tsx
const actions = [
  { id: 'edit', displayName: 'Edit' },
  { id: 'delete', displayName: 'Delete' },
];

<RdsCompRdsCompGrid
  tableHeaders={columns}
  tableData={data}
  actions={actions}
  actionColumnStyle={ActionColumnStyle.ShowButtonsDirectly}
  onActionSelection={(rowData, actionId) => {
    console.log('Action:', actionId, 'Row:', rowData);
  }}
/>
```

### Grid with Pagination

```tsx
<RdsCompRdsCompGrid
  tableHeaders={columns}
  tableData={data}
  pagination={true}
  recordsPerPage={10}
  totalRecords={100}
  onPaginationHandler={(page, recordsPerPage) => {
    console.log('Page:', page, 'Records:', recordsPerPage);
  }}
/>
```

### Dark Theme Grid

```tsx
<RdsCompRdsCompGrid
  tableHeaders={columns}
  tableData={data}
  theme="dark"
/>
```

## Styling

The component uses CSS custom properties for theming and can be customized with CSS classes:

```scss
.rds-fluent-grid {
  // Custom styles
  border-radius: 8px;
  
  &--dark {
    // Dark theme styles
  }
  
  &--compact {
    // Compact mode styles
  }
}
```

## Accessibility

The component is fully accessible with:
- Keyboard navigation support
- Screen reader compatibility
- ARIA labels and roles
- Focus management
- High contrast support

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Migration from Existing Grid

If you're migrating from the existing `RdsCompGrid`, the main differences are:

1. **Props**: Use `isSort`, `isFilter`, `isResizable` instead of individual column properties
2. **Column Definition**: Use `RdsCompGridColumn` interface
3. **Actions**: Use `RdsCompGridAction` interface
4. **Theming**: Use `theme` prop instead of CSS classes

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure Fluent UI packages are installed
2. **Styling Issues**: Check if CSS custom properties are available
3. **Performance**: Use pagination for large datasets
4. **Selection**: Only one selection mode can be active at a time

### Performance Tips

- Use pagination for datasets > 1000 rows
- Implement virtual scrolling for very large datasets
- Debounce search/filter operations
- Use `React.memo` for row components if custom rendering

## Contributing

When contributing to this component:

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure accessibility compliance
5. Test with both light and dark themes
