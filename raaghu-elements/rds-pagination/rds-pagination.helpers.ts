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

const baseStyleConfig = {
  variant: 'text' as const,
  shape: 'circular' as const,
  size: 'medium' as const,
};

const defaultStyleConfig: StyleConfig = {
  ...baseStyleConfig,
  showPagination: true,
  showDropdownControl: true,
  showLegendControl: true,
  showManualInputControl: true,
  showFirstControl: true,
  showLastControl: true,
  styleClass: 'style-1',
};

const STYLE_CONFIGS: Record<string, StyleConfig> = {
  'Style 1': { ...defaultStyleConfig, siblingCount: 0, boundaryCount: 1 },
  'Style 2': {
    ...defaultStyleConfig,
    showFirstControl: false,
    showLastControl: false,
    styleClass: 'style-2',
    siblingCount: 0,
    boundaryCount: 1,
  },
  'Style 3': {
    ...defaultStyleConfig,
    showFirstControl: false,
    showLastControl: false,
    styleClass: 'style-3',
    siblingCount: 0,
    boundaryCount: 2,
  },
  'Style 4': {
    ...defaultStyleConfig,
    showLastControl: false,
    showNextOnly: true,
    styleClass: 'style-4',
    siblingCount: 0,
    boundaryCount: 1,
  },
  'Style 5': {
    ...defaultStyleConfig,
    showDropdownControl: false,
    showManualInputControl: false,
    showFirstControl: false,
    showLastControl: false,
    showNextOnly: true,
    styleClass: 'style-5',
  },
  'Style 6': {
    ...baseStyleConfig,
    showPagination: false,
    showDropdownControl: false,
    showLegendControl: true,
    showManualInputControl: false,
    showFirstControl: false,
    showLastControl: false,
    styleClass: 'style-6',
  },
  'Style 7': {
    ...defaultStyleConfig,
    showFirstControl: false,
    showLastControl: false,
    styleClass: 'style-7',
    siblingCount: 0,
    boundaryCount: 1,
  },
  'Style 8': {
    ...baseStyleConfig,
    showPagination: false,
    showDropdownControl: false,
    showLegendControl: true,
    showManualInputControl: false,
    showFirstControl: false,
    showLastControl: false,
    styleClass: 'style-8',
  },
  'Style 9': {
    ...defaultStyleConfig,
    showDropdownControl: false,
    showLegendControl: false,
    showManualInputControl: false,
    showFirstControl: false,
    showLastControl: false,
    styleClass: 'style-9',
    siblingCount: 2,
    boundaryCount: 0,
  },
  'Style 10': {
    ...baseStyleConfig,
    showPagination: false,
    showDropdownControl: false,
    showLegendControl: false,
    showManualInputControl: false,
    showFirstControl: false,
    showLastControl: false,
    showPrevNext: true,
    styleClass: 'style-10',
  },
  'Style 11': {
    ...baseStyleConfig,
    showPagination: false,
    showDropdownControl: false,
    showLegendControl: false,
    showManualInputControl: false,
    showFirstControl: false,
    showLastControl: false,
    showPrevNext: true,
    styleClass: 'style-11',
  },
};

export const getStyleConfig = (style: string): StyleConfig => {
  return STYLE_CONFIGS[style] ?? defaultStyleConfig;
};

function resolveSiblingCount(
  paginationStyle: string,
  styleConfig: StyleConfig
): number | undefined {
  if (typeof styleConfig.siblingCount === 'number') return styleConfig.siblingCount;
  if (paginationStyle === 'Style 2' || paginationStyle === 'Style 7') return 0;
  return undefined;
}

function resolveBoundaryCount(
  paginationStyle: string,
  styleConfig: StyleConfig
): number | undefined {
  if (typeof styleConfig.boundaryCount === 'number') return styleConfig.boundaryCount;
  if (paginationStyle === 'Style 2' || paginationStyle === 'Style 7') return 2;
  return undefined;
}

function applyScreenSizeLimits(
  paginationStyle: string,
  siblingCount: number | undefined,
  boundaryCount: number | undefined
) {
  const isVerySmallScreen = typeof window !== 'undefined' && globalThis.innerWidth <= 360;
  const isSmallScreen = typeof window !== 'undefined' && globalThis.innerWidth <= 480;

  let finalSiblingCount = 0;
  if (paginationStyle !== 'Style 2' && paginationStyle !== 'Style 7') {
    finalSiblingCount = typeof siblingCount === 'number' ? siblingCount : 0;
  }
  let finalBoundaryCount = 1;
  if (paginationStyle !== 'Style 2' && paginationStyle !== 'Style 7') {
    finalBoundaryCount = typeof boundaryCount === 'number' ? boundaryCount : 1;
  }

  if (isVerySmallScreen || isSmallScreen) {
    finalSiblingCount = 0;
    finalBoundaryCount = 1;
  }

  return { finalSiblingCount, finalBoundaryCount };
}

export const calculatePaginationConfig = (
  paginationStyle: string,
  styleConfig: StyleConfig
) => {
  const paginationSiblingCount = resolveSiblingCount(paginationStyle, styleConfig);
  const paginationBoundaryCount = resolveBoundaryCount(paginationStyle, styleConfig);
  return applyScreenSizeLimits(paginationStyle, paginationSiblingCount, paginationBoundaryCount);
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
