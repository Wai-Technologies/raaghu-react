import { useId, useState, type ChangeEvent, type KeyboardEvent, type ReactNode, type SyntheticEvent } from 'react';
import { Pagination as MuiPagination, PaginationItem as MuiPaginationItem, type PaginationProps, Select, MenuItem, Box, FormControl, InputLabel, SelectChangeEvent, TextField, Typography, useMediaQuery } from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { getStyleConfig, calculatePaginationConfig, calculateTotalPages, generateLegendText } from './rds-pagination.helpers';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-pagination.scss';
import { extendedBreakpointTokens } from '../../raaghu-react-themes/tokens/design-tokens';

/**
 * Props for {@link RdsPagination}. Extends MUI `PaginationProps` (forwarded to the
 * inner `MuiPagination`); the Raaghu-specific props below add a page-size dropdown,
 * a legend, a "Go to page" input and predefined Figma styles.
 */
export interface RdsPaginationProps extends Omit<PaginationProps, 'component' | 'count'> {
  /**
   * Total number of records (G2-117). Prefer this over `totalPages`.
   * For an explicit page count without a record total, use `pageCount`.
   */
  count?: number;
  /** Explicit number of pages. When set, wins over `count` / `totalPages` for page buttons. */
  pageCount?: number;
  /** Total number of records when `count` is omitted (same meaning as `count`). */
  totalPages?: number;
  /** @deprecated Use `page` instead. */
  currentPage?: number;
  /** @deprecated Use `onChange` instead. */
  onPageChange?: (page: number) => void;
  /** @deprecated Use `showFirstLast`, `showFirst`, `showLast`, `showPageSize`, `showPageInput` and `showLegend` instead. */
  controls?: {
    firstLast?: 'visible' | 'hidden';
    recordsPerPage?: 'visible' | 'hidden';
    dropdown?: 'visible' | 'hidden';
    legend?: 'visible' | 'hidden';
    first?: 'visible' | 'hidden';
    last?: 'visible' | 'hidden';
    manualInput?: 'visible' | 'hidden';
  };
  /** Options of the "Records per page" dropdown. Defaults to `[10, 50, 100, 500]`. */
  pageSizeOptions?: number[];
  /** Records per page. Omit to let the component track it internally. */
  pageSize?: number;
  /** Called with the new page size when the dropdown changes. */
  onPageSizeChange?: (size: number) => void;
  /** @deprecated Use `labelDisplayedRows` instead. */
  legendText?: string;
  /** Renders the legend from the displayed range (`from`-`to`), total records `count`, current `page` and `totalPages`. Takes precedence over `legendText`. */
  labelDisplayedRows?: (info: { from: number; to: number; count: number; page: number; totalPages: number }) => ReactNode;
  /** Shows the "Records per page" dropdown. Takes precedence over the deprecated `showDropdown`, `showRecordsPerPage` and `controls`. */
  showPageSize?: boolean;
  /** Shows the "Go to [input] Page" field. Takes precedence over the deprecated `showManualInput` and `controls`. */
  showPageInput?: boolean;
  /** Predefined Figma style (`'Style 1'`â€“`'Style 11'`) that decides which controls are shown. */
  paginationStyle?: 'Style 1' | 'Style 2' | 'Style 3' | 'Style 4' | 'Style 5' | 'Style 6' | 'Style 7' | 'Style 8' | 'Style 9' | 'Style 10' | 'Style 11';
  /** Shows both the first and last page buttons (same as `controls.firstLast`). Defaults to `true`. */
  showFirstLast?: boolean;
  /** @deprecated Use `showPageSize` instead. */
  showRecordsPerPage?: boolean;
  /** @deprecated Use `showPageSize` instead. */
  showDropdown?: boolean;
  /** Shows the legend text, e.g. "1-10 of 50 items" (same as `controls.legend`). */
  showLegend?: boolean;
  /** Shows the first page button (same as `controls.first`). */
  showFirst?: boolean;
  /** Shows the last page button (same as `controls.last`). */
  showLast?: boolean;
  /** @deprecated Use `showPageInput` instead. */
  showManualInput?: boolean;
}

/** Legacy `show*` props are only honoured when they are real booleans. */
const asBoolean = (value: unknown) => (typeof value === 'boolean' ? value : undefined);

/**
 * Raaghu pagination: MUI `Pagination` plus optional page-size dropdown, legend,
 * manual page input and Prev/Next buttons, configured by `paginationStyle`.
 * Works controlled (`page` / `currentPage`) or uncontrolled (optional `defaultPage`).
 */
const RdsPagination = ({
  totalPages,
  currentPage,
  onPageChange,
  controls,
  count,
  pageCount,
  page,
  defaultPage,
  onChange,
  renderItem,
  pageSizeOptions = [10, 50, 100, 500],
  pageSize: pageSizeProp,
  legendText,
  labelDisplayedRows,
  showPageSize,
  showPageInput,
  paginationStyle = 'Style 1',
  onPageSizeChange,
  showFirstLast: legacyShowFirstLast,
  showRecordsPerPage: legacyShowRecordsPerPage,
  showDropdown: legacyShowDropdown,
  showLegend: legacyShowLegend,
  showFirst: legacyShowFirst,
  showLast: legacyShowLast,
  showManualInput: legacyShowManualInput,
  'data-testid': dataTestId,
  ...props
}: RdsPaginationProps) => {
  if (controls !== undefined) warnDeprecatedProp('RdsPagination', 'controls', '`showFirstLast`, `showFirst`, `showLast`, `showPageSize`, `showPageInput` and `showLegend`');
  if (currentPage !== undefined) warnDeprecatedProp('RdsPagination', 'currentPage', '`page`');
  if (onPageChange !== undefined) warnDeprecatedProp('RdsPagination', 'onPageChange', '`onChange`');
  if (legendText !== undefined) warnDeprecatedProp('RdsPagination', 'legendText', '`labelDisplayedRows`');
  if (legacyShowRecordsPerPage !== undefined || legacyShowDropdown !== undefined) warnDeprecatedProp('RdsPagination', 'showRecordsPerPage/showDropdown', '`showPageSize`');
  if (legacyShowManualInput !== undefined) warnDeprecatedProp('RdsPagination', 'showManualInput', '`showPageInput`');
  const showFirstLast = controls?.firstLast ? controls.firstLast === 'visible' : (asBoolean(legacyShowFirstLast) ?? true);
  const showRecordsPerPage = controls?.recordsPerPage ? controls.recordsPerPage === 'visible' : (asBoolean(legacyShowRecordsPerPage) ?? false);
  const showDropdown = controls?.dropdown ? controls.dropdown === 'visible' : (asBoolean(legacyShowDropdown) ?? false);
  const showLegend = controls?.legend ? controls.legend === 'visible' : (asBoolean(legacyShowLegend) ?? false);
  const showFirst = controls?.first ? controls.first === 'visible' : (asBoolean(legacyShowFirst) ?? false);
  const showLast = controls?.last ? controls.last === 'visible' : (asBoolean(legacyShowLast) ?? false);
  const showManualInput = controls?.manualInput ? controls.manualInput === 'visible' : (asBoolean(legacyShowManualInput) ?? false);

  const pageSizeLabelId = useId();
  const isSmallScreen = useMediaQuery(`(max-width:${extendedBreakpointTokens['480']})`, { noSsr: true });
  const [localPageSize, setLocalPageSize] = useState(pageSizeProp || pageSizeOptions[0]);
  const [manualPageInput, setManualPageInput] = useState('');
  const pageSize = pageSizeProp !== undefined ? pageSizeProp : localPageSize;

  const controlledPage = page || currentPage;
  const isControlled = controlledPage !== undefined;
  const [innerPage, setInnerPage] = useState(defaultPage ?? 1);

  const styleConfig = getStyleConfig(paginationStyle);
  const { finalSiblingCount, finalBoundaryCount } = calculatePaginationConfig(paginationStyle, styleConfig, isSmallScreen);
  const { totalPagesCalc, totalRecords } = calculateTotalPages(count, totalPages, pageSize, pageCount);

  const handleChange = (event: SyntheticEvent<unknown>, value: number) => {
    if (!isControlled) {
      setInnerPage(value);
    }
    if (onPageChange) {
      onPageChange(value);
    }
    if (onChange) {
      onChange(event as ChangeEvent<unknown>, value);
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
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      const pageNumber = parseInt(manualPageInput);
      if (pageNumber >= 1 && pageNumber <= totalPagesCalc) {
        handleChange(event, pageNumber);
        setManualPageInput('');
      }
    }
  };
  const currentPageNumber = isControlled ? (controlledPage || 1) : innerPage;
  const legendTextGenerated = labelDisplayedRows
    ? labelDisplayedRows({
        from: (currentPageNumber - 1) * pageSize + 1,
        to: Math.min(currentPageNumber * pageSize, totalRecords),
        count: totalRecords,
        page: currentPageNumber,
        totalPages: totalPagesCalc,
      })
    : generateLegendText(legendText ?? '{current} of {total} items', currentPageNumber, pageSize, totalRecords, totalPagesCalc);

  const showFirstBtn = (styleConfig.showFirstControl !== false) && (showFirst || showFirstLast);
  const showLastBtn = (styleConfig.showLastControl !== false) && (showLast || showFirstLast);
  const shouldShowDropdown = showPageSize ?? (showDropdown || showRecordsPerPage ||
    (styleConfig.showDropdownControl && showDropdown !== false && showRecordsPerPage !== false));
  const shouldShowLegend = showLegend ||
    (styleConfig.showLegendControl && showLegend !== false) ||
    (paginationStyle === 'Style 6');
  const shouldShowManualInput = showPageInput ?? (showManualInput ||
    (styleConfig.showManualInputControl && showManualInput !== false));
  return (
    <Box className={`rds-pagination-wrapper ${styleConfig.styleClass || ''}`} data-testid={dataTestId}>
      {styleConfig.showPagination && (
      <MuiPagination
        className="rds-pagination"
        count={totalPagesCalc}
        page={isControlled ? controlledPage : innerPage}
        onChange={handleChange}
        showFirstButton={showFirstBtn}
        showLastButton={showLastBtn}
        variant={styleConfig.variant}
        shape={styleConfig.shape}
        size={styleConfig.size}
        siblingCount={finalSiblingCount}
        boundaryCount={finalBoundaryCount}
        {...props}
        renderItem={renderItem ?? ((item) => (
          <MuiPaginationItem
            {...item}
            {...({ disableRipple: true } as object)}
          />
        ))}
      />
      )}
      {styleConfig.showPrevNext && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <RdsButton variant="filled" size="small" disabled={currentPageNumber <= 1} onClick={(event) => handleChange(event, currentPageNumber - 1)}>
            {paginationStyle === 'Style 10' || paginationStyle === 'Style 11' ? (
              <KeyboardArrowLeft />
            ) : (
              'Prev'
            )}
          </RdsButton>
          <RdsButton variant="filled" size="small" disabled={currentPageNumber >= totalPagesCalc} onClick={(event) => handleChange(event, currentPageNumber + 1)}>
            {paginationStyle === 'Style 10' ? (
              <KeyboardArrowRight />
            ) : (
              'Next'
            )}
          </RdsButton>
        </Box>
      )}
      {styleConfig.showNextOnly && (
        <RdsButton variant="filled" size="small" disabled={currentPageNumber >= totalPagesCalc} onClick={(event) => handleChange(event, currentPageNumber + 1)}>Next</RdsButton>
      )}
      {shouldShowDropdown && (
      <FormControl size="small" className={`pagination-dropdown ${styleConfig.styleClass || ''}`}>
        <InputLabel id={pageSizeLabelId}>Records per page</InputLabel>
        <Select labelId={pageSizeLabelId} value={pageSize} label="Records per page" onChange={handlePageSizeChange}
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
          <TextField  size="small"  value={manualPageInput}  onChange={handleManualPageInput}  onKeyDown={handleManualPageSubmit}  placeholder="1"  slotProps={{ htmlInput: {    min: 1,    max: totalPagesCalc,    type: 'number'
            } }}
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
