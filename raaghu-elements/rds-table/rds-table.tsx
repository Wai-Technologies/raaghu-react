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
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import clsx from 'clsx';
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
  key?: string | number;
} & Record<string, ReactNode>;

export interface RdsTableProps extends Omit<TableProps, 'children' | 'component'> {
  columns: RdsTableColumn[];
  rows: RdsTableRow[];
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
  totalRows?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * `'client'` slices `rows` per page; `'server'` renders `rows` as given (the current page)
   * and uses `totalRows` for the count. @default 'client'
   */
  paginationMode?: 'client' | 'server';
  /** Options for the rows-per-page selector. @default [5, 10, 25] */
  rowsPerPageOptions?: number[];
  stickyHeader?: boolean;
  selectable?: boolean;
  /**
   * Selected row ids. With `onRowSelect` the selection is fully controlled by this prop;
   * without it, the prop seeds (and re-syncs) the table's own selection.
   */
  selectedRows?: string[];
  onRowSelect?: (selectedRows: string[]) => void;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (columnId: string | undefined, direction: 'asc' | 'desc' | undefined) => void;
  defaultSortBy?: string;
  defaultSortDirection?: 'asc' | 'desc';
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
  pagination = false,
  pageSize = 10,
  page = 0,
  totalRows,
  onPageChange,
  onPageSizeChange,
  paginationMode = 'client',
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
  stickyHeader = false,
  selectable = false,
  selectedRows,
  onRowSelect,
  className = '',
  sortBy: controlledSortBy,
  sortDirection: controlledSortDirection,
  onSortChange,
  defaultSortBy,
  defaultSortDirection = 'asc',
  ...props
}: RdsTableProps) => {
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

  // Re-sync internal state when the seeding props change (React 19: derive during render).
  const [prevProps, setPrevProps] = useState({ page, pageSize, selectedRows });
  if (page !== prevProps.page || pageSize !== prevProps.pageSize || !sameIds(selectedRows, prevProps.selectedRows)) {
    const updates: Partial<typeof tableState> = {};
    if (page !== prevProps.page) updates.internalPage = page;
    if (pageSize !== prevProps.pageSize) updates.internalPageSize = pageSize;
    if (selectedRows !== undefined && !sameIds(selectedRows, prevProps.selectedRows)) updates.internalSelectedRows = selectedRows;
    setPrevProps({ page, pageSize, selectedRows });
    updateTableState(updates);
  }

  // With `onRowSelect` the parent owns the selection (as before); otherwise `selectedRows` only seeds it.
  const currentSelectedRows = onRowSelect ? (selectedRows ?? EMPTY_SELECTED_ROWS) : internalSelectedRows;
  const handleRowSelection = onRowSelect ?? ((nextRows: string[]) => updateTableState({ internalSelectedRows: nextRows }));
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



  const toggleCellCheckbox = (rowId: string) => {
    updateTableState(prev => {
      const next = new Set(prev.cellCheckboxSelected);
      if (next.has(rowId)) next.delete(rowId); else next.add(rowId);
      return { cellCheckboxSelected: next };
    });
  };

  const selectCellRadio = (rowId: string) => {
    updateTableState({ cellRadioSelected: rowId });
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
      handleRowSelection(allRowIds);
    } else {
      handleRowSelection([]);
    }
  };

  const handleSelectRow = (rowId: string) => {
    const newSelected = currentSelectedRows.includes(rowId)
      ? currentSelectedRows.filter(id => id !== rowId)
      : [...currentSelectedRows, rowId];
    handleRowSelection(newSelected);
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
            onChange={() => toggleCellCheckbox(rowId)}
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
            onChange={() => selectCellRadio(rowId)}
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

  const isClientPaged = pagination && paginationMode !== 'server';
  const rowOffset = pagination ? internalPage * internalPageSize : 0;

  const isAllSelected = selectable && currentSelectedRows.length === rows.length && rows.length > 0;
  const isIndeterminate = selectable && currentSelectedRows.length > 0 && currentSelectedRows.length < rows.length;

  return (
    <Paper className={clsx('rds-table', className)}>
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
                          if (e.target.checked) {
                            updateTableState({ cellCheckboxSelected: new Set(checkboxRowIds) });
                          } else {
                            updateTableState({ cellCheckboxSelected: new Set() });
                          }
                        }}
                        size="small"
                        disableRipple
                        slotProps={{ input: { 'aria-label': `Select all ${column.label}` } }}
                      />
                      </div>
                    ) : column.sortable ? (
                      <button
                        type="button"
                        className={clsx(
                          'rds-table__header-content',
                          'rds-table__sort-button',
                          active && 'rds-table__sort-button--active'
                        )}
                        aria-label={active ? `Sort ${column.label} ${sortDirection}` : `Sort ${column.label}`}
                        onClick={() => handleSort(column)}
                      >
                        <span className="rds-table__header-label">{column.label}</span>
                        <SwapVertIcon
                          aria-hidden
                          className={clsx(
                            'rds-table__sort-icon',
                            sortDirection === 'desc' && active && 'rds-table__sort-icon--desc'
                          )}
                          fontSize="small"
                        />
                      </button>
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
                        onChange={() => handleSelectRow(rowId)}
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
      {pagination && (
        <MuiTablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={paginationMode === 'server' ? (totalRows ?? rows.length) : (totalRows || rows.length)}
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
