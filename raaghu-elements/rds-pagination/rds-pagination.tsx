import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { Pagination as MuiPagination, type PaginationProps, Select, MenuItem, Box, FormControl, InputLabel, SelectChangeEvent, TextField, Typography } from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { getStyleConfig, calculatePaginationConfig, calculateTotalPages, generateLegendText } from './rds-pagination.helpers';
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
  showDropdown?: boolean;
  showLegend?: boolean;
  legendText?: string;
  showFirst?: boolean;
  showLast?: boolean;
  showManualInput?: boolean;
  paginationStyle?: 'Style 1' | 'Style 2' | 'Style 3' | 'Style 4' | 'Style 5' | 'Style 6' | 'Style 7' | 'Style 8' | 'Style 9' | 'Style 10' | 'Style 11';
}

const RdsPagination = ({
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
  showDropdown = false,
  showLegend = false,
  legendText = "{current} of {total} items",
  showFirst = false,
  showLast = false,
  showManualInput = false,
  paginationStyle = 'Style 1',
  onPageSizeChange,
  ...props
}: RdsPaginationProps) => {
  const [localPageSize, setLocalPageSize] = useState(pageSizeProp || pageSizeOptions[0]);
  const [manualPageInput, setManualPageInput] = useState('');
  const pageSize = pageSizeProp !== undefined ? pageSizeProp : localPageSize;
  
  const styleConfig = getStyleConfig(paginationStyle);
  const { finalSiblingCount, finalBoundaryCount } = calculatePaginationConfig(paginationStyle, styleConfig);
  const { totalPagesCalc, totalRecords } = calculateTotalPages(count, totalPages, pageSize);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
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
  const handleManualPageInput = (event: ChangeEvent<HTMLInputElement>) => {
    setManualPageInput(event.target.value);
  };
  const handleManualPageSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const pageNumber = parseInt(manualPageInput);
      if (pageNumber >= 1 && pageNumber <= totalPagesCalc) {
        if (onPageChange) {
          onPageChange(pageNumber);
        }
        if (onChange) {
          onChange({} as ChangeEvent<unknown>, pageNumber);
        }
        setManualPageInput('');
      }
    }
  };
  const currentPageNumber = page || currentPage || 1;
  const legendTextGenerated = generateLegendText(legendText, currentPageNumber, pageSize, totalRecords, totalPagesCalc);

  const showFirstBtn = (styleConfig.showFirstControl !== false) && (showFirst || showFirstLast);
  const showLastBtn = (styleConfig.showLastControl !== false) && (showLast || showFirstLast);
  const shouldShowDropdown = showDropdown || showRecordsPerPage || 
    (styleConfig.showDropdownControl && showDropdown !== false && showRecordsPerPage !== false);
  const shouldShowLegend = showLegend || 
    (styleConfig.showLegendControl && showLegend !== false) ||
    (paginationStyle === 'Style 6');
  const shouldShowManualInput = showManualInput || 
    (styleConfig.showManualInputControl && showManualInput !== false);
  return (
    <Box className={`rds-pagination-wrapper ${styleConfig.styleClass || ''}`}>
      {styleConfig.showPagination && (
      <MuiPagination  className="rds-pagination"  count={totalPagesCalc}  page={page || currentPage}  onChange={handleChange}  showFirstButton={showFirstBtn}  showLastButton={showLastBtn}    variant={styleConfig.variant}    shape={styleConfig.shape}    size={styleConfig.size}    siblingCount={finalSiblingCount}    boundaryCount={finalBoundaryCount}  {...props}
      />
      )}
      {styleConfig.showPrevNext && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <RdsButton style="filled" size="small" disabled={currentPageNumber <= 1} onClick={() => handleChange({} as ChangeEvent<unknown>, currentPageNumber - 1)}>
            {paginationStyle === 'Style 10' || paginationStyle === 'Style 11' ? (
              <KeyboardArrowLeft />
            ) : (
              'Prev'
            )}
          </RdsButton>
          <RdsButton style="filled" size="small" disabled={currentPageNumber >= totalPagesCalc} onClick={() => handleChange({} as ChangeEvent<unknown>, currentPageNumber + 1)}>
            {paginationStyle === 'Style 10' ? (
              <KeyboardArrowRight />
            ) : (
              'Next'
            )}
          </RdsButton>
        </Box>
      )}
      {styleConfig.showNextOnly && (
        <RdsButton style="filled" size="small" text="Next" disabled={currentPageNumber >= totalPagesCalc} onClick={() => handleChange({} as ChangeEvent<unknown>, currentPageNumber + 1)} />
      )}
      {shouldShowDropdown && (
      <FormControl size="small" className={`pagination-dropdown ${styleConfig.styleClass || ''}`}>
        <InputLabel id="rds-pagination-page-size-label">Records per page</InputLabel>
        <Select labelId="rds-pagination-page-size-label" value={pageSize} label="Records per page" onChange={handlePageSizeChange}
        >
          {pageSizeOptions.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      </FormControl>
      )}
      {shouldShowLegend && (
        <Box className={`pagination-legend ${styleConfig.styleClass || ''}`}>
          {legendTextGenerated}
        </Box>
      )}
      {shouldShowManualInput && (
        <Box className={`pagination-manual-input ${styleConfig.styleClass || ''}`}>
          <Typography variant="body2">
            Go to
          </Typography>
          <TextField  size="small"  value={manualPageInput}  onChange={handleManualPageInput}  onKeyPress={handleManualPageSubmit}  placeholder="1"  inputProps={{    min: 1,    max: totalPagesCalc,    type: 'number'
            }}
          />
          <Typography variant="body2">
            Page
          </Typography>
        </Box>
      )}
    </Box>
  );
};
RdsPagination.displayName = 'RdsPagination';
export default RdsPagination;
