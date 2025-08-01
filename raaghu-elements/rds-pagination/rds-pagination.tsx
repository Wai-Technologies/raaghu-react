

import React, { useState } from 'react';
import { Pagination as MuiPagination, PaginationProps, Select, MenuItem, Box, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import './rds-pagination.scss';


export interface RdsPaginationProps extends PaginationProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  showFirstLast?: boolean;
  pageSizeOptions?: number[];
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  showRecordsPerPage?: boolean;
}


const RdsPagination: React.FC<RdsPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  showFirstLast = true,
  count,
  page,
  onChange,
  pageSizeOptions = [10, 50, 100, 500],
  pageSize: pageSizeProp,
  showRecordsPerPage = false,
  onPageSizeChange,
  ...props
}) => {
  // Local state fallback for page size if not controlled
  const [localPageSize, setLocalPageSize] = useState(pageSizeProp || pageSizeOptions[0]);
  const pageSize = pageSizeProp !== undefined ? pageSizeProp : localPageSize;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (onPageChange) {
      onPageChange(value);
    }
    if (onChange) {
      onChange(event, value);
    }
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newSize = Number(event.target.value);
    if (onPageSizeChange) {
      onPageSizeChange(newSize);
    } else {
      setLocalPageSize(newSize);
    }
  };


  // If count is number of pages, use it directly. If it's number of records, calculate pages.
  let totalPagesCalc = 1;
  if (typeof count === 'number' && count > 1 && (!totalPages || totalPages < 2)) {
    // count is likely number of pages
    totalPagesCalc = count;
  } else {
    // count is likely number of records
    const totalRecords = count || totalPages || 1;
    totalPagesCalc = Math.ceil(totalRecords / pageSize);
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
      <MuiPagination
        className="rds-pagination"
        count={totalPagesCalc}
        page={page || currentPage}
        onChange={handleChange}
        showFirstButton={showFirstLast}
        showLastButton={showFirstLast}
        {...props}
      />
      { showRecordsPerPage && (
      <FormControl size="small" sx={{ minWidth: 100 }}>
        <InputLabel id="rds-pagination-page-size-label">Records per page</InputLabel>
        <Select
          labelId="rds-pagination-page-size-label"
          value={pageSize}
          label="Records per page"
          onChange={handlePageSizeChange}
        >
          {pageSizeOptions.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      </FormControl>
      )}
    </Box>
  );
};

export default RdsPagination;
