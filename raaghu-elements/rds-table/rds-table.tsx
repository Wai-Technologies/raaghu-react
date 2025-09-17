
import React from 'react';
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
  IconButton
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import './rds-table.scss';

export interface RdsTableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: any) => string | React.ReactNode;
  type?: 'text' | 'checkbox' | 'radio';
}

export interface RdsTableProps extends Omit<TableProps, 'children'> {
  columns: RdsTableColumn[];
  rows: any[];
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
  onRowAction?: (action: string, rowId: string) => void;
  className?: string;
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
  onRowAction,
  className = '',
  ...props
}: RdsTableProps) => {
  // Internal state for row selection when not controlled externally
  const [internalSelectedRows, setInternalSelectedRows] = React.useState<string[]>([]);

  // Use controlled or internal selection state
  const currentSelectedRows = onRowSelect ? selectedRows : internalSelectedRows;
  const handleRowSelection = onRowSelect || setInternalSelectedRows;

  // Internal cell-level states for independent checkbox and radio columns
  const [cellCheckboxSelected, setCellCheckboxSelected] = React.useState<Set<string | number>>(new Set());
  const [cellRadioSelected, setCellRadioSelected] = React.useState<string | number | null>(null);

  const toggleCellCheckbox = (rowId: string) => {
    setCellCheckboxSelected(prev => {
      const next = new Set(prev);
      if (next.has(rowId)) next.delete(rowId); else next.add(rowId);
      return next;
    });
  };

  const selectCellRadio = (rowId: string) => {
    setCellRadioSelected(rowId);
  };

  // For header checkbox (in checkbox-type column): compute row ids and selection state
  const checkboxRowIds = React.useMemo<(string | number)[]>(
    () => rows.map((r: any) => (r.id ?? r.key)).filter((id: unknown) => id !== undefined) as (string | number)[],
    [rows]
  );
  const isAllCellCheckboxSelected = checkboxRowIds.length > 0 && checkboxRowIds.every((id) => cellCheckboxSelected.has(id));
  const isCellCheckboxIndeterminate = cellCheckboxSelected.size > 0 && !isAllCellCheckboxSelected;
  const handleChangePage = (event: unknown, newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onPageSizeChange) {
      onPageSizeChange(parseInt(event.target.value, 10));
    }
    if (onPageChange) {
      onPageChange(0);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allRowIds = rows.map((row) => row.id || row.key);
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

  const renderCellContent = (column: RdsTableColumn, value: any, row: any) => {
    switch (column.type) {
      case 'checkbox': {
        const rowId = row.id || row.key;
        const isChecked = cellCheckboxSelected.has(rowId);
        return (
          <Checkbox
            checked={isChecked}
            onChange={() => toggleCellCheckbox(rowId)}
            size="small"
          />
        );
      }
      case 'radio': {
        const rowId = row.id || row.key;
        const isChecked = cellRadioSelected === rowId;
        return (
          <Radio
            checked={isChecked}
            onChange={() => selectCellRadio(rowId)}
            size="small"
          />
        );
      }
      default:
        return column.format ? column.format(value) : value;
    }
  };

  const isAllSelected = selectable && currentSelectedRows.length === rows.length && rows.length > 0;
  const isIndeterminate = selectable && currentSelectedRows.length > 0 && currentSelectedRows.length < rows.length;

  return (
    <Paper className={`rds-table ${className}`}>
      <MuiTableContainer
        className={`rds-table__container ${stickyHeader ? 'rds-table__container--sticky' : ''}`}
        style={{ maxHeight: stickyHeader ? 440 : undefined }}
      >
        <MuiTable stickyHeader={stickyHeader} className="rds-table__table" {...props}>
          <MuiTableHead className="rds-table__head">
            <MuiTableRow className="rds-table__header-row">
              {selectable && (
                <MuiTableCell padding="checkbox" className="rds-table__header rds-table__header--checkbox">
                  <Checkbox
                    indeterminate={isIndeterminate}
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    size="small"
                  />
                </MuiTableCell>
              )}
              {columns.map((column) => (
                <MuiTableCell
                  key={column.id}
                  align={column.align}
                  style={{ 
                    minWidth: column.minWidth,
                    width: column.minWidth 
                  }}
                  className="rds-table__header"
                >
                  {column.type === 'checkbox' ? (
                    <Checkbox
                      indeterminate={isCellCheckboxIndeterminate}
                      checked={isAllCellCheckboxSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCellCheckboxSelected(new Set(checkboxRowIds));
                        } else {
                          setCellCheckboxSelected(new Set());
                        }
                      }}
                      size="small"
                    />
                  ) : (
                    <div className="rds-table__header-content">
                      <span className="rds-table__header-label">{column.label}</span>
                      <IconButton size="small" className="rds-table__sort-button">
                        <SwapVertIcon className="rds-table__sort-icon" fontSize="small" />
                      </IconButton>
                    </div>
                  )}
                </MuiTableCell>
              ))}
            </MuiTableRow>
          </MuiTableHead>
          <MuiTableBody className="rds-table__body">
            {rows.map((row, index) => {
              const isSelected = currentSelectedRows.includes(row.id || row.key);
              return (
                <MuiTableRow 
                  hover 
                  key={row.id || row.key || index}
                  selected={isSelected}
                  className={`rds-table__row ${isSelected ? 'rds-table__row--selected' : ''}`}
                >
                  {selectable && (
                    <MuiTableCell padding="checkbox" className="rds-table__cell rds-table__cell--checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleSelectRow(row.id || row.key)}
                        size="small"
                      />
                    </MuiTableCell>
                  )}
                  {columns.map((column) => {
                    const value = row[column.id];
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
                        {renderCellContent(column, value, row)}
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows || rows.length}
          rowsPerPage={pageSize}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};
RdsTable.displayName = 'RdsTable';
export default RdsTable;
