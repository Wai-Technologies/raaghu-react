import React from 'react';
import { Pagination as MuiPagination, PaginationProps } from '@mui/material';

export interface RdsPaginationProps extends PaginationProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  showFirstLast?: boolean;
}

const RdsPagination: React.FC<RdsPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  showFirstLast = true,
  count,
  page,
  onChange,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (onPageChange) {
      onPageChange(value);
    }
    if (onChange) {
      onChange(event, value);
    }
  };

  return (
    <MuiPagination
      count={count || totalPages}
      page={page || currentPage}
      onChange={handleChange}
      showFirstButton={showFirstLast}
      showLastButton={showFirstLast}
      {...props}
    />
  );
};

export default RdsPagination;
