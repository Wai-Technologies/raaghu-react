import { isValidEmail } from '../../utils/id';
import type {
  RdsCompGridColumn,
  GridRow,
  FilterState,
  FilterCondition,
  FilterApiRequest,
} from './rds-comp-grid';

export function isNumericDataType(dataType: string): boolean {
  const dt = dataType.toLowerCase();
  return dt === 'number' || dt === 'numeric' || dt === 'int' || dt === 'float' || dt === 'decimal';
}

export function isDateDataType(dataType: string): boolean {
  const dt = dataType.toLowerCase();
  return dt === 'date' || dt === 'datetime' || dt === 'timestamp';
}

export function getColumnDataType(headers: RdsCompGridColumn[], columnKey: string): string {
  return headers.find((h) => h.key === columnKey)?.dataType?.toLowerCase() || 'string';
}

export function rowMatchesFilter(
  cellValue: unknown,
  filterValue: string,
  operator: FilterState[string]['operator'],
  dataType: string
): boolean {
  switch (operator) {
    case 'contains':
      return cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase()) ?? false;
    case 'notContains':
      return !cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
    case 'equals':
      if (isNumericDataType(dataType)) {
        return Number.parseFloat(String(cellValue)) === Number.parseFloat(filterValue);
      }
      if (isDateDataType(dataType)) {
        return new Date(String(cellValue)).toDateString() === new Date(filterValue).toDateString();
      }
      return cellValue?.toString().toLowerCase() === filterValue.toLowerCase();
    case 'startsWith':
      return cellValue?.toString().toLowerCase().startsWith(filterValue.toLowerCase()) ?? false;
    case 'endsWith':
      return cellValue?.toString().toLowerCase().endsWith(filterValue.toLowerCase()) ?? false;
    case 'greaterThan':
      if (isDateDataType(dataType)) {
        return new Date(String(cellValue)) > new Date(filterValue);
      }
      return Number.parseFloat(String(cellValue)) > Number.parseFloat(filterValue);
    case 'lessThan':
      if (isDateDataType(dataType)) {
        return new Date(String(cellValue)) < new Date(filterValue);
      }
      return Number.parseFloat(String(cellValue)) < Number.parseFloat(filterValue);
    case 'greaterThanOrEqual':
      if (isDateDataType(dataType)) {
        return new Date(String(cellValue)) >= new Date(filterValue);
      }
      return Number.parseFloat(String(cellValue)) >= Number.parseFloat(filterValue);
    case 'lessThanOrEqual':
      if (isDateDataType(dataType)) {
        return new Date(String(cellValue)) <= new Date(filterValue);
      }
      return Number.parseFloat(String(cellValue)) <= Number.parseFloat(filterValue);
    case 'between':
      if (isDateDataType(dataType)) {
        return new Date(String(cellValue)) >= new Date(filterValue);
      }
      return Number.parseFloat(String(cellValue)) >= Number.parseFloat(filterValue);
    default:
      return cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase()) ?? false;
  }
}

export function applyFilterState(
  data: GridRow[],
  filterState: FilterState,
  tableHeaders: RdsCompGridColumn[]
): GridRow[] {
  let filtered = [...data];

  Object.entries(filterState).forEach(([columnKey, filter]) => {
    if (filter.value) {
      const dataType = getColumnDataType(tableHeaders, columnKey);
      filtered = filtered.filter((row) =>
        rowMatchesFilter(row[columnKey], filter.value, filter.operator, dataType)
      );
    }
  });

  return filtered;
}

export function matchesSearch(row: GridRow, searchValue: string): boolean {
  return Object.values(row).some((val) =>
    val?.toString().toLowerCase().includes(searchValue.toLowerCase())
  );
}

export function sortGridData(
  data: GridRow[],
  sortColumn: string,
  sortDirection: 'asc' | 'desc'
): GridRow[] {
  return [...data].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if ((aVal as any) < (bVal as any)) return sortDirection === 'asc' ? -1 : 1;
    if ((aVal as any) > (bVal as any)) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}

export function paginateData(data: GridRow[], currentPage: number, recordsPerPage: number): GridRow[] {
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  return data.slice(startIndex, endIndex);
}

export function validateColumnValue(
  column: RdsCompGridColumn,
  value: unknown,
  rowId: string
): string {
  if (column.required && (!value || value.toString().trim() === '')) {
    return 'This field is required';
  }

  if (value && column.dataType) {
    switch (column.dataType.toLowerCase()) {
      case 'number':
      case 'numeric':
      case 'int':
      case 'float':
      case 'decimal':
        if (Number.isNaN(Number(value))) {
          return 'Please enter a valid number';
        }
        break;
      case 'email':
        if (!isValidEmail(String(value))) {
          return 'Please enter a valid email address';
        }
        break;
      case 'url':
        try {
          new URL(String(value));
        } catch {
          return 'Please enter a valid URL';
        }
        break;
    }
  }

  if (column.validateCell) {
    const customError = column.validateCell(value, { id: rowId });
    if (customError) {
      return customError;
    }
  }

  return '';
}

export function processColumnValue(column: RdsCompGridColumn, value: unknown): unknown {
  if (!column.dataType) {
    return value;
  }

  switch (column.dataType.toLowerCase()) {
    case 'number':
    case 'numeric':
    case 'int':
    case 'float':
    case 'decimal':
      return Number(value);
    case 'boolean':
      return Boolean(value);
    default:
      return String(value);
  }
}

export function parseRowIndexFromId(rowId: string): number | null {
  if (!rowId.startsWith('row-')) {
    return null;
  }
  return Number.parseInt(rowId.slice(4), 10);
}

export function findRowIndexInData(currentData: GridRow[], rowId: string): number {
  const parsedIndex = parseRowIndexFromId(rowId);
  if (parsedIndex !== null) {
    return parsedIndex;
  }
  return currentData.findIndex(
    (row, index) => (row.id || index.toString()) === rowId || `row-${index}` === rowId
  );
}

export function updateRowColumnInData(
  currentData: GridRow[],
  rowId: string,
  columnKey: string,
  processedValue: unknown
): GridRow[] {
  return currentData.map((row, index) => {
    const rowIdToCheck = row.id || index.toString();

    if (rowId.startsWith('row-')) {
      const rowIndex = parseRowIndexFromId(rowId);
      if (index === rowIndex) {
        return { ...row, [columnKey]: processedValue };
      }
    } else if (rowIdToCheck === rowId) {
      return { ...row, [columnKey]: processedValue };
    }
    return row;
  });
}

export function buildActiveFilters(
  filterState: FilterState,
  tableHeaders: RdsCompGridColumn[]
): FilterCondition[] {
  return Object.entries(filterState)
    .filter(([_, filter]) => filter.value && filter.value.trim() !== '')
    .map(([columnKey, filter]) => {
      const column = tableHeaders.find((h) => h.key === columnKey);
      return {
        columnKey,
        columnName: column?.name || columnKey,
        dataType: column?.dataType || 'string',
        operator: filter.operator,
        value: filter.value,
        id: `${columnKey}_${Date.now()}`,
      } as FilterCondition;
    });
}

export function buildFilterApiRequest(
  filterState: FilterState,
  tableHeaders: RdsCompGridColumn[],
  sortColumn: string | null,
  sortDirection: 'asc' | 'desc',
  currentPage: number,
  recordsPerPage: number
): FilterApiRequest {
  const activeFilters = buildActiveFilters(filterState, tableHeaders);
  let apiSortDirection: 'ASC' | 'DESC' | undefined;
  if (sortColumn) {
    apiSortDirection = sortDirection === 'asc' ? 'ASC' : 'DESC';
  }

  return {
    filters: activeFilters,
    logicalOperator: 'AND',
    page: currentPage,
    pageSize: recordsPerPage,
    sortBy: sortColumn || undefined,
    sortDirection: apiSortDirection,
  };
}

export function getOperatorsForDataType(dataType: string) {
  switch (dataType?.toLowerCase()) {
    case 'number':
    case 'numeric':
    case 'int':
    case 'float':
    case 'decimal':
      return [
        { value: 'equals', label: 'Equals' },
        { value: 'greaterThan', label: 'Greater Than' },
        { value: 'lessThan', label: 'Less Than' },
        { value: 'greaterThanOrEqual', label: 'Greater Than or Equal' },
        { value: 'lessThanOrEqual', label: 'Less Than or Equal' },
        { value: 'between', label: 'Between' },
      ];
    case 'date':
    case 'datetime':
    case 'timestamp':
      return [
        { value: 'equals', label: 'Equals' },
        { value: 'greaterThan', label: 'After' },
        { value: 'lessThan', label: 'Before' },
        { value: 'greaterThanOrEqual', label: 'On or After' },
        { value: 'lessThanOrEqual', label: 'On or Before' },
        { value: 'between', label: 'Between' },
      ];
    case 'boolean':
      return [{ value: 'equals', label: 'Equals' }];
    default:
      return [
        { value: 'contains', label: 'Contains' },
        { value: 'equals', label: 'Equals' },
        { value: 'startsWith', label: 'Starts With' },
        { value: 'endsWith', label: 'Ends With' },
        { value: 'notContains', label: 'Does Not Contain' },
      ];
  }
}

export function getInputTypeForDataType(dataType: string) {
  switch (dataType?.toLowerCase()) {
    case 'number':
    case 'numeric':
    case 'int':
    case 'float':
    case 'decimal':
      return 'number';
    case 'date':
    case 'datetime':
    case 'timestamp':
      return 'date';
    case 'email':
      return 'email';
    case 'url':
      return 'url';
    default:
      return 'text';
  }
}

export function parseColumnWidth(colWidth: string): number {
  return Number.parseInt(colWidth.replace('px', ''), 10);
}

export const HTML_CELL_SX = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
  color: 'text.primary',
  '& *': {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: 'text.primary',
  },
  '& .status-pill': {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 'var(--rds-border-radius-lg)',
    fontSize: '12px',
    fontWeight: 500,
    textAlign: 'center',
    minWidth: '60px',
    '&.status-qualified': { backgroundColor: 'var(--rds-success-dark)', color: 'var(--rds-neutral-0)' },
    '&.status-negotiation': { backgroundColor: 'var(--rds-semantic-warning-dark)', color: 'var(--rds-neutral-0)' },
    '&.status-unqualified': { backgroundColor: 'var(--rds-error-main)', color: 'var(--rds-neutral-0)' },
    '&.status-proposal': { backgroundColor: 'var(--rds-action-selected)', color: 'var(--rds-text-primary)' },
    '&.status-new': { backgroundColor: 'var(--rds-primary-light)', color: 'var(--rds-neutral-0)' },
    '&.status-renewal': { backgroundColor: 'var(--rds-primary-main)', color: 'common.white' },
  },
  '& .progress-bar': {
    width: '100%',
    height: '8px',
    backgroundColor: 'action.selected',
    borderRadius: 'var(--rds-border-radius-sm)',
    overflow: 'hidden',
    '& .progress-fill': { height: '100%', backgroundColor: 'primary.main', transition: 'width 0.3s ease' },
  },
  '& .verification-icon': {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: 'var(--rds-border-radius-pill)',
    '&.verified': { backgroundColor: 'success.main', color: 'common.white' },
    '&.not-verified': { backgroundColor: 'error.main', color: 'common.white' },
  },
  '& img': {
    maxWidth: '24px',
    maxHeight: '24px',
    borderRadius: 'var(--rds-border-radius-pill)',
    verticalAlign: 'middle',
    marginRight: 'var(--rds-spacing-sm-px)',
  },
  '& .employee-name': { color: 'text.primary', fontWeight: 'bold' },
  '& .employee-title': { color: 'text.secondary' },
  '& .tag': { color: 'text.primary', borderColor: 'divider' },
  '& .badge, & span[class*="badge"], & .chip, & span[class*="chip"]': { color: 'text.primary' },
  '& .last-active': { color: 'text.disabled' },
  '& .online, & .away': { borderColor: 'divider' },
  '& .leadership, & .management, & .strategy, & .planning, & .coordination, & .reporting': {
    color: 'text.primary',
    borderColor: 'transparent',
  },
  '& .senior, & .lead, & .pending, & .active': { color: 'text.primary' },
} as const;
