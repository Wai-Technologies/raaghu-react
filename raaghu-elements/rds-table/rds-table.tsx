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
  TableProps
} from '@mui/material';

export interface RdsTableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: any) => string;
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
}

const RdsTable: React.FC<RdsTableProps> = ({
  columns,
  rows,
  pagination = false,
  pageSize = 10,
  page = 0,
  totalRows,
  onPageChange,
  onPageSizeChange,
  stickyHeader = false,
  ...props
}) => {
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

  return (
    <Paper>
      <MuiTableContainer>
        <MuiTable stickyHeader={stickyHeader} {...props}>
          <MuiTableHead>
            <MuiTableRow>
              {columns.map((column) => (
                <MuiTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </MuiTableCell>
              ))}
            </MuiTableRow>
          </MuiTableHead>
          <MuiTableBody>
            {rows.map((row, index) => (
              <MuiTableRow hover key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <MuiTableCell key={column.id} align={column.align}>
                      {column.format ? column.format(value) : value}
                    </MuiTableCell>
                  );
                })}
              </MuiTableRow>
            ))}
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

export default RdsTable;
