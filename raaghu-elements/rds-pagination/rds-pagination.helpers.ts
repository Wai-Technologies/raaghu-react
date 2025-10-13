// RDS Pagination Helper Functions and Configurations
// Moved from rds-pagination.tsx to reduce file size

export interface StyleConfig {
  showPagination: boolean;
  showDropdownControl: boolean;
  showLegendControl: boolean;
  showManualInputControl: boolean;
  showFirstControl: boolean;
  showLastControl: boolean;
  showNextOnly?: boolean;
  showPrevNext?: boolean;
  variant: 'text' | 'outlined';
  shape: 'circular' | 'rounded';
  size: 'small' | 'medium' | 'large';
  styleClass: string;
  siblingCount?: number;
  boundaryCount?: number;
}

// Define style configurations for 11 different pagination styles
export const getStyleConfig = (style: string): StyleConfig => {
  switch (style) {
    case 'Style 1':
      return {
        showPagination: true,
        showDropdownControl: true,
        showLegendControl: true,
        showManualInputControl: true,
        showFirstControl: true,
        showLastControl: true,
        variant: 'text' as const,
        shape: 'circular' as const,
        size: 'medium' as const,
        styleClass: 'style-1',
        // Reduce page numbers for mobile screens to fit within 320px
        siblingCount: 0,
        boundaryCount: 1
      };
    case 'Style 2':
      return {
        showPagination: true,
        showDropdownControl: true,
        showLegendControl: true,
        showManualInputControl: true,
        showFirstControl: false,
        showLastControl: false,
        variant: 'text' as const,
        shape: 'circular' as const,
        size: 'medium' as const,
        styleClass: 'style-2',
        siblingCount: 0,
        boundaryCount: 1
      };
    case 'Style 3':
      return {
        showPagination: true,
        showDropdownControl: true,
        showLegendControl: true,
        showManualInputControl: true,
        showFirstControl: false,
        showLastControl: false,
        // Use 'text' variant so selected pages use bottom-border styling
        variant: 'text' as const,
        shape: 'circular' as const,
        size: 'medium' as const,
        styleClass: 'style-3',
        siblingCount: 0,
        boundaryCount: 2
      };
    case 'Style 4':
      return {
        showPagination: true,
        showDropdownControl: true,
        showLegendControl: true,
        showManualInputControl: true,
        showFirstControl: true,
        showLastControl: false,
        showNextOnly: true,
        variant: 'text' as const,
        shape: 'circular' as const,
        size: 'medium' as const,
        styleClass: 'style-4',
        // Reduce page numbers for mobile screens to fit within 320px
        siblingCount: 0,
        boundaryCount: 1
      };
    case 'Style 5':
      return {
        showPagination: true,
        showDropdownControl: false,
        showLegendControl: true,
        showManualInputControl: false,
        showFirstControl: false,
        showLastControl: false,
        showNextOnly: true,
        variant: 'text' as const,
        shape: 'circular' as const,
        size: 'medium' as const,
        styleClass: 'style-5'
      };
    case 'Style 6':
      return {
        showPagination: false,
        showDropdownControl: false,
        showLegendControl: true,
        showManualInputControl: false,
        showFirstControl: false,
        showLastControl: false,
        variant: 'text' as const,
        shape: 'circular' as const,
        size: 'medium' as const,
        styleClass: 'style-6'
      };
    case 'Style 7':
      return {
        showPagination: true,
        showDropdownControl: true,
        showLegendControl: true,
        showManualInputControl: true,
        showFirstControl: false,
        showLastControl: false,
        variant: 'text' as const,
        shape: 'circular' as const,
        size: 'medium' as const,
        styleClass: 'style-7',
        siblingCount: 0,
        boundaryCount: 1
      };
    case 'Style 8':
      return {
        showPagination: false,
        showDropdownControl: false,
        showLegendControl: true,
        showManualInputControl: false,
        showFirstControl: false,
        showLastControl: false,
        variant: 'text' as const,
        shape: 'circular' as const,
        size: 'medium' as const,
        styleClass: 'style-8'
      };
    case 'Style 9':
      return {
        showPagination: true,
        showDropdownControl: false,
        showLegendControl: false,
        showManualInputControl: false,
        showFirstControl: false,
        showLastControl: false,
        variant: 'text' as const,
        shape: 'circular' as const,
        size: 'medium' as const,
        styleClass: 'style-9',
        siblingCount: 2,
        boundaryCount: 0
      };
    case 'Style 10':
      return {
        showPagination: false,
        showDropdownControl: false,
        showLegendControl: false,
        showManualInputControl: false,
        showFirstControl: false,
        showLastControl: false,
        showPrevNext: true,
        variant: 'text' as const,
        shape: 'circular' as const,
        size: 'medium' as const,
        styleClass: 'style-10'
      };
    case 'Style 11':
      return {
        showPagination: false,
        showDropdownControl: false,
        showLegendControl: false,
        showManualInputControl: false,
        showFirstControl: false,
        showLastControl: false,
        showPrevNext: true,
        variant: 'text' as const,
        shape: 'circular' as const,
        size: 'medium' as const,
        styleClass: 'style-11'
      };
    default:
      return {
        showPagination: true,
        showDropdownControl: true,
        showLegendControl: true,
        showManualInputControl: true,
        showFirstControl: true,
        showLastControl: true,
        variant: 'text' as const,
        shape: 'circular' as const,
        size: 'medium' as const,
        styleClass: 'style-1'
      };
  }
};

// Calculate pagination configuration
export const calculatePaginationConfig = (
  paginationStyle: string,
  styleConfig: StyleConfig
) => {
  // Check if we're on a very small screen (320px or less)
  const isVerySmallScreen = typeof window !== 'undefined' && window.innerWidth <= 320;
  
  // Ensure ellipsis position for specific styles (Style 2 and Style 7)
  // Force siblingCount and boundaryCount so dots appear after page 2
  const paginationSiblingCount = typeof styleConfig.siblingCount === 'number'
    ? styleConfig.siblingCount
    : (paginationStyle === 'Style 2' || paginationStyle === 'Style 7' ? 0 : undefined);
  const paginationBoundaryCount = typeof styleConfig.boundaryCount === 'number'
    ? styleConfig.boundaryCount
    : (paginationStyle === 'Style 2' || paginationStyle === 'Style 7' ? 2 : undefined);

  // Final values to pass to MUI Pagination — make absolutely explicit for Style 2 and 7
  let finalSiblingCount = (paginationStyle === 'Style 2' || paginationStyle === 'Style 7') ? 0 : (typeof paginationSiblingCount === 'number' ? paginationSiblingCount : 0);
  let finalBoundaryCount = (paginationStyle === 'Style 2' || paginationStyle === 'Style 7') ? 1 : (typeof paginationBoundaryCount === 'number' ? paginationBoundaryCount : 1);

  // For Style 1 and Style 4 on very small screens, minimize pagination items to fit in 320px
  if (isVerySmallScreen && (paginationStyle === 'Style 1' || paginationStyle === 'Style 4')) {
    finalSiblingCount = 0;
    finalBoundaryCount = 1;
  }

  return { finalSiblingCount, finalBoundaryCount };
};

// Calculate total pages and records
export const calculateTotalPages = (
  count: number | undefined,
  totalPages: number | undefined,
  pageSize: number
) => {
  // If count is number of pages, use it directly. If it's number of records, calculate pages.
  let totalPagesCalc = 1;
  let totalRecords = 0;
  if (typeof count === 'number' && count > 1 && (!totalPages || totalPages < 2)) {
    // count is likely number of pages
    totalPagesCalc = count;
    totalRecords = count * pageSize;
  } else {
    // count is likely number of records
    totalRecords = count || totalPages || 1;
    totalPagesCalc = Math.ceil(totalRecords / pageSize);
  }

  return { totalPagesCalc, totalRecords };
};

// Generate legend text
export const generateLegendText = (
  legendText: string,
  currentPageNumber: number,
  pageSize: number,
  totalRecords: number,
  totalPagesCalc: number
) => {
  const startItem = (currentPageNumber - 1) * pageSize + 1;
  const endItem = Math.min(currentPageNumber * pageSize, totalRecords);

  return legendText
    .replace('{current}', `${startItem}-${endItem}`)
    .replace('{total}', totalRecords.toString())
    .replace('{page}', currentPageNumber.toString())
    .replace('{totalPages}', totalPagesCalc.toString());
};