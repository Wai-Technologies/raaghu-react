
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
}:RdsTableProps) => {
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
    if (onRowSelect) {
      if (event.target.checked) {
        const allRowIds = rows.map((row) => row.id || row.key);
        onRowSelect(allRowIds);
      } else {
        onRowSelect([]);
      }
    }
  };

  const handleSelectRow = (rowId: string) => {
    if (onRowSelect) {
      const newSelected = selectedRows.includes(rowId)
        ? selectedRows.filter(id => id !== rowId)
        : [...selectedRows, rowId];
      onRowSelect(newSelected);
    }
  };

  const renderCellContent = (column: RdsTableColumn, value: any, row: any) => {
    switch (column.type) {
      case 'checkbox':
        return (
          <Checkbox
            checked={selectedRows.includes(row.id || row.key)}
            onChange={() => handleSelectRow(row.id || row.key)}
            size="small"
          />
        );
      case 'radio':
        return (
          <Radio
            checked={false}
            size="small"
          />
        );
      default:
        return column.format ? column.format(value) : value;
    }
  };

  const isAllSelected = selectable && selectedRows.length === rows.length && rows.length > 0;
  const isIndeterminate = selectable && selectedRows.length > 0 && selectedRows.length < rows.length;

  return (
    <Paper className={`rds-table ${className}`}>
      <MuiTableContainer className="rds-table__container">
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
                  style={{ minWidth: column.minWidth }}
                  className="rds-table__header"
                >
                  {column.type === 'checkbox' ? (
                    <Checkbox size="small" />
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
              const isSelected = selectedRows.includes(row.id || row.key);
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
