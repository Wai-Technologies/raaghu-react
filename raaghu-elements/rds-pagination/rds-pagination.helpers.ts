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

/**
 * Sibling/boundary counts for `MuiPagination`. Style 2/7 are fixed at 0/1; other styles use
 * their config (default 0/1). On small screens (`isSmallScreen`, ≤ 480px) it is always 0/1.
 */
export const calculatePaginationConfig = (
  paginationStyle: string,
  styleConfig: StyleConfig,
  isSmallScreen = false
) => {
  if (isSmallScreen) {
    return { finalSiblingCount: 0, finalBoundaryCount: 1 };
  }
  const isFixedStyle = paginationStyle === 'Style 2' || paginationStyle === 'Style 7';
  const finalSiblingCount = isFixedStyle ? 0 : (styleConfig.siblingCount ?? 0);
  const finalBoundaryCount = isFixedStyle ? 1 : (styleConfig.boundaryCount ?? 1);

  return { finalSiblingCount, finalBoundaryCount };
};

export const calculateTotalPages = (
  count: number | undefined,
  totalPages: number | undefined,
  pageSize: number
) => {
 
  let totalPagesCalc = 1;
  let totalRecords = 0;
  if (typeof count === 'number' && count > 1 && (!totalPages || totalPages < 2)) {
    totalPagesCalc = count;
    totalRecords = count * pageSize;
  } else {
    
    totalRecords = count || totalPages || 1;
    totalPagesCalc = Math.ceil(totalRecords / pageSize);
  }

  return { totalPagesCalc, totalRecords };
};

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