import { isValidElement, useMemo, useState, type ChangeEvent, type ReactNode } from 'react';
import {
  TableContainer as MuiTableContainer,
  Table as MuiTable,
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  TablePagination as MuiTablePagination,
  Paper,
  type TableProps,
  Checkbox,
  Radio,
  TableSortLabel,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import clsx from 'clsx';
import { invokeValueFirstOnChange, warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-table.scss';

const DEFAULT_ROWS_PER_PAGE_OPTIONS = [5, 10, 25];
const EMPTY_SELECTED_ROWS: string[] = [];

function sameIds(a: string[] | undefined, b: string[] | undefined): boolean {
  if (a === b) return true;
  if (!a || !b || a.length !== b.length) return false;
  return a.every((id, i) => id === b[i]);
}

function getRowId(row: { id?: string | number; key?: string | number }, index: number): string {
  return String(row.id ?? row.key ?? index);
}

export interface RdsTableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: ReactNode) => string | ReactNode;
  type?: 'text' | 'checkbox' | 'radio';
  sortable?: boolean;
}

type RdsTableRow = {
  id?: string | number;
  /** @deprecated Use `id` instead. */
  key?: string | number;
} & Record<string, ReactNode>;

export interface RdsTableProps extends Omit<TableProps, 'children' | 'component'> {
  columns: RdsTableColumn[];
  rows: RdsTableRow[];
  /** Shows the paginator. @default false */
  paginated?: boolean;
  /** @deprecated Use `paginated` instead. */
  pagination?: boolean;
  /**
   * Rows per page. Used as the initial value and re-applied whenever it changes;
   * user paging still updates the table internally. @default 10
   */
  pageSize?: number;
  /**
   * Zero-based page index. Used as the initial value and re-applied whenever it changes;
   * user paging still updates the table internally. @default 0
   */
  page?: number;
  /** Total row count shown by the paginator (needed for `paginationMode="server"`). */
  rowCount?: number;
  /** @deprecated Use `rowCount` instead. */
  totalRows?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * `'client'` slices `rows` per page; `'server'` renders `rows` as given (the current page)
   * and uses `rowCount` for the count. @default 'client'
   */
  paginationMode?: 'client' | 'server';
  /** Options for the rows-per-page selector. @default [5, 10, 25] */
  rowsPerPageOptions?: number[];
  stickyHeader?: boolean;
  selectable?: boolean;
  /** Controlled selected row ids. */
  selected?: string[];
  /**
   * Value-first selection handler (canonical for custom Raaghu controls).
   * Signature: `(ids, event) => void` — prefer reading `ids`.
   */
  onSelectionChange?: (ids: string[], event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * @deprecated Use `selected` instead.
   * Selected row ids. With `onRowSelect` the selection is fully controlled by this prop;
   * without it, the prop seeds (and re-syncs) the table's own selection.
   */
  selectedRows?: string[];
  /** @deprecated Use `onSelectionChange` instead. */
  onRowSelect?: (selectedRows: string[]) => void;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (columnId: string | undefined, direction: 'asc' | 'desc' | undefined) => void;
  defaultSortBy?: string;
  defaultSortDirection?: 'asc' | 'desc';
  /**
   * Value-first handler when per-column checkbox/radio cell selection changes.
   * Signature: `(selection, event) => void` — prefer reading `selection`.
   */
  onCellSelectionChange?: (
    selection: { checkbox: string[]; radio: string | null },
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
}

/**
 * RdsTable is a simple data table (MUI Table) with optional client/server pagination,
 * row selection, per-column checkbox/radio cells and single-column sorting.
 * For heavy use (large data sets, virtualization, column resizing, filtering, editing)
 * prefer MUI X DataGrid instead.
 */
const RdsTable = ({
  columns,
  rows,
  paginated,
  pagination,
  pageSize = 10,
  page = 0,
  rowCount,
  totalRows,
  onPageChange,
  onPageSizeChange,
  paginationMode = 'client',
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
  stickyHeader = false,
  selectable = false,
  selected,
  onSelectionChange,
  selectedRows,
  onRowSelect,
  className = '',
  sortBy: controlledSortBy,
  sortDirection: controlledSortDirection,
  onSortChange,
  defaultSortBy,
  defaultSortDirection = 'asc',
  onCellSelectionChange,
  'data-testid': dataTestId,
  ...props
}: RdsTableProps) => {
  if (pagination !== undefined) warnDeprecatedProp('RdsTable', 'pagination', '`paginated`');
  if (totalRows !== undefined) warnDeprecatedProp('RdsTable', 'totalRows', '`rowCount`');
  if (selectedRows !== undefined) warnDeprecatedProp('RdsTable', 'selectedRows', '`selected`');
  if (onRowSelect !== undefined) warnDeprecatedProp('RdsTable', 'onRowSelect', '`onSelectionChange`');
  if (rows.some((row) => row.key !== undefined)) warnDeprecatedProp('RdsTable', 'rows[].key', '`rows[].id`');
  const isPaginated = paginated ?? pagination ?? false;
  const resolvedRowCount = rowCount ?? totalRows;
  const [tableState, setTableState] = useState({
    internalSelectedRows: selectedRows ?? ([] as string[]),
    cellCheckboxSelected: new Set<string>(),
    cellRadioSelected: null as string | null,
    internalPage: page,
    internalPageSize: pageSize,
    internalSortBy: defaultSortBy as string | undefined,
    internalSortDirection: (defaultSortBy ? defaultSortDirection : undefined) as 'asc' | 'desc' | undefined,
  });
  const {
    internalSelectedRows,
    cellCheckboxSelected,
    cellRadioSelected,
    internalPage,
    internalPageSize,
    internalSortBy,
    internalSortDirection,
  } = tableState;
  const updateTableState = (updates: Partial<typeof tableState> | ((prev: typeof tableState) => Partial<typeof tableState>)) => {
    setTableState((prev) => ({
      ...prev,
      ...(typeof updates === 'function' ? updates(prev) : updates),
    }));
  };

  const [prevProps, setPrevProps] = useState({ page, pageSize, selectedRows });
  if (page !== prevProps.page || pageSize !== prevProps.pageSize || !sameIds(selectedRows, prevProps.selectedRows)) {
    const updates: Partial<typeof tableState> = {};
    if (page !== prevProps.page) updates.internalPage = page;
    if (pageSize !== prevProps.pageSize) updates.internalPageSize = pageSize;
    if (selectedRows !== undefined && !sameIds(selectedRows, prevProps.selectedRows)) updates.internalSelectedRows = selectedRows;
    setPrevProps({ page, pageSize, selectedRows });
    updateTableState(updates);
  }

  const controlledSelection = selected ?? (onRowSelect ? (selectedRows ?? EMPTY_SELECTED_ROWS) : undefined);
  const currentSelectedRows = controlledSelection ?? internalSelectedRows;
  const handleRowSelection = (event: ChangeEvent<HTMLInputElement>, nextRows: string[]) => {
    if (controlledSelection === undefined) updateTableState({ internalSelectedRows: nextRows });
    invokeValueFirstOnChange(onSelectionChange, nextRows, event);
    onRowSelect?.(nextRows);
  };
  const sortBy = controlledSortBy !== undefined ? controlledSortBy : internalSortBy;
  const sortDirection = controlledSortDirection !== undefined ? controlledSortDirection : internalSortDirection;

  const handleSort = (column: RdsTableColumn) => {
    if (column.type === 'checkbox' || column.type === 'radio') return;
    if (!column.sortable) return;
    let nextDirection: 'asc' | 'desc';
    const nextColumn: string = column.id;
    if (sortBy !== column.id) {
      nextDirection = 'asc';
    } else {
      nextDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    }
    if (onSortChange) onSortChange(nextColumn, nextDirection); else {
      updateTableState({ internalSortBy: nextColumn, internalSortDirection: nextDirection });
    }
  };

  const sortedRows = useMemo(() => {
    if (!sortBy || !sortDirection) return rows;
    const column = columns.find(c => c.id === sortBy);
    if (!column) return rows;
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    const getValue = (row: RdsTableRow) => {
      const v = row[sortBy];
      if (v === null || v === undefined) return '';
      if (typeof v === 'number') return v;
      if (typeof v === 'string') return v;
      try { return JSON.stringify(v); } catch { return String(v); }
    };
    return rows.toSorted((a, b) => {
      const va = getValue(a);
      const vb = getValue(b);
      let cmp: number;
      if (typeof va === 'number' && typeof vb === 'number') cmp = va - vb; else cmp = collator.compare(String(va), String(vb));
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortBy, sortDirection, columns]);



  const toggleCellCheckbox = (event: ChangeEvent<HTMLInputElement>, rowId: string) => {
    const next = new Set(cellCheckboxSelected);
    if (next.has(rowId)) next.delete(rowId); else next.add(rowId);
    updateTableState({ cellCheckboxSelected: next });
    invokeValueFirstOnChange(
      onCellSelectionChange,
      { checkbox: Array.from(next), radio: cellRadioSelected },
      event,
    );
  };

  const selectCellRadio = (event: ChangeEvent<HTMLInputElement>, rowId: string) => {
    updateTableState({ cellRadioSelected: rowId });
    invokeValueFirstOnChange(
      onCellSelectionChange,
      { checkbox: Array.from(cellCheckboxSelected), radio: rowId },
      event,
    );
  };

  const checkboxRowIds = useMemo<string[]>(
    () => rows.map((r, index) => getRowId(r, index)),
    [rows]
  );
  const isAllCellCheckboxSelected = checkboxRowIds.length > 0 && checkboxRowIds.every((id) => cellCheckboxSelected.has(id));
  const isCellCheckboxIndeterminate = cellCheckboxSelected.size > 0 && !isAllCellCheckboxSelected;
  const handleChangePage = (event: unknown, newPage: number) => {
    updateTableState({ internalPage: newPage });
    if (onPageChange) onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    updateTableState({ internalPageSize: newSize, internalPage: 0 });
    if (onPageSizeChange) onPageSizeChange(newSize);
    if (onPageChange) onPageChange(0);
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allRowIds = rows.map((row, index) => getRowId(row, index));
      handleRowSelection(event, allRowIds);
    } else {
      handleRowSelection(event, []);
    }
  };

  const handleSelectRow = (event: ChangeEvent<HTMLInputElement>, rowId: string) => {
    const newSelected = currentSelectedRows.includes(rowId)
      ? currentSelectedRows.filter(id => id !== rowId)
      : [...currentSelectedRows, rowId];
    handleRowSelection(event, newSelected);
  };

  const renderCellContent = (column: RdsTableColumn, value: ReactNode, row: RdsTableRow, rowIndex: number, rowNumber: number): ReactNode => {
    switch (column.type) {
      case 'checkbox': {
        const rowId = getRowId(row, rowIndex);
        const isChecked = cellCheckboxSelected.has(rowId);
        return (
          <div className="rds-table__checkbox">
          <Checkbox
            checked={isChecked}
            onChange={(event) => toggleCellCheckbox(event, rowId)}
            size="small"
            disableRipple
            slotProps={{ input: { 'aria-label': `Select ${column.label} for row ${rowNumber}` } }}
          />
          </div>
        );
      }
      case 'radio': {
        const rowId = getRowId(row, rowIndex);
        const isChecked = cellRadioSelected === rowId;
        return (
          <Radio
            checked={isChecked}
            onChange={(event) => selectCellRadio(event, rowId)}
            size="small"
            disableRipple
            slotProps={{ input: { 'aria-label': `Select ${column.label} for row ${rowNumber}` } }}
          />
        );
      }
      default:
        if (column.format) return column.format(value);
        if (typeof value === 'string' || typeof value === 'number' || isValidElement(value)) return value;
        return value == null ? '' : String(value);
    }
  };

  const isClientPaged = isPaginated && paginationMode !== 'server';
  const rowOffset = isPaginated ? internalPage * internalPageSize : 0;

  const isAllSelected = selectable && currentSelectedRows.length === rows.length && rows.length > 0;
  const isIndeterminate = selectable && currentSelectedRows.length > 0 && currentSelectedRows.length < rows.length;

  return (
    <Paper className={clsx('rds-table', className)} data-testid={dataTestId}>
      <MuiTableContainer
          className={clsx('rds-table__container', stickyHeader && 'rds-table__container--sticky')}
        style={{ maxHeight: stickyHeader ? 440 : undefined }}
      >
        <MuiTable stickyHeader={stickyHeader} className="rds-table__table" {...props}>
          <MuiTableHead className="rds-table__head">
            <MuiTableRow className="rds-table__header-row">
              {selectable && (
                <MuiTableCell padding="checkbox" className="rds-table__header rds-table__header--checkbox rds-table__checkbox">
                  <Checkbox
                    indeterminate={isIndeterminate}
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    size="small"
                    disableRipple
                    slotProps={{ input: { 'aria-label': 'Select all rows' } }}
                  />
                </MuiTableCell>
              )}
              {columns.map((column) => {
                const active = sortBy === column.id && !!sortDirection;
                return (
                  <MuiTableCell
                    key={column.id}
                    align={column.align}
                    style={{ 
                      minWidth: column.minWidth,
                      width: column.minWidth 
                    }}
                    className={clsx(
                      'rds-table__header',
                      column.sortable && 'rds-table__header--sortable',
                      active && 'rds-table__header--sorted',
                    )}
                    aria-sort={active ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined}
                  >
                    {column.type === 'checkbox' ? (
                      <div className="rds-table__checkbox">
                      <Checkbox
                        indeterminate={isCellCheckboxIndeterminate}
                        checked={isAllCellCheckboxSelected}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? new Set(checkboxRowIds)
                            : new Set<string>();
                          updateTableState({ cellCheckboxSelected: next });
                          invokeValueFirstOnChange(
                            onCellSelectionChange,
                            { checkbox: Array.from(next), radio: cellRadioSelected },
                            e,
                          );
                        }}
                        size="small"
                        disableRipple
                        slotProps={{ input: { 'aria-label': `Select all ${column.label}` } }}
                      />
                      </div>
                    ) : column.sortable ? (
                      <TableSortLabel
                        component="button"
                        type="button"
                        active={active}
                        direction={active ? sortDirection ?? 'asc' : 'asc'}
                        onClick={() => handleSort(column)}
                        className={clsx(
                          'rds-table__header-content',
                          'rds-table__sort-button',
                          active && 'rds-table__sort-button--active'
                        )}
                        IconComponent={(iconProps) => (
                          <SwapVertIcon
                            {...iconProps}
                            aria-hidden
                            className={clsx(
                              iconProps.className,
                              'rds-table__sort-icon',
                              sortDirection === 'desc' && active && 'rds-table__sort-icon--desc'
                            )}
                            fontSize="small"
                          />
                        )}
                        aria-label={active ? `Sort ${column.label} ${sortDirection}` : `Sort ${column.label}`}
                      >
                        <span className="rds-table__header-label">{column.label}</span>
                      </TableSortLabel>
                    ) : (
                      <div>
                        <span className="rds-table__header-label">{column.label}</span>
                      </div>
                    )}
                  </MuiTableCell>
                );
              })}
            </MuiTableRow>
          </MuiTableHead>
          <MuiTableBody className="rds-table__body">
            {(isClientPaged ? sortedRows.slice(rowOffset, rowOffset + internalPageSize) : sortedRows).map((row, index) => {
              const rowId = getRowId(row, index);
              const rowNumber = rowOffset + index + 1;
              const isSelected = currentSelectedRows.includes(rowId);
              return (
                <MuiTableRow 
                  hover 
                  key={rowId}
                  selected={isSelected}
                  className={`rds-table__row ${isSelected ? 'rds-table__row--selected' : ''}`}
                >
                  {selectable && (
                    <MuiTableCell padding="checkbox" className="rds-table__cell rds-table__cell--checkbox rds-table__checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => handleSelectRow(event, rowId)}
                        size="small"
                        disableRipple
                        slotProps={{ input: { 'aria-label': `Select row ${rowNumber}` } }}
                      />
                    </MuiTableCell>
                  )}
                  {columns.map((column) => {
                    const value = row[column.id] as ReactNode;
                    const cellClass = `rds-table__cell ${column.type ? `rds-table__cell--${column.type}` : ''}`;
                    return (
                      <MuiTableCell 
                        key={column.id} 
                        align={column.align}
                        style={{ 
                          minWidth: column.minWidth,
                          width: column.minWidth 
                        }}
                        className={cellClass}
                      >
                        {renderCellContent(column, value, row, index, rowNumber) as ReactNode}
                      </MuiTableCell>
                    );
                  })}
                </MuiTableRow>
              );
            })}
          </MuiTableBody>
        </MuiTable>
      </MuiTableContainer>
      {isPaginated && (
        <MuiTablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={paginationMode === 'server' ? (resolvedRowCount ?? rows.length) : (resolvedRowCount || rows.length)}
          rowsPerPage={internalPageSize}
          page={internalPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};
RdsTable.displayName = 'RdsTable';
export default RdsTable;
