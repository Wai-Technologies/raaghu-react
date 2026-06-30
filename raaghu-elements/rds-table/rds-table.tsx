
import React from 'react';
import {
  TableContainer as MuiTableContainer,
  Table as MuiTable,
  TablePagination as MuiTablePagination,
  Paper,
  type TableProps,
} from '@mui/material';
import { TableHeaderRow, TableBodyRows } from './rds-table.helpers';
import type { RdsTableColumn } from './rds-table.helpers';
import './rds-table.scss';

export type { RdsTableColumn };

export interface RdsTableProps extends Omit<TableProps, 'children'> {
  columns: RdsTableColumn[];
  rows: Record<string, unknown>[];
  pagination?: boolean;
  pageSize?: number;
  page?: number;
  totalRows?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  stickyHeader?: boolean;
  selectable?: boolean;
  selectedRows?: string[];
  onRowSelect?: (selectedRows: string[]) => void;
  className?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (columnId: string | undefined, direction: 'asc' | 'desc' | undefined) => void;
  defaultSortBy?: string;
  defaultSortDirection?: 'asc' | 'desc';
}

const RdsTable = ({
  columns,
  rows,
  pagination = false,
  pageSize = 10,
  page = 0,
  totalRows,
  onPageChange,
  onPageSizeChange,
  stickyHeader = false,
  selectable = false,
  selectedRows = [],
  onRowSelect,
  className = '',
  sortBy: controlledSortBy,
  sortDirection: controlledSortDirection,
  onSortChange,
  defaultSortBy,
  defaultSortDirection = 'asc',
  ...props
}: RdsTableProps) => {
  const [internalSelectedRows, setInternalSelectedRows] = React.useState<string[]>([]);
  const currentSelectedRows = onRowSelect ? selectedRows : internalSelectedRows;
  const handleRowSelection = onRowSelect || setInternalSelectedRows;

  const [cellCheckboxSelected, setCellCheckboxSelected] = React.useState<Set<string | number>>(new Set());
  const [cellRadioSelected, setCellRadioSelected] = React.useState<string | number | null>(null);
  const [internalPage, setInternalPage] = React.useState(0);
  const [internalPageSize, setInternalPageSize] = React.useState(10);

  const [internalSortBy, setInternalSortBy] = React.useState<string | undefined>(defaultSortBy);
  const [internalSortDirection, setInternalSortDirection] = React.useState<'asc' | 'desc' | undefined>(
    defaultSortBy ? defaultSortDirection : undefined
  );
  const sortBy = controlledSortBy !== undefined ? controlledSortBy : internalSortBy;
  const sortDirection = controlledSortDirection !== undefined ? controlledSortDirection : internalSortDirection;

  const handleSort = (column: RdsTableColumn) => {
    if (column.type === 'checkbox' || column.type === 'radio') return;
    if (!column.sortable) return;
    const nextDirection: 'asc' | 'desc' = sortBy !== column.id ? 'asc' : sortDirection === 'asc' ? 'desc' : 'asc';
    if (onSortChange) onSortChange(column.id, nextDirection);
    else {
      setInternalSortBy(column.id);
      setInternalSortDirection(nextDirection);
    }
  };

  const sortedRows = React.useMemo(() => {
    if (!sortBy || !sortDirection) return rows;
    const column = columns.find((c) => c.id === sortBy);
    if (!column) return rows;
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    const getValue = (row: Record<string, unknown>) => {
      const v = row[sortBy];
      if (v === null || v === undefined) return '';
      if (typeof v === 'number') return v;
      if (typeof v === 'string') return v;
      try {
        return JSON.stringify(v);
      } catch {
        return String(v);
      }
    };
    return [...rows].sort((a, b) => {
      const va = getValue(a);
      const vb = getValue(b);
      const cmp =
        typeof va === 'number' && typeof vb === 'number' ? va - vb : collator.compare(String(va), String(vb));
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }, [rows, sortBy, sortDirection, columns]);

  const toggleCellCheckbox = (rowId: string | number) => {
    setCellCheckboxSelected((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) next.delete(rowId);
      else next.add(rowId);
      return next;
    });
  };

  const selectCellRadio = (rowId: string | number) => {
    setCellRadioSelected(rowId);
  };

  const checkboxRowIds = React.useMemo<(string | number)[]>(
    () => rows.map((r) => r['id'] ?? r['key']).filter((id: unknown) => id !== undefined) as (string | number)[],
    [rows]
  );
  const isAllCellCheckboxSelected =
    checkboxRowIds.length > 0 && checkboxRowIds.every((id) => cellCheckboxSelected.has(id));
  const isCellCheckboxIndeterminate = cellCheckboxSelected.size > 0 && !isAllCellCheckboxSelected;

  const handleChangePage = (_event: unknown, newPage: number) => {
    setInternalPage(newPage);
    onPageChange?.(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number.parseInt(event.target.value, 10);
    setInternalPageSize(newSize);
    setInternalPage(0);
    onPageSizeChange?.(newSize);
    onPageChange?.(0);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      handleRowSelection(rows.map((row) => (row['id'] || row['key']) as string));
    } else {
      handleRowSelection([]);
    }
  };

  const handleSelectRow = (rowId: string) => {
    const newSelected = currentSelectedRows.includes(rowId)
      ? currentSelectedRows.filter((id) => id !== rowId)
      : [...currentSelectedRows, rowId];
    handleRowSelection(newSelected);
  };

  const isAllSelected = selectable && currentSelectedRows.length === rows.length && rows.length > 0;
  const isIndeterminate = selectable && currentSelectedRows.length > 0 && currentSelectedRows.length < rows.length;
  const displayRows = pagination
    ? sortedRows.slice(internalPage * internalPageSize, (internalPage + 1) * internalPageSize)
    : sortedRows;

  return (
    <Paper className={`rds-table ${className}`}>
      <MuiTableContainer
        className={`rds-table__container ${stickyHeader ? 'rds-table__container--sticky' : ''}`}
        style={{ maxHeight: stickyHeader ? 440 : undefined }}
      >
        <MuiTable stickyHeader={stickyHeader} className="rds-table__table" {...props}>
          <TableHeaderRow
            columns={columns}
            selectable={selectable}
            isIndeterminate={isIndeterminate}
            isAllSelected={isAllSelected}
            handleSelectAll={handleSelectAll}
            sortBy={sortBy}
            sortDirection={sortDirection}
            handleSort={handleSort}
            isCellCheckboxIndeterminate={isCellCheckboxIndeterminate}
            isAllCellCheckboxSelected={isAllCellCheckboxSelected}
            checkboxRowIds={checkboxRowIds}
            setCellCheckboxSelected={setCellCheckboxSelected}
          />
          <TableBodyRows
            rows={displayRows}
            columns={columns}
            selectable={selectable}
            currentSelectedRows={currentSelectedRows}
            handleSelectRow={handleSelectRow}
            cellCheckboxSelected={cellCheckboxSelected}
            cellRadioSelected={cellRadioSelected}
            toggleCellCheckbox={toggleCellCheckbox}
            selectCellRadio={selectCellRadio}
          />
        </MuiTable>
      </MuiTableContainer>
      {pagination && (
        <MuiTablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows || rows.length}
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
